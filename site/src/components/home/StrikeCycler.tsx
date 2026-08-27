"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The rotating word in the hero H1. Each cycle draws a rule through the
 * current word, holds, then swaps the next one in — the sentence crossing out
 * one mess after another.
 *
 * Only word 0 is server-rendered, so the H1 in the HTML a crawler reads is one
 * clean sentence rather than six words run together. Everything after that is
 * post-hydration, which also keeps the LCP element free of work it does not
 * need to paint.
 *
 * Timings are the handoff's: strike over 350ms, word out at +900ms, next word
 * in 200ms later, whole cycle every 2600ms after a 1800ms opening beat.
 */
export function StrikeCycler({ words }: { words: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const [struck, setStruck] = useState(false);
  const [visible, setVisible] = useState(true);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pending = timers.current;
    const at = (fn: () => void, ms: number) => {
      pending.push(window.setTimeout(fn, ms));
    };

    const cycle = () => {
      setStruck(true);
      at(() => setVisible(false), 900);
      at(() => {
        setStruck(false);
        setIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, 1100);
      at(cycle, 2600);
    };

    at(cycle, 1800);
    return () => {
      pending.forEach(clearTimeout);
      pending.length = 0;
    };
  }, [words.length]);

  return (
    <span className="relative inline-block whitespace-nowrap text-accent-700">
      <span
        className="inline-block"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 180ms linear",
        }}
      >
        {words[index]}
      </span>
      <span
        aria-hidden="true"
        // Sits on the word, not under it: a strike-through, drawn left to
        // right. Inset negatively so the rule overshoots both ends the way a
        // pen would.
        className={`pointer-events-none absolute left-[-2%] right-[-2%] top-[54%] h-[.07em] origin-left bg-accent-700 ${
          struck ? "animate-strike" : ""
        }`}
        style={{ transform: struck ? undefined : "scaleX(0)" }}
      />
    </span>
  );
}
