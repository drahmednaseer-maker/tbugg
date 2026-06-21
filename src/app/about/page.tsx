import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn the story behind TravelBug — crafting extraordinary, photographer-led journeys across Pakistan since 2018. Meet our team and discover our mission to inspire curious travelers.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutClient />;
}
