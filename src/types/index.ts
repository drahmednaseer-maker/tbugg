export interface Tour {
  id: string;
  slug: string;
  title: string;
  destination: string;
  country: string;
  duration: number; // days
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: "budget" | "luxury" | "adventure";
  image: string;
  images: string[];
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: ItineraryDay[];
  description: string;
  shortDescription: string;
  maxGroupSize: number;
  difficulty: "Easy" | "Moderate" | "Challenging";
  featured?: boolean;
  themes?: string[]; // landing-page category tags e.g. ["Blossoms","Karakorams"]
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  tourCount: number;
  startingPrice: number;
  description: string;
  tag?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  review: string;
  tour: string;
  date: string;
  /** True for reviews taken verbatim from the Google Business profile */
  verified?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export type FilterCategory = "all" | "budget" | "luxury" | "adventure";
export type ViewMode = "grid" | "list";
