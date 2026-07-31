import type { Metadata } from "next";
import Link from "next/link";
import { buildMeta } from "@/lib/meta";
import { JsonLd } from "@/components/JsonLd";
import { blogSchema, breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/page/PageHero";
import { PageContact } from "@/components/page/PageContact";
import { Section, SectionLabel } from "@/components/ui/Section";
import { GridCells, Cell } from "@/components/ui/GridCells";
import { POSTS, OPS_POSTS, WEB_POSTS, type Post } from "@/content/blog";

const TITLE = "MDS Blog | Custom Software, Web Design, Field Ops";
const DESCRIPTION =
  "Practical articles from Merrill Digital Systems on custom software, field operations platforms, and service business websites.";

export const metadata: Metadata = buildMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: "/blog",
});

const shortDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

function PostCard({ post, ground }: { post: Post; ground?: "bg" | "surface" }) {
  return (
    <Cell ground={ground}>
      <Link href={post.slug} className="flex h-full flex-col text-ink no-underline">
        <p className="eyebrow flex flex-wrap items-center gap-3 text-neutral-700">
          <span className="text-accent-700">{post.category}</span>
          <span aria-hidden="true" className="h-[2px] w-[22px] bg-neutral-400" />
          <span>{post.readingTime}</span>
        </p>

        <h3 className="mt-4 text-[clamp(19px,2vw,23px)] font-extrabold leading-[1.12] tracking-[-.025em]">
          {post.title}
        </h3>

        <p className="mt-4 text-[13.5px] leading-[1.55] text-neutral-800">
          {post.excerpt}
        </p>

        <p className="mt-auto flex items-baseline justify-between gap-4 border-t-2 border-t-ink pt-4 text-[13px] font-bold text-accent-700">
          <span>READ ARTICLE →</span>
          <time
            dateTime={post.datePublished}
            className="text-[10px] font-bold uppercase tracking-[.15em] text-neutral-700"
          >
            {shortDate(post.datePublished)}
          </time>
        </p>
      </Link>
    </Cell>
  );
}

const GRID_COLS =
  "mt-[clamp(28px,4vw,56px)] grid-cols-1 min-[700px]:grid-cols-2 min-[1041px]:grid-cols-3";

export default function BlogIndexPage() {
  return (
    <>
      <JsonLd
        data={[
          blogSchema({
            name: "Merrill Digital Systems Blog",
            description: DESCRIPTION,
            path: "/blog",
            posts: POSTS,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="ARTICLES · COMPARISONS · FIELD NOTES"
        title="Practical writing on software, operations and growth."
        lede="Short, useful pieces for service businesses that have outgrown generic tools, generic websites and generic advice. Every post names the case where the cheaper option is the right one — including the ones where I'd tell you not to hire me."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
        secondaryCta="SEE PUBLISHED PRICING"
        secondaryHref="/pricing"
      />

      <Section borderTop>
        <SectionLabel number="01">OPERATIONS &amp; FIELD SOFTWARE</SectionLabel>
        <h2
          className="mt-5 font-extrabold"
          style={{
            fontSize: "clamp(30px, 4.2vw, 64px)",
            letterSpacing: "-.035em",
            lineHeight: 1,
          }}
        >
          Start with the bottleneck.
        </h2>
        <p className="mt-6 max-w-[64ch] text-[15px] leading-[1.62] text-neutral-800">
          These are the conversations owners usually want to have before they
          book a call: what the tools really cost, when a subscription stops
          fitting, and how to tell the difference between a training problem and
          a software problem.
        </p>

        <GridCells cols={GRID_COLS}>
          {OPS_POSTS.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </GridCells>
      </Section>

      <Section ground="surface" borderTop>
        <SectionLabel number="02">WEBSITES, SEO &amp; LEADS</SectionLabel>
        <h2
          className="mt-5 font-extrabold"
          style={{
            fontSize: "clamp(30px, 4.2vw, 64px)",
            letterSpacing: "-.035em",
            lineHeight: 1,
          }}
        >
          Website strategy for Utah businesses.
        </h2>
        <p className="mt-6 max-w-[64ch] text-[15px] leading-[1.62] text-neutral-800">
          What a site costs, what it should be built on, and why a good-looking
          page can still go a month without producing a single phone call.
        </p>

        <GridCells cols={GRID_COLS} ground="surface">
          {WEB_POSTS.map((post) => (
            <PostCard key={post.slug} post={post} ground="surface" />
          ))}
        </GridCells>
      </Section>

      <PageContact
        heading="Recognize your business in one of these?"
        lede="Tell me where the manual work is, or what your site isn't doing. You get a straight answer within 24 hours — from me, not a sales rep — including 'you don't need this' when that's the truth."
        formName="blog"
      />
    </>
  );
}
