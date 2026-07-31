"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { track } from "@/lib/analytics";
import { btnClasses } from "@/components/ui/Btn";

type CalApi = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, unknown>;
  q?: unknown[];
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

const EMBED_SRC = "https://app.cal.com/embed/embed.js";

/**
 * Cal.com's official loader. Appending embed.js on its own is NOT enough —
 * this snippet is what creates `window.Cal` and queues calls until the script
 * arrives, and it's what binds the click handlers to `[data-cal-link]`
 * elements. Without it the buttons render but do nothing.
 */
function installCalLoader() {
  if (window.Cal) return;

  (function (C: Window, A: string, L: string) {
    const p = function (a: { q?: unknown[] }, ar: IArguments) {
      a.q?.push(ar);
    };
    const d = C.document;
    C.Cal =
      C.Cal ||
      function (this: unknown, ...args: unknown[]) {
        const cal = C.Cal as CalApi;
        // eslint-disable-next-line prefer-rest-params
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (args[0] === L) {
          const api = function (this: unknown) {
            // eslint-disable-next-line prefer-rest-params
            p(api as unknown as { q?: unknown[] }, arguments);
          } as CalApi;
          const namespace = args[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns![namespace] = cal.ns![namespace] || api;
            p(cal.ns![namespace] as { q?: unknown[] }, ar);
            p(cal as { q?: unknown[] }, ["initNamespace", namespace] as unknown as IArguments);
          } else {
            p(cal as { q?: unknown[] }, ar);
          }
          return;
        }
        p(cal as { q?: unknown[] }, ar);
      };
  })(window, EMBED_SRC, "init");

  window.Cal!("init", { origin: "https://cal.com" });
}

/**
 * Cal.com opens in a modal on click. The embed is only installed once the
 * browser is idle, so it never competes with the hero for LCP. Before it is
 * ready — and if SITE.calLink is ever cleared — this falls back to a link to
 * the contact form rather than rendering a button that does nothing.
 */
export function BookCall({
  children,
  variant = "primary",
  inverted = false,
  block = false,
  className = "",
  fallbackHref = "/#contact",
  onNavigate,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  inverted?: boolean;
  block?: boolean;
  className?: string;
  fallbackHref?: string;
  onNavigate?: () => void;
}) {
  const cls = btnClasses({ variant, inverted, block, className });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!SITE.calLink) return;

    const load = () => {
      installCalLoader();
      setReady(true);
    };

    const canIdle = typeof window.requestIdleCallback === "function";
    const handle = canIdle
      ? window.requestIdleCallback(load, { timeout: 4000 })
      : window.setTimeout(load, 2000);

    return () => {
      if (canIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, []);

  // Cal posts this to the parent window once a booking completes.
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (!/^https:\/\/(app\.)?cal\.com$/.test(event.origin)) return;
      const type = (event.data as { type?: string } | null)?.type;
      if (type === "bookingSuccessful") track("book_call", { method: "cal.com" });
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  if (!SITE.calLink || !ready) {
    return (
      <Link href={fallbackHref} className={cls} onClick={onNavigate}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={cls}
      data-cal-link={SITE.calLink}
      data-cal-config='{"layout":"month_view"}'
      onClick={() => track("cal_modal_open")}
    >
      {children}
    </button>
  );
}
