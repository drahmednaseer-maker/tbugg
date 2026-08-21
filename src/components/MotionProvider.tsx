"use client";

import { LazyMotion, MotionConfig } from "framer-motion";

/**
 * framer-motion context for the pages that still use it (About, Contact,
 * Tours, Destinations, PhotoGallery, SearchBar, Parallax). Deliberately NOT in
 * the root layout: the homepage no longer uses framer-motion, and mounting
 * this globally pulled ~30 KB onto its LCP critical path.
 *
 * initial={false} keeps the previous behaviour where elements render in their
 * final state rather than server-rendering at opacity:0.
 */
const loadMotionFeatures = () => import("@/lib/motion-features").then((m) => m.default);

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadMotionFeatures}>
      <MotionConfig initial={false}>{children}</MotionConfig>
    </LazyMotion>
  );
}
