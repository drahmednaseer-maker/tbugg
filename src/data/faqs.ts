export interface FAQ {
  question: string;
  answer: string;
}

// Site-wide FAQs — answer-engine (AEO) friendly, factual, concise.
export const generalFaqs: FAQ[] = [
  {
    question: "Is Pakistan safe for tourists in 2026?",
    answer:
      "Yes. Northern Pakistan — Hunza, Skardu, Gilgit-Baltistan and the Kashmir valleys — is considered very safe for tourists and is one of Asia's fastest-growing adventure destinations. TravelBug.pk has hosted travellers from the UK, USA, Europe, the Gulf and beyond since 2018. We travel with local guides, vetted drivers and trusted accommodation, and we brief every guest on current conditions before departure.",
  },
  {
    question: "Do I need a visa to visit Pakistan?",
    answer:
      "Most nationalities can apply for Pakistan's online e-visa through the official government portal, and tourist visas are typically issued within days. Citizens of many countries are also eligible for visa-on-arrival with an approved tour operator invitation, which TravelBug.pk can provide for booked guests. Always confirm the latest requirements on Pakistan's official e-visa website before you travel.",
  },
  {
    question: "What is the best time to visit Pakistan?",
    answer:
      "The two headline seasons are spring (mid-March to April) for the famous cherry and apricot blossoms in Hunza, and autumn (late September to October) for golden poplars and clear mountain views across Skardu and Gilgit-Baltistan. Summer (May to August) is ideal for high-altitude treks such as K2 Base Camp, Charakusa and Fairy Meadows, while winter suits Lahore, cultural tours and snow landscapes.",
  },
  {
    question: "How much does a tour of Pakistan cost?",
    answer:
      "TravelBug.pk builds 100% customised private tours, so the price depends on duration, group size, accommodation level and route. We offer budget, luxury and adventure tiers across 21+ itineraries. Share your dates and interests and we'll send a tailored quote — there are no fixed packages, so you only pay for the trip you actually want.",
  },
  {
    question: "Who runs TravelBug.pk?",
    answer:
      "TravelBug.pk is a photographers-led tour operator founded in 2018 and based in Pakistan. Trips are guided by professional landscape photographers Muhammad Asmar Hussain and Uzair Ahmed, who specialise in taking travellers to the best light, angles and hidden viewpoints across Pakistan.",
  },
  {
    question: "Is Pakistan suitable for solo female travellers?",
    answer:
      "Yes. Many of our guests are solo female travellers, and our private, guided format is designed for comfort and safety. You are accompanied by professional guides throughout, stay in trusted accommodation, and can travel at your own pace. We're happy to connect prospective guests with past female travellers for reassurance.",
  },
  {
    question: "What kind of tours does TravelBug.pk offer?",
    answer:
      "We specialise in customised private journeys across Pakistan: photography tours, cultural and heritage tours in Lahore and the Kalash valleys, high-altitude treks and expeditions in the Karakoram, and relaxed scenic road trips through Hunza, Skardu, Kashmir and Minimarg. Every itinerary is tailored to your interests.",
  },
];

// Per-destination FAQs keyed by destination id.
export const destinationFaqs: Record<string, FAQ[]> = {
  hunza: [
    {
      question: "When do the blossoms bloom in Hunza?",
      answer:
        "Hunza's cherry, apricot and almond blossoms typically peak from mid-March to mid-April, painting the valley pink and white against the snow-capped Karakoram. Exact timing shifts a week or two each year with the weather, so we monitor conditions closely and advise the best window for your trip.",
    },
    {
      question: "How do you get to Hunza Valley?",
      answer:
        "Hunza is reached via the Karakoram Highway from Islamabad (a scenic 2-day drive with stops), or by flying to Gilgit and driving 2–3 hours north. TravelBug.pk arranges all transport, so you simply enjoy the journey along one of the world's most spectacular roads.",
    },
  ],
  skardu: [
    {
      question: "What is the best time to visit Skardu?",
      answer:
        "Skardu is stunning in autumn (late September to October) when the Katpana desert, Shangrila and the Indus valley turn gold, and in summer (May to August) for trekking and expeditions. Roads and flights are most reliable in these months.",
    },
    {
      question: "Can you fly to Skardu?",
      answer:
        "Yes — there are flights from Islamabad to Skardu, though they are weather-dependent and can be cancelled at short notice. TravelBug.pk always plans a road alternative along the Karakoram Highway so your itinerary stays on track.",
    },
  ],
  charakusa: [
    {
      question: "How difficult is the Charakusa Valley trek?",
      answer:
        "The Charakusa and Nangma Valley expedition is a challenging high-altitude trek reaching around 4,900 m at K6/K7 Base Camp, with long days crossing moraine and glacier. It suits reasonably fit trekkers with some prior hiking experience. Our crew, porters and acclimatisation days make it achievable for determined first-time expedition travellers.",
    },
    {
      question: "When is the best time to trek Charakusa?",
      answer:
        "The trekking season for Charakusa and Nangma runs from June to September, when the high passes are clear of snow and the weather is most stable for camping and photography at K6/K7 Base Camp.",
    },
  ],
};
