import type { ServicePageData } from "../types";

export const MANAGED_SERVICES: ServicePageData = {
  slug: "/managed-services",
  title: "Managed Hosting & Software Support | Merrill Digital",
  description:
    "Dedicated hosting I monitor, security patching, and feature work from the person who wrote your code. From $375/month, month-to-month, never a lock-in.",
  eyebrow: "MANAGED SERVICES · AFTER LAUNCH",
  h1: "Support from the person who wrote the code.",

  schemaName: "Managed Website and Software Support",
  lede: "Dedicated hosting I watch directly, backups and patching on a schedule, and feature work at the retainer rate — with a message going to the engineer who built the thing rather than a ticket queue that's never seen it. Month to month, cancel whenever.",
  crumbs: [
    { name: "Home", path: "/" },
    { name: "Managed services", path: "/managed-services" },
  ],
  intro: {
    label: "WHAT THIS ACTUALLY IS",
    heading: "Not hosting. Someone who already knows your system.",
    body: "Most managed hosting means your files sit on a shared server, and when something breaks you open a ticket with a stranger who has never read a line of your code. This is the opposite arrangement. Think of it as a part-time technical person who already knows the codebase, because they wrote it — watching the infrastructure, patching it, and turning small changes around without a week of ramp-up first.",
  },
  problems: [
    {
      title: "You hear about downtime from a customer",
      body: "No monitoring means the first alert is a phone call asking why the form isn't working. By then it's been broken since Saturday.",
    },
    {
      title: "Every small change is a new engagement",
      body: "A new field or a copy update turns into finding a developer, briefing them on a codebase they've never seen, and paying for the reading time.",
    },
    {
      title: "Nobody is patching anything",
      body: "Dependencies age, certificates expire, a library picks up a known vulnerability. Nothing looks wrong until the day it very much does.",
    },
    {
      title: "The original developer went quiet",
      body: "It happens constantly. The build was fine; the disappearance is the problem, and it leaves you with an asset nobody can safely touch.",
    },
  ],
  deliverables: {
    heading: "What the managed services retainer covers.",
    items: [
      {
        title: "Dedicated hosting",
        body: "Your site or app runs on its own infrastructure that I configure and manage, not a shared pool that slows down when someone else's traffic spikes.",
      },
      {
        title: "Uptime and error monitoring",
        body: "Alerts route to me, not to a queue checked on business days. In most cases the problem is being looked at before you'd have noticed it.",
      },
      {
        title: "Backups you could actually restore from",
        body: "Scheduled database and file backups, plus restore checks — because a backup nobody has ever tested is just a hopeful folder.",
      },
      {
        title: "Security patching and dependency updates",
        body: "Framework, library and certificate updates applied on a schedule rather than after an incident. Breaking changes get tested before they touch production.",
      },
      {
        title: "Feature work at the retainer rate",
        body: "A monthly block of development hours at a reduced rate. New fields, new pages, new workflows — fast, because there's no let me read the codebase delay.",
      },
      {
        title: "Direct access, no ticket queue",
        body: "You message the person who wrote the code and get an answer with full context. No account manager relaying it, no copy-pasted help article.",
      },
      {
        title: "Priority turnaround",
        body: "Retainer clients sit at the front of the queue. Urgent issues get same-day attention instead of waiting behind a new project engagement.",
      },
      {
        title: "A clean exit whenever you want one",
        body: "Month to month with 30 days notice. You already own the code, and you leave with hosting credentials, access and documentation in hand.",
      },
    ],
  },
  proof: [
    {
      value: "100 / 99",
      label: "BK TOOLBOX — SEO / PERFORMANCE",
      body: "Migrated off Wix onto a self-managed VPS they own outright, then kept patched and monitored under a retainer.",
    },
    {
      value: "5.0",
      label: "CLUTCH RATING",
      body: "Quality, schedule and cost, from clients who published the review themselves.",
    },
    {
      value: "LIVE",
      label: "BRIGHTPATH DENTAL — DIRECTORY",
      body: "A company directory in daily use — announcements, roles, HR and compliance — supported by the person who built it.",
    },
  ],
  priceLabel: "MANAGED SERVICES",
  priceRange: "From $375 / month",
  priceTimeline: "MONTHLY · NEVER A LOCK-IN",
  schemaPriceRange: "$375-$1500",
  serviceType: "Managed hosting and software support",
  faq: [
    {
      q: "What does a managed retainer cost?",
      a: "From $375 a month for a custom marketing site, rising with the complexity of the system and how many development hours you want included. An operations hub with a database, integrations and error monitoring sits higher than a brochure site, and the number is agreed before you start. It runs month to month with 30 days notice.",
    },
    {
      q: "Do I need this after my project launches?",
      a: "No, and plenty of clients don't take it. Every build ships with a bug warranty — 90 days on websites, up to 150 days on custom software — and you own everything outright, so the site or app keeps running whether or not you pay me another dollar. The retainer is for when you'd rather someone was already watching it.",
    },
    {
      q: "Is this worth it for a simple website?",
      a: "Often not, and I'll say so. If it's a small static site with no forms, no logins and no database, a free tier on Netlify or Vercel will host it fine and you can call me when you actually need something changed. The retainer earns its money once there's a database, an integration, or real money moving through the thing.",
    },
    {
      q: "How is this different from regular hosting?",
      a: "Standard hosting rents you space and gives you support from people who've never seen your code. Here, the infrastructure is dedicated and monitored directly, and the person answering your message is the one who built the system. That difference shows up most at 11pm on a Saturday, which is when things tend to break.",
    },
    {
      q: "Can you support something you didn't build?",
      a: "Sometimes. I'll review the codebase first and give you a straight answer, because taking over a system I can't safely maintain helps nobody. If it's a reasonable stack and reasonably written, onboarding it is fine. If it's a mess, I'd rather tell you that than bill you monthly for crossed fingers.",
    },
    {
      q: "What if I want to leave?",
      a: "You give 30 days notice and I hand over cleanly — code, hosting credentials, DNS, environment configuration and whatever documentation exists. There's nothing to unwind because you already own all of it. No exit fee, no data held hostage, no awkward final call.",
    },
  ],
  relatedLinks: [
    { href: "/pricing", label: "Full published pricing" },
    { href: "/operations-software", label: "Custom operations software" },
    { href: "/web-design-utah", label: "Website design in Utah" },
    { href: "/work/bktoolbox", label: "Case study: BK Toolbox" },
  ],  cluster: {
    label: "THE REST OF THE SYSTEM",
    heading: "Related builds, and the reading behind them.",
    links: [
      { href: "/operations-software", label: "Custom operations software" },
      { href: "/web-design-utah", label: "Website design across Utah" },
      { href: "/field-service-software", label: "Field service software" },
      { href: "/bookkeeping-software", label: "Bookkeeping firm software" },
      { href: "/punchless", label: "Punchless — our own SaaS product" },
      { href: "/blog", label: "Field notes on software and websites" },
    ],
  },

  contactHeading: "Tell me what needs looking after.",
};
