import Link from "next/link";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site";

const COLUMNS = [
  {
    title: "COMPANY",
    links: [
      { href: "/#standard", label: "The standard" },
      { href: "/#when-not-to", label: "When not to hire me" },
      { href: "/#work", label: "Work" },
      { href: "/pricing", label: "Pricing" },
      { href: "/#contact", label: "Contact" },
    ],
  },
  {
    title: "SERVICES",
    links: [
      { href: "/operations-software", label: "Operations software" },
      { href: "/field-service-software", label: "Field service software" },
      { href: "/bookkeeping-software", label: "Bookkeeping software" },
      { href: "/web-design-utah", label: "Website design" },
      { href: "/managed-services", label: "Managed services" },
    ],
  },
  {
    title: "AREAS WE SERVE",
    links: [
      { href: "/web-design-west-jordan", label: "West Jordan" },
      { href: "/web-design-salt-lake-city", label: "Salt Lake City" },
      { href: "/web-design-provo", label: "Provo" },
      { href: "/web-design-ogden", label: "Ogden" },
      { href: "/web-design-utah", label: "Utah statewide" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/roi-calculator", label: "ROI calculator" },
      { href: "/free-audit", label: "Free audit" },
      { href: "/free-checklist", label: "Free checklist" },
      { href: "/punchless", label: "Punchless" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t-2 border-t-ink bg-ink text-bg">
      <div className="site-container section-pad">
        <div className="grid gap-[clamp(28px,4vw,56px)] min-[900px]:grid-cols-[1.3fr_.7fr_.7fr_.7fr_.7fr]">
          <div>
            <Logo scale="footer" onDark />
            <p className="mt-5 max-w-[34ch] text-[13.5px] leading-[1.6] text-neutral-400">
              Custom software and websites for businesses that have outgrown
              spreadsheets. One person builds it, you own it outright, and the
              number comes before the work does.
            </p>
            <p className="mt-4 text-[11px] font-bold uppercase tracking-[.2em] text-accent-400">
              {SITE.tagline}
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              {/*
                A <p>, not an <h2>: these four column titles were landing in
                every page's heading outline, so all 44 pages carried "COMPANY
                / SERVICES / AREAS WE SERVE / RESOURCES" as real headings
                competing with their actual content.
              */}
              <p className="eyebrow text-neutral-500">{col.title}</p>
              {/*
                The 10px gap became padding on the links themselves: same
                visual rhythm, but each row is a ~34px hit area instead of a
                21px one. Footer links were the smallest touch targets on the
                site.
              */}
              <ul className="mt-3 flex flex-col">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="inline-block py-[6px] text-[13.5px] text-neutral-300 no-underline transition-colors hover:text-accent-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-[clamp(32px,5vw,64px)] flex flex-col gap-4 border-t-2 border-t-neutral-800 pt-6 text-[11px] font-bold uppercase tracking-[.16em] text-neutral-500 min-[820px]:flex-row min-[820px]:items-center min-[820px]:justify-between">
          <p>© {new Date().getFullYear()} {SITE.legalName.toUpperCase()}</p>
          <p className="flex flex-wrap gap-x-4">
            <Link
              href="/terms"
              className="inline-block py-[6px] text-neutral-500 no-underline hover:text-accent-400"
            >
              TERMS
            </Link>
            <Link
              href="/privacy"
              className="inline-block py-[6px] text-neutral-500 no-underline hover:text-accent-400"
            >
              PRIVACY
            </Link>
          </p>
          <p>
            {SITE.address.locality.toUpperCase()}, {SITE.address.region} ·{" "}
            <a
              href={SITE.phoneHref}
              className="inline-block py-[6px] text-neutral-500 no-underline hover:text-accent-400"
            >
              {SITE.phone}
            </a>{" "}
            · REMOTE-FIRST
          </p>
        </div>
      </div>
    </footer>
  );
}
