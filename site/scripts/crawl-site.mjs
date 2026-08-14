/**
 * Crawls the live site and checks everything a visitor or crawler would hit.
 *
 *   node scripts/crawl-site.mjs                       # production
 *   node scripts/crawl-site.mjs http://localhost:3000 # local
 *
 * Checks, per page: status, single-hop redirects, title/description/canonical
 * presence and length, exactly one h1, structured data, and that every
 * internal link and image resolves. Also verifies every legacy .html URL 301s
 * in exactly one hop, and that generated images serve as image/png rather than
 * octet-stream.
 */
const BASE = (process.argv[2] || "https://merrilldigitalsystems.com").replace(/\/$/, "");

const seen = new Map();
const queue = ["/"];
const problems = [];
const linkSources = new Map();

const norm = (href, from) => {
  try {
    const u = new URL(href, BASE + from);
    if (u.origin !== new URL(BASE).origin) return null;
    return u.pathname + (u.pathname.endsWith("/") && u.pathname !== "/" ? "" : "");
  } catch {
    return null;
  }
};

const get = async (path, method = "GET") => {
  const res = await fetch(BASE + path, { method, redirect: "manual" });
  const body = method === "GET" && res.status === 200 ? await res.text() : "";
  return { status: res.status, location: res.headers.get("location"), type: res.headers.get("content-type"), body };
};

console.log(`Crawling ${BASE}\n`);

while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;

  let r;
  try {
    r = await get(path);
  } catch (e) {
    problems.push(`${path} — request failed: ${e.message}`);
    seen.set(path, 0);
    continue;
  }
  seen.set(path, r.status);

  if (r.status >= 400) {
    const from = linkSources.get(path);
    problems.push(`${path} — ${r.status}${from ? `  (linked from ${from})` : ""}`);
    continue;
  }
  if (r.status >= 300) {
    // Internal links should point at final URLs, not at redirects.
    problems.push(`${path} — ${r.status} to ${r.location}  (linked from ${linkSources.get(path) ?? "?"})`);
    continue;
  }

  const html = r.body;
  const one = (re) => (html.match(re) || [])[1];

  const title = one(/<title>([^<]*)<\/title>/);
  const desc = one(/<meta name="description" content="([^"]*)"/);
  const canonical = one(/<link rel="canonical" href="([^"]*)"/);
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  const ld = (html.match(/application\/ld\+json/g) || []).length;

  if (!title) problems.push(`${path} — no <title>`);
  if (!desc) problems.push(`${path} — no meta description`);
  if (!canonical) problems.push(`${path} — no canonical`);
  if (h1s !== 1) problems.push(`${path} — ${h1s} <h1> elements`);
  if (ld < 1) problems.push(`${path} — no structured data`);

  // Queue internal links; flag ones that still carry .html
  for (const m of html.matchAll(/<a[^>]+href="([^"#][^"]*)"/g)) {
    const href = m[1];
    if (/^(mailto:|tel:|https?:\/\/(?!merrilldigitalsystems))/.test(href)) continue;
    // Cloudflare's Email Obfuscation rewrites mailto: links into
    // /cdn-cgi/l/email-protection#<hash>, which only resolves with JS. Not
    // ours, and a 404 without the fragment is expected.
    if (href.startsWith("/cdn-cgi/")) continue;
    if (/\.html($|[?#])/.test(href)) problems.push(`${path} — links to a .html URL: ${href}`);
    const target = norm(href.split("#")[0], path);
    if (target && !seen.has(target) && !queue.includes(target)) {
      linkSources.set(target, path);
      queue.push(target);
    }
  }

  // Images must actually exist
  for (const m of html.matchAll(/<img[^>]+src="(\/[^"]+)"/g)) {
    const src = m[1].split("?")[0];
    if (seen.has(src)) continue;
    const img = await get(src, "HEAD");
    seen.set(src, img.status);
    if (img.status !== 200) problems.push(`${path} — image ${img.status}: ${src}`);
  }
}

// Generated images are extensionless; nginx must set the type or social
// platforms reject the card and browsers ignore the favicon.
for (const asset of ["/opengraph-image", "/icon", "/apple-icon"]) {
  const r = await get(asset, "HEAD");
  if (r.status !== 200) problems.push(`${asset} — ${r.status}`);
  else if (!/image\/png/.test(r.type || "")) problems.push(`${asset} — content-type ${r.type}, expected image/png`);
}

for (const f of ["/sitemap.xml", "/robots.txt", "/manifest.webmanifest"]) {
  const r = await get(f, "HEAD");
  if (r.status !== 200) problems.push(`${f} — ${r.status}`);
}

// Every legacy URL must 301 in exactly one hop to a live page.
const legacy = (await (await fetch(BASE + "/sitemap.xml")).text())
  .match(/<loc>[^<]+<\/loc>/g)
  .map((l) => l.replace(/<\/?loc>/g, "").replace(BASE, ""))
  .filter((p) => p !== "/")
  .map((p) => p + ".html");

let redirOk = 0;
for (const old of legacy) {
  const r = await get(old, "HEAD");
  if (r.status !== 301) {
    problems.push(`REDIRECT ${old} — expected 301, got ${r.status}`);
    continue;
  }
  const dest = (r.location || "").replace(BASE, "") || "/";
  const hop2 = await get(dest.startsWith("/") ? dest : "/" + dest, "HEAD");
  if (hop2.status !== 200) problems.push(`REDIRECT ${old} -> ${dest} -> ${hop2.status} (chain or dead end)`);
  else redirOk++;
}

/**
 * The host redirect. This is the single most valuable piece of configuration
 * on the property and the only one that lives nowhere in this repo: nginx.conf
 * serves the apex, www and `_` from one server block with no host rule, so the
 * consolidation is a Cloudflare Redirect Rule and nothing here would notice if
 * the zone were rebuilt.
 *
 * It matters because the split was real: over the 90 days to 2026-08-14 the
 * www homepage held position 7.8 and 4 of the site's 7 total clicks while the
 * apex sat at 31. Two hosts answering 200 splits every signal between them.
 *
 * Skipped against localhost, which has no host routing to test.
 */
if (BASE.startsWith("https://")) {
  const apex = new URL(BASE).host.replace(/^www\./, "");
  for (const path of ["/", "/web-design-utah"]) {
    try {
      const r = await fetch(`https://www.${apex}${path}`, {
        method: "HEAD",
        redirect: "manual",
      });
      if (r.status !== 301) {
        problems.push(`WWW www.${apex}${path} — expected 301, got ${r.status}`);
        continue;
      }
      const dest = r.headers.get("location") || "";
      if (!dest.startsWith(`https://${apex}`)) {
        problems.push(`WWW www.${apex}${path} -> ${dest} (not the apex)`);
        continue;
      }
      // One hop, not two: a 301 into another redirect bleeds authority.
      const hop2 = await fetch(dest, { method: "HEAD", redirect: "manual" });
      if (hop2.status !== 200) {
        problems.push(`WWW www.${apex}${path} -> ${dest} -> ${hop2.status} (chain)`);
      }
    } catch (err) {
      problems.push(`WWW www.${apex}${path} — ${err.message}`);
    }
  }
}

const pages = [...seen.entries()].filter(([p]) => !/\.(png|jpg|jpeg|svg|webp|ico)$/.test(p));
console.log(`Pages crawled : ${pages.length}`);
console.log(`Assets checked: ${seen.size - pages.length}`);
console.log(`Redirects OK  : ${redirOk}/${legacy.length}`);
console.log(`Problems      : ${problems.length}\n`);
for (const p of problems) console.log("  " + p);
process.exit(problems.length ? 1 : 0);
