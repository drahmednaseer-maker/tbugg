import { Metadata } from "next";
import { notFound } from "next/navigation";
import { destinations } from "@/data/destinations";
import DestinationClient from "./DestinationClient";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const dest = destinations.find(d => d.id === params.id);
  if (!dest) return { title: "Destination Not Found | TravelBug.pk" };

  return {
    title: `${dest.name} — Photographer-Led Tours | TravelBug.pk`,
    description: dest.description,
  };
}

export default function DestinationPage({ params }: { params: { id: string } }) {
  const dest = destinations.find(d => d.id === params.id);
  if (!dest) notFound();

  return <DestinationClient destination={dest} />;
}

export function generateStaticParams() {
  return destinations.map((d) => ({
    id: d.id,
  }));
}
