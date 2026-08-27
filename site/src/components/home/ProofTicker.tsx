import { TICKER } from "@/content/home";

/**
 * The proof strip. It moved off the ink band and onto paper between two 2px
 * rules — on ink it read as a footer bolted mid-page, and it interrupted the
 * one long paper run the editorial layout depends on.
 *
 * The second copy of the track exists only so the loop has no seam. It is
 * hidden from assistive tech so the claims are announced once, not twice.
 */
function Run({ hidden = false }: { hidden?: boolean }) {
  return (
    <span
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-[22px] pr-[22px] font-display text-[16px] font-extrabold tracking-[-.01em] whitespace-nowrap text-neutral-700"
    >
      {TICKER.map((item) => (
        <span key={item} className="flex items-center gap-[22px]">
          {item}
          <span aria-hidden="true" className="text-accent">
            ·
          </span>
        </span>
      ))}
    </span>
  );
}

export function ProofTicker() {
  return (
    <div className="overflow-hidden border-y-2 border-y-ink py-[14px]">
      <div className="animate-marquee flex w-max">
        <Run />
        <Run hidden />
      </div>
    </div>
  );
}
