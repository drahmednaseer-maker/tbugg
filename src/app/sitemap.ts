import type { MetadataRoute } from "next";
import { tours } from "@/data/tours";
import { destinations } from "@/data/destinations";

const BASE_URL = "https://travelbug.pk";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/tours", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/destinations", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/why-travelbug", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/traveler-stories", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
  ].map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const tourRoutes = tours.map((t) => ({
    url: `${BASE_URL}/tours/${t.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const destinationRoutes = destinations.map((d) => ({
    url: `${BASE_URL}/destinations/${d.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...tourRoutes, ...destinationRoutes];
}
