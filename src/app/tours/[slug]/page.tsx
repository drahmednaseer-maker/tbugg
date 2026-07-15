import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { tours, getTourBySlug } from "@/data/tours";
import TourDetailClient from "./TourDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return { title: "Tour Not Found" };
  return {
    title: tour.title,
    description: tour.shortDescription,
    alternates: { canonical: `/tours/${tour.slug}` },
    openGraph: {
      title: tour.title,
      description: tour.shortDescription,
      images: [{ url: tour.image, width: 1200, height: 630, alt: tour.title }],
    },
  };
}

export default async function TourDetailPage({ params }: Props) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  const url = `https://travelbug.pk/tours/${tour.slug}`;
  const tripJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.shortDescription,
    image: `https://travelbug.pk${tour.image}`,
    url,
    touristType: "Leisure, Adventure, Photography",
    itinerary: {
      "@type": "ItemList",
      numberOfItems: tour.itinerary?.length ?? 0,
      itemListElement: (tour.itinerary ?? []).map((d, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "TouristAttraction", name: d.title, description: d.description },
      })),
    },
    // Only advertise a price when we actually have one; custom-quote tours
    // (price 0) omit the Offer so search engines never show "PKR 0".
    ...(tour.price > 0
      ? {
          offers: {
            "@type": "Offer",
            price: tour.price,
            priceCurrency: "PKR",
            availability: "https://schema.org/InStock",
            url,
          },
        }
      : {}),
    provider: { "@type": "TravelAgency", name: "TravelBug.pk", url: "https://travelbug.pk" },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://travelbug.pk" },
      { "@type": "ListItem", position: 2, name: "Tours", item: "https://travelbug.pk/tours" },
      { "@type": "ListItem", position: 3, name: tour.title, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tripJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <TourDetailClient tour={tour} />
    </>
  );
}
