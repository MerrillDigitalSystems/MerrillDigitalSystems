import Link from "next/link";
import { Section, SectionLabel } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { DOORS } from "@/content/home";

export function Doors() {
  return (
    <Section id="doors" ground="surface" borderTop>
      <SectionLabel number="02">TWO DOORS IN</SectionLabel>
      <h2
        className="mt-5 font-extrabold"
        style={{
          fontSize: "clamp(30px, 4.2vw, 64px)",
          letterSpacing: "-.035em",
          lineHeight: 1,
        }}
      >
        Which one are you?
      </h2>

      <div className="mt-[clamp(28px,4vw,56px)] grid gap-[clamp(14px,2vw,26px)] min-[900px]:grid-cols-2">
        {DOORS.map((door, i) => (
          <Reveal key={door.label} index={i}>
            <Link
              href={`/#contact?door=${door.scope}`}
              className="flex h-full flex-col border-2 border-ink bg-bg p-[clamp(18px,2.4vw,34px)] no-underline transition-all duration-200 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-hard-door"
            >
              <p className="eyebrow text-accent-700">{door.label}</p>
              <h3 className="mt-4 text-[clamp(20px,2.2vw,28px)] font-extrabold leading-[1.12] tracking-[-.02em]">
                {door.headline}
              </h3>
              <p className="mt-4 text-[14px] leading-[1.6] text-neutral-800">
                {door.body}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {door.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap items-baseline justify-between gap-3 border-t-2 border-t-ink pt-6">
                <p className="text-[clamp(18px,2vw,24px)] font-extrabold tracking-[-.03em]">
                  {door.price}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[.15em] text-accent-700">
                  {door.timeline}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
