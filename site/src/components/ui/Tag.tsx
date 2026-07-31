import type { ReactNode } from "react";

type Variant = "accent" | "neutral" | "outline";

const variants: Record<Variant, string> = {
  accent: "bg-accent-100 text-accent-700 border-accent-200",
  neutral: "bg-neutral-200 text-neutral-800 border-neutral-300",
  outline: "bg-transparent text-neutral-700 border-neutral-400",
};

export function Tag({
  variant = "outline",
  children,
  className = "",
}: {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block border px-[9px] py-[5px] text-[10px] font-bold uppercase tracking-[.15em] leading-none ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
