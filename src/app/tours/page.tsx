import type { Metadata } from "next";
import MotionProvider from "@/components/MotionProvider";
import ToursClient from "./ToursClient";
import { tours } from "@/data/tours";

export const metadata: Metadata = {
  title: "Pakistan Tour Packages — Custom Private Tours",
  description: `Browse ${tours.length} photographer-led Pakistan tours — Hunza, Skardu, K2, Fairy Meadows, Chitral and more. Every trip is fully customised to your group and dates.`,
  alternates: { canonical: "/tours" },
};

export default function ToursPage() {
  return (
    <MotionProvider><ToursClient /></MotionProvider>
  );
}
