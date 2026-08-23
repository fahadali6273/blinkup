"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Home,
  Sparkles,
  Wrench,
} from "lucide-react";

const slides = [
  {
    eyebrow: "Bhopal AMC launch · 20% off",
    title: "Ghar ki maintenance, ab ek simple plan mein.",
    copy: "₹12,000 ka annual BlinkUp Home AMC launch offer mein ₹9,600.",
    icon: Home,
  },
  {
    eyebrow: "Routine care, one trusted team",
    title: "Plumbing, electricity aur lights ke liye repeat support.",
    copy: "Eligible minor-maintenance labour included; material aur replacement parts actual cost par.",
    icon: Wrench,
  },
  {
    eyebrow: "Complimentary home-care benefits",
    title: "Deep cleaning, Diwali decoration aur paint patchwork bhi.",
    copy: "1 deep cleaning, 1 Diwali light installation aur 150 sq ft paint patchwork labour included.",
    icon: Sparkles,
  },
];

export default function AmcCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActive((value) => (value + 1) % slides.length),
      4400
    );
    return () => window.clearInterval(timer);
  }, []);

  const slide = slides[active];
  const Icon = slide.icon;

  return (
    <section
      aria-label="BlinkUp Home AMC offers"
      className="bg-[#15101d] pb-5 pt-5"
    >
      <div className="page-shell">
        <div className="relative min-h-[23rem] overflow-hidden rounded-[2rem] border border-emerald-200/15 bg-[radial-gradient(circle_at_82%_15%,rgba(251,191,36,0.16),transparent_24%),linear-gradient(135deg,#081d1a,#0c473c_58%,#126b55)] px-6 py-9 shadow-2xl shadow-black/25 sm:px-10 sm:py-12 lg:px-14">
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-emerald-300/15 blur-3xl" />
          <div className="relative z-10 grid items-center gap-9 lg:grid-cols-[1fr_17rem]">
            <div key={active} className="hero-copy-enter max-w-3xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-amber-200/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.13em] text-amber-200">
                <BadgeCheck size={14} />
                {slide.eyebrow}
              </p>
              <h2 className="mt-5 max-w-3xl text-3xl font-bold leading-[1.1] tracking-[-0.045em] text-white sm:text-5xl">
                {slide.title}
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-emerald-50/80 sm:text-base">
                {slide.copy}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/amc#plans"
                  className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-amber-300 px-5 text-sm font-bold text-[#172019] transition hover:-translate-y-0.5 hover:bg-amber-200"
                >
                  Plans dekhein <ArrowRight size={17} />
                </Link>
                <Link
                  href="/amc#callback"
                  className="inline-flex min-h-12 items-center rounded-2xl border border-white/20 bg-white/[0.07] px-5 text-sm font-bold text-white transition hover:bg-white/[0.13]"
                >
                  Free callback
                </Link>
              </div>
            </div>

            <div className="mx-auto grid h-48 w-48 place-items-center rounded-[2rem] border border-white/15 bg-white/[0.07] text-amber-300 shadow-2xl backdrop-blur sm:h-56 sm:w-56">
              <Icon size={96} strokeWidth={1.35} />
            </div>
          </div>

          <div className="absolute bottom-5 left-6 z-20 flex gap-2 sm:left-10 lg:left-14">
            {slides.map((item, index) => (
              <button
                key={item.eyebrow}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show AMC offer ${index + 1}`}
                aria-pressed={active === index}
                className={`h-2.5 rounded-full transition-all ${
                  active === index ? "w-9 bg-amber-300" : "w-2.5 bg-white/35"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
