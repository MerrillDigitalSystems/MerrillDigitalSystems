# Cutover checklist — flat HTML site → Next.js rebuild

The rebuild changes every URL on the site (`/page.html` → `/page`) and replaces
the design system wholesale. That is a real SEO event. This is the order that
keeps it boring.

`DEPLOY.md` still covers the Pi, Docker and Cloudflare Tunnel setup — none of
that changes. What changes is the build: nginx now serves the Next.js static
export instead of the repo root.

---

## A week before

### 1. Fix the www/apex split first

`DEPLOY.md` documents a pre-existing bug: something upstream answers `www.` with
a 200, so Google has both hosts indexed. Migrating URLs while two hosts are
live doubles the churn and makes the Search Console data unreadable.

- [x] **Done 2026-07-31.** Cloudflare → Rules → Redirect Rules, "www to non-www": `http.host eq "www.merrilldigitalsystems.com"` → dynamic `concat("https://merrilldigitalsystems.com", http.request.uri.path)`, 301, **with "Preserve query string" ticked**.

      That checkbox is load-bearing: `http.request.uri.path` is path-only, so without it every UTM is stripped on the way through and outbound leads arrive looking like direct traffic. Use the checkbox *or* `http.request.uri` — never both, or the query string doubles.

- [x] **Verified 2026-07-31.** Single hop to 200 on `https://www/`, `http://www/`, a deep path, and a full UTM string. Re-check with:
      ```bash
      curl -sI "https://www.merrilldigitalsystems.com/web-design-utah.html?utm_source=test" | grep -i location
      ```
- [ ] Add a **Domain property** in Search Console (not just the URL prefix property) so both hosts report together.

Let that settle for a few days before touching URLs.

### 2. Freeze content

Stop editing the old flat HTML. Anything changed after this point has to be
ported by hand a second time.

---

## Build verification (before anything goes live)

```bash
cd site
npm ci
npm run build      # runs the pricing guard, then the redirect generator
npm run audit      # parity matrix against the legacy sitemap
```

- [ ] **`npm run build` passes.** The `prebuild` step fails on stale pricing (`$2,000`, `$6,000`, `$15,000`, `$60,000+`) anywhere in `src/`.
- [ ] **`npm run audit` reports 0 missing.** Every one of the 39 legacy URLs must resolve to a built page. Rows marked `CHECK` need a human decision — a dropped schema type is sometimes deliberate (`AggregateRating` is omitted on purpose; see below).
- [ ] **No internal `.html` links survive:**
  ```bash
  grep -rlE 'href="/[^"]*\.html"' site/out --include=*.html
  ```
  should return nothing.
- [ ] **Lighthouse, mobile,** on the homepage plus one page per template: performance ≥ 95, SEO 100, LCP < 2.0s, CLS < 0.05. The hero H1 is the LCP element — it is server-rendered with the first cycler word and deliberately carries no reveal animation. If LCP regresses, that is the first thing to check.
- [ ] **Schema:** paste the homepage and one inner page into the [Rich Results Test](https://search.google.com/test/rich-results) *together* and confirm the inner page's `provider: {"@id": ".../#organization"}` resolves against the homepage graph.
- [ ] **Word cycler soak test:** leave the homepage open for five minutes. If two words ever show at once, or the words drift out of the mask, someone changed the hero mask off `box-sizing: content-box`. See the comment in `WordCycler.tsx`.
- [ ] **Breakpoint walk** at 1200 / 1040 / 900 / 700 / 600px. The modular grid draws its rules with a 2px gap over an ink ground, so stacking should never leave a dangling border.
- [ ] **Keyboard walk:** FAQ accordion, scope builder radios and checkboxes, mobile nav (open, tab through, Escape closes and returns focus to the toggle).

---

## Cutover day

1. **Build and deploy on the Pi:**
   ```bash
   git pull
   docker compose build     # stage 1 runs npm ci + next build; expect 5–10 min on a Pi
   docker compose up -d
   ```
2. **Purge the Cloudflare cache** (Caching → Configuration → Purge Everything). Skipping this serves the old HTML for hours.
3. **Verify redirects in production** — every legacy URL must be exactly one hop:
   ```bash
   while read -r url; do
     code=$(curl -s -o /dev/null -w '%{http_code}' "https://merrilldigitalsystems.com$url")
     dest=$(curl -s -o /dev/null -w '%{redirect_url}' "https://merrilldigitalsystems.com$url")
     final=$(curl -sL -o /dev/null -w '%{http_code}' "https://merrilldigitalsystems.com$url")
     echo "$url -> $code -> $dest (final $final)"
   done < <(grep -oP '(?<=location = )\S+' site/redirects-mds.conf)
   ```
   Every line should read `301` and `final 200`. A `301 → 301` is a chain and bleeds link equity — fix it before moving on.
4. **Spot-check the pages that matter:** `/`, `/pricing`, `/web-design-utah`, `/operations-software`, `/blog`.
5. **Confirm `/opengraph-image` serves as `image/png`.** nginx has an explicit `default_type` for it because Next emits the file without an extension:
   ```bash
   curl -sI https://merrilldigitalsystems.com/opengraph-image | grep -i content-type
   ```
   Then run the URL through Facebook's Sharing Debugger and X's Card Validator.
6. **Search Console:** submit the new `sitemap.xml`, then URL-Inspect the top ten money pages and request indexing.
7. **Test the real conversion path end to end:**
   - [ ] Build a scope on `/pricing`, click "SEND ME THIS SCOPE", confirm the contact form is prefilled and that the Formspree email contains `scope_type`, `scope_range`, `scope_weeks` and `scope_addons`.
   - [ ] Submit the plain contact form and confirm it arrives.
   - [ ] Confirm `generate_lead` fires in GA4 DebugView.
   - [ ] Once Cal.com is configured, book a test call and confirm `book_call` fires.

---

## The two weeks after

- [ ] Watch Search Console **Coverage** and the **"Page with redirect"** report daily. A spike in 404s means a legacy URL is missing from the redirect map.
- [ ] Watch **Performance** by page group. A dip in the first fortnight is normal on a URL migration; a dip still there at four weeks is not.
- [ ] Mark `generate_lead` and `book_call` as **key events** in GA4.

## Once it has been clean for two weeks

```bash
git tag v1-flat-site        # the pre-rebuild tree, permanently recoverable
git rm -r --cached *.html work/ styles.css script.js
```

The flat site is already excluded from the Docker build context by
`.dockerignore`, so removing it is hygiene rather than correctness. Tag first.

---

## Things that are deliberate, so nobody "fixes" them

| Decision | Why |
|---|---|
| No `AggregateRating` schema for the Clutch 5.0 | Google's guidelines disallow self-serving review markup for your own business. The rating still appears in visible copy, where it belongs. |
| Netlify config deleted | `DEPLOY.md` recorded it as inert; the Pi is production. Two deploy targets meant two places for redirects to drift. |
| The capacity pill says three build slots | It is a real scarcity claim on a page whose whole argument is that it does not overstate. Bump it only when a four-build quarter has actually happened. |
| "WHERE I LOSE" and "When not to hire me" stay | They read as weaknesses to a stakeholder skimming the page. They are the reason the rest of it is believable. |
| Prices are on the page, not behind a form | The market norm is "contact us for pricing". Publishing the number is the differentiator and the outbound hook. |
| Blog slugs keep the flat `blog-` prefix | Restructuring to `/blog/<slug>` would be a second URL migration stacked on the first. It can happen later, on its own. |
| `/custom-software-vs-servicetitan-utah` drops `Article` schema | It now carries `Service` + `FAQPage`, which describe a comparison page more accurately than `Article` did. The audit will keep flagging it; this row is the sign-off. |
| `blog-bookkeeping-firm-hidden-costs` drops `Thing` | `Thing` is schema.org's root type and carried no meaning on the old page. Same — flagged forever, signed off here. |
| ServiceTitan's per-seat pricing is not quoted | They don't publish it. The old page's `$300–$600/user/month` and five-year total were invented precision. The page now hands the reader the arithmetic to run against their own written quote. |
