"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/* Scroll-driven parallax wrapper — the element drifts vertically at a
   different speed than the page while it crosses the viewport. */
export function ParallaxY({
  children,
  amount = 50,
  className,
  style,
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const raw = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  const y = useSpring(raw, { stiffness: 90, damping: 28, mass: 0.5 });

  return (
    <motion.div ref={ref} className={className} style={{ ...style, y }}>
      {children}
    </motion.div>
  );
}

/* Image that de-zooms as it enters the viewport (cinematic scale reveal).
   Wrap around an <img>/<Image> inside an overflow-hidden container. */
export function ZoomOnScroll({
  children,
  from = 1.18,
  className,
  style,
}: {
  children: ReactNode;
  from?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [from, 1]);

  return (
    <motion.div ref={ref} className={className} style={{ ...style, scale }}>
      {children}
    </motion.div>
  );
}
