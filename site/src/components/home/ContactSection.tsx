import { ContactForm } from "@/components/forms/ContactForm";
import { BookCall } from "@/components/BookCall";
import { CONTACT } from "@/content/home";
import { SITE } from "@/lib/site";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="section-pad border-t-2 border-t-ink bg-accent text-bg"
    >
      <div className="site-container grid gap-[clamp(24px,4vw,56px)] min-[900px]:grid-cols-[1fr_1fr]">
        <div>
          <p className="eyebrow opacity-80">{CONTACT.eyebrow}</p>
          <h2
            className="mt-5 font-extrabold"
            style={{
              fontSize: "clamp(34px, 5.4vw, 86px)",
              letterSpacing: "-.042em",
              lineHeight: 0.94,
            }}
          >
            {CONTACT.heading}
          </h2>
          <p className="mt-6 max-w-[52ch] text-[15px] leading-[1.62]">
            {CONTACT.lede}
          </p>

          <dl className="mt-10">
            {CONTACT.info.map((row) => (
              <div
                key={row.label}
                className="flex flex-wrap items-baseline justify-between gap-3 border-t-2 border-t-bg/40 py-[14px] last:border-b-2 last:border-b-bg/40"
              >
                <dt className="eyebrow opacity-80">{row.label}</dt>
                <dd className="text-[15px] font-bold">
                  {row.label === "PHONE" ? (
                    <a href={SITE.phoneHref} className="text-bg no-underline">
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          {/* Some people would rather pick a slot than write a paragraph. */}
          <div className="mt-10 border-t-2 border-t-bg/40 pt-8">
            <p className="eyebrow opacity-80">OR SKIP THE WRITING</p>
            <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.62]">
              Grab a time directly. Thirty minutes, no pitch deck — you describe
              the mess, I tell you whether it&rsquo;s worth building.
            </p>
            <BookCall inverted className="mt-6" fallbackHref="#contact">
              BOOK A 30-MINUTE CALL →
            </BookCall>
          </div>
        </div>

        <ContactForm formName="homepage" />
      </div>
    </section>
  );
}
