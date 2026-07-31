import type { Metadata } from "next";
import Link from "next/link";
import { buildMeta } from "@/lib/meta";
import { JsonLd } from "@/components/JsonLd";
import { abs, breadcrumbSchema, faqSchema, providerRef, webPageSchema } from "@/lib/schema";
import { ScopeProvider } from "@/components/scope/ScopeContext";
import { PageHero } from "@/components/page/PageHero";
import { PageContact } from "@/components/page/PageContact";
import { Section, SectionLabel } from "@/components/ui/Section";
import { GridCells, Cell } from "@/components/ui/GridCells";
import { Faq } from "@/components/ui/Faq";
import { RoiCalc } from "@/components/home/RoiCalc";
import type { FaqItem } from "@/content/faq";

const PATH = "/roi-calculator";
const TITLE = "Manual Work Cost Calculator | Merrill Digital";
const DESCRIPTION =
  "See what manual admin work costs your business every month, and how long a custom build takes to pay for itself. Free, instant, no email required.";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Operations software", path: "/operations-software" },
  { name: "ROI calculator", path: PATH },
];

/** What the model takes as given. The arithmetic itself lives in RoiCalc. */
const ASSUMPTIONS = [
  {
    label: "THE HOURS",
    title: "Admin time, not all time",
    body: "Count the hours your people spend on data entry, chasing paperwork, rebuilding reports and re-keying the same job into a second tool. Not the work customers pay for.",
  },
  {
    label: "THE RATE",
    title: "Wage, not loaded cost",
    body: "Use what you actually pay per hour. Payroll tax, insurance and equipment would push the real figure higher, so the number you see is the conservative one.",
  },
  {
    label: "THE MONTH",
    title: "A month is 4.33 weeks",
    body: "Not four. Using four undercounts by roughly eight percent, which is the kind of quiet rounding that makes a calculator flattering instead of useful.",
  },
  {
    label: "THE PAYBACK",
    title: "Measured against a $25,000 V1",
    body: "That's the realistic floor for an operations build, so it's what the payback figure amortizes. A bigger scope pushes the payback out proportionally.",
  },
];

const OVERSTATES = [
  {
    title: "Software never removes all of it",
    body: "A good build kills the double entry and the manual reports. It doesn't kill every phone call, every exception, or the judgement calls somebody still has to make.",
  },
  {
    title: "Adoption costs you weeks",
    body: "Your team has to learn the new thing while running the business. Real payback starts after that, not on launch day.",
  },
  {
    title: "Some admin is the actual job",
    body: "Compliance records, customer follow-up, quoting. If the hours you counted are work rather than friction, automating them is the wrong project.",
  },
];

const FAQ: FaqItem[] = [
  {
    q: "Is this a quote?",
    a: "No. It's an estimate of what your manual work is costing, not a price for your project. It exists to tell you whether the conversation is worth having. The actual number for a build comes out of scoping, in writing, before any code is written.",
  },
  {
    q: "Do I have to give you my email to see the result?",
    a: "No. Nothing on this page is gated, nothing is emailed to you, and the sliders don't send me anything. Move them, read the number, close the tab if that's all you needed.",
  },
  {
    q: "The number looks enormous. Is it real?",
    a: "It's real arithmetic on the inputs you gave it, which is exactly why it surprises people — manual work is spread so thin across a team that nobody ever sees the total. Sanity-check it by asking two of your people to log their admin hours honestly for a week, then put the real figure in.",
  },
  {
    q: "What if the monthly number is small?",
    a: "Then don't build anything. If the payback runs past a couple of years, a custom system is the wrong purchase and I'll say so on the call. Fix the process, or buy an off-the-shelf tool that mostly fits, and spend the money somewhere it earns more.",
  },
  {
    q: "What does a build cost if the number is big?",
    a: "Websites run $3,000–$9,000. Operations software starts at $25,000, and most V1 builds land between $25,000 and $65,000. The full ranges and what moves them are published on the pricing page — no form in the way.",
  },
  {
    q: "How long before it's actually running?",
    a: "Six to twelve weeks for a scoped V1, fixed at the start. The timeline holds because the feature list and the out-of-scope list are agreed before the build begins, and you see working features weekly rather than one reveal at the end.",
  },
];

export const metadata: Metadata = buildMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function RoiCalculatorPage() {
  return (
    <ScopeProvider>
      <JsonLd
        data={[
          webPageSchema({ name: TITLE, description: DESCRIPTION, path: PATH }),
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "@id": `${abs(PATH)}#app`,
            name: "Manual work cost calculator",
            description:
              "Estimates the monthly and annual cost of manual admin work for a service business, and the payback period on a custom operations build.",
            url: abs(PATH),
            applicationCategory: "BusinessApplication",
            operatingSystem: "Any",
            browserRequirements: "Requires JavaScript",
            isAccessibleForFree: true,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            publisher: providerRef(),
          },
          breadcrumbSchema(CRUMBS),
          faqSchema(FAQ),
        ]}
      />

      <PageHero
        eyebrow="FREE TOOL · NO EMAIL REQUIRED"
        title="What is manual work costing you?"
        lede="Most service businesses lose more to double data entry, dispatch mistakes and reports rebuilt by hand every Monday than to any single line on the P&L. It never shows up on an invoice, so nobody adds it up. Put your numbers in and see it."
        crumbs={CRUMBS}
        primaryCta="SEND ME YOUR NUMBERS →"
        secondaryCta="SEE THE PRICING"
        secondaryHref="/pricing"
      />

      <Section id="math" ground="surface" borderTop>
        <SectionLabel number="01">MOVE THE SLIDERS</SectionLabel>
        <h2
          className="mt-5 max-w-[20ch] font-extrabold"
          style={{
            fontSize: "clamp(30px, 4.2vw, 60px)",
            letterSpacing: "-.035em",
            lineHeight: 1,
          }}
        >
          Three inputs. One uncomfortable number.
        </h2>
        <p className="mt-6 max-w-[68ch] text-[15.5px] leading-[1.62] text-neutral-800">
          Employees, the admin hours each of them burns in a week, and what you
          pay per hour. That&rsquo;s all it takes. Nothing is sent anywhere and
          nothing is stored — the whole thing runs in your browser.
        </p>

        <RoiCalc />
      </Section>

      <Section borderTop>
        <SectionLabel number="02">NO BLACK BOX</SectionLabel>
        <h2
          className="mt-5 max-w-[20ch] font-extrabold"
          style={{
            fontSize: "clamp(30px, 4.2vw, 60px)",
            letterSpacing: "-.035em",
            lineHeight: 1,
          }}
        >
          What it takes as given.
        </h2>
        <p className="mt-6 max-w-[68ch] text-[15.5px] leading-[1.62] text-neutral-800">
          Every calculator on the internet is tuned to make the vendor look
          good. Here are the four assumptions behind this one, so you can decide
          for yourself whether the output means anything.
        </p>

        <GridCells cols="mt-[clamp(28px,4vw,56px)] grid-cols-1 min-[600px]:grid-cols-2 min-[1041px]:grid-cols-4">
          {ASSUMPTIONS.map((item) => (
            <Cell key={item.label}>
              <p className="eyebrow text-accent-700">{item.label}</p>
              <h3 className="mt-4 text-[17px] font-extrabold leading-[1.12] tracking-[-.02em]">
                {item.title}
              </h3>
              <p className="mt-3 text-[13.5px] leading-[1.55] text-neutral-800">
                {item.body}
              </p>
            </Cell>
          ))}
        </GridCells>
      </Section>

      <section className="section-pad border-t-2 border-t-ink bg-ink text-bg">
        <div className="site-container">
          <SectionLabel number="03" onDark>
            WHERE THIS OVERSTATES
          </SectionLabel>
          <h2
            className="mt-5 max-w-[22ch] font-extrabold"
            style={{
              fontSize: "clamp(30px, 4.2vw, 60px)",
              letterSpacing: "-.035em",
              lineHeight: 1,
            }}
          >
            You won&rsquo;t get all of it back.
          </h2>
          <p className="mt-6 max-w-[68ch] text-[15.5px] leading-[1.62] text-neutral-400">
            The figure above is what the manual work costs, not what a build
            hands back to you. Three reasons the recovered amount is smaller —
            and worth knowing before you spend anything.
          </p>

          <div className="mt-[clamp(28px,4vw,56px)] grid gap-[2px] bg-neutral-800 min-[700px]:grid-cols-3">
            {OVERSTATES.map((item, i) => (
              <div
                key={item.title}
                className="bg-ink py-6 min-[700px]:px-6 min-[700px]:first:pl-0"
              >
                <p className="text-[26px] font-extrabold leading-none tracking-[-.035em] text-accent-400">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-[17px] font-extrabold leading-[1.12] tracking-[-.02em]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.55] text-neutral-400">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section ground="surface" borderTop>
        <div className="grid gap-[clamp(24px,4vw,56px)] min-[900px]:grid-cols-[.7fr_1.3fr]">
          <div>
            <SectionLabel number="04">STRAIGHT ANSWERS</SectionLabel>
            <h2
              className="mt-5 font-extrabold"
              style={{
                fontSize: "clamp(28px, 3.6vw, 50px)",
                letterSpacing: "-.035em",
                lineHeight: 1,
              }}
            >
              About the number.
            </h2>

            <nav className="mt-10 border-t-2 border-t-ink pt-5">
              <p className="eyebrow text-neutral-700">RELATED</p>
              <ul className="mt-4 flex flex-col gap-[10px]">
                {[
                  { href: "/operations-software", label: "Custom operations software" },
                  { href: "/free-checklist", label: "10 signs you've outgrown your software" },
                  { href: "/custom-software-vs-servicetitan-utah", label: "Custom vs ServiceTitan" },
                  { href: "/pricing", label: "Full published pricing" },
                ].map((link) => (
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
          <Faq items={FAQ} />
        </div>
      </Section>

      <PageContact
        heading="Seen a number you don't like?"
        lede="That's the useful outcome. Tell me what the manual work actually is and I'll scope what it would take to remove it — fixed cost, fixed timeline, written down first."
        formName="roi-calculator"
      />
    </ScopeProvider>
  );
}
