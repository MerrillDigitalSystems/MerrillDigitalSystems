/**
 * Fails the build on mojibake — UTF-8 that has been read as Windows-1252 and
 * written back out, so `—` becomes `â€"`, `→` becomes `â†’`, `·` becomes `Â·`.
 *
 * This has happened twice, both times from a PowerShell find-and-replace:
 * PowerShell 5.1's Get-Content reads BOM-less UTF-8 as the ANSI codepage and
 * Set-Content writes UTF-8, double-encoding every multibyte character. The
 * first hand-rolled check only looked for the em-dash signature and missed a
 * corrupted arrow that then rendered on every service page.
 *
 * Use Node (or the editor) for bulk edits, not PowerShell. This catches it
 * either way, in source and in the built HTML.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const ROOTS = [
  { dir: resolve(here, "../src"), exts: /\.(tsx?|css|md)$/ },
  { dir: resolve(here, "../out"), exts: /\.(html|webmanifest|xml|txt)$/ },
];

/**
 * â Ã Â are the lead bytes of a misread multibyte sequence. They are also
 * legitimate letters in French/Portuguese/etc — this codebase is English, so
 * any occurrence is corruption. Revisit if the site is ever translated.
 */
const MOJIBAKE = /[âÃÂ][-¿†-€œ™]/g;

const problems = [];
let scanned = 0;

for (const { dir, exts } of ROOTS) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    continue; // out/ won't exist before the first build
  }

  const files = [];
  (function walk(d, names) {
    for (const e of names) {
      const f = join(d, e);
      if (statSync(f).isDirectory()) {
        if (e !== "_next" && e !== "node_modules") walk(f, readdirSync(f));
      } else if (exts.test(e)) {
        files.push(f);
      }
    }
  })(dir, entries);

  for (const file of files) {
    scanned++;
    const text = readFileSync(file, "utf8");
    MOJIBAKE.lastIndex = 0;
    const found = [...text.matchAll(MOJIBAKE)];
    if (!found.length) continue;
    const line = text.slice(0, found[0].index).split("\n").length;
    const samples = [...new Set(found.map((m) => m[0]))].slice(0, 4).join(" ");
    problems.push(
      `${file.replace(resolve(here, ".."), "site")}:${line} — ${found.length} occurrence(s): ${samples}`
    );
  }
}

if (problems.length) {
  console.error(`\nMojibake found in ${problems.length} file(s):\n`);
  for (const p of problems) console.error("  " + p);
  console.error(
    "\nSomething rewrote a UTF-8 file as Windows-1252. Restore it from git\n" +
      "(`git checkout HEAD -- <file>`) and redo the edit in Node or the editor,\n" +
      "not with PowerShell's Get-Content/Set-Content.\n"
  );
  process.exit(1);
}

console.log(`Encoding check passed — ${scanned} files, no mojibake.`);
