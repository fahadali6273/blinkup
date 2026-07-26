import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About BlinkUp · Bhopal Home Service Platform",
  description:
    "Learn how BlinkUp makes booking home repair, cleaning, painting and renovation services simpler for customers in Bhopal.",
  alternates: {
    canonical: "/about",
  },
};

const principles = [
  {
    icon: ClipboardCheck,
    title: "Clarity before commitment",
    text: "Requirements, visit details and quotation should be understood before chargeable work begins.",
  },
  {
    icon: HeartHandshake,
    title: "Respect for the home",
    text: "Good service means professional communication, careful work and a tidy handover.",
  },
  {
    icon: MapPin,
    title: "Local by design",
    text: "BlinkUp is focused on Bhopal, so service discovery and coordination can stay relevant to the city.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#15101d] pb-24 pt-6">
      <section className="page-shell">
        <div className="relative min-h-[37rem] overflow-hidden rounded-[2rem] border border-white/10">
          <Image
            src="/images/hero-home-care.jpg"
            alt="BlinkUp expert discussing a clear home-service plan with customers"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[62%_center]"
          />
          <div className="image-scrim absolute inset-0" />
          <div className="relative flex min-h-[37rem] max-w-3xl flex-col justify-center p-6 sm:p-12">
            <p className="section-kicker border-white/15 bg-black/20 text-white">
              <Sparkles size={13} />
              About BlinkUp
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.055em] sm:text-6xl">
              Making home care feel simpler, clearer and more human.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#e0d8e5] sm:text-base">
              BlinkUp brings multiple home-service needs into one Bhopal-focused
              experience—from the first request to inspection and quotation.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/lead" className="button-primary px-6">
                Book Free Inspection
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://wa.me/917489673372?text=Hi%20BlinkUp%2C%20I%20have%20a%20question%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3.15rem] items-center justify-center gap-2 rounded-2xl border border-white/20 bg-black/20 px-6 font-semibold"
              >
                <MessageCircle size={18} />
                Talk to BlinkUp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell grid gap-10 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="section-kicker">
            <BadgeCheck size={13} />
            The idea
          </p>
          <h2 className="mt-5 text-4xl font-bold tracking-[-0.05em]">
            One place for the work a home keeps asking for.
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[#bdb2c5]">
            <p>
              Finding a painter, plumber, electrician or cleaning team often
              means separate calls, unclear scope and too much follow-up.
              BlinkUp is being built to make that journey more organised.
            </p>
            <p>
              Customers can start online, choose the closest service and share
              their Bhopal area. The team then confirms the requirement and a
              suitable inspection before the work is approved.
            </p>
          </div>
        </div>
        <div className="relative min-h-[29rem] overflow-hidden rounded-[2rem] border border-white/10">
          <Image
            src="/images/interior-care.jpg"
            alt="A designer and homeowner reviewing practical renovation choices"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="light-panel py-20">
        <div className="page-shell">
          <div className="max-w-2xl">
            <p className="section-kicker border-[#6d3ae6]/20 bg-[#6d3ae6]/5 text-[#6d3ae6]">
              What guides us
            </p>
            <h2 className="mt-5 text-4xl font-bold tracking-[-0.05em]">
              A better service experience starts with better communication.
            </h2>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {principles.map((principle) => (
              <article
                key={principle.title}
                className="rounded-[1.5rem] border border-[#e5deeb] bg-white p-6 shadow-sm"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#f1eaff] text-[#6d3ae6]">
                  <principle.icon size={23} />
                </span>
                <h3 className="mt-6 text-xl font-bold">{principle.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#716778]">
                  {principle.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell pt-20">
        <div className="app-gradient-soft flex flex-col items-start justify-between gap-6 rounded-[2rem] p-7 sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="eyebrow text-[#e4d8ff]">Your home, your approval</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">
              Tell us what needs attention.
            </h2>
            <p className="mt-2 text-sm text-[#e4d8ff]">
              Service choose kijiye; details confirm karna BlinkUp par chhod
              dijiye.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex min-h-[3.15rem] items-center gap-2 rounded-2xl bg-white px-6 font-bold text-[#4b249d]"
          >
            Explore services
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
