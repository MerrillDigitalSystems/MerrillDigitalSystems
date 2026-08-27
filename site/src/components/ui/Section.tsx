import type { ElementType, ReactNode } from "react";

type Ground = "bg" | "surface" | "ink" | "accent";

const grounds: Record<Ground, string> = {
  bg: "bg-bg text-ink",
  surface: "bg-surface text-ink",
  ink: "bg-ink text-bg",
  accent: "bg-accent text-bg",
};

export function Section({
  id,
  ground = "bg",
  borderTop = false,
  borderBottom = false,
  /**
   * Off for sections with something that must reach the viewport edge — the
   * work carousel's rail. Those supply their own `.site-container` around the
   * parts that should still line up with every other left edge on the page.
   */
  contained = true,
  className = "",
  innerClassName = "",
  children,
}: {
  id?: string;
  ground?: Ground;
  borderTop?: boolean;
  borderBottom?: boolean;
  contained?: boolean;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  const rules = [
    borderTop ? "border-t-2 border-t-ink" : "",
    borderBottom ? "border-b-2 border-b-ink" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      id={id}
      className={`section-pad ${grounds[ground]} ${rules} ${className}`}
    >
      {contained ? (
        <div className={`site-container ${innerClassName}`}>{children}</div>
      ) : (
        children
      )}
    </section>
  );
}

/**
 * The section headline. Three sizes, defined once, so a service page and the
 * homepage set the same type at the same viewport instead of each carrying its
 * own copy of the clamp. `display` is the hero-adjacent size the homepage uses;
 * `lg` opens a normal section; `md` is for a section that shares its row with
 * something else, like the FAQ.
 */
const h2Sizes = {
  display: "clamp(32px, 4.8vw, 62px)",
  lg: "clamp(30px, 4.2vw, 56px)",
  md: "clamp(27px, 3.4vw, 46px)",
} as const;

export function SectionH2({
  as: Tag = "h2",
  size = "lg",
  className = "",
  children,
}: {
  as?: ElementType;
  size?: keyof typeof h2Sizes;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={`font-display font-extrabold ${className}`}
      style={{
        fontSize: h2Sizes[size],
        letterSpacing: "-.035em",
        lineHeight: 1.02,
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * The ruled header that opens every section on every page — an accent ordinal,
 * the section's name, and a 2px rule under both. This one component is what
 * carries the editorial structure across all 44 routes: change it here and the
 * service pages, case studies and blog posts move with the homepage.
 *
 * `aside` puts a second claim at the right end of the rule. Use it where the
 * section has a standing fact worth stating next to its name — the hero's
 * "Founder-led · You own the code" — and leave it off everywhere else, or the
 * rule turns into a second navigation bar.
 */
export function SectionLabel({
  number,
  children,
  aside,
  onDark = false,
  className = "",
}: {
  number: string;
  children: ReactNode;
  aside?: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b-2 pb-[10px] ${
        onDark ? "border-b-bg" : "border-b-ink"
      } ${className}`}
    >
      <span
        className={`font-display text-[15px] font-extrabold leading-none tracking-[-.02em] ${
          onDark ? "text-accent-400" : "text-accent-700"
        }`}
      >
        {number}
      </span>
      <span className={`eyebrow ${onDark ? "text-neutral-400" : "text-neutral-700"}`}>
        {children}
      </span>
      {aside && (
        <span
          className={`eyebrow ml-auto ${onDark ? "text-accent-400" : "text-accent-700"}`}
        >
          {aside}
        </span>
      )}
    </div>
  );
}
