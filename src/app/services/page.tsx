import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, MapPin, Sparkles } from "lucide-react";
import ServiceFinder from "../../components/ServiceFinder";

export const metadata: Metadata = {
  title: "Home Repair & Maintenance Services in Bhopal",
  description:
    "Find painting, plumbing, electrician, cleaning, AC, interior and renovation services in Bhopal. Request an inspection and clear quotation.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Home Services in Bhopal | BlinkUp",
    description:
      "Choose the right home service and request an inspection in under a minute.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="bg-[#15101d] pb-24 pt-6">
      <section className="page-shell">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
          <Image
            src="/images/painting-care.jpg"
            alt="BlinkUp painting professional working in a Bhopal home"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#15101d] via-[#15101d]/88 to-[#15101d]/20" />
          <div className="relative max-w-3xl px-6 py-16 sm:px-10 sm:py-20 lg:px-14">
            <p className="section-kicker border-white/15 bg-black/20 text-white">
              <MapPin size={13} />
              Home services across Bhopal
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.05em] sm:text-6xl">
              Start with the problem. We&apos;ll help with the service.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#ddd4e2] sm:text-base">
              Search by task, compare the service scope and book a home
              inspection without guessing the final price.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/lead" className="button-primary px-6">
                Book Free Inspection
                <ArrowRight size={18} />
              </Link>
              <span className="trust-chip">
                <BadgeCheck size={15} className="text-[#b99cff]" />
                Quotation before work
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell pt-14">
        <div className="mb-7">
          <p className="section-kicker">
            <Sparkles size={13} />
            Service finder
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
            What needs attention today?
          </h2>
          <p className="mt-2 text-sm text-[#bdb2c5]">
            Search naturally—try “leak”, “fan”, “sofa”, “paint” or “wardrobe”.
          </p>
        </div>
        <ServiceFinder />
      </section>
    </div>
  );
}
