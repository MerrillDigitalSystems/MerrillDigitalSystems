import { ROUTES, type Route } from "@/lib/routes";
import { SITE, PRICING } from "@/lib/site";
import { SERVICE_PAGES } from "@/content/pages";
import { POSTS } from "@/content/blog";
import { BKTOOLBOX } from "@/content/work/bktoolbox";
import { BRIGHTPATH_DENTAL } from "@/content/work/brightpath-dental";
import { CCL_PRO } from "@/content/work/ccl-pro";
import { BAYS_BAKED_GOODS } from "@/content/work/bays-baked-goods";

/**
 * /llms.txt — a curated map of the site for agents that read one.
 *
 * Worth being honest about what this is and isn't. It has no effect on Search
 * rankings or AI Overviews (Google's own docs say so outright), and no major
 * answer engine has committed to reading it in production. What changed is
 * that Chrome's Lighthouse promoted an Agentic Browsing category into its
 * default report, and it checks for a spec-shaped file here. A studio whose
 * pitch invites people to run Lighthouse on its own site should pass that
 * audit, so this exists for the checkbox and costs nothing to keep correct.
 *
 * It is generated from ROUTES rather than hand-written precisely so it can't
 * drift the way a static copy would: add a page, it appears here.
 *
 * Route Handlers render statically under `output: export` (GET only), so this
 * is written once at build time into out/llms.txt.
 */
export const dynamic = "force-static";

const abs = (path: string) => `${SITE.url}${path}`;

/**
 * Flatten a description onto one line — llms.txt entries are single-line.
 * Whitespace only: the copy already spaces its em-dashes, and touching dashes
 * here turned every en-dashed range into "$3,000 — $9,000".
 */
const oneLine = (text: string) => text.replace(/\s+/g, " ").trim();

/** Human label + blurb per route, sourced from the page's own content. */
function describe(route: Route): { label: string; note: string } | null {
  const service = SERVICE_PAGES.find((p) => p.slug === route.path);
  if (service) return { label: service.schemaName, note: oneLine(service.description) };

  const post = POSTS.find((p) => p.slug === route.path);
  if (post) return { label: post.title, note: oneLine(post.excerpt) };

  const work = [BKTOOLBOX, BRIGHTPATH_DENTAL, CCL_PRO, BAYS_BAKED_GOODS].find(
    (w) => w.slug === route.path
  );
  if (work) return { label: `${work.client} — case study`, note: oneLine(work.description) };

  return MANUAL[route.path] ?? null;
}

/** The routes that aren't driven by a content object. */
const MANUAL: Record<string, { label: string; note: string }> = {
  "/": {
    label: "Merrill Digital Systems",
    note: `Founder-led Utah studio building custom software and websites you own outright. ${SITE.tagline}`,
  },
  "/pricing": {
    label: "Pricing",
    note: `Published prices, not "contact us" — websites ${PRICING.webRange}, software ${PRICING.softwareRange}, managed ${PRICING.managedFrom.toLowerCase()}.`,
  },
  "/punchless": {
    label: "Punchless",
    note: "GPS-geofenced timecards for field service crews — the studio's own SaaS product.",
  },
  "/roi-calculator": {
    label: "Manual work cost calculator",
    note: "Estimate what manual admin work costs your business per month, with no form to fill in.",
  },
  "/free-audit": {
    label: "Free website audit",
    note: "A written review of what your current site is and isn't doing.",
  },
  "/free-checklist": {
    label: "Utah website checklist",
    note: "Score an existing site against the things that actually decide local ranking.",
  },
  "/blog": { label: "Writing", note: "Field notes on custom software, websites and what they cost." },
  "/privacy": { label: "Privacy policy", note: "How the site handles data." },
  "/terms": { label: "Terms", note: "Terms of service." },
  "/privacy-primis": { label: "Primis privacy policy", note: "Privacy policy for the Primis app." },
  "/privacy-bookkeeping-os": {
    label: "Bookkeeping OS privacy policy",
    note: "Privacy policy for the Bookkeeping OS app.",
  },
};

const SECTIONS: { group: Route["group"]; title: string }[] = [
  { group: "core", title: "Start here" },
  { group: "services", title: "Services" },
  { group: "areas", title: "Areas served" },
  { group: "work", title: "Case studies" },
  { group: "writing", title: "Writing" },
  { group: "legal", title: "Legal" },
];

export async function GET() {
  const lines: string[] = [
    `# ${SITE.name}`,
    "",
    `> Founder-led software studio in ${SITE.address.locality}, ${SITE.address.region}, building custom operations software, field service platforms and websites for service businesses. Every project is handed over owned outright — code, repo, domain and analytics — with no vendor lock-in and no subscription required to keep it running. Prices are published rather than quoted on request: websites ${PRICING.webRange}, software from ${PRICING.softwareFrom.replace(/^From /, "")}.`,
    "",
    `Contact: ${SITE.email} · ${SITE.phone}`,
    "",
  ];

  for (const section of SECTIONS) {
    const entries = ROUTES.filter((r) => r.group === section.group)
      .map((route) => ({ route, described: describe(route) }))
      .filter((e): e is { route: Route; described: { label: string; note: string } } =>
        Boolean(e.described)
      );
    if (!entries.length) continue;

    lines.push(`## ${section.title}`, "");
    for (const { route, described } of entries) {
      lines.push(`- [${described.label}](${abs(route.path)}): ${described.note}`);
    }
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
