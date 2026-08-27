import { ContactForm } from "@/components/forms/ContactForm";
import { BookCall } from "@/components/BookCall";
import { SectionLabel } from "@/components/ui/Section";
import { CONTACT } from "@/content/home";
import { SITE } from "@/lib/site";

/**
 * The close, on the same paper as everything above it. It used to sit on a
 * full-bleed cobalt ground, which worked when the page alternated grounds
 * every section; in an unbroken editorial run it read as a different site
 * bolted to the end. The weight now comes from the type and from the form
 * panel standing off the page on its cobalt offset.
 */
export function ContactSection() {
  return (
    <section id="contact" className="section-pad">
      <div className="site-container">
        <SectionLabel number="10">{CONTACT.eyebrow}</SectionLabel>

        <div className="mt-8 grid items-start gap-[clamp(28px,5vw,72px)] min-[900px]:grid-cols-[1fr_1fr]">
          <div>
            <h2
              className="font-display font-extrabold"
              style={{
                fontSize: "clamp(34px, 5vw, 72px)",
                letterSpacing: "-.04em",
                lineHeight: 1,
              }}
            >
              Have a project in mind?{" "}
              <span className="text-accent-700">Let&rsquo;s scope it out.</span>
            </h2>
            <p className="mt-5 max-w-[52ch] text-[15px] leading-[1.6] text-neutral-800">
              {CONTACT.lede}
            </p>

            <dl className="mt-8 border-t border-t-neutral-300">
              {CONTACT.info.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-wrap items-baseline justify-between gap-3 border-b border-b-neutral-300 py-[13px]"
                >
                  <dt className="eyebrow text-neutral-700">{row.label}</dt>
                  <dd className="text-[15px] font-bold">
                    {row.label === "PHONE" ? (
                      <a
                        href={SITE.phoneHref}
                        className="text-accent-700 no-underline hover:underline hover:underline-offset-4"
                      >
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
            <p className="mt-6 max-w-[48ch] text-[14px] leading-[1.5] text-neutral-800">
              <strong className="font-extrabold text-ink">
                Or skip the writing:
              </strong>{" "}
              grab a time directly. Thirty minutes, no pitch deck — you describe
              the mess, I tell you whether it&rsquo;s worth building.
            </p>
            <BookCall variant="secondary" className="mt-5" fallbackHref="#contact">
              BOOK A 30-MINUTE CALL →
            </BookCall>
          </div>

          <div className="shadow-offset-accent">
            <ContactForm formName="homepage" />
          </div>
        </div>
      </div>
    </section>
  );
}
