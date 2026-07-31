import type { ReactNode } from "react";

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
  className = "",
  innerClassName = "",
  children,
}: {
  id?: string;
  ground?: Ground;
  borderTop?: boolean;
  borderBottom?: boolean;
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
      <div className={`site-container ${innerClassName}`}>{children}</div>
    </section>
  );
}

/**
 * The numbered eyebrow that opens most sections: "01 — THE STANDARD".
 */
export function SectionLabel({
  number,
  children,
  onDark = false,
  className = "",
}: {
  number: string;
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`eyebrow flex items-center gap-3 ${
        onDark ? "text-neutral-400" : "text-neutral-600"
      } ${className}`}
    >
      <span className={onDark ? "text-accent-400" : "text-accent-700"}>
        {number}
      </span>
      <span aria-hidden="true" className="h-[2px] w-[34px] bg-current opacity-40" />
      <span>{children}</span>
    </p>
  );
}
