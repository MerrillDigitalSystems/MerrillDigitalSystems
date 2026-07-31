import Link from "next/link";
import { Section, SectionLabel } from "@/components/ui/Section";
import { GridCells, Cell } from "@/components/ui/GridCells";
import { Btn } from "@/components/ui/Btn";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICES, SERVICE_BANDS } from "@/content/home";

export function Services() {
  return (
    <Section id="services" borderTop>
      <SectionLabel number="06">WHAT WE BUILD</SectionLabel>
      <h2
        className="mt-5 font-extrabold"
        style={{
          fontSize: "clamp(30px, 4.2vw, 64px)",
          letterSpacing: "-.035em",
          lineHeight: 1,
        }}
      >
        If it runs your business, it can be built.
      </h2>

      <GridCells cols="mt-[clamp(28px,4vw,56px)] grid-cols-1 min-[900px]:grid-cols-3">
        {SERVICES.map((service, i) => (
          <Cell key={service.n}>
            <Reveal index={i} className="flex h-full flex-col">
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-accent-700">
                {service.n}
              </p>
              <h3 className="mt-3 text-[clamp(19px,2vw,24px)] font-extrabold leading-[1.12] tracking-[-.02em]">
                <Link href={service.href} className="text-ink no-underline hover:text-accent-700">
                  {service.title}
                </Link>
              </h3>
              <p className="mt-3 text-[13.5px] leading-[1.55] text-neutral-800">
                {service.body}
              </p>

              <ul className="mt-6">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="border-t border-t-neutral-300 py-[10px] text-[13.5px] leading-[1.45] last:border-b last:border-b-neutral-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                <p className="text-[clamp(18px,2vw,24px)] font-extrabold tracking-[-.03em]">
                  {service.price}
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[.15em] text-neutral-600">
                  {service.meta}
                </p>
              </div>
            </Reveal>
          </Cell>
        ))}
      </GridCells>

      <div className="mt-[clamp(14px,2vw,26px)] border-2 border-ink bg-surface p-[clamp(18px,2.4vw,34px)]">
        <p className="eyebrow text-accent-700">
          {SERVICE_BANDS.afterLaunch.eyebrow}
        </p>
        <p className="mt-4 max-w-[80ch] text-[15px] leading-[1.62]">
          {SERVICE_BANDS.afterLaunch.body}{" "}
          <Link
            href={SERVICE_BANDS.afterLaunch.href}
            className="font-bold text-accent-700 underline underline-offset-4"
          >
            See what managed services covers
          </Link>
          .
        </p>
      </div>

      <div className="mt-[clamp(14px,2vw,26px)] flex flex-col gap-6 border-2 border-ink bg-ink p-[clamp(18px,2.4vw,34px)] text-bg min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-between">
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
