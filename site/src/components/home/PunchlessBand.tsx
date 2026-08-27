import Link from "next/link";
import { PUNCHLESS } from "@/content/home";

/**
 * The one cross-brand moment on the page, and the only colour break in an
 * otherwise unbroken paper run. Punchless has its own identity — warm paper,
 * oxblood red, a stamped corner — so the card is set in that palette rather
 * than this site's cobalt. Two brands touching once, deliberately, is a
 * different thing from a site that cannot hold a palette.
 *
 * The colours are literals, not tokens, for exactly that reason: they belong
 * to the other brand and must not drift when this one is retuned.
 */
const PAPER = "#fffdf7";
const PAPER_INK = "#1a1712";
const PAPER_BODY = "#4a443a";
const PAPER_RULE = "#d8d2c4";
const RED = "#b3372a";

export function PunchlessBand() {
  return (
    <section className="site-container mt-[clamp(40px,7vw,90px)]">
      <div
        className="shadow-offset-accent relative grid items-center gap-[clamp(26px,5vw,64px)] border p-[clamp(26px,4.5vw,56px)] min-[900px]:grid-cols-[1.05fr_.95fr]"
        style={{ background: PAPER, color: PAPER_INK, borderColor: PAPER_RULE }}
      >
        <span
          aria-hidden="true"
          className="absolute right-[clamp(14px,2.5vw,26px)] top-[clamp(14px,2.5vw,26px)] hidden border-[2.5px] px-3 py-[7px] text-[11px] font-semibold tracking-[.14em] min-[560px]:block"
          style={{ borderColor: RED, color: RED, transform: "rotate(6deg)" }}
        >
          OUR OWN PRODUCT
        </span>

        <div>
          <p
            className="text-[11.5px] font-semibold uppercase tracking-[.14em]"
            style={{ color: RED }}
          >
            {PUNCHLESS.eyebrow}
          </p>
          <h2
            className="mt-[14px] font-display font-extrabold"
            style={{
              fontSize: "clamp(28px, 3.8vw, 48px)",
              lineHeight: 1.02,
              letterSpacing: "-.03em",
            }}
          >
            {PUNCHLESS.heading}
          </h2>
          <p
            className="mt-4 max-w-[56ch] text-[14.5px] leading-[1.52]"
            style={{ color: PAPER_BODY }}
          >
            <strong className="font-extrabold" style={{ color: PAPER_INK }}>
              {PUNCHLESS.bodyLead}
            </strong>
            {PUNCHLESS.bodyRest}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {/* .pl-cta rather than <Btn> — see the note in globals.css. */}
            <Link href="/punchless" className="pl-cta">
              {PUNCHLESS.ctaPrimary}
            </Link>
            <a href={PUNCHLESS.externalUrl} rel="noopener" className="pl-cta-ghost">
              {PUNCHLESS.ctaSecondary}
            </a>
          </div>
        </div>

        <div className="grid border" style={{ borderColor: PAPER_RULE }}>
          {PUNCHLESS.features.map((feature, i) => (
            <div
              key={feature.title}
              className="px-5 py-4"
              style={
                i < PUNCHLESS.features.length - 1
                  ? { borderBottom: `1px dashed ${PAPER_RULE}` }
                  : undefined
              }
            >
              <h3 className="font-display text-[18px] font-bold tracking-[-.01em]">
                {feature.title}
              </h3>
              <p className="mt-[5px] text-[13px] leading-[1.45]" style={{ color: PAPER_BODY }}>
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
