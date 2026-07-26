import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileCheck2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Review the terms that apply when using BlinkUp to request home services in Bhopal.",
  alternates: {
    canonical: "/terms",
  },
};

const sections = [
  {
    title: "Using BlinkUp",
    body: "You agree to provide accurate contact, service and address information. A website request is not a confirmed appointment until BlinkUp communicates the visit details.",
  },
  {
    title: "Inspection and quotation",
    body: "Many services require inspection before scope, material, timing and price can be confirmed. Chargeable work should begin only after the relevant quotation or terms are accepted.",
  },
  {
    title: "Access and safety",
    body: "Customers should provide safe, reasonable access to the service area and disclose known hazards, access restrictions or society requirements before the visit.",
  },
  {
    title: "Changes and cancellation",
    body: "Please contact BlinkUp as early as possible to reschedule or cancel. Any visit, material or cancellation charge must be communicated for the specific booking.",
  },
  {
    title: "Payments and materials",
    body: "Payment method, schedule, taxes, material responsibility and warranty—when applicable—should be recorded in the accepted quotation or service communication.",
  },
  {
    title: "Support and concerns",
    body: "Raise any service concern promptly with the booking details and supporting photos where relevant so the team can review the matter.",
  },
];

export default function TermsPage() {
  return (
    <div className="light-panel py-16 sm:py-20">
      <article className="page-shell max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#5a2ebd]"
        >
          <ArrowLeft size={17} />
          Back to BlinkUp
        </Link>
        <header className="mt-7 rounded-[2rem] bg-[#201a2b] p-7 text-white sm:p-10">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#55427a] text-[#eadfff]">
            <FileCheck2 size={23} />
          </span>
          <h1 className="mt-7 text-4xl font-bold tracking-[-0.05em] sm:text-5xl">
            Terms & Conditions
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#c8bece]">
            These terms describe the basic responsibilities and booking process
            when requesting BlinkUp home services.
          </p>
          <p className="mt-4 text-xs text-[#8f8498]">Last updated: July 2026</p>
        </header>

        <div className="mt-6 space-y-3">
          {sections.map((section, index) => (
            <section
              key={section.title}
              className="rounded-[1.4rem] border border-[#e2dbe8] bg-white p-6"
            >
              <p className="text-xs font-bold text-[#6d3ae6]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-2 text-xl font-bold">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#6f6676]">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <section className="mt-6 rounded-[1.4rem] border border-[#d7c8f4] bg-[#f2ecff] p-6">
          <h2 className="font-bold">Need clarification?</h2>
          <p className="mt-2 text-sm leading-7 text-[#62576b]">
            Contact{" "}
            <a
              href="mailto:support@blinkuphome.com"
              className="font-semibold text-[#5a2ebd]"
            >
              support@blinkuphome.com
            </a>{" "}
            before confirming a service if any term is unclear.
          </p>
        </section>
      </article>
    </div>
  );
}
