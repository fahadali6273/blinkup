import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

const serviceLinks = [
  ["Painting", "/services/painting"],
  ["Plumbing", "/services/plumbing"],
  ["Electrical", "/services/electrical"],
  ["Deep Cleaning", "/services/cleaning"],
  ["AC Service", "/services/ac-service"],
  ["Renovation", "/services/renovation"],
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#100b16] pb-8 pt-16 text-white">
      <div className="page-shell">
        <div className="grid gap-11 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/images/blinkup-app-logo.png"
                alt=""
                width={52}
                height={52}
                className="h-[3.25rem] w-[3.25rem] rounded-2xl ring-1 ring-white/10"
              />
              <span>
                <span className="block text-2xl font-bold tracking-[-0.04em]">
                  BlinkUp
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9f92a7]">
                  Bhopal home services
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#aaa0b2]">
              One place to request painting, repairs, cleaning, AC care,
              interiors and renovation—with inspection-first clarity.
            </p>
            <Link
              href="/bhopal"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#211a2b] px-4 py-2 text-xs font-semibold text-[#d2c8d8]"
            >
              <MapPin size={14} className="text-[#9b77f7]" />
              Serving Bhopal, Madhya Pradesh
            </Link>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-[#806f89]">
              Popular services
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-[#c8bece]">
              {serviceLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-[#806f89]">
              BlinkUp
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-[#c8bece]">
              <li><Link href="/services" className="transition hover:text-white">All services</Link></li>
              <li><Link href="/amc" className="transition hover:text-white">Home AMC plans</Link></li>
              <li><Link href="/gallery" className="transition hover:text-white">Work gallery</Link></li>
              <li><Link href="/about" className="transition hover:text-white">About us</Link></li>
              <li><Link href="/testimonials" className="transition hover:text-white">Customer reviews</Link></li>
              <li><Link href="/contact" className="transition hover:text-white">Contact</Link></li>
              <li><Link href="/lead" className="transition hover:text-white">Book Free Inspection</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-[#806f89]">
              Get help
            </h3>
            <div className="mt-5 space-y-3 text-sm text-[#c8bece]">
              <a
                href="tel:+917489673372"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Phone size={16} className="text-[#9b77f7]" />
                +91 74896 73372
              </a>
              <a
                href="https://wa.me/917489673372?text=Hi%20BlinkUp%2C%20I%20need%20a%20home%20service%20in%20Bhopal."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-semibold text-[#54e68b] transition hover:text-[#7cf2a8]"
              >
                <MessageCircle size={16} />
                WhatsApp BlinkUp
              </a>
              <a
                href="mailto:info@blinkuphome.com"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Mail size={16} className="text-[#9b77f7]" />
                info@blinkuphome.com
              </a>
            </div>

            <div className="mt-6 flex gap-2">
              <a
                href="https://www.facebook.com/profile.php?id=61576752742431"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BlinkUp on Facebook"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-[#211a2b] text-[#c8bece] transition hover:text-white"
              >
                <Facebook size={17} />
              </a>
              <a
                href="https://www.instagram.com/blinkup.home"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BlinkUp on Instagram"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-[#211a2b] text-[#c8bece] transition hover:text-white"
              >
                <Instagram size={17} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.06] pt-7 text-xs text-[#806f89] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} BlinkUp Home Services.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
