import Link from "next/link";
import { Section, SectionLabel } from "@/components/ui/Section";
import { GridCells, Cell } from "@/components/ui/GridCells";
import { GrayImage } from "@/components/ui/GrayImage";
import { Reveal } from "@/components/ui/Reveal";
import { CASE_STUDIES, SOFTWARE_PROJECTS } from "@/content/home";

export function WorkGrid() {
  return (
    <Section id="work" ground="surface" borderTop>
      <SectionLabel number="05">SHIPPED WORK</SectionLabel>
      <h2
        className="mt-5 font-extrabold"
        style={{
          fontSize: "clamp(30px, 4.2vw, 64px)",
          letterSpacing: "-.035em",
          lineHeight: 1,
        }}
      >
        Real systems. Real businesses.
      </h2>

      <div className="mt-[clamp(28px,4vw,56px)] grid gap-[clamp(14px,2vw,26px)] min-[900px]:grid-cols-3">
        {CASE_STUDIES.map((item, i) => (
          <Reveal key={item.title} index={i}>
            <Link
              href={item.href}
              className="flex h-full flex-col border-2 border-ink bg-bg no-underline transition-all duration-200 hover:-translate-y-[5px] hover:shadow-hard-lift"
            >
              <GrayImage
                src={item.image}
                alt={item.alt}
                width={640}
                height={400}
                sizes="(max-width: 900px) 100vw, 33vw"
                className="border-b-2 border-b-ink"
                imgClassName="aspect-[16/10] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-[clamp(18px,2vw,26px)]">
                <p className="eyebrow text-neutral-700">{item.eyebrow}</p>
                <h3 className="mt-3 text-[20px] font-extrabold leading-[1.12] tracking-[-.02em]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.55] text-neutral-800">
                  {item.body}
                </p>
                <p className="mt-auto border-t-2 border-t-ink pt-4 text-[13px] font-bold text-accent-700">
                  {item.result}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <GridCells
        cols="mt-[clamp(14px,2vw,26px)] grid-cols-1 min-[900px]:grid-cols-3"
        ground="bg"
      >
        {SOFTWARE_PROJECTS.map((project) => {
          const inner = (
            <>
              <p className="flex items-center gap-[9px] text-[10px] font-bold uppercase tracking-[.15em] text-neutral-700">
                <span
                  aria-hidden="true"
                  className={`h-[8px] w-[8px] ${
                    project.live ? "bg-accent animate-blink" : "bg-neutral-400"
                  }`}
                />
                {project.status}
              </p>
              <h3 className="mt-3 text-[19px] font-extrabold leading-[1.12] tracking-[-.02em]">
                {project.title}
              </h3>
              <p className="mt-3 text-[13.5px] leading-[1.55] text-neutral-800">
                {project.body}
              </p>
              <p
                className={`mt-auto pt-5 text-[13px] font-bold ${
                  project.live ? "text-accent-700" : "text-neutral-700"
                }`}
              >
                {project.result}
              </p>
            </>
          );

          return (
            <Cell key={project.title}>
              {project.href ? (
                <Link
                  href={project.href}
                  className="flex h-full flex-col no-underline text-ink"
                >
                  {inner}
                </Link>
              ) : (
                inner
              )}
            </Cell>
          );
        })}
      </GridCells>
    </Section>
  );
}
