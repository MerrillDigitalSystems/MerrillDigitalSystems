"use client";

import { useEffect, useRef } from "react";
import { Section, SectionLabel, SectionH2 } from "@/components/ui/Section";
import { PROCESS } from "@/content/home";

export function ProcessSpine() {
  const rowRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    const fill = fillRef.current;
    if (!row || !fill) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = row.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, (window.innerHeight * 0.8 - rect.top) / rect.height)
      );
      fill.style.width = `${progress * 100}%`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <Section id="process">
      <SectionLabel number="07">HOW IT GOES</SectionLabel>
      <SectionH2 size="display" className="mt-8">
        Idea to shipped, without surprises.
      </SectionH2>

      <ol
        ref={rowRef}
        className="relative mt-[clamp(26px,3.5vw,44px)] grid gap-[clamp(24px,3vw,40px)] min-[600px]:grid-cols-2 min-[1041px]:grid-cols-4"
      >
        {/*
          The spine fills as you scroll the row — the one piece of motion on
          the page tied to reading position rather than to a clock. It only
          reads as a spine when the four steps sit in one row, so below 900px
          each step keeps its own hairline instead.
        */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-[20px] hidden h-[2px] bg-neutral-300 min-[1041px]:block"
        >
          <div
            ref={fillRef}
            className="h-full w-0 bg-accent transition-[width] duration-[260ms] ease-linear"
          />
        </div>

        {PROCESS.map((step, i) => (
          <li key={step.step} className="relative">
            <span className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="bg-bg pr-1 font-display text-[40px] font-extrabold leading-none tracking-[-.02em] text-accent"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden="true"
                className="h-[1px] flex-1 bg-neutral-300 min-[1041px]:hidden"
              />
            </span>
            <h3 className="mt-[13px] font-display text-[20px] font-bold leading-[1.1] tracking-[-.02em]">
              {step.title}
            </h3>
            <p className="mt-2 max-w-[36ch] text-[13.5px] leading-[1.48] text-neutral-800">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
