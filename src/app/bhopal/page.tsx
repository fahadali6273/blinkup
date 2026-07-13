import type { Metadata } from "next";
import Link from "next/link";
import {
  Paintbrush,
  Plug,
  Wrench,
  Hammer,
  Wind,
  Shield,
  Sparkles,
  Home,
  Truck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "BlinkUp Home Services in Bhopal | Painting, Electrician, Plumbing & More",
  description:
    "BlinkUp Bhopal me painting, electrician, plumbing, AC repair, renovation, cleaning, CCTV, packing & moving aur 15+ professional home services doorstep par provide karta hai.",
};

const popularServices = [
  {
    name: "Painting Services",
    desc: "2BHK, 3BHK, villa, shop – sab ke liye professional painters Bhopal me available.",
    icon: Paintbrush,
    href: "/services/painting",
    badge: "Most booked in Bhopal",
  },
  {
    name: "Electrician on Demand",
    desc: "Switchboard, wiring, fan, light, geyser – same-day electrical service.",
    icon: Plug,
    href: "/services/electrical",
    badge: "Same-day support",
  },
  {
    name: "Plumbing & Leakage Repair",
    desc: "Tap leakage, flush, bathroom fitting, kitchen sink – expert plumbers at doorstep.",
    icon: Wrench,
    href: "/services/plumbing",
    badge: "Emergency available",
  },
  {
    name: "Carpenter & Furniture Work",
    desc: "Door, window, wardrobe, modular furniture & repair work for your home.",
    icon: Hammer,
    href: "/services/carpentry",
    badge: "Custom solutions",
  },
  {
    name: "AC Service & Repair",
    desc: "AC servicing, gas refill, installation & cooling check for summers in Bhopal.",
    icon: Wind,
    href: "/services/ac-service",
    badge: "Season special",
  },
  {
    name: "CCTV & Security Setup",
    desc: "Home aur shop ke liye camera installation, wiring & full monitoring solution.",
    icon: Shield,
    href: "/services/cctv",
    badge: "Secure your space",
  },
];

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
];

const whyPoints = [
  {
    title: "Verified Local Experts",
    text: "BlinkUp Bhopal ke har partner ko verify karta hai – ID, kaam ka experience aur rating check karke.",
  },
  {
    title: "Transparent Pricing",
    text: "Estimate pehle, kaam baad me – koi hidden charges nahi. Custom quote bhi mil sakta hai.",
  },
  {
    title: "Doorstep Convenience",
    text: "App/website form ya WhatsApp – jahan se easy lage wahan se booking karo, team khud aa jati hai.",
  },
  {
    title: "15+ Home Services",
    text: "Painting, electrician, plumbing, renovation, interior, cleaning, AC, CCTV – sab ek hi jagah.",
  },
];

const steps = [
  {
    step: "Step 1",
    title: "Service Select Karein",
    text: "Painting, electrician, plumbing ya koi bhi service – home page ya services page se select karein.",
  },
  {
    step: "Step 2",
    title: "Quick Form Fill Karein",
    text: "Naam, mobile number, location & preferred time daalein. Bas 30 seconds ka kaam.",
  },
  {
    step: "Step 3",
    title: "Team aapke ghar aayegi",
    text: "BlinkUp expert aapse contact karega, requirement samjhega aur time pe kaam complete karega.",
  },
];

export default function BhopalPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-indigo-50">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-purple-100">
        <div className="absolute -top-32 -right-24 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-24 w-80 h-80 bg-indigo-300/20 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 pt-16 pb-12 md:pt-20 md:pb-16 relative z-10">
          <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-purple-100 text-purple-700 border border-purple-200 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Now serving across Bhopal city
          </span>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left text */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-4">
                BlinkUp Home Services in{" "}
                <span className="bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
                  Bhopal
                </span>
              </h1>
              <p className="text-slate-600 text-base md:text-lg mb-5">
                Painting, electrician, plumbing, AC repair, renovation, cleaning aur 15+{" "}
                <span className="font-semibold">ghar ki saari services</span> – ab Bhopal ke har
                area me ek hi platform BlinkUp se. Fast response, trusted professionals & smooth
                experience.
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 text-xs md:text-sm px-3 py-1 rounded-full bg-white shadow-sm border border-slate-100">
                  ⭐ 4.8+ rated by Bhopal customers
                </span>
                <span className="inline-flex items-center gap-2 text-xs md:text-sm px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                  🚀 15+ home services in one place
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/lead"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:from-purple-700 hover:to-indigo-600 transition"
                >
                  Book a Service in Bhopal
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm font-semibold hover:border-purple-300 hover:text-purple-700 transition"
                >
                  View All Services
                </Link>
              </div>

              <p className="text-xs md:text-sm text-slate-500 mt-3">
                Bhopal ke popular areas: Arera Colony, MP Nagar, Kolar Road, Hoshangabad Road,
                Shahpura, Bagh Sewania, BHEL & more.
              </p>
            </div>

            {/* Right highlight card */}
            <div className="relative">
              <div className="rounded-2xl bg-white/80 backdrop-blur shadow-xl border border-purple-50 p-5 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
                    <Home className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-purple-600 font-semibold">
                      Bhopal Focused
                    </p>
                    <p className="text-sm text-slate-700">
                      Ghar ki saari services – ek BlinkUp, ek call.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
                  <div className="p-3 rounded-xl bg-purple-50 text-purple-800">
                    <p className="font-semibold mb-1">Quick Response</p>
                    <p>Same/next day visit most areas of Bhopal.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-indigo-50 text-indigo-800">
                    <p className="font-semibold mb-1">Verified Pros</p>
                    <p>Background-checked, experienced local experts.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800">
                    <p className="font-semibold mb-1">Doorstep Service</p>
                    <p>Booking se completion tak BlinkUp handle karega.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-orange-50 text-orange-800">
                    <p className="font-semibold mb-1">Multi-Services</p>
                    <p>Painting se CCTV tak – sab yahi.</p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                  ℹ️ Hint: Agar aap Bhopal ke kisi specific area me service chahte hain, form ya
                  chat me area ka naam zarur likhein.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR SERVICES IN BHOPAL */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                Popular Home Services in Bhopal
              </h2>
              <p className="text-slate-600 text-sm md:text-base max-w-2xl">
                Ye wo services hain jo Bhopal ke customers sabse zyada book karte hain. Card pe
                click karke detail page & booking form dekh sakte hain.
              </p>
            </div>
            <Link
              href="/services"
              className="text-sm font-semibold text-purple-700 hover:text-purple-900"
            >
              View all 15+ services →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularServices.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.name}
                  href={service.href}
                  className="group relative rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-slate-900">
                          {service.name}
                        </h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                          {service.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{service.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                    <span>Bhopal city wide coverage</span>
                    <span className="text-purple-600 font-medium group-hover:translate-x-0.5 transition">
                      View details →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* AREAS WE SERVE */}
      <section className="py-10 md:py-14 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">
                Bhopal ke kaun kaun se areas cover hote hain?
              </h2>
              <p className="text-sm text-slate-600 max-w-xl">
                BlinkUp Bhopal ke majority residential & commercial areas me service provide
                karta hai. Niche diye gaye list me agar aapka area nahi dikh raha ho, phir bhi
                form fill karke try karein – team aapko confirm karegi.
              </p>
            </div>
            <div className="text-xs md:text-sm bg-purple-50 text-purple-800 px-3 py-2 rounded-xl border border-purple-100">
              🌐 <span className="font-semibold">Service Hours:</span> 9:00 AM – 8:00 PM (Bhopal
              local time)
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {areas.map((area) => (
              <span
                key={area}
                className="text-xs md:text-sm px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-800 transition"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* WHY BLINKUP BHOPAL */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Bhopal ke customers BlinkUp kyun choose karte hain?
            </h2>
            <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
              Ghar ka kaam kisi ko bhi nahi diya ja sakta. Isliye BlinkUp ka focus hai verified
              experts, proper communication aur clean finish – taaki aap tension-free feel karein.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {whyPoints.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition"
              >
                <h3 className="text-sm font-semibold text-slate-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-10 md:py-14 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Bhopal me BlinkUp se kaise book karein?
              </h2>
              <p className="text-sm md:text-base text-purple-100 max-w-xl">
                Process intentionally simple rakha gaya hai – taaki aapka time bache aur kaam jaldi
                start ho jaye.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {steps.map((s) => (
              <div
                key={s.step}
                className="relative rounded-2xl bg-white/5 border border-white/15 p-4 md:p-5"
              >
                <div className="mb-3 inline-flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-purple-100">
                    {s.step}
                  </span>
                </div>
                <h3 className="text-sm font-semibold mb-1">{s.title}</h3>
                <p className="text-xs md:text-sm text-purple-100/90">{s.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <Link
              href="/lead"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-white text-purple-700 text-sm font-semibold shadow-md hover:bg-purple-50 transition"
            >
              Book a service now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-white/40 text-white text-xs md:text-sm hover:bg-white/10 transition"
            >
              Talk to BlinkUp team
            </Link>
            <p className="text-xs text-purple-100">
              Ya simply website ka form bhar dein – team aapko shortly call karegi.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
