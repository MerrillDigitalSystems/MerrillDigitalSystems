import { Section, SectionLabel, SectionH2 } from "@/components/ui/Section";
import { RoiCalc } from "./RoiCalc";
import { ROI } from "@/content/home";

export function RoiSection() {
  return (
    <Section id="math">
      <SectionLabel number="02">THE MATH · MOVE THE SLIDERS</SectionLabel>
      <SectionH2 size="display" className="mt-8 max-w-[20ch]">
        What is manual work costing you?
      </SectionH2>
      <p className="mt-6 max-w-[56ch] text-[15px] leading-[1.6] text-neutral-800">
        {ROI.lede}
      </p>

      <RoiCalc />
    </Section>
  );
}
