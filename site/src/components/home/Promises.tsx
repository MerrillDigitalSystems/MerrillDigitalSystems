import { Section, SectionLabel, SectionH2 } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PROMISES } from "@/content/home";

/**
 * Five ruled rows, not five cards. The old five-column grid squeezed each
 * promise into about fourteen characters of measure on a laptop and stacked
 * into five identical boxes on a phone. As rows the titles get room to be read
 * at the size they deserve, and the tag chip lands where the eye already is.
 */
export function Promises() {
  return (
    <Section id="standard">
      <SectionLabel number="01">THE STANDARD · FIVE WRITTEN PROMISES</SectionLabel>
      <SectionH2 size="display" className="mt-8 max-w-[22ch]">
        Morals over money. Even when it costs us the invoice.
      </SectionH2>

      <div className="mt-[clamp(24px,3.5vw,44px)]">
        {PROMISES.map((promise, i) => (
          <Reveal
            key={promise.n}
            index={i}
            className="grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-3 border-b border-b-neutral-300 py-5 transition-colors hover:bg-accent-100 min-[820px]:grid-cols-[clamp(48px,7vw,96px)_minmax(240px,1fr)_auto] min-[820px]:gap-x-6"
          >
            {/*
              Decorative ordinal. It does not meet 3:1 and does not need to —
              the title beside it carries every word of the meaning, so this is
              exempt rather than merely failing.
            */}
            <span
              aria-hidden="true"
              className="font-display text-[clamp(28px,3.4vw,44px)] font-extrabold leading-none text-neutral-400"
            >
              {promise.n}
            </span>

            <div>
              <h3 className="font-display text-[clamp(19px,2.2vw,27px)] font-bold leading-[1.05] tracking-[-.02em]">
                {promise.t}
              </h3>
              <p className="mt-2 max-w-[66ch] text-[14.5px] leading-[1.5] text-neutral-800">
                {promise.b}
              </p>
            </div>

            {/* Below 820px the chip drops under the copy rather than fighting
                the title for a 90px column. */}
            <span className="col-span-2 justify-self-start border border-accent-400 px-[11px] py-[6px] text-[11px] font-bold uppercase tracking-[.1em] text-accent-700 min-[820px]:col-span-1 min-[820px]:justify-self-end min-[820px]:whitespace-nowrap">
              {promise.k}
            </span>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
