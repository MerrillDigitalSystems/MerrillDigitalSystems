const KEY = "mds_attribution";

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_path?: string;
};

/**
 * Captured once per session on first pageview, then attached to every form
 * submission — so a lead that arrived from an outbound email still carries
 * that origin after three page views.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  if (sessionStorage.getItem(KEY)) return;

  const params = new URLSearchParams(window.location.search);
  const data: Attribution = {
    landing_path: window.location.pathname,
    referrer: document.referrer || undefined,
  };

  for (const key of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ] as const) {
    const value = params.get(key);
    if (value) data[key] = value;
  }

  try {
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // Private browsing with storage disabled — attribution is best-effort.
  }
}

export function readAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Attribution;
  } catch {
    return {};
  }
}
