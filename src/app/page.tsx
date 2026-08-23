"use client";

import HeroSection from "../components/HeroSection";
import WhyChooseBlinkUp from "../components/WhyChooseBlinkUp";
import ServicesSection from "../components/ServicesSection";
import RecentWork from "../components/RecentWork";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactCTA from "../components/ContactCTA";
import WorkShowcase from "../components/WorkShowcase";
import FAQSection from "../components/FAQSection";
import AmcCarousel from "../components/AmcCarousel";
import AmcPromoSection from "../components/AmcPromoSection";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <ServicesSection />
      <AmcCarousel />
      <AmcPromoSection />
      <WhyChooseBlinkUp />
      <RecentWork />
      <WorkShowcase />
      <TestimonialsSection />
      <FAQSection />
      <ContactCTA />
    </main>
  );
}
