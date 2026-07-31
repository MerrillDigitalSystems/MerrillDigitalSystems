import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { Prose } from "@/components/page/Prose";
import type { ReactNode } from "react";

const humanDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export function LegalPage({
  slug,
  title,
  description,
  h1,
  updated,
  children,
}: {
  slug: string;
  title: string;
  description: string;
  h1: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: title, description, path: slug }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: h1, path: slug },
          ]),
        ]}
      />

      <section className="border-b-2 border-b-ink">
        <div className="section-pad site-container">
          <p className="eyebrow text-neutral-600">LEGAL</p>
          <h1
            className="mt-5 max-w-[18ch] font-extrabold"
            style={{
              fontSize: "clamp(32px, 4.6vw, 68px)",
              letterSpacing: "-.04em",
              lineHeight: 1,
            }}
          >
            {h1}
          </h1>
          <p className="mt-6 text-[10px] font-bold uppercase tracking-[.15em] text-neutral-600">
            LAST UPDATED {humanDate(updated).toUpperCase()}
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-container">
          <Prose>{children}</Prose>
        </div>
      </section>
    </>
  );
}
