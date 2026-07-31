import { Btn } from "@/components/ui/Btn";
import { PUNCHLESS } from "@/content/home";

export function PunchlessBand() {
  return (
    <section className="section-pad border-t-2 border-t-ink bg-ink text-bg">
      <div className="site-container grid gap-[clamp(24px,4vw,56px)] min-[900px]:grid-cols-[1.1fr_.9fr]">
        <div>
          <p className="eyebrow text-accent-400">{PUNCHLESS.eyebrow}</p>
          <h2
            className="mt-5 font-extrabold"
            style={{
              fontSize: "clamp(30px, 4.2vw, 64px)",
              letterSpacing: "-.035em",
              lineHeight: 1,
            }}
          >
            {PUNCHLESS.heading}
          </h2>
          <p className="mt-6 max-w-[62ch] text-[15px] leading-[1.62] text-neutral-400">
            <strong className="font-extrabold text-bg">{PUNCHLESS.bodyLead}</strong>
            {PUNCHLESS.bodyRest}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Btn href="/punchless" inverted>
              {PUNCHLESS.ctaPrimary}
            </Btn>
            <Btn
              href={PUNCHLESS.externalUrl}
              variant="secondary"
              inverted
              rel="noopener"
            >
              {PUNCHLESS.ctaSecondary}
            </Btn>
          </div>
        </div>

        <div className="grid gap-[2px] bg-neutral-800">
          {PUNCHLESS.features.map((feature) => (
            <div key={feature.title} className="bg-ink py-5">
              <h3 className="text-[17px] font-extrabold leading-[1.12] tracking-[-.02em]">
                {feature.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-[1.55] text-neutral-400">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
