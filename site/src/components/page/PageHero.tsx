import Link from "next/link";
import { Btn } from "@/components/ui/Btn";

export type Crumb = { name: string; path: string };

/**
 * The inner-page counterpart to the homepage hero: same six-column grid and
 * flush-left type, without the word cycler or the credibility card.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  crumbs,
  primaryCta = "BOOK A FREE DISCOVERY CALL →",
  /** Defaults to the on-page contact band; product pages point elsewhere. */
  primaryHref = "#contact",
  secondaryCta,
  secondaryHref,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  crumbs: Crumb[];
  primaryCta?: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b-2 border-b-divider">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mx-auto max-w-[1360px] opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--color-neutral-300) 1px, transparent 1px)",
          backgroundSize: "calc(100% / 6) 100%",
        }}
      />

      <div className="section-pad site-container relative">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 text-[11px] font-bold uppercase tracking-[.15em] text-neutral-700">
            {crumbs.map((crumb, i) => (
              <li key={crumb.path} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-ink">
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.path}
                    className="inline-block py-[7px] text-neutral-700 no-underline hover:text-accent-700"
                  >
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <p className="eyebrow mt-8 flex items-center gap-3 text-neutral-700">
          <span aria-hidden="true" className="h-[8px] w-[8px] bg-accent" />
          {eyebrow}
        </p>

        <h1
          className="mt-5 max-w-[20ch] font-extrabold"
          style={{
            fontSize: "clamp(34px, 5.6vw, 82px)",
            letterSpacing: "-.042em",
            lineHeight: 0.98,
          }}
        >
          {title}
        </h1>

        <p className="mt-8 max-w-[62ch] text-[15.5px] leading-[1.62] text-neutral-800">
          {lede}
        </p>

        <div className="mt-[clamp(22px,3vw,34px)] flex flex-wrap gap-4">
          <Btn href={primaryHref}>{primaryCta}</Btn>
          {secondaryCta && secondaryHref && (
            <Btn href={secondaryHref} variant="secondary">
              {secondaryCta}
            </Btn>
          )}
        </div>
      </div>
    </section>
  );
}
