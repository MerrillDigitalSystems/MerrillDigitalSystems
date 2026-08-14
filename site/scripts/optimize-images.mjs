/**
 * Turns the originals in site/assets/ into web-sized WebP in public/img/.
 *
 * Under `output: export` there is no image optimizer at runtime — next/image
 * is set to `unoptimized`, so whatever sits in public/ is exactly what a
 * visitor downloads. next.config.ts has always claimed this script did the
 * pre-sizing; until now it didn't exist, and the founder portrait shipped as a
 * 284 KB lossless PNG to fill a 46x46 slot on the homepage, eagerly fetched
 * with `priority`. That is most of a mobile LCP budget spent on a thumbnail.
 *
 * Originals live in assets/ rather than public/ so they are never served by
 * accident. Run with `npm run images` after adding or replacing one.
 */
import { readdirSync, mkdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join, parse } from "node:path";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(here, "..");
const SRC = join(siteRoot, "assets");
const OUT = join(siteRoot, "public", "img");

/**
 * Each original and the widths it is needed at. Keep the largest width at or
 * above the biggest slot the image fills, times two for retina.
 */
const TARGETS = [
  {
    file: "kruz-merrill.png",
    // Two sizes for two jobs: 92 is the 46px homepage credibility card at 2x
    // and is what actually blocks paint, 372 is the Person image in the
    // organization schema, which wants more than a thumbnail and is never
    // fetched by a visitor.
    widths: [92, 372],
    quality: 82,
  },
  // Project screenshots. 1200 is the case-study hero, 640 the showcase grid on
  // the service pages — those render at ~400px wide in a 3-up, so 640 covers
  // retina without shipping the hero to a phone.
  {
    file: "preview-bktoolbox-opt.jpg",
    widths: [640, 1200],
    quality: 78,
  },
  {
    file: "preview-cclpro-opt.jpg",
    widths: [640, 1200],
    quality: 78,
  },
  {
    file: "preview-bays-opt.jpg",
    widths: [640, 1200],
    quality: 78,
  },
];

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

mkdirSync(OUT, { recursive: true });

let missing = 0;
for (const target of TARGETS) {
  const src = join(SRC, target.file);
  let srcStat;
  try {
    srcStat = statSync(src);
  } catch {
    console.error(`MISSING original: assets/${target.file}`);
    missing++;
    continue;
  }

  const { name } = parse(target.file);
  for (const width of target.widths) {
    const suffix = target.widths.length > 1 ? `-${width}` : "";
    const outFile = join(OUT, `${name}${suffix}.webp`);
    await sharp(src)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: target.quality })
      .toFile(outFile);
    const outStat = statSync(outFile);
    console.log(
      `${target.file} (${kb(srcStat.size)}) -> img/${name}${suffix}.webp (${kb(
        outStat.size
      )})`
    );
  }
}

// Anything sitting in assets/ that no target covers is a file someone added
// and forgot to wire up — say so rather than silently ignoring it.
const known = new Set(TARGETS.map((t) => t.file));
for (const file of readdirSync(SRC)) {
  if (!known.has(file)) console.warn(`note: assets/${file} has no target here`);
}

if (missing) process.exit(1);
