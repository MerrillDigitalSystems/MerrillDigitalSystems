import { SectionLabel } from "@/components/ui/Section";
import { ScopeBuilder } from "@/components/scope/ScopeBuilder";
import { SCOPE_COPY } from "@/content/scope";

export function ScopeSection() {
  return (
    <section id="scope" className="section-pad border-t-2 border-t-ink bg-ink text-bg">
      <div className="site-container">
        <SectionLabel number="09" onDark>
          BUILD YOUR OWN SCOPE
        </SectionLabel>
        <h2
          className="mt-5 font-extrabold"
          style={{
            fontSize: "clamp(30px, 4.2vw, 64px)",
            letterSpacing: "-.035em",
            lineHeight: 1,
          }}
        >
          {SCOPE_COPY.heading}
        </h2>
        <p className="mt-6 max-w-[68ch] text-[15px] leading-[1.62] text-neutral-400">
          {SCOPE_COPY.lede}
        </p>

        <ScopeBuilder />
      </div>
    </section>
  );
}
