import type { Metadata } from "next";
import { buildMeta } from "@/lib/meta";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, webPageSchema } from "@/lib/schema";
import { HOME_FAQ } from "@/content/faq";
import { ScopeProvider } from "@/components/scope/ScopeContext";
import { Hero } from "@/components/home/Hero";
import { ServiceIndex } from "@/components/home/ServiceIndex";
import { ProofTicker } from "@/components/home/ProofTicker";
import { Promises } from "@/components/home/Promises";
import { RoiSection } from "@/components/home/RoiSection";
import { CompareTable } from "@/components/home/CompareTable";
import { WorkGrid } from "@/components/home/WorkGrid";
import { Services } from "@/components/home/Services";
import { WhenNotTo } from "@/components/home/WhenNotTo";
import { ProcessSpine } from "@/components/home/ProcessSpine";
import { PunchlessBand } from "@/components/home/PunchlessBand";
import { ScopeSection } from "@/components/home/ScopeSection";
import { FaqSection } from "@/components/home/FaqSection";
import { ContactSection } from "@/components/home/ContactSection";

const TITLE = "Custom Software & Web Design Utah | Merrill Digital Systems";
const DESCRIPTION =
  "Custom software and websites built around how your business actually works — ops hubs, field service platforms, apps, and more. You own the code outright.";

export const metadata: Metadata = buildMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: "/",
});

/**
 * Sections 01-11, in the order the 2026-08 redesign sets them.
 *
 * Two changes worth knowing about if you are comparing against the old page:
 * the two-door "which one are you?" block is gone, replaced by the three-card
 * ServiceIndex directly under the hero — three real internal links beat two
 * on-page anchors, and putting them above the fold spends the page's first
 * crawl budget on the three routes that carry the money queries. And the
 * Clutch testimonial now lives inside the work section rather than as its own
 * band, because proof belongs next to the thing it is proving.
 */
export default function Home() {
  return (
    <ScopeProvider>
      <JsonLd
        data={[
          webPageSchema({ name: TITLE, description: DESCRIPTION, path: "/" }),
          faqSchema(HOME_FAQ),
        ]}
      />
      <Hero />
      <ServiceIndex />
      <ProofTicker />
      <Promises />
      <RoiSection />
      <CompareTable />
      <WorkGrid />
      <Services />
      <WhenNotTo />
      <ProcessSpine />
      <PunchlessBand />
      <ScopeSection />
      <FaqSection />
      <ContactSection />
    </ScopeProvider>
  );
}
