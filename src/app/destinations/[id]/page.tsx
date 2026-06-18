import { Metadata } from "next";
import { notFound } from "next/navigation";
import { destinations } from "@/data/destinations";
import DestinationClient from "./DestinationClient";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const dest = destinations.find(d => d.id === id);
  if (!dest) return { title: "Destination Not Found | TravelBug.pk" };

  return {
    title: `${dest.name} — Photographer-Led Tours | TravelBug.pk`,
    description: dest.description,
    alternates: { canonical: `/destinations/${dest.id}` },
  };
}

export default async function DestinationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dest = destinations.find(d => d.id === id);
  if (!dest) notFound();

  const url = `https://travelbug.pk/destinations/${dest.id}`;
  const destinationJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: dest.name,
    description: dest.description,
    url,
    image: dest.images?.map((img) => `https://travelbug.pk${img}`),
    address: {
      "@type": "PostalAddress",
      addressRegion: dest.region,
      addressCountry: "PK",
    },
    includedInDataCatalog: { "@type": "TravelAgency", name: "TravelBug.pk", url: "https://travelbug.pk" },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://travelbug.pk" },
      { "@type": "ListItem", position: 2, name: "Destinations", item: "https://travelbug.pk/destinations" },
      { "@type": "ListItem", position: 3, name: dest.name, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(destinationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <DestinationClient destination={dest} />
    </>
  );
}

export function generateStaticParams() {
  return destinations.map((d) => ({
    id: d.id,
  }));
}
