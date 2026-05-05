import type { Metadata } from "next";
import { Suspense } from "react";
import ToursClient from "./ToursClient";

export const metadata: Metadata = {
  title: "Tours",
  description:
    "Browse 120+ handpicked tour packages — luxury, adventure, and budget options with filters by destination, duration, and price. Find your perfect trip.",
};

export default function ToursPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
      <ToursClient />
    </Suspense>
  );
}
