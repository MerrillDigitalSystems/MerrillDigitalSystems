"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Scroll reveal. The element renders VISIBLE from the server and is only
 * hidden once JS has hydrated — if scripts fail or a crawler reads the HTML,
 * the content is still there. Never wrap anything above the fold in this:
 * the hero H1 is the LCP element and must paint immediately.
 */
export function Reveal({
  as: Tag = "div",
  index = 0,
  className = "",
  children,
}: {
  as?: ElementType;
  /** Position in its row — drives the 90ms stagger. */
  index?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") return;

    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition =
      "opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1)";
    el.style.transitionDelay = `${(index % 3) * 90}ms`;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          el.style.opacity = "1";
          el.style.transform = "none";
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [index]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
