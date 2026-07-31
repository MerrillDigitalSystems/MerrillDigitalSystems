import { WordCycler } from "./WordCycler";
import { Btn } from "@/components/ui/Btn";
import { BookCall } from "@/components/BookCall";
import { GrayImage } from "@/components/ui/GrayImage";
import { HERO } from "@/content/home";

/**
 * Masked H1 lines. The -.045em tracking makes the final glyph's edge clip
 * against the mask, so each line pads and then negatively margins itself back.
 */
function ClipLine({
  children,
  delayMs,
}: {
  children: React.ReactNode;
  delayMs: number;
}) {
  return (
    <span className="block overflow-hidden">
      <span
        className="animate-clip-up block"
        style={{
          animationDelay: `${delayMs}ms`,
          paddingRight: ".12em",
          marginRight: "-.12em",
          paddingBottom: ".06em",
          marginBottom: "-.06em",
        }}
      >
        {children}
      </span>
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b-2 border-b-divider">
      {/* Decorative six-column grid, the structure showing through. */}
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
        <p className="animate-rise eyebrow flex flex-wrap items-center gap-3 text-neutral-700">
          <span aria-hidden="true" className="h-[8px] w-[8px] bg-accent animate-blink" />
          <span>{HERO.status[0]}</span>
          <span aria-hidden="true" className="h-[2px] w-[clamp(20px,4vw,70px)] bg-neutral-400" />
          <span>{HERO.status[1]}</span>
          <span aria-hidden="true" className="h-[2px] w-[clamp(20px,4vw,70px)] bg-neutral-400" />
          <span className="text-ink">{HERO.status[2]}</span>
        </p>

        <h1
          className="mt-[clamp(20px,3vw,38px)] font-extrabold"
          style={{
            fontSize: "clamp(40px, 7.4vw, 116px)",
            letterSpacing: "-.045em",
            lineHeight: 0.98,
          }}
        >
          <ClipLine delayMs={0}>{HERO.lines.first}</ClipLine>
          <ClipLine delayMs={100}>
            {HERO.lines.second}{" "}
            <WordCycler words={HERO.words} />
          </ClipLine>
          <ClipLine delayMs={200}>{HERO.lines.third}</ClipLine>
        </h1>

        <div className="mt-[clamp(28px,4vw,56px)] grid items-end gap-[clamp(24px,4vw,64px)] min-[900px]:grid-cols-[1.15fr_.85fr]">
          <div>
            <p className="max-w-[52ch] text-[15.5px] leading-[1.62] text-neutral-800">
              {HERO.lede}
            </p>
            <div className="mt-[clamp(22px,3vw,34px)] flex flex-wrap gap-4">
              <BookCall fallbackHref="#contact">{HERO.primaryCta}</BookCall>
              <Btn href="#work" variant="secondary">
                {HERO.secondaryCta}
              </Btn>
            </div>
          </div>

          <aside className="border-2 border-ink bg-surface p-[clamp(18px,2.4vw,28px)]">
            <div className="flex items-center gap-3">
              <GrayImage
                src="/kruz-merrill.png"
                alt={HERO.card.photoAlt}
                width={46}
                height={46}
                priority
                className="h-[46px] w-[46px] shrink-0"
                imgClassName="h-full w-full object-cover"
              />
              <div>
                <p className="text-[15px] font-extrabold leading-none tracking-[-.02em]">
                  {HERO.card.name}
                </p>
                <p className="eyebrow mt-[6px] text-neutral-700">{HERO.card.role}</p>
              </div>
            </div>

            <p className="mt-5 border-t-2 border-t-ink pt-5 text-[14px] leading-[1.55]">
              &ldquo;{HERO.card.quote}&rdquo;
            </p>

            <div className="mt-5 grid grid-cols-2 gap-[2px] bg-ink">
              {HERO.card.stats.map((stat) => (
                <div key={stat.caption} className="bg-surface pt-4">
                  <p
                    className={`font-extrabold leading-none tracking-[-.035em] ${
                      stat.accent ? "text-accent" : "text-ink"
                    }`}
                    style={{ fontSize: "clamp(24px, 3.4vw, 46px)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="eyebrow mt-2 text-neutral-700">{stat.caption}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
