import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  Headphones,
  IndianRupee,
  MapPinned,
} from "lucide-react";

const benefits = [
  {
    icon: ClipboardCheck,
    title: "Free survey, clear scope",
    text: "Pehle requirement aur site condition check hoti hai—bina rushed price guess ke.",
  },
  {
    icon: IndianRupee,
    title: "Pay after satisfaction",
    text: "Approved work complete hone ke baad service check kijiye, phir payment karein.",
  },
  {
    icon: MapPinned,
    title: "Verified labour team",
    text: "Bhopal homes ke liye skill-focused aur accountable service teams coordinate ki jaati hain.",
  },
  {
    icon: Headphones,
    title: "Easy human support",
    text: "Website, WhatsApp ya direct phone call—jo aapko convenient lage, wahi choose karein.",
  },
];

export default function WhyChooseBlinkUp() {
  return (
    <section id="how-it-works" className="light-panel scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="page-shell">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative min-h-[31rem] overflow-hidden rounded-[2rem] bg-[#ddd1eb]">
            <Image
              src="/images/interior-care.jpg"
              alt="BlinkUp professional helping a homeowner review materials before renovation"
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover object-[63%_center]"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-[1.4rem] border border-white/60 bg-white/90 p-5 shadow-2xl backdrop-blur sm:inset-x-6 sm:bottom-6">
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#f0e8ff] text-[#6d3ae6]">
                  <BadgeCheck size={22} />
                </span>
                <div>
                  <p className="font-bold">Control aapke haath mein</p>
                  <p className="mt-1 text-xs leading-5 text-[#685f71]">
                    Requirement clear hone ke baad hi quotation approve karein.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="section-kicker border-[#6d3ae6]/20 bg-[#6d3ae6]/5 text-[#6d3ae6]">
              Why BlinkUp
            </p>
            <h2 className="mt-5 max-w-2xl text-4xl font-bold leading-tight tracking-[-0.05em] sm:text-5xl">
              Pehle clarity, phir kaam—har step aapke control mein.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#685f71] sm:text-base">
              Home service tab easy lagti hai jab requirement, visit timing aur
              quotation sahi order mein clearly discuss ho.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <article
                  key={benefit.title}
                  className="rounded-[1.35rem] border border-[#e6dfee] bg-white p-5 shadow-sm"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#f1eaff] text-[#6d3ae6]">
                    <benefit.icon size={21} />
                  </span>
                  <h3 className="mt-4 font-bold">{benefit.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-[#716778]">
                    {benefit.text}
                  </p>
                </article>
              ))}
            </div>

            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#5a2ebd]"
            >
              BlinkUp kaise kaam karta hai
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
