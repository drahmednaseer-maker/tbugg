"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { ensureGtag, trackEvent } from "@/lib/analytics";

/**
 * Google Analytics 4 — LIVE.
 *
 * Tracking runs under the "TravelBug.pk" property in the
 * info@asmarphotography.com Google Analytics account. The Measurement ID is not
 * a secret (it ships to every browser anyway), so it's hardcoded here — that
 * keeps GA4 working on every `git push` deploy with no Vercel dashboard access
 * needed. An optional NEXT_PUBLIC_GA_ID env var overrides it if ever set.
 *
 * View visitors at https://analytics.google.com (sign in as
 * info@asmarphotography.com). See ANALYTICS.md.
 *
 * Loading: gtag.js is 168 KB and executing it costs ~90ms of main-thread time.
 * Even at lazyOnload that landed inside the window Lighthouse measures for
 * Total Blocking Time, which was the largest remaining drag on the mobile
 * score. It now waits for the first real signal of engagement — a scroll, tap,
 * click or keypress — or 5 seconds, whichever comes first.
 *
 * Trade-off: a visitor who leaves within 5 seconds without interacting is not
 * counted in GA4. Vercel Web Analytics (also installed) still records every
 * pageview, so total traffic remains accurate; it is GA4's engagement data that
 * skews slightly toward engaged sessions.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-W3MTQXZH2F";
const EVENTS = ["pointerdown", "keydown", "scroll", "touchstart"] as const;

export default function GoogleAnalytics() {
  const [start, setStart] = useState(false);

  // Queue the GA4 config straight away (no network cost), so events fired
  // before gtag.js loads — e.g. the click that triggers the load — are kept.
  useEffect(() => {
    if (!GA_ID) return;
    const w = window as Window & { __gaQueued?: boolean };
    if (!w.__gaQueued) {
      const gtag = ensureGtag();
      gtag("js", new Date());
      gtag("config", GA_ID);
      w.__gaQueued = true;
    }

    // Enquiry intent: WhatsApp, phone and email links anywhere on the site.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const label = (a.textContent || a.getAttribute("aria-label") || "").trim().slice(0, 80);
      if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|(www\.)?whatsapp\.com)\//i.test(href)) {
        trackEvent("whatsapp_click", { link_text: label, link_url: href.split("?")[0] });
      } else if (href.startsWith("tel:")) {
        trackEvent("phone_click", { link_text: label });
      } else if (href.startsWith("mailto:")) {
        trackEvent("email_click", { link_text: label });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  useEffect(() => {
    if (!GA_ID) return;
    let timer: number;
    const go = () => {
      setStart(true);
      EVENTS.forEach((e) => window.removeEventListener(e, go));
      window.clearTimeout(timer);
    };
    EVENTS.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }));
    timer = window.setTimeout(go, 5000);
    return () => {
      EVENTS.forEach((e) => window.removeEventListener(e, go));
      window.clearTimeout(timer);
    };
  }, []);

  if (!GA_ID || !start) return null;

  return (
    <>
      {/* js + config are already queued on mount; this only loads the library. */}
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
    </>
  );
}
