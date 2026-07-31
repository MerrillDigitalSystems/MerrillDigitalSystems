import type { ServicePageData } from "../types";

export const FIELD_SERVICE_SOFTWARE: ServicePageData = {
  slug: "/field-service-software",
  title: "Custom Field Service Software | Merrill Digital",
  description:
    "Dispatch, mobile check-ins and pay rules built around your real operation — including the edge cases Jobber and ServiceTitan can't model. From $25,000.",
  eyebrow: "FIELD SERVICE SOFTWARE · UTAH",
  h1: "Built for the jobs that don't fit the dropdown.",
  lede: "Dispatch, routing, mobile check-ins and time capture for crews whose work keeps breaking off-the-shelf software — job sites with no address, multi-rate pay, approvals nobody else models. One build, no per-seat fees, and you own the code.",
  crumbs: [
    { name: "Home", path: "/" },
    { name: "Field service software", path: "/field-service-software" },
  ],
  intro: {
    label: "WHERE PACKAGED FSM BREAKS",
    heading: "The exceptions are the actual workflow.",
    body: "Packaged field service tools are built for the average company, and if you're average they're the right buy. The trouble starts when the thing your business does differently is the thing the software has no field for. A pay rule with travel time and a second rate after hours. A job site identified by a mine gate rather than a street address. Three purchase orders at one location. Those aren't edge cases to you — they're Tuesday.",
  },
  problems: [
    {
      title: "Per-seat pricing punishes growth",
      body: "Every technician you hire raises the monthly bill before they've turned a wrench. Grow the crew and the software cost grows with it, forever.",
    },
    {
      title: "The job site has no address",
      body: "Mine sites, new construction, a field off a county road. Anything that geocodes by street address quietly fails, and your dispatch board fills with workarounds.",
    },
    {
      title: "Your pay rules don't exist in their model",
      body: "Travel pay, per-diem, multiple rates on one day, prevailing wage. If payroll gets rebuilt in a spreadsheet every week, that's the software telling you it can't count.",
    },
    {
      title: "No visibility until Monday morning",
      body: "Photos in a camera roll, notes on a paper ticket, hours reconstructed from memory on Friday. You find out what happened days after you could have done anything about it.",
    },
  ],
  deliverables: {
    heading: "What ships in a field service V1.",
    items: [
      {
        title: "Dispatch and route planning",
        body: "Assign jobs to techs, see who's actually available, and build a day that makes geographic sense. Changes push to the phone instead of turning into phone tag.",
      },
      {
        title: "Mobile check-ins that work in the canyon",
        body: "Techs open their day, mark jobs started and finished, and capture photos from their phone. Offline-capable screens sync when signal comes back rather than failing outright.",
      },
      {
        title: "Recurring and seasonal schedules",
        body: "Weekly, bi-weekly and monthly work auto-populates, with skips, holds and seasonal shifts handled without rebuilding the calendar by hand.",
      },
      {
        title: "Checklists, notes and photo capture",
        body: "A different checklist per service type, filled in the field, visible to managers as it happens and summarised for the customer afterwards.",
      },
      {
        title: "Time capture and pay logic",
        body: "Your rules, modelled properly — travel, multiple rates, overtime, per-diem. GPS-assisted drafts mean techs confirm a timecard in a minute rather than rebuilding the week.",
      },
      {
        title: "Invoicing that starts from the work",
        body: "A finished job becomes an invoice. Two-way QuickBooks Online or Xero sync and Stripe collection mean nobody retypes a line item.",
      },
      {
        title: "One manager dashboard",
        body: "Every job, tech and route in one live view — completion rates, job times, revenue per route, what's outstanding. No spreadsheet archaeology.",
      },
      {
        title: "Ownership and a written warranty",
        body: "Code, database and infrastructure config handed over on final payment, with up to 150 days of bug warranty. Any developer can pick it up after me.",
      },
    ],
  },
  proof: [
    {
      value: "LIVE",
      label: "PUNCHLESS — MY OWN SAAS",
      body: "GPS-geofenced timecards for field crews, running in production and operated by me. Field time tracking isn't theory here.",
    },
    {
      value: "5.0",
      label: "CLUTCH RATING",
      body: "Quality, schedule and cost, from clients who published the review themselves.",
    },
    {
      value: "#3",
      label: "THE MANIFEST — UTAH",
      body: "Ranked third among Utah software developers, based on verified client reviews rather than ad spend.",
    },
  ],
  priceLabel: "FIELD SERVICE SOFTWARE",
  priceRange: "$25,000 – $65,000",
  priceTimeline: "V1 IN 6–12 WEEKS",
  schemaPriceRange: "$25000-$65000",
  serviceType: "Field service software development",
  faq: [
    {
      q: "How is this different from ServiceTitan or Jobber?",
      a: "Those platforms have fixed workflows and per-seat pricing, which is a fair trade when your process matches theirs. Custom is for the operations they structurally can't model — unusual pay logic, job sites without addresses, dispatch rules that aren't on anyone's roadmap. You also own the result, so nobody can reprice you or retire a feature you depend on.",
    },
    {
      q: "Should I just buy Jobber or Housecall Pro instead?",
      a: "Quite possibly, and I'll tell you on the call. If your job stages look roughly like theirs, headcount is stable and standard reporting answers your real questions, buying is faster and cheaper than building and you should do it. The honest trigger for custom is friction, not size — people maintaining spreadsheets beside the software they already pay for.",
    },
    {
      q: "Will it work on a phone with no signal?",
      a: "Yes, when the scope calls for it. Utah crews work canyons, basements and rural sites where coverage disappears, so key screens can be built offline-first and sync once signal returns. That's a scoping decision rather than a default, because offline support adds real engineering and not every crew needs it.",
    },
    {
      q: "Can it do GPS tracking and job-site verification?",
      a: "Yes — technician location, check-in within a radius of the job site, and a live map of where the crew is. How much of that belongs in V1 depends on whether you're solving disputes, job costing or dispatch. I run Punchless, a GPS timecard product, so this is well-trodden ground.",
    },
    {
      q: "Does it integrate with QuickBooks for invoicing?",
      a: "Yes. Two-way QuickBooks Online and Xero integrations are standard work here, so completed jobs flow into invoicing without re-entry and payment status flows back onto the job. Stripe collection and payroll exports are equally common.",
    },
    {
      q: "How long does a V1 take?",
      a: "Six to twelve weeks from signed scope, fixed at the start. The timeline holds because the feature list, the delivery date and the explicit out-of-scope section are written down before the build begins. You see working features weekly rather than one reveal at the end.",
    },
  ],
  relatedLinks: [
    { href: "/job-management-software-utah", label: "Job management software in Utah" },
    { href: "/operations-software", label: "Custom operations software" },
    { href: "/punchless", label: "Punchless — GPS timecards" },
    { href: "/pricing", label: "Full published pricing" },
  ],
  contactHeading: "Tell me what your software can't handle.",
};
