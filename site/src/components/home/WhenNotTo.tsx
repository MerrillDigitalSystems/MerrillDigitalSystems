import { Section, SectionLabel } from "@/components/ui/Section";
import { GridCells, Cell } from "@/components/ui/GridCells";
import { Reveal } from "@/components/ui/Reveal";
import { WHEN_NOT_TO } from "@/content/home";

/**
 * The highest-trust section on the page — no competitor publishes one. It
 * reads as a weakness to a stakeholder skimming; it is the reason everything
 * above it is believable. Do not soften.
 */
export function WhenNotTo() {
  return (
    <Section id="when-not-to" ground="surface" borderTop>
      <SectionLabel number="07">WHEN NOT TO HIRE ME</SectionLabel>
      <h2
        className="mt-5 max-w-[22ch] font-extrabold"
        style={{
          fontSize: "clamp(30px, 4.2vw, 64px)",
          letterSpacing: "-.035em",
          lineHeight: 1,
        }}
      >
        Three times I&rsquo;ll tell you to spend the money elsewhere.
      </h2>
      <p className="mt-6 max-w-[68ch] text-[15px] leading-[1.62] text-neutral-800">
        {WHEN_NOT_TO.lede}
      </p>

      <GridCells cols="mt-[clamp(28px,4vw,56px)] grid-cols-1 min-[900px]:grid-cols-3">
        {WHEN_NOT_TO.cases.map((item, i) => (
          <Cell key={item.eyebrow}>
            <Reveal index={i} className="flex h-full flex-col">
              <p className="eyebrow text-accent-700">{item.eyebrow}</p>
              <h3 className="mt-3 text-[19px] font-extrabold leading-[1.12] tracking-[-.02em]">
                {item.title}
              </h3>
              <p className="mt-3 text-[13.5px] leading-[1.55] text-neutral-800">
                {item.body}
              </p>
              <p className="mt-auto border-t border-t-neutral-300 pt-5 text-[13.5px] leading-[1.5]">
                <strong className="font-extrabold">What I&rsquo;ll do instead:</strong>{" "}
                {item.instead}
              </p>
            </Reveal>
          </Cell>
        ))}
      </GridCells>
    </Section>
  );
}
