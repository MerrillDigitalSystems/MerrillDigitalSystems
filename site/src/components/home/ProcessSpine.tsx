"use client";

import { useEffect, useRef } from "react";
import { Section, SectionLabel } from "@/components/ui/Section";
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
    <Section id="process" ground="surface" borderTop>
      <SectionLabel number="08">HOW IT GOES</SectionLabel>
      <h2
        className="mt-5 font-extrabold"
        style={{
          fontSize: "clamp(30px, 4.2vw, 64px)",
          letterSpacing: "-.035em",
          lineHeight: 1,
        }}
      >
        Idea to shipped, without surprises.
      </h2>

      <ol
        ref={rowRef}
        className="relative mt-[clamp(28px,4vw,56px)] grid gap-[clamp(24px,3vw,40px)] min-[600px]:grid-cols-2 min-[1041px]:grid-cols-4"
      >
        {/* The spine only reads as a spine when the steps sit in one row. */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-[11px] hidden h-[2px] bg-neutral-300 min-[900px]:block"
        >
          <div ref={fillRef} className="h-full w-0 bg-accent transition-[width] duration-[260ms] ease-linear" />
        </div>

        {PROCESS.map((step) => (
          <li key={step.step} className="relative">
            <span aria-hidden="true" className="block h-[24px] w-[24px] bg-accent" />
            <p className="eyebrow mt-4 text-neutral-600">{step.step}</p>
            <h3 className="mt-2 text-[19px] font-extrabold leading-[1.12] tracking-[-.02em]">
              {step.title}
            </h3>
            <p className="mt-3 max-w-[36ch] text-[13.5px] leading-[1.55] text-neutral-800">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
