"use client";
import { useState } from "react";
import { AlertTriangle, ArrowDown, ArrowUp, Check, MapPin, Minus, Plus, Trash2 } from "lucide-react";
import { changeDays, changeEnd, changeStart, changeStop, CITIES, endCity, endModes, insertStop, moveStop, removeStop, resizeStop, startCity, startModes, stops, type Proposal, type StartMode } from "./route";
import { F, Modal, S } from "./ui";
import type { Hotel, Trip } from "./types";
import { addDays, fmtFull } from "./util";

const opts = (first: string): [string, string][] => [["", first], ...CITIES.map((c) => [c, c] as [string, string]), ["_", "Another place…"]];
type Ask = { kind: "start" | "end" | "stop" | "insert" | "day"; k: number; to: string };
function City({ l, v, on, first }: { l: string; v: string; on: (c: string) => void; first: string }) {
  const [own, setOwn] = useState(false), [txt, setTxt] = useState("");
  if (own) return <div className="row"><F l={l} v={txt} on={setTxt} ph="Type the place" /><button className="btn" disabled={!txt.trim()} onClick={() => { on(txt.trim()); setOwn(false); }}>Use</button><button className="btn" onClick={() => setOwn(false)}>Cancel</button></div>;
  return <S l={l} v={v} o={v && !CITIES.includes(v) ? [[v, v], ...opts(first)] : opts(first)} on={(c) => (c === "_" ? setOwn(true) : c && c !== v && on(c))} />;
}
/** Shows what a route change does before it is applied. */
export function RouteChange({ t, ask, lib, close, apply }: { t: Trip; ask: Ask; lib: Hotel[]; close: () => void; apply: (x: Trip) => void }) {
  const modes: StartMode[] = ask.kind === "start" ? startModes(t, ask.to) : ask.kind === "end" ? endModes(t, ask.to) : []; const [mode, setMode] = useState<StartMode>(modes[0] ?? "add"), [keep, setKeep] = useState(false), [n, setN] = useState(2);
  const last = stops(t.days).length - 1; const p: Proposal = ask.kind === "start" ? changeStart(t, ask.to, mode, keep, lib) : ask.kind === "end" ? changeEnd(t, ask.to, mode, lib) : ask.kind === "insert" ? insertStop(t, ask.k, ask.to, n, lib) : ask.kind === "day" ? changeDays(t, ask.k, 1, ask.to, lib) : changeStop(t, ask.k, ask.to, lib);
  const L: Record<StartMode, string> = ask.kind === "start" ? { add: `Add a night in ${ask.to} first (one day longer)`, same: `Leave ${ask.to} and reach ${t.days[0]?.place} the same day (same length)`, direct: `Start in ${ask.to} directly and drop the days before it`, replace: `Use ${ask.to} instead of ${stops(t.days)[0]?.place} (same length)` } : { add: `Add a day to reach ${ask.to} (one day longer)`, same: `Travel to ${ask.to} on the last day (same length)`, direct: `Finish in ${ask.to} and drop the days after it`, replace: `Use ${ask.to} instead of ${stops(t.days)[last]?.place} (same length)` };
  return <Preview t={t} p={p} close={close} apply={apply}>{modes.length > 0 && <fieldset className="modes"><legend>How should the itinerary change?</legend>{modes.map((m) => <label key={m} className="ck"><input type="radio" name="mode" checked={mode === m} onChange={() => setMode(m)} />{L[m]}</label>)}</fieldset>}
    {ask.kind === "start" && t.start && (mode === "add" || mode === "direct") && <label className="ck"><input type="checkbox" checked={keep} onChange={(e) => setKeep(e.target.checked)} />{mode === "add" ? "Keep all other dates and start one day earlier" : "Keep the remaining dates and start later"}</label>}
    {ask.kind === "insert" && <F l="Days" type="number" v={String(n)} on={(v) => setN(Math.max(1, Math.min(14, Math.round(+v) || 1)))} />}</Preview>;
}
export function Preview({ t, p, close, apply, children }: { t: Trip; p: Proposal; close: () => void; apply: (x: Trip) => void; children?: React.ReactNode }) {
  return <Modal title={p.title} close={close} wide>{children}
    {p.warn.length > 0 && <ul className="rw">{p.warn.map((x) => <li key={x}><AlertTriangle size={17} />{x}</li>)}</ul>}
    <p className="ok">{t.days.length === p.trip.days.length ? `Stays ${t.days.length} days` : `${t.days.length} days become ${p.trip.days.length} days`}{p.trip.start !== t.start && `  ·  now starts ${fmtFull(addDays(p.trip.start, 0))}`}</p>
    <ol className="rv">{p.changes.map((c, i) => { const st = !c.after ? "out" : !c.before ? "new" : c.before.title !== c.after.title || c.before.body !== c.after.body || c.before.bullets.join() !== c.after.bullets.join() ? "chg" : ""; return <li key={i} className={st}><b>{c.after ? c.at + 1 : "–"}</b><span><strong>{(c.after ?? c.before)!.title}</strong>{st === "chg" && c.before!.title !== c.after!.title && <small>Was: {c.before!.title}</small>}{st && st !== "out" && <small>{c.after!.body}{c.after!.bullets.length > 0 && ` ${c.after!.bullets.join(", ")}.`}</small>}</span><em className={`pill ${st === "new" ? "g" : st === "out" ? "r" : st ? "a" : ""}`}>{{ new: "New", out: "Removed", chg: "Changed", "": "Same" }[st]}</em></li>; })}</ol>
    {p.notes.length > 0 && <><h3>After applying</h3><ul className="rn">{p.notes.map((x) => <li key={x}>{x}</li>)}</ul></>}
    <div className="row rs"><button className="btn pri" disabled={!p.trip.days.length} onClick={() => { apply(p.trip); close(); }}><Check size={16} />Apply change</button><button className="btn" onClick={close}>Cancel</button></div></Modal>;
}
export function RoutePanel({ t, lib, apply }: { t: Trip; lib: Hotel[]; apply: (x: Trip) => void }) {
  const [ask, setAsk] = useState<Ask | null>(null), [p, setP] = useState<Proposal | null>(null), [ins, setIns] = useState(-1); const st = stops(t.days), last = st.length - 1;
  if (!t.days.length) return <><h2>Route</h2><p className="hint">Add days first.</p></>;
  return <><h2>Route</h2><p className="hint">Change where the trip starts, ends or stops. Days, travel, map, dates and hotels are rebuilt, and you see a preview first.</p>
    <City key={`s${startCity(t)}`} l="Starts from" v={startCity(t)} first="Choose a city" on={(to) => setAsk({ kind: "start", k: 0, to })} /><City key={`e${endCity(t)}`} l="Ends in" v={endCity(t)} first="Choose a city" on={(to) => setAsk({ kind: "end", k: 0, to })} />
    <h3>Stops</h3>{st.map((s, k) => <div key={`${s.from}${s.place}`} className="sp"><div className="sp-h"><MapPin size={17} /><span><b>{s.place || "No place set"}</b><small>{s.n > 1 ? `Days ${s.from + 1}–${s.from + s.n}` : `Day ${s.from + 1}`}</small></span><button className="ic" aria-label={`Fewer days in ${s.place}`} disabled={s.n < 2} onClick={() => setP(resizeStop(t, k, -1, lib))}><Minus size={16} /></button><i>{s.n}</i><button className="ic" aria-label={`More days in ${s.place}`} onClick={() => setP(resizeStop(t, k, 1, lib))}><Plus size={16} /></button></div>
      <City l="Change to" v="" first="Choose a new place" on={(to) => setAsk({ kind: "stop", k, to })} />
      <div className="row"><button className="btn" onClick={() => setIns(ins === k ? -1 : k)}><Plus size={15} />Stop after</button><button className="ic" aria-label={`Move ${s.place} earlier`} disabled={k < 2 || k === last} onClick={() => setP(moveStop(t, k, -1, lib))}><ArrowUp size={16} /></button><button className="ic" aria-label={`Move ${s.place} later`} disabled={k === 0 || k >= last - 1} onClick={() => setP(moveStop(t, k, 1, lib))}><ArrowDown size={16} /></button><button className="ic" aria-label={`Remove ${s.place}`} disabled={st.length < 2} onClick={() => setP(removeStop(t, k, lib))}><Trash2 size={16} /></button></div>
      {ins === k && <City l="New stop" v="" first="Choose a place" on={(to) => { setIns(-1); setAsk({ kind: "insert", k, to }); }} />}</div>)}
    <h3>Change one day only</h3><DayPick t={t} on={(k, to) => setAsk({ kind: "day", k, to })} />
    {ask && <RouteChange t={t} ask={ask} lib={lib} close={() => setAsk(null)} apply={apply} />}{p && <Preview t={t} p={p} close={() => setP(null)} apply={apply} />}</>;
}
function DayPick({ t, on }: { t: Trip; on: (k: number, to: string) => void }) {
  const [k, setK] = useState(0); const i = Math.min(k, t.days.length - 1);
  return <><S l="Day" v={String(i)} o={t.days.map((d, j) => [String(j), `Day ${j + 1}: ${d.title}`])} on={(v) => setK(+v)} /><City key={i} l="New destination" v="" first="Choose a place" on={(to) => on(i, to)} /></>;
}
