import { Section, SectionLabel } from "@/components/ui/Section";
import { COMPARE } from "@/content/home";

export function CompareTable() {
  return (
    <Section id="compare" borderTop>
      <SectionLabel number="04">THE HONEST COMPARISON</SectionLabel>
      <h2
        className="mt-5 max-w-[22ch] font-extrabold"
        style={{
          fontSize: "clamp(30px, 4.2vw, 64px)",
          letterSpacing: "-.035em",
          lineHeight: 1,
        }}
      >
        Four ways to solve this. I&rsquo;m not always the right one.
      </h2>

      {/*
        The table needs 860px and a phone has 375, so two of the four options
        sit off-screen with nothing to say so — the honest comparison, which is
        the whole argument of this section, was invisible on mobile. A label
        rather than a gradient: this system has no soft edges to fade with.
      */}
      <p className="eyebrow mt-8 text-accent-700 min-[940px]:hidden">
        Swipe the table to compare all four{" "}
        <span aria-hidden="true">&rarr;</span>
      </p>

      <div className="mt-[clamp(20px,4vw,56px)] border-2 border-ink">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-b-ink">
                <th scope="col" className="w-[22%] p-4">
                  <span className="sr-only">Comparison criteria</span>
                </th>
                {COMPARE.columns.map((col, i) => (
                  <th
                    key={col}
                    scope="col"
                    className={`p-4 text-[11px] font-bold uppercase tracking-[.15em] ${
                      i === 0 ? "bg-accent text-bg" : "text-neutral-700"
                    }`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE.rows.map((row) => (
                <tr key={row.k} className="border-b-2 border-b-neutral-300 last:border-b-0">
                  <th
                    scope="row"
                    className="p-4 align-top text-[13.5px] font-extrabold leading-[1.4] tracking-[-.01em]"
                  >
                    {row.k}
                  </th>
                  {row.cells.map((cell, i) => (
                    <td
                      key={cell + i}
                      className={`p-4 align-top text-[13.5px] leading-[1.5] ${
                        i === 0
                          ? "bg-accent-100 font-bold text-accent-700"
                          : "text-neutral-700"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/*
          The concession is the strategy, not a weakness. It is the reason the
          rest of the page is believable. Do not soften or remove it.
        */}
        <div className="border-t-2 border-t-ink bg-surface p-[clamp(18px,2.4vw,34px)]">
          <p className="eyebrow text-accent-700">{COMPARE.concession.heading}</p>
          <p className="mt-4 max-w-[80ch] text-[15px] leading-[1.62]">
            {COMPARE.concession.body}
          </p>
        </div>
      </div>
    </Section>
  );
}
