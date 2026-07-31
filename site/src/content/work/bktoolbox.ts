import type { CaseStudyData } from "../types";

/**
 * The two PageSpeed numbers here (100 SEO, 99 performance) are the verified
 * ones. Nothing else on this page is a metric, on purpose.
 */
export const BKTOOLBOX: CaseStudyData = {
  slug: "/work/bktoolbox",
  title: "BK Toolbox — Off Wix Onto a Site They Own | Merrill Digital",
  description:
    "How BK Toolbox moved off Wix onto a custom site they own outright — domain, email and hosting included. 100 SEO, 99 performance on PageSpeed.",
  client: "BK Toolbox",
  eyebrow: "CASE STUDY · INTERIOR DESIGN & REMODELING",
  h1: "Off Wix, onto code they own.",
  lede:
    "BK Toolbox Custom Home Designs does interiors and remodels across Utah. Their whole presence was one templated Wix page, on a platform that held the keys to their own domain. I moved all of it — domain, email, and site — onto a custom platform they own outright, built around the two service lines they actually sell.",
  image: "/img/preview-bktoolbox-opt.jpg",
  imageAlt:
    "BK Toolbox Custom Home Designs website — custom-coded interior design and remodeling site built by Merrill Digital Systems",
  facts: [
    { label: "CLIENT", value: "BK Toolbox Custom Home Designs" },
    { label: "INDUSTRY", value: "Interior design & remodeling" },
    { label: "SCOPE", value: "Wix migration, custom site, local SEO" },
    { label: "STATUS", value: "Live at bktoolbox.com" },
  ],
  problem: [
    "BK Toolbox owned bktoolbox.com, but the domain, the email, and the site all lived inside Wix. A single generic page had to cover two very different service lines — interior design and home remodeling — and the whole presence stopped wherever the template stopped.",
    "Image alt text was still raw iPhone filenames. There was no local targeting anywhere, so a homeowner two cities over searching for a remodeler never saw them. And every month the site stayed up, the bill went to a platform that could change the terms whenever it wanted.",
    "For a business whose entire pitch is craftsmanship and attention to detail, the site was arguing the other side.",
  ],
  built: [
    {
      title: "The whole migration, not just the site",
      body: "Domain, Google Workspace email, and the website moved off Wix together, onto a VPS they manage. Nothing was left behind and no email bounced in transit.",
    },
    {
      title: "Two service lines, two paths",
      body: "Interior design and remodeling each got their own overview, portfolio, and quote flow — instead of sharing one page that sold neither of them well.",
    },
    {
      title: "City pages that name the city",
      body: "Local landing pages for the Utah markets they actually work in, so a search that ends in a phone call has somewhere specific to land.",
    },
    {
      title: "Alt text written by a person",
      body: "Every image described in words a human would use. IMG_3995.heic tells Google nothing and a screen reader even less.",
    },
    {
      title: "Technical SEO shipped with the build",
      body: "Meta descriptions, canonical tags, Open Graph and Twitter cards, all set at launch — not bolted on months later when the traffic doesn't show up.",
    },
    {
      title: "No subscription to stay online",
      body: "The site runs on hosting in their name. If they never speak to me again, it keeps working, and nobody can switch it off but them.",
    },
  ],
  results: [
    {
      value: "100",
      label: "SEO SCORE",
      body: "Google PageSpeed Insights, run against the live site. Not a staging build with the images stripped out.",
    },
    {
      value: "99",
      label: "PERFORMANCE",
      body: "Desktop, on an image-heavy portfolio. Photos are the product in this trade, so they had to load fast rather than load later.",
    },
    {
      value: "Owned",
      label: "DOMAIN, EMAIL, HOSTING",
      body: "All three in their name on final payment. No license to renew, no plan to keep paying, nothing held hostage.",
    },
  ],
  stack: [
    "Next.js",
    "Self-managed VPS",
    "Local SEO",
    "Two service lines",
    "Full ownership",
  ],
  relatedLinks: [
    { href: "/web-design-utah", label: "Website design in Utah" },
    { href: "/work/ccl-pro", label: "CCL Pro case study" },
    { href: "/pricing", label: "What this costs" },
  ],
};
