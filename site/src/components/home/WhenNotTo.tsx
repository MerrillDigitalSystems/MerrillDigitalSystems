import { Section, SectionLabel, SectionH2 } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { WHEN_NOT_TO } from "@/content/home";

/**
 * The highest-trust section on the page — no competitor publishes one. It
 * reads as a weakness to a stakeholder skimming; it is the reason everything
 * above it is believable. Do not soften.
 */
export function WhenNotTo() {
  return (
    <Section id="when-not-to" ground="surface">
      <SectionLabel number="06">WHEN NOT TO HIRE ME</SectionLabel>
      <SectionH2 size="display" className="mt-8 max-w-[24ch]">
        Three times I&rsquo;ll tell you to spend the money elsewhere.
      </SectionH2>
      <p className="mt-6 max-w-[64ch] text-[15px] leading-[1.6] text-neutral-800">
        {WHEN_NOT_TO.lede}
      </p>

      {/*
        Ruled columns, not boxes. Three bordered cards here read as a features
        row — the last thing this section should look like. A single 2px accent
        rule over open copy reads as a list of admissions, which is what it is.
      */}
      <div className="mt-[clamp(26px,3.5vw,44px)] grid gap-[clamp(22px,3vw,40px)] min-[640px]:grid-cols-2 min-[1041px]:grid-cols-3">
        {WHEN_NOT_TO.cases.map((item, i) => (
          <Reveal key={item.eyebrow} index={i} className="border-t-2 border-t-accent pt-[18px]">
            <p className="font-display text-[14px] font-extrabold tracking-[.02em] text-accent-700">
              {item.eyebrow}
            </p>
            <h3 className="mt-[10px] font-display text-[22px] font-bold leading-[1.08] tracking-[-.02em]">
              {item.title}
            </h3>
            <p className="mt-3 text-[14px] leading-[1.5] text-neutral-800">
              {item.body}
            </p>
            <p className="mt-[13px] text-[13.5px] leading-[1.48] text-neutral-800">
              <strong className="font-extrabold text-ink">
                What I&rsquo;ll do instead:
              </strong>{" "}
              {item.instead}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
