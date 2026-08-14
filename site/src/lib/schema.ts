import { SITE, PRICING } from "./site";
import { stripLinks } from "./prose";
import type { FaqItem } from "@/content/faq";

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;
const FOUNDER_ID = `${SITE.url}/#kruz-merrill`;
const LOGO_ID = `${SITE.url}/#logo`;

export const abs = (path: string) =>
  path.startsWith("http") ? path : `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * The organization graph. The @id anchors are load-bearing: every inner page's
 * Service schema references #organization by id rather than restating the
 * business, which is what ties the entity graph together for Google. Keep the
 * ids byte-identical to the ones the pre-2026 site published.
 */
export function orgGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": ORG_ID,
        name: SITE.name,
        legalName: SITE.legalName,
        alternateName: SITE.shortName,
        description:
          "Founder-led software studio building custom software and websites for service businesses — operations hubs, field service platforms, mobile apps, and more. Based in Utah, serving clients nationwide.",
        slogan: SITE.tagline,
        url: `${SITE.url}/`,
        logo: {
          "@type": "ImageObject",
          "@id": LOGO_ID,
          url: abs("/icon"),
          caption: SITE.name,
        },
        image: abs("/opengraph-image"),
        priceRange: `$${PRICING.webLow.toLocaleString("en-US")} - $${PRICING.softwareTypicalHigh.toLocaleString("en-US")}`,
        telephone: SITE.phoneSchema,
        email: SITE.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: SITE.address.locality,
          addressRegion: SITE.address.region,
          postalCode: SITE.address.postalCode,
          addressCountry: SITE.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: SITE.geo.latitude,
          longitude: SITE.geo.longitude,
        },
        founder: {
          "@type": "Person",
          "@id": FOUNDER_ID,
          name: SITE.founder,
          jobTitle: SITE.founderRole,
          image: abs("/img/kruz-merrill-372.webp"),
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        // The counties are the areas the city pages actually target — Ogden is
        // Weber, Provo is Utah County — so the entity claims the same ground
        // the content does.
        areaServed: [
          { "@type": "State", name: "Utah" },
          { "@type": "City", name: "West Jordan" },
          { "@type": "City", name: "Salt Lake City" },
          { "@type": "City", name: "Provo" },
          { "@type": "City", name: "Ogden" },
          { "@type": "AdministrativeArea", name: "Salt Lake County" },
          { "@type": "AdministrativeArea", name: "Utah County" },
          { "@type": "AdministrativeArea", name: "Davis County" },
          { "@type": "AdministrativeArea", name: "Weber County" },
        ],
        sameAs: [...SITE.sameAs],
      },
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        name: SITE.name,
        url: `${SITE.url}/`,
        inLanguage: "en-US",
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

/** The compact reference inner pages embed instead of restating the business. */
export const providerRef = () => ({ "@id": ORG_ID });

/**
 * Pulls the two numbers out of a machine range like "$3000-$9000".
 * Returns null for anything that isn't a clean low/high pair, so an unusual
 * price string degrades to no offer rather than to a wrong one.
 */
function parsePriceRange(range: string): { min: number; max: number } | null {
  const nums = range.match(/\d[\d,]*/g)?.map((n) => Number(n.replace(/,/g, "")));
  if (!nums || nums.length < 2) return null;
  const [min, max] = [nums[0], nums[1]];
  if (!Number.isFinite(min) || !Number.isFinite(max) || max < min) return null;
  return { min, max };
}

export function serviceSchema({
  name,
  serviceType,
  description,
  priceRange,
  path,
  slogan,
}: {
  name: string;
  serviceType: string;
  description: string;
  priceRange: string;
  path: string;
  /** The marketing H1, kept as a slogan so the entity name stays a service. */
  slogan?: string;
}) {
  const parsed = parsePriceRange(priceRange);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    // Anchored and tied back to the site so the service is part of the entity
    // graph rather than a floating island.
    "@id": `${abs(path)}#service`,
    name,
    ...(slogan ? { slogan } : {}),
    serviceType,
    description,
    provider: providerRef(),
    isPartOf: { "@id": SITE_ID },
    areaServed: { "@type": "State", name: "Utah" },
    url: abs(path),
    // `priceRange` is a LocalBusiness property, not an Offer one — Google drops
    // the offer silently when it appears here, which is what the old markup
    // did on every service page. priceSpecification is the valid form.
    ...(parsed
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
              minPrice: parsed.min,
              maxPrice: parsed.max,
            },
          },
        }
      : {}),
  };
}

/**
 * Punchless is the only product the studio sells rather than delivers, so this
 * is the one page that gets a SoftwareApplication. `url` points at the product
 * domain, not at this site — that is what Google needs to tie the two together.
 */
export function softwareAppSchema({
  name,
  description,
  url,
  applicationCategory = "BusinessApplication",
  operatingSystem,
  offers = [],
}: {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: { name: string; price: string; description?: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    applicationCategory,
    ...(operatingSystem ? { operatingSystem } : {}),
    publisher: providerRef(),
    ...(offers.length
      ? {
          offers: offers.map((offer) => ({
            "@type": "Offer",
            name: offer.name,
            price: offer.price,
            priceCurrency: "USD",
            ...(offer.description ? { description: offer.description } : {}),
          })),
        }
      : {}),
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      // stripLinks, not the raw string: answers may carry `[text](/path)` for
      // the rendered page, and this is the text answer engines quote.
      acceptedAnswer: { "@type": "Answer", text: stripLinks(item.a) },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  };
}

export function blogPostingSchema({
  headline,
  description,
  path,
  datePublished,
  dateModified,
  image,
}: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    datePublished,
    dateModified: dateModified ?? datePublished,
    image: abs(image ?? "/opengraph-image"),
    mainEntityOfPage: { "@type": "WebPage", "@id": abs(path) },
    author: { "@id": FOUNDER_ID },
    publisher: { "@id": ORG_ID },
  };
}

/**
 * The blog index. Each entry is a compact BlogPosting pointing at its own URL —
 * the full BlogPosting lives on the post itself, so this is a listing, not a
 * duplicate of the article graph.
 */
export function blogSchema({
  name,
  description,
  path,
  posts,
}: {
  name: string;
  description: string;
  path: string;
  posts: {
    slug: string;
    title: string;
    excerpt: string;
    datePublished: string;
  }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name,
    description,
    url: abs(path),
    isPartOf: { "@id": SITE_ID },
    publisher: providerRef(),
    author: { "@id": FOUNDER_ID },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.datePublished,
      url: abs(post.slug),
      mainEntityOfPage: { "@type": "WebPage", "@id": abs(post.slug) },
      author: { "@id": FOUNDER_ID },
      publisher: { "@id": ORG_ID },
    })),
  };
}

/**
 * Case studies are editorial writing about a project, so they carry Article
 * alongside WebPage — the pre-2026 case study pages did too, and dropping it
 * would lose the rich-result eligibility that came with it.
 */
export function articleSchema({
  headline,
  description,
  path,
  image,
  datePublished,
  dateModified,
}: {
  headline: string;
  description: string;
  path: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished,
    dateModified: dateModified ?? datePublished,
    image: abs(image ?? "/opengraph-image"),
    mainEntityOfPage: { "@type": "WebPage", "@id": abs(path) },
    author: { "@id": FOUNDER_ID },
    publisher: { "@id": ORG_ID },
  };
}

export function webPageSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: abs(path),
    isPartOf: { "@id": SITE_ID },
    about: providerRef(),
  };
}
