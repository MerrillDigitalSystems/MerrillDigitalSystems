/**
 * Pre-cutover parity check. For every URL the pre-2026 sitemap published,
 * confirm the rebuilt site has a page at the new address, that it carries a
 * title, description, canonical and H1, and that no schema type present on the
 * old page silently disappeared.
 *
 * Run after `npm run build`:  node scripts/parity-audit.mjs
 *
 * A missing schema type is reported, not fatal — some are dropped on purpose
 * (AggregateRating, for instance). Read the report and sign each one off.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(here, "..");
const repoRoot = resolve(siteRoot, "..");
const OUT = resolve(siteRoot, "out");

const read = (path) => {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return null;
  }
};

const firstMatch = (html, re) => {
  const m = html.match(re);
  return m ? m[1].trim() : null;
};

const schemaTypes = (html) => {
  const types = new Set();
  const blocks = html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g
  );
  for (const [, body] of blocks) {
    for (const [, type] of body.matchAll(/"@type"\s*:\s*"([^"]+)"/g)) types.add(type);
  }
  return types;
};

/** old .html path -> new extensionless path */
const legacyToNew = (legacy) =>
  legacy === "/index.html" ? "/" : legacy.replace(/\.html$/, "");

const oldSitemap = read(resolve(repoRoot, "sitemap.xml"));
if (!oldSitemap) {
  console.error("Can't find the legacy sitemap.xml at the repo root.");
  process.exit(1);
}

const legacyPaths = [...oldSitemap.matchAll(/<loc>https:\/\/merrilldigitalsystems\.com(\/[^<]*)<\/loc>/g)]
  .map(([, path]) => (path === "/" ? "/index.html" : path));

const rows = [];
let missing = 0;
let incomplete = 0;

for (const legacy of legacyPaths) {
  const newPath = legacyToNew(legacy);
  const outFile = resolve(OUT, newPath === "/" ? "index.html" : `${newPath.slice(1)}.html`);

  if (!existsSync(outFile)) {
    rows.push({ legacy, newPath, status: "MISSING", notes: "no page built" });
    missing++;
    continue;
  }

  const html = readFileSync(outFile, "utf8");
  const oldHtml = read(resolve(repoRoot, legacy.slice(1)));

  const title = firstMatch(html, /<title>([^<]*)<\/title>/);
  const description = firstMatch(html, /<meta name="description" content="([^"]*)"/);
  const canonical = firstMatch(html, /<link rel="canonical" href="([^"]*)"/);
  const h1 = firstMatch(html, /<h1[^>]*>([\s\S]*?)<\/h1>/)?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  const problems = [];
  if (!title) problems.push("no title");
  if (!description) problems.push("no description");
  if (!canonical) {
    problems.push("no canonical");
  } else {
    // Next normalises away the homepage's trailing slash under
    // trailingSlash:false, so a bare origin IS the homepage canonical.
    const canonicalPath = canonical.replace(/^https?:\/\/[^/]+/, "") || "/";
    if (canonicalPath !== newPath) problems.push(`canonical mismatch (${canonical})`);
  }
  if (!h1) problems.push("no h1");

  if (oldHtml) {
    const before = schemaTypes(oldHtml);
    const after = schemaTypes(html);
    // The rebuild states the business once, as ProfessionalService — which is
    // a LocalBusiness, which is an Organization. Reporting those three as
    // "dropped" every time would train everyone to ignore this column.
    const covered = new Set(
      after.has("ProfessionalService")
        ? [...after, "Organization", "LocalBusiness"]
        : [...after]
    );
    const dropped = [...before].filter((t) => !covered.has(t));
    if (dropped.length) problems.push(`schema dropped: ${dropped.join(", ")}`);
  }

  if (problems.length) incomplete++;
  rows.push({
    legacy,
    newPath,
    status: problems.length ? "CHECK" : "OK",
    notes: problems.join(" · ") || "",
  });
}

const pad = (s, n) => String(s).padEnd(n);
console.log(
  `\n${pad("OLD URL", 52)}${pad("NEW URL", 46)}${pad("STATUS", 9)}NOTES`
);
console.log("-".repeat(150));
for (const row of rows) {
  console.log(`${pad(row.legacy, 52)}${pad(row.newPath, 46)}${pad(row.status, 9)}${row.notes}`);
}

console.log(
  `\n${rows.length} legacy URLs · ${rows.length - missing - incomplete} clean · ${incomplete} to check · ${missing} missing\n`
);

// Missing pages block a cutover; "check" rows need a human, not a build failure.
process.exit(missing > 0 ? 1 : 0);
