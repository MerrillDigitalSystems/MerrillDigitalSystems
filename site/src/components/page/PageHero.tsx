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
    <section className="relative overflow-hidden">
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

        {/* The same ruled row the homepage opens with, so an inner page reads
            as the next spread of the same publication rather than a different
            template. The standing claim on the right is the one fact every
            page on the site can make. */}
        <div className="mt-7 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b-2 border-b-ink pb-[10px]">
          <p className="eyebrow text-neutral-700">{eyebrow}</p>
          <p className="ml-auto font-display text-[13.5px] font-medium text-accent-700">
            Founder-led · You own the code
          </p>
        </div>

        <h1
          className="mt-[clamp(20px,3vw,36px)] max-w-[20ch] font-display font-extrabold"
          style={{
            fontSize: "clamp(36px, 5.8vw, 84px)",
            letterSpacing: "-.04em",
            lineHeight: 1,
          }}
        >
          {title}
        </h1>

        <p className="mt-7 max-w-[62ch] text-[16px] leading-[1.58] text-neutral-800">
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
