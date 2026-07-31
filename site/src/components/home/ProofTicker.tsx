import { TICKER } from "@/content/home";

function Run({ hidden = false }: { hidden?: boolean }) {
  return (
    <span
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-[26px] pr-[26px] text-[12px] font-bold uppercase tracking-[.16em] whitespace-nowrap"
    >
      {TICKER.map((item) => (
        <span key={item} className="flex items-center gap-[26px]">
          {item}
          <span aria-hidden="true" className="text-accent-400">
            ◆
          </span>
        </span>
      ))}
    </span>
  );
}

export function ProofTicker() {
  return (
    <div className="overflow-hidden bg-ink py-[15px] text-bg">
      <div className="animate-marquee flex w-max">
        <Run />
        <Run hidden />
      </div>
    </div>
  );
}
