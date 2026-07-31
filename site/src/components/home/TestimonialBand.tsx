import { TESTIMONIAL } from "@/content/home";

export function TestimonialBand() {
  return (
    <section className="section-pad border-t-2 border-t-ink bg-accent text-bg">
      <div className="site-container grid gap-[clamp(24px,4vw,56px)] min-[900px]:grid-cols-[1.4fr_.6fr]">
        <blockquote>
          <p aria-label="Five out of five stars" className="text-[18px] tracking-[.2em]">
            ★★★★★
          </p>
          <p
            className="mt-6 font-bold"
            style={{ fontSize: "clamp(21px, 2.7vw, 42px)", lineHeight: 1.16 }}
          >
            &ldquo;{TESTIMONIAL.quote}&rdquo;
          </p>
          <footer className="mt-8 flex flex-wrap items-center gap-4">
            <span className="border-2 border-bg px-[10px] py-[6px] text-[10px] font-bold uppercase tracking-[.15em]">
              {TESTIMONIAL.badge}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[.15em]">
              {TESTIMONIAL.attribution}
            </span>
          </footer>
        </blockquote>

        <dl className="flex flex-col justify-end">
          {TESTIMONIAL.scores.map((score) => (
            <div
              key={score.label}
              className="flex items-baseline justify-between border-t-2 border-t-bg/40 py-4 last:border-b-2 last:border-b-bg/40"
            >
              <dt className="text-[10px] font-bold uppercase tracking-[.15em]">
                {score.label}
              </dt>
              <dd className="text-[26px] font-extrabold tracking-[-.03em]">
                {score.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
