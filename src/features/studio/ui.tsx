"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { RATES } from "./data";
import type { Currency } from "./types";
import { photo } from "./util";

export const thumb = (s: string, w = 384) => { const { src } = photo(s); return src.startsWith("data:") || !src ? src : `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=60`; };
export const CUR = Object.keys(RATES) as Currency[];

export function F({ l, v, on, type = "text", ph, list, area, rows }: { l: string; v: string; on: (v: string) => void; type?: string; ph?: string; list?: string; area?: boolean; rows?: number }) {
  return <label className="f">{l}{area ? <textarea rows={rows ?? 4} value={v} placeholder={ph} onChange={(e) => on(e.target.value)} /> : <input type={type} value={v} placeholder={ph} list={list} onChange={(e) => on(e.target.value)} />}</label>;
}
export function S({ l, v, on, o }: { l: string; v: string; on: (v: string) => void; o: [string, string][] }) { return <label className="f">{l}<select value={v} onChange={(e) => on(e.target.value)}>{o.map(([a, b]) => <option key={a} value={a}>{b}</option>)}</select></label>; }
/** One item per line; keeps the raw text while typing. */
export function Lines({ l, v, on, rows = 6 }: { l: string; v: string[]; on: (v: string[]) => void; rows?: number }) {
  const [raw, setRaw] = useState(v.join("\n")); const key = v.join("\n"); const own = useRef(key);
  useEffect(() => { if (own.current !== key) { own.current = key; setRaw(key); } }, [key]);
  return <label className="f">{l}<textarea rows={rows} value={raw} onChange={(e) => { setRaw(e.target.value); const n = e.target.value.split("\n").map((x) => x.trim()).filter(Boolean); own.current = n.join("\n"); on(n); }} /></label>;
}
export function Modal({ title, close, children, wide }: { title: string; close: () => void; children: ReactNode; wide?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { const d = ref.current!; if (!d.open) d.showModal(); }, []);
  return <dialog ref={ref} className={`modal ${wide ? "wide" : ""}`} onClose={close} aria-label={title} onClick={(e) => e.target === ref.current && close()}><div className="modal-in"><header><h2>{title}</h2><button className="ic" aria-label="Close" onClick={close}><X size={20} /></button></header>{children}</div></dialog>;
}
