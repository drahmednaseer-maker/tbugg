import type { Metadata } from "next";
import { Bebas_Neue, Caveat_Brush, Cormorant_Garamond, Rubik_Dirt } from "next/font/google";
import "@/features/studio/doc.css";
import "@/features/studio/studio.css";

const a = Rubik_Dirt({ weight: "400", subsets: ["latin"], variable: "--f-stamp", preload: false });
const b = Caveat_Brush({ weight: "400", subsets: ["latin"], variable: "--f-brush", preload: false });
const c = Cormorant_Garamond({ weight: ["600"], subsets: ["latin"], variable: "--f-serif", preload: false });
const d = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--f-poster", preload: false });

export const metadata: Metadata = { title: "Itinerary Studio", description: "Travel Bug itinerary builder.", robots: { index: false, follow: false } };
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`${a.variable} ${b.variable} ${c.variable} ${d.variable}`}>{children}</div>;
}
