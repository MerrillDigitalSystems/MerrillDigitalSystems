import type { ServicePageData } from "../types";

export const BOOKKEEPING_SOFTWARE: ServicePageData = {
  slug: "/bookkeeping-software",
  title: "Custom Software for Bookkeeping Firms | Merrill Digital",
  description:
    "Client portals, stage tracking and two-way QuickBooks sync for bookkeeping firms. One live build gave a firm back 15 hours a week. From $25,000.",
  eyebrow: "BOOKKEEPING SOFTWARE · UTAH",
  h1: "Your clients shouldn't be emailing you documents.",
  lede: "A client portal, job stages your team actually uses, and a real two-way QuickBooks sync — built for how a bookkeeping or accounting firm runs, not adapted from a generic project tool. One system instead of three, and you own it.",
  crumbs: [
    { name: "Home", path: "/" },
    { name: "Bookkeeping software", path: "/bookkeeping-software" },
  ],
  intro: {
    label: "WHERE THE HOURS GO",
    heading: "The work is fine. The coordination is what's expensive.",
    body: "Bookkeeping firms rarely have a bookkeeping problem. They have a chasing problem — chasing bank statements out of email threads, chasing which stage a client is on, chasing the same figures across QuickBooks and a shared spreadsheet because neither one is the source of truth. None of it shows up as a line item, and all of it shows up in your evenings. I've built exactly this system and watched it hand back about fifteen hours a week.",
  },
  problems: [
    {
      title: "Documents arrive as email attachments",
      body: "Statements buried in threads, half of them sent to whoever the client spoke to last. Staff spend their week asking for things twice.",
    },
    {
      title: "Nobody can see where a client's work is",
      body: "What stage is this one on means asking the person assigned to it. Multiply that by every client and every partner who wants an update.",
    },
    {
      title: "The same data lives in two systems",
      body: "Entered in QuickBooks Online, entered again in the tracking spreadsheet. Double the work, and the two never quite agree at month end.",
    },
    {
      title: "Practice management charges per seat",
      body: "Per-user pricing means every hire raises your fixed cost, and you still bend your stage names and workflow to fit someone else's template.",
    },
  ],
  deliverables: {
    heading: "What a firm hub actually includes.",
    items: [
      {
        title: "A branded client portal",
        body: "Clients log in with their own credentials to upload statements, see what stage their work is at, approve deliverables and download finished reports. It looks like your firm, not a SaaS product.",
      },
      {
        title: "Engagement stages in your language",
        body: "Data received, in review, under revision, delivered — or whatever you actually call them. Every job's stage and owner visible at a glance without asking a person.",
      },
      {
        title: "Two-way QuickBooks and Xero sync",
        body: "Pull client data in, push deliverables and invoices out. Built to your spec rather than a read-only connection that still leaves someone retyping.",
      },
      {
        title: "A manager reporting dashboard",
        body: "Jobs in progress, jobs overdue, revenue for the month, capacity per staff member. Live, so the weekly compile stops being a task at all.",
      },
      {
        title: "Document management that stays organised",
        body: "Uploads land filed by client and engagement, with automatic notifications when a client sends something or a deliverable is ready.",
      },
      {
        title: "Staff roles and client access",
        body: "Partners see everything, staff see their assigned work, clients see only their own portal. Sensitive financial data doesn't leak across accounts by accident.",
      },
      {
        title: "Migration off the spreadsheet",
        body: "Client list, engagement history and open work move across during the build, agreed in scoping so nothing has to be re-keyed at launch.",
      },
      {
        title: "Ownership and a written warranty",
        body: "Source code, database schema and configuration are yours on final payment, with up to 150 days of bug warranty. No per-user license to renew.",
      },
    ],
  },
  proof: [
    {
      value: "15 hrs",
      label: "LIVE BUILD — SAVED PER WEEK",
      body: "A deployed bookkeeping operations hub with client login, stage tracking and QuickBooks sync handed the team back about fifteen hours a week.",
    },
    {
      value: "3 → 1",
      label: "SYSTEMS CONSOLIDATED",
      body: "Email, a shared tracking spreadsheet and manual reporting collapsed into one hub the whole firm works in.",
    },
    {
      value: "5.0",
      label: "CLUTCH RATING",
      body: "Quality, schedule and cost, from clients who published the review themselves.",
    },
  ],
  priceLabel: "BOOKKEEPING SOFTWARE",
  priceRange: "$25,000 – $65,000",
  priceTimeline: "V1 IN 6–12 WEEKS",
  schemaPriceRange: "$25000-$65000",
  serviceType: "Bookkeeping and accounting software development",
  faq: [
    {
      q: "How is this different from Karbon, Canopy or TaxDome?",
      a: "Those are genuinely good products, and for a lot of firms they're the right answer. Custom is different in two ways: the workflow is yours down to the stage names, and the cost is one build rather than a per-user fee that grows every time you hire. You also own the code, so no roadmap decision made by someone else can break how your firm works.",
    },
    {
      q: "Should we just buy practice management software instead?",
      a: "If your process already looks like theirs, yes — buy it, and I'll say so before you spend anything with me. The case for building shows up when your team keeps a spreadsheet alongside the platform you pay for, or when the feature you need is always one tier up. Losing an invoice beats selling you something you didn't need.",
    },
    {
      q: "Does it really sync with QuickBooks Online?",
      a: "Yes, two-way. Client and invoice data flows both directions so a finished engagement can trigger an invoice and payment status comes back into the job record without anyone re-keying. Xero works the same way, and Stripe collection is a common addition.",
    },
    {
      q: "Can clients upload documents and see their own status?",
      a: "That's the core of it. Clients log into a portal branded to your firm, upload statements and paperwork, see which stage their work is at, get notified when a deliverable is ready and download the finished file. The email chain mostly disappears, which is where a big share of the saved hours comes from.",
    },
    {
      q: "What does it cost and how long does it take?",
      a: "From $25,000, with most builds landing between $25,000 and $65,000, and a V1 shipping in 6–12 weeks. A portal plus stage tracking plus a real accounting integration sits in the middle of that range. The number and the out-of-scope list are agreed in writing before any code is written.",
    },
    {
      q: "Is our client data safe in a custom system?",
      a: "It's your system on your infrastructure, with role-based access so staff only see their assignments and clients only see their own portal. That's usually tighter than the status quo of financial documents sitting in a shared inbox. Backups, patching and monitoring are covered under a managed retainer if you'd rather not own that job.",
    },
  ],
  relatedLinks: [
    { href: "/operations-software", label: "Custom operations software" },
    { href: "/managed-services", label: "Managed hosting and support" },
    { href: "/pricing", label: "Full published pricing" },
    { href: "/web-design-utah", label: "Website design in Utah" },
  ],
  contactHeading: "Tell me where your firm loses its week.",
};
