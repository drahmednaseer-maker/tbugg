"use client";

import { useEffect, useRef, useState } from "react";

/* Custom cursor: golden dot + trailing ring.
   - Grows over links / buttons.
   - Shows "VIEW" over elements marked data-cursor="view" (photos).
   - Desktop (fine pointer) only; native cursor kept as fallback on top of text inputs. */
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("fx-cursor");

    let x = -100, y = -100, rx = -100, ry = -100;
    let mode: "default" | "link" | "view" = "default";
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      const t = e.target as HTMLElement;
      if (t.closest?.('[data-cursor="view"]')) mode = "view";
      else if (t.closest?.("a, button, [role='button'], input, select, textarea, [onclick], .cursor-pointer")) mode = "link";
      else mode = "default";
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
      if (ring.current) {
        const s = mode === "view" ? 2.6 : mode === "link" ? 1.7 : 1;
        ring.current.style.transform = `translate(${rx - 21}px, ${ry - 21}px) scale(${s})`;
        ring.current.style.background = mode === "view" ? "rgba(255,194,10,0.92)" : "transparent";
        ring.current.style.borderColor = mode === "default" ? "rgba(255,194,10,0.55)" : "rgba(255,194,10,0.9)";
      }
      if (label.current) label.current.style.opacity = mode === "view" ? "1" : "0";
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("fx-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dot} aria-hidden="true" style={{
        position: "fixed", top: 0, left: 0, width: 8, height: 8, borderRadius: "50%",
        background: "#FFC20A", zIndex: 100000, pointerEvents: "none",
        mixBlendMode: "difference",
      }} />
      <div ref={ring} aria-hidden="true" style={{
        position: "fixed", top: 0, left: 0, width: 42, height: 42, borderRadius: "50%",
        border: "1.5px solid rgba(255,194,10,0.55)", zIndex: 99999, pointerEvents: "none",
        transition: "background 0.25s ease, border-color 0.25s ease",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div ref={label} style={{
          fontSize: 7.5, fontWeight: 800, letterSpacing: "0.14em", color: "#0B1628",
          opacity: 0, transition: "opacity 0.2s ease", userSelect: "none",
        }}>VIEW</div>
      </div>
    </>
  );
}
