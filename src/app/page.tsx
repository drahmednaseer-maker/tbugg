import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TourBuilder from "@/components/sections/TourBuilder";
import FeaturedDestinations from "@/components/sections/FeaturedDestinations";
import TourPackages from "@/components/sections/TourPackages";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "TravelBug.pk — Photographer-Led Custom Tours of Pakistan",
  description:
    "TravelBug.pk is run by professional photographers Muhammad Asmar Hussain & Uzair Ahmed. We craft 100% customised tours across Pakistan's most extraordinary destinations.",
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
      <CTABanner />
    </>
  );
}
