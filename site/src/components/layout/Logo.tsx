import Link from "next/link";

/**
 * The mark: a slab-proportioned cobalt block with the initials knocked out.
 * It merges the two directions Kruz picked — the monogram block and the
 * vertical slab — into one shape rather than setting them side by side, so
 * the lockup stays a single cobalt gesture instead of two competing ones.
 *
 * Letterforms are live text, not paths, so the mark inherits Archivo with the
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
  const fontSize = Math.round(height * 0.34);

  // Optical centring, solved rather than nudged. Archivo 800 caps measure
  // (canvas measureText): cap height 0.692em, font ascent 0.846em, font
  // descent 0.231em, zero descender on M and D. With line-height:1 the line
  // box is shorter than ascent+descent, so the baseline lands at 0.808em from
  // the line-box top. Setting the ink's top edge to (height - capHeight)/2:
  //
  //   paddingTop = round(height/2 - 0.42 * fontSize)
  //
  // The 0.42 is solved from measured ink positions rather than derived from
  // metrics alone — the browser rounds line-box placement, so the pure
  // metric answer (0.461) still left it a pixel high. Rounding the result to
  // a whole pixel lands both scales within 0.01px of centre.
  //
  // Doing this with align-items:center and a margin does NOT work: flexbox
  // centres the margin box, so a top margin moves the glyphs down by only
  // half its value. That is why two earlier rounds of nudging never closed.
  const paddingTop = Math.round(height / 2 - 0.42 * fontSize);

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-start justify-center bg-accent ${className}`}
      style={{ height, width, paddingTop }}
    >
      <span
        className="font-extrabold leading-none text-bg"
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
          className={`font-extrabold leading-none tracking-[-.045em] ${
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
