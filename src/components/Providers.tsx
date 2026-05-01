"use client";

import { MotionConfig } from "framer-motion";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    /* initial={false} → all motion elements skip the opacity-0 / y-offset
       starting state on first render. Content is always immediately visible.
       Scroll animations still play when elements enter the viewport.
       This fixes the "blank sections on mobile" bug caused by framer-motion
       IntersectionObserver misfiring on iOS Safari. */
    <MotionConfig initial={false}>
      {children}
    </MotionConfig>
  );
}
