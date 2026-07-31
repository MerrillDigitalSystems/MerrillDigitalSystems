/**
 * Homepage copy. Every number here is real and defensible — the Clutch
 * rating, the Manifest ranking, the case study results, the price ranges,
 * the warranty periods. Nothing is invented to fill space.
 */

export const HERO = {
  status: ["FOUNDER-LED", "CUSTOM-BUILT", "YOU OWN THE CODE"],
  lines: { first: "Replace the", second: "mess of", third: "with one system." },
  words: [
    "spreadsheets",
    "six SaaS tabs",
    "group texts",
    "paper tickets",
    "whiteboards",
  ],
  lede: "Custom software and websites built around how your business actually runs — the edge cases, the crew quirks, the workflow no off-the-shelf tool has a field for. Scoped, priced, and shipped by the one engineer you talk to. You own the code outright.",
  primaryCta: "BOOK A FREE DISCOVERY CALL →",
  secondaryCta: "SEE CLIENT RESULTS",
  card: {
    photoAlt: "Kruz Merrill, founder and engineer",
    name: "Kruz Merrill",
    role: "FOUNDER & ENGINEER",
    quote:
      "You talk to me. I build it. No agency layer, no junior handoff, no disappearing act after launch.",
    stats: [
      { value: "5.0", caption: "CLUTCH RATING", accent: true },
      { value: "#3", caption: "MANIFEST, UTAH", accent: false },
    ],
  },
} as const;

export const TICKER = [
  "★ 5.0 ON CLUTCH",
  "#3 THE MANIFEST — UTAH",
  "100% CODE OWNERSHIP",
  "V1 IN 6–12 WEEKS",
  "FEATURED · GOODFIRMS 2026",
  "REPLY WITHIN 24 HOURS",
  "WE RUN OUR OWN SAAS",
] as const;

export const PROMISES = [
  {
    n: "01",
    t: "The number comes first",
    b: "Scope, timeline and price agreed in writing — including what is deliberately not in V1 — before a line of code exists.",
    k: "IN WRITING",
  },
  {
    n: "02",
    t: "You own all of it",
    b: "Code, repos, domains and every account in your name on final payment. No license to renew, nothing held hostage.",
    k: "100% OWNERSHIP",
  },
  {
    n: "03",
    t: "One person, start to finish",
    b: "Whoever scopes it builds it and supports it. No account manager relaying messages, no junior handoff.",
    k: "FOUNDER-LED",
  },
  {
    n: "04",
    t: "Bug warranty, written down",
    b: "90 days on websites, up to 150 days on custom software. Bugs are mine to fix, not yours to pay for twice.",
    k: "90–150 DAYS",
  },
  {
    n: "05",
    t: "I'll talk you out of it",
    b: "If a $60-a-month tool already solves your problem, I name the tool and tell you to buy it. Losing an invoice beats losing trust.",
    k: "EVEN IF IT COSTS ME",
  },
] as const;

export const DOORS = [
  {
    label: "DOOR A",
    scope: "ops" as const,
    headline: "I need software my team actually runs on",
    body: "Your tools don't talk to each other. The business lives in spreadsheets and three overlapping SaaS products. You need one system built around your operation.",
    tags: ["OPERATIONS HUBS", "FIELD SERVICE", "MOBILE APPS", "INTEGRATIONS"],
    price: "From $25,000",
    timeline: "V1 IN 6–12 WEEKS →",
  },
  {
    label: "DOOR B",
    scope: "web" as const,
    headline: "I need a website that generates real leads",
    body: "You're a trades business, local service provider, or professional firm. You want a fast custom site that ranks — not the same template every competitor bought.",
    tags: ["LOCAL SEO", "GOOGLE BUSINESS", "LEAD CAPTURE", "ANALYTICS"],
    price: "From $3,000",
    timeline: "SHIPS IN 1–4 WEEKS →",
  },
] as const;

export const ROI = {
  lede: "Double data entry, dispatch mistakes, reports rebuilt by hand every Monday. It's a real line item — it just never shows up on an invoice.",
  outcomes: [
    "Cut admin overhead by up to 40%",
    "Reclaim 10–15 hours per manager per week",
    "Grow the business without growing headcount",
  ],
  cta: "STOP BURNING MONEY ON BUSYWORK →",
  caption: "ESTIMATE ASSUMES A $25,000 V1 · NO COMMITMENT",
} as const;

export const COMPARE = {
  columns: [
    "MERRILL DIGITAL",
    "TYPICAL AGENCY",
    "OFF-THE-SHELF SAAS",
    "CHEAPEST FREELANCER",
  ],
  rows: [
    {
      k: "Who you actually talk to",
      cells: [
        "The engineer building it",
        "An account manager",
        "A support ticket queue",
        "Whoever's free that week",
      ],
    },
    {
      k: "Who owns the code",
      cells: [
        "You, outright, on final payment",
        "Often the agency",
        "Nobody — you rent it",
        "You, if they hand it over",
      ],
    },
    {
      k: "What it costs in year three",
      cells: [
        "$0, or an optional retainer",
        "A new retainer and a new team",
        "Per-seat fees, forever, rising",
        "The cost of rebuilding it",
      ],
    },
    {
      k: "How well it fits your workflow",
      cells: [
        "Built around yours",
        "Built around their template",
        "You bend to theirs",
        "Whatever shipped fastest",
      ],
    },
    {
      k: "Time to a working V1",
      cells: [
        "6–12 weeks",
        "4–9 months",
        "Instant, then months of workarounds",
        "Unpredictable",
      ],
    },
    {
      k: "What happens after launch",
      cells: [
        "Bug warranty, then support if you want it",
        "Handoff to juniors",
        "A roadmap you don't control",
        "Usually unreachable",
      ],
    },
    {
      k: "Will they tell you not to buy",
      cells: ["Yes — in writing", "No", "No", "No"],
    },
  ],
  concession: {
    heading: "WHERE I LOSE",
    body: "If you need it live in 48 hours, need 24/7 staffed phone support, or need ten people building in parallel — an agency or an existing SaaS product is genuinely the better buy. I'll tell you that on the first call instead of taking a deposit.",
  },
} as const;

export const CASE_STUDIES = [
  {
    href: "/work/bktoolbox",
    image: "/img/preview-bktoolbox-opt.jpg",
    alt: "BK Toolbox Custom Home Designs website",
    eyebrow: "INTERIOR DESIGN · REMODELING · UTAH",
    title: "BK Toolbox",
    body: "Migrated fully off Wix — domain, email, and site — onto a custom platform they own outright. Two service lines, local SEO, self-managed VPS.",
    result: "100 SEO / 99 performance",
  },
  {
    href: "/work/ccl-pro",
    image: "/img/preview-cclpro-opt.jpg",
    alt: "CCL Pro landscaping website",
    eyebrow: "LANDSCAPING · WEB + DIGITAL",
    title: "CCL Pro",
    body: "Website plus the full digital stack: search-friendly structure, Google Business optimization, analytics. A digital brochure turned into a local lead engine.",
    result: "40% more lead capture",
  },
  {
    href: "/work/bays-baked-goods",
    image: "/img/preview-bays-opt.jpg",
    alt: "Bay's Baked Goods website",
    eyebrow: "LOCAL BUSINESS · BAKERY · UTAH",
    title: "Bay's Baked Goods",
    body: "Custom site for a West Jordan home bakery: mobile-first ordering story, menu structure, local SEO plus Google Business and Search Console setup.",
    result: "Local-ready launch",
  },
] as const;

export const SOFTWARE_PROJECTS = [
  {
    status: "LIVE · BOOKKEEPING",
    live: true,
    title: "Internal Operations OS",
    body: "Job tracking, reporting, and team coordination in one hub. Killed triple data entry across three disjointed SaaS tools.",
    result: "15 hrs/week saved",
    href: null,
  },
  {
    status: "LIVE · DENTAL GROUP",
    live: true,
    title: "Company Directory",
    body: "Announcements, role-based permissions, location verification, HR, training, and compliance for BrightPath Dental Center.",
    result: "5.0 Clutch · on schedule",
    href: "/work/brightpath-dental",
  },
  {
    status: "BETA · iOS & ANDROID",
    live: false,
    title: "Primis & Structura",
    body: "A fitness app with macro tracking and streaks, and a multi-tenant recurring-checklist platform for teams that run the same process weekly.",
    result: "In beta",
    href: null,
  },
] as const;

export const TESTIMONIAL = {
  quote:
    "Organized and proactive throughout. Clear communication, regular progress updates, and delivered on schedule.",
  badge: "CLUTCH ✓ VERIFIED",
  attribution: "DEPARTMENT DIRECTOR · BRIGHTPATH DENTAL",
  scores: [
    { label: "QUALITY", value: "5.0" },
    { label: "SCHEDULE", value: "5.0" },
    { label: "COST", value: "5.0" },
  ],
} as const;

export const SERVICES = [
  {
    n: "01",
    title: "Systems that run the business",
    body: "One place where the work actually lives — built around your operation instead of forcing your operation into someone else's software.",
    items: [
      "Operations hubs & business dashboards",
      "Field service, dispatch & scheduling",
      "Job, crew & work-order tracking",
      "Client and tenant portals",
      "Inventory, assets & maintenance history",
      "QuickBooks, Stripe, payroll & API integrations",
      "Reporting that builds itself",
    ],
    price: "From $25,000",
    meta: "V1 IN 6–12 WEEKS",
    href: "/operations-software",
  },
  {
    n: "02",
    title: "Websites that bring in work",
    body: "Custom-coded, fast, and built for search from day one — then handed over with every account in your name.",
    items: [
      "Lead-gen and service-business sites",
      "Local SEO & Google Business Profile",
      "Search Console + analytics, set up and handed over",
      "Migrations off Wix, Squarespace & GoDaddy",
      "Landing pages & campaign builds",
      "Booking, quoting & lead-capture flows",
    ],
    price: "From $3,000",
    meta: "SHIPS IN 1–4 WEEKS",
    href: "/web-design-utah",
  },
  {
    n: "03",
    title: "Apps & products",
    body: "From a rough idea to something real in the app store or the browser — with the backend and admin tools to actually run it.",
    items: [
      "iOS & Android apps",
      "Web apps and admin portals",
      "SaaS products and MVPs",
      "Backends, APIs & data models",
      "Automations and internal tooling",
      "Beta program → public launch",
    ],
    price: "From $25,000",
    meta: "SCOPED INDIVIDUALLY",
    href: "/pricing",
  },
] as const;

export const SERVICE_BANDS = {
  afterLaunch: {
    eyebrow: "AFTER LAUNCH",
    body: "Managed services if you want them — dedicated hosting we monitor, feature work at a reduced rate, and a direct line to the person who wrote your code. From $375/month, optional, never a lock-in.",
    href: "/managed-services",
  },
  notOnList: {
    eyebrow: "NOT ON THE LIST?",
    heading: "The list is a starting point, not a boundary.",
    body: "If it can be built with software, bring it. Tell me the idea and you'll get a straight answer on whether it's worth building, what it'd take, and whether something off the shelf already does it better.",
    cta: "PITCH ME THE IDEA →",
  },
} as const;

export const WHEN_NOT_TO = {
  lede: "No studio publishes this page. That's the point — if I'll be straight with you about the work I shouldn't take, you can trust me on the work I should.",
  cases: [
    {
      eyebrow: "CASE 01",
      title: "You need a site this week, for under $500",
      body: "Squarespace or Wix will get you online faster and cheaper than I can, and for a brand-new business that's the right first move.",
      instead:
        "tell you which builder fits, and set up your Google Business Profile on the call. No charge.",
    },
    {
      eyebrow: "CASE 02",
      title: "An existing tool already fits how you work",
      body: "If Jobber, Housecall Pro, or ServiceTitan already matches your workflow, buy it. Custom only wins when the tool fights you — not when it fits.",
      instead:
        "name the tool, and quote a flat fee only if you want help configuring it properly.",
    },
    {
      eyebrow: "CASE 03",
      title: "You need an ERP for 200 people in six states",
      body: "That's a staffed team with a project manager and a support desk, not one engineer. Anyone telling you otherwise is selling you a rescue project.",
      instead:
        "say so on day one, and point you at people who staff work at that scale.",
    },
  ],
} as const;

export const PROCESS = [
  {
    step: "STEP 01",
    title: "Discovery & scoping",
    body: "We map V1, name what's out of scope, and hand you a timeline and cost before any code is written.",
  },
  {
    step: "STEP 02",
    title: "Design & prototype",
    body: "Interactive wireframes so you can feel the product before production code starts. Fast, direct feedback.",
  },
  {
    step: "STEP 03",
    title: "Build & iterate",
    body: "Working software in short sprints. You see progress weekly and course-correct before anything goes too far.",
  },
  {
    step: "STEP 04",
    title: "Launch & stay supported",
    body: "Bug warranty included, then hosting, monitoring, and direct access to the person who built it.",
  },
] as const;

export const PUNCHLESS = {
  eyebrow: "OUR OWN PRODUCT · LIVE SAAS",
  heading: "We don't just build software. We ship and run it.",
  bodyLead: "Punchless",
  bodyRest:
    " is ours — GPS-geofenced timecards for field crews. Timecards draft themselves the moment a truck hits the job site, then export straight to payroll. It's the proof behind everything we build for you: real production software, operated by the same person who'd build yours.",
  ctaPrimary: "SEE PUNCHLESS →",
  ctaSecondary: "TRY IT FREE",
  externalUrl: "https://getpunchless.com",
  features: [
    {
      title: "GPS-verified",
      body: "Every timecard backed by an audit trail — no guesswork, no disputes on Friday.",
    },
    {
      title: "Payroll-ready",
      body: "Exports to QuickBooks, ADP, Gusto, Paychex, and CSV.",
    },
    {
      title: "HVAC to GC",
      body: "Plumbing, landscaping, electrical, and every crew on the move.",
    },
  ],
} as const;

export const CONTACT = {
  eyebrow: "GET IN TOUCH",
  heading: "Have a project in mind? Let's scope it out.",
  lede: "A rough idea is enough. Three fields and I have what I need to reply with something useful — within 24 hours, from me, not a sales rep.",
  info: [
    { label: "PHONE", value: "(385) 421-0455" },
    { label: "RESPONSE TIME", value: "Within 24 hours" },
    { label: "BASED", value: "West Jordan, UT · Remote" },
  ],
  formEyebrow: "TELL ME WHAT YOU NEED",
  formHeading: "Skip the call. I'll reach back within 24 hours.",
  submit: "SEND — REPLY WITHIN 24 HRS →",
  caption: "NO SPEC NEEDED · NO PRESSURE · NO JARGON",
} as const;
