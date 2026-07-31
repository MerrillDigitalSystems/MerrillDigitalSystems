/**
 * Scope-builder dataset. Market-researched July 2026 — these numbers are
 * deliberately at the bottom of the honest market, still 2–3x under agency
 * pricing without signalling "cheap". Do not adjust downward.
 */

export type ScopeType = "ops" | "web" | "app";

export type Mod = {
  id: string;
  label: string;
  lo: number;
  hi: number;
  /** Weeks added to both ends of the timeline. */
  w: number;
};

export type ScopeConfig = {
  label: string;
  lo: number;
  hi: number;
  w1: number;
  w2: number;
  mods: Mod[];
};

export const SCOPE: Record<ScopeType, ScopeConfig> = {
  ops: {
    label: "OPERATIONS SOFTWARE",
    lo: 25000,
    hi: 38000,
    w1: 6,
    w2: 9,
    mods: [
      { id: "mobile", label: "Mobile app for crews in the field", lo: 8000, hi: 14000, w: 3 },
      { id: "sched", label: "Scheduling & dispatch board", lo: 4000, hi: 8000, w: 2 },
      { id: "portal", label: "Customer or client portal", lo: 3500, hi: 7000, w: 2 },
      { id: "integ", label: "QuickBooks, payroll & Stripe sync", lo: 3000, hi: 6000, w: 1 },
      { id: "report", label: "Reporting & live dashboards", lo: 2500, hi: 5000, w: 1 },
      { id: "inv", label: "Inventory & asset tracking", lo: 3000, hi: 6000, w: 2 },
      { id: "rbac", label: "Roles, permissions & audit log", lo: 2000, hi: 4000, w: 1 },
    ],
  },
  web: {
    label: "WEBSITE",
    lo: 3000,
    hi: 5000,
    w1: 1,
    w2: 2,
    mods: [
      { id: "seo", label: "Local SEO + Google Business Profile", lo: 700, hi: 1500, w: 1 },
      { id: "pages", label: "Service-area pages (5 or more)", lo: 900, hi: 1800, w: 1 },
      { id: "book", label: "Booking or quote-request flow", lo: 1200, hi: 2400, w: 1 },
      { id: "copy", label: "Copywriting for every page", lo: 1000, hi: 2000, w: 1 },
      { id: "migrate", label: "Migration off Wix or Squarespace", lo: 600, hi: 1400, w: 1 },
      { id: "blog", label: "Blog / content system", lo: 700, hi: 1500, w: 1 },
    ],
  },
  app: {
    label: "MOBILE OR WEB APP",
    lo: 25000,
    hi: 40000,
    w1: 8,
    w2: 12,
    mods: [
      { id: "both", label: "iOS and Android, not just one", lo: 5000, hi: 9000, w: 2 },
      { id: "auth", label: "Accounts, auth & subscription billing", lo: 3500, hi: 7000, w: 2 },
      { id: "admin", label: "Admin portal for your team", lo: 4000, hi: 8000, w: 2 },
      { id: "api", label: "Third-party API integrations", lo: 3000, hi: 6000, w: 1 },
      { id: "push", label: "Push notifications & messaging", lo: 2000, hi: 4000, w: 1 },
      { id: "analytics", label: "Analytics & event tracking", lo: 1500, hi: 3000, w: 1 },
    ],
  },
};

export const SCOPE_ORDER: ScopeType[] = ["ops", "web", "app"];

export const SCOPE_COPY = {
  heading: "Price it yourself. Right here, no form.",
  lede: 'Everyone else says "contact us for pricing." Pick what you actually need and watch the range move — it\'s the same math I\'d do on a call, and it costs you nothing to look.',
  reset: "RESET SELECTION",
  rangeLabel: "YOUR ESTIMATED RANGE",
  timelineLabel: "TIMELINE",
  addonsLabel: "ADD-ONS PICKED",
  addonsEmpty: "None yet",
  includedLabel: "INCLUDED IN EVERY BUILD",
  included: [
    "Scope, timeline and price agreed in writing first",
    "Full code ownership and every account in your name",
    "Bug warranty after launch, in writing",
    "The person who scoped it is the person who builds it",
  ],
  cta: "SEND ME THIS SCOPE",
  caption: "A RANGE, NOT A QUOTE · THE REAL NUMBER COMES AFTER DISCOVERY",
} as const;

export const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
