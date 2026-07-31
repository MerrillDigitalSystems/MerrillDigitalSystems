import type { MetadataRoute } from "next";
import { ROUTES } from "@/lib/routes";
import { SITE } from "@/lib/site";

// Required under `output: export` — the file is written once at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE.url}${route.path === "/" ? "/" : route.path}`,
    lastModified: route.lastmod,
    changeFrequency: route.changefreq,
    priority: route.priority,
  }));
}
