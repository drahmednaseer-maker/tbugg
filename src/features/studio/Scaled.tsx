"use client";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
/** Fits the fixed-size pages to the available width (zoom 0 = fit). */
export function Scaled({ children, zoom = 0 }: { children: ReactNode; zoom?: number }) {
  const out = useRef<HTMLDivElement>(null), inn = useRef<HTMLDivElement>(null), [b, setB] = useState({ s: 1, h: 0 });
  useLayoutEffect(() => {
    const f = () => { const w = out.current!.parentElement!.clientWidth; const s = zoom || Math.min(1, (w - (w < 700 ? 20 : 80)) / 810); setB((o) => { const h = inn.current!.offsetHeight; return o.s === s && o.h === h ? o : { s, h }; }); };
    f(); const r = new ResizeObserver(f); r.observe(out.current!.parentElement!); r.observe(inn.current!); return () => r.disconnect();
  }, [zoom]);
  return <div ref={out} className="sc" style={{ width: 810 * b.s, height: b.h * b.s }}><div ref={inn} className="sc-i" style={{ transform: `scale(${b.s})` }}>{children}</div></div>;
}
