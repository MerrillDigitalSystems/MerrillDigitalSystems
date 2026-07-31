import type { Metadata } from "next";
import { SITE } from "./site";

/**
 * Every route builds its metadata through this so canonicals, OG and Twitter
 * cards can never drift apart. Paths are extensionless — the .html canonicals
 * the pre-2026 site published are 301'd to these.
 *
 * The share image is deliberately not set here: app/opengraph-image.tsx is
 * inherited by every route, and naming an image in metadata would override it.
 * Pass `ogImage` only when a route genuinely needs its own card.
 */
export function buildMeta({
  title,
  description,
  path,
  ogImage,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}): Metadata {
  const images = ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined;
  // Next resolves "/" against metadataBase without a trailing slash, which
  // would disagree with the sitemap. Pin the homepage to the absolute form.
  const canonical = path === "/" ? `${SITE.url}/` : path;

  return {
    // `absolute` opts out of the root layout's "%s | Merrill Digital Systems"
    // template. Callers pass a complete, SERP-length-checked title; without
    // this the brand appears twice and titles run past 80 characters.
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}
