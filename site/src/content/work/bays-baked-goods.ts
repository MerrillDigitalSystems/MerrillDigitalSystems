import type { CaseStudyData } from "../types";

/**
 * This one is a launch, not a metrics story. There are no traffic or order
 * numbers here because there aren't any to report yet.
 */
export const BAYS_BAKED_GOODS: CaseStudyData = {
  slug: "/work/bays-baked-goods",
  title: "Bay's Baked Goods — West Jordan Bakery Site | Merrill Digital",
  description:
    "A custom mobile-first site for a West Jordan home bakery — menu structure, local SEO, Google Business Profile and Search Console, all done at launch.",
  client: "Bay's Baked Goods",

  datePublished: "2026-07-31",
  eyebrow: "CASE STUDY · HOME BAKERY · WEST JORDAN",
  h1: "A home bakery, findable from a phone.",
  lede:
    "Bay's Baked Goods runs out of a West Jordan kitchen. Almost everyone who'd buy from her lives within a few miles, and every one of them is holding a phone. So the site is built for exactly that: the menu first, ordering second, and the local setup done properly before launch instead of a year after it.",
  image: "/img/preview-bays-opt.jpg",
  imageAlt:
    "Bay's Baked Goods website — mobile-first site for a West Jordan home bakery built by Merrill Digital Systems",
  facts: [
    { label: "CLIENT", value: "Bay's Baked Goods" },
    { label: "INDUSTRY", value: "Home bakery" },
    { label: "LOCATION", value: "West Jordan, UT" },
    { label: "STATUS", value: "Live" },
  ],
  problem: [
    "A home bakery's whole market is the neighborhood, and the neighborhood searches on a phone. Without a site, the only people who could order were the ones who already knew her — which caps the business at however far word of mouth has travelled so far.",
    "Social posts move fast and disappear just as fast. There was nowhere permanent that answered the two questions every new customer has: what do you make, and how do I order it?",
    "This was a launch, not a rescue. No traffic to recover, no rankings to protect. The job was to build it right the first time and get it on the map before the first Saturday rush.",
  ],
  built: [
    {
      title: "The menu is the point",
      body: "What she bakes, grouped so it can be read in one thumb-scroll. Nobody wants a company story before they find out whether you make the thing they came for.",
    },
    {
      title: "Ordering that works one-handed",
      body: "The path from menu item to placing an order is short and works on a phone, because that's where almost all of it happens.",
    },
    {
      title: "Structure built for local search",
      body: "Pages and headings written around what a West Jordan neighbor actually types, not around what a bakery would call itself in a brochure.",
    },
    {
      title: "Google Business Profile, set up at launch",
      body: "Categories, service area, hours, photos. For a home business it is often the first result someone sees, and the only one they read.",
    },
    {
      title: "Search Console from day one",
      body: "Verified and connected at launch, so indexing can be watched from the start rather than diagnosed six months in.",
    },
    {
      title: "Photos that don't stall the page",
      body: "Food photography is the whole sell here. Compressed and sized properly so the page still opens fast on a phone on a bad connection.",
    },
  ],
  results: [
    {
      value: "Live",
      label: "LAUNCHED",
      body: "Site up, menu published, ordering path working. No soft launch, no coming-soon page sitting there for a month.",
    },
    {
      value: "Local",
      label: "ON THE MAP",
      body: "Google Business Profile and Search Console set up and handed over, so a West Jordan search has something to find.",
    },
    {
      value: "Hers",
      label: "DOMAIN + ACCOUNTS",
      body: "Everything in her name. No numbers to report yet — it's a launch, and I'd rather say that than invent some.",
    },
  ],
  stack: [
    "Custom-coded site",
    "Mobile-first",
    "Local SEO",
    "Google Business Profile",
  ],
  relatedLinks: [
    { href: "/web-design-west-jordan", label: "Web design in West Jordan" },
    { href: "/web-design-utah", label: "Website design in Utah" },
    { href: "/work/ccl-pro", label: "CCL Pro case study" },
    { href: "/pricing", label: "What this costs" },
  ],
};
