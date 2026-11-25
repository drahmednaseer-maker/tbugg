"use client";
import { usePathname } from "next/navigation";

/** Header, footer and WhatsApp button stay off the itinerary studio. */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return usePathname().startsWith("/itineraries") ? null : <>{children}</>;
}
