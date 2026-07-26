import Link from "next/link";
import { ArrowRight, Phone, Sparkles } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="bg-[#15101d] pb-24">
      <div className="page-shell">
        <div className="app-gradient relative overflow-hidden rounded-[2rem] p-7 sm:p-12">
          <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full border-[54px] border-white/[0.07]" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-[#6d3ae6]">
                <Sparkles size={26} fill="#6d3ae6" />
              </span>
              <h2 className="mt-7 max-w-3xl text-4xl font-bold tracking-[-0.045em] sm:text-5xl">
                Ghar ka kaam pending hai? Free inspection book kijiye.
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-[#eadfff]">
                Service choose kijiye, verified professional se requirement
                check karwaiye aur satisfaction ke baad payment karein.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/lead"
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-bold text-[#4b249d]"
              >
                Book Free Inspection
                <ArrowRight size={18} />
              </Link>
              <a
                href="tel:+917489673372"
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-2xl border border-white/25 px-6 py-3.5 font-semibold text-white"
              >
                <Phone size={18} />
                Call karke poochhein
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
