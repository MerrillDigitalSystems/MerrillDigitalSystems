/**
 * The classic /favicon.ico, generated from the same mark and metrics as the
 * rest of the brand so it can't drift.
 *
 *   npm run favicon
 *
 * Writes src/app/favicon.ico (committed — Next reads it as a static file, so
 * it has to exist in the repo, not just in a build).
 *
 * Why this file exists at all, given app/icon.tsx already emits an icon:
 *   - /favicon.ico is the well-known path Google's favicon fetcher falls back
 *     to, and what most third-party surfaces request directly instead of
 *     parsing <head>. Before this it was a hard 404.
 *   - Google's documented requirement is a square that's a MULTIPLE OF 48px.
 *     app/icon.tsx renders 512, which isn't one (512/48 = 10.67). The 48x48
 *     entry here is the compliant one.
 *
 * A single "M", not the "MD" block: Google renders favicons at 16px and two
 * knocked-out letters turn to mush at that size. app/icon.tsx and
 * app/apple-icon.tsx carry the same single M, because Google will consider any
 * of rel=icon / rel=apple-touch-icon / favicon.ico — so all three have to agree
 * or the pick is a coin toss.
 */
// next/og resolves through Next's bundler, not plain Node ESM — outside a
// build, import the file directly. Same dance as generate-gbp-assets.mjs.
import { ImageResponse } from "next/og.js";
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(here, "..");

const BG = "#f3f2f2";
const COBALT = "#1442cf";

/** The sizes that go in the .ico. 48 is the one Google cares about; 16 and 32
 *  are what browsers actually pull for the tab and the bookmark bar. */
const SIZES = [16, 32, 48];

/** Rendered once at this size, then downscaled. Satori/resvg rasterising a
 *  glyph natively at 16px is mush; a lanczos downscale off a large master
 *  keeps the diagonals clean. 768 is an integer multiple of all three sizes. */
const MASTER = 768;

/**
 * Mark metrics, fitted to Satori's raster output by measuring ink bounds — NOT
 * the 0.5 coefficient MdBlock uses. That one was fitted against the browser's
 * line-box rounding for the DOM lockup and does not transfer.
 *
 * Bricolage Grotesque 800, rendered with lineHeight: 1 (load-bearing — the
 * face's content box is 1.20em tall, and at Satori's default 1.2 line height
 * the glyph sits a full 0.27em low, past what any non-negative padding can
 * correct). Measured at 512, consistent at 768:
 *   ink top within the text box = 0.169 * fontSize
 *   cap height                  = 0.660 * fontSize
 * so centring the ink means:
 *   paddingTop = height/2 - 0.499 * fontSize
 *
 * FONT_RATIO 0.89 puts the M's ink at ~72% of the canvas width (Bricolage's M
 * is wider than Archivo's was), matching what src/app/icon.tsx renders.
 *
 * Mirrored in src/app/icon.tsx and src/app/apple-icon.tsx — change all three.
 */
const FONT_RATIO = 0.89;
const INK_OFFSET = 0.499;

/* ── Render the master ──────────────────────────────────────────────────── */

const display = await readFile(
  resolve(siteRoot, "src/app/_fonts/BricolageGrotesque-ExtraBold.ttf")
);

const fontSize = Math.round(MASTER * FONT_RATIO);

const master = Buffer.from(
  await new ImageResponse(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: Math.round(MASTER / 2 - INK_OFFSET * fontSize),
          background: COBALT,
          color: BG,
          fontFamily: "Bricolage Grotesque",
          fontSize,
          lineHeight: 1,
          // No letterSpacing here, unlike the MD lockup. Tracking is applied
          // after the final glyph too, so on a single letter it does nothing
          // but pad the text box and drag the M off centre.
        },
        children: "M",
      },
    },
    {
      width: MASTER,
      height: MASTER,
      fonts: [
        {
          name: "Bricolage Grotesque",
          data: display,
          weight: 800,
          style: "normal",
        },
      ],
    }
  ).arrayBuffer()
);

/* ── Downscale to raw BGRA, one buffer per size ─────────────────────────── */

const frames = await Promise.all(
  SIZES.map(async (size) => {
    const { data } = await sharp(master)
      .resize(size, size, { kernel: "lanczos3" })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    return { size, rgba: data };
  })
);

/* ── Pack into an .ico ──────────────────────────────────────────────────── */

/**
 * Each entry is a BMP (DIB), not a PNG. PNG-in-ICO is fine in every browser
 * shipping today, but BMP is the encoding no consumer can refuse, and at these
 * sizes the whole file still lands around 15 KB.
 *
 * The quirks that matter: biHeight is DOUBLED (it covers the colour bitmap
 * plus a 1-bit AND mask), rows run bottom-up, and pixels are BGRA.
 */
function encodeDib({ size, rgba }) {
  const header = Buffer.alloc(40);
  const xor = Buffer.alloc(size * size * 4);
  // 1 bit per pixel, each row padded up to a 4-byte boundary. Left at zero:
  // the mark is fully opaque, so nothing is masked out.
  const maskRow = Math.ceil(size / 8 / 4) * 4;
  const and = Buffer.alloc(maskRow * size);

  for (let y = 0; y < size; y++) {
    // Bottom-up: the last source row is written first.
    const src = (size - 1 - y) * size * 4;
    const dst = y * size * 4;
    for (let x = 0; x < size; x++) {
      const s = src + x * 4;
      const d = dst + x * 4;
      xor[d] = rgba[s + 2]; // B
      xor[d + 1] = rgba[s + 1]; // G
      xor[d + 2] = rgba[s]; // R
      xor[d + 3] = rgba[s + 3]; // A
    }
  }

  header.writeUInt32LE(40, 0); // biSize
  header.writeInt32LE(size, 4); // biWidth
  header.writeInt32LE(size * 2, 8); // biHeight — colour + mask
  header.writeUInt16LE(1, 12); // biPlanes
  header.writeUInt16LE(32, 14); // biBitCount
  header.writeUInt32LE(0, 16); // biCompression — BI_RGB
  header.writeUInt32LE(xor.length + and.length, 20); // biSizeImage

  return Buffer.concat([header, xor, and]);
}

const dibs = frames.map(encodeDib);

const dir = Buffer.alloc(6);
dir.writeUInt16LE(0, 0); // reserved
dir.writeUInt16LE(1, 2); // type — 1 = icon
dir.writeUInt16LE(frames.length, 4);

let offset = 6 + frames.length * 16;
const entries = frames.map((frame, i) => {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(frame.size, 0); // width
  entry.writeUInt8(frame.size, 1); // height
  entry.writeUInt8(0, 2); // palette size — 0 for truecolour
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(dibs[i].length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += dibs[i].length;
  return entry;
});

const ico = Buffer.concat([dir, ...entries, ...dibs]);
const dest = resolve(siteRoot, "src/app/favicon.ico");
await writeFile(dest, ico);

console.log(
  `favicon.ico  ${SIZES.join("/")}px  ${(ico.length / 1024).toFixed(1)} KB`
);

// A PNG alongside it, for eyeballing the mark at the size Google renders it.
if (process.argv.includes("--preview")) {
  for (const { size } of frames) {
    await sharp(master)
      .resize(size, size, { kernel: "lanczos3" })
      .png()
      .toFile(resolve(siteRoot, `favicon-preview-${size}.png`));
  }
  await sharp(master)
    .resize(256, 256, { kernel: "lanczos3" })
    .png()
    .toFile(resolve(siteRoot, "favicon-preview-256.png"));
  console.log("wrote favicon-preview-*.png (not for committing)");
}
