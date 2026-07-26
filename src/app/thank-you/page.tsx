import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Request Received",
  description: "Your BlinkUp service request has been received.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThankYouPage() {
  return (
    <div className="grid min-h-[70vh] place-items-center bg-[#15101d] px-4 py-16">
      <div className="app-card-raised w-full max-w-2xl p-7 text-center sm:p-12">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
          <BadgeCheck size={40} />
        </span>
        <p className="eyebrow mt-7 text-emerald-300">Request received</p>
        <h1 className="mt-3 text-4xl font-bold tracking-[-0.05em]">
          Thank you. BlinkUp will contact you shortly.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#bdb2c5]">
          The team will confirm your requirement, Bhopal address and inspection
          availability by call or WhatsApp.
        </p>
        <div className="mx-auto mt-7 grid max-w-md gap-2 sm:grid-cols-2">
          <Link href="/" className="button-secondary">
            Back to home
          </Link>
          <a
            href="https://wa.me/917489673372?text=Hi%20BlinkUp%2C%20I%20just%20submitted%20a%20service%20request."
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary"
          >
            <MessageCircle size={17} />
            WhatsApp
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
