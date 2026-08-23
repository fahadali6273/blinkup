import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  Clock3,
  Home,
  Paintbrush,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import AmcLeadForm from "../../components/AmcLeadForm";
import { amcPlans, amcTerms, formatAmcPrice } from "../../data/amc";

export const metadata: Metadata = {
  title: "Home AMC in Bhopal | Home Maintenance Plans",
  description:
    "BlinkUp Home AMC in Bhopal with plumbing, electrical, deep cleaning, Diwali decoration and paint patchwork benefits. Explore 6 and 12 month plans.",
  keywords: [
    "home AMC Bhopal",
    "annual home maintenance Bhopal",
    "plumbing maintenance plan Bhopal",
    "electrical maintenance plan Bhopal",
    "BlinkUp Home AMC",
  ],
  alternates: { canonical: "/amc" },
  openGraph: {
    title: "BlinkUp Home AMC Bhopal · 20% Launch Offer",
    description:
      "Bhopal homes ke liye 6 aur 12 month planned maintenance options.",
    url: "/amc",
    type: "website",
  },
};

const careItems = [
  {
    icon: Wrench,
    title: "Plumbing care",
    text: "Minor leakage, tap, visible pipe aur routine fitting maintenance requests.",
  },
  {
    icon: Zap,
    title: "Electrical & lights",
    text: "Minor switch, socket, light fitting aur routine electrical support.",
  },
  {
    icon: Sparkles,
    title: "Deep cleaning",
    text: "Plan period mein 1 full-home deep cleaning complimentary.",
  },
  {
    icon: Paintbrush,
    title: "Paint patchwork",
    text: "150 sq ft tak patchwork labour included; paint aur material extra.",
  },
];

const faqs = [
  [
    "Kya har visit bilkul free hai?",
    "Eligible minor plumbing, electrical, light aur routine maintenance ka labour plan mein included hai. Material, parts aur major work ka estimate pehle share kiya jayega.",
  ],
  [
    "Unlimited requests ka matlab kya hai?",
    "Active plan mein eligible minor-maintenance requests fair-use policy aur available slots ke under raise ki ja sakti hain. Major job ko multiple minor requests mein divide karna covered nahi hai.",
  ],
  [
    "Deep cleaning aur Diwali decoration kitni baar milegi?",
    "Dono listed plans mein plan period ke dauran 1 full-home deep cleaning aur 1 Diwali light-installation labour included hai, scheduling aur eligibility ke subject par.",
  ],
  [
    "Form submit karte hi payment hogi?",
    "Nahi. Yeh sirf free callback request hai. Team home, location aur scope confirm karegi; uske baad plan activation discuss hoga.",
  ],
  [
    "Bhopal ke bahar AMC available hai?",
    "Launch phase mein AMC eligible Bhopal residential service areas ke liye available hai.",
  ],
];

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "BlinkUp Home AMC",
  serviceType: "Residential home maintenance plan",
  areaServed: { "@type": "City", name: "Bhopal" },
  provider: {
    "@type": "HomeAndConstructionBusiness",
    name: "BlinkUp Home Services",
    url: "https://blinkuphome.com",
  },
  offers: amcPlans.map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    priceCurrency: "INR",
    price: plan.offerPricePaise / 100,
    availability: "https://schema.org/InStock",
    url: "https://blinkuphome.com/amc#plans",
  })),
};

export default function AmcPage() {
  return (
    <main className="overflow-hidden bg-[#15101d]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <section className="relative overflow-hidden border-b border-white/[0.07] bg-[radial-gradient(circle_at_85%_10%,rgba(251,191,36,0.15),transparent_23%),radial-gradient(circle_at_15%_80%,rgba(16,185,129,0.14),transparent_26%),linear-gradient(135deg,#081a18,#0d3d35_55%,#15101d)] pb-20 pt-32 sm:pb-28 sm:pt-40">
        <div className="page-shell relative grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-amber-200/[0.08] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.13em] text-amber-200">
              <BadgeCheck size={14} /> Bhopal AMC launch · 20% off
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.07] tracking-[-0.055em] text-white sm:text-6xl">
              Ghar ki maintenance ko emergency nahi, ek plan banaiye.
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-8 text-emerald-50/75 sm:text-lg">
              Ek trusted Bhopal team, priority support aur routine home-care
              benefits—taaki chhoti problems badi repair na banein.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#plans"
                className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-amber-300 px-5 text-sm font-bold text-[#172019] transition hover:-translate-y-0.5 hover:bg-amber-200"
              >
                Plans compare karein <ArrowRight size={17} />
              </Link>
              <Link
                href="#callback"
                className="inline-flex min-h-12 items-center rounded-2xl border border-white/20 bg-white/[0.06] px-5 text-sm font-bold text-white transition hover:bg-white/[0.12]"
              >
                Free callback
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs text-emerald-50/70">
              {["No payment on enquiry", "Bhopal team support", "Clear scope"].map(
                (item) => (
                  <span key={item} className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-amber-300" /> {item}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-white/[0.06] p-7 shadow-2xl backdrop-blur-xl sm:p-9">
            <Home size={50} strokeWidth={1.4} className="text-amber-300" />
            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-300">
              12-month launch price
            </p>
            <div className="mt-3 flex flex-wrap items-end gap-3">
              <span className="text-base text-emerald-50/50 line-through">
                ₹12,000
              </span>
              <span className="text-5xl font-bold tracking-[-0.05em] text-white">
                ₹9,600
              </span>
            </div>
            <p className="mt-4 text-xs leading-6 text-emerald-50/65">
              Home eligibility confirmation ke baad activation. Material aur
              major work excluded.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="page-shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-kicker">Everyday home care</p>
            <h2 className="mt-5 text-3xl font-bold tracking-[-0.045em] sm:text-5xl">
              Ek number. Ek trusted team. Multiple maintenance needs.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#9f94a8]">
              Har chhoti problem ke liye naya technician dhoondhne ki jagah
              BlinkUp team ko request karein.
            </p>
          </div>
          <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {careItems.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-emerald-300/10 bg-emerald-300/[0.035] p-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-300/10 text-emerald-300">
                  <item.icon size={21} />
                </span>
                <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                <p className="mt-3 text-xs leading-6 text-[#9f94a8]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" className="scroll-mt-24 border-y border-white/[0.07] bg-[#100b16] py-20 sm:py-24">
        <div className="page-shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-kicker">Choose your plan</p>
            <h2 className="mt-5 text-3xl font-bold tracking-[-0.045em] sm:text-5xl">
              6 months se start karein ya annual value choose karein.
            </h2>
          </div>
          <div className="mx-auto mt-11 grid max-w-5xl gap-5 lg:grid-cols-2">
            {amcPlans.map((plan) => (
              <article
                key={plan.code}
                className={`relative rounded-[2rem] border p-7 sm:p-9 ${
                  plan.recommended
                    ? "border-emerald-300/35 bg-[linear-gradient(145deg,rgba(16,185,129,0.13),rgba(33,26,43,0.92))] shadow-xl shadow-emerald-950/20"
                    : "border-white/[0.09] bg-[#211a2b]"
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-3 left-7 rounded-full bg-emerald-400 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.11em] text-[#071d17]">
                    Recommended
                  </span>
                )}
                <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-emerald-300">
                  {plan.badge}
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-[-0.035em]">
                  {plan.shortName}
                </h3>
                <p className="mt-1 text-xs text-[#8f8498]">{plan.durationLabel}</p>
                <div className="mt-6 flex flex-wrap items-end gap-3">
                  <span className="text-sm text-[#74687d] line-through">
                    {formatAmcPrice(plan.listPricePaise)}
                  </span>
                  <span className="text-4xl font-bold tracking-[-0.05em] text-amber-300">
                    {formatAmcPrice(plan.offerPricePaise)}
                  </span>
                </div>
                <p className="mt-2 text-xs font-semibold text-emerald-300">
                  Save {formatAmcPrice(plan.listPricePaise - plan.offerPricePaise)}
                </p>
                <ul className="mt-7 space-y-4">
                  {plan.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-3 text-xs leading-6 text-[#c9becf]">
                      <Check size={15} className="mt-1 shrink-0 text-emerald-300" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Link
                  href="#callback"
                  className={`mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-2xl px-5 text-sm font-bold transition ${
                    plan.recommended
                      ? "bg-emerald-400 text-[#071d17] hover:bg-emerald-300"
                      : "border border-white/10 bg-white/[0.05] text-white hover:bg-white/[0.09]"
                  }`}
                >
                  Is plan ke liye callback
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="page-shell grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/[0.08] bg-[#211a2b] p-7 sm:p-9">
            <p className="section-kicker">Simple activation</p>
            <h2 className="mt-5 text-3xl font-bold tracking-[-0.04em]">
              Plan kaise start hoga?
            </h2>
            <div className="mt-8 space-y-6">
              {[
                ["1", "Callback request", "Naam, mobile aur Bhopal area share karein."],
                ["2", "Home & scope confirmation", "Team home size aur maintenance needs confirm karegi."],
                ["3", "Clear plan confirmation", "Inclusions, exclusions aur final amount samajhiye."],
                ["4", "Priority AMC support", "Active plan ke through eligible requests raise karein."],
              ].map(([number, title, text]) => (
                <div key={number} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-emerald-300/10 text-sm font-bold text-emerald-300">
                    {number}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold">{title}</h3>
                    <p className="mt-1 text-xs leading-6 text-[#8f8498]">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-amber-200/15 bg-[linear-gradient(145deg,#30230e,#15101d)] p-7 sm:p-9">
            <ShieldCheck size={45} className="text-amber-300" />
            <h2 className="mt-5 text-3xl font-bold tracking-[-0.04em]">
              Clear promise, clear scope.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#bdb2c5]">
              AMC routine minor maintenance ko simpler banata hai. Major
              project, replacement material ya emergency guarantee ko surprise
              benefit batakar sell nahi kiya jayega.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/[0.07] bg-black/15 p-5">
                <Clock3 size={20} className="text-amber-300" />
                <p className="mt-3 text-sm font-bold">Priority scheduling</p>
                <p className="mt-1 text-xs text-[#8f8498]">Available AMC slots ke through.</p>
              </div>
              <div className="rounded-2xl border border-white/[0.07] bg-black/15 p-5">
                <BadgeCheck size={20} className="text-amber-300" />
                <p className="mt-3 text-sm font-bold">Scope confirmation</p>
                <p className="mt-1 text-xs text-[#8f8498]">Chargeable work pehle bataya jayega.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-[#100b16] py-20">
        <div className="page-shell max-w-5xl">
          <div className="text-center">
            <p className="section-kicker">Important details</p>
            <h2 className="mt-5 text-3xl font-bold tracking-[-0.04em]">
              Plan lene se pehle yeh jaan lein.
            </h2>
          </div>
          <ul className="mt-10 grid gap-3 md:grid-cols-2">
            {amcTerms.map((term) => (
              <li
                key={term}
                className="flex gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 text-xs leading-6 text-[#aaa0b2]"
              >
                <Check size={15} className="mt-1 shrink-0 text-amber-300" />
                {term}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20">
        <div className="page-shell max-w-4xl">
          <div className="text-center">
            <p className="section-kicker">Quick answers</p>
            <h2 className="mt-5 text-3xl font-bold tracking-[-0.04em]">
              AMC se pehle common questions.
            </h2>
          </div>
          <div className="mt-9 space-y-3">
            {faqs.map(([question, answer]) => (
              <details
                key={question}
                className="group rounded-2xl border border-white/[0.08] bg-[#211a2b] p-5"
              >
                <summary className="cursor-pointer list-none pr-8 text-sm font-bold">
                  {question}
                </summary>
                <p className="mt-4 text-xs leading-7 text-[#9f94a8]">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="callback" className="scroll-mt-24 border-t border-white/[0.07] bg-[#100b16] py-20 sm:py-24">
        <div className="page-shell grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="pt-3">
            <p className="section-kicker">No-pressure consultation</p>
            <h2 className="mt-5 text-3xl font-bold tracking-[-0.045em] sm:text-5xl">
              Pehle plan samjhiye. Phir decide kijiye.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#9f94a8]">
              Bhopal team aapki requirement samjhegi. Eligibility aur scope
              confirm hone se pehle koi payment nahi.
            </p>
          </div>
          <AmcLeadForm />
        </div>
      </section>
    </main>
  );
}
