import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how BlinkUp handles information submitted for home-service requests and support.",
  alternates: {
    canonical: "/privacy",
  },
};

const sections = [
  {
    title: "Information you provide",
    body: "When you request a service or contact BlinkUp, you may provide your name, phone number, email address, Bhopal area, service address, preferred timing and details about the work.",
  },
  {
    title: "How the information is used",
    body: "The information is used to understand your request, coordinate a visit, communicate service updates, prepare the relevant scope and quotation, and respond to support questions.",
  },
  {
    title: "Service coordination",
    body: "Relevant request details may be shared with the professional or team assigned to inspect or perform the requested service. BlinkUp does not sell booking information.",
  },
  {
    title: "Location information",
    body: "Location is collected only when you type an area/address or choose to share your current location. Browser location access is optional and can be denied.",
  },
  {
    title: "Data care and retention",
    body: "Reasonable safeguards are used for submitted information. Records may be retained for service coordination, support, operational and legal requirements, then removed when no longer required.",
  },
  {
    title: "Your choices",
    body: "You may ask BlinkUp to correct or review your submitted contact information. You can also choose phone or WhatsApp instead of browser location sharing.",
  },
];

export default function PrivacyPage() {
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
            <ShieldCheck size={23} />
          </span>
          <h1 className="mt-7 text-4xl font-bold tracking-[-0.05em] sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#c8bece]">
            This policy explains how BlinkUp uses information submitted through
            the website for home-service requests and support.
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
          <h2 className="font-bold">Privacy questions</h2>
          <p className="mt-2 text-sm leading-7 text-[#62576b]">
            Email{" "}
            <a
              href="mailto:privacy@blinkuphome.com"
              className="font-semibold text-[#5a2ebd]"
            >
              privacy@blinkuphome.com
            </a>{" "}
            or use the contact page.
          </p>
        </section>
      </article>
    </div>
  );
}
