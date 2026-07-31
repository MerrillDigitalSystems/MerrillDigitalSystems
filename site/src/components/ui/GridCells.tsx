import type { ReactNode } from "react";

type Ground = "bg" | "surface" | "ink" | "accent";

const cellGround: Record<Ground, string> = {
  bg: "bg-bg",
  surface: "bg-surface",
  ink: "bg-ink",
  accent: "bg-accent",
};

/**
 * The modular grid. Rules are drawn by a 2px gap over an ink ground rather
 * than per-cell borders, so the structure survives every reflow: when the
 * grid stacks, the vertical rules become horizontal ones automatically and
 * there is no last-child border to strip.
 */
export function GridCells({
  cols,
  ground = "bg",
  bordered = true,
  className = "",
  children,
}: {
  /** Tailwind grid-template-columns classes per breakpoint, largest last. */
  cols: string;
  ground?: Ground;
  /** Draw the outer 2px frame as well as the internal rules. */
  bordered?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`grid gap-[2px] bg-ink ${
        bordered ? "border-2 border-ink" : ""
      } ${cols} ${className}`}
    >
      {children}
    </div>
  );
}

export function Cell({
  ground = "bg",
  className = "",
  children,
}: {
  ground?: Ground;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`${cellGround[ground]} p-[clamp(18px,2.4vw,34px)] flex flex-col ${className}`}
    >
      {children}
    </div>
  );
}
