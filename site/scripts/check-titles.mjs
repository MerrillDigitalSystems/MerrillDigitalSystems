/**
 * Post-build guard on the rendered <title> of every page.
 *
 * The root layout carries `title.template = "%s | Merrill Digital Systems"`.
 * Routes that go through `buildMeta()` opt out of it with `title.absolute`,
 * because their titles already end in the brand — without that opt-out the
 * brand appears twice and titles run past 80 characters. This has happened
 * once already. Convention alone did not catch it; this does.
 *
 * Runs on `postbuild` against out/, so it fails the build rather than the
 * cutover checklist.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(here, "../out");

/** Google truncates around here; a little over is fine, way over is not. */
const MAX_LENGTH = 65;
const BRAND = /Merrill Digital/g;

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&rsquo;/g, "’");

const files = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry !== "_next") walk(full);
    } else if (entry.endsWith(".html")) {
      files.push(full);
    }
  }
})(OUT);

const problems = [];
let checked = 0;

for (const file of files) {
  const html = readFileSync(file, "utf8");
  const match = html.match(/<title>([^<]*)<\/title>/);
  const page = file.replace(OUT, "").replace(/\\/g, "/");

  if (!match) {
    problems.push(`${page} — no <title>`);
    continue;
  }

  const title = decode(match[1]).trim();
  checked++;

  const brandCount = (title.match(BRAND) || []).length;
  if (brandCount > 1) {
    problems.push(`${page} — brand appears ${brandCount}x: "${title}"`);
  } else if (title.length > MAX_LENGTH) {
    problems.push(`${page} — ${title.length} chars: "${title}"`);
  } else if (!title) {
    problems.push(`${page} — empty <title>`);
  }
}

if (problems.length) {
  console.error(`\nTitle check failed on ${problems.length} page(s):\n`);
  for (const p of problems) console.error("  " + p);
  console.error(
    "\nRoutes should build metadata through buildMeta(), which sets\n" +
      "title.absolute and so opts out of the root layout's template.\n"
  );
  process.exit(1);
}

console.log(`Title check passed — ${checked} pages, none doubled, all <= ${MAX_LENGTH} chars.`);
