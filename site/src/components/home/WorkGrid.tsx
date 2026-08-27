import Link from "next/link";
import type { ReactNode } from "react";
import { Section, SectionLabel, SectionH2 } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "./CountUp";
import { WORK, WORK_STATS, TESTIMONIAL } from "@/content/home";

type WorkItem = (typeof WORK)[number];

function Card({ item, clone }: { item: WorkItem; clone?: boolean }) {
  const inner = (
    <>
      <span className="eyebrow block text-neutral-700">{item.kicker}</span>
      {/*
        A heading in the real track, a plain span in the clone. Duplicating the
        track is what makes the marquee seamless; duplicating six <h3>s is what
        would put every project title into the page outline twice.
      */}
      {clone ? (
        <span className="mt-[10px] block font-display text-[26px] font-extrabold leading-[1.02] tracking-[-.02em]">
          {item.title}
        </span>
      ) : (
        <h3 className="mt-[10px] font-display text-[26px] font-extrabold leading-[1.02] tracking-[-.02em]">
          {item.title}
        </h3>
      )}
      <p className="mt-3 min-h-[80px] text-[13.5px] leading-[1.48] text-neutral-800">
        {item.body}
      </p>
      <span className="mt-auto flex items-baseline justify-between gap-3 border-t border-t-neutral-300 pt-[13px]">
        <span className="text-[12px] font-bold uppercase tracking-[.06em] text-accent-700">
          {item.stat}
        </span>
        <span className="border border-neutral-400 px-[9px] py-[4px] text-[10.5px] font-bold tracking-[.1em] text-neutral-700">
          {item.status}
        </span>
      </span>
    </>
  );

  const shell =
    "flex w-[min(330px,78vw)] shrink-0 flex-col border border-neutral-300 border-t-2 border-t-ink bg-bg p-[26px] no-underline text-ink " +
    "transition-[transform,box-shadow] duration-[350ms]";

  if (item.href && !clone) {
    return (
      <Link
        href={item.href}
        className={`${shell} hover:-translate-y-[6px] hover:shadow-offset-accent-sm`}
      >
        {inner}
      </Link>
    );
  }

  return (
    <article className={shell} aria-hidden={clone || undefined}>
      {inner}
    </article>
  );
}

function Stat({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <div>
      <p className="font-display text-[40px] font-extrabold leading-none tracking-[-.02em] text-accent-700">
        {children}
      </p>
      <p className="eyebrow mt-2 text-neutral-700">{caption}</p>
    </div>
  );
}

export function WorkGrid() {
  return (
    <Section id="work" contained={false} className="overflow-hidden">
      <div className="site-container">
        <SectionLabel number="04">SHIPPED WORK</SectionLabel>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-7">
          <SectionH2 size="display">Real systems. Real businesses.</SectionH2>
          <div className="flex flex-wrap gap-x-[clamp(24px,4vw,56px)] gap-y-6">
            {WORK_STATS.map((stat) => (
              <Stat key={stat.caption} caption={stat.caption}>
                <CountUp to={stat.value} />
                <span className="text-[20px]">{stat.suffix}</span>
              </Stat>
            ))}
          </div>
        </div>
      </div>

      {/*
        The rail marquees under a mouse and becomes a swipeable shelf under a
        finger — see .work-rail in globals.css. Both halves of the track are
        rendered; only the first carries headings and links.
      */}
      <div className="work-rail mt-[clamp(26px,3.5vw,44px)]">
        <div className="work-track">
          {WORK.map((item) => (
            <Card key={item.title} item={item} />
          ))}
          {WORK.map((item) => (
            <Card key={`${item.title}-clone`} item={item} clone />
          ))}
        </div>
      </div>

      <div className="site-container">
        <p className="eyebrow mt-4 text-neutral-700">
          <span className="min-[900px]:hidden">SWIPE TO BROWSE</span>
          <span className="hidden min-[900px]:inline">HOVER TO PAUSE</span>
        </p>

        <Reveal className="mt-[clamp(24px,3vw,40px)]">
          <figure className="grid items-center gap-6 border-2 border-ink bg-surface px-[clamp(20px,3vw,30px)] py-[26px] min-[820px]:grid-cols-[1fr_auto]">
            <blockquote className="font-display text-[clamp(17px,2vw,23px)] font-bold leading-[1.3] tracking-[-.02em]">
              &ldquo;{TESTIMONIAL.quote}&rdquo;
              <footer className="mt-[10px] font-sans text-[11.5px] font-bold uppercase tracking-[.1em] text-neutral-700">
                ★★★★★ · {TESTIMONIAL.badge} · {TESTIMONIAL.attribution}
              </footer>
            </blockquote>
            <div className="flex gap-[22px]">
              {TESTIMONIAL.scores.map((score) => (
                <div key={score.label} className="text-center">
                  <p className="font-display text-[32px] font-extrabold leading-none text-accent-700">
                    {score.value}
                  </p>
                  <p className="eyebrow mt-1 text-neutral-700">{score.label}</p>
                </div>
              ))}
            </div>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
