/**
 * The rebuild raises published pricing (websites $3,000–$9,000, software floor
 * $25,000, managed from $375/mo). The pre-2026 site carried the old numbers in
 * 88 places including inside FAQ schema, so a stale figure is easy to
 * reintroduce while porting a page. This fails the build if one comes back.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(here, "../src");

const BANNED = [
  { re: /\$2,000/g, why: "old website floor — now $3,000" },
  { re: /\$6,000/g, why: "old website ceiling — now $9,000" },
  { re: /\$15,000/g, why: "old software floor — now $25,000" },
  { re: /\$60,000\+/g, why: "old software ceiling — now $65,000" },
  { re: /\$2000-\$8000/g, why: "old offers.priceRange — now $3000-$9000" },
  { re: /\$150\s*[–-]\s*\$?200\s*\/\s*mo/gi, why: "old managed price — now from $375/month" },
  { re: /\broiBuildBaseline\s*:\s*15000\b/g, why: "ROI payback must amortize the $25,000 baseline" },
];

const files = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (/\.(ts|tsx|md|mdx)$/.test(entry)) files.push(full);
  }
})(SRC);

const hits = [];
for (const file of files) {
  const text = readFileSync(file, "utf8");
  for (const { re, why } of BANNED) {
    re.lastIndex = 0;
    let match;
    while ((match = re.exec(text)) !== null) {
      const line = text.slice(0, match.index).split("\n").length;
      hits.push(`${file.replace(SRC, "src")}:${line}  "${match[0]}"  — ${why}`);
    }
  }
}

if (hits.length) {
  console.error(`\nStale pricing found in ${hits.length} place(s):\n`);
  for (const hit of hits) console.error("  " + hit);
  console.error("\nUpdate the copy, or the schema offer, to the current numbers.\n");
  process.exit(1);
}

console.log(`Pricing check passed — ${files.length} files scanned.`);
