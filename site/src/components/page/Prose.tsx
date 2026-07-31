import type { ReactNode } from "react";

/**
 * Long-form body type for blog posts, case studies and legal pages. Measure
 * is capped at ~72ch; everything stays flush left, and the rules between
 * sections are 2px like everywhere else.
 */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="prose-mds max-w-[72ch] text-[16px] leading-[1.7] text-neutral-900">
      {children}
    </div>
  );
}
