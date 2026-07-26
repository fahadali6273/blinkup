"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck2,
  ChevronRight,
  ClipboardCheck,
  IndianRupee,
  LocateFixed,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { serviceCatalog } from "../data/serviceCatalog";

const BHOPAL_LATITUDE = 23.2599;
const BHOPAL_LONGITUDE = 77.4126;
const SERVICE_RADIUS_KM = 40;

const heroSlides = [
  {
    image: "/images/hero-home-care.jpg",
    imageAlt:
      "BlinkUp expert discussing a free home-service inspection with Bhopal homeowners",
    heading: "Home services, ab bina guesswork ke.",
    description:
      "Problem bataiye—BlinkUp free inspection arrange karega aur kaam se pehle clear quotation share karega.",
    position: "62% center",
  },
  {
    image: "/images/painting-care.jpg",
    imageAlt: "BlinkUp painting professional working carefully in a Bhopal home",
    heading: "Painting se repair tak, right expert ghar par.",
    description:
      "Painting, plumbing, electrical, cleaning ya renovation—har requirement ke liye ek simple booking experience.",
    position: "54% center",
  },
  {
    image: "/images/cleaning-care.jpg",
    imageAlt: "Verified BlinkUp professional deep cleaning a modern home",
    heading: "Verified professionals, hassle-free service.",
    description:
      "Confirmed visit slot, organised work aur Call + WhatsApp support—taaki aapko follow-up ka stress na ho.",
    position: "55% center",
  },
  {
    image: "/images/hero-satisfaction-v2.png",
    imageAlt:
      "BlinkUp professional reviewing completed home service with satisfied homeowners",
    heading: "Kaam pasand aaye, phir payment karein.",
    description:
      "Scope pehle approve kijiye, completed service check kijiye aur satisfaction ke baad payment complete kijiye.",
    position: "center",
  },
];

const heroOffers = [
  {
    icon: ClipboardCheck,
    title: "Free Survey / Inspection",
    text: "Website booking par survey fee ₹0",
  },
  {
    icon: BadgeCheck,
    title: "Verified Labour Team",
    text: "Skill-focused, accountable professionals",
  },
  {
    icon: IndianRupee,
    title: "Pay After Satisfaction",
    text: "Approved work check karne ke baad pay karein",
  },
  {
    icon: MessageCircle,
    title: "Hassle-free Support",
    text: "Call aur WhatsApp par easy coordination",
  },
];

function getDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const earthRadius = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [service, setService] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [mapLink, setMapLink] = useState("");
  const [locationState, setLocationState] = useState<
    "idle" | "loading" | "verified" | "outside" | "unavailable"
  >("idle");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showWhatsAppFallback, setShowWhatsAppFallback] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  function useCurrentLocation() {
    setError("");

    if (!navigator.geolocation) {
      setLocationState("unavailable");
      return;
    }

    setLocationState("loading");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const distance = getDistanceKm(
          coords.latitude,
          coords.longitude,
          BHOPAL_LATITUDE,
          BHOPAL_LONGITUDE
        );

        if (distance > SERVICE_RADIUS_KM) {
          setLocationState("outside");
          setError("BlinkUp is currently available within Bhopal.");
          return;
        }

        setLocationState("verified");
        setArea("Current location, Bhopal");
        setMapLink(
          `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`
        );
      },
      () => setLocationState("unavailable"),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setShowWhatsAppFallback(false);

    if (!service) {
      setError("Please choose a service.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    if (!area.trim()) {
      setError("Enter your Bhopal area or use current location.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service,
          phone,
          location: area.trim(),
          address: area.trim(),
          mapLink,
          message:
            "Quick website request. Customer prefers a callback to confirm inspection details.",
          source: "homepage-quick-booking",
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to send request");
      }

      setSubmitted(true);
      setService("");
      setPhone("");
      setArea("");
      setMapLink("");
    } catch (submitError) {
      console.error("Homepage lead error:", submitError);
      setError("Request send nahi hui. Please try again or use WhatsApp.");
      setShowWhatsAppFallback(true);
    } finally {
      setSubmitting(false);
    }
  }

  const quickBookingWhatsAppUrl = `https://wa.me/917489673372?text=${encodeURIComponent(
    [
      "Hi BlinkUp, I want to book a free inspection.",
      `Service: ${service || "Not added"}`,
      `Mobile: ${phone || "Not added"}`,
      `Area: ${area || "Not added"}`,
    ].join("\n")
  )}`;

  return (
    <section className="relative overflow-hidden bg-[#15101d] pb-16 pt-4 sm:pb-24 sm:pt-8">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[38rem] w-[80rem] -translate-x-1/2 rounded-full bg-[#6d3ae6]/10 blur-[120px]" />

      <div className="page-shell relative">
        <div
          className="relative min-h-[39rem] overflow-hidden rounded-[2rem] border border-white/10 sm:min-h-[41rem] lg:min-h-[39rem]"
          role="region"
          aria-roledescription="carousel"
          aria-label="BlinkUp home service highlights"
        >
          {heroSlides.map((slide, index) => (
            <Image
              key={slide.image}
              src={slide.image}
              alt={index === activeSlide ? slide.imageAlt : ""}
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 1248px"
              style={{ objectPosition: slide.position }}
              className={`object-cover transition duration-700 ease-out ${
                index === activeSlide
                  ? "scale-100 opacity-100"
                  : "pointer-events-none scale-[1.025] opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-[#15101d]/40 sm:hidden" />
          <div className="image-scrim absolute inset-0" />

          <div className="relative z-10 flex min-h-[39rem] max-w-[47rem] flex-col justify-center p-6 sm:min-h-[41rem] sm:p-10 lg:min-h-[39rem] lg:p-14">
            <div className="flex flex-wrap gap-2">
              <span className="section-kicker border-white/15 bg-black/20 text-white">
                <MapPin size={13} />
                Bhopal&apos;s free home survey
              </span>
              <span className="trust-chip">
                <ShieldCheck size={14} className="text-[#b99cff]" />
                Top services for Bhopal homes
              </span>
            </div>

            <div key={activeSlide} className="hero-copy-enter">
              <h1 className="text-gradient mt-7 max-w-[44rem] text-[2.55rem] font-bold leading-[1.05] tracking-[-0.055em] sm:text-6xl lg:text-[4.2rem]">
                {heroSlides[activeSlide].heading}
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#e0d8e5] sm:text-base sm:leading-8">
                {heroSlides[activeSlide].description}
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#quick-booking" className="button-primary px-6">
                Book Free Inspection
                <ArrowRight size={18} />
              </a>
              <Link
                href="/services"
                className="inline-flex min-h-[3.15rem] items-center justify-center gap-2 rounded-2xl border border-white/20 bg-black/20 px-6 font-semibold text-white backdrop-blur-md transition hover:bg-white/10"
              >
                View All Services
                <ChevronRight size={18} />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-[#d8cedf]">
              <span className="inline-flex items-center gap-2">
                <BadgeCheck size={16} className="text-[#b99cff]" />
                Verified labour team
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarCheck2 size={16} className="text-[#b99cff]" />
                Free inspection
              </span>
              <span className="inline-flex items-center gap-2">
                <MessageCircle size={16} className="text-[#b99cff]" />
                Pay after satisfaction
              </span>
            </div>

            <div className="mt-6 flex items-center gap-2" aria-label="Choose hero slide">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.heading}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeSlide
                      ? "w-9 bg-white"
                      : "w-2.5 bg-white/35 hover:bg-white/60"
                  }`}
                  aria-label={`Show highlight ${index + 1}: ${slide.heading}`}
                  aria-pressed={index === activeSlide}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          id="quick-booking"
          className="app-card-raised relative z-20 mx-3 -mt-7 p-5 sm:mx-7 sm:-mt-10 sm:p-7 lg:mx-12"
        >
          {submitted ? (
            <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-400/15 text-emerald-300">
                  <BadgeCheck size={25} />
                </span>
                <div>
                  <h2 className="text-xl font-bold">Request received</h2>
                  <p className="mt-1 text-sm leading-6 text-[#bdb2c5]">
                    Our Bhopal team will call or WhatsApp you to confirm the
                    inspection.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="button-secondary w-full sm:w-auto"
              >
                Book another free inspection
              </button>
            </div>
          ) : (
            <>
              <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                <div>
                  <p className="eyebrow text-[#a98aff]">
                    <Sparkles size={14} />
                    60-sec booking
                  </p>
                  <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                    Free inspection ke liye callback lein
                  </h2>
                </div>
                <p className="text-xs text-[#9f94a8]">
                  1 minute se kam · No advance payment
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid gap-3 lg:grid-cols-[1.05fr_0.8fr_1.25fr_auto]"
              >
                <label>
                  <span className="sr-only">Choose service</span>
                  <select
                    value={service}
                    onChange={(event) => {
                      setService(event.target.value);
                      setError("");
                    }}
                    className="field"
                    aria-label="Choose a home service"
                  >
                    <option value="">What do you need?</option>
                    {serviceCatalog.map((item) => (
                      <option key={item.slug} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="sr-only">Mobile number</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.target.value.replace(/\D/g, "").slice(0, 10));
                      setError("");
                    }}
                    placeholder="Mobile number"
                    className="field"
                    aria-label="10-digit mobile number"
                  />
                </label>
                <div className="relative">
                  <label>
                    <span className="sr-only">Bhopal area</span>
                    <input
                      type="text"
                      autoComplete="address-level2"
                      value={area}
                      onChange={(event) => {
                        setArea(event.target.value);
                        setError("");
                        if (locationState === "verified") {
                          setLocationState("idle");
                          setMapLink("");
                        }
                      }}
                      placeholder="Your Bhopal area"
                      className="field pr-14"
                      aria-label="Your area in Bhopal"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={useCurrentLocation}
                    disabled={locationState === "loading"}
                    className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-xl bg-[#302440] text-[#b99cff] transition hover:bg-[#3a2b4e] disabled:opacity-60"
                    aria-label="Use current location"
                    title="Use current location"
                  >
                    <LocateFixed
                      size={18}
                      className={locationState === "loading" ? "animate-pulse" : ""}
                    />
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="button-primary whitespace-nowrap px-6 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Book Free Inspection"}
                  {!submitting && <ArrowRight size={18} />}
                </button>
              </form>

              <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row">
                <div role={error ? "alert" : undefined}>
                  <p
                    className={`text-xs ${
                      error ? "text-rose-300" : "text-[#8f8498]"
                    }`}
                  >
                    {error ||
                      (locationState === "verified"
                        ? "Current location verified within Bhopal."
                        : locationState === "unavailable"
                          ? "Location unavailable - please type your area."
                          : "We use your details only to coordinate this service request.")}
                  </p>
                  {showWhatsAppFallback && (
                    <a
                      href={quickBookingWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#25d366] px-4 text-xs font-bold text-[#062b15] transition hover:bg-[#39dd76]"
                    >
                      <MessageCircle size={16} />
                      Continue on WhatsApp
                    </a>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("services")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center gap-1.5 self-start text-xs font-semibold text-[#b99cff] hover:text-white"
                >
                  <Search size={14} />
                  Not sure? View all services
                </button>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {heroOffers.map((offer) => (
            <article
              key={offer.title}
              className="flex items-start gap-3 rounded-[1.35rem] border border-white/[0.08] bg-[#211a2b] p-4"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#6d3ae6]/15 text-[#b99cff]">
                <offer.icon size={21} />
              </span>
              <div>
                <h2 className="text-sm font-bold">{offer.title}</h2>
                <p className="mt-1 text-[11px] leading-5 text-[#a99dad]">
                  {offer.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
