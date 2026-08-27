"use client";

import Link from "next/link";
import { useScopeType } from "@/components/scope/ScopeContext";
import { SERVICE_INDEX } from "@/content/home";

/**
 * The index row directly under the hero: three doors, a price on each, over
 * the same 2px rule the sections use. It replaces the old two-door block —
 * three real destinations beat two on-page anchors, and putting the number on
 * the card is the whole positioning.
 *
 * Clicking one also pre-selects that project type in the scope builder further
 * down, so the range a visitor eventually sees is already the right one.
 */
export function ServiceIndex() {
  const setScopeType = useScopeType();

  return (
    <nav
      aria-label="What we build"
      className="site-container grid border-t-2 border-t-ink min-[560px]:grid-cols-2 min-[900px]:grid-cols-3"
    >
      {SERVICE_INDEX.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setScopeType(item.scope)}
          className="group block px-[clamp(4px,1vw,20px)] py-[26px] no-underline transition-colors hover:bg-accent-100 min-[560px]:px-5"
        >
          <span className="flex items-baseline justify-between gap-3">
            <span className="font-display text-[15px] font-extrabold text-accent-700">
              {item.n}
            </span>
            <span className="text-[12px] font-medium text-neutral-700">
              {item.price}
            </span>
          </span>
          <span className="mt-[10px] block font-display text-[clamp(22px,2.2vw,30px)] font-extrabold leading-[1.05] tracking-[-.025em] text-ink">
            {item.title}{" "}
            <span
              aria-hidden="true"
              className="inline-block transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </span>
          <span className="mt-2 block max-w-[42ch] text-[13.5px] leading-[1.45] text-neutral-800">
            {item.body}
          </span>
        </Link>
      ))}
    </nav>
  );
}
