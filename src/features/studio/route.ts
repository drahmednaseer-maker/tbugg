import { PLACES } from "./data";
import { findHotel, newStay, paid, startOf } from "./hotels";
import { DAY_LIBRARY } from "./templates";
import { uid, type Day, type Hotel, type Stay, type Trip } from "./types";
import { addDays } from "./util";

/* Usual travel between cities. Times are approximate and shown to the team for confirmation. */
type Leg = { how: "Fly" | "Drive"; time: string };
const LEGS: Record<string, Leg> = {};
const leg = (how: Leg["how"], time: string, ...pairs: string[]) => pairs.forEach((p) => { const [a, b] = p.split(">"); LEGS[`${a}>${b}`] = LEGS[`${b}>${a}`] = { how, time }; });
leg("Fly", "1 hr flight", "Islamabad>Skardu", "Islamabad>Gilgit"); leg("Fly", "2 hrs flight", "Islamabad>Karachi", "Lahore>Karachi");
leg("Drive", "1 hr drive", "Skardu>Shigar", "Islamabad>Taxila", "Hunza>Passu", "Hunza>Nagar", "Murree>Nathia Gali"); leg("Drive", "2 hrs drive", "Gilgit>Hunza", "Gilgit>Nagar", "Passu>Khunjerab", "Islamabad>Murree", "Gilgit>Naltar");
leg("Drive", "2.5 hrs drive", "Islamabad>Nathia Gali"); leg("Drive", "3 hrs drive", "Skardu>Khaplu", "Skardu>Deosai", "Shigar>Khaplu", "Swat>Kalam", "Taxila>Takht-i-Bahi", "Takht-i-Bahi>Swat", "Hunza>Khunjerab", "Hunza>Naltar"); leg("Drive", "4-5 hrs drive", "Islamabad>Lahore", "Skardu>Gilgit");
leg("Drive", "5-6 hrs drive", "Islamabad>Swat", "Khaplu>Hushe", "Deosai>Minimarg"); leg("Drive", "6-7 hrs drive", "Skardu>Hunza", "Skardu>Nagar", "Islamabad>Naran", "Skardu>Askole"); leg("Drive", "8-9 hrs drive", "Naran>Hunza", "Islamabad>Neelum"); leg("Drive", "10-11 hrs drive", "Islamabad>Chitral");
export const legOf = (a: string, b: string): Leg | undefined => LEGS[`${a}>${b}`];
export const CITIES = Object.keys(PLACES).sort();

const SEP = /\s+to\s+|\s*[—→]\s*/;
const cityIn = (s: string) => CITIES.filter((c) => new RegExp(`\\b${c}\\b`, "i").test(s));
const places = (days: Day[]) => { let last = ""; return days.map((d) => (last = d.place || last)); };
export const startCity = (t: Trip) => { const d = t.days[0]; if (!d) return ""; const p = d.title.split(SEP); const c = p.length > 1 ? cityIn(p[0])[0] : ""; return c || d.place; };
export const endCity = (t: Trip) => { const d = t.days[t.days.length - 1]; if (!d) return ""; const p = d.title.split(SEP); const c = p.length > 1 ? cityIn(p[p.length - 1])[0] : ""; return c || places(t.days)[t.days.length - 1]; };
export interface Stop { place: string; from: number; n: number }
export const stops = (days: Day[]): Stop[] => { const out: Stop[] = []; places(days).forEach((p, i) => { const l = out[out.length - 1]; if (l && l.place === p) l.n++; else out.push({ place: p, from: i, n: 1 }); }); return out; };

const base = (o: Partial<Day>): Day => ({ id: uid(), title: "", place: "", body: "", bullets: [], meals: ["B", "D"], stay: "", camp: false, image: "", altitude: "", distance: "", time: "", ...o });
let cache: Day[] | null = null;
const libDays = () => (cache ??= DAY_LIBRARY().map((x) => x.day));
const cityPhoto = (c: string) => libDays().find((d) => d.place === c && d.image)?.image ?? "";
const isTravel = (d: Day) => SEP.test(d.title) || /^(arriv|fly|flight|depart|return|drive)|arrival|departure|\bdepart\b/i.test(d.title);
const isDeparture = (d: Day) => /^depart|^return to pakistan/i.test(d.title.trim());
const arrival = (c: string) => base({ title: `Arrival in ${c}`, place: c, body: `Meet and greet on arrival in ${c}, then transfer to your hotel.`, meals: ["D"], image: cityPhoto(c) });
const departure = (c: string) => base({ title: "Departure", place: c, body: `Transfer in ${c} for your onward journey.`, meals: ["B"] });
/** Ready-made sightseeing days for a city, then a plain day if there are not enough. */
function cityDays(c: string, n: number, used: string[]): Day[] {
  const seen = new Set(used.map((x) => x.toLowerCase())); const out: Day[] = [];
  for (const d of libDays()) if (out.length < n && d.place === c && !d.camp && !isTravel(d) && !/blossom|autumn|in gold|match day/i.test(`${d.title} ${d.body} ${d.bullets.join(" ")}`) && !cityIn(d.title).some((x) => x !== c) && !seen.has(d.title.toLowerCase())) { seen.add(d.title.toLowerCase()); out.push({ ...structuredClone(d), id: uid() }); }
  while (out.length < n) out.push(base({ title: out.length || used.includes(`Explore ${c}`) ? `${c} at leisure` : `Explore ${c}`, place: c, body: `A day in ${c} with your guide, shaped around your interests.`, image: cityPhoto(c) }));
  return out;
}
const MOVE = /\b(fly|flight|flights|flying|airport|motorway|meet and greet|landing)\b|\bdrive (to|from|back)\b|\bdrive\b.*\b(from|to)\b|\b(jeep|jeeps)\b.*\b(from|to)\b|\btransfer(red)? to\b|\breturn (journey|by|to)\b|^welcome at/i;
/** Rewrites a day so it travels from one city to another, keeping what is not about the old journey. */
function travel(d: Day, from: string, to: string, old = "", force = false): Day {
  const bad = (s: string) => MOVE.test(s) || (!!old && old !== from && old !== to && new RegExp(`\\b${old}\\b`, "i").test(s));
  const l = legOf(from, to); const line = l ? `${l.how} from ${from} to ${to} (about ${l.time.replace(/ (drive|flight)$/, "")}).` : `Travel from ${from} to ${to}.`;
  const kept = d.body.split(/(?<=[.!?])\s+/).filter((s) => s && !bad(s)).join(" "); const bullets = d.bullets.filter((b) => !bad(b));
  return { ...d, place: to, title: force || isTravel(d) || d.title === from || d.title === to ? `${from} to ${to}` : d.title, body: [line, kept].filter(Boolean).join(" "), bullets, distance: "", time: l?.time ?? "" };
}
/** Removes a journey from a day that no longer travels. */
function settle(d: Day, c: string): Day { return isTravel(d) && !isDeparture(d) ? { ...d, title: `Explore ${c}`, body: d.body.split(/(?<=[.!?])\s+/).filter((s) => s && !MOVE.test(s)).join(" ") || `A day in ${c} with your guide, shaped around your interests.`, bullets: d.bullets.filter((b) => !MOVE.test(b)), time: "", distance: "" } : d; }

export interface Change { before?: Day; after?: Day; at: number }
export interface Proposal { title: string; trip: Trip; changes: Change[]; notes: string[]; warn: string[] }
export type StartMode = "add" | "same" | "direct" | "replace";

/** Rebuilds legs, hotels and cover text after the list of days changed. */
function finish(t: Trip, raw: Day[], lib: Hotel[], title: string, opt: { origin?: string; overnight?: string[]; swap?: [string, string]; skip?: string[]; startShift?: number } = {}): Proposal {
  const warn: string[] = [], notes: string[] = []; const oldP = places(t.days), oldAt = new Map(t.days.map((d, i) => [d.id, i])); const s0 = startCity(t);
  const oldFrom = (id: string) => { const i = oldAt.get(id); return i === undefined ? undefined : i ? oldP[i - 1] : s0 === oldP[0] ? "" : s0; };
  let days = raw; const np = places(days);
  days = days.map((d, i) => {
    if (opt.skip?.includes(d.id)) return d;
    const from = i ? np[i - 1] : opt.origin !== undefined ? opt.origin : s0 !== oldP[0] && oldAt.get(d.id) === 0 ? s0 : "", of = oldFrom(d.id), p = np[i];
    if (of === from && oldP[oldAt.get(d.id) ?? -1] === p) return d;
    if (from && from !== p) return travel(d, from, p, of, i === 0);
    if (i === 0 && of !== undefined && (of || isTravel(d))) return { ...d, title: isTravel(d) ? `Arrival in ${p}` : d.title, body: `Meet and greet on arrival in ${p}, then transfer to your hotel. ${d.body.split(/(?<=[.!?])\s+/).filter((s) => s && !MOVE.test(s)).join(" ")}`.trim(), bullets: d.bullets.filter((b) => !MOVE.test(b)), time: "", distance: "" };
    return from === p && of !== undefined && of !== p ? settle(d, p) : d;
  });
  const n = days.length; const at = new Map(days.map((d, i) => [d.id, i]));
  /* hotels: keep what still fits, protect anything already booked or paid */
  const stays: Stay[] = []; const covered = new Set<string>();
  t.stays.forEach((s) => {
    if (s.status === "Cancelled") { stays.push(s); return; }
    const i = startOf(t, s); const ids = i < 0 ? [] : t.days.slice(i, i + s.nights).map((d) => d.id);
    const left = ids.filter((id) => at.has(id) && at.get(id)! < n - 1 && days[at.get(id)!].place === t.days[oldAt.get(id)!].place); const live = s.status !== "Not booked" || paid(s.payments) > 0 || !!s.ref;
    const run: string[] = []; for (const id of left) { if (run.length && at.get(id) !== at.get(run[run.length - 1])! + 1) break; run.push(id); }
    if (!run.length) { if (live) { stays.push({ ...s, status: "Cancelled", note: [s.note, "Removed by a route change. Cancel with the hotel."].filter(Boolean).join(" ") }); warn.push(`${s.name} (${s.status}${paid(s.payments) ? `, advance ${paid(s.payments).toLocaleString("en-US")} ${t.hotelCurrency}` : ""}) is no longer on the route. It is kept under Bookings as Cancelled so the advance is not lost.`); } return; }
    if (live && (run.length !== s.nights || (t.start && addDays(t.start, i).getTime() !== addDays(t.start, at.get(run[0])! + (opt.startShift ?? 0)).getTime()))) warn.push(`${s.name} is ${s.status.toLowerCase()} and its dates or nights change. Tell the hotel.`);
    run.forEach((id) => covered.add(id)); stays.push({ ...s, dayId: run[0], nights: run.length });
  });
  const tmp: Trip = { ...t, days, stays }; let cur: Stay | null = null, curAt = -2;
  days.forEach((d, i) => {
    const fresh = !oldAt.has(d.id) || opt.overnight?.includes(d.id);
    if (!fresh || covered.has(d.id) || d.camp || i === n - 1) return;
    const own = d.stay ? findHotel(lib, d.stay) : undefined; const h = own ?? lib.find((x) => x.city.toLowerCase() === d.place.toLowerCase()) ?? lib.find((x) => x.city.toLowerCase().includes(d.place.toLowerCase()) && !!d.place);
    if (!h) { if (!d.stay) notes.push(`No hotel saved for ${d.place}. Choose one for day ${i + 1}.`); return; }
    if (cur && cur.hotelId === h.id && curAt === i - 1) cur.nights++; else { cur = newStay(tmp, d.id, 1, h); stays.push(cur); notes.push(`${h.name}, ${h.city} suggested for day ${i + 1}. Choose the room in Hotels.`); } curAt = i;
  });
  days = days.map((d, i) => (i === n - 1 && n > 1 && d.stay ? { ...d, stay: "" } : d));
  const now = new Set([...places(days), startCity({ ...t, days })]); const gone = [...new Set([...oldP, s0, endCity(t)])].filter((c) => c && !now.has(c) && endCity({ ...t, days }) !== c);
  let subtitle = t.subtitle; if (subtitle.includes(" · ")) { const a = subtitle.split(" · ").map((x) => x.trim()); subtitle = [...new Set(a.map((x) => (opt.swap && x === opt.swap[0] && gone.includes(x) ? opt.swap[1] : x)).filter((x) => !gone.includes(x)))].join(" · ") || subtitle; }
  const trip: Trip = { ...t, days, stays, subtitle, start: t.start && opt.startShift ? addDays(t.start, opt.startShift).toISOString().slice(0, 10) : t.start };
  const where: [string, string][] = [["Title", t.title], ["Subtitle", subtitle], ["Introduction", t.intro], ["Highlights", t.highlights.map((g) => [g.title, ...g.items].join(" ")).join(" ")], ["Included", t.included.join(" ")], ["Price", t.prices.map((p) => p.label).join(" ")], ["Day text", days.map((d) => `${d.title} ${d.body} ${d.bullets.join(" ")}`).join(" ")]];
  gone.forEach((c) => { const f = where.filter(([, v]) => new RegExp(`\\b${c}\\b`, "i").test(v)).map(([k]) => k); if (f.length) notes.push(`${c} is still mentioned in: ${f.join(", ")}. Check the wording.`); });
  const fp = places(days); days.forEach((d, i) => { const from = i ? fp[i - 1] : startCity(trip); const was = t.days[oldAt.get(d.id) ?? -1]; if (from && from !== fp[i] && (!was || JSON.stringify(was) !== JSON.stringify(d))) { const l = legOf(from, fp[i]); if (!l) warn.push(`Day ${i + 1}: check how guests travel from ${from} to ${fp[i]} and how long it takes.`); else if (parseFloat(l.time.split("-").pop()!) >= 8) warn.push(`Day ${i + 1}: ${from} to ${fp[i]} is a long drive (${l.time}).`); else if (l.how === "Fly") notes.push(`Day ${i + 1}: check the ${from} to ${fp[i]} flight runs on that date.`); } });
  notes.push("Recheck the price: it was set for the old route.");
  const changes: Change[] = days.map((d, i) => { const w = t.days[oldAt.get(d.id) ?? -1]; return { before: w, after: d, at: i }; }); t.days.forEach((d, i) => { if (!at.has(d.id)) changes.push({ before: d, at: i }); });
  return { title, trip, changes, notes: [...new Set(notes)], warn: [...new Set(warn)] };
}

export function startModes(t: Trip, to: string): StartMode[] { const p = places(t.days); const k = p.indexOf(to); return [...(k > 0 ? (["direct"] as const) : []), "add", "same", ...((stops(t.days).length > 1 ? ["replace"] : []) as StartMode[])]; }
export function endModes(t: Trip, to: string): StartMode[] { const p = places(t.days); const k = p.lastIndexOf(to); return [...(k >= 0 && k < p.length - 1 && p.some((x, i) => i > k && x !== to) ? (["direct"] as const) : []), "add", "same", ...((stops(t.days).length > 1 ? ["replace"] : []) as StartMode[])]; }
export function changeStart(t: Trip, to: string, mode: StartMode, keepDates: boolean, lib: Hotel[]): Proposal {
  const title = `Start from ${to}`; const p = places(t.days);
  if (mode === "direct") { const k = p.indexOf(to); return finish(t, t.days.slice(k), lib, title, { origin: "", startShift: keepDates ? k : 0 }); }
  if (mode === "add") return finish(t, [arrival(to), ...t.days], lib, title, { startShift: keepDates ? -1 : 0 });
  if (mode === "same") return finish(t, t.days, lib, title, { origin: to });
  return changeStop(t, 0, to, lib, title);
}
export function changeEnd(t: Trip, to: string, mode: StartMode, lib: Hotel[]): Proposal {
  const title = `End in ${to}`; const p = places(t.days), n = t.days.length, last = t.days[n - 1], from = p[n - 1];
  if (mode === "direct") { const k = p.lastIndexOf(to); return finish(t, [...t.days.slice(0, k + 1), departure(to)], lib, title, { overnight: [t.days[k].id] }); }
  const go = travel({ ...last, title: `${from} to ${to}`, body: "", bullets: [] }, from, to);
  if (mode === "same") { const d = { ...travel({ ...last, title: `${from} to ${to}` }, from, to, endCity(t) === from ? "" : endCity(t)), title: `${from} to ${to} and departure`, stay: "", image: last.image }; return finish(t, [...t.days.slice(0, -1), d], lib, title, { skip: [d.id] }); }
  if (mode === "add") {
    if (isDeparture(last)) { const d = { ...go, image: cityPhoto(to), meals: ["B", "D"] as Day["meals"], stay: "" }; return finish(t, [...t.days.slice(0, -1), d, departure(to)], lib, title, { skip: [d.id], overnight: [d.id] }); }
    const d = { ...go, id: uid(), title: `${from} to ${to} and departure`, meals: ["B"] as Day["meals"], stay: "", camp: false, altitude: "", image: cityPhoto(to) }; return finish(t, [...t.days, d], lib, title, { skip: [d.id], overnight: [last.id] });
  }
  return changeStop(t, stops(t.days).length - 1, to, lib, title);
}
const swapDays = (t: Trip, from: number, n: number, to: string): Day[] => { const last = t.days.length - 1; const inner = t.days.slice(from, from + n); const used = t.days.filter((_, i) => i < from || i >= from + n).map((d) => d.title); const lib = cityDays(to, n, used); return inner.map((d, k) => { const i = from + k; return i === 0 ? arrival(to) : i === last ? departure(to) : lib[k]; }); };
export function changeStop(t: Trip, k: number, to: string, lib: Hotel[], title?: string): Proposal { const s = stops(t.days)[k]; return changeDays(t, s.from, s.n, to, lib, title); }
export function changeDays(t: Trip, from: number, n: number, to: string, lib: Hotel[], title?: string): Proposal { const old = places(t.days)[from]; const only = !places(t.days).some((p, i) => p === old && (i < from || i >= from + n)); return finish(t, [...t.days.slice(0, from), ...swapDays(t, from, n, to), ...t.days.slice(from + n)], lib, title ?? `${old || `Day ${from + 1}`} becomes ${to}`, { origin: from === 0 ? "" : undefined, swap: only && old ? [old, to] : undefined }); }
export function insertStop(t: Trip, after: number, to: string, n: number, lib: Hotel[]): Proposal { const s = stops(t.days)[after]; let at = s.from + s.n; if (at === t.days.length && isDeparture(t.days[at - 1])) at--; return finish(t, [...t.days.slice(0, at), ...cityDays(to, n, t.days.map((d) => d.title)), ...t.days.slice(at)], lib, `Add ${to}`); }
export function removeStop(t: Trip, k: number, lib: Hotel[]): Proposal { const s = stops(t.days)[k]; return finish(t, [...t.days.slice(0, s.from), ...t.days.slice(s.from + s.n)], lib, `Remove ${s.place}`, { origin: k === 0 ? "" : undefined }); }
export function resizeStop(t: Trip, k: number, by: 1 | -1, lib: Hotel[]): Proposal { const s = stops(t.days)[k]; let end = s.from + s.n; if (end === t.days.length && isDeparture(t.days[end - 1])) end--; const d = [...t.days]; if (by > 0) d.splice(end, 0, ...cityDays(s.place, 1, t.days.map((x) => x.title))); else d.splice(end - 1, 1); return finish(t, d, lib, `${s.place}: ${s.n + by} day${s.n + by > 1 ? "s" : ""}`); }
export function moveStop(t: Trip, k: number, by: 1 | -1, lib: Hotel[]): Proposal { const s = stops(t.days).map((x) => t.days.slice(x.from, x.from + x.n)); [s[k], s[k + by]] = [s[k + by], s[k]]; return finish(t, s.flat(), lib, `Move ${s[k + by][0].place}`); }
