// ─── Itinerary Store (localStorage) ──────────────────────────────────────────
// All itineraries are stored under travelbug_itineraries.
// Structure: { [normalizedPhone]: SavedItinerary[] }

export type RouteStop = {
  id: string;
  name: string;
  region: string;
  image: string;
  nights: number;
};

export type SavedItinerary = {
  id: string;                  // timestamp-based unique id
  phone: string;               // normalized phone
  createdAt: string;           // ISO string
  updatedAt: string;           // ISO string
  tripName: string;            // e.g. "Hunza · Skardu · Fairy Meadows"
  route: RouteStop[];
  maleAdults: number;
  femaleAdults: number;
  children: number;
  childAges: number[];
  transport: string;
  departure: string;
  hotels: Record<string, string>;   // destId → chosen hotel name (or the traveller's own)
  totalNights: number;
  status: "pending" | "confirmed" | "modified";
  notes?: string;              // optional "additional requirements" from the traveller
  note?: string;               // optional TravelBug note / change
};

const LS_KEY = "travelbug_itineraries";
const LS_PHONE = "travelbug_phone";

/** Normalize a Pakistani phone number to a consistent key */
export function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  // 03xx → 923xx, 923xx stays, +923xx strips +
  if (digits.startsWith("923")) return digits;
  if (digits.startsWith("03"))  return "92" + digits.slice(1);
  return digits;
}

function readAll(): Record<string, SavedItinerary[]> {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

/** Load all itineraries for a phone number */
export function loadItineraries(rawPhone: string): SavedItinerary[] {
  const key = normalizePhone(rawPhone);
  return readAll()[key] ?? [];
}

/** Save a new itinerary (appends, does not overwrite) */
export function saveItinerary(itinerary: SavedItinerary): void {
  try {
    const all = readAll();
    const key = normalizePhone(itinerary.phone);
    all[key] = [itinerary, ...(all[key] ?? [])];
    localStorage.setItem(LS_KEY, JSON.stringify(all));
  } catch {/* storage full or unavailable */}
}

/** Update an existing itinerary by id */
export function updateItinerary(
  rawPhone: string,
  id: string,
  patch: Partial<SavedItinerary>
): void {
  try {
    const all = readAll();
    const key = normalizePhone(rawPhone);
    all[key] = (all[key] ?? []).map(it =>
      it.id === id ? { ...it, ...patch, updatedAt: new Date().toISOString() } : it
    );
    localStorage.setItem(LS_KEY, JSON.stringify(all));
  } catch {}
}

/** Delete an itinerary by id */
export function deleteItinerary(rawPhone: string, id: string): void {
  try {
    const all = readAll();
    const key = normalizePhone(rawPhone);
    all[key] = (all[key] ?? []).filter(it => it.id !== id);
    localStorage.setItem(LS_KEY, JSON.stringify(all));
  } catch {}
}

/** Remember the last-used phone number in the browser */
export function rememberPhone(rawPhone: string): void {
  try { localStorage.setItem(LS_PHONE, rawPhone); } catch {}
}

export function recallPhone(): string {
  try { return localStorage.getItem(LS_PHONE) ?? ""; } catch { return ""; }
}
