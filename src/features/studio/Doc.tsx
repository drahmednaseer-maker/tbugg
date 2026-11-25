"use client";
/* eslint-disable @next/next/no-img-element -- pages are exported to PDF, so they need plain images */
import { createContext, Fragment, useContext, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Backpack, Camera, Car, Check, Clock, Compass, Flame, MapPin, Mountain, Moon, Phone, Globe, Mail, Tent, Utensils, X, BedDouble, Route } from "lucide-react";
import { PLACES, RATES, THEMES } from "./data";
import type { Company, Day, SectionId, Trip } from "./types";
import { addDays, dateRange, duration, fmtDay, fmtFull, fmtShort, metres, money, num, photo } from "./util";

interface Ctx { t: Trip; c: Company; edit: boolean; set: (path: string, v: unknown) => void; pick: (path: string) => void }
const C = createContext<Ctx>(null!);
const get = (o: unknown, p: string): string => String(p.split(".").reduce<unknown>((a, k) => (a as Record<string, unknown>)?.[k], o) ?? "");

/** The original logo file, only cropped to its artwork. Never recoloured or redrawn. */
export function Logo({ w }: { w: number }) {
  const s = w / 2721;
  return <div style={{ width: w, height: 623 * s, overflow: "hidden", position: "relative", flex: "none" }}>
    <img src="/brand/travelbug-logo-original.png" alt="Travel Bug" style={{ position: "absolute", width: 2925 * s, height: 1950 * s, maxWidth: "none", left: -72 * s, top: -654 * s }} /></div>;
}
function Tx({ p, as: Tag = "div", className, style, ph }: { p: string; as?: "div" | "span" | "h1" | "h2" | "h3" | "p"; className?: string; style?: CSSProperties; ph?: string }) {
  const { t, edit, set } = useContext(C);
  const ref = useRef<HTMLElement>(null);
  const v = get(t, p);
  useLayoutEffect(() => { const e = ref.current; if (e && document.activeElement !== e && e.textContent !== v) e.textContent = v; });
  if (!edit && !v) return null;
  return <Tag ref={ref as never} className={`${className ?? ""} ${edit ? "ed" : ""}`} style={{ whiteSpace: "pre-line", ...style }} data-ph={ph ?? "Type here"}
    contentEditable={edit ? "plaintext-only" : undefined} suppressContentEditableWarning spellCheck={edit} role={edit ? "textbox" : undefined} aria-label={edit ? ph ?? p : undefined}
    onKeyDown={(e: React.KeyboardEvent) => { e.stopPropagation(); if (e.key === "Escape") ref.current?.blur(); }}
    onBlur={() => { const n = (ref.current!.textContent ?? "").trim(); if (n !== v) set(p, n); }} />;
}
function Ph({ p, fb = "", className, style, children }: { p: string; fb?: string; className?: string; style?: CSSProperties; children?: ReactNode }) {
  const { t, edit, pick } = useContext(C);
  const v = get(t, p) || fb; const { src, pos } = photo(v);
  if (!src && !(edit && (p === "cover" || p === "backImage"))) return null;
  return <div className={`ph ${className ?? ""}`} style={style}>
    {src && <img src={src} alt="" style={{ objectPosition: pos }} />}{children}
    {edit && <button type="button" className="ph-btn noprint" onClick={() => pick(p)} aria-label="Change photo"><span>{src ? "Change photo" : "Add photo"}</span></button>}
  </div>;
}
/** A photo that takes up spare space at the foot of a page. Chosen from the trip's own photos; can be changed like any other. */
function Fill({ id, className = "" }: { id: string; className?: string }) {
  const { t } = useContext(C); const path = (s: string) => photo(s).src;
  const avoid = new Set([t.cover, t.backImage, ...t.highlightImages].map(path)); const seen = new Set<string>();
  const pool = [...t.days.map((x) => x.image), ...t.gallery, ...t.highlightImages].filter((s) => s && !/portrait|_kid/.test(path(s)) && !seen.has(path(s)) && seen.add(path(s)));
  const best = pool.filter((s) => !avoid.has(path(s))); const list = best.length > 5 ? best : [...best, ...pool.filter((s) => !best.includes(s))];
  const n = ["intro", "price", "why", "travel", "inclusions", "stays", "glance", "elevation", "packing", "collection", "days"].indexOf(id.replace(/\d+$/, "")); const pg = Number(id.match(/\d+$/)?.[0] ?? 0);
  return <Ph p={`fill.${id}`} fb={t.fill?.[id] === "" ? "" : list[(Math.max(0, n) + pg) % Math.max(1, list.length)] ?? ""} className={`fill ${className}`} />;
}
const themeVars = (t: Trip) => { const th = THEMES.find((x) => x.id === t.theme) ?? THEMES[0]; return { "--paper": th.paper, "--ink": th.ink, "--head": th.head, "--acc": th.accent, "--bar": th.bar, "--line": th.line, "--disp": th.display, "--scr": th.script, "--up": th.upper ? "uppercase" : "none", "--ds": `${th.size}px` } as CSSProperties; };
function Page({ sec, children, bare }: { sec: SectionId; children: ReactNode; bare?: boolean }) {
  const { t } = useContext(C); const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current!; el.closest(".doc")?.querySelectorAll(".pg").forEach((pg, i) => { const n = pg.querySelector(".pgno"); if (n) n.textContent = String(i + 1); });
    const b = el.querySelector<HTMLElement>(".pg-b"); el.dataset.over = b && b.scrollHeight > b.clientHeight + 3 ? "1" : "";
  });
  return <section ref={ref} className={`pg ${bare ? "bare" : ""}`} data-sec={sec} style={themeVars(t)}>
    {!bare && <header className="pg-h"><Logo w={128} /><span>{t.title}</span></header>}
    {bare ? children : <div className="pg-b">{children}</div>}
    {!bare && <Bar />}
  </section>;
}
const Bar = () => <footer className="bar"><div className="bar-i">{[Car, Backpack, Mountain, Compass, Tent, Flame, Camera].map((I, i) => <I key={i} size={22} strokeWidth={1.5} />)}</div><span className="pgno" /></footer>;
const H = ({ children, sub }: { children: ReactNode; sub?: ReactNode }) => <div className="hd"><h2>{children}</h2>{sub && <p>{sub}</p>}</div>;

/** Measures blocks off-screen and flows them onto as many pages as they need. */
function Flow({ sec, head, blocks, cols = 1, grow = 0 }: { sec: SectionId; head: ReactNode; blocks: { k: string; n: ReactNode }[]; cols?: 1 | 2; grow?: number }) {
  const ref = useRef<HTMLDivElement>(null); const [cut, setCut] = useState<{ out: number[][]; hs: number[]; hh: number }>({ out: [blocks.map((_, i) => i)], hs: [], hh: 0 }); const [, bump] = useState(0);
  useEffect(() => { let on = true; document.fonts.ready.then(() => on && bump((x) => x + 1)); return () => { on = false; }; }, []);
  // Runs after every render on purpose: content height changes with any edit, and setCut only fires on a real change.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    const box = ref.current; if (!box) return;
    const hh = (box.querySelector("[data-head]") as HTMLElement).offsetHeight; const avail = 844;
    const out: number[][] = [[]]; let y = 0;
    const hs = [...box.querySelectorAll<HTMLElement>("[data-b]")].map((e) => Math.ceil(e.getBoundingClientRect().height / (box.getBoundingClientRect().width / 690)));
    hs.forEach((h, i) => {
      const first = out.length <= cols; const room = avail - (first ? hh : 0);
      if (y + h > room && out[out.length - 1].length) { out.push([]); y = 0; }
      out[out.length - 1].push(i); y += h;
    });
    if (cols === 2) { // balance the last page's two columns
      const at = out.length - 1 - ((out.length - 1) % 2); const all = out.slice(at).flat(); const sum = (a: number[]) => a.reduce((q, i) => q + hs[i], 0);
      let k = all.length; for (let j = 1; j < all.length; j++) if (Math.max(sum(all.slice(0, j)), sum(all.slice(j))) < Math.max(sum(all.slice(0, k)), sum(all.slice(k)))) k = j;
      out.splice(at, 2, all.slice(0, k), ...(k < all.length ? [all.slice(k)] : []));
    }
    const nx = { out, hs, hh };
    if (JSON.stringify(nx) !== JSON.stringify(cut)) setCut(nx);
  });
  const pages: number[][][] = []; for (let i = 0; i < cut.out.length; i += cols) pages.push(cut.out.slice(i, i + cols));
  const rest = (pg: number[][], i: number) => 844 - (i ? 0 : cut.hh) - Math.max(...pg.map((col) => col.reduce((a, x) => a + (cut.hs[x] ?? 0) + grow, 0)));
  return <>
    <div ref={ref} className="measure noprint" aria-hidden inert><div data-head>{head}</div><div style={{ width: cols === 2 ? 331 : 690 }}>{blocks.map((b) => <div data-b key={b.k}>{b.n}</div>)}</div></div>
    {pages.map((pg, i) => <Page sec={sec} key={i}>{i === 0 && head}<div className={cols === 2 ? "cols" : grow ? "grow" : ""} style={grow && cut.hh ? { height: 844 - (i ? 0 : cut.hh) - Math.max(0, rest(pg, i)) } : undefined}>{pg.map((col, j) => <div key={j}>{col.map((x) => blocks[x] && (grow ? <div key={blocks[x].k} className="gb" style={{ maxHeight: (cut.hs[x] ?? 0) + grow }}>{blocks[x].n}</div> : <Fragment key={blocks[x].k}>{blocks[x].n}</Fragment>))}</div>)}</div>{cut.hh > 0 && rest(pg, i) > 180 && <Fill id={`${sec}${i || ""}`} />}</Page>)}
  </>;
}

const sizeTitle = (s: string, base: number) => base * Math.min(1, Math.sqrt(15 / Math.max(15, s.length)), 13 / Math.max(13, ...s.split(/\s/).map((w) => w.length)) + 0.08);
function Cover() {
  const { t, c } = useContext(C); const th = THEMES.find((x) => x.id === t.theme) ?? THEMES[0];
  const facts = [duration(t), dateRange(t), t.pax && t.days.length ? `${t.pax} guest${t.pax === "1" ? "" : "s"}` : ""].filter(Boolean);
  const title = <><Tx p="title" as="h1" className="cv-t" style={{ fontSize: sizeTitle(t.title, t.coverLayout === "classic" ? th.size : th.size * 0.86) }} ph="Title" /><Tx p="subtitle" className="cv-s" ph="Subtitle" /></>;
  const meta = <div className="cv-m">{facts.map((x) => <span key={x}>{x}</span>)}</div>;
  const who = <div className="cv-w">{t.client && <span>Prepared for <b>{t.client}</b></span>}{t.partner && <span>In partnership with <b>{t.partner}</b></span>}</div>;
  return <Page sec="cover" bare><div className={`cv cv-${t.coverLayout}`}>
    {t.coverLayout === "full" ? <><Ph p="cover" className="cv-p" /><div className="cv-logo"><Logo w={300} /><i>{c.tagline}</i></div><div className="cv-x"><Tx p="kicker" className="cv-k" ph="Kicker" />{title}{meta}{who}</div></>
      : <><div className="cv-top"><Logo w={t.coverLayout === "classic" ? 410 : 300} /><i>{c.tagline}</i></div><Ph p="cover" className="cv-p" /><div className="cv-x"><Tx p="kicker" className="cv-k" ph="Kicker" />{title}{meta}{who}</div></>}
  </div><Bar /></Page>;
}
function Intro() {
  const { t } = useContext(C);
  const facts: [string, string][] = [["Duration", duration(t)], ["Dates", dateRange(t)], ["Group", t.pax ? `${t.pax} guests` : ""], ["Best season", t.season], ["Level", t.difficulty]];
  return <Page sec="intro"><div className="intro"><Fill id="intro" className="intro-p" /><div className="intro-x"><Tx p="introTitle" as="h2" className="big" /><Tx p="intro" className="body" style={t.intro.length > 1300 ? { fontSize: 14.5, lineHeight: 1.5 } : undefined} /></div>
    {t.days.length > 0 && <div className="facts">{facts.filter((f) => f[1]).map(([k, v]) => <div key={k}><b>{k}</b><span>{v}</span></div>)}</div>}</div></Page>;
}
export function RouteMap({ days, h = 330 }: { days: Day[]; h?: number }) {
  const stops: { name: string; n: number; x: number; y: number }[] = [];
  days.forEach((d, i) => { if (PLACES[d.place] && stops[stops.length - 1]?.name !== d.place) stops.push({ name: d.place, n: i + 1, x: 0, y: 0 }); });
  const names = [...new Set(stops.map((s) => s.name))]; if (names.length < 2) return null;
  const W = 690, Hh = h, pad = Math.min(58, h / 5); const ll = names.map((n) => PLACES[n]); const mid = ll.reduce((a, b) => a + b[0], 0) / ll.length; const k = Math.cos((mid * Math.PI) / 180);
  const xs = ll.map((p) => p[1] * k), ys = ll.map((p) => -p[0]); const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  const s = Math.min((W - pad * 2 - 60) / Math.max(x1 - x0, 0.01), (Hh - pad * 2) / Math.max(y1 - y0, 0.01)); const ox = (W - (x1 - x0) * s) / 2, oy = (Hh - (y1 - y0) * s) / 2;
  const pt = (n: string) => ({ x: ox + (PLACES[n][1] * k - x0) * s, y: oy + (-PLACES[n][0] - y0) * s });
  stops.forEach((q) => Object.assign(q, pt(q.name)));
  const taken: number[][] = names.map((n) => { const p = pt(n); return [p.x - 13, p.y - 13, p.x + 13, p.y + 13]; });
  const labels = names.map((n) => { const p = pt(n), w = n.length * 7.6 + 8; const opts = [[17, -9], [-17 - w, -9], [-w / 2, -34], [-w / 2, 16], [14, -30], [14, 12], [-w - 12, -30], [-w - 12, 12], [-w / 2, 34], [-w / 2, -52], [22, 30], [-w - 18, 30], [22, -48], [-w - 18, -48], [-w / 2, 54], [-w / 2, -72], [30, 48], [-w - 26, 48]];
    const hit = (o: number[]) => taken.reduce((a, b) => a + (p.x + o[0] < b[2] && p.x + o[0] + w > b[0] && p.y + o[1] < b[3] && p.y + o[1] + 18 > b[1] ? 1 : 0), 0) + (p.x + o[0] < 4 || p.x + o[0] + w > W - 4 || p.y + o[1] < 4 || p.y + o[1] > Hh - 22 ? 5 : 0);
    const o = opts.reduce((a, b) => (hit(b) < hit(a) ? b : a)); taken.push([p.x + o[0], p.y + o[1], p.x + o[0] + w, p.y + o[1] + 18]); const far = Math.abs(o[1] + 9) > 30; return { n, x: p.x + o[0] + 4, y: p.y + o[1] + 14, line: far ? `M${p.x},${p.y}L${p.x + o[0] + w / 2},${p.y + o[1] + (o[1] < 0 ? 18 : 2)}` : "" }; });
  const path = stops.map((q, i) => { if (!i) return `M${q.x},${q.y}`; const a = stops[i - 1], mx = (a.x + q.x) / 2 + (q.y - a.y) * 0.12, my = (a.y + q.y) / 2 - (q.x - a.x) * 0.12; return `Q${mx},${my} ${q.x},${q.y}`; }).join(" ");
  const seen = new Set<string>();
  return <svg viewBox={`0 0 ${W} ${Hh}`} width={W} height={Hh} className="map" role="img" aria-label={`Route: ${stops.map((q) => q.name).join(", ")}`}>
    <rect width={W} height={Hh} rx="4" fill="var(--head)" opacity=".07" />{Array.from({ length: 11 }, (_, i) => <path key={i} d={`M${i * 69},0V${Hh}M0,${(i * Hh) / 10}H${W}`} stroke="var(--head)" strokeWidth=".5" opacity=".1" />)}
    <path d={path} fill="none" stroke="var(--head)" strokeWidth="2.5" strokeDasharray="7 5" strokeLinecap="round" />
    {labels.map((l) => l.line && <path key={l.n} d={l.line} stroke="var(--ink)" strokeWidth="1" opacity=".55" />)}
    {stops.filter((q) => !seen.has(q.name) && seen.add(q.name)).map((q) => <g key={q.name}><circle cx={q.x} cy={q.y} r="12" fill="var(--bar)" stroke="var(--paper)" strokeWidth="2.5" /><text x={q.x} y={q.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">{q.n}</text></g>)}
    {labels.map((l) => <text key={l.n} x={l.x} y={l.y} fontSize="13.5" fontWeight="700" fill="var(--ink)" stroke="var(--paper)" strokeWidth="4" paintOrder="stroke">{l.n}</text>)}
    <g transform={`translate(${W - 26},34)`} fill="var(--head)"><path d="M0,-18L5,2L0,-2L-5,2Z" /><text y="16" textAnchor="middle" fontSize="11" fontWeight="700">N</text></g>
    <text x="12" y={Hh - 10} fontSize="10" fill="var(--ink)" opacity=".75">Numbers show the first day at each stop. Route lines are schematic.</text>
  </svg>;
}
function Glance() {
  const { t } = useContext(C);
  return <Flow sec="glance" head={<H sub={[duration(t), dateRange(t)].filter(Boolean).join("  ·  ")}>Your route at a glance</H>} blocks={[{ k: "m", n: <div style={{ paddingBottom: 16 }}><RouteMap days={t.days} h={Math.max(170, Math.min(430, 715 - t.days.length * 30.5))} /></div> },
    ...t.days.map((d, i) => ({ k: d.id, n: <div className="gl"><b>{String(i + 1).padStart(2, "0")}</b><span className="gl-d">{t.start ? fmtShort(addDays(t.start, i)) : ""}</span><span className="gl-t">{d.title}</span><span className="gl-s">{d.stay}</span></div> }))]} />;
}
function Highlights() {
  const { t } = useContext(C);
  return <Page sec="highlights"><H>Journey highlights</H><div className="mos"><Ph p="highlightImages.0" /><Ph p="highlightImages.1" /><Ph p="highlightImages.2" /></div>
    <div className="hl">{t.highlights.map((g, i) => <div key={i}><Tx p={`highlights.${i}.title`} as="h3" />{g.items.map((_, j) => <Tx key={j} p={`highlights.${i}.items.${j}`} as="p" />)}</div>)}</div></Page>;
}
const MEAL = { B: "Breakfast", L: "Lunch", D: "Dinner" };
function DayBlock({ i }: { i: number }) {
  const { t, edit } = useContext(C); const d = t.days[i]; const L = t.dayLayout; const pic = L !== "compact" && !!d.image;
  return <article className={`day day-${L} ${pic ? "" : "nopic"} ${i % 2 ? "odd" : ""}`}>
    {pic && <Ph p={`days.${i}.image`} className="day-p" />}
    <div className="day-x"><div className="day-h"><b>Day {String(i + 1).padStart(2, "0")}</b>{t.start && <span>{fmtDay(addDays(t.start, i))}</span>}</div>
      <Tx p={`days.${i}.title`} as="h3" ph="Day title" />
      {(d.altitude || d.distance || d.time) && <div className="day-s">{d.altitude && <span><Mountain size={14} />{d.altitude}</span>}{d.distance && <span><Route size={14} />{d.distance}</span>}{d.time && <span><Clock size={14} />{d.time}</span>}</div>}
      {(d.body || (edit && !d.bullets.length)) && <Tx p={`days.${i}.body`} className="day-t" ph="Describe the day" />}
      {d.bullets.length > 0 && <ul>{d.bullets.map((_, j) => <li key={j}><Tx p={`days.${i}.bullets.${j}`} as="span" /></li>)}</ul>}
      {(d.meals.length > 0 || d.stay) && <div className="day-f">{d.meals.length > 0 && <span><Utensils size={14} />{d.meals.map((m) => MEAL[m]).join(", ")}</span>}{d.stay && <span>{d.camp ? <Tent size={14} /> : <Moon size={14} />}{d.stay}</span>}</div>}
    </div></article>;
}
function Elevation() {
  const { t } = useContext(C); const p = t.days.map((d, i) => ({ d, i, m: metres(d) })).filter((x) => x.m); if (p.length < 3) return null;
  const W = 690, hh = Math.max(190, Math.min(420, 730 - p.length * 30.5)), lo = Math.min(...p.map((x) => x.m)), hi = Math.max(...p.map((x) => x.m)), X = (k: number) => 30 + (k * (W - 60)) / (p.length - 1), Y = (m: number) => hh - 60 - ((m - lo) / Math.max(1, hi - lo)) * (hh - 110);
  const line = p.map((x, k) => `${k ? "L" : "M"}${X(k)},${Y(x.m)}`).join(""); const top = p.findIndex((x) => x.m === hi);
  return <Flow sec="elevation" head={<H sub="Overnight or highest point of each day">Elevation and distances</H>} blocks={[{ k: "c", n: <svg viewBox={`0 0 ${W} ${hh}`} width={W} height={hh}>
    <path d={`${line}L${X(p.length - 1)},${hh - 50}L${X(0)},${hh - 50}Z`} fill="var(--head)" opacity=".14" /><path d={line} fill="none" stroke="var(--head)" strokeWidth="3" strokeLinejoin="round" />
    {p.map((x, k) => <g key={k}><circle cx={X(k)} cy={Y(x.m)} r="4.5" fill="var(--paper)" stroke="var(--head)" strokeWidth="2.5" /><text x={X(k)} y={hh - 28} textAnchor="middle" fontSize="11" fill="var(--ink)">D{x.i + 1}</text></g>)}
    <text x={X(top)} y={Y(hi) - 14} textAnchor="middle" fontWeight="700" fontSize="15" fill="var(--head)">{p[top].d.altitude}</text></svg> },
    ...p.map((x) => ({ k: x.d.id, n: <div className="gl el"><b>{String(x.i + 1).padStart(2, "0")}</b><span className="gl-t">{x.d.title}</span><span>{[x.d.distance, x.d.time].filter(Boolean).join(" / ")}</span><span className="r">{x.d.altitude}</span></div> }))]} />;
}
function Stays() {
  const { t } = useContext(C); const s: { stay: string; n: number; place: string; img: string; camp: boolean; from: number }[] = [];
  t.days.forEach((d, i) => { if (!d.stay || i === t.days.length - 1) return; const l = s[s.length - 1]; if (l?.stay === d.stay) l.n++; else s.push({ stay: d.stay, n: 1, place: d.place, img: d.image, camp: d.camp, from: i }); });
  if (!s.length) return null;
  return <Flow sec="stays" head={<H sub="Or similar, subject to availability at the time of booking">Where you stay</H>} blocks={s.map((x, i) => ({ k: String(i), n: <div className="stay"><div className="stay-i">{x.camp ? <Tent size={24} /> : <BedDouble size={24} />}</div><div><h3>{x.stay}</h3><p>{x.place}{t.start && `  ·  Check-in ${fmtShort(addDays(t.start, x.from))}`}</p></div><b>{x.n} night{x.n > 1 ? "s" : ""}</b></div> }))} />;
}
function Gallery() { const { t } = useContext(C); return t.gallery.length ? <Page sec="gallery"><H>Moments from the road</H><div className={`gal g${Math.min(9, t.gallery.length)}`}>{t.gallery.slice(0, 9).map((_, i) => <Ph key={i} p={`gallery.${i}`} />)}</div></Page> : null; }
function Collection() {
  const { t } = useContext(C);
  return <Flow sec="collection" cols={2} head={<H sub="Every programme is private and can be customised">Tour collection</H>} blocks={t.collection.map((_, i) => ({ k: String(i), n: <div className="card"><Ph p={`collection.${i}.image`} /><Tx p={`collection.${i}.title`} as="h3" /><Tx p={`collection.${i}.meta`} className="card-m" /><Tx p={`collection.${i}.text`} as="p" /></div> }))} />;
}
function Inclusions() {
  const { t } = useContext(C); const li = (key: "included" | "excluded", n: ReactNode) => [{ k: key, n: <h3 className="inc-h">{n}</h3> }, ...t[key].map((_, i) => ({ k: key + i, n: <div className={`inc ${key}`}>{key === "included" ? <Check size={17} strokeWidth={3} /> : <X size={17} strokeWidth={3} />}<Tx p={`${key}.${i}`} as="span" /></div> }))];
  return <Flow sec="inclusions" head={<H>What your journey includes</H>} blocks={[...li("included", "Included"), ...li("excluded", "Not included")]} />;
}
export const quote = (t: Trip, amount: string) => { const n = num(amount); if (!n) return { main: "On request", local: "" }; const r = num(t.rate) || (t.showLocal && RATES[t.currency] ? RATES[t.showLocal] / RATES[t.currency] : 0); return { main: money(n, t.currency), local: t.showLocal && t.showLocal !== t.currency && r ? `approx. ${money(n * r, t.showLocal)}` : "" }; };
function Price() {
  const { t, c } = useContext(C); const dep = num(t.deposit), bal = t.start ? addDays(t.start, -num(t.balanceDays)) : null;
  return <Page sec="price"><H>Price and booking</H><div className={`pr ${t.prices.length > 3 ? "many" : ""}`}>{t.prices.map((p, i) => { const q = quote(t, p.amount); return <div key={i}><Tx p={`prices.${i}.label`} as="span" /><div><b>{q.main}</b>{q.local && <i>{q.local}</i>}</div></div>; })}</div>
    <Tx p="priceNote" as="p" className="note" />{t.prices.some((p) => quote(t, p.amount).local) && <p className="note">Local currency figures are indicative; the {t.currency} price applies.</p>}
    <h3 className="inc-h">How to book</h3><ol className="steps"><li><b>Confirm</b>Tell us your dates and guest names. {t.validUntil && <>This offer is valid until {fmtFull(addDays(t.validUntil, 0))}.</>}</li>
      <li><b>{dep ? `${dep}% deposit` : "Deposit"}</b>Secures hotels, flights and vehicle for your group.</li><li><b>Balance</b>{num(t.balanceDays) ? <>{bal ? `By ${fmtFull(bal)}` : "Due"} ({t.balanceDays} days before departure).</> : "Payable before departure."}</li></ol>
    <div className="two"><div><h3 className="inc-h">Payment details</h3><p className="pre">{c.bank || "Account details are sent by our team with your booking confirmation."}</p></div><div><h3 className="inc-h">Your contact</h3><p className="pre">{[c.contact, c.phone, c.email].filter(Boolean).join("\n")}</p></div></div><Fill id="price" /></Page>;
}
const Groups = ({ sec, p, title, sub }: { sec: SectionId; p: "travel" | "packing" | "why"; title: ReactNode; sub?: string }) => { const { t } = useContext(C); return <Flow sec={sec} cols={2} head={<H sub={sub}>{title}</H>} blocks={t[p].map((g, i) => ({ k: String(i), n: <div className="grp"><Tx p={`${p}.${i}.title`} as="h3" />{g.items.length > 1 ? <ul>{g.items.map((_, j) => <li key={j}><Tx p={`${p}.${i}.items.${j}`} as="span" /></li>)}</ul> : g.items.map((_, j) => <Tx key={j} p={`${p}.${i}.items.${j}`} as="p" />)}</div> }))} />; };
function Terms() {
  const { t, c } = useContext(C);
  return <Flow sec="terms" head={<H>Terms and conditions</H>} blocks={[...t.terms.map((_, i) => ({ k: String(i), n: <div className="term"><b>{i + 1}</b><Tx p={`terms.${i}`} as="p" /></div> })), ...(t.signature ? [{ k: "sig", n: <div className="sig"><p><i />I have read and agreed to the terms and conditions.</p><div>{["Name", "Email", "Mobile", "CNIC / Passport", "Signature", "Date"].map((x) => <span key={x}>{x}</span>)}</div><small>Please sign and send this page to {c.email} before booking.</small></div> }] : [])]} />;
}
function Back() {
  const { c } = useContext(C);
  return <Page sec="back" bare><div className="back"><Ph p="backImage" className="back-p" /><div className="back-x"><Logo w={340} /><i>{c.tagline}</i><div>{c.phone && <span><Phone size={17} />{c.phone}</span>}{c.email && <span><Mail size={17} />{c.email}</span>}{c.web && <span><Globe size={17} />{c.web}</span>}{c.address && <span><MapPin size={17} />{c.address}</span>}</div></div></div><Bar /></Page>;
}
export default function Doc({ t, c, edit = false, set = () => {}, pick = () => {} }: Partial<Ctx> & { t: Trip; c: Company }) {
  const R: Record<SectionId, () => ReactNode> = {
    cover: () => <Cover />, intro: () => <Intro />, glance: () => t.days.length > 0 && <Glance />, highlights: () => <Highlights />, collection: () => t.collection.length > 0 && <Collection />,
    days: () => t.days.length > 0 && <Flow sec="days" grow={t.dayLayout === "compact" ? 0 : 110} head={<H sub={duration(t)}>Day by day</H>} blocks={t.days.map((d, i) => ({ k: d.id, n: <DayBlock i={i} /> }))} />,
    elevation: () => <Elevation />, stays: () => <Stays />, gallery: () => <Gallery />, inclusions: () => <Inclusions />, price: () => <Price />, travel: () => <Groups sec="travel" p="travel" title="Travel information" />,
    packing: () => t.packing.length > 0 && <Groups sec="packing" p="packing" title="Packing list" sub={t.packingNote} />, why: () => <Groups sec="why" p="why" title={<Tx p="whyTitle" as="span" />} />, terms: () => <Terms />, back: () => <Back />,
  };
  return <C.Provider value={{ t, c, edit, set, pick }}><div className="doc" style={themeVars(t)}>{t.order.filter((s) => !t.hidden.includes(s)).map((s) => <Fragment key={s}>{R[s]()}</Fragment>)}</div></C.Provider>;
}
