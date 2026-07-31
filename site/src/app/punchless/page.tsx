import type { Metadata } from "next";
import Link from "next/link";
import { buildMeta } from "@/lib/meta";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  softwareAppSchema,
  webPageSchema,
} from "@/lib/schema";
import { PageHero } from "@/components/page/PageHero";
import { PageContact } from "@/components/page/PageContact";
import { Section, SectionLabel } from "@/components/ui/Section";
import { GridCells, Cell } from "@/components/ui/GridCells";
import { Faq } from "@/components/ui/Faq";
import { Btn } from "@/components/ui/Btn";
import { Tag } from "@/components/ui/Tag";
import { PUNCHLESS_PAGE as data, PUNCHLESS_FAQ } from "@/content/punchless";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/#work" },
  { name: "Punchless", path: data.slug },
];

export const metadata: Metadata = buildMeta({
  title: data.title,
  description: data.description,
  path: data.slug,
});

/**
 * Not a case study — Punchless is the studio's own product, and the page has a
 * job the case study template can't do: prove that the same person who'd build
 * your system already operates production software of his own.
 */
export default function PunchlessPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            name: data.h1,
            description: data.description,
            path: data.slug,
          }),
          breadcrumbSchema(CRUMBS),
          softwareAppSchema({
            name: "Punchless",
            description:
              "GPS-geofenced timecard software for field service teams. Drafts timecards automatically when crews arrive at and leave job sites, with live crew visibility, an approval flow, and payroll-ready exports.",
            url: data.url,
            operatingSystem: "iOS, Android, Web",
            offers: data.plans.map((plan) => ({
              name: plan.name,
              price: plan.price,
              description: "Per technician, per month",
            })),
          }),
          faqSchema(PUNCHLESS_FAQ),
        ]}
      />

      <PageHero
        eyebrow={data.eyebrow}
        title={data.h1}
        lede={data.lede}
        crumbs={CRUMBS}
        primaryCta="START A FREE 30-DAY TRIAL →"
        primaryHref={data.url}
        secondaryCta="SEE HOW IT WORKS"
        secondaryHref="#how"
      />

      {/* The four numbers that describe the product, none of them invented. */}
      <section className="section-pad border-t-2 border-t-ink bg-ink text-bg">
        <div className="site-container">
          <div className="grid gap-[2px] bg-neutral-800 min-[700px]:grid-cols-4">
            {data.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-ink py-6 min-[700px]:px-6 min-[700px]:first:pl-0"
              >
                <p
                  className="font-extrabold leading-none tracking-[-.035em] text-accent-400"
                  style={{ fontSize: "clamp(30px, 4vw, 56px)" }}
                >
                  {stat.value}
                </p>
                <p className="eyebrow mt-3 text-neutral-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The strategic point of the page. */}
      <Section borderTop id="why">
        <SectionLabel number="01">WHY I, OF ALL PEOPLE, BUILT A SAAS</SectionLabel>
        <h2
          className="mt-5 max-w-[20ch] font-extrabold"
          style={{
            fontSize: "clamp(30px, 4.2vw, 60px)",
            letterSpacing: "-.035em",
            lineHeight: 1,
          }}
        >
          {data.why.heading}
        </h2>
        <div className="mt-8 max-w-[68ch]">
          {data.why.paragraphs.map((para) => (
            <p
              key={para}
              className="mt-4 text-[15.5px] leading-[1.65] text-neutral-800 first:mt-0"
            >
              {para}
            </p>
          ))}
        </div>
        <div className="mt-[clamp(22px,3vw,34px)] flex flex-wrap gap-4">
          <Btn href={data.url}>EXPLORE PUNCHLESS →</Btn>
          <Btn href="/operations-software" variant="secondary">
            OR SEE THE CUSTOM WORK
          </Btn>
        </div>
      </Section>

      <Section ground="surface" borderTop id="how">
        <SectionLabel number="02">HOW IT WORKS</SectionLabel>
        <h2
          className="mt-5 max-w-[20ch] font-extrabold"
          style={{
            fontSize: "clamp(30px, 4.2vw, 60px)",
            letterSpacing: "-.035em",
            lineHeight: 1,
          }}
        >
          No app to remember. The geofence does the work.
        </h2>

        <GridCells
          cols="mt-[clamp(28px,4vw,56px)] grid-cols-1 min-[600px]:grid-cols-2 min-[1041px]:grid-cols-4"
          ground="surface"
        >
          {data.steps.map((step) => (
            <Cell key={step.n} ground="surface">
              <p className="text-[26px] font-extrabold leading-none tracking-[-.035em] text-neutral-300">
                {step.n}
              </p>
              <h3 className="mt-4 text-[17px] font-extrabold leading-[1.12] tracking-[-.02em]">
                {step.title}
              </h3>
              <p className="mt-3 text-[13.5px] leading-[1.55] text-neutral-800">
                {step.body}
              </p>
            </Cell>
          ))}
        </GridCells>
      </Section>

      <Section borderTop id="features">
        <SectionLabel number="03">WHAT&rsquo;S INSIDE</SectionLabel>
        <h2
          className="mt-5 max-w-[20ch] font-extrabold"
          style={{
            fontSize: "clamp(30px, 4.2vw, 60px)",
            letterSpacing: "-.035em",
            lineHeight: 1,
          }}
        >
          Everything a crew business needs to trust its hours.
        </h2>

        <GridCells cols="mt-[clamp(28px,4vw,56px)] grid-cols-1 min-[600px]:grid-cols-2 min-[1041px]:grid-cols-3">
          {data.features.map((feature) => (
            <Cell key={feature.title}>
              <h3 className="text-[17px] font-extrabold leading-[1.12] tracking-[-.02em]">
                {feature.title}
              </h3>
              <p className="mt-3 text-[13.5px] leading-[1.55] text-neutral-800">
                {feature.body}
              </p>
            </Cell>
          ))}
        </GridCells>

        <div className="mt-[clamp(14px,2vw,26px)] flex flex-wrap items-center gap-3 border-2 border-ink bg-bg p-[clamp(18px,2.4vw,28px)]">
          <span className="eyebrow text-neutral-600">BUILT FOR</span>
          {data.industries.map((industry) => (
            <Tag key={industry}>{industry}</Tag>
          ))}
        </div>
      </Section>

      <Section ground="surface" borderTop id="pricing">
        <SectionLabel number="04">PRICING</SectionLabel>
        <h2
          className="mt-5 max-w-[20ch] font-extrabold"
          style={{
            fontSize: "clamp(30px, 4.2vw, 60px)",
            letterSpacing: "-.035em",
            lineHeight: 1,
          }}
        >
          Priced so a two-truck shop can start today.
        </h2>
        <p className="mt-6 max-w-[62ch] text-[15.5px] leading-[1.62] text-neutral-800">
          Every plan starts with a 30-day free trial and no credit card. This is
          Punchless pricing — my build pricing lives on the pricing page.
        </p>

        <GridCells
          cols="mt-[clamp(28px,4vw,56px)] grid-cols-1 min-[900px]:grid-cols-3"
          ground="surface"
        >
          {data.plans.map((plan) => (
            <Cell key={plan.name} ground={plan.featured ? "bg" : "surface"}>
              <p className="eyebrow text-accent-700">{plan.name}</p>
              <p
                className="mt-4 font-extrabold leading-none tracking-[-.035em]"
                style={{ fontSize: "clamp(26px, 3vw, 40px)" }}
              >
                ${plan.price}
                <span className="text-[15px] font-bold tracking-normal text-neutral-600">
                  {plan.unit}
                </span>
              </p>
              <p className="mt-4 text-[13.5px] leading-[1.55] text-neutral-800">
                {plan.note}
              </p>
              <ul className="mt-5">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="border-t border-t-neutral-300 py-[10px] text-[13.5px] leading-[1.45] last:border-b last:border-b-neutral-300"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </Cell>
          ))}
        </GridCells>

        <div className="mt-[clamp(22px,3vw,34px)] flex flex-wrap items-center gap-4">
          <Btn href={data.url}>START A FREE TRIAL →</Btn>
          <p className="text-[13px] font-bold uppercase tracking-[.11em] text-neutral-600">
            30-DAY TRIAL · NO CREDIT CARD · GETPUNCHLESS.COM
          </p>
        </div>
      </Section>

      <Section borderTop id="faq">
        <div className="grid gap-[clamp(24px,4vw,56px)] min-[900px]:grid-cols-[.7fr_1.3fr]">
          <div>
            <SectionLabel number="05">COMMON QUESTIONS</SectionLabel>
            <h2
              className="mt-5 font-extrabold"
              style={{
                fontSize: "clamp(28px, 3.6vw, 50px)",
                letterSpacing: "-.035em",
                lineHeight: 1,
              }}
            >
              Punchless, answered straight.
            </h2>

            <nav className="mt-10 border-t-2 border-t-ink pt-5">
              <p className="eyebrow text-neutral-600">RELATED</p>
              <ul className="mt-4 flex flex-col gap-[10px]">
                {data.relatedLinks.map((link) => (
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
          </div>
          <Faq items={PUNCHLESS_FAQ} />
        </div>
      </Section>

      <PageContact
        heading="Need something Punchless doesn't do?"
        lede="Punchless fixes timecards. If the thing costing you hours is scheduling, dispatch, quoting or reporting, tell me about it — you'll get a straight answer on whether custom is worth it, and a number in writing if it is."
        formName="punchless"
      />
    </>
  );
}
