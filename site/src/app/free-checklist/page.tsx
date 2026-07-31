import type { Metadata } from "next";
import Link from "next/link";
import { buildMeta } from "@/lib/meta";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { ScopeProvider } from "@/components/scope/ScopeContext";
import { PageHero } from "@/components/page/PageHero";
import { PageContact } from "@/components/page/PageContact";
import { Section, SectionLabel } from "@/components/ui/Section";
import { GridCells, Cell } from "@/components/ui/GridCells";
import { Faq } from "@/components/ui/Faq";
import { Checklist, type ChecklistItem } from "@/components/tools/Checklist";
import type { FaqItem } from "@/content/faq";

const PATH = "/free-checklist";
const TITLE = "Free Software Checklist | Merrill Digital Systems";
const DESCRIPTION =
  "Ten signs your software is costing you money instead of saving it. Check the ones that apply and score your operation in two minutes. No email required.";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Free checklist", path: PATH },
];

const ITEMS: ChecklistItem[] = [
  {
    id: "reports",
    title: "Reports need cleaning up before anyone trusts them",
    body: "If someone reconciles, corrects or reformats the data before a report can be used, the system is making work rather than saving it. The bigger the team, the more that costs.",
  },
  {
    id: "status",
    title: "Job status lives in more than one place",
    body: "The spreadsheet says one thing, the group text says another, the board says a third. Your team hunts for the truth instead of just knowing it.",
  },
  {
    id: "keyperson",
    title: "It only works because one person understands the setup",
    body: "If that person being out sick would stall the workflow, that isn't a tool — it's a key-person risk wearing a tool's clothes.",
  },
  {
    id: "workarounds",
    title: "You've built manual side-processes for the exceptions",
    body: "Temporary fixes become permanent. Every workaround is a weekly time tax and a place for errors to get in unnoticed.",
  },
  {
    id: "features",
    title: "You pay for features you never open and lack ones you need",
    body: "Generic platforms are built for the average business. If yours isn't average, you fund what doesn't apply while working around what does.",
  },
  {
    id: "reentry",
    title: "The same data gets typed in more than once",
    body: "A job created in the field app, re-entered into accounting, re-entered again on the customer record. Every re-entry costs minutes and invites a mistake.",
  },
  {
    id: "pricing",
    title: "Your software can't represent how you actually price",
    body: "Multi-phase quotes, hybrid pricing, service plus install plus maintenance. If the tool makes you fake it, customers notice and quotes go out slower.",
  },
  {
    id: "onboarding",
    title: "Adding people makes things harder, not easier",
    body: "If onboarding means training someone on a patchwork of tools and undocumented workarounds, the software is capping how fast you can grow.",
  },
  {
    id: "visibility",
    title: "You can't see how the business is doing without a project",
    body: "If job margin, crew utilization or revenue by service line takes two hours to assemble, you're deciding on stale numbers or on instinct.",
  },
  {
    id: "shoulddothis",
    title: "You've said “the software should do this” in the last 90 days",
    body: "Every time you say it, you accept a gap between how the business should run and how it does. Those gaps compound quietly, until they stop being quiet.",
  },
];

const BANDS = [
  {
    range: "0 – 2",
    title: "You're in good shape",
    body: "Your tools are holding up. Nothing here needs money thrown at it. Keep an eye on the gaps — they tend to compound as headcount grows — and come back to this page in a year.",
  },
  {
    range: "3 – 5",
    title: "Friction worth naming",
    body: "You're spending more management time compensating for software gaps than you'd like. It still works, so there's no emergency. This is the point to look at options calmly rather than in a crisis.",
  },
  {
    range: "6 – 10",
    title: "It's costing you now",
    body: "At this score the software isn't inconvenient, it's a constraint — errors, lost hours, and a ceiling on growth. Worth a thirty-minute conversation, even if the outcome is a different off-the-shelf tool.",
  },
];

const FAQ: FaqItem[] = [
  {
    q: "Does a high score mean I should build custom software?",
    a: "Not on its own. A high score means something is wrong; it doesn't say what to buy. Plenty of six-out-of-ten operations are fixed by switching to a better-fitting off-the-shelf tool, or by changing a process rather than a product. Custom earns its cost when the tool structurally can't model how you work — not simply when the current one annoys you.",
  },
  {
    q: "Do I have to give you my email to see the score?",
    a: "No. Nothing is gated, nothing is stored, and checking a box doesn't send me anything. The whole thing runs in your browser. Read your score and close the tab if that's all you came for.",
  },
  {
    q: "I scored two. What now?",
    a: "Nothing. Don't spend money. Two signs is normal friction in a business that's working, and replacing software that's mostly fine is one of the more expensive mistakes an owner can make. Bookmark this and re-run it after your next growth spurt.",
  },
  {
    q: "What would fixing it cost?",
    a: "Operations software starts at $25,000, with most V1 builds landing between $25,000 and $65,000 and shipping in 6–12 weeks. Websites are $3,000–$9,000. The full ranges are published on the pricing page, and the number for your project gets fixed in writing before any code is written.",
  },
];

export const metadata: Metadata = buildMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function FreeChecklistPage() {
  return (
    <ScopeProvider>
      <JsonLd
        data={[
          webPageSchema({ name: TITLE, description: DESCRIPTION, path: PATH }),
          breadcrumbSchema(CRUMBS),
          faqSchema(FAQ),
        ]}
      />

      <PageHero
        eyebrow="FREE ASSESSMENT · NO EMAIL REQUIRED"
        title="10 signs you've outgrown your software."
        lede="Check every sign that applies to your operation. The score tells you where you stand and roughly what it's costing — and if it comes back low, the right answer is to spend nothing and get on with your day."
        crumbs={CRUMBS}
        primaryCta="GET A STRAIGHT ANSWER →"
        secondaryCta="WHAT THE SCORE MEANS"
        secondaryHref="#meaning"
      />

      <Section borderTop>
        <SectionLabel number="01">CHECK WHAT APPLIES</SectionLabel>
        <h2
          className="mt-5 max-w-[20ch] font-extrabold"
          style={{
            fontSize: "clamp(30px, 4.2vw, 60px)",
            letterSpacing: "-.035em",
            lineHeight: 1,
          }}
        >
          Two minutes. Ten questions.
        </h2>
        <p className="mt-6 max-w-[68ch] text-[15.5px] leading-[1.62] text-neutral-800">
          These are the ten things I hear most often on discovery calls, in the
          order they usually show up. Be honest with the middle ones — those are
          the ones people talk themselves out of.
        </p>

        <Checklist items={ITEMS} />
      </Section>

      <Section id="meaning" ground="surface" borderTop>
        <SectionLabel number="02">WHAT THE SCORE MEANS</SectionLabel>
        <h2
          className="mt-5 max-w-[20ch] font-extrabold"
          style={{
            fontSize: "clamp(30px, 4.2vw, 60px)",
            letterSpacing: "-.035em",
            lineHeight: 1,
          }}
        >
          Three bands, and one of them says do nothing.
        </h2>

        <GridCells
          cols="mt-[clamp(28px,4vw,56px)] grid-cols-1 min-[900px]:grid-cols-3"
          ground="surface"
        >
          {BANDS.map((band) => (
            <Cell key={band.range} ground="surface">
              <p
                className="font-extrabold leading-none tracking-[-.035em] text-accent"
                style={{ fontSize: "clamp(28px, 3.4vw, 44px)" }}
              >
                {band.range}
              </p>
              <h3 className="mt-4 text-[17px] font-extrabold leading-[1.12] tracking-[-.02em]">
                {band.title}
              </h3>
              <p className="mt-3 text-[13.5px] leading-[1.55] text-neutral-800">
                {band.body}
              </p>
            </Cell>
          ))}
        </GridCells>
      </Section>

      <Section borderTop>
        <div className="grid gap-[clamp(24px,4vw,56px)] min-[900px]:grid-cols-[.7fr_1.3fr]">
          <div>
            <SectionLabel number="03">STRAIGHT ANSWERS</SectionLabel>
            <h2
              className="mt-5 font-extrabold"
              style={{
                fontSize: "clamp(28px, 3.6vw, 50px)",
                letterSpacing: "-.035em",
                lineHeight: 1,
              }}
            >
              After the score.
            </h2>

            <nav className="mt-10 border-t-2 border-t-ink pt-5">
              <p className="eyebrow text-neutral-600">RELATED</p>
              <ul className="mt-4 flex flex-col gap-[10px]">
                {[
                  { href: "/roi-calculator", label: "What manual work is costing you" },
                  {
                    href: "/custom-software-vs-servicetitan-utah",
                    label: "Custom vs ServiceTitan",
                  },
                  { href: "/operations-software", label: "Custom operations software" },
                  { href: "/free-audit", label: "Free website and operations audit" },
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
        heading="Know the score. Now know the options."
        lede="Tell me which signs you checked and I'll tell you what's actually causing them — and whether the fix is a build, a different tool, or a change you can make on Monday for free."
        formName="free-checklist"
      />
    </ScopeProvider>
  );
}
