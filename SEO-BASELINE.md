# Search baseline — captured 2026-07-31, before the rebuild cutover

Google Search Console, web search, **2026-04-30 → 2026-07-29** (91 days), Domain
property. Captured while the flat HTML site was still live, so post-cutover
numbers have something to be measured against.

## Totals

| | |
|---|---|
| Impressions | **21,752** |
| Clicks | **7** |
| CTR | **0.03%** |
| Desktop / Mobile / Tablet impressions | 15,399 / 5,356 / 997 |

## The shape of it

**96% of all impressions come from one page at position 66.**

| Page | Impressions | Clicks | Position |
|---|---|---|---|
| `/web-design-utah.html` | **20,788** | 0 | **66.4** |
| `/` (apex) | 155 | 1 | 23.9 |
| `/` (www) | 132 | **5** | **10.5** |
| `/web-design-salt-lake-city.html` | 239 | 0 | 61.6 |
| `/blog-website-cost-utah.html` | 231 | 0 | 30.7 |
| `/web-design-provo.html` | 139 | 0 | 33.5 |
| `/bookkeeping-software.html` | 100 | 1 | 38.5 |
| `/work/brightpath-dental.html` | 98 | 0 | **6.6** |
| `/operations-software.html` | 60 | 0 | 25.9 |
| `/punchless.html` | 7 | 0 | **2.9** |

Head terms — "web design utah" (865 impressions), "utah web design" (856),
"website design utah" (686) — all sit at position 45–73. The targeting is
right and the authority is missing. Nobody scrolls to page six, so those
20,000 impressions produce nothing.

**Every click was brand or navigational.** The only click-earning query in 90
days was `bookkeeping-service-merrill`. Zero non-brand commercial clicks.

## What this means

**The rebuild does not fix position 66.** That is an authority problem, not a
design problem, and it closes through GBP, reviews and consistent publishing
over months — see `GROWTH.md`. Expecting a redesign to move a head term is the
wrong expectation and will lead to blaming the wrong thing in three weeks.

What the rebuild does is convert the traffic that already arrives, and give the
content engine pages worth ranking.

## The three real openings, in evidence order

1. **`how much should a small business website cost in utah` — position 10.17**,
   12 impressions, no dedicated page at the time. `/pricing` targets exactly
   that intent. Best-evidenced opportunity in the export.
2. **The www/apex split.** Homepage on www ranked **10.45** with 5 of the 7
   total clicks; on apex, **23.88** with 1. Google was splitting the signals.
   The 301 added 2026-07-31 consolidates them — the change most likely to move
   a number in the near term.
3. **Pages that already rank:** `/punchless` (2.9), `/work/brightpath-dental`
   (6.6), `/blog-hvac-website-design-utah` (8.3). Low volume, but they now land
   on a design that converts.

## Redirect coverage check

All **26** URLs earning impressions were cross-checked against
`site/redirects-mds.conf` and the built output: every one has a single-hop 301
to a page that exists. No impression-earning URL 404s at cutover.
`/web-design-utah.html` carries 96% of impressions — if only one redirect gets
verified in production, verify that one.

## What to compare against, and when

Re-pull the same 3-month window at **30 and 90 days** post-cutover:

- **Impressions** will likely dip during recrawl. Expected; watch the trend, not the day.
- **Homepage position** should improve as www/apex consolidate. This is the near-term signal.
- **Clicks** is the number that matters. Anything above 7 non-brand clicks in 90 days beats the entire baseline.
- **`/pricing`** — watch whether it picks up the cost queries `/blog-website-cost-utah.html` currently ranks 30th for.

Raw export: `merrilldigitalsystems.com-Performance-on-Search-2026-07-31.zip`.
