"use client";

import HeroSection from "../components/HeroSection";
import WhyChooseBlinkUp from "../components/WhyChooseBlinkUp";
import ServicesSection from "../components/ServicesSection";
import RecentWork from "../components/RecentWork";
import GalleryPreview from "../components/GalleryPreview";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactCTA from "../components/ContactCTA";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <WhyChooseBlinkUp />
      <ServicesSection />
      <RecentWork />
      <GalleryPreview />
      <TestimonialsSection />
      <ContactCTA />
    </main>
  );
}
