export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[140] focus:border-2 focus:border-ink focus:bg-bg focus:px-4 focus:py-3 focus:text-[12px] focus:font-extrabold focus:uppercase focus:tracking-[.14em] focus:no-underline"
    >
      Skip to content
    </a>
  );
}
