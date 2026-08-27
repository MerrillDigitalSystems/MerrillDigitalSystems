import { StrikeCycler } from "./StrikeCycler";
import { HeroCanvas } from "./HeroCanvas";
import { Btn } from "@/components/ui/Btn";
import { BookCall } from "@/components/BookCall";
import { GrayImage } from "@/components/ui/GrayImage";
import { HERO } from "@/content/home";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <HeroCanvas />

      <div className="section-pad site-container relative">
        {/*
          The ruled row the whole page repeats, used here as the masthead. It
          is also the only place above the H1 that names the service in plain
          words, so it stays real crawlable text rather than an image or a
          decorative flourish.
        */}
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b-2 border-b-ink pb-[10px]">
          <p className="font-display text-[14px] font-medium text-neutral-700">
            Custom software &amp; websites · Utah
          </p>
          <p className="ml-auto flex items-center gap-[9px] font-display text-[14px] font-medium text-accent-700">
            <span aria-hidden="true" className="h-[7px] w-[7px] bg-accent animate-blink" />
            Founder-led · You own the code
          </p>
        </div>

        <h1
          className="mt-[clamp(22px,4vw,44px)] font-display font-extrabold"
          style={{
            fontSize: "clamp(40px, 7.4vw, 116px)",
            letterSpacing: "-.04em",
            lineHeight: 1.02,
          }}
        >
          <span className="block">{HERO.lines.first}</span>
          <span className="block">
            {HERO.lines.second} <StrikeCycler words={HERO.words} />
            {/*
              The line break does the punctuating on screen; a crawler and a
              screen reader get one run-on sentence without this. Reads as
              "…better than spreadsheets. One system. Yours."
            */}
            <span className="sr-only">.</span>
          </span>
          <span className="block">
            {HERO.lines.third}{" "}
            {/*
              Outlined, not filled — the one word on the page that is drawn
              rather than set. -webkit-text-stroke has no standard equivalent
              with this rendering, and every engine the site ships to supports
              it; the fallback if one ever does not is transparent text, so a
              paint-order fill keeps the word readable regardless.
            */}
            <span
              className="[paint-order:stroke_fill]"
              style={{
                WebkitTextStroke: "2px var(--color-ink)",
                color: "transparent",
              }}
            >
              {HERO.lines.outlined}
            </span>
          </span>
        </h1>

        <div className="mt-[clamp(26px,4vw,48px)] grid items-end gap-[clamp(24px,4vw,64px)] min-[900px]:grid-cols-[1.25fr_.75fr]">
          <div>
            <p className="max-w-[52ch] text-[16px] leading-[1.58] text-neutral-800">
              {HERO.lede}
            </p>

            <figure className="mt-7 flex items-center gap-[14px]">
              <GrayImage
                src="/img/kruz-merrill-92.webp"
                alt={HERO.card.photoAlt}
                width={50}
                height={50}
                priority
                className="h-[50px] w-[50px] shrink-0 border-2 border-ink"
                imgClassName="h-full w-full object-cover"
              />
              <figcaption className="max-w-[46ch]">
                <p className="text-[13.5px] italic leading-[1.45] text-neutral-800">
                  &ldquo;{HERO.card.quote}&rdquo;
                </p>
                <p className="eyebrow mt-[5px] text-accent-700">
                  {HERO.card.name} · {HERO.card.role}
                </p>
              </figcaption>
            </figure>
          </div>

          <div className="flex flex-wrap gap-3 min-[900px]:justify-end">
            <BookCall fallbackHref="#contact">{HERO.primaryCta}</BookCall>
            <Btn href="#work" variant="secondary">
              {HERO.secondaryCta}
            </Btn>
          </div>
        </div>
      </div>
    </section>
  );
}
