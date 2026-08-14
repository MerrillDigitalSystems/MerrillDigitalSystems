import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * The AI / answer-engine crawlers are allow-listed deliberately: being
 * quotable in AI answers is a real acquisition channel for this business.
 * Do not narrow this list.
 */
const AGENTS = [
  "*",
  "GPTBot",
  "ChatGPT-User",
  "Google-Extended",
  "PerplexityBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "CCBot",
];

// Required under `output: export` — the file is written once at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: AGENTS.map((userAgent) => ({
      userAgent,
      // /llms.txt has to be allowed explicitly: the .txt rule below would
      // otherwise cover it. Google resolves allow/disallow conflicts by the
      // longer, more specific pattern, so this wins.
      allow: ["/", "/llms.txt"],
      // The build emits an RSC payload alongside every route
      // (out/web-design-utah.txt and 46 others), and nginx's `try_files $uri`
      // serves them with a 200. They are the full text of each page at a
      // second URL, which is a duplicate-content surface nobody links to.
      disallow: ["/admin/", "/dev/", "/*.txt$"],
    })),
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
