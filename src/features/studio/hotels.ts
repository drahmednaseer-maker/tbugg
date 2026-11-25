import { LIB } from "./hotelData";
import { uid, type Day, type Hotel, type Payment, type Stay, type StayRoom, type Trip } from "./types";
import { addDays, fmtFull, fmtShort, money, num } from "./util";

export const BEDS = ["Master bed (king)", "Master bed (queen)", "Double bed", "Twin beds", "Triple (3 beds)", "Family room (4 beds)", "Single bed", "Master bed + 1 single", "Master bed + extra mattress"];
export const FACILITIES = ["Wi-Fi", "Hot water", "Heating", "Air conditioning", "Restaurant", "Room service", "Parking", "Backup power", "Prayer area", "Mountain view", "Lake view", "River view", "Balcony", "Garden", "Swimming pool", "Gym", "Spa", "Laundry", "Airport transfer", "Family friendly", "Attached bathroom", "TV", "Tea & coffee maker", "Mini fridge", "Wheelchair access"];
export const MEALS = ["Room only", "Bed & breakfast", "Half board (breakfast & dinner)", "Full board (all meals)"];
export const STATUS = ["Not booked", "Requested", "On hold", "Confirmed", "Cancelled"] as const;

const key = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\b(hotel|resort|the|by|inn)\b/g, " ").split(/\s+/).filter(Boolean).sort().join(" ");
export const findHotel = (lib: Hotel[], name: string) => { const k = key(name); return lib.find((h) => key(h.name) === k || key(`${h.name} ${h.city}`) === k); };
/** Built-in hotels with the team's own edits on top. */
export const library = (own: Hotel[]): Hotel[] => [...own, ...LIB.filter((h) => !own.some((o) => o.id === h.id))].sort((a, b) => a.name.localeCompare(b.name));

export const stayLabel = (s: Stay) => (s.city && !s.name.toLowerCase().includes(s.city.toLowerCase()) ? `${s.name}, ${s.city}` : s.name);
export const startOf = (t: Trip, s: Stay) => t.days.findIndex((d) => d.id === s.dayId);
export const sorted = (t: Trip) => [...t.stays].sort((a, b) => startOf(t, a) - startOf(t, b));
export const stayDates = (t: Trip, s: Stay) => { const i = startOf(t, s); if (i < 0) return { in: "", out: "", iso: "" }; if (!t.start) return { in: `Day ${i + 1}`, out: `Day ${i + 1 + s.nights}`, iso: "" }; return { in: fmtFull(addDays(t.start, i)), out: fmtFull(addDays(t.start, i + s.nights)), iso: addDays(t.start, i).toISOString().slice(0, 10) }; };
export const shortDates = (t: Trip, s: Stay) => { const i = startOf(t, s); return i < 0 ? "Not placed" : t.start ? `${fmtShort(addDays(t.start, i))} – ${fmtShort(addDays(t.start, i + s.nights))}` : `Day ${i + 1} – ${i + 1 + s.nights}`; };
export const paid = (p: Payment[]) => p.reduce((a, x) => a + num(x.amount), 0);
export const stayTotal = (s: Stay) => num(s.total) || s.rooms.reduce((a, r) => a + num(r.rate) * (num(r.qty) || 1) * s.nights, 0);
export const capacity = (s: Stay) => s.rooms.reduce((a, r) => a + (num(r.qty) || 0) * (num(r.guests) || 0), 0);
export const guestDue = (t: Trip) => num(t.guestTotal) || num(t.prices[0]?.amount ?? "") * (num(t.pax) || 1);
const live = (t: Trip) => t.stays.filter((s) => s.status !== "Cancelled");
export const summary = (t: Trip) => { const l = live(t); const due = guestDue(t), got = paid(t.payments); return { booked: l.filter((s) => s.status === "Confirmed").length, hotels: l.length, hotelTotal: l.reduce((a, s) => a + stayTotal(s), 0), hotelPaid: l.reduce((a, s) => a + paid(s.payments), 0), due, got, left: Math.max(0, due - got) }; };
export const guestState = (t: Trip) => { const { due, got } = summary(t); return !got ? "No advance received" : due && got >= due ? "Fully paid" : due ? `Advance received: ${Math.round((got / due) * 100)}%` : "Advance received"; };

export const newStay = (t: Trip, dayId: string, nights: number, h?: Hotel, name = ""): Stay => ({ id: uid(), dayId, nights, hotelId: h?.id ?? "", name: h?.name ?? name, city: h?.city ?? t.days.find((d) => d.id === dayId)?.place ?? "", stars: h?.stars ?? 0, facilities: [...(h?.facilities ?? [])], photos: [...(h?.photos ?? [])], rooms: [], meal: "", status: "Not booked", ref: "", payBy: "", total: "", payments: [], note: "" });
export const newRoom = (t: Trip, s: Stay, h: Hotel | undefined, roomId: string): StayRoom => {
  const r = h?.rooms.find((x) => x.id === roomId); const guests = r?.sleeps && r.sleeps < 2 ? r.sleeps : Math.min(2, r?.sleeps || 2);
  const need = Math.max(1, num(t.pax) - capacity(s));
  return { id: uid(), roomId: r?.id ?? "", name: r?.name ?? "Room", bed: r ? r.bed : "Double bed", qty: String(Math.ceil(need / guests)), guests: String(guests), facilities: [...(r?.facilities ?? [])], photos: [...(r?.photos ?? [])], rate: "" };
};
/** Turns the hotel names already typed on the days into stays. */
export function staysFromDays(t: Trip, lib: Hotel[]): Stay[] {
  const out: Stay[] = [];
  t.days.forEach((d, i) => { if (!d.stay || d.camp || i === t.days.length - 1) return; const l = out[out.length - 1]; const at = l ? startOf(t, l) : -1; if (l && l.name === d.stay && at + l.nights === i) l.nights++; else out.push(newStay(t, d.id, 1, undefined, d.stay)); });
  return out.map((s) => { const h = findHotel(lib, s.name); return h ? { ...newStay(t, s.dayId, s.nights, h), id: s.id } : s; }).filter((s) => s.name !== "Hotel in Skardu");
}
/** Keeps each day's hotel name in step with the stays. */
export function sync(prev: Trip, t: Trip): Trip {
  if (prev.days === t.days && prev.stays === t.stays) return t;
  const cover = (x: Trip) => { const m = new Map<string, Stay>(); x.stays.forEach((s) => { if (s.status === "Cancelled") return; const i = startOf(x, s); if (i >= 0) x.days.slice(i, i + s.nights).forEach((d) => m.set(d.id, s)); }); return m; };
  const was = cover(prev), now = cover(t); let dirty = false;
  const days = t.days.map((d): Day => { const s = now.get(d.id), w = was.get(d.id); const stay = s ? stayLabel(s) : w && d.stay === stayLabel(w) ? "" : d.stay; const camp = s ? false : d.camp; if (stay === d.stay && camp === d.camp) return d; dirty = true; return { ...d, stay, camp }; });
  return dirty ? { ...t, days } : t;
}
/** Pulls new photos and facilities from the hotel library into a trip. */
export const refreshStays = (t: Trip, h: Hotel): Stay[] => t.stays.map((s) => (s.hotelId !== h.id ? s : { ...s, name: h.name, city: h.city, stars: h.stars, facilities: [...h.facilities], photos: [...h.photos], rooms: s.rooms.map((r) => { const x = h.rooms.find((q) => q.id === r.roomId); return x ? { ...r, name: x.name, facilities: [...x.facilities], photos: [...x.photos] } : r; }) }));

export function stayIssues(t: Trip): { level: "must" | "warn" | "tip"; text: string; panel: string }[] {
  const out: { level: "must" | "warn" | "tip"; text: string; panel: string }[] = []; const today = new Date().toISOString().slice(0, 10); const seen = new Map<number, string>();
  sorted(t).filter((s) => s.status !== "Cancelled").forEach((s) => {
    const i = startOf(t, s); const add = (level: "must" | "warn" | "tip", text: string, panel = "hotels") => out.push({ level, text: `${s.name || "Hotel"}: ${text}`, panel });
    if (i < 0) { add("must", "its check-in day was removed. Choose a new day."); return; }
    if (i + s.nights > t.days.length) add("must", "stay runs past the last day.");
    for (let k = i; k < i + s.nights; k++) { if (seen.has(k)) add("must", `night of day ${k + 1} is also at ${seen.get(k)}.`); seen.set(k, s.name); }
    if (s.rooms.some((r) => !r.bed)) add("warn", "choose the bed type.");
    if (!s.rooms.length) add("warn", "no room chosen."); else if (num(t.pax) && capacity(s) < num(t.pax)) add("warn", `rooms hold ${capacity(s)} of ${t.pax} guests.`);
    if (s.rooms.length && !s.photos.length && !s.rooms.some((r) => r.photos.length)) add("tip", "no photos yet. Add them once in the hotel library.");
    const iso = stayDates(t, s).iso; if (iso && s.status !== "Confirmed") { const left = Math.round((Date.parse(iso) - Date.parse(today)) / 864e5); if (left >= 0 && left <= 45) add("warn", `not confirmed and check-in is in ${left} days.`, "bookings"); }
    if (s.payBy && s.payBy < today && paid(s.payments) < stayTotal(s)) add("must", "payment date has passed.", "bookings");
  });
  return out;
}
export function bookingText(t: Trip): string {
  const s = summary(t), c = t.hotelCurrency; const m = (n: number, k: string) => money(n, k);
  return [`${t.name}${t.client ? ` (${t.client})` : ""}`, `Guests: ${t.pax}`, "", `GUEST PAYMENT: ${guestState(t)}`, `Total ${m(s.due, t.currency)} | Received ${m(s.got, t.currency)} | Balance ${m(s.left, t.currency)}`, ...t.payments.filter((p) => num(p.amount)).map((p) => `- ${p.date || "no date"}: ${m(num(p.amount), t.currency)} ${p.note}`), "", `HOTELS: ${s.booked} of ${s.hotels} confirmed`,
    ...sorted(t).map((x) => `- ${x.name}, ${shortDates(t, x)}, ${x.rooms.map((r) => `${r.qty} x ${r.name} (${r.bed || "bed not chosen"})`).join(" + ") || "no room chosen"}: ${x.status}${x.ref ? ` ref ${x.ref}` : ""}. Total ${m(stayTotal(x), c)}, advance ${m(paid(x.payments), c)}, balance ${m(Math.max(0, stayTotal(x) - paid(x.payments)), c)}${x.payBy ? `, pay by ${x.payBy}` : ""}`), "", `Hotels total ${m(s.hotelTotal, c)} | Advance paid ${m(s.hotelPaid, c)} | Balance ${m(Math.max(0, s.hotelTotal - s.hotelPaid), c)}`].join("\n");
}
