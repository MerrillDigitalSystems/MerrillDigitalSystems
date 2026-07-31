import type { Metadata } from "next";
import Link from "next/link";
import { Btn } from "@/components/ui/Btn";
import { buildMeta } from "@/lib/meta";

export const metadata: Metadata = buildMeta({
  title: "Page not found",
  description: "That page isn't here. Here's where everything else lives.",
  path: "/404",
  noIndex: true,
});

const ELSEWHERE = [
  { href: "/pricing", label: "Pricing", note: "Real numbers, published" },
  { href: "/web-design-utah", label: "Website design", note: "$3,000 – $9,000" },
  { href: "/operations-software", label: "Operations software", note: "From $25,000" },
  { href: "/blog", label: "Blog", note: "Straight answers, at length" },
];

export default function NotFound() {
  return (
    <>
      <section className="section-pad border-b-2 border-b-ink">
        <div className="site-container">
          <p className="eyebrow flex items-center gap-3 text-neutral-600">
            <span aria-hidden="true" className="h-[8px] w-[8px] bg-accent" />
            ERROR 404
          </p>
          <h1
            className="mt-5 max-w-[16ch] font-extrabold"
            style={{
              fontSize: "clamp(40px, 7vw, 104px)",
              letterSpacing: "-.045em",
              lineHeight: 0.96,
            }}
          >
            That page isn&rsquo;t here.
          </h1>
          <p className="mt-8 max-w-[56ch] text-[15.5px] leading-[1.62] text-neutral-800">
            Either it moved in the 2026 rebuild or the link was wrong to begin
            with. Nothing was deleted — so if you followed a link from
            somewhere, tell me where and I&rsquo;ll fix it.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Btn href="/">BACK TO THE HOMEPAGE →</Btn>
            <Btn href="/#contact" variant="secondary">
              TELL ME WHAT BROKE
            </Btn>
          </div>
        </div>
      </section>

      <section className="section-pad bg-surface">
        <div className="site-container">
          <p className="eyebrow text-neutral-600">TRY ONE OF THESE</p>
          <ul className="mt-6 border-t-2 border-t-ink">
            {ELSEWHERE.map((item) => (
              <li key={item.href} className="border-b-2 border-b-neutral-300">
                <Link
                  href={item.href}
                  className="flex flex-wrap items-baseline justify-between gap-3 py-5 no-underline"
                >
                  <span className="text-[clamp(18px,2vw,24px)] font-extrabold tracking-[-.02em] text-ink">
                    {item.label}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[.15em] text-accent-700">
                    {item.note} →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
