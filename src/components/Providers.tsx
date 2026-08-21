"use client";

import { LazyMotion, MotionConfig } from "framer-motion";

/**
 * Animations are not needed to render content, so the feature bundle is held
 * until the browser is idle after load — off the paint critical path, but
 * ready long before anyone can scroll or hover.
 */
const loadMotionFeatures = () =>
  new Promise<typeof import("@/lib/motion-features").default>((resolve) => {
    const load = () => import("@/lib/motion-features").then((m) => resolve(m.default));
    if (typeof window === "undefined") return load();
    const schedule = () =>
      "requestIdleCallback" in window
        ? window.requestIdleCallback(load, { timeout: 2000 })
        : window.setTimeout(load, 500);
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
  });

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    /* initial={false} → all motion elements skip the opacity-0 / y-offset
       starting state on first render. Content is always immediately visible.
       Scroll animations still play when elements enter the viewport.
       This fixes the "blank sections on mobile" bug caused by framer-motion
       IntersectionObserver misfiring on iOS Safari. */
    <LazyMotion features={loadMotionFeatures}>
      <MotionConfig initial={false}>
      {children}
      </MotionConfig>
    </LazyMotion>
  );
}
