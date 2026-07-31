type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: string, params: GtagParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}

/** Fires at most once per page view for engagement-style signals. */
export function trackOnce(event: string, params: GtagParams = {}) {
  if (typeof window === "undefined") return;
  const key = `__mds_once_${event}`;
  const w = window as unknown as Record<string, boolean>;
  if (w[key]) return;
  w[key] = true;
  track(event, params);
}
