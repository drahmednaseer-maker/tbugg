import type { Currency, MarketId } from "./types";

/* ── Brand themes. Logo colours (#53436A, #50C993) never change. ── */
export interface Theme {
  id: string; name: string; paper: string; ink: string; head: string; accent: string; bar: string; line: string;
  display: string; script: string; upper?: boolean; size: number;
}
export const THEMES: Theme[] = [
  { id: "expedition", name: "Expedition", paper: "#F9F5EC", ink: "#454049", head: "#4A6FA5", accent: "#50C993", bar: "#53436A", line: "#D9D2C4", display: "var(--f-stamp)", script: "var(--f-brush)", upper: true, size: 92 },
  { id: "blossom", name: "Blossom", paper: "#FCF6F4", ink: "#4A4150", head: "#53436A", accent: "#C9748F", bar: "#53436A", line: "#EBD9DA", display: "var(--f-serif)", script: "var(--f-brush)", size: 84 },
  { id: "autumn", name: "Autumn Gold", paper: "#FBF5E9", ink: "#463D38", head: "#A4571B", accent: "#D6912A", bar: "#53436A", line: "#E5D6BB", display: "var(--f-poster)", script: "var(--f-brush)", upper: true, size: 108 },
  { id: "heritage", name: "Heritage", paper: "#F7F3EA", ink: "#40392F", head: "#7A2E2A", accent: "#A98446", bar: "#4A2A2A", line: "#DCCFB6", display: "var(--f-serif)", script: "var(--f-serif)", size: 84 },
  { id: "modern", name: "Modern", paper: "#FFFFFF", ink: "#3C3A44", head: "#53436A", accent: "#50C993", bar: "#53436A", line: "#E4E2E8", display: "var(--font-jakarta)", script: "var(--font-jakarta)", size: 76 },
  { id: "glacier", name: "Glacier", paper: "#F3F7F9", ink: "#36434D", head: "#16627F", accent: "#2FA3B5", bar: "#17384A", line: "#CFDEE4", display: "var(--f-poster)", script: "var(--f-brush)", upper: true, size: 108 },
];

/* ── Photo library ── */
export interface Photo { src: string; tag: string; name: string; own: boolean }
const P = (tag: string, dir: string, names: string, own = true): Photo[] =>
  names.split(" ").map((n) => ({ src: `${dir}${n}.jpg`, tag, own, name: n.replace(/[-_]/g, " ").replace(/\d+$/, "").trim() }));
export const PHOTOS: Photo[] = [
  ...P("Hunza", "/destinations/hunza/", "attabad_lake autumn_hunza ghuwari gulmit gulshan_e_kabir hunza_autumn1 jamalabad jamalabad2 lady_finger lady_finger2 passu_cones passu_hunza_spring portrait rakaposhi_sunset spring_blossoms"),
  ...P("Skardu & Khaplu", "/destinations/skardu/", "daghoni haldi_cones indus_river katpana2 katpana_skardu keris_bridge kundus machlu machlu_kid machlu_peaks machlu_springs night_astro polo_shigar skardu_autumn thagus v5r02643 v5r02675"),
  ...P("Skardu & Khaplu", "/destinations/khaplu/", "khaplu_main"),
  ...P("K2 & Karakoram", "/destinations/k2/", "baltoro_glacier broad_peak k2_peak masherbrum trango_towers"),
  ...P("K2 & Karakoram", "/destinations/charakusa/", "charakusa_basecamp"),
  ...P("Deosai & Minimarg", "/destinations/deosai/", "deosai_plains sheosar_lake"),
  ...P("Deosai & Minimarg", "/destinations/minimarg/", "minimarg1 minimarg2 minimarg3 minimarg4 minimarg5 minimarg6 minimarg7 minimarg8"),
  ...P("Fairy Meadows", "/destinations/fairymeadows/", "fairy_meadows nanga_parbat"),
  ...P("Cities & heritage", "/destinations/", "islamabad/faisal_mosque lahore/lahore_fort lahore/lahore_main cholistan/cholistan"),
  ...P("Cities & heritage", "/destinations/_sourced/", "dharmarajika-stupa-monastery-taxila jaulian-buddhist-monastery-in-taxila", false),
  ...P("Swat & Kashmir", "/destinations/", "swat/malam_jabba swat/swat_kalam swat/swat_river kashmir/kashmir1 kashmir/kashmir2 kashmir/kashmir3 kashmir/kashmir_taobat nathiagali/nathiagali nagar/nagar_main"),
  ...P("Chitral & Shandur", "/destinations/", "chitral/kalash_portrait shandur/shandur1 shandur/shandur2 shandur/shandur3 shandur/shandur4"),
  ...P("Coast", "/destinations/gwadar/", "astola_island gwadar_city hammerhead"),
  ...P("Coast", "/destinations/_sourced/", "makran-coastal-highway princess-of-hope-balochistan", false),
];

/* ── Map coordinates (lat, lon) ── */
export const PLACES: Record<string, [number, number]> = {
  Islamabad: [33.69, 73.05], Lahore: [31.55, 74.34], Karachi: [24.86, 67.01], Taxila: [33.74, 72.79], Skardu: [35.3, 75.63],
  Shigar: [35.42, 75.74], Khaplu: [35.16, 76.33], Hunza: [36.32, 74.66], Passu: [36.48, 74.88], Khunjerab: [36.85, 75.43],
  Gilgit: [35.92, 74.31], Naltar: [36.16, 74.18], Nagar: [36.26, 74.72], Naran: [34.91, 73.65], Chilas: [35.42, 74.1],
  "Fairy Meadows": [35.39, 74.58], Raikot: [35.49, 74.59], Deosai: [35.0, 75.4], Minimarg: [34.8, 75.07], Swat: [34.77, 72.36],
  Kalam: [35.48, 72.58], "Takht-i-Bahi": [34.29, 71.95], Chitral: [35.85, 71.79], Kalash: [35.69, 71.65], Shandur: [36.07, 72.52],
  "Nathia Gali": [34.07, 73.39], Murree: [33.91, 73.39], Neelum: [34.59, 73.91], Gwadar: [25.13, 62.33], Cholistan: [28.77, 71.33],
  Hushe: [35.45, 76.36], Charakusa: [35.38, 76.58], Askole: [35.682, 75.815], Jhula: [35.68, 75.95], Paiju: [35.69, 76.11], Khoburtse: [35.712, 76.2],
  Urdukas: [35.728, 76.285], "Goro II": [35.738, 76.4], Concordia: [35.744, 76.515], "K2 Base Camp": [35.83, 76.51],
  "Kuala Lumpur": [3.14, 101.69], Singapore: [1.35, 103.82], Bangkok: [13.75, 100.5], Jakarta: [-6.2, 106.82],
};

/* ── Hotels Travel Bug already works with ── */
export const HOTELS = [
  "Regalia Hotel, Islamabad", "Khar Hotel, Skardu", "Dynasty Hotel, Skardu", "Shangrila Resort, Skardu", "PC Legacy, Skardu", "Khoj Resort, Shigar",
  "Serena Khaplu Palace", "Serena Hotel, Hunza", "Ambiance Resort, Hunza", "Offto Hunza", "Moksha Resort, Gulmit", "Diwan-e-Hunza, Gulmit",
  "Serena Hotel, Gilgit", "Greywalls Hotel, Naran", "Pearl Continental, Malam Jabba", "Swat Palace Hotel", "Rock City Resort, Kalam",
  "Pearl Continental, Lahore", "Nishat Hotel, Lahore", "Avari Hotel, Lahore", "DoubleTree by Hilton, Nathia Gali", "Pearl Continental, Bhurban",
];

/* Mid-market rates per 1 USD on 24 Nov 2026; every proposal lets the user override. */
export const RATES: Record<Currency, number> = { USD: 1, PKR: 276.55, MYR: 4.123, SGD: 1.291, THB: 34, IDR: 18195, EUR: 0, GBP: 0 };
export const RATE_DATE = "24 Nov 2026";

export const INCLUDED = [
  "Airport pick and drop", "Private vehicle with experienced driver and fuel", "Hotel accommodation on twin sharing",
  "Daily breakfast and dinner", "Services of professional tour guide", "Sightseeing and excursions as per itinerary",
  "Mineral water, tea and snacks during drives", "Toll taxes and parking", "Domestic flights (round trip)", "All meals (breakfast, lunch, dinner)",
  "Professional photo tour guide", "Forts and museum entry tickets", "Attabad Lake boat ride", "4x4 jeeps for mountain tracks", "Halal meals throughout",
  "Prayer stops planned into every driving day", "Basic first aid kit and medicines", "Invitation letter for e-Visa application",
];
export const EXCLUDED = [
  "International flights", "Visa fee", "Travel and medical insurance", "Lunches", "Forts and resorts entry tickets", "Boat rides, zipline and suspension bridge tickets",
  "Personal expenses such as laundry, telephone calls, tips and gratuity", "Early check-in and late check-out (subject to availability)",
  "Any cost arising from landslides, road blockage, political disturbance or weather (payable on the spot)",
  "Anything not mentioned in the included services",
];
export const TERMS = [
  "Our terms and conditions are strictly followed and applied. Please read and agree with them before booking a trip with us.",
  "All members take extra care of the local environment. Garbage such as tins, water bottles and wrappers must be disposed of without polluting water sources.",
  "During the trip, itineraries may be affected by reasons beyond the control of the organizers. In such a situation, the organizers will not be held responsible.",
  "Every possible care is taken for the safety of members, still each venture carries the risk of unforeseen natural disasters or accidents. The company, group leader and organizers will not be held responsible in such an event.",
  "In case of theft, loss or damage to personal belongings during the trip, the organizers will not be held responsible.",
  "If a flight is cancelled, the ticket amount is not refunded; instead we provide road transport and arrange hotel accommodation where needed.",
  "Reasonable changes in the itinerary may be made only where advisable for the safety and comfort of the client.",
  "Cancellation must be notified by phone or email. Charges on the advance payment: 30 or more days before departure 25%, 29 to 15 days 50%, 14 to 1 day 90%. No refund is given for any unused portion of the trip.",
];

/* ── Southeast Asia sales kit ── */
export interface Market {
  id: Exclude<MarketId, "">; name: string; currency: Currency; city: string; templates: string[]; flights: string; visa: string; holidays: string;
  angle: string; points: string[]; competitors: string; events: string; message: string;
}
const VISA = "Apply online for a Pakistan e-Visa before travel. The free prior-to-arrival scheme is reported suspended since 1 January 2026. Fee and processing vary by nationality; allow 4 to 6 weeks. We provide the invitation letter.";
const CHECK = "Confirm with the airline before quoting.";
export const MARKETS: Market[] = [
  { id: "MY", name: "Malaysia", currency: "MYR", city: "Kuala Lumpur", templates: ["muslim-family", "autumn-photo", "skardu-summer"],
    flights: `Kuala Lumpur to Lahore nonstop with Batik Air Malaysia, and to Karachi on selected days. ${CHECK}`, visa: VISA,
    holidays: "School holidays 2027 (KL group, check officially): 6–14 Mar, 22 May–6 Jun, 28 Aug–5 Sep, 4–31 Dec.",
    angle: "Lead with Muslim-friendly mountain holidays: halal food everywhere, mosques on every route, spring blossom and autumn gold.",
    points: ["Nonstop KUL–Lahore makes Lahore the natural start point", "Domestic flights replace the long road days other groups sell", "Own photographers as guides: guests go home with real portraits", "Private departures from a small group, so agents can brand it as theirs"],
    competitors: "Publicly listed: ARBA 8D6N 2027 from about RM6,297; LevArt 13D Oct 2026 RM7,800 excluding international air and meals.",
    events: "MATTA Johor 9–11 Apr 2027; MATTA KL 3–5 Sep 2027 (third-party listings, confirm on matta.org.my).",
    message: "Assalamualaikum [Name], I am visiting Kuala Lumpur for Travel Bug Pakistan. We run private, halal tours to Hunza and Skardu, led by our own photographers. Your group flies nonstop to Lahore and we handle everything on the ground. May I show you our 2027 spring and autumn programmes over a 20-minute meeting on [date]?" },
  { id: "SG", name: "Singapore", currency: "SGD", city: "Singapore", templates: ["blossom-photo", "autumn-photo", "k2"],
    flights: `One-stop via Kuala Lumpur to Lahore, or via Doha to Islamabad, Lahore and Karachi. No nonstop found. ${CHECK}`, visa: VISA,
    holidays: "School holidays 2027 (MOE): 13–21 Mar, 29 May–27 Jun, 4–12 Sep, 20 Nov–31 Dec.",
    angle: "Lead with small-group photography and trekking. Show Asmar's portfolio first; the price conversation is easier after it.",
    points: ["Led by landscape photographer and Sony Brand Ambassador Asmar Hussain", "Sunrise and sunset locations scouted over years, not a bus schedule", "Private Prado and handpicked hotels including Serena properties", "Clear terms, payment plan and inclusions on paper"],
    competitors: "Publicly listed: EU Holidays 12D at $3,188 excluding flights (search listing, currency unstated).",
    events: "ITB Asia 20–22 Oct 2027, Sands Expo (best trade fit; confirm). NATAS 2027 dates not announced when checked.",
    message: "Hello [Name], I am in Singapore for Travel Bug Pakistan. We run small-group photography journeys to Hunza and Skardu, led by landscape photographer Asmar Hussain. I would love to show you our April 2027 blossom and October autumn programmes with sample images. Would [date] suit for a short meeting?" },
  { id: "TH", name: "Thailand", currency: "THB", city: "Bangkok", templates: ["gandhara", "autumn-photo", "muslim-family"],
    flights: `Bangkok to Lahore nonstop with Thai Airways, and to Islamabad and Karachi on selected days. ${CHECK}`, visa: VISA,
    holidays: "Songkran is 13–15 April, close to the blossom window. Confirm school dates locally.",
    angle: "Lead with the Gandhara Buddhist trail: Taxila, Takht-i-Bahi and Swat. Few sellers were found in Thailand, so it is a gap.",
    points: ["UNESCO-listed Taxila and Takht-i-Bahi in one week", "Nonstop from Bangkok, so short pilgrim groups work", "Pair heritage with mountains for leisure groups", "Vegetarian and special meals arranged on request"],
    competitors: "No Thai agency with a public Pakistan price was found in our search.",
    events: "TITF Bangkok 21–24 Jan 2027 at QSNCC, B2B matching 20 Jan (third-party listings, confirm with organiser).",
    message: "Sawasdee [Name], I am visiting Bangkok for Travel Bug Pakistan. We have a 7-day Gandhara Buddhist heritage journey covering Taxila, Takht-i-Bahi and Swat, with a mountain extension. May I present it to your team on [date]?" },
  { id: "ID", name: "Indonesia", currency: "IDR", city: "Jakarta", templates: ["islamic-heritage", "muslim-family", "autumn-photo"],
    flights: `One-stop via Bangkok to Lahore or Karachi, or via Kuala Lumpur. No nonstop found. ${CHECK}`, visa: VISA,
    holidays: "Confirm 2027 school and Lebaran dates locally before fixing departures.",
    angle: "Lead with Mughal mosques plus mountains: Badshahi, Wazir Khan and Faisal Mosque, then Hunza or Nathia Gali.",
    points: ["Halal by default, prayer stops built into every day", "Mughal heritage and northern mountains in one trip", "Family and community group rates on request", "Bahasa-speaking tour leader from the partner agency welcome"],
    competitors: "Golden Rama has an approx. 11-day programme via Bangkok (search listing; price not found).",
    events: "ASTINDO fair: 2027 date not announced when checked (2026 was 5–8 Feb).",
    message: "Assalamualaikum [Nama], I am visiting Jakarta for Travel Bug Pakistan. We offer halal private journeys combining Lahore's Mughal mosques with the mountains of northern Pakistan, easy for your groups to sell. May I share the programme and partner rates with you on [date]?" },
];
