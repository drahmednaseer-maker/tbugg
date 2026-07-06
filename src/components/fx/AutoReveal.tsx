"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Site-wide cinematic reveal system.
   Automatically animates headings, paragraphs, images & cards as they
   scroll into view — no per-component wiring needed.
   - Elements already in the viewport on load are never hidden (no flicker).
   - Elements inside #hero or [data-no-fx] are skipped.
   - JS-off / observer failure = content simply stays visible. */

const SELECTORS = [
  "main h1", "main h2", "main h3", "main h4",
  "main p", "main li",
  "main img:not([data-no-fx] img)",
  "main [data-fx]",
].join(",");

export default function AutoReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let io: IntersectionObserver | null = null;

    /* Wait a tick so the page has painted before we start hiding below-fold content */
    const timer = setTimeout(() => {
      if (cancelled) return;

      const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTORS)).filter(el => {
        if (el.closest("#hero, [data-no-fx], .fx-done, nav, header, footer")) return false;
        if (el.classList.contains("fx-el") || el.classList.contains("fx-done")) return false;
        return true;
      });

      const vh = window.innerHeight;
      const toObserve: HTMLElement[] = [];

      for (const el of els) {
        const r = el.getBoundingClientRect();
        /* Never hide what the user can already see */
        if (r.top < vh * 0.92) { el.classList.add("fx-done"); continue; }
        el.classList.add(el.tagName === "IMG" ? "fx-img" : "fx-el");
        toObserve.push(el);
      }

      io = new IntersectionObserver(entries => {
        let batch = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.style.transitionDelay = `${Math.min(batch * 0.075, 0.45)}s`;
          el.classList.add("fx-in");
          batch++;
          io?.unobserve(el);
        }
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

      toObserve.forEach(el => io?.observe(el));

      /* Safety net: if anything is still hidden after 6s, reveal it */
      setTimeout(() => {
        document.querySelectorAll(".fx-el:not(.fx-in), .fx-img:not(.fx-in)").forEach(el => el.classList.add("fx-in"));
      }, 6000);
    }, 60);

    return () => { cancelled = true; clearTimeout(timer); io?.disconnect(); };
  }, [pathname]);

  return null;
}
