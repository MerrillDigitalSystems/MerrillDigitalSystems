import { Section, SectionLabel } from "@/components/ui/Section";
import { GridCells, Cell } from "@/components/ui/GridCells";
import { Reveal } from "@/components/ui/Reveal";
import { PROMISES } from "@/content/home";

export function Promises() {
  return (
    <Section id="standard" borderTop>
      <SectionLabel number="01">THE STANDARD · FIVE WRITTEN PROMISES</SectionLabel>
      <h2
        className="mt-5 max-w-[18ch] font-extrabold"
        style={{
          fontSize: "clamp(30px, 4.2vw, 64px)",
          letterSpacing: "-.035em",
          lineHeight: 1,
        }}
      >
        Morals over money. Even when it costs us the invoice.
      </h2>

      <GridCells
        cols="mt-[clamp(28px,4vw,56px)] grid-cols-1 min-[600px]:grid-cols-2 min-[820px]:grid-cols-3 min-[1200px]:grid-cols-5"
      >
        {PROMISES.map((promise, i) => (
          <Cell key={promise.n} className="group transition-colors hover:bg-accent-100">
            <Reveal index={i} className="flex h-full flex-col">
              {/*
                Decorative ordinal. The handoff specifies neutral-300 here and
                it does not meet 3:1 — which is fine, because it carries no
                information the title doesn't. Marked decorative rather than
                darkened, so it's exempt rather than merely failing.
              */}
              <p
                aria-hidden="true"
                className="text-[34px] font-extrabold leading-none tracking-[-.035em] text-neutral-300"
              >
                {promise.n}
              </p>
              <h3 className="mt-4 text-[17px] font-extrabold leading-[1.12] tracking-[-.02em]">
                {promise.t}
              </h3>
              <p className="mt-3 text-[13.5px] leading-[1.55] text-neutral-800">
                {promise.b}
              </p>
              <p className="mt-auto pt-6 text-[10px] font-bold uppercase tracking-[.15em] text-accent-700">
                {promise.k}
              </p>
            </Reveal>
          </Cell>
        ))}
      </GridCells>
    </Section>
  );
}
