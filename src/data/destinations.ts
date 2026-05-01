export interface Destination {
  id: string;
  name: string;
  region: string;
  description: string;
  tag: string;
  images: string[];
  tourSlug: string;
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
    description: "Pristine Arabian Sea coastline, Ormara beaches & the untouched Makran coastal highway",
    tag: "Coastal",
    images: [
      "/destinations/kashmir/kashmir1.jpg",
      "/autumn-indus.jpg",
      "/skardu-katpana.jpg",
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
    images: ["/chitral-haldi.jpg", "/autumn-gulmit.jpg", "/autumn-keris.jpg"],
    tourSlug: "kalash-valley-cultural-tour",
  },
  {
    id: "taxila",
    name: "Taxila & Gandhara",
    region: "KPK / Punjab",
    description: "Ancient Buddhist monasteries and stupas — one of the world's greatest archaeological sites",
    tag: "Religious",
    images: [
      "/destinations/lahore/lahore_fort.jpg",
      "/autumn-kundus.jpg",
      "/autumn-thagus.jpg",
    ],
    tourSlug: "lahore-heritage-luxury",
  },
  {
    id: "shandur",
    name: "Shandur Polo Festival",
    region: "Chitral / Gilgit",
    description: "The world's highest polo ground at 3,700m — electrifying sport, culture & mountain scenery",
    tag: "Sports",
    images: ["/shandur-polo.jpg", "/spring-gulshan.jpg", "/autumn-jamalabad.jpg"],
    tourSlug: "fairy-meadows-nanga-parbat",
  },
  {
    id: "charakusa",
    name: "Charakusa Valley",
    region: "Hushe, Gilgit-Baltistan",
    description: "K6 & K7 granite giants towering above pristine glacier — Pakistan's most dramatic and least-visited alpine wilderness",
    tag: "Expedition",
    images: [
      "/destinations/charakusa/charakusa_basecamp.jpg",
      "/destinations/skardu/katpana_desert.jpg",
      "/destinations/skardu/indus_river.jpg",
    ],
    tourSlug: "charakusa-valley-exploration",
  },
];


