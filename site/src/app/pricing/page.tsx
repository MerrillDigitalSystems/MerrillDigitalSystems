import type { Metadata } from "next";
import { buildMeta } from "@/lib/meta";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
  webPageSchema,
} from "@/lib/schema";
import { ScopeProvider } from "@/components/scope/ScopeContext";
import { ScopeBuilder } from "@/components/scope/ScopeBuilder";
import { PageHero } from "@/components/page/PageHero";
import { PageContact } from "@/components/page/PageContact";
import { Section, SectionLabel } from "@/components/ui/Section";
import { GridCells, Cell } from "@/components/ui/GridCells";
import { Faq } from "@/components/ui/Faq";
import { SCOPE_COPY } from "@/content/scope";
import { PRICING_FAQ, PRICING_TIERS, PRICING_TERMS } from "@/content/pricing";

const TITLE = "What Custom Software & Websites Cost in Utah (2026 Pricing)";
const DESCRIPTION =
  "Real numbers, published: websites $3,000–$9,000, custom software from $25,000. Build your own scope and see the range before you ever fill in a form.";

export const metadata: Metadata = buildMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <ScopeProvider>
      <JsonLd
        data={[
          webPageSchema({ name: TITLE, description: DESCRIPTION, path: "/pricing" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
          ]),
          serviceSchema({
            name: "Custom software development",
            serviceType: "Custom software development",
            description:
              "Operations hubs, field service platforms and mobile apps built for Utah service businesses. Most V1 builds land between $25,000 and $65,000.",
            priceRange: "$25000-$65000",
            path: "/pricing",
          }),
          serviceSchema({
            name: "Website design and local SEO",
            serviceType: "Website design",
            description:
              "Custom-coded lead-generation websites with local SEO, Google Business Profile and analytics handover. $3,000–$9,000.",
            priceRange: "$3000-$9000",
            path: "/pricing",
          }),
          faqSchema(PRICING_FAQ),
        ]}
      />

      <PageHero
        eyebrow="PUBLISHED PRICING · NO 'CONTACT US FOR A QUOTE'"
        title="What this actually costs."
        lede="Most studios in this market hide the number until they have your email. Here it is instead: the real ranges, what moves them, and a builder that prices your project before you talk to anyone."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ]}
        secondaryCta="JUMP TO THE BUILDER"
        secondaryHref="#scope"
      />

      <Section borderTop>
        <SectionLabel number="01">THE THREE NUMBERS</SectionLabel>
        <h2
          className="mt-5 font-extrabold"
          style={{
            fontSize: "clamp(30px, 4.2vw, 64px)",
            letterSpacing: "-.035em",
            lineHeight: 1,
          }}
        >
          Three ranges cover almost everything.
        </h2>

        <GridCells cols="mt-[clamp(28px,4vw,56px)] grid-cols-1 min-[900px]:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <Cell key={tier.name}>
              <p className="eyebrow text-accent-700">{tier.eyebrow}</p>
              <h3 className="mt-3 text-[clamp(19px,2vw,24px)] font-extrabold leading-[1.12] tracking-[-.02em]">
                {tier.name}
              </h3>
              <p
                className="mt-5 font-extrabold leading-none tracking-[-.035em]"
                style={{ fontSize: "clamp(26px, 3vw, 40px)" }}
              >
                {tier.range}
              </p>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-[.15em] text-neutral-700">
                {tier.timeline}
              </p>
              <p className="mt-5 text-[13.5px] leading-[1.55] text-neutral-800">
                {tier.body}
              </p>
              <ul className="mt-5">
                {tier.drivers.map((driver) => (
                  <li
                    key={driver}
                    className="border-t border-t-neutral-300 py-[10px] text-[13.5px] leading-[1.45] last:border-b last:border-b-neutral-300"
                  >
                    {driver}
                  </li>
                ))}
              </ul>
            </Cell>
          ))}
        </GridCells>
      </Section>

      <section id="scope" className="section-pad border-t-2 border-t-ink bg-ink text-bg">
        <div className="site-container">
          <SectionLabel number="02" onDark>
            BUILD YOUR OWN SCOPE
          </SectionLabel>
          <h2
            className="mt-5 font-extrabold"
            style={{
              fontSize: "clamp(30px, 4.2vw, 64px)",
              letterSpacing: "-.035em",
              lineHeight: 1,
            }}
          >
            {SCOPE_COPY.heading}
          </h2>
          <p className="mt-6 max-w-[68ch] text-[15px] leading-[1.62] text-neutral-400">
            {SCOPE_COPY.lede}
          </p>
          <ScopeBuilder />
        </div>
      </section>

      <Section ground="surface" borderTop>
        <SectionLabel number="03">HOW PAYING WORKS</SectionLabel>
        <h2
          className="mt-5 font-extrabold"
          style={{
            fontSize: "clamp(30px, 4.2vw, 64px)",
            letterSpacing: "-.035em",
            lineHeight: 1,
          }}
        >
          Terms, in plain language.
        </h2>

        <GridCells cols="mt-[clamp(28px,4vw,56px)] grid-cols-1 min-[600px]:grid-cols-2 min-[1041px]:grid-cols-4" ground="surface">
          {PRICING_TERMS.map((term) => (
            <Cell key={term.label} ground="surface">
              <p className="eyebrow text-accent-700">{term.label}</p>
              <p className="mt-3 text-[15px] font-extrabold leading-[1.3] tracking-[-.02em]">
                {term.value}
              </p>
              <p className="mt-3 text-[13.5px] leading-[1.55] text-neutral-800">
                {term.body}
              </p>
            </Cell>
          ))}
        </GridCells>
      </Section>

      <Section borderTop>
        <div className="grid gap-[clamp(24px,4vw,56px)] min-[900px]:grid-cols-[.7fr_1.3fr]">
          <div>
            <SectionLabel number="04">COST QUESTIONS</SectionLabel>
            <h2
              className="mt-5 font-extrabold"
              style={{
                fontSize: "clamp(30px, 4.2vw, 56px)",
                letterSpacing: "-.035em",
                lineHeight: 1,
              }}
            >
              The money questions, answered.
            </h2>
          </div>
          <Faq items={PRICING_FAQ} />
        </div>
      </Section>

      <PageContact
        heading="Know the range? Let's pin down the number."
        lede="Send me the scope you built, or just describe the mess. Either way you get a real figure and a timeline before anyone asks you for a deposit."
        formName="pricing"
      />
    </ScopeProvider>
  );
}
