import { blank } from "./templates";
import { uid, type Hotel, type Trip } from "./types";
import { db } from "./util";

/** A light copy of a trip: enough for the list, without text and photos. */
export interface Card { trip: Trip; rev: number; by: string; at: number; local?: boolean }
interface Sync { rev: number; dirty: boolean }
class Api extends Error { constructor(public code: string, public rev = 0) { super(code); } }
async function call<T>(body: object): Promise<T> {
  const r = await fetch("/api/itineraries/store", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const o = await r.json().catch(() => ({})); if (!r.ok) throw new Api(o.error ?? String(r.status), o.rev); return o as T;
}
export const codeOf = (e: unknown) => (e instanceof Api ? e.code : "offline");
export const me = () => { try { return localStorage.getItem("tb-name") ?? ""; } catch { return ""; } };
export const setMe = (v: string) => { try { localStorage.setItem("tb-name", v); } catch { /* private mode */ } };
export const getSync = async (id: string) => (await db.getKv<Sync>(`sync:${id}`).catch(() => undefined)) ?? { rev: 0, dirty: false };
export const setSync = (id: string, s: Sync) => db.setKv(`sync:${id}`, s).catch(() => {});

/* ── photos are stored once by fingerprint ── */
const sha = async (s: string) => [...new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)))].map((x) => x.toString(16).padStart(2, "0")).join("");
const cut = (v: string) => { const i = v.lastIndexOf("#"); return i > 0 ? [v.slice(0, i), v.slice(i)] : [v, ""]; };
async function smaller(data: string): Promise<string> {
  if (data.length < 850_000 && /^data:image\/(jpeg|png|webp);base64,/.test(data)) return data;
  const im = new Image(); im.src = data; await im.decode(); let w = Math.min(1400, im.width), q = 0.82;
  for (let k = 0; k < 6; k++) { const c = document.createElement("canvas"); c.width = w; c.height = (im.height * w) / im.width; c.getContext("2d")!.drawImage(im, 0, 0, c.width, c.height); const d = c.toDataURL("image/jpeg", q); if (d.length < 850_000) return d; w *= 0.8; q -= 0.06; }
  throw new Error("photo too large");
}
const strings = (o: unknown, f: (s: string) => string): unknown => (typeof o === "string" ? f(o) : Array.isArray(o) ? o.map((x) => strings(x, f)) : o && typeof o === "object" ? Object.fromEntries(Object.entries(o).map(([k, v]) => [k, strings(v, f)])) : o);
async function upload<T>(o: T): Promise<T> {
  const set = new Set<string>(); strings(o, (s) => { if (s.startsWith("data:")) set.add(cut(s)[0]); return s; }); if (!set.size) return o;
  const ids = new Map<string, string>(); for (const d of set) ids.set(d, await sha(d));
  const { missing } = await call<{ missing: string[] }>({ op: "have", ids: [...ids.values()] });
  for (const [d, id] of ids) { if (missing.includes(id)) await call({ op: "photo", id, data: await smaller(d) }); await db.setKv(`ph:${id}`, d).catch(() => {}); }
  return strings(o, (s) => { if (!s.startsWith("data:")) return s; const [d, f] = cut(s); return `cloud:${ids.get(d)}${f}`; }) as T;
}
async function download<T>(o: T): Promise<T> {
  const set = new Set<string>(); strings(o, (s) => { if (s.startsWith("cloud:")) set.add(cut(s)[0].slice(6)); return s; }); const got = new Map<string, string>();
  await Promise.all([...set].map(async (id) => { let d = await db.getKv<string>(`ph:${id}`).catch(() => undefined); if (!d) { try { d = (await call<{ data: string }>({ op: "pic", id })).data; db.setKv(`ph:${id}`, d).catch(() => {}); } catch (e) { if (codeOf(e) !== "gone") throw e; } } if (d) got.set(id, d); }));
  return strings(o, (s) => { if (!s.startsWith("cloud:")) return s; const [d, f] = cut(s); const g = got.get(d.slice(6)); return g ? g + f : ""; }) as T;
}

export const light = (t: Trip): Partial<Trip> => ({ id: t.id, updated: t.updated, name: t.name, client: t.client, status: t.status, start: t.start, pax: t.pax, currency: t.currency, hotelCurrency: t.hotelCurrency, guestTotal: t.guestTotal, payments: t.payments, prices: t.prices.slice(0, 1), cover: t.cover.startsWith("data:") ? "" : t.cover, days: t.days.map((d) => ({ ...d, title: "", body: "", bullets: [], image: "" })), stays: t.stays.map((s) => ({ ...s, photos: [], facilities: [], rooms: s.rooms.map((r) => ({ ...r, photos: [], facilities: [] })) })) });
export async function remoteList(): Promise<{ cards: Card[]; hotels: Hotel[] }> {
  const o = await call<{ trips: { id: string; rev: number; by: string; at: number; c: string }[]; hotels: Hotel[] }>({ op: "list" });
  return { cards: o.trips.map((m) => ({ trip: blank(JSON.parse(m.c)), rev: m.rev, by: m.by, at: m.at })), hotels: o.hotels };
}
export const loadHotels = (h: Hotel[]) => download(h);
export async function pull(id: string): Promise<Trip> { const o = await call<{ trip: Trip; meta: { rev: number } }>({ op: "get", id }); const t = blank(await download(o.trip)); await db.save(t); await setSync(id, { rev: o.meta.rev, dirty: false }); return t; }
/** Sends a trip. If a teammate saved first, our version is kept as a copy and theirs is loaded. */
export async function push(t: Trip): Promise<{ rev: number } | { copy: Trip; theirs: Trip }> {
  const s = await getSync(t.id);
  try { const trip = await upload(t); const { rev } = await call<{ rev: number }>({ op: "save", trip, card: light(t), rev: s.rev, by: me() }); await setSync(t.id, { rev, dirty: false }); return { rev }; }
  catch (e) {
    if (codeOf(e) !== "conflict") throw e;
    const copy: Trip = { ...structuredClone(t), id: uid(), name: `${t.name} (${me() || "my"} copy)`, updated: Date.now() }; await db.save(copy); await setSync(copy.id, { rev: 0, dirty: true });
    if ((e as Api).rev === 0) { await db.del(t.id); await setSync(t.id, { rev: 0, dirty: false }); return { copy, theirs: copy }; }
    return { copy, theirs: await pull(t.id) };
  }
}
export const remoteDelete = async (id: string) => { await call({ op: "del", id }); await setSync(id, { rev: 0, dirty: false }); };
export const pushHotel = async (h: Hotel) => call({ op: "hotel", hotel: await upload(h) });
export const deleteHotel = (id: string) => call({ op: "hotelDel", id });
/** Brings this device and the team list together. */
export async function syncAll(openId: string): Promise<{ cards: Card[]; hotels: Hotel[]; failed: number }> {
  const local = await db.list(); let r = await remoteList(); let failed = 0, sent = false; const on = new Map(r.cards.map((c) => [c.trip.id, c]));
  for (const t of local) {
    if (t.id === openId) continue; const s = await getSync(t.id);
    if (!on.has(t.id) && s.rev > 0 && !s.dirty) { await db.del(t.id); continue; } // a teammate deleted it
    if (s.dirty || (!on.has(t.id) && s.rev === 0)) { try { if (!on.has(t.id) && s.rev > 0) await setSync(t.id, { rev: 0, dirty: true }); await push(blank(t)); sent = true; } catch { failed++; } }
  }
  if (sent) r = await remoteList(); return { ...r, failed };
}
export const ago = (at: number) => { const m = Math.round((Date.now() - at) / 6e4); return m < 1 ? "just now" : m < 60 ? `${m} min ago` : m < 1440 ? `${Math.round(m / 60)} h ago` : `${Math.round(m / 1440)} d ago`; };
