import type { Metadata } from "next";
import { buildMeta } from "@/lib/meta";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, webPageSchema } from "@/lib/schema";
import { HOME_FAQ } from "@/content/faq";
import { ScopeProvider } from "@/components/scope/ScopeContext";
import { Hero } from "@/components/home/Hero";
import { ProofTicker } from "@/components/home/ProofTicker";
import { Promises } from "@/components/home/Promises";
import { Doors } from "@/components/home/Doors";
import { RoiSection } from "@/components/home/RoiSection";
import { CompareTable } from "@/components/home/CompareTable";
import { WorkGrid } from "@/components/home/WorkGrid";
import { TestimonialBand } from "@/components/home/TestimonialBand";
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
      <ProofTicker />
      <Promises />
      <Doors />
      <RoiSection />
      <CompareTable />
      <WorkGrid />
      <TestimonialBand />
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
