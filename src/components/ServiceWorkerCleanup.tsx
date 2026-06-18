"use client";

import { useEffect } from "react";

/**
 * Defensive cleanup: this site does NOT use a service worker.
 * A stale service worker left over on the shared localhost origin (or from a
 * previous deploy) can intercept requests and serve outdated JS chunks, causing
 * a "Cannot read properties of undefined (reading 'call')" runtime error.
 * Unregistering any rogue worker on load guarantees a clean first paint.
 * (Safe to remove if/when this site intentionally adopts a PWA / service worker.)
 */
export default function ServiceWorkerCleanup() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then((regs) => regs.forEach((r) => r.unregister()))
        .catch(() => {});
    }
  }, []);
  return null;
}
