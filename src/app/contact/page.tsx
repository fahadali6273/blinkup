import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import ContactForm from "../../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact BlinkUp · Home Services in Bhopal",
  description:
    "Contact BlinkUp by phone, WhatsApp or email for home-service bookings and support in Bhopal.",
  alternates: {
    canonical: "/contact",
  },
};

const contactOptions = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Quick questions & photos",
    href: "https://wa.me/917489673372?text=Hi%20BlinkUp%2C%20I%20need%20help%20with%20a%20home%20service.",
    external: true,
  },
  {
    icon: Phone,
    label: "Call",
    value: "+91 74896 73372",
    href: "tel:+917489673372",
    external: false,
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@blinkuphome.com",
    href: "mailto:info@blinkuphome.com",
    external: false,
  },
];

export default function ContactPage() {
  return (
    <div className="bg-[#15101d] pb-24 pt-6">
      <section className="page-shell">
        <div className="relative min-h-[31rem] overflow-hidden rounded-[2rem] border border-white/10">
          <Image
            src="/images/hero-home-care.jpg"
            alt="BlinkUp customer support begins with a clear home-service consultation"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[62%_center]"
          />
          <div className="image-scrim absolute inset-0" />
          <div className="relative flex min-h-[31rem] max-w-2xl flex-col justify-center p-6 sm:p-11">
            <p className="section-kicker border-white/15 bg-black/20 text-white">
              <Sparkles size={13} />
              Contact BlinkUp
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.05em] sm:text-6xl">
              Help is one message away.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#ded5e3] sm:text-base">
              Free inspection book kijiye, question poochhiye ya problem ki
              photo share kijiye.
              Choose whichever channel is most convenient.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/lead" className="button-primary px-6">
                Book Free Inspection
                <ArrowRight size={18} />
              </Link>
              <span className="trust-chip">
                <MapPin size={14} className="text-[#b99cff]" />
                Bhopal support
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell grid gap-8 pt-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <div className="space-y-3">
            {contactOptions.map((option) => (
              <a
                key={option.label}
                href={option.href}
                target={option.external ? "_blank" : undefined}
                rel={option.external ? "noopener noreferrer" : undefined}
                className="group app-card-raised flex items-center gap-4 p-5 transition hover:border-[#705a89]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#55427a] text-[#eadfff]">
                  <option.icon size={22} />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#8f8498]">
                    {option.label}
                  </span>
                  <span className="mt-1 block text-sm font-bold text-white">
                    {option.value}
                  </span>
                </span>
                <ArrowRight
                  size={18}
                  className="ml-auto text-[#8f8498] transition group-hover:translate-x-1 group-hover:text-white"
                />
              </a>
            ))}
          </div>

          <div className="mt-5 rounded-[1.5rem] border border-[#43384f] bg-[#211a2b] p-6">
            <p className="eyebrow text-[#a98aff]">Service area</p>
            <h2 className="mt-2 text-xl font-bold">Bhopal, Madhya Pradesh</h2>
            <p className="mt-3 text-sm leading-7 text-[#bdb2c5]">
              Share your colony or current location while booking. The team will
              confirm service availability for the requested area.
            </p>
          </div>
        </div>

        <ContactForm />
      </section>
    </div>
  );
}
