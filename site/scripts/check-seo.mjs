/**
 * Postbuild guard for the four on-page things that were silently broken in the
 * 2026-07 rebuild and are invisible until someone goes looking:
 *
 *   1. og:image — 42 of 44 pages shipped without one, because
 *      app/opengraph-image.tsx covers a single route segment and buildMeta
 *      authored a complete openGraph object with no image to backfill.
 *   2. A keyword-bearing heading — every service page led with a benefit line
 *      and no H1 or H2 contained the term the page targets.
 *   3. Outbound internal links — the Utah hub linked 3 of its 10 spokes, so
 *      most of the cluster was reachable only from the footer.
 *   4. Body depth — the money page was the thinnest page in its own cluster.
 *
 * Runs against out/, so it checks rendered HTML rather than intent.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join, relative } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(here, "..", "out");

/** Pages exempt from the content rules — thin by design, not by neglect. */
const THIN_OK = new Set([
  "404.html",
  "_not-found.html",
  "privacy.html",
  "terms.html",
  "privacy-primis.html",
  "privacy-bookkeeping-os.html",
  "free-checklist.html",
  "free-audit.html",
  "blog.html",
]);

/** The service pages, and the term each one has to name in a heading. */
const KEYWORDS = {
  "web-design-utah.html": ["website design", "web design"],
  "web-design-salt-lake-city.html": ["salt lake city"],
  "web-design-provo.html": ["provo"],
  "web-design-ogden.html": ["ogden"],
  "web-design-west-jordan.html": ["west jordan"],
  "hvac-website-design-utah.html": ["hvac"],
  "plumber-website-design-utah.html": ["plumber", "plumbing"],
  "electrician-website-design-utah.html": ["electrician"],
  "landscaping-website-design-utah.html": ["landscaping"],
  "roofing-website-design-utah.html": ["roofing"],
  "contractor-website-design-utah.html": ["contractor"],
  "operations-software.html": ["operations software"],
  "field-service-software.html": ["field service"],
  "bookkeeping-software.html": ["bookkeeping"],
  "job-management-software-utah.html": ["job management"],
  "managed-services.html": ["managed services", "retainer"],
  "custom-software-vs-servicetitan-utah.html": ["field service", "servicetitan"],
};

/**
 * Floors are measured on prose with the header and footer stripped, because
 * chrome adds ~250 words and ~20 links to every page — counting it lets a page
 * look substantial while saying nothing.
 *
 * The service floor is the real guard here. /web-design-utah came out of the
 * rebuild at 880 prose words: thinner than every spoke that feeds it, while
 * holding 83% of the site's impressions. 1000 is deliberately below where the
 * page should sit (1800+) so this catches collapse, not ambition.
 */
const MIN_WORDS_SERVICE = 1000;
const MIN_WORDS_CONTENT = 550;
const MIN_LINKS_SERVICE = 6;

/** Every .html in out/, recursively, as paths relative to out/. */
function htmlFiles(dir) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...htmlFiles(full));
    else if (entry.endsWith(".html")) found.push(full);
  }
  return found;
}

/** The page minus its chrome — head, scripts, styles, header and footer. */
function stripChrome(html) {
  return html
    .replace(/<head[\s\S]*?<\/head>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<header[\s\S]*?<\/header>/gi, " ")
    .replace(/<footer[\s\S]*?<\/footer>/gi, " ");
}

/** Visible prose word count, chrome excluded. */
function proseWords(html) {
  return stripChrome(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;|&#\d+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;
}

const failures = [];
const files = htmlFiles(OUT);

for (const file of files) {
  const name = relative(OUT, file).replace(/\\/g, "/");
  const base = name.split("/").pop();
  const html = readFileSync(file, "utf8");
  const noindex = /<meta name="robots"[^>]*noindex/i.test(html);

  // 1. Share image on every indexable page.
  if (!noindex && !/<meta property="og:image"/i.test(html)) {
    failures.push(`${name}: no og:image`);
  }

  // 2. Keyword in a heading on the pages that target one.
  const terms = KEYWORDS[base];
  if (terms) {
    const headings = [...html.matchAll(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/gi)]
      .map((m) => m[1].replace(/<[^>]+>/g, " ").toLowerCase())
      .join(" | ");
    if (!terms.some((t) => headings.includes(t))) {
      failures.push(`${name}: no heading contains any of [${terms.join(", ")}]`);
    }
  }

  // 3 + 4. Depth and editorial outbound linking, on real content pages only.
  if (!noindex && !THIN_OK.has(base)) {
    const words = proseWords(html);
    const floor = terms ? MIN_WORDS_SERVICE : MIN_WORDS_CONTENT;
    if (words < floor) {
      failures.push(`${name}: ${words} prose words, under the ${floor} floor`);
    }

    if (terms) {
      const editorial = new Set(
        [...stripChrome(html).matchAll(/href="(\/[^"#?][^"]*)"/g)].map((m) => m[1])
      );
      editorial.delete(name.replace(/\.html$/, "").replace(/^/, "/"));
      if (editorial.size < MIN_LINKS_SERVICE) {
        failures.push(
          `${name}: ${editorial.size} editorial internal links, under ${MIN_LINKS_SERVICE}`
        );
      }
    }
  }
}

if (failures.length) {
  console.error(`\ncheck-seo: ${failures.length} problem(s) in ${files.length} pages\n`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}

console.log(`check-seo: ${files.length} pages OK`);
