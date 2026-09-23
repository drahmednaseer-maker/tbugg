"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/* Site-wide smooth scrolling, plus anchor handling.
   - Respects prefers-reduced-motion: no Lenis, but anchors still work.
   - Anchor clicks scroll smoothly via lenis.scrollTo.
   - Landing on a URL that already carries a #hash also scrolls. The browser
     does that itself normally, but here it was arriving at 0 every time —
     https://www.travelbug.pk/#faq and /#tour-builder both left you at the top
     of the page — because Lenis takes over the scroll position as it starts
     and the native jump is lost. Anything linking into the middle of the
     homepage was silently broken, including the "Plan My Tour" buttons on the
     destination pages.
   - The target may not exist yet: the trip builder mounts on demand, so we
     look for it for a short while, and re-settle a few times afterwards while
     images above it finish loading and push it down the page. Any real scroll
     or key from the reader cancels all of that immediately — once they have
     taken over, yanking the page around would be worse than not arriving. */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis: Lenis | undefined;
    let raf = 0;
    if (!reduced) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      });
      const loop = (time: number) => { lenis!.raf(time); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    }

    const HEADER_OFFSET = -80;

    const scrollTo = (el: HTMLElement, smooth: boolean) => {
      if (lenis) {
        lenis.scrollTo(el, { offset: HEADER_OFFSET, immediate: !smooth });
      } else {
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET,
          behavior: smooth ? "smooth" : "auto",
        });
      }
    };

    const targetOf = (hash: string): HTMLElement | null => {
      if (!hash || hash === "#") return null;
      try { return document.querySelector(hash); } catch { return null; }
    };

    /* ── anchor clicks ─────────────────────────────────────────────────── */
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = targetOf(hash);
      if (el) { e.preventDefault(); scrollTo(el, true); }
    };
    document.addEventListener("click", onClick);

    /* ── arriving with a hash already in the URL ───────────────────────── */
    let timer: number | undefined;
    let cancelled = false;

    const cancel = () => {
      if (cancelled) return;
      cancelled = true;
      if (timer !== undefined) window.clearTimeout(timer);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
    };
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("keydown", cancel, { passive: true });

    const settle = (deadline: number, settleUntil: number) => {
      if (cancelled) return;
      const el = targetOf(window.location.hash);
      const now = Date.now();
      if (!el) {
        // Still mounting. Keep looking until the deadline, then give up quietly.
        if (now < deadline) timer = window.setTimeout(() => settle(deadline, settleUntil), 100);
        return;
      }
      scrollTo(el, false);
      // Images above the target keep loading and moving it, so hold the
      // position for a moment rather than landing once and drifting off.
      if (now < settleUntil) timer = window.setTimeout(() => settle(deadline, settleUntil), 180);
    };

    const startFromHash = () => {
      if (!window.location.hash || window.location.hash === "#") return;
      cancelled = false;
      const now = Date.now();
      settle(now + 6000, now + 2200);
    };

    // Give the first paint and Lenis a frame to settle before taking over.
    const kick = window.setTimeout(startFromHash, 120);
    window.addEventListener("hashchange", startFromHash);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(kick);
      cancel();
      window.removeEventListener("hashchange", startFromHash);
      document.removeEventListener("click", onClick);
      lenis?.destroy();
    };
  }, []);

  return null;
}
