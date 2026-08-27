import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { PageContact } from "@/components/page/PageContact";
import { Section, SectionLabel } from "@/components/ui/Section";
import { GridCells, Cell } from "@/components/ui/GridCells";
import { GrayImage } from "@/components/ui/GrayImage";
import { Tag } from "@/components/ui/Tag";
import { Btn } from "@/components/ui/Btn";
import type { CaseStudyData } from "@/content/types";

/**
 * Problem → what got built → result. Every number on these pages is one the
 * client would recognise; there is no "illustrative" arithmetic anywhere.
 */
export function CaseStudyPage({ data }: { data: CaseStudyData }) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/#work" },
    { name: data.client, path: data.slug },
  ];
  const headline = data.results[0];

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: data.h1, description: data.description, path: data.slug }),
          articleSchema({
            headline: data.h1,
            description: data.description,
            path: data.slug,
            image: data.image,
            datePublished: data.datePublished ?? "2026-07-31",
          }),
          breadcrumbSchema(crumbs),
        ]}
      />

      <section className="border-b-2 border-b-ink">
        <div className="section-pad site-container">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-neutral-700">
              {crumbs.map((crumb, i) => (
                <li key={crumb.path} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-ink">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link href={crumb.path} className="text-neutral-700 no-underline hover:text-accent-700">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <p className="eyebrow mt-8 text-accent-700">{data.eyebrow}</p>
          <h1
            className="mt-5 max-w-[18ch] font-extrabold"
            style={{
              fontSize: "clamp(34px, 5.6vw, 82px)",
              letterSpacing: "-.042em",
              lineHeight: 0.98,
            }}
          >
            {data.h1}
          </h1>
          <p className="mt-8 max-w-[62ch] text-[15.5px] leading-[1.62] text-neutral-800">
            {data.lede}
          </p>

          {data.image ? (
            <GrayImage
              src={data.image}
              alt={data.imageAlt ?? `${data.client} — built by Merrill Digital Systems`}
              width={1360}
              height={850}
              priority
              sizes="100vw"
              className="mt-10 border-2 border-ink"
              imgClassName="aspect-[16/10] w-full object-cover"
            />
          ) : (
            // Internal builds have nothing public to screenshot. Rather than
            // ship a broken <img>, the client name and headline result carry
            // the panel.
            <div className="mt-10 flex flex-col justify-between gap-10 border-2 border-ink bg-ink p-[clamp(24px,4vw,64px)] text-bg min-[700px]:min-h-[340px]">
              <p className="eyebrow text-neutral-500">{data.eyebrow}</p>
              <div>
                <p
                  className="font-extrabold leading-[0.98] tracking-[-.04em]"
                  style={{ fontSize: "clamp(30px, 5vw, 64px)" }}
                >
                  {data.client}
                </p>
                {headline && (
                  <p className="mt-6 flex flex-wrap items-baseline gap-3">
                    <span
                      className="font-extrabold leading-none tracking-[-.035em] text-accent-400"
                      style={{ fontSize: "clamp(26px, 3.4vw, 46px)" }}
                    >
                      {headline.value}
                    </span>
                    <span className="eyebrow text-neutral-500">{headline.label}</span>
                  </p>
                )}
              </div>
            </div>
          )}

          <dl className="mt-[2px] grid gap-[2px] bg-ink min-[700px]:grid-cols-4">
            {data.facts.map((fact) => (
              <div key={fact.label} className="bg-bg p-[clamp(14px,2vw,22px)]">
                <dt className="eyebrow text-neutral-700">{fact.label}</dt>
                <dd className="mt-2 text-[15px] font-extrabold tracking-[-.02em]">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section>
        <SectionLabel number="01">THE PROBLEM</SectionLabel>
        <div className="mt-6 max-w-[68ch]">
          {data.problem.map((para) => (
            <p key={para} className="mt-4 text-[15.5px] leading-[1.65] text-neutral-800 first:mt-0">
              {para}
            </p>
          ))}
        </div>
      </Section>

      <Section ground="surface">
        <SectionLabel number="02">WHAT GOT BUILT</SectionLabel>
        <GridCells cols="mt-[clamp(28px,4vw,56px)] grid-cols-1 min-[600px]:grid-cols-2 min-[1041px]:grid-cols-3" ground="surface">
          {data.built.map((item) => (
            <Cell key={item.title} ground="surface">
              <h2 className="text-[17px] font-extrabold leading-[1.12] tracking-[-.02em]">
                {item.title}
              </h2>
              <p className="mt-3 text-[13.5px] leading-[1.55] text-neutral-800">
                {item.body}
              </p>
            </Cell>
          ))}
        </GridCells>

        {data.stack.length > 0 && (
          <div className="mt-[clamp(14px,2vw,26px)] flex flex-wrap items-center gap-3 border-2 border-ink bg-bg p-[clamp(18px,2.4vw,28px)]">
            <span className="eyebrow text-neutral-700">BUILT WITH</span>
            {data.stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        )}
      </Section>

      <section className="section-pad border-t-2 border-t-ink bg-ink text-bg">
        <div className="site-container">
          <SectionLabel number="03" onDark>
            THE RESULT
          </SectionLabel>
          <div className="mt-[clamp(28px,4vw,56px)] grid gap-[2px] bg-neutral-800 min-[700px]:grid-cols-3">
            {data.results.map((result) => (
              <div key={result.label} className="bg-ink py-6 min-[700px]:px-6 min-[700px]:first:pl-0">
                <p
                  className="font-extrabold leading-none tracking-[-.035em] text-accent-400"
                  style={{ fontSize: "clamp(30px, 4vw, 56px)" }}
                >
                  {result.value}
                </p>
                <p className="eyebrow mt-3 text-neutral-500">{result.label}</p>
                <p className="mt-3 text-[13.5px] leading-[1.55] text-neutral-400">
                  {result.body}
                </p>
              </div>
            ))}
          </div>

          {data.quote && (
            <blockquote className="mt-[clamp(28px,4vw,56px)] border-t-2 border-t-neutral-800 pt-8">
              <p
                className="max-w-[52ch] font-bold"
                style={{ fontSize: "clamp(19px, 2.4vw, 32px)", lineHeight: 1.2 }}
              >
                &ldquo;{data.quote.text}&rdquo;
              </p>
              <footer className="eyebrow mt-6 text-accent-400">
                {data.quote.attribution}
              </footer>
            </blockquote>
          )}

          {data.relatedLinks.length > 0 && (
            <nav className="mt-[clamp(28px,4vw,56px)] flex flex-wrap gap-4 border-t-2 border-t-neutral-800 pt-8">
              {data.relatedLinks.map((link) => (
                <Btn key={link.href} href={link.href} inverted>
                  {link.label} →
                </Btn>
              ))}
            </nav>
          )}
        </div>
      </section>

      <PageContact
        heading="Want the same thing for your business?"
        lede="Tell me what's broken. You'll get a straight answer on whether custom is the right call, and a number in writing if it is."
        formName={data.slug.replace(/^\//, "").replace(/\//g, "-")}
      />
    </>
  );
}
