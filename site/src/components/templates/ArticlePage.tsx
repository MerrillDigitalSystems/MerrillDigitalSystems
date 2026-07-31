import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { blogPostingSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { PageContact } from "@/components/page/PageContact";
import { Prose } from "@/components/page/Prose";
import { Faq } from "@/components/ui/Faq";
import { Section, SectionLabel } from "@/components/ui/Section";
import { Btn } from "@/components/ui/Btn";
import type { FaqItem } from "@/content/faq";
import type { ReactNode } from "react";

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  lede: string;
  datePublished: string;
  dateModified?: string;
  readingTime: string;
  category: string;
  /** Rendered as an FAQPage block — the part answer engines actually quote. */
  faq?: FaqItem[];
  relatedLinks: { href: string; label: string }[];
  /** The one page this post is meant to feed. */
  moneyPage: { href: string; label: string };
};

const humanDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export function ArticlePage({
  meta,
  children,
}: {
  meta: ArticleMeta;
  children: ReactNode;
}) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: meta.h1, path: meta.slug },
  ];

  return (
    <>
      <JsonLd
        data={[
          blogPostingSchema({
            headline: meta.h1,
            description: meta.description,
            path: meta.slug,
            datePublished: meta.datePublished,
            dateModified: meta.dateModified,
          }),
          breadcrumbSchema(crumbs),
          ...(meta.faq?.length ? [faqSchema(meta.faq)] : []),
        ]}
      />

      <article>
        <header className="border-b-2 border-b-ink">
          <div className="section-pad site-container">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-neutral-700">
                {crumbs.slice(0, 2).map((crumb, i) => (
                  <li key={crumb.path} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden="true">/</span>}
                    <Link href={crumb.path} className="text-neutral-700 no-underline hover:text-accent-700">
                      {crumb.name}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>

            <p className="eyebrow mt-8 flex flex-wrap items-center gap-3 text-neutral-700">
              <span className="text-accent-700">{meta.category}</span>
              <span aria-hidden="true" className="h-[2px] w-[34px] bg-neutral-400" />
              <time dateTime={meta.datePublished}>{humanDate(meta.datePublished)}</time>
              <span aria-hidden="true" className="h-[2px] w-[34px] bg-neutral-400" />
              <span>{meta.readingTime}</span>
            </p>

            <h1
              className="mt-5 max-w-[20ch] font-extrabold"
              style={{
                fontSize: "clamp(32px, 5vw, 72px)",
                letterSpacing: "-.04em",
                lineHeight: 1,
              }}
            >
              {meta.h1}
            </h1>
            <p className="mt-8 max-w-[62ch] text-[16px] leading-[1.62] text-neutral-800">
              {meta.lede}
            </p>
          </div>
        </header>

        <Section>
          <div className="grid gap-[clamp(28px,5vw,72px)] min-[1041px]:grid-cols-[1fr_300px]">
            <Prose>{children}</Prose>

            <aside className="h-fit min-[1041px]:sticky min-[1041px]:top-[96px]">
              <div className="border-2 border-ink bg-surface p-[clamp(18px,2.4vw,26px)]">
                <p className="eyebrow text-accent-700">NEXT STEP</p>
                <p className="mt-4 text-[14px] leading-[1.55] text-neutral-800">
                  Scope, timeline and price agreed in writing before any code
                  exists. That includes what is deliberately not in V1.
                </p>
                <Btn href={meta.moneyPage.href} block className="mt-6">
                  {meta.moneyPage.label} →
                </Btn>
                <Btn href="#contact" variant="secondary" block className="mt-3">
                  BOOK A FREE CALL
                </Btn>
              </div>

              {meta.relatedLinks.length > 0 && (
                <nav className="mt-6 border-t-2 border-t-ink pt-5">
                  <p className="eyebrow text-neutral-700">KEEP READING</p>
                  <ul className="mt-4 flex flex-col gap-[10px]">
                    {meta.relatedLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-[13.5px] font-bold text-accent-700 underline underline-offset-4"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </aside>
          </div>
        </Section>

        {meta.faq?.length ? (
          <Section ground="surface" borderTop>
            <div className="grid gap-[clamp(24px,4vw,56px)] min-[900px]:grid-cols-[.7fr_1.3fr]">
              <div>
                <SectionLabel number="FAQ">STRAIGHT ANSWERS</SectionLabel>
                <h2
                  className="mt-5 font-extrabold"
                  style={{
                    fontSize: "clamp(28px, 3.6vw, 50px)",
                    letterSpacing: "-.035em",
                    lineHeight: 1,
                  }}
                >
                  Related questions.
                </h2>
              </div>
              <Faq items={meta.faq} />
            </div>
          </Section>
        ) : null}
      </article>

      <PageContact formName={meta.slug.replace(/^\//, "")} />
    </>
  );
}
