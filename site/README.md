# merrilldigitalsystems.com

Next.js 16 (App Router) + TypeScript + Tailwind v4, exported to static HTML and
served by nginx on the Pi. No server runtime in production.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # pricing guard → next build → redirect generator
npm run audit    # parity check against the legacy sitemap (run after build)
npm run icons    # regenerate raster icons from the hub mark
```

## How this is organised

**Pages are data; templates own the design.** A service, vertical or city page
is a `ServicePageData` object in `src/content/pages/` plus a four-line route
file. This is deliberate: page content can be written quickly, in parallel,
without anyone reaching into the design system.

```
src/
  app/                  routes — thin, mostly buildMeta() + a template
  components/
    ui/                 primitives: Btn, Tag, Section, GridCells, Faq, Reveal…
    layout/             Header, Footer, Logo, SkipLink
    home/               the 14 homepage sections
    templates/          ServicePage, CaseStudyPage, ArticlePage, LegalPage
    scope/              the scope builder and its context
    forms/              ContactForm (Formspree + attribution + scope payload)
  content/              all copy, as typed objects
  lib/                  site constants, schema, metadata, analytics, routes
scripts/                pricing guard, redirect generator, parity audit, icons
```

## The design system is not negotiable

It's called **Modernist**. Light ground, cobalt accent, Archivo throughout.

| Rule | |
|---|---|
| **Zero border radius** | Everywhere. `rounded-*` should never appear. |
| **2px rules, never hairlines** | Section dividers and card borders. No soft shadow standing in for a rule. |
| **Flush left everything** | Including button labels. A button wider than its label starts text at the left padding edge. |
| **Grayscale photography** | Applied in CSS via `GrayImage`, never baked into the file. |
| **Sparing accent** | Cobalt is for the primary action, small emphasis, and full-bleed poster bands. The page is mostly ink on ground. |
| **Hard offset shadows** | Flat, zero blur, single colour. Not elevation. |

Cobalt at paragraph size does not meet 4.5:1 on the light ground. Use
`accent-700` on light and `accent-400` on dark for anything body-sized.

## Things that will bite you

**The hero word-cycler mask must stay `box-sizing: content-box`.** Under
`border-box` the 6px cobalt underline is subtracted from the declared height,
the mask window drops below one line, and two words show at once with drift
that compounds on every swap. There's a comment on it in `WordCycler.tsx`. If
you change it, leave the homepage open for five minutes before believing it.

**`npm run build` fails on stale pricing.** `scripts/check-pricing.mjs` scans
`src/` for the pre-2026 numbers (`$2,000`, `$6,000`, `$15,000`, `$60,000+`).
Current published pricing is websites **$3,000–$9,000**, software from
**$25,000** (typical $25,000–$65,000), managed **from $375/month**. If the
guard fires on a legitimate competitor reference, reword around it rather than
adding an exemption — the guard is only useful while it has no holes.

**Redirects have one source.** `scripts/generate-redirects.mjs` emits
`redirects-mds.conf`, which nginx includes. It refuses to generate a rule whose
destination is another rule's source, because that's a chain. Never hand-edit
the output.

**Under `output: export`,** `sitemap.ts` and `robots.ts` need
`export const dynamic = "force-static"` or the build fails at page collection.

**The generated OG image has no file extension** (`out/opengraph-image`), so
nginx sets `default_type image/png` for that exact path. Without it every
social platform refuses the card.

**`buildMeta` sets `title: { absolute }`,** which opts out of the root layout's
`%s | Merrill Digital Systems` template. Pass a complete title including the
brand — and keep it under about 60 characters.

## Content rules

Plain-spoken, first person, contractions, short sentences. No "leverage",
"solutions", "empower", "seamless". Em dash in prose, en dash in numeric ranges.

**Every number on the site is real** — the Clutch rating, the Manifest ranking,
the case study results, the prices, the warranty periods. Nothing was invented
to fill space, and nothing should be.

**The concessions are the strategy.** "Where I lose", "When not to hire me",
and the promise about talking a prospect out of a build all read as weaknesses
if you skim. They're the reason the rest of the page is believable. Don't soften
them, and don't move pricing behind a form.

See `../CUTOVER.md` before deploying, and `../GROWTH.md` for what happens after.
