/**
 * GA4 event helper. Events are pushed onto window.dataLayer, which exists from
 * the first render (see components/GoogleAnalytics.tsx), so an event fired
 * before gtag.js has loaded is queued and sent once it arrives.
 */
type Params = Record<string, string | number | boolean | undefined>;

type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

export function ensureGtag(): (...args: unknown[]) => void {
  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer || [];
  if (!w.gtag) {
    // gtag must push the `arguments` object itself, not an array copy.
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      (w.dataLayer as unknown[]).push(arguments);
    };
  }
  return w.gtag;
}

export function trackEvent(name: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  ensureGtag()("event", name, { page_path: window.location.pathname, ...params });
}
