import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Providers from "@/components/Providers";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${playfair.variable}`}>
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </Providers>
      </body>
    </html>
  );
}
