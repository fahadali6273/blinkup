"use client";

import HeroSection from "../components/HeroSection";
import WhyChooseBlinkUp from "../components/WhyChooseBlinkUp";
import ServicesSection from "../components/ServicesSection";
import RecentWork from "../components/RecentWork";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactCTA from "../components/ContactCTA";
import WorkShowcase from "../components/WorkShowcase";
import FAQSection from "../components/FAQSection";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <ServicesSection />
      <WhyChooseBlinkUp />
      <RecentWork />
      <WorkShowcase />
      <TestimonialsSection />
      <FAQSection />
      <ContactCTA />
    </main>
  );
}
