import { SectionLabel, SectionH2 } from "@/components/ui/Section";
import { ScopeBuilder } from "@/components/scope/ScopeBuilder";
import { SCOPE_COPY } from "@/content/scope";

export function ScopeSection() {
  return (
    <section id="scope" className="section-pad">
      <div className="site-container">
        <SectionLabel number="08">BUILD YOUR OWN SCOPE</SectionLabel>
        <SectionH2 size="display" className="mt-8">
          {SCOPE_COPY.heading}
        </SectionH2>
        <p className="mt-6 max-w-[64ch] text-[15px] leading-[1.6] text-neutral-800">
          {SCOPE_COPY.lede}
        </p>

        <ScopeBuilder />
      </div>
    </section>
  );
}
