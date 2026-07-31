"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { BookCall } from "@/components/BookCall";
import { CAPACITY } from "@/lib/site";

/**
 * Seven links: the three that carry the strategy (the standard, the honest
 * comparison, when not to hire me), the two proof sections, and the two real
 * pages inner routes need for discoverability.
 */
const NAV = [
  { href: "/#standard", label: "STANDARD" },
  { href: "/#compare", label: "COMPARE" },
  { href: "/#when-not-to", label: "WHEN NOT TO" },
  { href: "/#work", label: "WORK" },
  { href: "/#services", label: "SERVICES" },
  { href: "/pricing", label: "PRICING" },
  { href: "/blog", label: "BLOG" },
];

function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      bar.style.transform = `scaleX(${ratio})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[130] h-[3px] bg-accent origin-left scale-x-0"
      ref={ref}
    />
  );
}

/**
 * No display utility here on purpose. If the base set `inline-flex`, a caller
 * passing `hidden` would not reliably win — Tailwind resolves conflicting
 * display utilities by stylesheet order, not by class-attribute order, and the
 * pill would stay visible on the narrow screens it is meant to disappear on.
 * Every call site supplies its own display classes.
 */
function CapacityPill({ className = "" }: { className?: string }) {
  return (
    <span
      className={`items-center gap-[7px] border-2 border-ink px-[10px] py-[7px] text-[10px] font-bold uppercase tracking-[.15em] leading-none ${className}`}
    >
      <span aria-hidden="true" className="h-[8px] w-[8px] bg-accent animate-blink" />
      {CAPACITY.label}
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Lock scroll, trap focus and close on Escape while the panel is open.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, select'
        ) ?? []
      );

    focusables()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <ScrollProgress />
      <header className="sticky top-0 z-[120] min-h-[74px] border-b-2 border-b-divider bg-bg">
        <div className="site-container flex min-h-[74px] items-center gap-6 px-[clamp(18px,4vw,56px)]">
          <Logo />

          <nav
            aria-label="Primary"
            className="ml-auto hidden items-center gap-[22px] min-[1041px]:flex"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[11.5px] font-semibold uppercase tracking-[.11em] text-ink no-underline transition-colors hover:text-accent-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-4 min-[1041px]:ml-0">
            {/* The scarcity claim needs room to read; below 700px it goes. */}
            <CapacityPill className="hidden min-[701px]:inline-flex" />
            {/*
              Visibility lives on a wrapper, not on the button. Btn's base
              class sets `inline-flex`, and Tailwind resolves competing
              display utilities by stylesheet order rather than by the order
              they appear in the attribute — so `hidden` passed straight to
              the button loses, and the desktop CTA shows up on phones.
            */}
            <div className="hidden min-[1041px]:block">
              <BookCall>BOOK A FREE CALL →</BookCall>
            </div>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="inline-flex items-center gap-[9px] border-2 border-ink px-[14px] py-[11px] text-[11px] font-extrabold uppercase tracking-[.14em] leading-none min-[1041px]:hidden"
            >
              <span aria-hidden="true" className="flex flex-col gap-[3px]">
                <span className="block h-[2px] w-[15px] bg-ink" />
                <span className="block h-[2px] w-[15px] bg-ink" />
                <span className="block h-[2px] w-[15px] bg-ink" />
              </span>
              {open ? "CLOSE" : "MENU"}
            </button>
          </div>
        </div>

        {/*
          Always rendered, toggled with `hidden`, so the button's aria-controls
          always points at an element that exists. Conditionally mounting it
          leaves a dangling reference whenever the menu is closed.
        */}
        <div
          id="mobile-nav"
          ref={panelRef}
          hidden={!open}
          className="border-t-2 border-t-ink bg-bg px-[clamp(18px,4vw,56px)] py-6 min-[1041px]:hidden"
        >
            <nav aria-label="Primary" className="flex flex-col">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b-2 border-b-neutral-300 py-[14px] text-[13px] font-extrabold uppercase tracking-[.12em] text-ink no-underline last:border-b-0"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-4">
              <BookCall block onNavigate={() => setOpen(false)}>
                BOOK A FREE CALL →
              </BookCall>
              {/* ...and reappears inside the menu panel, where there is room. */}
              <CapacityPill className="inline-flex self-start min-[701px]:hidden" />
            </div>
        </div>
      </header>
    </>
  );
}
