import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Providers from "@/components/Providers";
import ServiceWorkerCleanup from "@/components/ServiceWorkerCleanup";
import { testimonials } from "@/data/testimonials";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://travelbug.pk"),
  title: {
    default: "TravelBug.pk — Pakistan's #1 Customized Tour Specialists",
    template: "%s | TravelBug.pk",
  },
  description:
    "TravelBug.pk crafts 100% personalized journeys across Pakistan — Hunza, Skardu, Minimarg, Lahore, Kashmir & beyond. Founded 2018, Wah Cantt.",
  keywords: ["Pakistan tours", "Hunza tour", "Skardu tour", "customized Pakistan travel", "Minimarg", "Kashmir tour", "TravelBug pk"],
  authors: [{ name: "TravelBug.pk" }],
  openGraph: {
    type: "website",
    siteName: "TravelBug.pk",
    title: "TravelBug.pk — Pakistan's #1 Customized Tour Specialists",
    description:
      "100% personalized Pakistan travel — Hunza, Skardu, Kashmir, Lahore & beyond. Private tours. No fixed packages. Founded 2018.",
    images: [
      {
        url: "/destinations/hunza/attabad_lake.jpg",
        width: 1200,
        height: 630,
        alt: "TravelBug.pk — Pakistan Tours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TravelBug.pk — Pakistan's #1 Customized Tour Specialists",
    description: "100% personalized Pakistan travel — Hunza, Skardu, Kashmir & beyond.",
  },
  robots: {
    index: true,
    follow: true,
  },
  // Set these in Vercel env vars once you claim the site in Google Search Console / Bing.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : {},
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": "https://travelbug.pk/#organization",
  name: "TravelBug.pk",
  description:
    "Photographer-led, 100% customized tours across Pakistan — Hunza, Skardu, Minimarg, Kashmir, Lahore & beyond.",
  url: "https://travelbug.pk",
  logo: "https://travelbug.pk/logo.png",
  image: "https://travelbug.pk/destinations/hunza/attabad_lake.jpg",
  foundingDate: "2018",
  priceRange: "$$",
  telephone: "+923248888889",
  email: "Info@travelbug.pk",
  address: {
    "@type": "PostalAddress",
    streetAddress: "B-89, Post Office Rd, Wah Cantt",
    addressLocality: "Wah Cantt",
    addressRegion: "Punjab",
    postalCode: "47040",
    addressCountry: "PK",
  },
  areaServed: { "@type": "Country", name: "Pakistan" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: (
      testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
    ).toFixed(1),
    reviewCount: testimonials.length,
    bestRating: 5,
    worstRating: 1,
  },
  review: testimonials.slice(0, 5).map((t) => ({
    "@type": "Review",
    author: { "@type": "Person", name: t.name },
    reviewRating: { "@type": "Rating", ratingValue: t.rating, bestRating: 5 },
    reviewBody: t.review,
  })),
  sameAs: [
    "https://www.instagram.com/asmarsphotography",
    "https://www.facebook.com/asmarsphotography",
  ] as string[],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://travelbug.pk/#website",
  name: "TravelBug.pk",
  url: "https://travelbug.pk",
  description:
    "Photographer-led, 100% customized tours across Pakistan — Hunza, Skardu, Kashmir, Lahore & beyond.",
  inLanguage: "en",
  publisher: { "@id": "https://travelbug.pk/#organization" },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://travelbug.pk/tours?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${playfair.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Providers>
          <ServiceWorkerCleanup />
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </Providers>
      </body>
    </html>
  );
}
