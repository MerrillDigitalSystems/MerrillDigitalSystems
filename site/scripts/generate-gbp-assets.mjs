/**
 * Google Business Profile assets, generated from the same mark and metrics as
 * the site so the brand doesn't drift between surfaces.
 *
 *   npm run gbp
 *
 * Outputs to site/public/gbp/ (gitignored — these are uploads, not site files):
 *   logo-1024.png   square, safe for GBP's circular crop
 *   cover-1200.png  16:9, the wide banner at the top of the profile
 *
 * GBP specifics that drove the sizes:
 *   - Logo displays circle-cropped in some surfaces, square in others, so the
 *     mark is inset well inside a safe circle.
 *   - Cover is 16:9. Google crops the edges aggressively on mobile, so
 *     everything that matters sits in the middle ~70%.
 *
 * Vertical centring uses the same solved offset as the site's MdBlock:
 * paddingTop = height/2 - 0.42*fontSize. See components/layout/Logo.tsx.
 */
// next/og resolves through Next's bundler, not plain Node ESM — outside a
// build, import the file directly.
import { ImageResponse } from "next/og.js";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(here, "..");
const outDir = resolve(siteRoot, "public/gbp");

const INK = "#201e1d";
const BG = "#f3f2f2";
const COBALT = "#1442cf";
const NEUTRAL = "#605d5d";

const archivo = await readFile(resolve(siteRoot, "src/app/_fonts/Archivo-ExtraBold.ttf"));
const fonts = [{ name: "Archivo", data: archivo, weight: 800, style: "normal" }];

const save = async (name, element, size) => {
  const res = new ImageResponse(element, { ...size, fonts });
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(resolve(outDir, name), buf);
  console.log(`${name}  ${size.width}x${size.height}  ${(buf.length / 1024).toFixed(0)} KB`);
};

await mkdir(outDir, { recursive: true });

/* ── Logo: the MD block, full bleed, inset for the circular crop ────────── */
const LOGO = 1024;
const logoFont = 430;
await save(
  "logo-1024.png",
  {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: Math.round(LOGO / 2 - 0.42 * logoFont),
        background: COBALT,
        color: BG,
        fontFamily: "Archivo",
        fontSize: logoFont,
        letterSpacing: "-0.06em",
        marginRight: -Math.round(logoFont * 0.06),
      },
      children: "MD",
    },
  },
  { width: LOGO, height: LOGO }
);

/* ── Cover: the ruled wordmark, the way the site header reads ───────────── */
const markH = 190;
const markFont = Math.round(markH * 0.34);

await save(
  "cover-1200.png",
  {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: BG,
        // Google crops the edges hard on mobile; keep everything central.
        padding: "0 150px",
        fontFamily: "Archivo",
      },
      children: [
        {
          type: "div",
          props: {
            style: { display: "flex", alignItems: "center", gap: 40 },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    width: Math.round(markH * 0.72),
                    height: markH,
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    paddingTop: Math.round(markH / 2 - 0.42 * markFont),
                    background: COBALT,
                    color: BG,
                    fontSize: markFont,
                    letterSpacing: "-0.06em",
                    marginRight: -Math.round(markFont * 0.06),
                  },
                  children: "MD",
                },
              },
              {
                type: "div",
                props: {
                  style: { display: "flex", flexDirection: "column" },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          fontSize: 76,
                          letterSpacing: "-0.045em",
                          color: INK,
                          lineHeight: 1,
                        },
                        children: "MERRILL DIGITAL",
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: { display: "flex", width: 470, height: 9, background: COBALT, marginTop: 14 },
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          fontSize: 20,
                          letterSpacing: "0.34em",
                          color: NEUTRAL,
                          marginTop: 14,
                        },
                        children: "SYSTEMS · UTAH",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              marginTop: 56,
              paddingTop: 30,
              borderTop: `5px solid ${INK}`,
              justifyContent: "space-between",
              alignItems: "flex-end",
            },
            children: [
              {
                type: "div",
                props: {
                  style: { display: "flex", fontSize: 30, color: INK, letterSpacing: "-0.02em" },
                  children: "LESS MESS. MORE MOMENTUM.",
                },
              },
              {
                type: "div",
                props: {
                  style: { display: "flex", fontSize: 21, color: "#0b2a86", letterSpacing: "0.12em" },
                  children: "WEBSITES · CUSTOM SOFTWARE · YOU OWN THE CODE",
                },
              },
            ],
          },
        },
      ],
    },
  },
  { width: 1200, height: 675 }
);
