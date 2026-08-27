import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
  webPageSchema,
} from "@/lib/schema";
import { PageHero } from "@/components/page/PageHero";
import { PageContact } from "@/components/page/PageContact";
import { Section, SectionLabel, SectionH2 } from "@/components/ui/Section";
import { GridCells, Cell } from "@/components/ui/GridCells";
import { Reveal } from "@/components/ui/Reveal";
import { Faq } from "@/components/ui/Faq";
import { Btn } from "@/components/ui/Btn";
import { GrayImage } from "@/components/ui/GrayImage";
import { withLinks } from "@/lib/prose";
import type { ServicePageData } from "@/content/types";

/**
 * Covers the service, vertical and city pages — they differ in copy, proof and
 * schema, not in structure. Everything here is the same Modernist surface as
 * the homepage: 2px rules, flush-left type, zero radius, cobalt used sparingly.
 */
export function ServicePage({ data }: { data: ServicePageData }) {
  const {
    slug,
    eyebrow,
    h1,
    schemaName,
    lede,
    crumbs,
    intro,
    problems,
    deliverables,
    proof,
    priceLabel,
    priceRange,
    priceTimeline,
    schemaPriceRange,
    serviceType,
    sections,
    showcase,
    faq,
    relatedLinks,
    cluster,
    contactHeading,
  } = data;

  // Section ordinals are computed rather than hard-coded: proof, sections and
  // the cluster are all optional, and a page that skips one used to leave a
  // gap in the 01/02/03 sequence.
  const order = [
    "intro",
    "deliverables",
    ...(sections ?? []).map((_, i) => `section-${i}`),
    ...(showcase && showcase.items.length > 0 ? ["showcase"] : []),
    ...(proof.length > 0 ? ["proof"] : []),
    "faq",
    ...(cluster && cluster.links.length > 0 ? ["cluster"] : []),
  ];
  const num = (key: string) => String(order.indexOf(key) + 1).padStart(2, "0");

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: schemaName, description: lede, path: slug }),
          breadcrumbSchema(crumbs),
          serviceSchema({
            name: schemaName,
            slogan: h1,
            serviceType,
            description: lede,
            priceRange: schemaPriceRange,
            path: slug,
          }),
          faqSchema(faq),
        ]}
      />

      <PageHero
        eyebrow={eyebrow}
        title={h1}
        lede={lede}
        crumbs={crumbs}
        secondaryCta="SEE THE PRICING"
        secondaryHref="/pricing"
      />

      {/* The problem, in the prospect's words. */}
      <Section>
        <SectionLabel number={num("intro")}>{intro.label}</SectionLabel>
        <SectionH2 className="mt-8 max-w-[20ch]">
          {intro.heading}
        </SectionH2>
        <p className="mt-6 max-w-[68ch] text-[15.5px] leading-[1.62] text-neutral-800">
          {withLinks(intro.body)}
        </p>

        <GridCells cols="mt-[clamp(28px,4vw,56px)] grid-cols-1 min-[600px]:grid-cols-2 min-[1041px]:grid-cols-4">
          {problems.map((problem, i) => (
            <Cell key={problem.title}>
              <Reveal index={i} className="flex h-full flex-col">
                {/* Decorative ordinal — see the note in Promises.tsx. */}
                <p
                  aria-hidden="true"
                  className="text-[26px] font-extrabold leading-none tracking-[-.035em] text-neutral-300"
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-[17px] font-extrabold leading-[1.12] tracking-[-.02em]">
                  {problem.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.55] text-neutral-800">
                  {withLinks(problem.body)}
                </p>
              </Reveal>
            </Cell>
          ))}
        </GridCells>
      </Section>

      {/* What you actually get, and the number. */}
      <Section ground="surface">
        <SectionLabel number={num("deliverables")}>WHAT YOU GET</SectionLabel>
        <SectionH2 className="mt-8 max-w-[20ch]">
          {deliverables.heading}
        </SectionH2>

        <div className="mt-[clamp(28px,4vw,56px)] grid gap-[clamp(14px,2vw,26px)] min-[900px]:grid-cols-[1.4fr_.6fr]">
          <ul className="border-t-2 border-t-ink">
            {deliverables.items.map((item) => (
              <li
                key={item.title}
                className="grid gap-2 border-b-2 border-b-neutral-300 py-5 min-[700px]:grid-cols-[.4fr_.6fr] min-[700px]:gap-8"
              >
                <h3 className="text-[15px] font-extrabold leading-[1.25] tracking-[-.02em]">
                  {item.title}
                </h3>
                <p className="text-[13.5px] leading-[1.55] text-neutral-800">
                  {withLinks(item.body)}
                </p>
              </li>
            ))}
          </ul>

          <aside className="h-fit border-2 border-ink bg-bg p-[clamp(18px,2.4vw,28px)]">
            <p className="eyebrow text-accent-700">{priceLabel}</p>
            <p
              className="mt-4 font-extrabold leading-none tracking-[-.035em]"
              style={{ fontSize: "clamp(26px, 3vw, 40px)" }}
            >
              {priceRange}
            </p>
            <p className="mt-3 text-[11px] font-bold uppercase tracking-[.15em] text-neutral-700">
              {priceTimeline}
            </p>
            <Btn href="/pricing" variant="secondary" block className="mt-6">
              PRICE IT YOURSELF →
            </Btn>
            <Btn href="#contact" block className="mt-3">
              BOOK A FREE CALL →
            </Btn>
          </aside>
        </div>
      </Section>

      {/* Long-form depth, for the pages that carry a whole query cluster. */}
      {(sections ?? []).map((section, i) => {
        // Alternates against the surface-ground deliverables block above.
        const ground = i % 2 === 0 ? "bg" : "surface";
        const count = section.items?.length ?? 0;
        const cols =
          count % 4 === 0
            ? "grid-cols-1 min-[600px]:grid-cols-2 min-[1041px]:grid-cols-4"
            : count % 3 === 0
              ? "grid-cols-1 min-[600px]:grid-cols-2 min-[1041px]:grid-cols-3"
              : "grid-cols-1 min-[600px]:grid-cols-2";

        return (
          <Section key={section.heading} ground={ground}>
            <SectionLabel number={num(`section-${i}`)}>{section.label}</SectionLabel>
            <SectionH2 className="mt-8 max-w-[22ch]">
              {section.heading}
            </SectionH2>

            <div className="mt-6 flex max-w-[68ch] flex-col gap-5">
              {section.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-[15.5px] leading-[1.62] text-neutral-800"
                >
                  {withLinks(paragraph)}
                </p>
              ))}
            </div>

            {section.items && section.items.length > 0 && (
              <GridCells cols={`mt-[clamp(28px,4vw,56px)] ${cols}`}>
                {section.items.map((item, j) => (
                  <Cell key={item.title} ground={ground}>
                    <Reveal index={j} className="flex h-full flex-col">
                      <h3 className="text-[16px] font-extrabold leading-[1.15] tracking-[-.02em]">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-[13.5px] leading-[1.55] text-neutral-800">
                        {withLinks(item.body)}
                      </p>
                    </Reveal>
                  </Cell>
                ))}
              </GridCells>
            )}
          </Section>
        );
      })}

      {/* The work itself. Grayscale per the system; colour lives in the accent. */}
      {showcase && showcase.items.length > 0 && (
        <Section>
          <SectionLabel number={num("showcase")}>{showcase.label}</SectionLabel>
          <SectionH2 className="mt-8 max-w-[22ch]">
            {showcase.heading}
          </SectionH2>

          <GridCells cols="mt-[clamp(28px,4vw,56px)] grid-cols-1 min-[700px]:grid-cols-3">
            {showcase.items.map((item, i) => (
              <Cell key={item.href}>
                <Link href={item.href} className="group flex h-full flex-col no-underline">
                  <GrayImage
                    src={item.src}
                    alt={item.alt}
                    width={640}
                    height={400}
                    // Below the fold on every page that uses this.
                    className="border-2 border-ink"
                    imgClassName="h-auto w-full"
                    sizes="(min-width: 700px) 33vw, 100vw"
                  />
                  <h3 className="mt-5 text-[16px] font-extrabold leading-[1.15] tracking-[-.02em] transition-colors group-hover:text-accent-700">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-[1.55] text-neutral-800">
                    {item.note}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-auto pt-5 text-[13px] font-extrabold text-accent-700"
                  >
                    {i === 0 ? "READ THE CASE STUDY →" : "→"}
                  </span>
                </Link>
              </Cell>
            ))}
          </GridCells>
        </Section>
      )}

      {/* Proof, in real numbers only. */}
      {proof.length > 0 && (
        <section className="section-pad border-t-2 border-t-ink bg-ink text-bg">
          <div className="site-container">
            <SectionLabel number={num("proof")} onDark>
              PROOF
            </SectionLabel>
            <div className="mt-[clamp(28px,4vw,56px)] grid gap-[2px] bg-neutral-800 min-[700px]:grid-cols-3">
              {proof.map((item) => (
                <div key={item.label} className="bg-ink py-6 min-[700px]:px-6 min-[700px]:first:pl-0">
                  <p
                    className="font-extrabold leading-none tracking-[-.035em] text-accent-400"
                    style={{ fontSize: "clamp(28px, 3.4vw, 46px)" }}
                  >
                    {item.value}
                  </p>
                  <p className="eyebrow mt-3 text-neutral-500">{item.label}</p>
                  <p className="mt-3 text-[13.5px] leading-[1.55] text-neutral-400">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Section>
        <div className="grid gap-[clamp(24px,4vw,56px)] min-[900px]:grid-cols-[.7fr_1.3fr]">
          <div>
            <SectionLabel number={num("faq")}>STRAIGHT ANSWERS</SectionLabel>
            <SectionH2 size="md" className="mt-8">
              Questions people actually ask.
            </SectionH2>

            {relatedLinks.length > 0 && (
              <nav className="mt-10 border-t-2 border-t-ink pt-5">
                <p className="eyebrow text-neutral-700">RELATED</p>
                <ul className="mt-4 flex flex-col gap-[10px]">
                  {relatedLinks.map((link) => (
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
          </div>
          <Faq items={faq} />
        </div>
      </Section>

      {cluster && cluster.links.length > 0 && (
        <Section ground="surface">
          <SectionLabel number={num("cluster")}>{cluster.label}</SectionLabel>
          <SectionH2 size="md" className="mt-8 max-w-[22ch]">
            {cluster.heading}
          </SectionH2>

          <GridCells
            ground="surface"
            cols="mt-[clamp(28px,4vw,56px)] grid-cols-1 min-[600px]:grid-cols-2 min-[1041px]:grid-cols-3"
          >
            {cluster.links.map((link) => (
              <Cell key={link.href} ground="surface">
                {/* The whole cell is the target — a 13px text link is a poor
                    one on a phone, a padded cell is a good one. */}
                <Link href={link.href} className="group flex h-full flex-col no-underline">
                  <span className="text-[15px] font-extrabold leading-[1.2] tracking-[-.02em] text-ink transition-colors group-hover:text-accent-700">
                    {link.label}
                  </span>
                  {link.note && (
                    <span className="mt-3 text-[13.5px] leading-[1.55] text-neutral-800">
                      {link.note}
                    </span>
                  )}
                  <span
                    aria-hidden="true"
                    className="mt-auto pt-5 text-[13px] font-extrabold text-accent-700"
                  >
                    →
                  </span>
                </Link>
              </Cell>
            ))}
          </GridCells>
        </Section>
      )}

      <PageContact heading={contactHeading} formName={slug.replace(/^\//, "")} />
    </>
  );
}
