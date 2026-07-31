import type { FaqItem } from "./faq";

/**
 * Punchless is the studio's own live SaaS, not client work — which is exactly
 * why it earns a page. Every claim here describes shipped behaviour of the
 * product; the prices are its published plan prices, not build pricing.
 */
export const PUNCHLESS_PAGE = {
  slug: "/punchless",
  url: "https://getpunchless.com",
  title: "Punchless — GPS Timecards for Field Crews | Merrill Digital",
  description:
    "Punchless is our own live SaaS: GPS-geofenced timecards that draft themselves when a crew reaches the job site, then export straight to payroll.",
  eyebrow: "OUR OWN PRODUCT · LIVE SAAS",
  h1: "Timecards that write themselves.",
  lede:
    "A timecard filled in from memory on Friday isn't a record, it's a guess. Punchless drafts one automatically the moment a crew crosses a geofence at a job site or the shop, so payroll runs on verified arrival and departure times. Less admin, fewer arguments, an audit trail behind every hour. I built it, and I run it.",
  stats: [
    { value: "GPS", label: "VERIFIED ARRIVAL AND DEPARTURE ON EVERY TIMECARD" },
    { value: "0", label: "MANUAL PUNCHES — THE TIMECARDS DRAFT THEMSELVES" },
    { value: "5", label: "PAYROLL EXPORTS: QUICKBOOKS, ADP, GUSTO, PAYCHEX, CSV" },
    { value: "1", label: "DASHBOARD FOR LIVE CREW VISIBILITY" },
  ],
  why: {
    heading: "I build software you own. Punchless is the deliberate exception.",
    paragraphs: [
      "Almost everything I build is custom and yours the day it ships — no per-seat fees, no lock-in, no subscription required to keep using your own system. That's the entire argument for custom software, and I make it on every other page of this site.",
      "So why does a studio that's practically anti-SaaS sell one? Because timecards are a universal problem, not a business-specific one. Every field service company needs the same thing here: an honest record of who was where and for how long. Billing a thousand companies for the same custom build would be wasteful, so I productized it once and priced it so a two-truck shop can start today.",
      "When your problem is specific to how your business actually works — your job stages, your handoffs, your reporting — I still build custom software you own outright. Same engineer, two ways to buy. And a studio that operates a real production SaaS is a studio that can run the software behind your project too.",
    ],
  },
  steps: [
    {
      n: "01",
      title: "Set a geofence",
      body: "Draw a boundary around each job site and your shop. Punchless watches for crew phones crossing it — no beacons, no extra hardware, no clock on the wall.",
    },
    {
      n: "02",
      title: "Crews just work",
      body: "A tech arrives, the clock starts. They leave, it stops. A pause button covers breaks and off-duty time, and managers watch it happen live on one dashboard.",
    },
    {
      n: "03",
      title: "Review the drafts",
      body: "At the end of the period every timecard is already drafted from verified times. You adjust, approve, and lock — with an audit trail behind each entry.",
    },
    {
      n: "04",
      title: "Run payroll",
      body: "Approved hours export to QuickBooks, ADP, Gusto, Paychex, or CSV. Payroll becomes a review step instead of a data-entry afternoon.",
    },
  ],
  features: [
    {
      title: "Automatic timecards",
      body: "Geofence-triggered drafts built from verified arrival and departure times. Nobody has to remember to punch in.",
    },
    {
      title: "Live crew visibility",
      body: "A manager dashboard showing who's on site, who's en route, and who's on the clock right now.",
    },
    {
      title: "Review and approval",
      body: "Drafts land in a queue. Adjust, approve, lock. Nothing reaches payroll unreviewed.",
    },
    {
      title: "Payroll integrations",
      body: "Export to QuickBooks, ADP, Gusto, Paychex, or CSV. Hours move without anyone retyping them.",
    },
    {
      title: "Jobs and work orders",
      body: "Tie hours to jobs so you know true labor cost per site, not just a weekly total per person.",
    },
    {
      title: "Audit trail and privacy",
      body: "Every entry logged. The pause button keeps tracking off the clock, so the record is fair to both sides.",
    },
  ],
  industries: [
    "HVAC",
    "Plumbing",
    "Pool service",
    "Landscaping",
    "Electrical",
    "Pest control",
    "Property management",
    "General contracting",
  ],
  plans: [
    {
      name: "Essentials",
      price: "29",
      unit: "/tech/mo",
      note: "The core: automatic GPS timecards",
      features: [
        "Geofence auto-timecards",
        "Mobile app, iOS and Android",
        "Draft review and approval",
        "CSV payroll export",
      ],
      featured: false,
    },
    {
      name: "Pro",
      price: "49",
      unit: "/tech/mo",
      note: "For growing crews already running payroll software",
      features: [
        "Everything in Essentials",
        "Live crew dashboard",
        "Jobs and work orders",
        "QuickBooks, ADP, Gusto, Paychex",
        "Audit trail",
      ],
      featured: true,
    },
    {
      name: "Elite",
      price: "79",
      unit: "/tech/mo",
      note: "For multi-crew operations at scale",
      features: [
        "Everything in Pro",
        "Advanced reporting",
        "Priority support",
        "Team and role controls",
      ],
      featured: false,
    },
  ],
  relatedLinks: [
    { href: "/field-service-software", label: "Field service software" },
    { href: "/operations-software", label: "Operations software" },
    { href: "/job-management-software-utah", label: "Job management software" },
    { href: "/pricing", label: "What a custom build costs" },
  ],
} as const;

export const PUNCHLESS_FAQ: FaqItem[] = [
  {
    q: "How does the GPS timecard actually work?",
    a: "You draw a geofence around each job site and your shop. When a crew member's phone crosses that boundary, Punchless timestamps it and drafts a timecard from the verified arrival and departure times. No punching in, no beacons, no extra hardware.",
  },
  {
    q: "Who is Punchless built for?",
    a: "Field service businesses with crews on the move — HVAC, plumbing, pool service, landscaping, electrical, pest control, property management, and general contracting. If your team's day happens at job sites rather than a desk, it fits.",
  },
  {
    q: "Does it connect to our payroll?",
    a: "Yes. Approved timecards export to QuickBooks, ADP, Gusto, Paychex, or CSV, so payroll becomes a review-and-approve step instead of manual entry.",
  },
  {
    q: "What about employee privacy?",
    a: "Punchless tracks location for timecard purposes while a tech is on the clock, and a pause button lets them stop tracking during breaks or off-duty time. Every entry is logged to an audit trail, so the record is transparent for both sides.",
  },
  {
    q: "How much does it cost?",
    a: "Essentials is $29 per tech per month, Pro is $49, and Elite is $79. Every plan starts with a 30-day free trial and no credit card up front.",
  },
  {
    q: "You build software I own — so why is this a subscription?",
    a: "Because timecards are a universal problem rather than a business-specific one, productizing it once is far cheaper for you than a custom build. When your need is specific to how you work, I still build custom software you own outright — that's the operations software page. Same engineer, two ways to buy.",
  },
];
