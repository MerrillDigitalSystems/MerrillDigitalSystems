"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The pitch, drawn rather than written: thirty scattered wireframe fragments
 * pull themselves into one tidy grid, hold, and fall apart again. Fourteen
 * tools becoming one system, on a twelve second loop.
 *
 * Three things keep it from being decoration that costs something:
 *
 *   1. It never runs on a phone. Below 1024px the hero copy covers most of the
 *      canvas anyway, and a rAF loop behind it is battery the visitor did not
 *      agree to spend. The element is not even mounted there.
 *   2. The scatter comes from a seeded PRNG, not Math.random, so the shape of
 *      the "before" state is the same on every load and in every screenshot.
 *   3. Under prefers-reduced-motion it paints the assembled grid once and
 *      stops — the end state, which is the half that carries the meaning.
 */

const COUNT = 30;
const COLS = 10;
const ROWS = 3;
const CYCLE_S = 12;

/** Park-Miller. Same seed, same scatter, every load. */
function seeded(seed: number) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const WIDE = "(min-width: 1024px)";

export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  // Gates the mount, not just the visibility. Hiding the canvas with CSS would
  // still leave the effect measuring a zero-size box and running a rAF loop
  // that paints nothing — the work has to not exist, not merely be invisible.
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(WIDE);
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!wide) return;
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const css = getComputedStyle(document.documentElement);
    const accent = css.getPropertyValue("--color-accent").trim() || "#1442cf";
    const deep = css.getPropertyValue("--color-accent-700").trim() || "#0b2a86";

    const rand = seeded(42);
    const parts = Array.from({ length: COUNT }, () => ({
      r1: rand(),
      r2: rand(),
      r3: rand(),
      r4: rand(),
    }));

    let w = 0;
    let h = 0;
    let dpr = 1;
    let grid: [number, number, number, number][] = [];

    const layout = () => {
      const cw = w * 0.86;
      const ch = Math.min(h * 0.3, 130 * dpr);
      const gx = (w - cw) / 2;
      const gy = h - ch - 30 * dpr;

      grid = parts.map((_, i) => {
        const c = i % COLS;
        const r = Math.floor(i / COLS);
        return [
          gx + (c + 0.5) * (cw / COLS),
          gy + (r + 0.5) * (ch / ROWS),
          (cw / COLS) * 0.7,
          (ch / ROWS) * 0.55,
        ];
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = Math.round(rect.width * dpr);
      h = canvas.height = Math.round(rect.height * dpr);
      layout();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Fragments shy away from the cursor, and much less so once assembled —
    // a finished system does not scatter when you point at it.
    let mx = -9999;
    let my = -9999;
    const host = canvas.parentElement;
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = (e.clientX - rect.left) * dpr;
      my = (e.clientY - rect.top) * dpr;
    };
    const onLeave = () => {
      mx = my = -9999;
    };
    if (host && !reduced) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
    }

    const draw = (ms: number) => {
      const cycle = (ms / 1000) % CYCLE_S;
      // assemble 0-4s · hold 4-7s · scatter 7-11s · hold apart 11-12s
      let p =
        cycle < 4
          ? easeInOut(cycle / 4)
          : cycle < 7
            ? 1
            : cycle < 11
              ? 1 - easeInOut((cycle - 7) / 4)
              : 0;
      if (reduced) p = 1;

      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1.1 * dpr;

      parts.forEach((part, i) => {
        const [gx, gy, gw, gh] = grid[i];
        const sx = w * (0.03 + part.r1 * 0.94);
        const sy = h * (0.05 + part.r2 * 0.9);
        let x = sx + (gx - sx) * p;
        let y = sy + (gy - sy) * p;

        const dx = x - mx;
        const dy = y - my;
        const dist = Math.hypot(dx, dy);
        const radius = 110 * dpr;
        if (dist < radius) {
          const push = (1 - dist / radius) * (1 - p * 0.8) * 30 * dpr;
          x += (dx / (dist || 1)) * push;
          y += (dy / (dist || 1)) * push;
        }

        const halfW = (gw * (0.7 + part.r4 * 0.5)) / 2;
        const halfH = (gh * (0.7 + part.r3 * 0.5)) / 2;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((part.r3 - 0.5) * 1.5 * (1 - p));
        if (i % 4 === 0) {
          ctx.globalAlpha = 0.06;
          ctx.fillStyle = accent;
          ctx.fillRect(-halfW, -halfH, halfW * 2, halfH * 2);
        }
        ctx.globalAlpha = 0.2;
        ctx.strokeStyle = i % 3 === 0 ? deep : accent;
        ctx.strokeRect(-halfW, -halfH, halfW * 2, halfH * 2);
        ctx.restore();
      });

      ctx.globalAlpha = 1;
    };

    let frame = 0;
    if (reduced) {
      draw(0);
    } else {
      const loop = (ms: number) => {
        draw(ms);
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
    }

    return () => {
      if (frame) cancelAnimationFrame(frame);
      ro.disconnect();
      if (host) {
        host.removeEventListener("pointermove", onMove);
        host.removeEventListener("pointerleave", onLeave);
      }
    };
  }, [wide]);

  if (!wide) return null;

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
