import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  // Labels sit at the left padding edge, never centered — a Modernist rule.
  "inline-flex items-center justify-start gap-2 font-extrabold uppercase tracking-[.11em] " +
  "text-[12px] leading-none no-underline cursor-pointer transition-all duration-[180ms] " +
  "border-2 px-[22px] py-[15px] disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-bg border-ink shadow-hard-cta " +
    "hover:bg-accent-600 hover:shadow-hard-cta-pressed hover:translate-x-[3px] hover:translate-y-[3px] " +
    "active:bg-accent-700",
  secondary:
    "bg-transparent text-ink border-ink hover:bg-accent-100 active:bg-accent-200",
  ghost:
    "bg-transparent text-ink border-transparent px-0 py-2 hover:text-accent-700",
};

/** Variant tuned for ink and cobalt grounds, where ink borders disappear. */
const onDark =
  "bg-bg text-ink border-bg hover:bg-accent-100 hover:text-accent-700";

/**
 * Shared so anything that has to be a real <button> for other reasons — the
 * Cal.com trigger, the form submit — is visually identical to a Btn rather
 * than a near-miss copy of its classes.
 */
export function btnClasses({
  variant = "primary",
  inverted = false,
  block = false,
  className = "",
}: {
  variant?: Variant;
  inverted?: boolean;
  block?: boolean;
  className?: string;
} = {}) {
  return [base, inverted ? onDark : variants[variant], block ? "w-full" : "", className]
    .filter(Boolean)
    .join(" ");
}

type Props = {
  variant?: Variant;
  /** Use on ink or cobalt sections where the light-ground variants vanish. */
  inverted?: boolean;
  block?: boolean;
  children: ReactNode;
  className?: string;
};

type AnchorProps = Props & { href: string } & Omit<
    ComponentPropsWithoutRef<"a">,
    keyof Props | "href"
  >;
type ButtonProps = Props & { href?: never } & Omit<
    ComponentPropsWithoutRef<"button">,
    keyof Props
  >;

export function Btn(props: AnchorProps | ButtonProps) {
  const {
    variant = "primary",
    inverted = false,
    block = false,
    className = "",
    children,
    ...rest
  } = props;

  const cls = btnClasses({ variant, inverted, block, className });

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as AnchorProps;
    const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

    if (external) {
      return (
        <a className={cls} href={href} {...anchorRest}>
          {children}
        </a>
      );
    }
    return (
      <Link className={cls} href={href} {...anchorRest}>
        {children}
      </Link>
    );
  }

  const { ...buttonRest } = rest as ButtonProps;
  return (
    <button className={cls} {...buttonRest}>
      {children}
    </button>
  );
}
