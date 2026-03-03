# Launching Merrill Digital Systems Online

This guide walks you through getting the site live with a custom domain and double-checking SEO.

---

## 1. Choose and buy a domain

- **Option A:** [Namecheap](https://www.namecheap.com), [Google Domains](https://domains.google), [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/), or [Porkbun](https://porkbun.com); search for `merrilldigitalsystems.com` (or `.io`, `.co`, etc.).
- Buy the domain. You’ll manage DNS in the registrar’s dashboard in a later step.

If you use a **different domain** (e.g. `merrilldigital.com`), you’ll need to replace `https://merrilldigitalsystems.com` everywhere in this project:

- `index.html`: canonical, og:url, JSON-LD `url`
- `privacy-primis.html`, `privacy-bookkeeping-os.html`, `terms.html`: canonical links
- `robots.txt`: Sitemap URL
- `sitemap.xml`: all `<loc>` URLs

Search the repo for `merrilldigitalsystems.com` and replace with your domain.

---

## 2. Deploy the site (Netlify, recommended)

1. **Create a Netlify account**  
   Go to [netlify.com](https://www.netlify.com) and sign up (GitHub login is easiest if your code is in a repo).

2. **Add a new site**  
   - “Add new site” → “Deploy manually” (or “Import from Git” if you use GitHub).  
   - **Manual deploy:** Drag and drop the **folder** that contains `index.html`, `styles.css`, `script.js`, `favicon.svg`, `robots.txt`, `sitemap.xml`, `netlify.toml`, `_headers`, and all `.html` files.  
   - Netlify will read `netlify.toml` and use **Publish directory:** `.` (root). No build command needed.

3. **Get the default URL**  
   After deploy you’ll get something like `https://random-name-12345.netlify.app`. Test it: click around, check the contact form (see step 5).

---

## 3. Connect your custom domain

1. In Netlify: **Site settings** → **Domain management** → **Add custom domain**.
2. Enter your domain (e.g. `merrilldigitalsystems.com`) and follow Netlify’s prompts.
3. **DNS at your registrar:**  
   - Add the DNS records Netlify shows (usually an **A** record and/or **CNAME**).  
   - Netlify often suggests nameservers; you can either use Netlify DNS (change nameservers at the registrar) or keep your registrar’s DNS and only add the A/CNAME records.
4. **SSL:** Netlify provisions a free HTTPS certificate (Let’s Encrypt). Enable “Force HTTPS” in **Site settings** → **HTTPS**.
5. **www vs non-www:** In Domain management you can add both `merrilldigitalsystems.com` and `www.merrilldigitalsystems.com` and set one to redirect to the other (e.g. redirect www → non-www).

---

## 4. SEO checklist (already done in the repo)

- **Title & meta description**: Set on every page; home page is tuned for “operations software” / “service businesses.”
- **Canonical URLs**: Every page has a `rel="canonical"` pointing at the live URL (using `merrilldigitalsystems.com`; replace if your domain is different).
- **Open Graph / Twitter**: og:title, og:description, og:url, twitter:card so links look good when shared. Add `og:image` when you have a 1200×630 image (see comment in `index.html`).
- **Structured data**: JSON-LD `Organization` on the home page for search engines.
- **robots.txt**: Allows all crawlers and points to `sitemap.xml`.
- **sitemap.xml**: Lists home and all main subpages; update domain in `sitemap.xml` if you use a different one.
- **Favicon**: `favicon.svg` is linked on all pages.
- **Semantic HTML**: Headings (one H1 per page), `<main>`, `<nav>`, `<footer>` are in place.

**After launch:**

- In [Google Search Console](https://search.google.com/search-console) add your property and submit `sitemap.xml` (e.g. `https://merrilldigitalsystems.com/sitemap.xml`).
- Optional: [Bing Webmaster Tools](https://www.bing.com/webmasters): add site and submit the same sitemap.

---

## 5. Contact form (Formspree): make it actually send you messages

The form submits via Formspree. Once you add your form ID, submissions go to your Formspree inbox (and optionally to your email). No backend required.

1. Go to **[formspree.io](https://formspree.io)** and sign up (free tier is fine).
2. Click **New form** and name it (e.g. "MDS website contact").
3. Copy your form ID from the endpoint (e.g. from `https://formspree.io/f/xyzabcde` the ID is `xyzabcde`).
4. In `index.html`, find the contact form and set the `action` to that URL:

   ```html
   <form ... action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

5. Replace `YOUR_FORMSPREE_ID` in the form action with your form ID, save, and deploy. Submit a test from the site.  
   The form sends via AJAX (no reload): the button shows “Message Sent!” on success. You get submissions in Formspree and can enable email forwarding. If the ID is still the placeholder, nothing is delivered. Replace it to capture leads.

---

## 6. Optional: social sharing image (og:image)

When someone shares your site, you can show a custom image:

1. Create an image **1200×630 px** (e.g. logo + tagline).
2. Export as JPG or PNG, add it to the site root (e.g. `og-image.jpg`).
3. In `index.html` head, uncomment and set:

   ```html
   <meta property="og:image" content="https://merrilldigitalsystems.com/og-image.jpg" />
   ```

4. Use the same URL in Twitter card tags if you want that image on Twitter too.

---

## 7. Quick reference: what’s in the repo

| File / folder      | Purpose |
|--------------------|--------|
| `index.html`       | Home page; main SEO and structured data |
| `terms.html`       | Terms of Service |
| `privacy-primis.html` | Privacy policy (Primis app) |
| `privacy-bookkeeping-os.html` | Privacy policy (Ops Hub) |
| `styles.css`       | Styles |
| `script.js`        | Nav, FAQ, form, particles |
| `favicon.svg`      | Browser tab icon |
| `robots.txt`       | Crawler rules + sitemap URL |
| `sitemap.xml`      | List of URLs for search engines |
| `netlify.toml`     | Netlify publish dir + redirects |
| `_headers`         | Security and cache headers (Netlify) |

After you’ve replaced the domain everywhere (if different), deployed, connected the domain, and wired up Formspree, the site is ready to be shared and found by search engines.
