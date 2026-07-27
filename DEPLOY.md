# Deploying on a Raspberry Pi with Cloudflare Tunnel + HTTPS

This project runs as two Docker containers: **nginx** (serves the site) and **cloudflared** (connects the Pi to Cloudflare). No port forwarding or static IP needed.

---

## 1. Prerequisites

On the Raspberry Pi, install Docker:

```bash
sudo apt update && sudo apt install -y docker.io docker-compose-v2
sudo usermod -aG docker $USER
# Log out and back in so the docker group applies
```

---

## 2. Cloudflare setup

### 2a. Add your domain to Cloudflare

1. Create a free account at [dash.cloudflare.com](https://dash.cloudflare.com).
2. Click **Add a site**, enter your domain (e.g. `merrilldigitalsystems.com`).
3. Select the **Free** plan.
4. Cloudflare will give you two nameservers. Go to your domain registrar and replace the existing nameservers with Cloudflare's.
5. Wait for DNS propagation (can take a few minutes to 24 hours).

### 2b. Create a Cloudflare Tunnel

1. In the Cloudflare dashboard, go to **Zero Trust → Networks → Tunnels**.
2. Click **Create a tunnel** → choose **Cloudflared**.
3. Name it (e.g. `merrill-pi`).
4. Cloudflare will show you a **tunnel token** — copy it.
5. In the tunnel config, add a **public hostname**:
   - Subdomain: (leave blank for root, or `www`)
   - Domain: `merrilldigitalsystems.com`
   - Service: `https://web:443`
   - Under **Additional application settings → TLS**, check **No TLS Verify** (since we use a Cloudflare origin cert, not a public CA cert).
6. Repeat for `www.merrilldigitalsystems.com` if you want both.

### 2c. Generate an Origin Certificate

1. In the Cloudflare dashboard, go to **SSL/TLS → Origin Server**.
2. Click **Create Certificate**.
3. Keep the defaults (RSA, 15 years, covers `*.merrilldigitalsystems.com` and `merrilldigitalsystems.com`).
4. Cloudflare shows the **certificate** and **private key**. Copy both.
5. On the Pi, create the certs directory and save them:

```bash
cd /path/to/MerrillDigitalSystems
mkdir -p certs
nano certs/origin.pem      # paste the certificate, save
nano certs/origin-key.pem  # paste the private key, save
chmod 600 certs/origin-key.pem
```

### 2d. Set SSL mode

1. In Cloudflare dashboard → **SSL/TLS → Overview**.
2. Set encryption mode to **Full (strict)**.

---

## 3. Configure the tunnel token

Create a `.env` file in the project root:

```bash
echo "TUNNEL_TOKEN=your-token-here" > .env
```

Replace `your-token-here` with the token from step 2b.

---

## 4. Build and run

```bash
cd /path/to/MerrillDigitalSystems

# Build the nginx image
docker compose build

# Start both containers
docker compose up -d
```

Check that everything is running:

```bash
docker compose ps
docker compose logs -f
```

Your site should now be live at `https://merrilldigitalsystems.com`.

---

## Useful commands

| Command | Description |
|---------|-------------|
| `docker compose up -d` | Start in background |
| `docker compose down` | Stop everything |
| `docker compose logs -f web` | Stream nginx logs |
| `docker compose logs -f tunnel` | Stream tunnel logs |
| `docker compose build --no-cache` | Rebuild after file changes |
| `docker compose restart web` | Restart nginx only |

---

## How it works

```
Browser → Cloudflare (SSL termination + CDN)
         ↕ encrypted tunnel
       cloudflared container on Pi
         ↕ HTTPS (origin cert)
       nginx container on Pi → static files
```

- **Cloudflare** handles DNS, caching, DDoS protection, and the public SSL certificate visitors see.
- **Cloudflare Tunnel** creates an outbound-only connection from your Pi to Cloudflare — no open ports on your router.
- **nginx** serves the site over HTTPS using a Cloudflare **origin certificate** for end-to-end encryption.
- SSL mode is **Full (strict)** so the connection is encrypted the whole way.

---

## Updating the site

After changing HTML/CSS/JS files:

```bash
docker compose build --no-cache
docker compose up -d
```

---

## Canonical hostname: www → apex

The site canonicalises on the **apex** (`merrilldigitalsystems.com`). Every `<link rel="canonical">`
and every JSON-LD URL points there, and `nginx.conf` has returned `301` for the `www` hostname
since March 2026.

Despite that, Search Console has been reporting `www.` and apex as **two separate indexed URLs**
with separate impressions — which means www traffic is being answered *before* it reaches nginx.
Splitting one domain across two hostnames splits link equity and crawl budget, so this is worth
running down.

**Verify first — this tells you which layer is answering:**

```bash
curl -sSI https://www.merrilldigitalsystems.com/ | head -n 12
```

- `301` + `location: https://merrilldigitalsystems.com/` → already fixed, nothing to do.
- `200` → something upstream of nginx is serving www directly. Check, in order:
  1. **Cloudflare Tunnel** (Zero Trust → Networks → Tunnels → public hostnames). If `www` is
     mapped as its own public hostname, it reaches nginx and should already redirect. If it is
     mapped to a *different* service, that is the bug.
  2. **Caddy on the Pi.** If Caddy fronts both sites, a `www` site block (or a wildcard) may be
     answering before nginx ever sees the request. Add the redirect there:

     ```
     www.merrilldigitalsystems.com {
         redir https://merrilldigitalsystems.com{uri} permanent
     }
     ```
  3. **Cloudflare cache.** Purge everything after changing either of the above, or a cached `200`
     will keep being served.

Belt-and-braces (independent of origin config): Cloudflare → Rules → **Redirect Rules**, matching
`http.host eq "www.merrilldigitalsystems.com"` → dynamic redirect to
`concat("https://merrilldigitalsystems.com", http.request.uri.path)`, status **301**. This runs at
the edge, so it fixes the problem regardless of which origin answers.

Finally, add a **Domain property** in Search Console (not just URL-prefix). Domain properties
aggregate both hostnames and all protocols, so the split disappears from reporting too.

> **Note:** `netlify.toml` in the repo root is left over from an earlier Netlify deploy and has no
> effect on this Pi/Docker setup. Don't edit it expecting redirects to change.

---

## Troubleshooting

- **502 Bad Gateway**: Check `docker compose logs tunnel` — make sure the tunnel token is correct.
- **525 SSL Handshake Failed**: Make sure `certs/origin.pem` and `certs/origin-key.pem` exist and are correct.
- **Site not loading**: Verify DNS has propagated (`nslookup merrilldigitalsystems.com`) and the tunnel is connected (`docker compose logs tunnel` should show "connection registered").
- **Local testing**: You can still hit `http://localhost` on the Pi directly (port 80 redirects to HTTPS, but `curl -k https://localhost` works with the origin cert).
