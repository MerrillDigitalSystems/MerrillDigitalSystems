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
      allow: "/",
      disallow: ["/admin/", "/dev/"],
    })),
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
