"use client";

/**
 * Root providers. framer-motion lives in <MotionProvider>, mounted only by the
 * pages that use it, so it stays off the homepage's critical path.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
