import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn the story behind TravelBug — 15 years of crafting extraordinary journeys. Meet our team and discover our mission to inspire curious travelers worldwide.",
};

export default function AboutPage() {
  return <AboutClient />;
}
