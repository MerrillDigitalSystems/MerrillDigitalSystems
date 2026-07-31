import type { ServicePageData } from "../types";

/**
 * A comparison page only works if the concession is real. Section 01 opens by
 * naming what ServiceTitan genuinely does better — and the FAQ says it again,
 * specifically — because a hatchet job here would undermine every other page
 * on the site. ServiceTitan's own pricing is never quoted: they don't publish
 * it, so inventing a figure to beat would be exactly the dishonesty this page
 * is arguing against.
 */
export const CUSTOM_SOFTWARE_VS_SERVICETITAN_UTAH: ServicePageData = {
  slug: "/custom-software-vs-servicetitan-utah",
  title: "Custom Software vs ServiceTitan | Merrill Digital",
  description:
    "ServiceTitan is a real product and sometimes the right buy. An honest Utah comparison — where it wins, where it stops fitting, and what custom costs.",
  eyebrow: "HEAD TO HEAD · UTAH FIELD SERVICE",
  h1: "ServiceTitan, or something built around you?",
  lede: "You're about to sign a multi-year contract for software your whole operation will run on. Here's the comparison from both sides, including the parts that don't favour me — so you can make the call before the demo, not during it.",
  crumbs: [
    { name: "Home", path: "/" },
    { name: "Field service software", path: "/field-service-software" },
    { name: "Custom vs ServiceTitan", path: "/custom-software-vs-servicetitan-utah" },
  ],
  intro: {
    label: "WHERE SERVICETITAN WINS",
    heading: "Start with what it does better than me.",
    body: "ServiceTitan has had a decade and a large engineering team to build what it has, and on a straight feature count it beats anything I can ship for you in twelve weeks. You can buy it this afternoon — no scoping, no build window, no waiting. It has a staffed support desk your dispatcher can call at two in the morning; I'm one person with a phone. Price books, membership billing, call recording and marketing attribution already exist and already work. Its QuickBooks, payroll and supplier integrations are maintained by people whose full-time job that is, and there's a community of other contractors who've already solved whatever you're stuck on. If your operation looks like the one it was designed for, buying it is the faster, cheaper, lower-risk decision and I'll say so on the first call. Here's where that stops being true.",
  },
  problems: [
    {
      title: "Your workflow isn't the one it models",
      body: "It's built around a dispatch → job → invoice → payment loop. Multi-phase projects, service plus install plus maintenance, subcontractor splits — those become workarounds, and workarounds become permanent.",
    },
    {
      title: "You're paying enterprise rates at a small scale",
      body: "Per-seat pricing on an annual contract. A three-truck crew ends up funding a feature set designed for thirty-truck operations, most of which they'll never open.",
    },
    {
      title: "Leaving costs more than staying",
      body: "Your job history, customer records and pricing live in their system. Export exists, but a real migration is expensive enough that renewal stays the path of least resistance even when it shouldn't.",
    },
    {
      title: "The reports answer their questions",
      body: "Dashboards cover the metrics the platform tracks. The number you actually run the business on is usually an export, a spreadsheet and somebody's Monday morning.",
    },
  ],
  deliverables: {
    heading: "What a custom build gives you instead.",
    items: [
      {
        title: "The workflow you already have",
        body: "Every screen, status and rule matches how your team works today. Nobody retrains around a model that was designed for a different company.",
      },
      {
        title: "No per-seat bill",
        body: "One build cost, then hosting. Hiring your eighth tech doesn't raise a software invoice, and neither does a vendor price increase you had no say in.",
      },
      {
        title: "The reports you actually run on",
        body: "Job margin, crew utilization, revenue by service line — whatever you check first on a Monday, built as a screen instead of a monthly export.",
      },
      {
        title: "Integrations built to your spec",
        body: "QuickBooks Online or Xero, Stripe, payroll, supplier APIs. If the API exists it can be connected, on your timeline rather than a platform roadmap.",
      },
      {
        title: "Your data in your database",
        body: "Your infrastructure, your backups, your export whenever you want it. There's no renewal date that decides whether you keep access to your own history.",
      },
      {
        title: "A working V1 in 6–12 weeks",
        body: "Scoped and priced in writing first, including what's deliberately left out. Staged rollout is normal — dispatch first, invoicing after, not one big-bang cutover.",
      },
      {
        title: "Productized where it makes sense",
        body: "Universal problems get built once, not rebuilt per client. GPS timecards are my own SaaS, Punchless — it's the business-specific parts that get custom-built.",
      },
      {
        title: "Ownership and a written warranty",
        body: "Code, database and infrastructure config yours on final payment, with up to 150 days of bug warranty. Any developer can pick it up after me.",
      },
    ],
  },
  proof: [
    {
      value: "15 HRS",
      label: "PER WEEK — INTERNAL OPS OS",
      body: "A bookkeeping operation running on one hub instead of three overlapping SaaS tools, with the triple data entry gone.",
    },
    {
      value: "5.0",
      label: "CLUTCH RATING",
      body: "Quality, schedule and cost, from clients who published the review themselves.",
    },
    {
      value: "#3",
      label: "THE MANIFEST — UTAH",
      body: "Ranked third among Utah software developers on verified client reviews rather than ad spend.",
    },
  ],
  priceLabel: "CUSTOM SOFTWARE",
  priceRange: "$25,000 – $65,000",
  priceTimeline: "V1 IN 6–12 WEEKS",
  schemaPriceRange: "$25000-$65000",
  serviceType: "Custom software development",
  faq: [
    {
      q: "What does ServiceTitan genuinely do better than a custom build?",
      a: "Four things, and none of them are close. Breadth — a decade of features I can't match in a twelve-week V1. Availability — you can be using it today, while a custom build has a scoping and build window in front of it. Support — a staffed desk answering at 2am, where I'm one person with a phone and a written response time. Integrations — the connections you need are already built and already maintained by a team. Add a large user community and training material that already exists. If your operation fits their model, those advantages are worth more than a perfect workflow fit, and you should buy it.",
    },
    {
      q: "How much does ServiceTitan cost?",
      a: "They quote per seat after a demo and don't publish a number, so I'm not going to invent one to beat. Get your quote in writing, multiply it by the seats you'll have in three years, multiply that by sixty months, then add implementation, training and the staff time the rollout eats. Compare that total against a one-time build plus hosting. That arithmetic is the only version of this comparison that means anything, and it's yours to run — not mine to guess at.",
    },
    {
      q: "What does a custom build actually cost?",
      a: "$25,000 to $65,000 for most V1 builds, with $25,000 the realistic floor for an operations or field service system. The number is fixed in writing before any code exists, along with the timeline and an explicit list of what isn't in V1. Bigger scopes cost more; I'll tell you which parts to cut to hold a number rather than quietly billing past it.",
    },
    {
      q: "I'm on spreadsheets right now. Should I buy ServiceTitan or build?",
      a: "Probably buy something first — and it might not be ServiceTitan. If your job stages are standard and your crew is small, Jobber or Housecall Pro will get you off spreadsheets for a fraction of the effort and a fraction of the price. Custom earns its cost when a tool actively fights how you work, not when you simply don't have one yet. Going straight from a spreadsheet to a custom build is usually paying to automate a process you haven't finished figuring out.",
    },
    {
      q: "Can you get my data out of ServiceTitan?",
      a: "Usually yes — customers, jobs, invoices and history come out through their export and API, and I map them into the new system before cutover. Be realistic about it: a real migration takes weeks, some historical detail never comes across cleanly, and running both systems in parallel for a period is normal. I'll tell you what will and won't survive the move before you commit to it.",
    },
    {
      q: "Will you tell me to just buy ServiceTitan?",
      a: "Yes, and it happens. If your operation matches the model, you need staffed 24/7 support, or you need to be live next week, buying beats building and I'd rather lose the invoice than sell you a project you'll resent in a year. What I ask for is thirty minutes to hear how you actually work before either of us decides.",
    },
  ],
  relatedLinks: [
    { href: "/field-service-software", label: "Custom field service software" },
    { href: "/job-management-software-utah", label: "Job management software in Utah" },
    { href: "/free-checklist", label: "10 signs you've outgrown your software" },
    { href: "/pricing", label: "Full published pricing" },
  ],
  contactHeading: "Tell me what you're evaluating.",
};
