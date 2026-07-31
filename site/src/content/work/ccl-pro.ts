import type { CaseStudyData } from "../types";

/**
 * The only number on this page is the 40% lift in captured leads. There is no
 * traffic figure and no revenue figure because neither was measured.
 */
export const CCL_PRO: CaseStudyData = {
  slug: "/work/ccl-pro",
  title: "CCL Pro — 40% More Lead Capture | Merrill Digital",
  description:
    "A Utah landscaping company's website plus the digital stack around it — search-friendly structure, Google Business, analytics. 40% more lead capture.",
  client: "CCL Pro",
  eyebrow: "CASE STUDY · LANDSCAPING · WEB + DIGITAL",
  h1: "A brochure turned into a lead engine.",
  lede:
    "CCL Pro had a website. What it didn't have was a path from a search to a phone call. I rebuilt the site and the digital stack around it — structure a search engine can actually read, a Google Business Profile filled out properly, and analytics so decisions stopped being guesses. Same company, 40% more lead capture.",
  image: "/img/preview-cclpro-opt.jpg",
  imageAlt:
    "CCL Pro landscaping website — custom-coded lead generation site built by Merrill Digital Systems",
  facts: [
    { label: "CLIENT", value: "CCL Pro" },
    { label: "INDUSTRY", value: "Landscaping" },
    { label: "SCOPE", value: "Website, local SEO, analytics" },
    { label: "STATUS", value: "Live" },
  ],
  problem: [
    "The old site described the company and then stopped. No clear next step, no reason to call today, nothing that told a homeowner this crew does the exact job they'd just searched for. It was a brochure that happened to be online.",
    "Every service was bundled onto one page, so sprinkler repair, sod, and spring cleanup all landed on the same paragraph. Google had nothing specific to rank and the visitor had nothing specific to read — which is the same problem wearing two hats.",
    "And nothing was measured. No analytics, no Search Console. When the phone was quiet there was no way to tell whether the problem was traffic, the site, or the season.",
  ],
  built: [
    {
      title: "One page per service",
      body: "Each thing they sell got its own URL and its own copy, so the search matches the page and the page matches the job.",
    },
    {
      title: "A Google Business Profile that's finished",
      body: "Categories, service areas, hours, services, photos — filled in properly. For a local trade, the profile often outranks the website itself.",
    },
    {
      title: "A way to convert on every page",
      body: "Form and click-to-call within reach wherever someone lands, because most of them arrive on a service page and never see the homepage.",
    },
    {
      title: "Analytics and Search Console, handed over",
      body: "Both set up in CCL Pro's accounts, not mine. They can see which pages bring work in without asking me for a report.",
    },
    {
      title: "Fast on a phone in a driveway",
      body: "Compressed images, sensible page weight, real mobile layout. Half this audience is standing in their yard when they search.",
    },
    {
      title: "Every account in their name",
      body: "Domain, hosting, profile, analytics. If they ever want to work with someone else, nothing has to be pried loose first.",
    },
  ],
  results: [
    {
      value: "40%",
      label: "MORE LEAD CAPTURE",
      body: "Out of the same traffic. The gain came from the paths people take through the site, not from buying more visitors.",
    },
    {
      value: "Live",
      label: "SITE + PROFILE",
      body: "Website, Google Business Profile, and analytics running as one setup instead of three things nobody quite owns.",
    },
    {
      value: "Owned",
      label: "EVERY ACCOUNT",
      body: "Handed over on final payment. No retainer required to keep any of it working.",
    },
  ],
  stack: [
    "Custom-coded site",
    "Local SEO",
    "Google Business Profile",
    "Analytics",
  ],
  relatedLinks: [
    { href: "/landscaping-website-design-utah", label: "Landscaping website design" },
    { href: "/web-design-utah", label: "Website design in Utah" },
    { href: "/work/bays-baked-goods", label: "Bay's Baked Goods case study" },
    { href: "/pricing", label: "What this costs" },
  ],
};
