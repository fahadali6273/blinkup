"use client";

import Link from "next/link";
import { CalendarCheck2, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

const whatsappUrl =
  "https://wa.me/917489673372?text=Hi%20BlinkUp%2C%20I%20need%20a%20home%20service%20in%20Bhopal.";

export default function MobileActionBar() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#15101d]/95 px-3 pt-2 backdrop-blur-xl md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#25d366] text-sm font-bold text-[#062b15]"
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>
        <Link
          href="/lead"
          className="app-gradient flex min-h-12 items-center justify-center gap-2 rounded-2xl text-sm font-bold text-white"
        >
          <CalendarCheck2 size={18} />
          Free Inspection
        </Link>
      </div>
    </div>
  );
}
