"use client";

import { useEffect, useRef } from "react";

/**
 * Counts a number up when it scrolls into view.
 *
 * The final value is server-rendered, so the number is correct in the HTML, in
 * a crawler, with JS disabled, and under prefers-reduced-motion. The animation
 * only ever rewinds it and plays it forward — it never supplies the value.
 */
export function CountUp({ to, durationMs = 1400 }: { to: number; durationMs?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    let frame = 0;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(el);

          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min(1, (now - start) / durationMs);
            el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) frame = requestAnimationFrame(step);
          };
          frame = requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [to, durationMs]);

  return <span ref={ref}>{to}</span>;
}
