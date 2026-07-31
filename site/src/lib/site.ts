/**
 * Single source of truth for business facts that appear in copy, metadata and
 * schema. Nothing here is aspirational — every number is one Kruz can defend.
 */

export const SITE = {
  name: "Merrill Digital Systems",
  legalName: "Merrill Digital Systems LLC",
  shortName: "Merrill Digital",
  tagline: "Less mess. More momentum.",
  url: "https://merrilldigitalsystems.com",
  email: "contact@merrilldigitalsystems.com",
  phone: "(385) 421-0455",
  phoneHref: "tel:+13854210455",
  phoneSchema: "+1-385-421-0455",
  founder: "Kruz Merrill",
  founderRole: "Founder & Engineer",
  address: {
    locality: "West Jordan",
    region: "UT",
    postalCode: "84088",
    country: "US",
  },
  geo: { latitude: "40.6097", longitude: "-111.9391" },
  sameAs: [
    "https://www.linkedin.com/company/merrill-digital-systems-llc/",
    "https://clutch.co/profile/merrill-digital-systems",
  ],
  gaId: "G-TKXPYR32LK",
  formspree: "https://formspree.io/f/meerjqwp",
  /** cal.com/merrill-digital/30min — the free discovery call. */
  calLink: "merrill-digital/30min",
} as const;

/**
 * Published pricing. Revised upward from the pre-2026 numbers on July 2026
 * market research — see the redesign handoff. Do not "correct" these back.
 */
export const PRICING = {
  webLow: 3000,
  webHigh: 9000,
  webRange: "$3,000–$9,000",
  webFrom: "From $3,000",
  webTimeline: "SHIPS IN 1–4 WEEKS",
  softwareFloor: 25000,
  softwareTypicalHigh: 65000,
  softwareRange: "$25,000–$65,000",
  softwareFrom: "From $25,000",
  softwareTimeline: "V1 IN 6–12 WEEKS",
  managedFrom: "From $375/month",
  /** Build cost the ROI calculator amortizes against. */
  roiBuildBaseline: 25000,
} as const;

/** Scarcity claim in the header. Must stay true — bump only when earned. */
export const CAPACITY = {
  slots: 3,
  label: "3 BUILD SLOTS THIS QUARTER",
} as const;

export const PROOF = {
  clutchRating: "5.0",
  manifestRank: "#3",
  manifestLabel: "MANIFEST, UTAH",
  websiteWarrantyDays: 90,
  softwareWarrantyDays: 150,
} as const;
