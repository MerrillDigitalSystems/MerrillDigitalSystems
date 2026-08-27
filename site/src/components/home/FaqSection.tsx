import { Section, SectionLabel, SectionH2 } from "@/components/ui/Section";
import { Faq } from "@/components/ui/Faq";
import { HOME_FAQ } from "@/content/faq";

export function FaqSection() {
  return (
    <Section id="faq">
      <SectionLabel number="09">STRAIGHT ANSWERS</SectionLabel>
      <div className="mt-8 grid items-start gap-[clamp(24px,4vw,56px)] min-[900px]:grid-cols-[.8fr_1.2fr]">
        {/* Sticky only where there is a column to be sticky in. Below 900px the
            heading sits above the list and a sticky offset would pin it over
            the answers. */}
        <SectionH2 size="display" className="min-[900px]:sticky min-[900px]:top-[110px]">
          Things you&rsquo;re probably wondering.
        </SectionH2>
        <Faq items={HOME_FAQ} />
      </div>
    </Section>
  );
}
