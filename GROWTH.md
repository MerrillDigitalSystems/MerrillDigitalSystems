# Growth playbook — Merrill Digital Systems

No paid ads. Three channels, sequenced so each one feeds the next.

**Sequence:** GBP + reviews start **now** (independent of the site rebuild) → site cutover → outbound (needs `/pricing` and the case studies live as landing assets) → content cadence.

---

## 1. Google Business Profile — start today

The single highest-return unpaid channel for a local service business, and it costs nothing but an afternoon.

### One-time setup

- [ ] **Primary category:** `Website Designer`. **Secondary:** `Software Company`, `Internet Marketing Service`.
- [ ] **Service area:** West Jordan as the base, plus Salt Lake, Utah, Davis and Weber counties. Do *not* list a fake address in each city — service-area businesses are supposed to hide the street address.
- [ ] **Services list:** mirror the site's service pages exactly, each with the published price. Publishing the price here is unusual and it's the same differentiator the site leads on.
- [ ] **Products:** add Punchless with a link to getpunchless.com.
- [ ] **Description:** 750 chars, plain-spoken, opens with what you do and where. No keyword stuffing — Google reads it, but people read it too.
- [ ] **Photos:** 10+ in **colour**. The grayscale treatment is a website rule, not a GBP rule — desaturated photos look broken in the map pack. Include your face, your setup, and screenshots of real client work.
- [ ] **Q&A seeding:** post the six FAQs from `/pricing` as questions and answer them yourself. This is allowed, it's the fastest way to own the answer box, and every competitor leaves it empty.

### Recurring

- [ ] **Weekly GBP post** — reuse a blog excerpt or a project note. Takes five minutes, keeps the profile active.
- [ ] **Review ask after every project close.** Target 1–2/month. Draft the ask in Gmail for review before sending; never automate the send.
- [ ] **Respond to every review inside 48 hours**, including the good ones.

### NAP consistency audit

Exactly this string, everywhere:

```
Merrill Digital Systems LLC
West Jordan, UT 84088
(385) 421-0455
```

Check and fix: GBP, Clutch, GoodFirms, The Manifest, Bing Places, Apple Business Connect, Yelp, LinkedIn, and any Utah chamber or directory listing. A mismatched phone number or a stale suite number is a real ranking drag and it's free to fix.

---

## 2. Local page expansion — after cutover

The rebuild ships West Jordan (the HQ city, previously missing entirely). Everything after that is **max 2 pages/month**, each with **≥40% genuinely unique content** — city-specific economics, named landmarks, real local search behaviour. Four near-identical pages is a doorway pattern and Google devalues the lot.

Priority order:

1. `/web-design-lehi` — Silicon Slopes SMB density
2. `/web-design-sandy`
3. `/hvac-website-design-salt-lake-city` — first vertical×city cross; HVAC is the strongest existing vertical page
4. `/plumber-website-design-salt-lake-city`
5. `/web-design-st-george`

**Kill rule:** any branch that hasn't earned impressions in Search Console after 90 days stops getting new pages. Don't keep feeding a pattern that isn't working.

---

## 3. Outbound — after cutover

HubSpot, the B2B enrichment tool and Gmail are all connected. This becomes real once `/pricing` and the case studies are live, because those are the landing assets that make a cold email land.

### Prospect definition

Utah — Salt Lake, Utah, Davis and Weber counties. HVAC, plumbing, electrical, landscaping, roofing, general contracting, field service. 5–50 employees. Signal: no website, a Wix/Squarespace site, or a site that fails on mobile.

Pull in batches of 50. Run a cost estimate before every pull.

### HubSpot pipeline

Stages: `Prospect → Researched → Drafted → Sent → Replied → Call Booked → Scoped → Won/Lost`

Custom properties: `vertical`, `current_site_platform`, `outreach_angle`.

### The email

**Drafts only. Never auto-send.** Every message gets created as a Gmail draft for Kruz to read and send by hand — both because it's the right thing to do and because a human eye catches the one in twenty where the research is wrong.

First touch is three sentences:
1. One *specific* observation about their current web presence — not "I looked at your site", but "your quote form 404s on mobile".
2. One line on what you'd fix and what it'd cost.
3. A link to `/pricing` or the matching vertical page.

The published-price page **is** the hook. Nobody else in this market will tell them a number without a call, and saying it in a cold email is disarming in a way no subject-line trick is.

Follow-ups: +4 days, +10 days, then quarterly nurture. Stop after two follow-ups.

Volume: 20–30 new prospects/week, roughly 30 minutes a day of review. More than that and the research gets shallow, which is the whole edge.

### Attribution

Every outbound link carries `?utm_source=outbound&utm_medium=email&utm_campaign=trades-2026`. The site captures UTMs into session storage on first pageview and attaches them to the contact form, so a lead that arrives from an email three page-views later still shows its origin.

---

## 4. Content restart

Publishing stalled in April 2026. Two posts a month, each mapped to a money page and an answer-engine question. Every post gets FAQPage schema and links to one service page and one case study.

| # | Post | Targets | Money page |
|---|---|---|---|
| 1 | How much custom software costs in Utah (2026) | "how much does custom software cost" | `/pricing` |
| 2 | Jobber vs. custom — refresh the existing post | comparison intent | `/field-service-software` |
| 3 | What a $3,000 website actually includes | price-anchored intent | `/web-design-utah` |
| 4 | BK Toolbox teardown: how the site scored 100 SEO | proof + technical credibility | `/work/bktoolbox` |
| 5 | When you should *not* hire a custom developer | pure AEO bait, repurposes the homepage section | `/pricing` |
| 6 | GPS timecards for field crews | product-led | `/punchless` |

Post 5 is the one to write first if you only write one. Nobody else publishes it, it's genuinely useful, and it's exactly the kind of page an AI assistant quotes when someone asks whether they need custom software.

---

## Measurement

Mark `generate_lead` and `book_call` as key events in GA4 after cutover. Everything else is diagnostic.

| Signal | Where | Healthy |
|---|---|---|
| Leads / month | GA4 `generate_lead` | trend, not absolute |
| Calls booked | GA4 `book_call` | ≥30% of leads |
| Scope builder → lead | `scope_send` vs `generate_lead` | scoped leads close better; watch the ratio |
| GBP calls & direction requests | GBP Insights | monthly growth |
| Impressions by page group | Search Console | city/vertical branches earning their keep |
| Reviews | GBP | 1–2 / month |

The scope-builder ratio is the one to actually watch. A lead that configured a build before writing tells you their budget, their timeline and their intent before the first call — that's the highest-signal data the site produces, and it's why the payload gets attached to the form submission.
