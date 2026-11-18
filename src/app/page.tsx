import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TourBuilder from "@/components/TourBuilderLazy";
import FeaturedDestinations from "@/components/sections/FeaturedDestinations";
import TourPackages from "@/components/sections/TourPackages";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";
import FAQSection from "@/components/sections/FAQSection";
import { generalFaqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "TravelBug.pk — Photographers-Led Custom Tours of Pakistan",
  description:
    "Photographer-led, 100% customised tours of Pakistan — Hunza, Skardu, K2, Fairy Meadows and beyond. Run by professional photographers since 2018.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TourBuilder />
      <FeaturedDestinations />
      <TourPackages />
      <WhyChooseUs />
      <Testimonials />
      <FAQSection faqs={generalFaqs} />
      <CTABanner />
    </>
  );
}
