import { Section, SectionLabel } from "@/components/ui/Section";
import { Faq } from "@/components/ui/Faq";
import { HOME_FAQ } from "@/content/faq";

export function FaqSection() {
  return (
    <Section id="faq" borderTop>
      <div className="grid gap-[clamp(24px,4vw,56px)] min-[900px]:grid-cols-[.7fr_1.3fr]">
        <div>
          <SectionLabel number="10">STRAIGHT ANSWERS</SectionLabel>
          <h2
            className="mt-5 font-extrabold"
            style={{
              fontSize: "clamp(30px, 4.2vw, 56px)",
              letterSpacing: "-.035em",
              lineHeight: 1,
            }}
          >
            Things you&rsquo;re probably wondering.
          </h2>
        </div>
        <Faq items={HOME_FAQ} />
      </div>
    </Section>
  );
}
