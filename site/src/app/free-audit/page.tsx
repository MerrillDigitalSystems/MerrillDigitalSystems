import type { Metadata } from "next";
import Link from "next/link";
import { buildMeta } from "@/lib/meta";
import { JsonLd } from "@/components/JsonLd";
import { abs, breadcrumbSchema, faqSchema, providerRef, webPageSchema } from "@/lib/schema";
import { ScopeProvider } from "@/components/scope/ScopeContext";
import { PageHero } from "@/components/page/PageHero";
import { PageContact } from "@/components/page/PageContact";
import { Section, SectionLabel, SectionH2 } from "@/components/ui/Section";
import { GridCells, Cell } from "@/components/ui/GridCells";
import { Faq } from "@/components/ui/Faq";
import { Btn } from "@/components/ui/Btn";
import type { FaqItem } from "@/content/faq";

const PATH = "/free-audit";
const TITLE = "Free Website Audit | Merrill Digital Systems";
const DESCRIPTION =
  "A free, written review of your site and the tools you run on — what's costing you leads, what to fix first, and what to leave alone. No obligation.";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Free audit", path: PATH },
];

const COVERED = [
  {
    title: "Local search visibility",
    body: "Whether you show up when someone in your city searches for what you sell. Page structure, titles, schema, Google Business Profile — and which of them is actually holding you back.",
  },
  {
    title: "Lead capture",
    body: "Where the ask sits on each page, how many taps it takes to reach you from a phone, and what's quietly stopping people who already wanted to call.",
  },
  {
    title: "Speed on a real phone",
    body: "Core Web Vitals, image weight, and how the site behaves on a mid-range Android on a job site. Not how it looks on your laptop on office wifi.",
  },
  {
    title: "The tools you're paying for",
    body: "What's in your stack, what overlaps, what's missing, and which subscription is being paid for a feature another tool already covers.",
  },
  {
    title: "Where the manual work is",
    body: "The places your team re-keys the same information, rebuilds the same report, or works around software you already own. Usually the most expensive thing on the list.",
  },
  {
    title: "A ranked list of fixes",
    body: "Not forty items. The handful that matter, ordered by what they'd return against what they'd take — including the ones you or your current developer can do without me.",
  },
];

const STEPS = [
  {
    step: "STEP 01",
    title: "Send the form",
    body: "Your URL and a sentence about what's frustrating you. That's enough. I reply within 24 hours — it comes from me, not a sales rep.",
  },
  {
    step: "STEP 02",
    title: "I do the review",
    body: "By hand, against your business. Not a tool output with a logo on it. Takes me a couple of hours per site, which is why I only take a few a week.",
  },
  {
    step: "STEP 03",
    title: "You get it in writing",
    body: "Within two business days: what's working, what's costing you, and the ranked list. Yours to keep whether or not we ever speak again.",
  },
  {
    step: "STEP 04",
    title: "A call, only if you want one",
    body: "Thirty minutes to walk through it and ask questions. Optional. If you'd rather just read the document and get on with your day, that's a normal outcome.",
  },
];

const FAQ: FaqItem[] = [
  {
    q: "What's the catch?",
    a: "There isn't one, but here's the honest framing: I do these because a written audit is the best sales pitch I have, and some of the people who read one hire me later. That's the trade. No card, no trial, no drip sequence. If something I build would fix a problem I find, I'll say it once in the document and then leave it alone.",
  },
  {
    q: "What if my site is actually fine?",
    a: "Then the audit says so, and you save the money. It happens often enough that I want it on the page — plenty of sites don't need a rebuild, they need three fixes and a Google Business Profile that's filled in properly. Telling you to spend nothing costs me one project and earns me the referral.",
  },
  {
    q: "Who does it?",
    a: "Me — Kruz Merrill. Every audit is done personally, not outsourced and not run through a scanner and reformatted. That's also why there's a limit on how many I take: it's a couple of hours of real work per site.",
  },
  {
    q: "How long does it take?",
    a: "The written breakdown lands within two business days of you sending the form. If you want the call as well, that's thirty minutes booked whenever suits you. Nothing here needs a week of back-and-forth.",
  },
  {
    q: "What do I need to prepare?",
    a: "Your website URL and one sentence about the business. If you have a specific frustration — \"we don't rank for anything but our own name\" or \"we're entering the same job in three places\" — put that in the message and I'll aim the review at it.",
  },
  {
    q: "Do you only audit Utah businesses?",
    a: "No. I'm in West Jordan and most clients are in Utah, but the work is remote and the audit is delivered by email, so location doesn't matter. Utah businesses get the local search detail; everyone gets the rest.",
  },
];

export const metadata: Metadata = buildMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function FreeAuditPage() {
  return (
    <ScopeProvider>
      <JsonLd
        data={[
          webPageSchema({ name: TITLE, description: DESCRIPTION, path: PATH }),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Free website and operations audit",
            serviceType: "Website audit",
            description:
              "A free written review of a service business's website, local search visibility, lead capture and operations tools, with a ranked list of what to fix first.",
            provider: providerRef(),
            areaServed: { "@type": "State", name: "Utah" },
            url: abs(PATH),
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
          },
          breadcrumbSchema(CRUMBS),
          faqSchema(FAQ),
        ]}
      />

      <PageHero
        eyebrow="FREE AUDIT · WRITTEN · NO OBLIGATION"
        title="I'll tell you what's costing you leads."
        lede="A written review of your website and the tools you run on — what's working, what's leaking, and the short list of things to fix first. Two business days, no charge, no obligation to do anything about it. If the honest answer is that your site is fine, that's what the document says."
        crumbs={CRUMBS}
        primaryCta="CLAIM THE FREE AUDIT →"
        secondaryCta="SEE WHAT'S COVERED"
        secondaryHref="#covered"
      />

      <Section id="covered">
        <SectionLabel number="01">WHAT YOU GET</SectionLabel>
        <SectionH2 className="mt-8 max-w-[20ch]">
          A document, not a sales call.
        </SectionH2>
        <p className="mt-6 max-w-[68ch] text-[15.5px] leading-[1.62] text-neutral-800">
          Six things get looked at, by hand, against your actual business. You
          end up with something you could hand to any developer — including one
          who isn&rsquo;t me.
        </p>

        <GridCells cols="mt-[clamp(28px,4vw,56px)] grid-cols-1 min-[600px]:grid-cols-2 min-[1041px]:grid-cols-3">
          {COVERED.map((item, i) => (
            <Cell key={item.title}>
              <p
                aria-hidden="true"
                className="text-[26px] font-extrabold leading-none tracking-[-.035em] text-neutral-300"
              >
                {String(i + 1).padStart(2, "0")}
              </p>
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

      <Section ground="surface">
        <SectionLabel number="02">HOW LONG IT TAKES</SectionLabel>
        <SectionH2 className="mt-8 max-w-[20ch]">
          Two minutes from you. Two days from me.
        </SectionH2>

        <ul className="mt-[clamp(28px,4vw,56px)] border-t-2 border-t-ink">
          {STEPS.map((step) => (
            <li
              key={step.step}
              className="grid gap-2 border-b-2 border-b-neutral-300 py-5 min-[700px]:grid-cols-[.18fr_.32fr_.5fr] min-[700px]:gap-8"
            >
              <p className="eyebrow text-accent-700">{step.step}</p>
              <h3 className="text-[15px] font-extrabold leading-[1.25] tracking-[-.02em]">
                {step.title}
              </h3>
              <p className="text-[13.5px] leading-[1.55] text-neutral-800">
                {step.body}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <section className="section-pad border-t-2 border-t-ink bg-ink text-bg">
        <div className="site-container grid gap-[clamp(24px,4vw,56px)] min-[900px]:grid-cols-[1.2fr_.8fr]">
          <div>
            <SectionLabel number="03" onDark>
              THE HONEST PART
            </SectionLabel>
            <SectionH2 className="mt-8 max-w-[22ch]">
              It might say: don&rsquo;t spend the money.
            </SectionH2>
            <p className="mt-6 max-w-[62ch] text-[15.5px] leading-[1.62] text-neutral-400">
              A fair number of the sites I look at don&rsquo;t need rebuilding.
              They need a Google Business Profile filled in properly, a phone
              number people can tap, and two pages written for what customers
              actually search. That&rsquo;s a Saturday of your own time, not a
              project — and if that&rsquo;s what I find, that&rsquo;s what the
              document says.
            </p>
            <p className="mt-5 max-w-[62ch] text-[15.5px] leading-[1.62] text-neutral-400">
              The audit is also not a full technical review of custom software
              you already own, and it won&rsquo;t tell you whether your pricing
              is right or your ads are working. It covers the site, the search
              visibility, and where the manual work is hiding. That&rsquo;s the
              honest boundary of what I can see from the outside in two hours.
            </p>
          </div>

          <aside className="h-fit border-2 border-bg bg-accent p-[clamp(18px,2.4vw,34px)] min-[900px]:sticky min-[900px]:top-[96px]">
            <p className="eyebrow opacity-80">WHAT IT COSTS</p>
            <p
              className="mt-4 font-extrabold leading-none tracking-[-.035em]"
              style={{ fontSize: "clamp(30px, 3.4vw, 46px)" }}
            >
              Nothing.
            </p>
            <ul className="mt-6 flex flex-col gap-[10px] border-t-2 border-t-bg/40 pt-6">
              {[
                "No card, no trial, no drip sequence",
                "Written breakdown in 2 business days",
                "Yours to keep, whoever you hire",
                "A 30-minute call only if you want one",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-[13.5px] leading-[1.5]">
                  <span aria-hidden="true">—</span>
                  {item}
                </li>
              ))}
            </ul>
            <Btn href="#contact" inverted block className="mt-6">
              CLAIM THE FREE AUDIT →
            </Btn>
          </aside>
        </div>
      </section>

      <Section>
        <div className="grid gap-[clamp(24px,4vw,56px)] min-[900px]:grid-cols-[.7fr_1.3fr]">
          <div>
            <SectionLabel number="04">STRAIGHT ANSWERS</SectionLabel>
            <SectionH2 size="md" className="mt-8">
              Before you send it.
            </SectionH2>

            <nav className="mt-10 border-t-2 border-t-ink pt-5">
              <p className="eyebrow text-neutral-700">RELATED</p>
              <ul className="mt-4 flex flex-col gap-[10px]">
                {[
                  { href: "/web-design-utah", label: "Website design in Utah" },
                  { href: "/free-checklist", label: "10 signs you've outgrown your software" },
                  { href: "/roi-calculator", label: "What manual work is costing you" },
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
        heading="Send me the URL. I'll do the rest."
        lede="Your website and one sentence about what's frustrating you is enough to start. I reply within 24 hours, and the written breakdown follows within two business days."
        formName="free-audit"
      />
    </ScopeProvider>
  );
}
