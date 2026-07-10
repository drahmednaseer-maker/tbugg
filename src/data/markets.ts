export interface Market {
  slug: string;
  country: string;
  demonym: string;
  flag: string;
  currency: string;
  gatewayCities: string[];
  routeNote: string;
  bestSeasonNote: string;
  visaNote: string;
  intro: string;
  whyPakistan: string[];
}

// Programmatic international landing pages: /pakistan-tours/[slug]
// Content is genuinely differentiated per market (flights, seasons, audience).
export const markets: Market[] = [
  {
    slug: "uk",
    country: "United Kingdom",
    demonym: "British",
    flag: "🇬🇧",
    currency: "GBP (£)",
    gatewayCities: ["London", "Manchester", "Birmingham"],
    routeNote:
      "Direct and one-stop flights connect London, Manchester and Birmingham to Islamabad, Lahore and Karachi, making Pakistan one of the most accessible long-haul adventures from the UK.",
    bestSeasonNote:
      "British travellers love the spring blossom season (March–April) and the golden autumn (September–October); summer is ideal if you want to trek in the Karakoram.",
    visaNote:
      "UK passport holders can apply for Pakistan's online tourist e-visa, usually issued within days. TravelBug.pk provides the tour invitation letter for booked guests.",
    intro:
      "Pakistan is fast becoming the UK's favourite off-the-beaten-path destination — dramatic mountains, warm hospitality and a fraction of the crowds of the Alps or Himalaya. With direct flights from London and Manchester and a shared language, it has never been easier for British travellers to explore Hunza, Skardu and the Karakoram with a photographer-led private guide.",
    whyPakistan: [
      "Direct flights from London & Manchester to Islamabad and Lahore",
      "English widely spoken — easy, comfortable travel",
      "Incredible value compared with European mountain holidays",
      "Ideal for photographers, trekkers and culture seekers alike",
    ],
  },
  {
    slug: "usa",
    country: "United States",
    demonym: "American",
    flag: "🇺🇸",
    currency: "USD ($)",
    gatewayCities: ["New York", "Washington D.C.", "Chicago", "Los Angeles"],
    routeNote:
      "One-stop flights via the Gulf (Doha, Dubai, Abu Dhabi) or Istanbul connect major US cities to Islamabad, Lahore and Karachi in comfortable time.",
    bestSeasonNote:
      "For US travellers we recommend autumn (September–October) for colours and clear skies, or summer (June–August) for the great Karakoram treks.",
    visaNote:
      "US citizens can apply for Pakistan's online tourist e-visa. TravelBug.pk supplies the required tour invitation for booked guests to support the application.",
    intro:
      "For American adventurers seeking somewhere genuinely new, Pakistan delivers Himalayan-scale mountains, ancient cultures and landscapes few travellers from the US have ever seen. TravelBug.pk designs fully private, photographer-led itineraries so you get the trip of a lifetime without the guesswork of independent travel.",
    whyPakistan: [
      "Home to K2 and five of the world's 14 highest peaks",
      "Private, fully-guided travel with English-speaking hosts",
      "Photographer-led access to landscapes off every tourist map",
      "Rich Silk Road history, cuisine and legendary hospitality",
    ],
  },
  {
    slug: "canada",
    country: "Canada",
    demonym: "Canadian",
    flag: "🇨🇦",
    currency: "CAD ($)",
    gatewayCities: ["Toronto", "Vancouver", "Montreal"],
    routeNote:
      "One-stop routes via the Gulf carriers or Europe connect Toronto, Vancouver and Montreal to Pakistan's major cities.",
    bestSeasonNote:
      "Canadian travellers often visit in summer for high-altitude trekking, or in autumn when the valleys turn gold — a spectacular contrast to home.",
    visaNote:
      "Canadian passport holders can apply for Pakistan's online tourist e-visa; TravelBug.pk provides the invitation letter needed for booked tours.",
    intro:
      "Canadians who love the Rockies will feel instantly at home among Pakistan's Karakoram — only taller, wilder and far less travelled. TravelBug.pk crafts private, photographer-led journeys through Hunza, Skardu and beyond, tailored around your interests, fitness and dates.",
    whyPakistan: [
      "Mountains that dwarf the Rockies, with a fraction of the crowds",
      "Fully private, guided itineraries built around you",
      "Strong Pakistani-Canadian ties and warm local welcome",
      "World-class trekking, photography and cultural immersion",
    ],
  },
  {
    slug: "australia",
    country: "Australia",
    demonym: "Australian",
    flag: "🇦🇺",
    currency: "AUD ($)",
    gatewayCities: ["Sydney", "Melbourne", "Perth"],
    routeNote:
      "One-stop flights via the Gulf or Southeast Asia connect Sydney, Melbourne and Perth to Islamabad and Lahore.",
    bestSeasonNote:
      "The northern-hemisphere summer (June–August) aligns perfectly with Australia's winter — ideal timing for a Karakoram trekking escape.",
    visaNote:
      "Australian citizens can apply for Pakistan's online tourist e-visa. Booked TravelBug.pk guests receive the supporting tour invitation.",
    intro:
      "For Australians chasing big mountains and bigger adventures, Pakistan is the Himalaya's best-kept secret. Escape the southern winter for the high Karakoram, alpine meadows and ancient valleys — all on a fully private, photographer-led tour designed around you.",
    whyPakistan: [
      "Perfect timing — Pakistan's peak season is the Aussie winter",
      "Epic trekking to K2, Charakusa and Fairy Meadows",
      "Private guides and hand-picked accommodation throughout",
      "Unforgettable landscapes and photography at every turn",
    ],
  },
  {
    slug: "uae",
    country: "United Arab Emirates",
    demonym: "UAE-based",
    flag: "🇦🇪",
    currency: "AED (د.إ)",
    gatewayCities: ["Dubai", "Abu Dhabi", "Sharjah"],
    routeNote:
      "Frequent direct flights — often just 2–3 hours — connect Dubai, Abu Dhabi and Sharjah to Islamabad, Lahore, Skardu and Gilgit, making Pakistan a perfect long-weekend or holiday escape.",
    bestSeasonNote:
      "Trade the summer heat for cool mountain air: June–August is ideal in the northern valleys, while spring blossoms and autumn colours are equally spectacular.",
    visaNote:
      "UAE residents and GCC-based travellers can apply for Pakistan's online e-visa; many nationalities are also eligible for visa-on-arrival with a tour operator invitation, which TravelBug.pk can arrange.",
    intro:
      "From Dubai, the peaks of Pakistan are barely a few hours away — yet a world apart. Swap the summer heat for the cool valleys of Hunza and Skardu on a private, photographer-led tour. Whether it's a family holiday or a quick mountain escape, TravelBug.pk makes it effortless.",
    whyPakistan: [
      "Short 2–3 hour direct flights from the UAE",
      "Cool mountain escape from the Gulf summer",
      "Family-friendly private tours and flexible dates",
      "Blossoms, glaciers and Karakoram peaks within easy reach",
    ],
  },
  {
    slug: "germany",
    country: "Germany",
    demonym: "German",
    flag: "🇩🇪",
    currency: "EUR (€)",
    gatewayCities: ["Frankfurt", "Munich", "Berlin"],
    routeNote:
      "One-stop flights via the Gulf or Istanbul connect Frankfurt, Munich and Berlin to Islamabad and Lahore.",
    bestSeasonNote:
      "German trekkers favour the summer season (June–August) for the Karakoram, while autumn offers superb light and stable weather for photography.",
    visaNote:
      "German passport holders can apply for Pakistan's online tourist e-visa; TravelBug.pk provides the invitation letter for booked expeditions.",
    intro:
      "Germany's passion for the mountains finds its ultimate expression in Pakistan's Karakoram — the greatest concentration of high peaks on earth. TravelBug.pk offers meticulously organised, photographer-led private treks and tours, combining German-standard logistics with genuinely wild terrain.",
    whyPakistan: [
      "The world's finest trekking, from K2 to Charakusa",
      "Carefully organised logistics and experienced mountain crews",
      "Photographer-led access to pristine alpine landscapes",
      "Deep culture, hospitality and history along the Silk Road",
    ],
  },
  {
    slug: "netherlands",
    country: "Netherlands",
    demonym: "Dutch",
    flag: "🇳🇱",
    currency: "EUR (€)",
    gatewayCities: ["Amsterdam"],
    routeNote:
      "One-stop flights from Amsterdam via the Gulf or Istanbul reach Islamabad and Lahore comfortably.",
    bestSeasonNote:
      "Dutch travellers love the spring blossoms (March–April) and autumn colours (September–October); summer suits high-altitude trekking.",
    visaNote:
      "Dutch passport holders can apply for Pakistan's online tourist e-visa. Booked TravelBug.pk guests receive the required tour invitation.",
    intro:
      "For Dutch travellers used to flat horizons, Pakistan's soaring Karakoram is a revelation. Our photographer-led private tours take you from the pink blossom valleys of Hunza to the granite giants of Charakusa — every day framed for the perfect shot.",
    whyPakistan: [
      "Dramatic mountains — the ultimate contrast to the lowlands",
      "Photographer-led itineraries built for stunning images",
      "Private, flexible travel with trusted local guides",
      "Blossoms, glaciers, deserts and culture in one trip",
    ],
  },
  {
    slug: "singapore",
    country: "Singapore",
    demonym: "Singaporean",
    flag: "🇸🇬",
    currency: "SGD ($)",
    gatewayCities: ["Singapore"],
    routeNote:
      "One-stop flights from Singapore via the Gulf connect to Islamabad, Lahore and Karachi.",
    bestSeasonNote:
      "Escape the tropical heat and humidity for cool mountain air — June–August is superb in the north, with spring and autumn equally rewarding.",
    visaNote:
      "Singaporean passport holders can apply for Pakistan's online tourist e-visa; TravelBug.pk supplies the invitation for booked tours.",
    intro:
      "Singaporeans seeking cool air, big mountains and genuine adventure will find Pakistan an exhilarating change of pace. TravelBug.pk designs private, photographer-led journeys through the Karakoram and beyond — comfortable, well-organised and unforgettable.",
    whyPakistan: [
      "A cool, high-altitude escape from the tropics",
      "Fully private, guided and hassle-free travel",
      "Spectacular trekking and photography destinations",
      "Rich culture, cuisine and legendary hospitality",
    ],
  },
];

export function getMarket(slug: string): Market | undefined {
  return markets.find((m) => m.slug === slug);
}
