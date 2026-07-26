import type { Metadata } from "next";
import Image from "next/image";
import {
  BadgeCheck,
  ClipboardCheck,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import BookingFlow from "../../components/BookingFlow";

export const metadata: Metadata = {
  title: "Book a Home Service in Bhopal",
  description:
    "Request a BlinkUp home-service inspection in Bhopal. Choose your service, share your area and confirm your preferred visit details.",
  alternates: {
    canonical: "/lead",
  },
};

interface BookingPageProps {
  searchParams?: {
    service?: string | string[];
  };
}

export default function LeadFormPage({ searchParams }: BookingPageProps) {
  const initialService =
    typeof searchParams?.service === "string"
      ? searchParams.service
      : undefined;

  return (
    <div className="bg-[#15101d] pb-24 pt-6">
      <section className="page-shell grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-white/10 lg:sticky lg:top-24 lg:min-h-[42rem] lg:self-start">
          <Image
            src="/images/hero-home-care.jpg"
            alt="BlinkUp home-service inspection consultation in Bhopal"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover object-[62%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#15101d] via-[#15101d]/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
            <p className="section-kicker border-white/15 bg-black/20 text-white">
              <MapPin size={13} />
              Book in Bhopal
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.05em]">
              A simpler way to arrange home service.
            </h1>
            <p className="mt-3 text-sm leading-7 text-[#ddd4e2]">
              Basic details first, visit preferences next. The team confirms
              everything before assigning the inspection.
            </p>
            <div className="mt-6 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
              {[
                {
                  icon: ClipboardCheck,
                  text: "Inspection-led scope",
                },
                {
                  icon: ShieldCheck,
                  text: "Quotation before work",
                },
                {
                  icon: MessageCircle,
                  text: "Call & WhatsApp confirmation",
                },
              ].map((item) => (
                <span
                  key={item.text}
                  className="flex items-center gap-2 text-xs font-semibold text-[#e7deeb]"
                >
                  <item.icon size={15} className="text-[#b99cff]" />
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        </div>

        <BookingFlow initialService={initialService} />
      </section>

      <section className="page-shell pt-8">
        <div className="flex items-start gap-3 rounded-[1.3rem] border border-white/8 bg-[#211a2b] p-4 text-xs leading-6 text-[#a99eaf]">
          <BadgeCheck size={18} className="mt-0.5 shrink-0 text-[#9b77f7]" />
          Your contact and location details are used to coordinate the requested
          service. Please review the Privacy Policy for more information.
        </div>
      </section>
    </div>
  );
}
