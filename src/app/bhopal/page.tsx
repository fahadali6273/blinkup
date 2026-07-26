import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  MapPin,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import ServiceIcon from "../../components/ServiceIcon";
import { popularServices } from "../../data/serviceCatalog";

export const metadata: Metadata = {
  title: "Home Services in Bhopal · Painting, Repairs & Cleaning",
  description:
    "Book painting, plumbing, electrician, deep cleaning, AC, interior and renovation services across Bhopal with an inspection-first quotation process.",
  alternates: {
    canonical: "/bhopal",
  },
  openGraph: {
    title: "BlinkUp Home Services in Bhopal",
    description:
      "One Bhopal-focused place for home repairs, maintenance and improvement.",
    url: "/bhopal",
  },
};

const areas = [
  "Arera Colony",
  "MP Nagar",
  "Kolar Road",
  "Hoshangabad Road",
  "Bagh Sewania",
  "Katara Hills",
  "Ayodhya Bypass",
  "BHEL",
  "Lalghati",
  "Shahpura",
  "Gulmohar",
  "New Market",
];

export default function BhopalPage() {
  return (
    <div className="bg-[#15101d] pb-24 pt-6">
      <section className="page-shell">
        <div className="relative min-h-[38rem] overflow-hidden rounded-[2rem] border border-white/10">
          <Image
            src="/images/hero-home-care.jpg"
            alt="BlinkUp home-service consultation for a family in Bhopal"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[62%_center]"
          />
          <div className="image-scrim absolute inset-0" />
          <div className="relative flex min-h-[38rem] max-w-3xl flex-col justify-center p-6 sm:p-12">
            <p className="section-kicker border-white/15 bg-black/20 text-white">
              <MapPin size={13} />
              Home services in Bhopal
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.055em] sm:text-6xl">
              One trusted starting point for your Bhopal home.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#ded5e3] sm:text-base">
              Painting, plumbing, electrical work, cleaning, AC care, interiors
              and renovation—request the right inspection from one place.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/lead" className="button-primary px-6">
                Book in Bhopal
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://wa.me/917489673372?text=Hi%20BlinkUp%2C%20I%20need%20a%20home%20service%20in%20Bhopal."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3.15rem] items-center justify-center gap-2 rounded-2xl border border-white/20 bg-black/20 px-6 font-semibold"
              >
                <MessageCircle size={18} />
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-20">
        <div className="mb-8">
          <p className="section-kicker">
            <Sparkles size={13} />
            Popular services
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-[-0.045em] sm:text-5xl">
            Common home-service needs in Bhopal.
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularServices.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group app-card-raised flex min-h-48 flex-col p-5 transition hover:border-[#705a89]"
            >
              <div className="flex items-start justify-between">
                <span
                  className="grid h-12 w-12 place-items-center rounded-2xl text-white"
                  style={{ backgroundColor: service.accent }}
                >
                  <ServiceIcon name={service.icon} size={22} />
                </span>
                <ArrowRight
                  size={18}
                  className="text-[#8f8498] transition group-hover:translate-x-1 group-hover:text-white"
                />
              </div>
              <div className="mt-auto pt-8">
                <h3 className="text-xl font-bold">{service.name}</h3>
                <p className="mt-2 text-sm leading-6 text-[#bdb2c5]">
                  {service.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/services" className="button-secondary mt-5">
          View all services
          <ArrowRight size={17} />
        </Link>
      </section>

      <section className="light-panel py-20">
        <div className="page-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="section-kicker border-[#6d3ae6]/20 bg-[#6d3ae6]/5 text-[#6d3ae6]">
              Areas we serve
            </p>
            <h2 className="mt-5 text-4xl font-bold tracking-[-0.05em]">
              Share your colony, and we&apos;ll confirm the visit.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#6f6676]">
              BlinkUp accepts requests from residential and commercial areas
              across Bhopal. If your area is not listed, you can still submit a
              request for availability confirmation.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {areas.map((area) => (
              <span
                key={area}
                className="inline-flex items-center gap-2 rounded-full border border-[#e0d8e7] bg-white px-4 py-2.5 text-xs font-semibold text-[#49404f] shadow-sm"
              >
                <MapPin size={13} className="text-[#6d3ae6]" />
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-20">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: ClipboardCheck,
              title: "Request",
              text: "Choose the service and share your Bhopal area.",
            },
            {
              icon: BadgeCheck,
              title: "Inspect",
              text: "The requirement and site condition are checked.",
            },
            {
              icon: ArrowRight,
              title: "Approve",
              text: "Review the quotation before chargeable work begins.",
            },
          ].map((step, index) => (
            <article key={step.title} className="app-card-raised p-6">
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#55427a] text-[#eadfff]">
                  <step.icon size={22} />
                </span>
                <span className="text-xs font-bold text-[#806f89]">
                  0{index + 1}
                </span>
              </div>
              <h2 className="mt-8 text-xl font-bold">{step.title}</h2>
              <p className="mt-2 text-sm leading-7 text-[#bdb2c5]">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
