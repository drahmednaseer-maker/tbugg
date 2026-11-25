import type { Metadata } from "next";
import MotionProvider from "@/components/MotionProvider";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us — Photographer-Led Pakistan Tours",
  description:
    "Meet the photographers behind TravelBug — crafting private, photographer-led journeys across Pakistan since 2018, and the mission that drives them.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <MotionProvider><AboutClient /></MotionProvider>;
}
