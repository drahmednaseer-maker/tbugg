import { tours } from "@/data/tours";
import { EXCLUDED, INCLUDED, MARKETS, TERMS } from "./data";
import { uid, type Day, type Group, type MarketId, type Meal, type SectionId, type Trip } from "./types";

const A: Record<string, string> = {
  attabad: "/destinations/hunza/attabad_lake.jpg", cones: "/destinations/hunza/passu_cones.jpg", spring: "/destinations/hunza/passu_hunza_spring.jpg",
  hunza: "/destinations/hunza/autumn_hunza.jpg", raka: "/destinations/hunza/rakaposhi_sunset.jpg", lady: "/destinations/hunza/lady_finger.jpg", gulmit: "/destinations/hunza/gulmit.jpg",
  jamal: "/destinations/hunza/jamalabad.jpg", blossoms: "/destinations/hunza/spring_blossoms.jpg", katpana: "/destinations/skardu/katpana_skardu.jpg", indus: "/destinations/skardu/indus_river.jpg",
  keris: "/destinations/skardu/keris_bridge.jpg", daghoni: "/destinations/skardu/daghoni.jpg", machlu: "/destinations/skardu/machlu.jpg", peaks: "/destinations/skardu/machlu_peaks.jpg",
  msp: "/destinations/skardu/machlu_springs.jpg", thagus: "/destinations/skardu/thagus.jpg", polo: "/destinations/skardu/polo_shigar.jpg", yaks: "/destinations/skardu/v5r02675.jpg", kundus: "/destinations/skardu/kundus.jpg",
  khaplu: "/destinations/khaplu/khaplu_main.jpg", faisal: "/destinations/islamabad/faisal_mosque.jpg", fort: "/destinations/lahore/lahore_fort.jpg", lahore: "/destinations/lahore/lahore_main.jpg",
  k2: "/destinations/k2/k2_peak.jpg", baltoro: "/destinations/k2/baltoro_glacier.jpg", broad: "/destinations/k2/broad_peak.jpg", mash: "/destinations/k2/masherbrum.jpg", trango: "/destinations/k2/trango_towers.jpg",
  deosai: "/destinations/deosai/deosai_plains.jpg", sheosar: "/destinations/deosai/sheosar_lake.jpg", nagar: "/destinations/nagar/nagar_main.jpg", swat: "/destinations/swat/swat_river.jpg", kalam: "/destinations/swat/swat_kalam.jpg",
  nathia: "/destinations/nathiagali/nathiagali.jpg", jaulian: "/destinations/_sourced/jaulian-buddhist-monastery-in-taxila.jpg", stupa: "/destinations/_sourced/dharmarajika-stupa-monastery-taxila.jpg", kashmir: "/destinations/kashmir/kashmir1.jpg", portrait: "/destinations/hunza/portrait.jpg",
};
type X = { m?: string; stay?: string; camp?: boolean; img?: string; alt?: string; km?: string; t?: string };
const d = (title: string, place: string, body: string, bullets: string[] = [], x: X = {}): Day => ({
  id: uid(), title, place, body, bullets, meals: (x.m ?? "BD").split("").filter(Boolean) as Meal[], stay: x.stay ?? "", camp: !!x.camp,
  image: x.img ? A[x.img] ?? x.img : "", altitude: x.alt ?? "", distance: x.km ?? "", time: x.t ?? "",
});
const WHY: Group[] = [
  { title: "Photographers lead the way", items: ["Our trips are planned and led by people who photograph these valleys all year, so you stand in the right place at the right light."] },
  { title: "100% customised", items: ["Private tours shaped around your dates, pace, food and budget. Founded in 2018."] },
  { title: "Support on the ground, 24/7", items: ["Our own team, experienced mountain drivers and licensed guides stay with you from arrival to departure."] },
];
export const ALL: SectionId[] = ["cover", "intro", "glance", "highlights", "collection", "days", "elevation", "stays", "gallery", "inclusions", "price", "travel", "packing", "why", "terms", "back"];

export const marketTravel = (id: MarketId): Group[] => {
  const m = MARKETS.find((v) => v.id === id);
  return [
    { title: "Visa", items: ["Apply online for a Pakistan e-Visa before travel. The fee and processing time depend on nationality, and we confirm the current rules when you book. We provide the invitation letter."] },
    { title: "Getting there", items: [m?.flights.replace(" No nonstop found.", "").replace(" Confirm with the airline before quoting.", " Schedules are confirmed at booking.") ?? "Islamabad, Lahore and Karachi are the main international gateways."] },
    { title: "Food", items: ["All food in Pakistan is halal. Vegetarian and special diets are arranged with advance notice."] },
    { title: "Money", items: ["Pakistani rupee (PKR). Carry some cash in the mountains; cards are accepted mainly in cities and larger hotels."] },
    { title: "Connectivity & power", items: ["Mobile coverage is limited in remote valleys. Power is 230V, plug types C and D. Carry a power bank."] },
    { title: "Climate & clothing", items: ["Mountain evenings are cool even in summer. Pack layers, and modest clothing for villages and mosques."] },
  ];
};

export function blank(over: Partial<Trip> = {}): Trip {
  return {
    id: uid(), updated: Date.now(), name: "Untitled itinerary", theme: "modern", coverLayout: "full", dayLayout: "editorial", order: ALL,
    hidden: ["collection", "packing", "elevation"], title: "Journey Title", subtitle: "Northern Pakistan", kicker: "Private tour", cover: A.attabad, backImage: A.raka,
    client: "", partner: "", market: "", pax: "2", start: "", status: "Proposal", introTitle: "Welcome to Pakistan",
    intro: "Write a warm introduction to this journey.", highlights: [{ title: "Highlights", items: ["Add a highlight"] }], highlightImages: [A.attabad, A.katpana, A.portrait],
    difficulty: "Easy", season: "", days: [d("Arrival in Islamabad", "Islamabad", "Meet and greet at the airport, then transfer to your hotel.", [], { m: "D", img: "faisal", stay: "Regalia Hotel, Islamabad" })],
    gallery: [A.attabad, A.raka, A.katpana, A.khaplu, A.indus, A.portrait, A.cones, A.polo, A.machlu], fill: {}, collection: [],
    included: INCLUDED.slice(0, 8), excluded: [...EXCLUDED], currency: "USD", prices: [{ label: "Per person, twin sharing", amount: "" }, { label: "Per person, single room", amount: "" }],
    priceNote: "Prices are per person.", showLocal: "", rate: "", deposit: "20", balanceDays: "30", validUntil: "",
    travel: marketTravel(""), packing: [], packingNote: "", terms: [...TERMS], signature: true, whyTitle: "Why travel with Travel Bug", why: WHY,
    costs: [{ label: "Hotels", amount: "", per: "person" }, { label: "Domestic flights", amount: "", per: "person" }, { label: "Meals", amount: "", per: "person" }, { label: "Vehicle & fuel", amount: "", per: "group" }, { label: "Guide", amount: "", per: "group" }, { label: "Permits & entries", amount: "", per: "person" }],
    markup: "20", commission: "10", groupSizes: "2, 4, 6, 8, 10", ...over,
  };
}

const K2GEAR: Group[] = [
  { title: "Camping / trekking", items: ["Rucksack / duffle bag (80L)", "Backpack with rain cover", "Sleeping bag (preferably down)", "Camping pillow (optional)", "Trekking poles x2", "Water bottle", "Hiking boots, well worn in", "Spare boot laces", "Open sandals for camp"] },
  { title: "Clothing", items: ["Warm socks", "Base layers / shirts", "Thermal underwear", "Trousers", "Down jacket", "Windbreaker / parka", "Cap and warm cap", "Bandana / head scarf", "Gloves"] },
  { title: "Gondogoro-La gear (rental)", items: ["Helmet", "Carabiner x2", "Jumar / ascender", "Sling", "Harness", "Shoe grippers"] },
  { title: "Toiletries & medication", items: ["Sunscreen, lip balm", "Toothbrush and paste, soap", "Toilet roll, antibacterial wipes", "Lightweight towel, sanitizer", "Imodium, paracetamol", "Antiseptic cream, plasters", "Personal prescription drugs"] },
  { title: "Electronics", items: ["Phone and chargers", "Headlamp with extra batteries", "Camera with extra batteries", "Power bank"] },
  { title: "Documents", items: ["Passport with photocopies", "Spare passport size photos", "Flight and visa information", "Original CNIC (Pakistanis)"] },
];
const camp = (place: string, alt: string, km: string, t: string, img = ""): X => ({ m: "BLD", stay: `Camping, ${place}`, camp: true, alt, km, t, img });
const NORTH = ["Domestic flights (round trip)", "Invitation letter for e-Visa application"];
const HALAL = ["Halal meals throughout", "Prayer stops planned into every driving day"];

interface Tpl { id: string; name: string; tag: string; market?: string; note: string; make: () => Trip }
const T = (id: string, name: string, tag: string, note: string, over: () => Partial<Trip>, market = ""): Tpl => ({ id, name, tag, note, market, make: () => {
  const t = blank({ name, title: name, ...over() });
  if (market) { const m = MARKETS.find((v) => v.name === market)!; t.market = m.id; t.travel = marketTravel(m.id); t.showLocal = m.currency; }
  return t;
} });

export const TEMPLATES: Tpl[] = [
  T("k2", "K2 Base Camp Expedition", "Expedition", "Your sample PDF, rebuilt", () => ({
    title: "K2 Basecamp", subtitle: "Gondogoro-La Trek", kicker: "Karakoram expedition", theme: "expedition", coverLayout: "classic", dayLayout: "compact", cover: A.broad, backImage: A.mash,
    gallery: [A.k2, A.baltoro, A.trango, A.broad, A.mash], hidden: ["collection", "stays", "gallery"], difficulty: "Challenging", season: "June to September", pax: "5-7", introTitle: "Trek introduction", currency: "PKR",
    intro: "The K2 Basecamp and Gondogoro-La Trek is one of the most iconic and rewarding trekking adventures in the world. This journey takes you deep into the heart of the Karakoram, following the legendary Baltoro Glacier all the way to Concordia, a place mountaineers call the “Throne Room of the Mountain Gods.”\n\nStarting from the remote mountain village of Askole, the trail winds through a landscape carved by glaciers and guarded by towering granite spires like the Trango Towers, Paiju Peak, Uli Biaho and the Cathedral Range. As you move closer to Concordia and K2 Basecamp, the scenery becomes more powerful, the air thinner, and the experience more unforgettable.\n\nWith Travel Bug Pakistan’s expert team, experienced guides and reliable logistics, this is not just a trek; it is an immersion into the world’s greatest mountain range and a journey that stays with you forever.",
    highlights: [{ title: "World-class mountain scenery", items: ["Trek along the mighty Baltoro Glacier", "Stand at Concordia, surrounded by four 8,000m peaks"] }, { title: "K2 Basecamp experience", items: ["Visit the legendary K2 Basecamp", "Rugged glacier paths with panoramic Karakoram views"] }, { title: "Iconic rock formations", items: ["Trango Towers, Muztagh Tower and Grand Cathedral"] }, { title: "Wilderness camping", items: ["Nights under crystal-clear Karakoram skies"] }, { title: "Culture & adventure", items: ["Start from Askole, home to the warm and resilient Balti people"] }], highlightImages: [A.k2, A.trango, A.baltoro],
    included: ["Private booked jeeps to/from Askole", "Standard hotel accommodation 2 nights (triple sharing)", "Trekking accommodation (twin sharing dome tents)", "All camping site, CKNP and bridge fees", "Gondogoro-La crossing fee", "Food (breakfast, lunch, dinner)", "Licensed mountain guide", "Kitchen, mess and member tents", "Table, chairs and sleeping mattress", "Generator", "Basic first aid / medicine kit", "Trekking permit and waste management fee", "Support staff (cook and assistant)", "Porters for personal luggage (12 kg)"],
    excluded: ["Air tickets", "Equipment for crossing Gondogoro-La", "Extra luggage above 12 kg at PKR 3,000 per kg", ...EXCLUDED.slice(6)], prices: [{ label: "Per person, Skardu to Skardu (5-7 people)", amount: "350000" }], deposit: "50", balanceDays: "0", packing: K2GEAR,
    packingNote: "All equipment for the Gondogoro-La crossing is available on rental basis at PKR 12,000 in total, payable separately.",
    terms: [...TERMS.slice(0, 5), ...TERMS.slice(6), "The decision to cross Gondogoro-La is made by the tour leader and guide at Concordia after assessing the fitness and condition of participants.", "If a participant changes plans after leaving Concordia for Ali Camp and does not cross for any reason, all associated expenses are borne by the participant."],
    days: [
      d("Skardu", "Skardu", "Meet and greet in Skardu and transfer to hotel. Permit clearance, trek briefing, gear check and rest. Visit Skardu market for shopping.", [], { m: "D", stay: "Hotel in Skardu", img: "indus", alt: "2,230 m" }),
      d("Skardu to Askole", "Askole", "We start the day early and take a long bumpy drive from Skardu to Askole in jeeps, with short stops on the way. Lunch break at Apo Ali Gon.", [], camp("Askole", "3,040 m", "120 km", "6-7 hrs jeep")),
      d("Askole to Jhula", "Jhula", "Imagine stepping into the most stunning and adventurous trek of your life, kicking off amidst the towering peaks of the Karakoram. The weather tends to be hot and dry, so keep yourself hydrated and carry a head scarf or hat. Lunch at Korofhong.", [], camp("Jhula", "3,150 m", "18 km", "6-7 hrs")),
      d("Jhula to Paiju", "Paiju", "Rugged landscapes and stunning vistas await on the trail to Paiju. Lunch at Mondrong.", [], camp("Paiju", "3,480 m", "19.8 km", "6-7 hrs")),
      d("Paiju to Khoburtse", "Khoburtse", "The walking gets tougher but the scenery more amazing with each step onto the snout of the Baltoro Glacier. Continuous climbs on the moraine, with views of Trango Tower and Uli Biaho. Lunch at Liligo.", [], camp("Khoburtse", "3,788 m", "14.7 km", "5-7 hrs", "trango")),
      d("Khoburtse to Urdukas", "Urdukas", "Trango Towers come into view after crossing two small glaciers. The camp sits 100m above the glacier.", [], camp("Urdukas", "3,905 m", "6.4 km", "3-4 hrs")),
      d("Acclimatize and rest day in Urdukas", "Urdukas", "Spend the day at Urdukas for acclimatization and rest. The relatively mild weather makes it an ideal day to bathe and wash clothes before the trail leads onto the glacier.", [], camp("Urdukas", "3,905 m", "", "Rest day")),
      d("Urdukas to Goro II", "Goro II", "A long walk on the icy Baltoro Glacier, traversing the Yermandu Glacier. Magnificent views of Muztagh, Mitre and Gasherbrum IV. Lunch at Goro I.", [], camp("Goro II", "4,285 m", "11.9 km", "6-7 hrs")),
      d("Goro II to Concordia", "Concordia", "Reach Concordia after steadily walking up the moraine as more snow-capped peaks appear, culminating in the sight of K2. Broad Peak, Mitre Peak, Gasherbrum, Sia Kangri, Baltoro Kangri and Chogolisa surround you.", [], camp("Concordia", "4,512 m", "11.7 km", "6-7 hrs", "broad")),
      d("Concordia to K2 Basecamp", "K2 Base Camp", "A beautiful hike from Concordia to K2 Basecamp and back. Hike towards Broad Peak, K2 and the Gilkey memorial with our guide, or rest at Concordia.", [], camp("Concordia", "5,100 m", "11 km", "9-11 hrs return", "k2")),
      d("Rest day at Concordia", "Concordia", "Savor your final moments in the shadow of K2. Sitting on camp chairs facing the majestic peak, simply watching K2 rise before you is an unforgettable, almost spiritual experience.", [], camp("Concordia", "4,512 m", "", "Rest day", "mash")),
      d("Concordia to Urdukas", "Urdukas", "Leave Concordia and move back towards Urdukas. The trek is quite easy and descending.", [], camp("Urdukas", "3,905 m", "", "")),
      d("Urdukas to Paiju", "Paiju", "Follow the same trail down to Paiju with great views of Trango Towers near Khoburtse. The views on the way back are completely different.", [], camp("Paiju", "3,480 m", "", "")),
      d("Paiju to Jhula", "Jhula", "Find yourself among the trees after a break and enjoy the stay at Jhula campsite.", [], camp("Jhula", "3,150 m", "", "")),
      d("Jhula to Askole", "Askole", "The last day of trekking. Walk from Jhula to Askole and camp for our final night in tents.", [], camp("Askole", "3,040 m", "18 km", "")),
      d("Askole to Skardu", "Skardu", "After breakfast, return to Skardu by jeep. Freshen up at the hotel, followed by the farewell dinner. End of program.", [], { m: "BD", stay: "Hotel in Skardu", alt: "2,230 m" }),
      d("Contingency day", "Skardu", "Reserved for possible delays due to weather or logistics.", [], { m: "" }),
    ] })),
  T("blossom-photo", "Blossom Photo Tour", "Photography", "Spring, 11 days, Skardu and Hunza", () => ({
    subtitle: "Skardu & Hunza", kicker: "Photography journey", theme: "blossom", coverLayout: "classic", cover: A.spring, backImage: A.blossoms, season: "Late March to mid April",
    introTitle: "When every orchard is a painting", intro: "Experience the breathtaking beauty of spring in the mountains of Pakistan with our exclusive Blossom Photography Tour. Designed especially for photographers, this journey takes you through the most scenic valleys of Gilgit-Baltistan at the peak of apricot, cherry and apple blossom season.\n\nFrom Skardu to Hunza, every day is a visual feast of pastel orchards, snow-capped peaks, turquoise rivers and traditional mountain culture. Sunrise and sunset shoots are planned at iconic locations, with cultural portrait sessions in remote villages.",
    highlights: [{ title: "Blossom", items: ["Apricot, cherry and apple blossoms in full bloom"] }, { title: "Golden hours", items: ["Sunrise and sunset shoots at Katpana Desert, Duikar, the Shyok River and Attabad Lake"] }, { title: "People", items: ["Cultural portrait sessions and street photography in remote villages"] }, { title: "Heritage", items: ["Forts, glaciers, rivers and orchards with genuine local hospitality"] }], highlightImages: [A.spring, A.msp, "/destinations/skardu/machlu_kid.jpg"],
    included: ["Domestic flights (round trip)", "Private Toyota Land Cruiser Prado", "Airport and hotel transfers, fuel and tolls", "Handpicked hotels with hot water", "Daily breakfast and dinner", "Drinks and snacks during the tour", "Sightseeing as per itinerary", "Experienced driver", "Professional photo tour guide", "Invitation letter for e-Visa application"],
    gallery: [A.spring, A.msp, A.blossoms, A.portrait, "/destinations/skardu/katpana2.jpg", A.raka, A.attabad, A.polo, "/destinations/skardu/machlu_kid.jpg"],
    days: [
      d("Arrival in Islamabad", "Islamabad", "", ["Meet and greet by our representative", "Transfer to your hotel for rest", "Evening at leisure depending on arrival time"], { m: "D", stay: "Regalia Hotel, Islamabad", img: "faisal" }),
      d("Islamabad to Skardu and Khaplu", "Khaplu", "", ["Morning flight to Skardu", "Drive to Khaplu (3 hours)", "Ghwari village apple and cherry orchards", "Apricot blossoms in Barah village", "Sunset at the Shyok River"], { stay: "Serena Khaplu Palace", img: "/destinations/skardu/machlu_kid.jpg", t: "3 hrs drive" }),
      d("Thagus and Machulu", "Khaplu", "", ["Sunrise in Thagus Valley: blossoms, mist and mountain layers", "Portrait session in Machulu village with Balti communities", "Sunset with the Haldi Cones backdrop"], { stay: "Serena Khaplu Palace", img: "thagus" }),
      d("Daghoni, Balghar and Skardu", "Skardu", "", ["Sunrise in Barah village", "Explore Daghoni-Balghar, Keris bridge and village", "Sunset in Thorgu village"], { stay: "Khar Hotel, Skardu", img: "msp" }),
      d("Skardu and Shigar", "Skardu", "", ["Sunrise at Katpana Cold Desert", "Shigar Valley after breakfast", "Sunset at Sarfaranga Cold Desert"], { stay: "Khar Hotel, Skardu", img: "/destinations/skardu/katpana2.jpg" }),
      d("Skardu to Hunza", "Hunza", "", ["Full-day drive to Hunza via Gilgit", "Rakaposhi viewpoint", "Sunset in Aliabad with blossoms in the foreground"], { stay: "Ambiance Resort, Hunza", img: "raka", t: "6 hrs drive" }),
      d("Hunza: Altit and Duikar", "Hunza", "", ["Sunrise on Rakaposhi from the hotel", "Baltit Fort and Altit Fort", "Local bazaars, cafes and village streets", "Sunset at Duikar (Eagle's Nest)"], { stay: "Serena Hotel, Hunza", img: "lady" }),
      d("Upper Hunza", "Passu", "", ["Passu Glacier, Passu Cones and Hussaini bridge", "Blossoms in Ghulkin and Jamalabad", "Portrait session in Ghulkin", "Sunset at Attabad Lake"], { stay: "Serena Hotel, Hunza", img: "spring" }),
      d("Nagar Valley and Hopar Glacier", "Nagar", "", ["Sunrise in Karimabad", "Street photography in Nagar villages", "Hopar Glacier viewpoint", "Sunset on Spantik (Golden Peak)"], { stay: "Serena Hotel, Hunza", img: "portrait" }),
      d("Hunza to Islamabad", "Islamabad", "", ["Transfer to Gilgit Airport (2 hours)", "Fly to Islamabad", "Farewell dinner"], { stay: "Regalia Hotel, Islamabad", img: "attabad" }),
      d("Departure", "Islamabad", "", ["Airport drop-off for return flight", "End of services"], { m: "B" }),
    ] }), "Singapore"),
  T("autumn-photo", "Autumn Photo Tour", "Photography", "October, 9 days, Baltistan and Hunza", () => ({
    subtitle: "Skardu & Hunza", kicker: "When every leaf is a flower", theme: "autumn", coverLayout: "full", cover: A.daghoni, backImage: A.jamal, season: "Mid October to early November",
    introTitle: "The golden season", intro: "Experience the spectacular colors of autumn in the mountains of Pakistan. Designed especially for photographers, this journey travels through Baltistan and Hunza at the peak of the season, when golden poplars, crimson orchards and vibrant mountain scenery create an unforgettable canvas.\n\nCarefully planned sunrise and sunset sessions, cultural portraits and village streets ensure a diverse and rewarding experience, guided by experts who understand both photography and the region.",
    highlights: [{ title: "Colour", items: ["Golden, red and orange landscapes across Baltistan"] }, { title: "Light", items: ["Sunrise and sunset at iconic locations"] }, { title: "Culture", items: ["Portrait sessions in traditional villages"] }, { title: "Comfort", items: ["Handpicked stays with genuine hospitality"] }], highlightImages: [A.yaks, A.jamal, A.keris],
    included: [...NORTH, ...INCLUDED.slice(0, 8), "Professional photo tour guide"], gallery: [A.daghoni, A.yaks, A.jamal, A.keris, A.machlu, A.kundus, A.gulmit, A.katpana, A.hunza],
    days: [
      d("Arrival in Islamabad", "Islamabad", "Welcome at the airport and transfer to the hotel. The rest of the day is free.", [], { m: "D", stay: "Regalia Hotel, Islamabad", img: "faisal" }),
      d("Fly to Skardu", "Skardu", "Fly 45 minutes past Nanga Parbat into Baltistan.", ["Shangrila Resort and Soq Valley", "Sunset at Upper Kachura Lake"], { stay: "Khar Hotel, Skardu", img: "indus" }),
      d("Skardu to Khaplu", "Khaplu", "", ["Sunrise at Keris Bridge", "Ghwari village orchards in full colour", "Sunset at the Shyok River"], { stay: "Serena Khaplu Palace", img: "keris", t: "3 hrs drive" }),
      d("Machulu and Thagus", "Khaplu", "", ["Sunrise over Thagus Valley", "Portraits in Machulu village", "Sunset on the Haldi Cones"], { stay: "Serena Khaplu Palace", img: "machlu" }),
      d("Daghoni and Katpana", "Skardu", "", ["Golden river bends at Daghoni", "Sunset on the Katpana dunes"], { stay: "Khar Hotel, Skardu", img: "katpana" }),
      d("Skardu to Hunza", "Hunza", "Drive the Indus gorge and the Karakoram Highway to Hunza.", ["Rakaposhi viewpoint", "Sunset over Hunza's poplars"], { stay: "Ambiance Resort, Hunza", img: "hunza", t: "6 hrs drive" }),
      d("Upper Hunza in gold", "Passu", "", ["Gulmit and Jamalabad autumn trails", "Passu Cones and Hussaini bridge", "Attabad Lake at sunset"], { stay: "Moksha Resort, Gulmit", img: "jamal" }),
      d("Hunza to Islamabad", "Islamabad", "Transfer to Gilgit and fly to Islamabad. Farewell dinner.", [], { stay: "Regalia Hotel, Islamabad", img: "raka", t: "2 hrs drive" }),
      d("Departure", "Islamabad", "Airport drop-off for your return flight.", [], { m: "B" }),
    ] }), "Singapore"),
  T("muslim-family", "Pakistan Family Discovery", "Muslim-friendly", "Lahore, Skardu and Hunza, 10 days", () => ({
    subtitle: "Lahore · Skardu · Hunza", kicker: "Muslim-friendly private tour", theme: "modern", coverLayout: "full", cover: A.attabad, backImage: A.lahore, season: "April to October", pax: "4",
    introTitle: "Assalamualaikum and welcome", intro: "Mughal mosques, snow mountains and the warmest hospitality you will ever receive. This private family journey begins in Lahore and flies north to Skardu and Hunza, so your time goes into places, not long road days.\n\nFood is halal throughout, prayer stops are planned into every day, and the pace leaves room for children and grandparents to enjoy the trip.",
    highlights: [{ title: "Faith & heritage", items: ["Badshahi Mosque, Wazir Khan Mosque and Faisal Mosque"] }, { title: "Mountains in comfort", items: ["Domestic flights into Skardu and out of Gilgit"] }, { title: "Lakes & valleys", items: ["Attabad Lake, Shigar Valley and the Passu Cones"] }, { title: "Family time", items: ["Easy walks, boat rides and private transport"] }], highlightImages: [A.lahore, A.indus, A.attabad],
    included: [...NORTH, ...INCLUDED.slice(0, 8), ...HALAL], gallery: [A.lahore, A.fort, A.faisal, A.attabad, A.cones, "/destinations/skardu/katpana2.jpg", A.indus, A.lady, A.portrait],
    days: [
      d("Arrival in Lahore", "Lahore", "Welcome at Lahore airport and transfer to your hotel. Evening drive past the illuminated Badshahi Mosque.", [], { m: "D", stay: "Pearl Continental, Lahore", img: "lahore" }),
      d("Mughal Lahore", "Lahore", "", ["Lahore Fort and Badshahi Mosque", "Wazir Khan Mosque and the Walled City", "Dinner at Food Street"], { stay: "Pearl Continental, Lahore", img: "fort" }),
      d("Lahore to Islamabad", "Islamabad", "Comfortable motorway drive to the capital.", ["Faisal Mosque", "Daman-e-Koh viewpoint"], { stay: "Regalia Hotel, Islamabad", img: "faisal", t: "4-5 hrs drive" }),
      d("Fly to Skardu", "Skardu", "", ["Scenic flight past Nanga Parbat", "Kachura Lakes", "Sunset at Katpana Cold Desert"], { stay: "Khar Hotel, Skardu", img: "/destinations/skardu/katpana2.jpg" }),
      d("Shigar Valley", "Skardu", "", ["Shigar Fort", "Sarfaranga Cold Desert", "Skardu bazaar"], { stay: "Khar Hotel, Skardu", img: "indus" }),
      d("Skardu to Hunza", "Hunza", "", ["Indus gorge drive", "Rakaposhi viewpoint lunch"], { stay: "Serena Hotel, Hunza", img: "raka", t: "6 hrs drive" }),
      d("Attabad and Passu", "Hunza", "", ["Attabad Lake boat ride", "Hussaini suspension bridge", "Passu Cones"], { stay: "Serena Hotel, Hunza", img: "attabad" }),
      d("Forts and bazaars of Hunza", "Hunza", "", ["Baltit and Altit Forts", "Karimabad bazaar", "Sunset at Eagle's Nest"], { stay: "Serena Hotel, Hunza", img: "/destinations/hunza/lady_finger2.jpg" }),
      d("Fly Gilgit to Islamabad, road to Lahore", "Lahore", "Transfer to Gilgit, fly to Islamabad and continue by motorway to Lahore.", [], { stay: "Nishat Hotel, Lahore", img: "cones" }),
      d("Departure", "Lahore", "Last-minute shopping if time allows, then airport drop-off.", [], { m: "B" }),
    ] }), "Malaysia"),
  T("gandhara", "Gandhara Buddhist Trail", "Heritage", "Taxila, Takht-i-Bahi and Swat, 7 days", () => ({
    subtitle: "Taxila · Takht-i-Bahi · Swat", kicker: "Sacred heritage journey", theme: "heritage", coverLayout: "full", cover: A.jaulian, backImage: A.swat, season: "October to April",
    introTitle: "Walk where Gandhara flourished", intro: "For centuries the valleys of Gandhara were a meeting place of art, learning and the Buddhist faith. This journey visits the monasteries of Taxila, the hilltop complex of Takht-i-Bahi and the sacred valley of Swat, with time for quiet reflection at each site.\n\nA private guide, comfortable hotels and unhurried days make it suitable for pilgrims, students of history and families alike.",
    highlights: [{ title: "UNESCO heritage", items: ["Taxila and Takht-i-Bahi"] }, { title: "Sacred Swat", items: ["Butkara stupa, Swat Museum and the Jahanabad Buddha"] }, { title: "Reflection", items: ["Quiet time for chanting and meditation at sites"] }, { title: "Mountains", items: ["Green valleys and the Swat River"] }], highlightImages: [A.stupa, A.swat, A.faisal],
    gallery: [A.jaulian, A.stupa, A.swat, A.kalam, A.faisal, "/destinations/swat/malam_jabba.jpg"],
    days: [
      d("Arrival in Islamabad", "Islamabad", "Welcome at the airport and transfer to your hotel.", [], { m: "D", stay: "Regalia Hotel, Islamabad", img: "faisal" }),
      d("Taxila", "Taxila", "", ["Taxila Museum", "Dharmarajika stupa", "Sirkap and Jaulian monastery"], { stay: "Regalia Hotel, Islamabad", img: "jaulian" }),
      d("Takht-i-Bahi to Swat", "Takht-i-Bahi", "", ["Hilltop monastery of Takht-i-Bahi", "Continue to Swat Valley"], { stay: "Swat Palace Hotel", img: "", t: "5-6 hrs drive" }),
      d("Sacred Swat", "Swat", "", ["Swat Museum", "Butkara stupa", "Jahanabad Buddha rock carving"], { stay: "Swat Palace Hotel", img: "swat" }),
      d("Swat Valley", "Swat", "", ["Shingardar stupa", "Riverside lunch", "Malam Jabba viewpoint"], { stay: "Pearl Continental, Malam Jabba", img: "kalam" }),
      d("Swat to Islamabad", "Islamabad", "Return by motorway. Evening shopping and farewell dinner.", [], { stay: "Regalia Hotel, Islamabad", img: "/destinations/swat/malam_jabba.jpg", t: "5 hrs drive" }),
      d("Departure", "Islamabad", "Airport drop-off for your return flight.", [], { m: "B" }),
    ] }), "Thailand"),
  T("islamic-heritage", "Mosques & Mountains", "Muslim-friendly", "Lahore, Islamabad and Nathia Gali, 7 days", () => ({
    subtitle: "Lahore · Islamabad · Nathia Gali", kicker: "Islamic heritage journey", theme: "heritage", coverLayout: "full", cover: A.lahore, backImage: A.faisal, season: "September to April", pax: "20",
    introTitle: "Assalamualaikum and welcome", intro: "From the great Mughal mosques of Lahore to the modern beauty of Faisal Mosque and the pine forests of Nathia Gali, this short journey is made for families and community groups.\n\nEvery meal is halal, every day is planned around prayer times, and your own tour leader is welcome to travel with us.",
    highlights: [{ title: "Great mosques", items: ["Badshahi, Wazir Khan and Faisal Mosque"] }, { title: "Mughal art", items: ["Lahore Fort and Shalimar Gardens"] }, { title: "Cool hills", items: ["Pine forest walks at Nathia Gali"] }, { title: "Food", items: ["Lahori cuisine and halal dining throughout"] }], highlightImages: [A.faisal, A.fort, A.nathia],
    included: [...INCLUDED.slice(0, 8), ...HALAL, "Invitation letter for e-Visa application"], gallery: [A.lahore, A.fort, A.faisal, A.nathia],
    days: [
      d("Arrival in Lahore", "Lahore", "Welcome at the airport and transfer to your hotel.", [], { m: "D", stay: "Pearl Continental, Lahore", img: "lahore" }),
      d("Mughal Lahore", "Lahore", "", ["Lahore Fort", "Prayers at Badshahi Mosque", "Wazir Khan Mosque and the Walled City"], { stay: "Pearl Continental, Lahore", img: "fort" }),
      d("Gardens and bazaars", "Lahore", "", ["Shalimar Gardens", "Anarkali bazaar", "Wagah border ceremony"], { stay: "Pearl Continental, Lahore", img: "/destinations/cholistan/cholistan.jpg" }),
      d("Lahore to Islamabad", "Islamabad", "", ["Motorway drive", "Faisal Mosque at sunset"], { stay: "Regalia Hotel, Islamabad", img: "faisal", t: "4-5 hrs drive" }),
      d("Nathia Gali", "Nathia Gali", "", ["Murree hills drive", "Pine forest walk", "Cool mountain evening"], { stay: "DoubleTree by Hilton, Nathia Gali", img: "nathia", t: "2.5 hrs drive" }),
      d("Nathia Gali to Islamabad", "Islamabad", "", ["Lok Virsa Museum", "Shopping and farewell dinner"], { stay: "Regalia Hotel, Islamabad", img: "" }),
      d("Departure", "Islamabad", "Airport drop-off for your return flight.", [], { m: "B" }),
    ] }), "Indonesia"),
  T("skardu-summer", "Skardu & Deosai Summer", "Nature", "Lakes, deserts and high plains, 7 days", () => ({
    subtitle: "Skardu · Shigar · Deosai", kicker: "Summer escape", theme: "glacier", coverLayout: "frame", cover: A.sheosar, backImage: A.deosai, season: "July to September",
    introTitle: "The roof of Baltistan", intro: "Cold deserts, turquoise lakes and one of the highest plateaus in the world. Fly into Skardu and explore Shigar, Khaplu and the wildflower plains of Deosai in comfort.",
    highlights: [{ title: "Deosai", items: ["Sheosar Lake and open high-altitude plains"] }, { title: "Cold desert", items: ["Katpana and Sarfaranga dunes"] }, { title: "Royal Baltistan", items: ["Shigar and Khaplu palaces"] }], gallery: [A.sheosar, A.deosai, A.indus, "/destinations/skardu/katpana2.jpg", A.khaplu, A.thagus, A.polo, A.peaks, "/destinations/skardu/night_astro.jpg"], highlightImages: [A.deosai, "/destinations/skardu/katpana2.jpg", A.khaplu], included: [...NORTH, ...INCLUDED.slice(0, 8), "4x4 jeeps for mountain tracks"],
    days: [
      d("Arrival in Islamabad", "Islamabad", "Welcome at the airport and hotel transfer.", [], { m: "D", stay: "Regalia Hotel, Islamabad", img: "faisal" }),
      d("Fly to Skardu", "Skardu", "", ["Kachura Lakes", "Skardu bazaar"], { stay: "Khar Hotel, Skardu", img: "indus" }),
      d("Shigar Valley", "Shigar", "", ["Shigar Fort", "Sarfaranga Cold Desert"], { stay: "Khoj Resort, Shigar", img: "/destinations/skardu/katpana2.jpg" }),
      d("Deosai National Park", "Deosai", "", ["4x4 to the Deosai plains", "Sheosar Lake picnic"], { stay: "Khar Hotel, Skardu", img: "sheosar" }),
      d("Khaplu", "Khaplu", "", ["Khaplu Palace", "Chaqchan Mosque"], { stay: "Serena Khaplu Palace", img: "khaplu", t: "3 hrs drive" }),
      d("Khaplu to Skardu", "Skardu", "", ["Keris confluence", "Katpana at sunset"], { stay: "Khar Hotel, Skardu", img: "thagus" }),
      d("Fly to Islamabad and depart", "Islamabad", "Morning flight to Islamabad and onward connection.", [], { m: "B" }),
    ] })),
  T("partner", "Partner Brochure", "B2B", "For travel agents in Southeast Asia", () => ({
    title: "Pakistan, beautifully handled", subtitle: "Your ground partner for 2027", kicker: "For travel agents & tour operators", theme: "modern", coverLayout: "full", cover: A.khaplu, backImage: A.raka, status: "Partner",
    hidden: ["glance", "days", "elevation", "stays", "packing", "price", "terms"], introTitle: "A partner on the ground", days: [],
    intro: "Travel Bug Pakistan designs and operates private journeys across Pakistan: Hunza, Skardu, K2 Base Camp, Lahore, Gandhara and beyond. Since 2018 we have built every trip to order, and our guides are working photographers who know where to be and when.\n\nYou sell under your own brand. We handle hotels, flights, vehicles, guides, permits and round-the-clock support, with clear rates and terms.",
    highlights: [{ title: "Your brand, our ground team", items: ["Itineraries supplied with your agency name and group details"] }, { title: "Rates by group size", items: ["Net or commissionable rates quoted for each departure"] }, { title: "Fast proposals", items: ["Day-by-day proposal with photos, route map and inclusions"] }, { title: "One contact", items: ["Direct line to the owner’s team before, during and after the trip"] }], highlightImages: [A.attabad, A.lahore, A.k2],
    collection: [
      { title: "Blossom Photo Tour", meta: "11 days · March to April", text: "Apricot and cherry blossom across Skardu and Hunza.", image: A.spring },
      { title: "Autumn Photo Tour", meta: "9 days · October to November", text: "Golden poplars, dunes and mountain villages.", image: A.yaks },
      { title: "Pakistan Family Discovery", meta: "10 days · April to October", text: "Lahore, Skardu and Hunza, Muslim-friendly and private.", image: A.attabad },
      { title: "Gandhara Buddhist Trail", meta: "7 days · October to April", text: "Taxila, Takht-i-Bahi and the sacred valley of Swat.", image: A.jaulian },
      { title: "Mosques & Mountains", meta: "7 days · September to April", text: "Mughal Lahore, Islamabad and Nathia Gali.", image: A.lahore },
      { title: "K2 Base Camp Expedition", meta: "17 days · June to September", text: "The Baltoro Glacier to Concordia and K2.", image: A.k2 },
    ], included: [...INCLUDED.slice(0, 8), "Domestic flights (round trip)", "Invitation letter for e-Visa application"] })),
  T("roadshow", "Southeast Asia Business Tour", "B2B", "Team trip: KL, Singapore, Jakarta, Bangkok", () => ({
    title: "Southeast Asia Roadshow", subtitle: "Kuala Lumpur · Singapore · Jakarta · Bangkok", kicker: "Travel Bug business tour", theme: "modern", coverLayout: "frame", cover: A.raka, backImage: A.khaplu, start: "2027-01-11", pax: "1", status: "Internal plan", market: "", difficulty: "Business",
    hidden: ["collection", "elevation", "stays", "gallery", "inclusions", "price", "packing", "why", "terms"], introTitle: "Plan for the trip", season: "January 2027 (suggested)",
    intro: "Suggested dates finish in Bangkok for TITF (listed 21–24 January 2027, with B2B matching on 20 January; confirm with the organiser before booking). The route opens in the nonstop market, Malaysia, and leaves before Ramadan.\n\nTarget: three agency meetings per working day, one signed partner per country, and every lead followed up with a proposal the same evening.",
    highlights: [{ title: "Carry", items: ["Partner brochure and four market itineraries on phone and tablet", "Business cards and QR to travelbug.pk"] }, { title: "Ask every agent", items: ["Group size, season, budget, meals, net or commission"] }, { title: "Same evening", items: ["Send the personalised proposal from this builder"] }, { title: "Before flying", items: ["Check visas, fair registration and meeting confirmations"] }], highlightImages: [A.attabad, A.lahore, A.spring],
    travel: [{ title: "Your visas", items: ["Entry rules for Pakistani passports differ by country and sources conflict. Check each official immigration portal and apply early."] }, { title: "Fair access", items: ["Confirm TITF dates, trade registration and B2B matching directly with the organiser."] }, { title: "Malaysia pitch", items: ["Muslim-friendly family tours; nonstop Kuala Lumpur to Lahore."] }, { title: "Singapore pitch", items: ["Small-group photography and K2 trekking."] }, { title: "Indonesia pitch", items: ["Mughal mosques plus mountains for community groups."] }, { title: "Thailand pitch", items: ["Gandhara Buddhist trail; nonstop Bangkok to Pakistan."] }],
    days: [
      d("Arrive Kuala Lumpur", "Kuala Lumpur", "Check in, rest, and confirm tomorrow's meetings.", [], { m: "" }),
      d("Kuala Lumpur: Muslim-friendly agencies", "Kuala Lumpur", "", ["10:00 Meeting: [agency]", "14:00 Meeting: [agency]", "16:30 Meeting: [agency]", "Evening: send proposals"], { m: "" }),
      d("Kuala Lumpur: outbound and photo clubs", "Kuala Lumpur", "", ["10:00 Meeting: [agency]", "15:00 Presentation: [photo club or mosque community]"], { m: "" }),
      d("Fly to Singapore", "Singapore", "", ["Morning flight", "15:00 Meeting: [agency]"], { m: "" }),
      d("Singapore: photography and trekking", "Singapore", "", ["10:00 Meeting: [agency]", "14:00 Meeting: [camera store or photo club]", "Evening: slideshow of Asmar's work"], { m: "" }),
      d("Singapore: follow-up day", "Singapore", "", ["Second meetings and proposals", "Pack and prepare Jakarta files"], { m: "" }),
      d("Fly to Jakarta", "Jakarta", "Check in and confirm meetings.", [], { m: "" }),
      d("Jakarta: Umrah-plus and family agencies", "Jakarta", "", ["10:00 Meeting: [agency]", "14:00 Meeting: [agency]"], { m: "" }),
      d("Fly to Bangkok", "Bangkok", "", ["Morning flight", "Collect fair badges, confirm matching slots"], { m: "" }),
      d("Bangkok: B2B matching (confirm)", "Bangkok", "", ["Trade matching sessions if registered", "Gandhara presentation to heritage agencies"], { m: "" }),
      d("TITF day 1 (confirm)", "Bangkok", "", ["Visit outbound operators", "Book follow-up meetings"], { m: "" }),
      d("TITF day 2 and agencies", "Bangkok", "", ["10:00 Meeting: [agency]", "Afternoon at the fair"], { m: "" }),
      d("Close deals", "Bangkok", "", ["Second meetings", "Summary of leads and promised rates"], { m: "" }),
      d("Return to Pakistan", "Bangkok", "Fly home. Send thank-you messages within 24 hours.", [], { m: "" }),
    ] })),
  T("blank", "Blank itinerary", "Blank", "Start clean, brand ready", () => ({})),
];

/* Every tour already on travelbug.pk becomes a template. */
const guess = (s: string) => ["K2 Base Camp", "Fairy Meadows", "Takht-i-Bahi", "Nathia Gali", "Askole", "Jhula", "Paiju", "Khoburtse", "Urdukas", "Goro II", "Concordia", "Hushe", "Charakusa", "Deosai", "Minimarg", "Khaplu", "Shigar", "Skardu", "Naltar", "Nagar", "Hunza", "Gilgit", "Naran", "Raikot", "Kalam", "Swat", "Kalash", "Chitral", "Shandur", "Murree", "Neelum", "Gwadar", "Cholistan", "Lahore", "Taxila", "Islamabad"].find((p) => s.includes(p)) ?? "";
for (const t of tours) {
  TEMPLATES.splice(TEMPLATES.length - 1, 0, T(`web-${t.slug}`, t.title, "Website tours", `${t.itinerary.length} days · ${t.destination}`, () => ({
    subtitle: t.destination, cover: t.image, backImage: t.images[t.images.length - 1], difficulty: t.difficulty, introTitle: "About this journey", intro: t.description,
    highlights: t.highlights.map((h) => ({ title: h, items: [] })), highlightImages: [0, 1, 2].map((i) => t.images[i % t.images.length]),
    included: [...t.included], excluded: [...t.excluded, EXCLUDED[8]], gallery: [...new Set(t.images)],
    days: t.itinerary.map((x, i) => d(x.title, guess(x.title) || guess(x.description) || guess(t.destination), x.description, [...x.activities], { m: "", img: t.images[i % t.images.length] })),
  })));
}
export const DAY_LIBRARY = () => TEMPLATES.filter((t) => t.id !== "roadshow" && t.id !== "blank").flatMap((t) => t.make().days.map((day) => ({ day, from: t.name })));
export const freshDay = (): Day => d("New day", "", "Describe the day.", [], { m: "BD" });
