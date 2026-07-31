# Deploying merrilldigitalsystems.com

> Rewritten 2026-07-31. The previous version described an architecture that
> did not exist — a Docker-managed tunnel talking to `https://web:443` over the
> compose network, and Caddy "routing two sites". Every one of those claims was
> wrong, and following them cost four deploys that built a correct image nobody
> ever saw. What follows was read off the running machine.

## The actual request path

```
visitor
  → Cloudflare edge                        TLS terminates here
  → cloudflared on the Pi HOST             pid ~1808, NOT in Docker
      tunnel f4a3b1b5-2fed-4501-aa9f-095a16d6754b
      config ~/.cloudflared/merrill-config.yml
  → http://127.0.0.1:8080                  plain HTTP over loopback
  → Caddy, user instance                   pid ~1812
      config ~/.config/caddy/Caddyfile
      also fronts baysbakedgoods.com
  → reverse_proxy 127.0.0.1:8081
  → the merrill-digital-systems container  nginx + the Next.js static export
```

### Things that are not what they look like

| Looks like | Actually |
|---|---|
| The `tunnel` service in `docker-compose.yml` | A **different tunnel** (`9a12078f…`) that has never carried production traffic. Restarting it does nothing. Safe to `docker compose stop tunnel`. |
| Caddy on `:80` (pid ~2459) | The **system** Caddy, stock config, serving its own welcome page from `/usr/share/caddy`. Unrelated to this site. It is why port 80 cannot be published. |
| Caddy on `:8080` (pid ~1812) | The **user** Caddy. This one matters. It fronts both Merrill and Bay's. |
| `certs/origin.pem` | Mounted and valid, but unused in practice — TLS terminates at Cloudflare and the loopback hop is plain HTTP. nginx still listens on 443 for direct access. |

Three cloudflared processes run on this box. Confirm which is which before
touching anything:

```bash
pgrep -af cloudflared     # 1807 = bays, 1808 = merrill, other = docker
pgrep -af caddy           # 1812 = :8080 (ours), 2459 = :80 (system)
sudo ss -tlnp | grep -E 'caddy|docker'
```

## Ports on this Pi

| Port | Owner | Notes |
|---|---|---|
| 80 | system Caddy | **Never publish the container here** — bind fails, container sits in `Created`, site keeps serving stale content with no obvious error |
| 3001 | Bay's app | |
| 8080 | user Caddy | the tunnel's target |
| 8081 | **this container** | bound to `127.0.0.1` only |
| 2019 / 2020 | Caddy admin APIs | system / user |

## Routine deploy

```bash
cd ~/MerrillDigitalSystems
git pull
docker compose up -d --build      # ~90s on a Pi 5; npm ci + next build run inside
```

That's it. Caddy and the tunnel are untouched — they point at `127.0.0.1:8081`,
which the new container reclaims on restart.

Verify:

```bash
curl -s http://127.0.0.1:8081/pricing | grep -o '<title>[^<]*'                       # container
curl -s -H "Host: merrilldigitalsystems.com" http://127.0.0.1:8080/pricing | grep -o '<title>[^<]*'   # through Caddy
curl -s https://merrilldigitalsystems.com/pricing | grep -o '<title>[^<]*'           # public
curl -s -o /dev/null -w "bays: %{http_code}\n" https://baysbakedgoods.com/           # collateral check
```

**Check page content, not status codes.** Caddy's old `try_files` fell through
to `404.html` and served it with a **200** — which is exactly how a broken
deploy looked healthy for hours. Grep for a string only the new build has.

Then, from anywhere:

```bash
cd site && npm run crawl
```

That crawls every page, validates title/description/canonical/h1/schema,
follows every internal link and image, and confirms each legacy `.html` URL
301s in a single hop.

## Changing the Caddy config

The Caddyfile is version-controlled at `deploy/caddy/Caddyfile`. **Copy it,
never paste it** — pasting into this terminal has twice rewritten bare
hostnames into markdown links, once into a live config.

```bash
cp deploy/caddy/Caddyfile ~/.config/caddy/Caddyfile
caddy validate --config ~/.config/caddy/Caddyfile --adapter caddyfile
caddy reload   --config ~/.config/caddy/Caddyfile --adapter caddyfile
```

`validate` first: `reload` is graceful and won't drop Bay's, but a bad config
still fails the whole file.

## Rollback

The pre-rebuild site is tagged:

```bash
git checkout v1-flat-site -- .
docker compose up -d --build
```

Then purge the Cloudflare cache. Under a minute.

## Traps, each of which has already cost a deploy

**Never publish ports 80 or 443.** Caddy owns 80. A collision leaves the
container in `Created` while the site appears to keep working.

**nginx serves content on port 80 — do not add an https redirect.** The tunnel
hop is plain HTTP; a redirect there bounces every request back through
Cloudflare forever. TLS is the edge's job.

**`absolute_redirect off` is load-bearing.** Without it nginx builds Location
headers from `$scheme`, which is `http` on this hop, adding a second hop to all
41 legacy redirects.

**Don't reinstate Caddy's rewrites** (`/terms` → `/terms.html` and friends).
nginx now 301s `/terms.html` → `/terms`; both together is an infinite loop.

**Caddy no longer serves the repo directory.** It used to, which meant the
old `.html` files at the repo root *were* the live site. They are now inert and
can be deleted per `CUTOVER.md`. Before the proxy change, deleting them would
have taken the site down.

**Cloudflare Email Obfuscation is on.** It rewrites `mailto:` links into
`/cdn-cgi/l/email-protection#…`, which needs JS to resolve. Harmless for
browsers; it does hide your email from non-JS crawlers, including some AI
ones. Turn it off under Scrape Shield if that matters to you.

## Cloudflare settings that live outside this repo

- **Redirect Rule** `www → apex`, 301, **with "Preserve query string" ticked.**
  The expression uses `http.request.uri.path`, which is path-only — without
  that checkbox every UTM is stripped and outbound leads arrive unattributed.
- **Always Use HTTPS** is on.
- The tunnel is **locally configured**, so its ingress is in
  `~/.cloudflared/merrill-config.yml`, not the dashboard. The Zero Trust UI
  offers to "migrate" it — that is irreversible and unnecessary.

## First-time setup

Only needed on a fresh machine. Install Docker, restore
`~/.cloudflared/merrill-config.yml` plus its credentials JSON, install the
Caddyfile as above, place the origin certs in `certs/`, then run the routine
deploy. The Cloudflare-side pieces (tunnel, DNS, redirect rule) already exist
and are not recreated per-deploy.
