export interface ExpeditionDay {
  day: number;
  route: string;        // e.g. "Islamabad → Skardu → Khaplu"
  summary: string;      // short narrative line
  activities: string[];
  overnight: string;    // e.g. "Nangma Base Camp"
  stay: "hotel" | "camp"; // drives the accommodation icon
}

export interface Expedition {
  title: string;
  tagline: string;
  durationDays: number;
  nights: number;
  difficulty: string;
  bestSeason: string;
  maxAltitude: string;
  groupType: string;
  overview: string;
  highlights: string[];
  itinerary: ExpeditionDay[];
  included: string[];
  excluded: string[];
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  description: string;
  tag: string;
  images: string[];
  tourSlug: string;
  cardTitle?: string; // optional override for the featured-card title
  expedition?: Expedition;
}

export const destinations: Destination[] = [
  {
    id: "hunza",
    name: "Hunza Valley",
    region: "Gilgit-Baltistan",
    description: "Cherry & apricot blossoms paint the valley pink every spring — one of Pakistan's most magical sights",
    tag: "Blossoms",
    images: ["/spring-passu.jpg", "/hunza-passu-cones.jpg", "/spring-blossoms.jpg"],
    tourSlug: "hunza-valley-blossoms-tour",
  },
  {
    id: "skardu",
    name: "Skardu",
    region: "Gilgit-Baltistan",
    description: "Autumn golds across Katpana desert, Shangrila lake & the Indus valley — nature's most dramatic palette",
    tag: "Autumn",
    images: ["/autumn-katpana.jpg", "/autumn-skardu.jpg", "/autumn-machlu.jpg"],
    tourSlug: "skardu-shigar-luxury-retreat",
  },
  {
    id: "cultural",
    name: "Lahore & Kalash",
    region: "Punjab / KPK",
    description: "Mughal forts, Sufi shrines & the vibrant Kalash people — Pakistan's living cultural treasures",
    tag: "Cultural",
    images: ["/kalash.jpg", "/destinations/chitral/kalash_portrait.jpg", "/chitral-haldi.jpg"],
    tourSlug: "lahore-heritage-cultural-tour",
  },
  {
    id: "gwadar",
    name: "Gwadar",
    region: "Balochistan",
    description: "Pristine Arabian Sea coastline, Hammerhead peninsula & the untouched Makran coastal highway",
    tag: "Coastal",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Pakistan_Balochistan_province_-_Gwadar_IMG_7936.jpg/1280px-Pakistan_Balochistan_province_-_Gwadar_IMG_7936.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/f/f7/Princess_of_hope_Balochistan.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Makran_Coastal_Highway.jpg/1280px-Makran_Coastal_Highway.jpg",
    ],
    tourSlug: "gwadar-coastal-luxury",
  },
  {
    id: "karakorams",
    name: "Karakoram Peaks",
    region: "Gilgit-Baltistan",
    description: "K2, Broad Peak, the Gasherbrums — the world's greatest concentration of high peaks, explored up close",
    tag: "Karakorams",
    images: ["/mountains-haldi.jpg", "/mountains-haldi2.jpg", "/skardu-katpana2.jpg"],
    tourSlug: "k2-basecamp-expedition",
  },
  {
    id: "chitral",
    name: "Chitral & Hindu Kush",
    region: "Khyber Pakhtunkhwa",
    description: "Ancient Kalash culture, stunning Hindu Kush valleys & the world's most unique living civilisation",
    tag: "Adventure",
    images: ["/kalash.jpg", "/shandur-polo.jpg", "https://upload.wikimedia.org/wikipedia/commons/8/81/Tirich_Mir_Hindu_Kush_Chitral%3B_Tahsin_Shah_06.jpg"],
    tourSlug: "kalash-valley-cultural-tour",
  },
  {
    id: "taxila",
    name: "Taxila & Gandhara",
    region: "KPK / Punjab",
    description: "Ancient Buddhist monasteries and stupas — one of the world's greatest archaeological sites",
    tag: "Religious",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Dharmarajika_stupa_%26_Monastery_Taxila.jpg/1280px-Dharmarajika_stupa_%26_Monastery_Taxila.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Jaulian_Buddhist_Monastery_in_Taxila.jpg/1280px-Jaulian_Buddhist_Monastery_in_Taxila.jpg",
    ],
    tourSlug: "lahore-heritage-luxury",
  },
  {
    id: "shandur",
    name: "Shandur Polo Festival",
    region: "Chitral / Gilgit",
    description: "The world's highest polo ground at 3,700m — electrifying sport, culture & mountain scenery",
    tag: "Sports",
    images: ["/shandur-polo.jpg", "https://upload.wikimedia.org/wikipedia/commons/2/28/Hindukush_Mountains.jpg"],
    tourSlug: "kalash-valley-cultural-tour",
  },
  {
    id: "charakusa",
    name: "Charakusa Valley",
    region: "Hushe, Gilgit-Baltistan",
    description: "K6 & K7 granite giants towering above pristine glacier — Pakistan's most dramatic and least-visited alpine wilderness",
    tag: "Expedition",
    cardTitle: "Charakusa & Nangma Valley Trek",
    images: [
      "/destinations/charakusa/charakusa_basecamp.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/a/a6/Hindu_Kush_mountains_%2830357238428%29.jpg",
      "/skardu-katpana2.jpg",
    ],
    tourSlug: "charakusa-valley-exploration",
    expedition: {
      title: "Charakusa & Nangma Valley Photography & Trek Expedition",
      tagline: "Fourteen days across Pakistan's greatest granite amphitheatre — from Nangma's cathedral walls to the base of K6 & K7.",
      durationDays: 14,
      nights: 13,
      difficulty: "Challenging — high-altitude trekking",
      bestSeason: "June – September",
      maxAltitude: "≈ 4,900 m · K6 / K7 Base Camp",
      groupType: "Private & small-group departures",
      overview:
        "This is one of Pakistan's most spectacular trekking expeditions — a fourteen-day journey through the twin wildernesses of the Nangma and Charakusa Valleys in the heart of the Karakoram. Designed for photographers, trekkers and serious adventure seekers, it threads together towering granite walls, living glaciers, wildflower meadows and the legendary base camp of K6 (7,282 m) and K7 (6,934 m). You travel with professional photographer guides and a full mountain crew — cook, guides and porters — sleeping under some of the darkest, star-filled skies on earth, and waking to alpenglow on peaks that only a handful of travellers ever witness.",
      highlights: [
        "Two of the Karakoram's most legendary valleys — Nangma, 'Pakistan's Yosemite', and Charakusa — in a single expedition",
        "Trek to the base camp of K6 (7,282 m) and K7 (6,934 m), ringed by some of the finest granite spires on the planet",
        "Cross the Tsarak Tsa Glacier and remote moraines that see only a handful of visitors each season",
        "Golden-hour photography at Korean Base Camp and Nangma's sheer cathedral walls",
        "Led by professional landscape photographers with a full camping crew, cook and porters",
        "Authentic Balti hospitality in the mountain villages of Khaplu, Kanday and Hushe",
      ],
      itinerary: [
        {
          day: 1,
          route: "Islamabad → Skardu → Khaplu",
          summary: "Fly north over the Karakoram (weather permitting) and drive to the historic town of Khaplu.",
          activities: [
            "Scenic flight from Islamabad to Skardu (subject to weather), or overland by road",
            "Continue the dramatic drive along the Shyok River to Khaplu",
            "Check in, relax and acclimatise",
          ],
          overnight: "Hotel — Khaplu",
          stay: "hotel",
        },
        {
          day: 2,
          route: "Khaplu → Kanday → Minglu Broq",
          summary: "Meet your mountain crew and take the first steps into the Nangma Valley.",
          activities: [
            "Early morning jeep drive to Kanday Village",
            "Meet the trekking staff and prepare expedition equipment",
            "Trek 4–5 hours to Minglu Broq and set up your first wilderness camp",
          ],
          overnight: "Camping — Minglu Broq",
          stay: "camp",
        },
        {
          day: 3,
          route: "Minglu Broq → Nangma Base Camp",
          summary: "A short, scenic climb into the granite heart of Nangma.",
          activities: [
            "Gentle 2-hour trek to Nangma Base Camp",
            "First close-up views of the valley's dramatic granite peaks",
            "Afternoon at leisure to settle into base camp",
          ],
          overnight: "Camping — Nangma Base Camp",
          stay: "camp",
        },
        {
          day: 4,
          route: "Nangma Base Camp — Rest & Photography",
          summary: "An acclimatisation day dedicated to the light.",
          activities: [
            "Full acclimatisation day at altitude",
            "Full-day landscape photography around the cathedral walls",
            "Optional short walks to nearby viewpoints",
          ],
          overnight: "Camping — Nangma Base Camp",
          stay: "camp",
        },
        {
          day: 5,
          route: "Korean Base Camp Excursion",
          summary: "A day trek to one of Nangma's finest vantage points.",
          activities: [
            "Trek to Korean Base Camp beneath the great granite towers",
            "Photography and exploration of the upper valley",
            "Return to Nangma Base Camp before sunset",
          ],
          overnight: "Camping — Nangma Base Camp",
          stay: "camp",
        },
        {
          day: 6,
          route: "Nangma → Kanday → Hushe",
          summary: "Descend out of Nangma and transfer to the gateway village of Hushe.",
          activities: [
            "Trek back down to Kanday (4–5 hours)",
            "Jeep transfer to the village of Hushe",
            "Evening rest before the Charakusa trek begins",
          ],
          overnight: "Camp / Hotel — Hushe",
          stay: "hotel",
        },
        {
          day: 7,
          route: "Hushe → Saicho",
          summary: "The Charakusa Valley trek begins with a gentle riverside hike.",
          activities: [
            "Begin the trek into the Charakusa Valley",
            "Easy 3–4 hour hike to the green meadows of Saicho",
            "Camp beside the river, surrounded by peaks",
          ],
          overnight: "Camping — Saicho",
          stay: "camp",
        },
        {
          day: 8,
          route: "Saicho → Ankam",
          summary: "A bigger day across moraine and glacier into the high valley.",
          activities: [
            "Cross rocky moraine and the Tsarak Tsa Glacier",
            "Demanding 5–7 hour trek deeper into the range",
            "Camp at Ankam beneath towering walls",
          ],
          overnight: "Camping — Ankam",
          stay: "camp",
        },
        {
          day: 9,
          route: "Ankam → K6 / K7 Base Camp",
          summary: "Arrive at the expedition's grand centrepiece.",
          activities: [
            "Trek 4–5 hours to K6 / K7 Base Camp",
            "Panoramic Karakoram views in every direction",
            "Settle into base camp for the days ahead",
          ],
          overnight: "Camping — K6 / K7 Base Camp",
          stay: "camp",
        },
        {
          day: 10,
          route: "K6 / K7 Base Camp — Relax & Photography",
          summary: "A full day to absorb the giants and shoot golden light.",
          activities: [
            "Leisure and recovery day at base camp",
            "Sunrise and sunset photography on the granite spires",
            "Optional short walks to nearby vantage points",
          ],
          overnight: "Camping — K6 / K7 Base Camp",
          stay: "camp",
        },
        {
          day: 11,
          route: "Explore Charakusa Valley",
          summary: "Roam the upper valley's hidden viewpoints.",
          activities: [
            "Explore surrounding viewpoints and glacier edges",
            "Full-day photography across the amphitheatre of peaks",
            "Final night beneath the Karakoram's finest walls",
          ],
          overnight: "Camping — K6 / K7 Base Camp",
          stay: "camp",
        },
        {
          day: 12,
          route: "Charakusa Valley → Hushe",
          summary: "The long, rewarding descent back to green villages.",
          activities: [
            "Return trek of 7–8 hours down the valley",
            "Lunch stop at Saicho",
            "Arrive Hushe for a well-earned rest",
          ],
          overnight: "Camp / Hotel — Hushe",
          stay: "hotel",
        },
        {
          day: 13,
          route: "Hushe → Skardu",
          summary: "Back to civilisation and the shores of the Indus.",
          activities: [
            "Scenic drive from Hushe to Skardu",
            "Free evening to relax and celebrate the expedition",
          ],
          overnight: "Hotel — Skardu",
          stay: "hotel",
        },
        {
          day: 14,
          route: "Skardu → Islamabad",
          summary: "Farewell to the mountains.",
          activities: [
            "Return to Islamabad by air (subject to weather) or road",
            "End of expedition",
          ],
          overnight: "Departure",
          stay: "hotel",
        },
      ],
      included: [
        "Professional photographer-guide and experienced mountain leader",
        "Full camping crew — cook, guides and porters — with all group equipment",
        "All camping nights and hotel accommodation as per the itinerary",
        "All meals on trek plus breakfast at hotels",
        "All ground transfers, jeeps and permits within the itinerary",
        "Trekking and national-park permits and local fees",
      ],
      excluded: [
        "International flights and Islamabad–Skardu airfare",
        "Travel insurance (mandatory) and any evacuation costs",
        "Personal trekking gear, sleeping bag and clothing",
        "Meals in cities, drinks, tips and personal expenses",
        "Anything not specifically listed under 'What's included'",
      ],
    },
  },
];


