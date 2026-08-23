import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, Sparkles } from "lucide-react";

const benefits = [
  "Minor plumbing, electrical aur light requests",
  "1 full-home deep cleaning complimentary",
  "1 Diwali light installation complimentary",
  "150 sq ft paint patchwork labour included",
];

export default function AmcPromoSection() {
  return (
    <section className="bg-[#15101d] pb-24 pt-4">
      <div className="page-shell">
        <Link
          href="/amc"
          className="group block overflow-hidden rounded-[2rem] border border-emerald-200/15 bg-[radial-gradient(circle_at_10%_10%,rgba(251,191,36,0.12),transparent_24%),linear-gradient(135deg,#0a241f,#0c4c3f_58%,#15101d)] shadow-2xl shadow-black/20"
        >
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="p-7 sm:p-10 lg:p-12">
              <p className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.11em] text-[#172019]">
                <Sparkles size={13} /> Bhopal launch · 20% off
              </p>
              <h2 className="mt-6 text-4xl font-bold tracking-[-0.05em] text-white sm:text-5xl">
                BlinkUp Home AMC
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-emerald-50/75">
                Ek trusted team aur planned home maintenance—Bhopal homes ke
                liye 6 aur 12 month options.
              </p>
              <div className="mt-7 flex items-end gap-3">
                <span className="text-sm text-emerald-100/60 line-through">
                  ₹12,000
                </span>
                <span className="text-4xl font-bold text-amber-300">₹9,600</span>
                <span className="pb-1 text-xs text-emerald-50/65">/ year</span>
              </div>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-white">
                Complete details dekhein
                <ArrowRight
                  size={17}
                  className="transition group-hover:translate-x-1"
                />
              </span>
            </div>

            <div className="border-t border-white/10 bg-white/[0.045] p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-300/10 text-emerald-300">
                  <ShieldCheck size={24} />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-300">
                    Home care, simplified
                  </p>
                  <h3 className="mt-1 text-xl font-bold">Plan highlights</h3>
                </div>
              </div>
              <ul className="mt-7 grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex gap-3 rounded-2xl border border-white/[0.07] bg-black/10 p-4 text-xs leading-6 text-[#ddd4e2]"
                  >
                    <Check size={16} className="mt-1 shrink-0 text-amber-300" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[11px] leading-6 text-emerald-50/55">
                Material, replacement parts aur major work included nahi hain.
                Eligibility activation se pehle confirm hogi.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
