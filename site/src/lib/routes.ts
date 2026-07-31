/**
 * Every indexable route on the new site. Drives app/sitemap.ts and the
 * pre-cutover parity audit. Slugs are carried over verbatim from the pre-2026
 * site — only the .html extension is dropped — so the 301 map stays 1:1.
 */

export type Route = {
  path: string;
  priority: number;
  changefreq: "weekly" | "monthly" | "yearly";
  lastmod: string;
  /** Absent on routes that are new in this rebuild. */
  legacy?: string;
};

const TODAY = "2026-07-31";

export const ROUTES: Route[] = [
  { path: "/", priority: 1.0, changefreq: "monthly", lastmod: TODAY, legacy: "/index.html" },

  // Money pages
  { path: "/pricing", priority: 0.95, changefreq: "monthly", lastmod: TODAY },
  { path: "/operations-software", priority: 0.95, changefreq: "monthly", lastmod: TODAY, legacy: "/operations-software.html" },
  { path: "/bookkeeping-software", priority: 0.95, changefreq: "monthly", lastmod: TODAY, legacy: "/bookkeeping-software.html" },
  { path: "/web-design-utah", priority: 0.95, changefreq: "monthly", lastmod: TODAY, legacy: "/web-design-utah.html" },
  { path: "/field-service-software", priority: 0.8, changefreq: "monthly", lastmod: TODAY, legacy: "/field-service-software.html" },
  { path: "/managed-services", priority: 0.9, changefreq: "monthly", lastmod: TODAY, legacy: "/managed-services.html" },
  { path: "/job-management-software-utah", priority: 0.9, changefreq: "monthly", lastmod: TODAY, legacy: "/job-management-software-utah.html" },
  { path: "/punchless", priority: 0.9, changefreq: "monthly", lastmod: TODAY, legacy: "/punchless.html" },

  // Verticals
  { path: "/hvac-website-design-utah", priority: 0.9, changefreq: "monthly", lastmod: TODAY, legacy: "/hvac-website-design-utah.html" },
  { path: "/plumber-website-design-utah", priority: 0.9, changefreq: "monthly", lastmod: TODAY, legacy: "/plumber-website-design-utah.html" },
  { path: "/electrician-website-design-utah", priority: 0.9, changefreq: "monthly", lastmod: TODAY, legacy: "/electrician-website-design-utah.html" },
  { path: "/landscaping-website-design-utah", priority: 0.9, changefreq: "monthly", lastmod: TODAY, legacy: "/landscaping-website-design-utah.html" },
  { path: "/roofing-website-design-utah", priority: 0.9, changefreq: "monthly", lastmod: TODAY, legacy: "/roofing-website-design-utah.html" },
  { path: "/contractor-website-design-utah", priority: 0.9, changefreq: "monthly", lastmod: TODAY, legacy: "/contractor-website-design-utah.html" },

  // Cities — West Jordan is the HQ and was missing entirely
  { path: "/web-design-west-jordan", priority: 0.85, changefreq: "monthly", lastmod: TODAY },
  { path: "/web-design-salt-lake-city", priority: 0.8, changefreq: "monthly", lastmod: TODAY, legacy: "/web-design-salt-lake-city.html" },
  { path: "/web-design-provo", priority: 0.8, changefreq: "monthly", lastmod: TODAY, legacy: "/web-design-provo.html" },
  { path: "/web-design-ogden", priority: 0.8, changefreq: "monthly", lastmod: TODAY, legacy: "/web-design-ogden.html" },

  // Comparison + tools
  { path: "/custom-software-vs-servicetitan-utah", priority: 0.85, changefreq: "monthly", lastmod: TODAY, legacy: "/custom-software-vs-servicetitan-utah.html" },
  { path: "/free-audit", priority: 0.85, changefreq: "monthly", lastmod: TODAY, legacy: "/free-audit.html" },
  { path: "/free-checklist", priority: 0.8, changefreq: "monthly", lastmod: TODAY, legacy: "/free-checklist.html" },
  { path: "/roi-calculator", priority: 0.9, changefreq: "monthly", lastmod: TODAY, legacy: "/roi-calculator.html" },

  // Work
  { path: "/work/bktoolbox", priority: 0.85, changefreq: "monthly", lastmod: TODAY, legacy: "/work/bktoolbox.html" },
  { path: "/work/brightpath-dental", priority: 0.85, changefreq: "monthly", lastmod: TODAY, legacy: "/work/brightpath-dental.html" },
  { path: "/work/ccl-pro", priority: 0.85, changefreq: "monthly", lastmod: TODAY },
  { path: "/work/bays-baked-goods", priority: 0.85, changefreq: "monthly", lastmod: TODAY },

  // Blog — slugs preserved exactly, including the flat blog- prefix
  { path: "/blog", priority: 0.7, changefreq: "weekly", lastmod: TODAY, legacy: "/blog.html" },
  { path: "/blog-field-service-software-cost", priority: 0.75, changefreq: "monthly", lastmod: TODAY, legacy: "/blog-field-service-software-cost.html" },
  { path: "/blog-jobber-vs-custom-software", priority: 0.75, changefreq: "monthly", lastmod: TODAY, legacy: "/blog-jobber-vs-custom-software.html" },
  { path: "/blog-servicetitan-vs-custom-software", priority: 0.7, changefreq: "monthly", lastmod: TODAY, legacy: "/blog-servicetitan-vs-custom-software.html" },
  { path: "/blog-field-service-software-vs-off-the-shelf", priority: 0.7, changefreq: "monthly", lastmod: TODAY, legacy: "/blog-field-service-software-vs-off-the-shelf.html" },
  { path: "/blog-why-service-business-websites-dont-convert", priority: 0.7, changefreq: "monthly", lastmod: TODAY, legacy: "/blog-why-service-business-websites-dont-convert.html" },
  { path: "/blog-how-to-know-youve-outgrown-spreadsheets", priority: 0.7, changefreq: "monthly", lastmod: TODAY, legacy: "/blog-how-to-know-youve-outgrown-spreadsheets.html" },
  { path: "/blog-bookkeeping-firm-hidden-costs", priority: 0.7, changefreq: "monthly", lastmod: TODAY, legacy: "/blog-bookkeeping-firm-hidden-costs.html" },
  { path: "/blog-website-cost-utah", priority: 0.7, changefreq: "monthly", lastmod: TODAY, legacy: "/blog-website-cost-utah.html" },
  { path: "/blog-wordpress-vs-custom-code", priority: 0.7, changefreq: "monthly", lastmod: TODAY, legacy: "/blog-wordpress-vs-custom-code.html" },
  { path: "/blog-hvac-website-design-utah", priority: 0.7, changefreq: "monthly", lastmod: TODAY, legacy: "/blog-hvac-website-design-utah.html" },
  { path: "/blog-get-more-leads-utah-website", priority: 0.7, changefreq: "monthly", lastmod: TODAY, legacy: "/blog-get-more-leads-utah-website.html" },
  { path: "/blog-utah-website-checklist", priority: 0.7, changefreq: "monthly", lastmod: TODAY, legacy: "/blog-utah-website-checklist.html" },

  // Legal
  { path: "/privacy", priority: 0.3, changefreq: "yearly", lastmod: TODAY },
  { path: "/terms", priority: 0.3, changefreq: "yearly", lastmod: TODAY, legacy: "/terms.html" },
  { path: "/privacy-primis", priority: 0.3, changefreq: "yearly", lastmod: TODAY, legacy: "/privacy-primis.html" },
  { path: "/privacy-bookkeeping-os", priority: 0.3, changefreq: "yearly", lastmod: TODAY, legacy: "/privacy-bookkeeping-os.html" },
];
