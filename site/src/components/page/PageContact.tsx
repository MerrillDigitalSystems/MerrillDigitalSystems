import { ContactForm } from "@/components/forms/ContactForm";
import { BookCall } from "@/components/BookCall";
import { SITE } from "@/lib/site";

/**
 * The closing contact band every inner page ends on. Same cobalt poster as
 * the homepage so the site reads as one surface, with page-specific framing.
 */
export function PageContact({
  heading = "Have a project in mind? Let's scope it out.",
  lede = "A rough idea is enough. Three fields and I have what I need to reply with something useful — within 24 hours, from me, not a sales rep.",
  formName,
}: {
  heading?: string;
  lede?: string;
  formName: string;
}) {
  return (
    <section
      id="contact"
      className="section-pad border-t-2 border-t-ink bg-accent text-bg"
    >
      <div className="site-container grid gap-[clamp(24px,4vw,56px)] min-[900px]:grid-cols-2">
        <div>
          <p className="eyebrow opacity-80">GET IN TOUCH</p>
          <h2
            className="mt-5 font-extrabold"
            style={{
              fontSize: "clamp(30px, 4.6vw, 68px)",
              letterSpacing: "-.04em",
              lineHeight: 0.96,
            }}
          >
            {heading}
          </h2>
          <p className="mt-6 max-w-[52ch] text-[15px] leading-[1.62]">{lede}</p>

          <dl className="mt-10">
            {[
              { label: "PHONE", value: SITE.phone, href: SITE.phoneHref },
              { label: "RESPONSE TIME", value: "Within 24 hours" },
              { label: "BASED", value: "West Jordan, UT · Remote" },
            ].map((row) => (
              <div
                key={row.label}
                className="flex flex-wrap items-baseline justify-between gap-3 border-t-2 border-t-bg/40 py-[14px] last:border-b-2 last:border-b-bg/40"
              >
                <dt className="eyebrow opacity-80">{row.label}</dt>
                <dd className="text-[15px] font-bold">
                  {row.href ? (
                    <a href={row.href} className="text-bg no-underline">
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

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

        <ContactForm formName={formName} />
      </div>
    </section>
  );
}
