"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, MapPin, Menu, MessageCircle, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/", emphasis: true },
  { label: "Services", href: "/services", emphasis: true },
  { label: "Home AMC", href: "/amc", emphasis: true },
  { label: "How it works", href: "/#how-it-works", emphasis: true },
  { label: "About", href: "/about", emphasis: true },
  { label: "Reviews", href: "/testimonials", emphasis: true },
  { label: "Work", href: "/gallery", emphasis: false },
  { label: "Contact", href: "/contact", emphasis: false },
];

const whatsappUrl =
  "https://wa.me/917489673372?text=Hi%20BlinkUp%2C%20I%20need%20a%20home%20service%20in%20Bhopal.";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#15101d]/90 backdrop-blur-2xl">
      <div className="page-shell flex h-20 items-center justify-between gap-5">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="BlinkUp home">
          <Image
            src="/images/blinkup-app-logo.png"
            alt=""
            width={48}
            height={48}
            priority
            className="h-12 w-12 rounded-[15px] shadow-lg shadow-[#6d3ae6]/25 ring-1 ring-white/10"
          />
          <span>
            <span className="block text-xl font-bold leading-none tracking-[-0.04em]">
              BlinkUp
            </span>
            <span className="mt-1 flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.13em] text-[#aaa0b2]">
              <MapPin size={9} className="text-[#9b77f7]" />
              Home services · Bhopal
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 rounded-2xl border border-white/[0.07] bg-white/[0.035] p-1.5 xl:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : !item.href.includes("#") && pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap rounded-xl px-2.5 py-2 text-[12px] transition ${
                  active
                    ? "bg-[#6d3ae6] font-bold text-white shadow-lg shadow-[#6d3ae6]/20"
                    : item.emphasis
                      ? "font-semibold text-white hover:bg-[#6d3ae6]/20"
                      : "font-medium text-[#bdb2c5] hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-[#25d366] px-4 text-sm font-bold text-[#062b15] shadow-lg shadow-[#25d366]/15 transition hover:-translate-y-0.5 hover:bg-[#39dd76]"
            aria-label="Chat with BlinkUp on WhatsApp"
          >
            <MessageCircle size={20} />
            WhatsApp
          </a>
          <Link href="/lead" className="button-primary min-h-11 px-5 text-sm">
            Book Free Inspection
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="grid h-11 w-11 place-items-center rounded-2xl border border-[#44384f] bg-[#211a2b] xl:hidden"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/[0.07] bg-[#15101d] pb-5 pt-2 xl:hidden">
          <nav className="page-shell" aria-label="Mobile navigation">
            <div className="mb-2 flex items-center gap-2 rounded-2xl bg-[#211a2b] px-4 py-3 text-xs text-[#c7bdcd]">
              <MapPin size={16} className="text-[#9b77f7]" />
              Serving Bhopal and nearby areas
              <ChevronDown size={15} className="ml-auto" />
            </div>
            <div className="grid grid-cols-2 gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${
                    item.emphasis
                      ? "bg-white/[0.04] text-white hover:bg-[#6d3ae6]/20"
                      : "text-[#c7bdcd] hover:bg-[#211a2b] hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
