import Link from "next/link";

/**
 * The mark: a slab-proportioned cobalt block with the initials knocked out.
 * It merges the two directions Kruz picked — the monogram block and the
 * vertical slab — into one shape rather than setting them side by side, so
 * the lockup stays a single cobalt gesture instead of two competing ones.
 *
 * Letterforms are live text, not paths, so the mark inherits Bricolage with the
 * rest of the page. The raster icons are generated from the same geometry by
 * scripts/generate-icons.mjs.
 */
export function MdBlock({
  height,
  className = "",
}: {
  height: number;
  className?: string;
}) {
  // Slab proportions: noticeably taller than wide, so it reads as a rule
  // standing on end rather than as a square badge.
  const width = Math.round(height * 0.72);
  // 0.355, not 0.34: Bricolage's caps are shorter than Archivo's (0.66em
  // against 0.692em), so matching the old ratio would have shrunk the mark.
  // This keeps the cap height the same fraction of the block it always was.
  const fontSize = Math.round(height * 0.355);

  // Optical centring, solved rather than nudged. Bricolage Grotesque 800
  // measures (canvas measureText): cap height 0.66em, font ascent 0.93em,
  // font descent 0.27em, and no descender on M or D. With line-height:1 the
  // 1.20em content box is taller than the 1.00em line box, so half-leading is
  // negative and the baseline lands at 0.83em from the line-box top — putting
  // the ink's top edge 0.17em below it. Centring that ink in the block:
  //
  //   paddingTop = height/2 - (0.17 + 0.66/2) * fontSize
  //              = height/2 - 0.50 * fontSize
  //
  // Re-derive this constant if the display face ever changes again; it is a
  // property of the font's metrics, not a magic number.
  //
  // floor rather than round: both scales land on a .5, and of the two whole
  // pixels available the one that sits the ink a half-pixel high is the right
  // one. Type centred to true geometric centre reads low.
  //
  // Doing this with align-items:center and a margin does NOT work: flexbox
  // centres the margin box, so a top margin moves the glyphs down by only
  // half its value. That is why two earlier rounds of nudging never closed.
  const paddingTop = Math.floor(height / 2 - 0.5 * fontSize);

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-start justify-center bg-accent ${className}`}
      style={{ height, width, paddingTop }}
    >
      <span
        className="font-display font-extrabold leading-none text-bg"
        style={{
          fontSize,
          letterSpacing: "-.06em",
          // Tracking is applied after the final glyph too, so "MD" carries a
          // sliver of empty space on its right that centring counts as part
          // of the text. Cancelling it puts the letterforms in the middle
          // rather than fractionally left of it.
          marginRight: "-.06em",
        }}
      >
        MD
      </span>
    </span>
  );
}

/**
 * Direction 14 — the ruled wordmark. The identity is typography plus the
 * heavy cobalt rule; the rule is a reusable brand asset that repeats on
 * invoices, proposals and vehicle signage.
 */
export function Logo({
  scale = "nav",
  onDark = false,
  withMark = true,
}: {
  scale?: "nav" | "footer";
  onDark?: boolean;
  withMark?: boolean;
}) {
  const nav = scale === "nav";

  return (
    <Link
      href="/"
      className="inline-flex items-center gap-[11px] no-underline"
      aria-label="Merrill Digital Systems — home"
    >
      {withMark && <MdBlock height={nav ? 38 : 48} />}
      <span className="inline-flex flex-col">
        <span
          className={`font-display font-extrabold leading-none tracking-[-.045em] ${
            nav ? "text-[16px]" : "text-[22px]"
          } ${onDark ? "text-bg" : "text-ink"}`}
        >
          MERRILL DIGITAL
        </span>
        <span
          aria-hidden="true"
          className={`bg-accent ${nav ? "my-[3px] h-[4px]" : "my-[5px] h-[7px]"}`}
        />
        <span
          className={`text-[10px] font-bold leading-none tracking-[.34em] ${
            onDark ? "text-neutral-500" : "text-neutral-700"
          }`}
        >
          SYSTEMS · UTAH
        </span>
      </span>
    </Link>
  );
}
