import { INCLUDED } from "./data";
import type { Company, Day, Trip } from "./types";
import { blank } from "./templates";

export function setPath<T>(obj: T, path: string, val: unknown): T {
  const [k, ...rest] = path.split(".");
  const src = obj as unknown as Record<string, unknown>;
  const copy = (Array.isArray(obj) ? [...obj] : { ...src }) as Record<string, unknown>;
  copy[k] = rest.length ? setPath(src[k], rest.join("."), val) : val;
  return copy as unknown as T;
}
export const addDays = (iso: string, n: number) => { const [y, m, d] = iso.split("-").map(Number); return new Date(Date.UTC(y, m - 1, d + n)); };
const f = (o: Intl.DateTimeFormatOptions) => (dt: Date) => new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", ...o }).format(dt);
export const fmtDay = f({ weekday: "long", day: "numeric", month: "long" });
export const fmtShort = f({ day: "numeric", month: "short" });
export const fmtFull = f({ day: "numeric", month: "long", year: "numeric" });
const fmtDM = f({ day: "numeric", month: "long" });
export const dateRange = (t: Trip) => {
  if (!t.start || !t.days.length) return "";
  const a = addDays(t.start, 0), b = addDays(t.start, t.days.length - 1);
  if (t.days.length === 1) return fmtFull(a);
  return `${a.getUTCFullYear() !== b.getUTCFullYear() ? fmtFull(a) : a.getUTCMonth() !== b.getUTCMonth() ? fmtDM(a) : a.getUTCDate()} – ${fmtFull(b)}`;
};
export const duration = (t: Trip) => { const n = t.days.length; return n === 1 ? "1 Day" : n ? `${n} Day${n > 1 ? "s" : ""} & ${n - 1} Night${n === 2 ? "" : "s"}` : ""; };
export const num = (s: string) => Number(String(s).replace(/,/g, "").match(/\d+(\.\d+)?/)?.[0] ?? 0);
export const money = (n: number, c: string) => `${c} ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n)}`;
export const metres = (d: Day) => num(d.altitude);
/** "src#x,y" carries the photo's focal point. */
export const photo = (s: string) => { const i = s.startsWith("data:") ? s.lastIndexOf("#") : s.indexOf("#"); return i < 0 ? { src: s, pos: "50% 50%" } : { src: s.slice(0, i), pos: s.slice(i + 1).split(",").map((v) => `${v}%`).join(" ") }; };

export interface Issue { level: "must" | "warn" | "tip"; text: string; panel: string }
export function check(t: Trip, c: Company): Issue[] {
  const out: Issue[] = [];
  const add = (level: Issue["level"], text: string, panel: string) => out.push({ level, text, panel });
  const on = (s: Trip["order"][number]) => !t.hidden.includes(s);
  if (!t.start && on("days")) add("must", "Set a start date so every day is dated automatically.", "trip");
  if (!t.client && t.status === "Proposal") add("warn", "No guest name on the cover.", "trip");
  if (!t.cover) add("must", "Add a cover photo.", "photos");
  if (!t.backImage && on("back")) add("must", "Add a back cover photo.", "photos");
  if (on("price") && !t.prices.some((p) => num(p.amount))) add("must", "No price entered: the price page shows “On request”.", "price");
  if (on("price") && !c.bank) add("warn", "Bank details are empty. Add them once under Company.", "company");
  if (on("price") && !t.validUntil) add("tip", "Add a ‘valid until’ date to protect your quote.", "price");
  if (t.showLocal && t.showLocal !== t.currency && !num(t.rate)) add("tip", `Check today's ${t.showLocal} rate on the price panel.`, "price");
  t.days.forEach((d, i) => {
    if (!d.title.trim()) add("must", `Day ${i + 1} has no title.`, "days");
    if (!d.image && t.dayLayout !== "compact") add("tip", `Day ${i + 1} has no photo.`, "days");
    if (i < t.days.length - 1 && !d.stay && on("stays")) add("tip", `Day ${i + 1} has no hotel.`, "days");
    if (Math.max(0, ...(d.time.match(/\d+(\.\d+)?/g) ?? []).map(Number)) >= 8 && /h/i.test(d.time) && /drive/i.test(d.time)) add("warn", `Day ${i + 1} is a long drive. Consider splitting it.`, "days");
    if (/\[[^\]]+\]/.test(d.bullets.join(" ") + d.body)) add("tip", `Day ${i + 1} still has [placeholders].`, "days");
    if (t.start) {
      const m = addDays(t.start, i).getUTCMonth() + 1; const text = `${d.title} ${d.body} ${d.bullets.join(" ")}`;
      if (/babusar/i.test(text) && (m >= 11 || m <= 5)) add("must", `Day ${i + 1}: Babusar Pass is normally closed November to May. Use the Karakoram Highway.`, "days");
      if (/deosai|sheosar/i.test(text) && (m >= 11 || m <= 5)) add("must", `Day ${i + 1}: Deosai is normally snowbound in this month.`, "days");
      if (/concordia|k2 base/i.test(text) && (m < 6 || m > 9)) add("must", `Day ${i + 1}: the K2 trek season is June to September.`, "days");
      if (/blossoms/i.test(text) && (m < 3 || m > 4)) add("warn", `Day ${i + 1} mentions blossoms, but the date is outside March–April.`, "days");
    }
  });
  if (t.included.some((x) => t.excluded.some((y) => x.toLowerCase() === y.toLowerCase()))) add("must", "The same service is both included and not included.", "lists");
  if (t.market && !t.included.includes(INCLUDED[17])) add("tip", "Foreign guests usually need an invitation letter. Add it to Included.", "lists");
  return out;
}

/* ── IndexedDB: photos make localStorage too small ── */
const open = () => new Promise<IDBDatabase>((ok, no) => {
  const r = indexedDB.open("travelbug-studio", 1);
  r.onupgradeneeded = () => { r.result.createObjectStore("trips", { keyPath: "id" }); r.result.createObjectStore("kv"); };
  r.onsuccess = () => ok(r.result); r.onerror = () => no(r.error);
});
let dbp: Promise<IDBDatabase> | null = null;
async function run<T>(store: string, mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await (dbp ??= open());
  return new Promise((ok, no) => { const tx = db.transaction(store, mode); const r = fn(tx.objectStore(store)); tx.oncomplete = () => ok(r.result); tx.onerror = () => no(tx.error); tx.onabort = () => no(tx.error); });
}
export const db = {
  list: () => run<Trip[]>("trips", "readonly", (s) => s.getAll()), save: (t: Trip) => run("trips", "readwrite", (s) => s.put(t)),
  del: (id: string) => run("trips", "readwrite", (s) => s.delete(id)), getKv: <T,>(k: string) => run<T>("kv", "readonly", (s) => s.get(k)), setKv: (k: string, v: unknown) => run("kv", "readwrite", (s) => s.put(v, k)),
};

/* ── Share payload: compressed, with internal numbers and bank details removed ── */
const b64 = (u: Uint8Array) => { let s = ""; for (const x of u) s += String.fromCharCode(x); return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); };
const pipe = async (data: BlobPart, tr: CompressionStream | DecompressionStream) => new Uint8Array(await new Response(new Blob([data]).stream().pipeThrough(tr)).arrayBuffer());
export async function pack(t: Trip, c: Company) {
  let dropped = 0;
  const clean = JSON.parse(JSON.stringify({ ...t, costs: [], markup: "", commission: "" }), (_k, v) => { if (typeof v === "string" && v.startsWith("data:")) { dropped++; return ""; } return v; });
  return { dropped, data: b64(await pipe(JSON.stringify({ t: clean, c: { ...c, bank: "" } }), new CompressionStream("deflate-raw"))) };
}
export async function unpack(s: string): Promise<{ t: Trip; c: Company }> {
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/")); const u = Uint8Array.from(bin, (x) => x.charCodeAt(0));
  const o = JSON.parse(new TextDecoder().decode(await pipe(u, new DecompressionStream("deflate-raw"))));
  return { t: blank(o.t), c: o.c };
}
export const shrink = (file: File) => new Promise<string>((ok, no) => {
  const url = URL.createObjectURL(file); const im = new Image();
  im.onload = () => { const s = Math.min(1, 1700 / Math.max(im.width, im.height)); const c = document.createElement("canvas"); c.width = im.width * s; c.height = im.height * s; c.getContext("2d")!.drawImage(im, 0, 0, c.width, c.height); URL.revokeObjectURL(url); ok(c.toDataURL("image/jpeg", 0.86)); };
  im.onerror = () => no(new Error("That file is not a readable image.")); im.src = url;
});
const save = (url: string, name: string) => { const a = document.createElement("a"); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); };
export const saveJson = (t: Trip) => { const u = URL.createObjectURL(new Blob([JSON.stringify(t)], { type: "application/json" })); save(u, `${t.name}.travelbug.json`); setTimeout(() => URL.revokeObjectURL(u), 2000); };
/** Renders each page at 2x, one at a time. */
export async function exportPages(root: HTMLElement, name: string, kind: "pdf" | "images", step: (s: string) => void) {
  const { domToJpeg } = await import("modern-screenshot");
  const pages = [...root.querySelectorAll<HTMLElement>(".pg")];
  await document.fonts.ready;
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ unit: "px", format: [810, 1012], hotfixes: ["px_scaling"], compress: true });
  for (let i = 0; i < pages.length; i++) {
    step(`Page ${i + 1} of ${pages.length}`);
    await Promise.all([...pages[i].querySelectorAll("img")].map((im) => im.decode().catch(() => {})));
    const img = await domToJpeg(pages[i], { quality: 0.92, scale: 2, width: 810, height: 1012, filter: (n) => !(n instanceof HTMLElement && n.classList.contains("noprint")) });
    if (kind === "images") { save(img, `${name} ${String(i + 1).padStart(2, "0")}.jpg`); await new Promise((r) => setTimeout(r, 250)); }
    else { if (i) pdf.addPage([810, 1012]); pdf.addImage(img, "JPEG", 0, 0, 810, 1012, undefined, "FAST"); }
  }
  if (kind === "pdf") pdf.save(`${name}.pdf`);
}
