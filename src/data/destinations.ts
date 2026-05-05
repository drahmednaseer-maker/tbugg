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
    images: [
      "/destinations/charakusa/charakusa_basecamp.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/a/a6/Hindu_Kush_mountains_%2830357238428%29.jpg",
      "/skardu-katpana2.jpg",
    ],
    tourSlug: "charakusa-valley-exploration",
  },
];


