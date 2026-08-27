import Link from "next/link";
import { Section, SectionLabel, SectionH2 } from "@/components/ui/Section";
import { Btn } from "@/components/ui/Btn";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICES, SERVICE_BANDS } from "@/content/home";

export function Services() {
  return (
    <Section id="services">
      <SectionLabel number="05">WHAT WE BUILD</SectionLabel>
      <SectionH2 size="display" className="mt-8">
        If it runs your business, it can be built.
      </SectionH2>
      <p className="mt-6 max-w-[68ch] text-[15px] leading-[1.6] text-neutral-800">
        Three shapes of work — custom software, custom websites, and the apps
        that sit in between. Every one is scoped, priced and built by the same
        engineer, and every one is yours outright when it ships.
      </p>

      <div className="mt-[clamp(26px,3.5vw,44px)] grid gap-[clamp(18px,3vw,40px)] min-[640px]:grid-cols-2 min-[1041px]:grid-cols-3">
        {SERVICES.map((service, i) => (
          <Reveal
            key={service.n}
            index={i}
            className="flex h-full flex-col border border-neutral-300 border-t-2 border-t-ink bg-panel p-[26px]"
          >
            <p className="font-display text-[15px] font-extrabold text-accent-700">
              {service.n}
            </p>
            <h3 className="mt-[10px] font-display text-[26px] font-extrabold leading-[1.02] tracking-[-.02em]">
              <Link href={service.href} className="text-ink no-underline hover:text-accent-700">
                {service.title}
              </Link>
            </h3>
            <p className="mt-3 text-[14px] leading-[1.5] text-neutral-800">
              {service.body}
            </p>

            <ul className="mt-4 flex flex-1 flex-col gap-[7px]">
              {service.items.map((item) => (
                <li key={item} className="flex gap-[10px] text-[13.5px] leading-[1.4] text-neutral-800">
                  <span aria-hidden="true" className="shrink-0 text-accent-700">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Price and timeline read as one line, the way a quote does — the
                number on the left, what it buys you on the right. */}
            <div className="mt-[22px] flex items-baseline justify-between gap-3 border-t border-t-neutral-300 pt-[13px]">
              <p className="font-display text-[22px] font-extrabold tracking-[-.02em]">
                {service.price}
              </p>
              <p className="text-[10.5px] font-bold uppercase tracking-[.1em] text-neutral-700">
                {service.meta}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-[clamp(22px,3vw,34px)] max-w-[84ch] text-[14.5px] leading-[1.55] text-neutral-800">
        <strong className="font-extrabold text-ink">After launch:</strong>{" "}
        {SERVICE_BANDS.afterLaunch.body}{" "}
        <Link
          href={SERVICE_BANDS.afterLaunch.href}
          className="font-bold text-accent-700 underline underline-offset-4"
        >
          See what managed services covers
        </Link>
        .
      </p>

      <div className="mt-[clamp(22px,3vw,34px)] flex flex-col gap-6 border-2 border-ink bg-ink p-[clamp(18px,2.4vw,34px)] text-bg min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-between">
        <div>
          <p className="eyebrow text-accent-400">
            {SERVICE_BANDS.notOnList.eyebrow}
          </p>
          <h3 className="mt-3 text-[clamp(20px,2.4vw,30px)] font-extrabold leading-[1.12] tracking-[-.025em]">
            {SERVICE_BANDS.notOnList.heading}
          </h3>
          <p className="mt-3 max-w-[62ch] text-[14px] leading-[1.6] text-neutral-400">
            {SERVICE_BANDS.notOnList.body}
          </p>
        </div>
        <Btn href="#contact" inverted className="shrink-0">
          {SERVICE_BANDS.notOnList.cta}
        </Btn>
      </div>
    </Section>
  );
}
