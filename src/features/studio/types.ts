export type SectionId =
  | "cover" | "intro" | "glance" | "highlights" | "collection" | "days" | "elevation"
  | "stays" | "gallery" | "inclusions" | "price" | "travel" | "packing" | "why" | "terms" | "back";

export type DayLayout = "editorial" | "banner" | "compact";
export type CoverLayout = "classic" | "full" | "frame";
export type Meal = "B" | "L" | "D";
export type Currency = "USD" | "PKR" | "MYR" | "SGD" | "THB" | "IDR" | "EUR" | "GBP";
export type MarketId = "" | "MY" | "SG" | "TH" | "ID";

export interface Day {
  id: string; title: string; place: string; body: string; bullets: string[]; meals: Meal[];
  stay: string; camp: boolean; image: string; altitude: string; distance: string; time: string;
}
export interface PriceRow { label: string; amount: string }
export interface CostRow { label: string; amount: string; per: "person" | "group" }
export interface Card { title: string; meta: string; text: string; image: string }
export interface Group { title: string; items: string[] }

export interface Trip {
  id: string; updated: number; name: string;
  theme: string; coverLayout: CoverLayout; dayLayout: DayLayout;
  order: SectionId[]; hidden: SectionId[];
  title: string; subtitle: string; kicker: string; cover: string; backImage: string;
  client: string; partner: string; market: MarketId; pax: string; start: string; status: string;
  introTitle: string; intro: string; highlights: Group[]; highlightImages: string[];
  difficulty: string; season: string; days: Day[]; gallery: string[]; fill: Record<string, string>; collection: Card[];
  included: string[]; excluded: string[];
  currency: Currency; prices: PriceRow[]; priceNote: string; showLocal: Currency | ""; rate: string;
  deposit: string; balanceDays: string; validUntil: string;
  travel: Group[]; packing: Group[]; packingNote: string; terms: string[]; signature: boolean;
  whyTitle: string; why: Group[];
  costs: CostRow[]; markup: string; commission: string; groupSizes: string;
}
export interface Company {
  contact: string; phone: string; email: string; web: string; address: string; tagline: string; bank: string;
}
export const COMPANY: Company = {
  contact: "Asmar Hussain", phone: "+92 334 433 4411", email: "info@travelbug.pk", web: "www.travelbug.pk",
  address: "B-89, Post Office Rd, Wah Cantt, Pakistan", tagline: "Your Journey Matters", bank: "",
};
export const SECTION_NAMES: Record<SectionId, string> = {
  cover: "Cover", intro: "Introduction", glance: "Route & overview", highlights: "Highlights",
  collection: "Tour collection", days: "Day by day", elevation: "Elevation & distances", stays: "Where you stay",
  gallery: "Photo gallery", inclusions: "Included / not included", price: "Price & booking",
  travel: "Travel information", packing: "Packing list", why: "Why Travel Bug", terms: "Terms & signature", back: "Back cover",
};
export const uid = () => Math.random().toString(36).slice(2, 10);
