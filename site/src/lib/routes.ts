/**
 * Every indexable route on the new site. Drives app/sitemap.ts, app/llms.txt
 * and the pre-cutover parity audit. Slugs are carried over verbatim from the
 * pre-2026 site — only the .html extension is dropped — so the 301 map stays
 * 1:1.
 *
 * `lastmod` is per-route and real. It used to be one frozen constant applied
 * to all 44 URLs, which is a signal Google learns to ignore outright: a
 * sitemap where every page claims the same never-moving date carries no
 * information. Blog lastmods are derived from the posts themselves so the two
 * can never drift; everything else states the date its content actually last
 * changed. Move a date only when the page's content moves.
 */

import { POSTS } from "@/content/blog";

export type Route = {
  path: string;
  priority: number;
  changefreq: "weekly" | "monthly" | "yearly";
  lastmod: string;
  /** Absent on routes that are new in this rebuild. */
  legacy?: string;
  /** Section used to group the route in llms.txt. */
  group: "core" | "services" | "areas" | "work" | "writing" | "legal";
};

/** The Next rebuild cutover — content that hasn't changed since. */
const REBUILD = "2026-07-31";
/** The 2026-08 SEO pass: keyword headings, cluster links, schema fixes. */
const SEO_PASS = "2026-08-14";

/** Blog lastmod, from the post's own record. Throws rather than guessing. */
function postLastmod(slug: string): string {
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) throw new Error(`routes.ts: no blog post found for ${slug}`);
  return post.dateModified ?? post.datePublished;
}

const blogRoute = (slug: string, priority: number): Route => ({
  path: slug,
  priority,
  changefreq: "monthly",
  lastmod: postLastmod(slug),
  legacy: `${slug}.html`,
  group: "writing",
});

export const ROUTES: Route[] = [
  { path: "/", priority: 1.0, changefreq: "monthly", lastmod: REBUILD, legacy: "/index.html", group: "core" },

  // Money pages
  { path: "/pricing", priority: 0.95, changefreq: "monthly", lastmod: REBUILD, group: "core" },
  { path: "/operations-software", priority: 0.95, changefreq: "monthly", lastmod: SEO_PASS, legacy: "/operations-software.html", group: "services" },
  { path: "/bookkeeping-software", priority: 0.95, changefreq: "monthly", lastmod: SEO_PASS, legacy: "/bookkeeping-software.html", group: "services" },
  { path: "/web-design-utah", priority: 0.95, changefreq: "monthly", lastmod: SEO_PASS, legacy: "/web-design-utah.html", group: "services" },
  { path: "/field-service-software", priority: 0.8, changefreq: "monthly", lastmod: SEO_PASS, legacy: "/field-service-software.html", group: "services" },
  { path: "/managed-services", priority: 0.9, changefreq: "monthly", lastmod: SEO_PASS, legacy: "/managed-services.html", group: "services" },
  { path: "/job-management-software-utah", priority: 0.9, changefreq: "monthly", lastmod: SEO_PASS, legacy: "/job-management-software-utah.html", group: "services" },
  { path: "/punchless", priority: 0.9, changefreq: "monthly", lastmod: REBUILD, legacy: "/punchless.html", group: "services" },

  // Verticals
  { path: "/hvac-website-design-utah", priority: 0.9, changefreq: "monthly", lastmod: SEO_PASS, legacy: "/hvac-website-design-utah.html", group: "services" },
  { path: "/plumber-website-design-utah", priority: 0.9, changefreq: "monthly", lastmod: SEO_PASS, legacy: "/plumber-website-design-utah.html", group: "services" },
  { path: "/electrician-website-design-utah", priority: 0.9, changefreq: "monthly", lastmod: SEO_PASS, legacy: "/electrician-website-design-utah.html", group: "services" },
  { path: "/landscaping-website-design-utah", priority: 0.9, changefreq: "monthly", lastmod: SEO_PASS, legacy: "/landscaping-website-design-utah.html", group: "services" },
  { path: "/roofing-website-design-utah", priority: 0.9, changefreq: "monthly", lastmod: SEO_PASS, legacy: "/roofing-website-design-utah.html", group: "services" },
  { path: "/contractor-website-design-utah", priority: 0.9, changefreq: "monthly", lastmod: SEO_PASS, legacy: "/contractor-website-design-utah.html", group: "services" },

  // Cities — West Jordan is the HQ and was missing entirely
  { path: "/web-design-west-jordan", priority: 0.85, changefreq: "monthly", lastmod: SEO_PASS, group: "areas" },
  { path: "/web-design-salt-lake-city", priority: 0.8, changefreq: "monthly", lastmod: SEO_PASS, legacy: "/web-design-salt-lake-city.html", group: "areas" },
  { path: "/web-design-provo", priority: 0.8, changefreq: "monthly", lastmod: SEO_PASS, legacy: "/web-design-provo.html", group: "areas" },
  { path: "/web-design-ogden", priority: 0.8, changefreq: "monthly", lastmod: SEO_PASS, legacy: "/web-design-ogden.html", group: "areas" },

  // Comparison + tools
  { path: "/custom-software-vs-servicetitan-utah", priority: 0.85, changefreq: "monthly", lastmod: SEO_PASS, legacy: "/custom-software-vs-servicetitan-utah.html", group: "services" },
  { path: "/free-audit", priority: 0.85, changefreq: "monthly", lastmod: REBUILD, legacy: "/free-audit.html", group: "core" },
  { path: "/free-checklist", priority: 0.8, changefreq: "monthly", lastmod: REBUILD, legacy: "/free-checklist.html", group: "core" },
  { path: "/roi-calculator", priority: 0.9, changefreq: "monthly", lastmod: REBUILD, legacy: "/roi-calculator.html", group: "core" },

  // Work
  { path: "/work/bktoolbox", priority: 0.85, changefreq: "monthly", lastmod: REBUILD, legacy: "/work/bktoolbox.html", group: "work" },
  { path: "/work/brightpath-dental", priority: 0.85, changefreq: "monthly", lastmod: REBUILD, legacy: "/work/brightpath-dental.html", group: "work" },
  { path: "/work/ccl-pro", priority: 0.85, changefreq: "monthly", lastmod: REBUILD, group: "work" },
  { path: "/work/bays-baked-goods", priority: 0.85, changefreq: "monthly", lastmod: REBUILD, group: "work" },

  // Blog — slugs preserved exactly, including the flat blog- prefix
  { path: "/blog", priority: 0.7, changefreq: "weekly", lastmod: REBUILD, legacy: "/blog.html", group: "writing" },
  blogRoute("/blog-field-service-software-cost", 0.75),
  blogRoute("/blog-jobber-vs-custom-software", 0.75),
  blogRoute("/blog-servicetitan-vs-custom-software", 0.7),
  blogRoute("/blog-field-service-software-vs-off-the-shelf", 0.7),
  blogRoute("/blog-why-service-business-websites-dont-convert", 0.7),
  blogRoute("/blog-how-to-know-youve-outgrown-spreadsheets", 0.7),
  blogRoute("/blog-bookkeeping-firm-hidden-costs", 0.7),
  blogRoute("/blog-website-cost-utah", 0.7),
  blogRoute("/blog-wordpress-vs-custom-code", 0.7),
  blogRoute("/blog-hvac-website-design-utah", 0.7),
  blogRoute("/blog-get-more-leads-utah-website", 0.7),
  blogRoute("/blog-utah-website-checklist", 0.7),

  // Legal
  { path: "/privacy", priority: 0.3, changefreq: "yearly", lastmod: REBUILD, group: "legal" },
  { path: "/terms", priority: 0.3, changefreq: "yearly", lastmod: REBUILD, legacy: "/terms.html", group: "legal" },
  { path: "/privacy-primis", priority: 0.3, changefreq: "yearly", lastmod: REBUILD, legacy: "/privacy-primis.html", group: "legal" },
  { path: "/privacy-bookkeeping-os", priority: 0.3, changefreq: "yearly", lastmod: REBUILD, legacy: "/privacy-bookkeeping-os.html", group: "legal" },
];
