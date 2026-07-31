import type { FaqItem } from "./faq";

export const PRICING_TIERS = [
  {
    eyebrow: "MOST COMMON",
    name: "Websites that bring in work",
    range: "$3,000 – $9,000",
    timeline: "SHIPS IN 1–4 WEEKS",
    body: "A custom-coded site built for search from day one, then handed over with every account in your name. The low end is a focused five-page site; the high end adds service-area pages, copywriting and a booking flow.",
    drivers: [
      "How many pages and service areas",
      "Whether you need the copy written",
      "Booking, quoting or lead-capture flows",
      "Migration off Wix, Squarespace or GoDaddy",
    ],
  },
  {
    eyebrow: "THE BIG ONE",
    name: "Software that runs the business",
    range: "$25,000 – $65,000",
    timeline: "V1 IN 6–12 WEEKS",
    body: "One system built around your operation instead of forcing your operation into someone else's. $25,000 buys a genuine working V1; the range moves with how many moving parts your business actually has.",
    drivers: [
      "A mobile app for crews in the field",
      "Scheduling, dispatch and job tracking",
      "QuickBooks, payroll and Stripe integrations",
      "Roles, permissions and audit history",
    ],
  },
  {
    eyebrow: "AFTER LAUNCH",
    name: "Managed services",
    range: "From $375 / month",
    timeline: "OPTIONAL · NEVER A LOCK-IN",
    body: "Dedicated hosting that I monitor, feature work at a reduced rate, and a direct line to the person who wrote your code. Cancel whenever — you already own everything.",
    drivers: [
      "Hosting, monitoring and backups",
      "Security patching and dependency updates",
      "Feature work at the retainer rate",
      "Priority response, direct to me",
    ],
  },
] as const;

export const PRICING_TERMS = [
  {
    label: "DEPOSIT",
    value: "50% to start",
    body: "The remainder is due at launch for websites, or split across milestones on software builds.",
  },
  {
    label: "THE NUMBER",
    value: "Agreed before code",
    body: "Scope, timeline and price are written down first — including what is deliberately not in V1.",
  },
  {
    label: "OWNERSHIP",
    value: "Yours on final payment",
    body: "Code, repos, domains and every account transfer to your name. No license to renew.",
  },
  {
    label: "WARRANTY",
    value: "90–150 days",
    body: "90 days on websites, up to 150 on custom software. Bugs are mine to fix, not yours to pay for twice.",
  },
] as const;

export const PRICING_FAQ: FaqItem[] = [
  {
    q: "How much does custom software cost in Utah?",
    a: "Custom operations software and mobile apps start at $25,000, and most V1 builds land between $25,000 and $65,000. That is deliberately at the bottom of the honest market — national surveys put the dominant band at $30,000–$100,000, and agencies quoting Utah service businesses routinely land 2–3x higher for the same scope.",
  },
  {
    q: "How much should a small business website cost?",
    a: "Between $3,000 and $9,000 for a custom-coded site that is actually built to rank. Below a couple of thousand dollars you are buying a template someone else configured, and for a brand-new business that can be the right call — Squarespace or Wix will get you online this week. Above $9,000 you are usually paying for an agency's overhead rather than more website.",
  },
  {
    q: "Why publish prices when nobody else does?",
    a: "Because 'contact us for pricing' wastes both of our time. If $25,000 is out of range, you should find that out from a web page rather than from two calls and a proposal. Publishing the number filters out the conversations that were never going to work and makes the ones that remain honest from the first minute.",
  },
  {
    q: "What makes a project land at the high end of the range?",
    a: "Moving parts. A mobile app for field crews, a scheduling and dispatch board, integrations that have to reconcile with QuickBooks or payroll, and roles-and-permissions with an audit trail are each real engineering. The scope builder on this page shows exactly what each one adds, because those are the same numbers I would work through with you on a call.",
  },
  {
    q: "Do you charge for the discovery call or a proposal?",
    a: "No. The first call, the scoping conversation and the written scope-and-price are free. You only pay once you have a number in writing and decide to go ahead.",
  },
  {
    q: "What if I can't afford custom right now?",
    a: "I'll tell you that on the call and point you somewhere real. If an off-the-shelf tool like Jobber or Housecall Pro already fits how you work, buy it — custom only wins when the tool fights you. Losing an invoice beats losing trust.",
  },
];
