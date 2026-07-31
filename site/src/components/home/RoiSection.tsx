import { Section, SectionLabel } from "@/components/ui/Section";
import { RoiCalc } from "./RoiCalc";
import { ROI } from "@/content/home";

export function RoiSection() {
  return (
    <Section id="math" ground="surface" borderTop>
      <SectionLabel number="03">THE MATH · MOVE THE SLIDERS</SectionLabel>
      <h2
        className="mt-5 font-extrabold"
        style={{
          fontSize: "clamp(30px, 4.2vw, 64px)",
          letterSpacing: "-.035em",
          lineHeight: 1,
        }}
      >
        What is manual work costing you?
      </h2>
      <p className="mt-6 max-w-[68ch] text-[15px] leading-[1.62] text-neutral-800">
        {ROI.lede}
      </p>

      <RoiCalc />
    </Section>
  );
}
