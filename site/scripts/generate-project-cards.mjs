/**
 * Branded project cards for GBP photos, LinkedIn and proposals.
 *
 *   npm run cards
 *
 * Real screenshots of live sites, framed in the Modernist system. Capture
 * them first with headless Chrome (see the CAPTURE constant below), then run
 * this to composite. Nothing here is invented: every screenshot is the site
 * as it actually renders, and every result line is one the client would
 * recognise.
 *
 * Screenshots stay in COLOUR deliberately. The site grayscales photography as
 * a design device, but these exist to show the work — desaturating a website
 * screenshot hides the thing it is meant to demonstrate, and grayscale images
 * read as broken in Google's map pack.
 *
 * CAPTURE (run once, or when a client site changes):
 *   chrome.exe --headless=new --disable-gpu --hide-scrollbars \
 *     --window-size=1440,900 --virtual-time-budget=9000 \
 *     --screenshot="public/gbp/shots/NAME.png" URL
 */
import { ImageResponse } from "next/og.js";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(here, "..");
const shots = resolve(siteRoot, "public/gbp/shots");
const outDir = resolve(siteRoot, "public/gbp/cards");

const INK = "#201e1d";
const BG = "#f3f2f2";
const COBALT = "#1442cf";
const N500 = "#9b9797";

const archivo = await readFile(resolve(siteRoot, "src/app/_fonts/Archivo-ExtraBold.ttf"));
const fonts = [{ name: "Archivo", data: archivo, weight: 800, style: "normal" }];

const PROJECTS = [
  {
    file: "bktoolbox",
    eyebrow: "INTERIOR DESIGN · REMODELING · UTAH",
    name: "BK Toolbox",
    result: "100 SEO / 99 performance",
    note: "Migrated off Wix onto a platform they own outright",
  },
  {
    file: "cclpro",
    eyebrow: "LANDSCAPING · WEB + DIGITAL",
    name: "CCL Pro",
    result: "40% more lead capture",
    note: "Website plus search structure, Google Business and analytics",
  },
  {
    file: "bays",
    eyebrow: "LOCAL BUSINESS · BAKERY · WEST JORDAN",
    name: "Bay's Baked Goods",
    result: "Local-ready launch",
    note: "Mobile-first ordering, local SEO, Search Console handed over",
  },
  {
    file: "punchless",
    eyebrow: "OUR OWN PRODUCT · LIVE SAAS",
    name: "Punchless",
    result: "GPS timecards for field crews",
    note: "We don't just build software — we ship and run it",
  },
  {
    file: "merrilldigital",
    eyebrow: "MERRILL DIGITAL SYSTEMS",
    name: "Published pricing",
    result: "You own the code outright",
    note: "Real numbers on the page, before you ever fill in a form",
  },
];

const W = 1200;
const H = 900;
const PAD = 44;
const SHOT_H = 566;

await mkdir(outDir, { recursive: true });

for (const p of PROJECTS) {
  const png = await readFile(resolve(shots, `${p.file}.png`));
  const dataUri = `data:image/png;base64,${png.toString("base64")}`;

  const element = {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: BG,
        padding: PAD,
        fontFamily: "Archivo",
      },
      children: [
        // The work itself, framed by a 2px rule like everything else.
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              width: W - PAD * 2,
              height: SHOT_H,
              border: `3px solid ${INK}`,
              overflow: "hidden",
            },
            children: {
              type: "img",
              props: {
                src: dataUri,
                width: W - PAD * 2 - 6,
                height: SHOT_H - 6,
                style: { objectFit: "cover", objectPosition: "top" },
              },
            },
          },
        },
        // Eyebrow
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              marginTop: 30,
              fontSize: 19,
              letterSpacing: "0.2em",
              color: "#605d5d",
            },
            children: p.eyebrow,
          },
        },
        // Name + result on one baseline, the cobalt doing the emphasis
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              marginTop: 14,
              alignItems: "flex-end",
              justifyContent: "space-between",
            },
            children: [
              {
                type: "div",
                props: {
                  style: { display: "flex", fontSize: 58, letterSpacing: "-0.04em", color: INK, lineHeight: 1 },
                  children: p.name,
                },
              },
              {
                type: "div",
                props: {
                  style: { display: "flex", fontSize: 34, letterSpacing: "-0.03em", color: COBALT, lineHeight: 1 },
                  children: p.result,
                },
              },
            ],
          },
        },
        // Footer rule: the note, and the mark
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              marginTop: 22,
              paddingTop: 20,
              borderTop: `3px solid ${INK}`,
              justifyContent: "space-between",
              alignItems: "center",
            },
            children: [
              {
                type: "div",
                props: {
                  style: { display: "flex", fontSize: 21, color: "#444141" },
                  children: p.note,
                },
              },
              {
                type: "div",
                props: {
                  style: { display: "flex", alignItems: "center", gap: 12 },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          width: 30,
                          height: 42,
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "center",
                          paddingTop: Math.round(42 / 2 - 0.42 * 14),
                          background: COBALT,
                          color: BG,
                          fontSize: 14,
                          letterSpacing: "-0.06em",
                          marginRight: -1,
                        },
                        children: "MD",
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: { display: "flex", fontSize: 20, letterSpacing: "-0.03em", color: INK },
                        children: "MERRILL DIGITAL",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };

  const res = new ImageResponse(element, { width: W, height: H, fonts });
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(resolve(outDir, `${p.file}-card.png`), buf);
  console.log(`${p.file}-card.png  ${W}x${H}  ${(buf.length / 1024).toFixed(0)} KB`);
}
