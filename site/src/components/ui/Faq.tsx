"use client";

import { useId, useState } from "react";
import { withLinks } from "@/lib/prose";
import type { FaqItem } from "@/content/faq";

/**
 * Height animates via grid-template-rows 0fr → 1fr, not a max-height guess.
 * Answers stay in the DOM whatever the open state, so crawlers read all six.
 * The design shipped without aria wiring; it is added here.
 */
export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0);
  const base = useId();

  return (
    <div className="border-t-2 border-t-ink">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${base}-panel-${i}`;
        const buttonId = `${base}-button-${i}`;

        return (
          <div key={item.q} className="border-b-2 border-b-ink">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-start justify-between gap-6 py-[22px] text-left"
              >
                <span className="text-[clamp(16px,1.6vw,19px)] font-extrabold leading-[1.25] tracking-[-.02em]">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className="relative mt-[6px] block h-[16px] w-[16px] shrink-0"
                >
                  <span className="absolute left-0 top-[7px] block h-[2px] w-[16px] bg-accent" />
                  <span
                    className="absolute left-0 top-[7px] block h-[2px] w-[16px] bg-accent transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(0deg)" : "rotate(90deg)" }}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.16,1,.3,1)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="max-w-[76ch] pb-[22px] text-[14.5px] leading-[1.62] text-neutral-800">
                  {withLinks(item.a)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
