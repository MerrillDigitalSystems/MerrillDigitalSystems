import type { FaqItem } from "./faq";

export type Crumb = { name: string; path: string };

/**
 * Shape every service, vertical and city page fills in. Pages are data; the
 * template owns the design, so no page can drift off the system.
 */
export type ServicePageData = {
  /** Extensionless path, e.g. "/web-design-utah". */
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  /**
   * What the page IS, for the Service and WebPage entities — "Website Design
   * in Utah", not the H1's benefit line. Google reads this as the entity name,
   * and a name like "A website that brings in work, not compliments" contains
   * no service noun at all. The H1 is carried through as `slogan`.
   */
  schemaName: string;
  lede: string;
  crumbs: Crumb[];
  intro: { label: string; heading: string; body: string };
  problems: { title: string; body: string }[];
  deliverables: { heading: string; items: { title: string; body: string }[] };
  proof: { value: string; label: string; body: string }[];
  priceLabel: string;
  priceRange: string;
  priceTimeline: string;
  /** Machine-readable form for schema, e.g. "$3000-$9000". */
  schemaPriceRange: string;
  serviceType: string;
  faq: FaqItem[];
  relatedLinks: { href: string; label: string }[];
  /**
   * The hub-and-spoke band. The sidebar `relatedLinks` list tops out at about
   * four before it reads as a dump, which left the Utah hub linking 3 of its
   * 10 spokes and none of the blog — so the cluster gets its own section with
   * room to link the whole family in both directions.
   */
  cluster?: {
    label: string;
    heading: string;
    links: { href: string; label: string; note?: string }[];
  };
  contactHeading: string;
};

export type CaseStudyData = {
  slug: string;
  title: string;
  description: string;
  client: string;
  eyebrow: string;
  h1: string;
  lede: string;
  /**
   * Hero screenshot. Omit it when no preview file exists — the template falls
   * back to an ink panel rather than pointing at an image that would 404.
   */
  image?: string;
  imageAlt?: string;
  /** ISO date for Article schema; defaults to the rebuild date if absent. */
  datePublished?: string;
  facts: { label: string; value: string }[];
  problem: string[];
  built: { title: string; body: string }[];
  results: { value: string; label: string; body: string }[];
  quote?: { text: string; attribution: string };
  stack: string[];
  relatedLinks: { href: string; label: string }[];
};
