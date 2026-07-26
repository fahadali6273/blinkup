import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck2,
  PhoneCall,
  Sparkles,
  Wrench,
} from "lucide-react";

const steps = [
  {
    icon: CalendarCheck2,
    number: "1",
    title: "Choose a service",
    text: "Tell us what you need, your Bhopal address and preferred visit slot.",
  },
  {
    icon: PhoneCall,
    number: "2",
    title: "Confirm inspection",
    text: "Our team confirms the request and assigns a suitable professional.",
  },
  {
    icon: Wrench,
    number: "3",
    title: "Approve and begin",
    text: "Review the quotation after inspection. Work begins after your approval.",
  },
];

export default function RecentWork() {
  return (
    <section id="how-it-works" className="bg-[#f4efff] py-20 text-[#201a2b] sm:py-24">
      <div className="page-shell">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-[#6d3ae6]">
              <Sparkles size={15} />
              Blinku guided booking
            </p>
            <h2 className="mt-3 max-w-2xl text-4xl font-bold tracking-[-0.045em] sm:text-5xl">
              Book in three simple steps.
            </h2>
          </div>
          <Link
            href="/lead"
            className="inline-flex items-center gap-2 self-start rounded-2xl bg-[#201a2b] px-5 py-3 font-semibold text-white md:self-auto"
          >
            Start booking
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.number}
              className="rounded-[1.5rem] bg-[#15101d] p-6 text-white shadow-xl shadow-[#3a245c]/10"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#5535a1] text-[#f0e8ff]">
                  <step.icon size={22} />
                </span>
                <span className="text-sm font-bold text-[#9177ca]">
                  {step.number}/3
                </span>
              </div>
              <h3 className="mt-9 text-xl font-bold">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#c8bece]">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
