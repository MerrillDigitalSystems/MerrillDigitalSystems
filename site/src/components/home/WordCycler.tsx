"use client";

import { useEffect, useState } from "react";

const STEP_EM = 1.08;

/**
 * The rotating word in the hero H1.
 *
 * The mask MUST be `box-sizing: content-box`. Under border-box the 6px cobalt
 * underline is subtracted from the declared height, the window shrinks below
 * one line, and two words show at once with drift that compounds on every
 * swap. This is a real bug that shipped once — do not "tidy" the box-sizing.
 *
 * Only word 0 is server-rendered, so the H1 a crawler reads is the clean
 * sentence "Replace the mess of spreadsheets with one system." rather than
 * all five words run together. The rest mount after hydration, which also
 * keeps the LCP element free of work it doesn't need.
 */
export function WordCycler({
  words,
  intervalMs = 2300,
}: {
  words: readonly string[];
  intervalMs?: number;
}) {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setMounted(true);
    const id = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      intervalMs
    );
    return () => clearInterval(id);
  }, [words.length, intervalMs]);

  const visible = mounted ? words : words.slice(0, 1);

  return (
    <span
      className="relative inline-block overflow-hidden border-b-[6px] border-b-accent align-bottom"
      style={{ boxSizing: "content-box", height: `${STEP_EM}em` }}
    >
      <span
        className="block will-change-transform"
        style={{
          transform: `translateY(-${index * STEP_EM}em)`,
          transition: mounted
            ? "transform 620ms cubic-bezier(.76,0,.24,1)"
            : undefined,
        }}
      >
        {visible.map((word, i) => (
          <span
            key={word}
            // Only the word currently in the window is exposed; the rest are
            // decoration for the swap animation.
            aria-hidden={i === index ? undefined : "true"}
            className="block text-accent"
            style={{ height: `${STEP_EM}em`, lineHeight: STEP_EM }}
          >
            {word}
          </span>
        ))}
      </span>
    </span>
  );
}
