"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";
import { captureAttribution } from "@/lib/attribution";
import { track } from "@/lib/analytics";

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution();
  }, []);

  // Tel and mailto clicks never reach the contact form, so they'd otherwise be
  // invisible in reporting — they are real leads.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest?.("a");
      const href = link?.getAttribute("href");
      if (!href) return;
      if (href.startsWith("tel:")) track("phone_call_click", { form_page: pathname });
      else if (href.startsWith("mailto:")) track("email_click", { form_page: pathname });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${SITE.gaId}');`}
      </Script>
    </>
  );
}
