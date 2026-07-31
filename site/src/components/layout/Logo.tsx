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
  const width = Math.round(height * 0.66);

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-end justify-center bg-accent ${className}`}
      style={{ height, width, paddingBottom: Math.round(height * 0.13) }}
    >
      <span
        className="font-extrabold leading-none text-bg"
        style={{
          fontSize: Math.round(height * 0.36),
          letterSpacing: "-.06em",
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
