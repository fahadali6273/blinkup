import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronRight,
  ClipboardCheck,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import ServiceIcon from "../../../components/ServiceIcon";
import {
  getServiceBySlug,
  serviceCatalog,
} from "../../../data/serviceCatalog";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return serviceCatalog.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    return {
      title: "Service Not Found",
      robots: { index: false, follow: false },
    };
  }

  const title = `${service.name} Service in Bhopal`;
  const description = `${service.shortDescription} Request a BlinkUp inspection in Bhopal and review the quotation before work begins.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${title} | BlinkUp`,
      description,
      url: `/services/${service.slug}`,
      images: [
        {
          url: service.image,
          alt: service.imageAlt,
        },
      ],
    },
  };
}

export default function ServiceDetailsPage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.slug);

  if (!service) notFound();

  const relatedServices = serviceCatalog
    .filter((item) => item.slug !== service.slug)
    .filter(
      (item) =>
        item.icon === service.icon ||
        item.image === service.image ||
        item.popular
    )
    .slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `${service.name} Service in Bhopal`,
        description: service.description,
        url: `https://blinkuphome.com/services/${service.slug}`,
        image: `https://blinkuphome.com${service.image}`,
        areaServed: {
          "@type": "City",
          name: "Bhopal",
        },
        provider: {
          "@type": "HomeAndConstructionBusiness",
          name: "BlinkUp Home Services",
          telephone: "+91-74896-73372",
          url: "https://blinkuphome.com",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://blinkuphome.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://blinkuphome.com/services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.name,
            item: `https://blinkuphome.com/services/${service.slug}`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  const whatsappUrl = `https://wa.me/917489673372?text=${encodeURIComponent(
    `Hi BlinkUp, I need ${service.name} service in Bhopal.`
  )}`;

  return (
    <div className="bg-[#15101d] pb-24 pt-5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="page-shell">
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex items-center gap-1.5 overflow-hidden text-xs text-[#9e92a7]"
        >
          <Link href="/" className="hover:text-white">Home</Link>
          <ChevronRight size={13} />
          <Link href="/services" className="hover:text-white">Services</Link>
          <ChevronRight size={13} />
          <span className="truncate text-[#d9cfde]">{service.name}</span>
        </nav>

        <div className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-white/10 sm:min-h-[38rem]">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#15101d] via-[#15101d]/88 to-[#15101d]/15" />
          <div className="relative flex min-h-[34rem] max-w-[47rem] flex-col justify-center p-6 sm:min-h-[38rem] sm:p-12">
            <div className="flex flex-wrap gap-2">
              <span className="section-kicker border-white/15 bg-black/20 text-white">
                <MapPin size={13} />
                {service.name} · Bhopal
              </span>
              <span className="trust-chip">
                <ShieldCheck size={14} className="text-[#b99cff]" />
                Inspection-first service
              </span>
            </div>

            <span
              className="mt-7 grid h-14 w-14 place-items-center rounded-[1.15rem] text-white shadow-xl"
              style={{ backgroundColor: service.accent }}
            >
              <ServiceIcon name={service.icon} size={27} />
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.05em] sm:text-6xl">
              {service.name} service in Bhopal
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#e1d7e6] sm:text-base">
              {service.description}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/lead?service=${encodeURIComponent(service.name)}`}
                className="button-primary px-6"
              >
                Request inspection
                <ArrowRight size={18} />
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3.15rem] items-center justify-center gap-2 rounded-2xl border border-white/20 bg-black/20 px-6 font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                <MessageCircle size={18} />
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell grid gap-8 pt-14 lg:grid-cols-[1fr_21rem]">
        <div className="space-y-8">
          <article className="app-card-raised p-6 sm:p-8">
            <p className="eyebrow text-[#a98aff]">
              <Sparkles size={14} />
              What is covered
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">
              A clear scope, built around your home.
            </h2>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {service.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-start gap-3 rounded-2xl border border-white/8 bg-[#191320] p-4"
                >
                  <span
                    className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full"
                    style={{
                      backgroundColor: `${service.accent}22`,
                      color: service.accent,
                    }}
                  >
                    <Check size={15} strokeWidth={3} />
                  </span>
                  <p className="text-sm leading-6 text-[#d4cad9]">{highlight}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="light-panel rounded-[1.75rem] p-6 sm:p-8">
            <p className="eyebrow text-[#6d3ae6]">Popular requirements</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">
              Common {service.name.toLowerCase()} jobs
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6f6676]">
              Choose the closest option while booking. Exact scope inspection
              ke baad confirm hoga.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {service.subServices.map((subService) => (
                <span
                  key={subService}
                  className="rounded-full border border-[#ded5e8] bg-white px-4 py-2.5 text-xs font-semibold text-[#42394a]"
                >
                  {subService}
                </span>
              ))}
            </div>
          </article>

          <article className="app-gradient-soft overflow-hidden rounded-[1.75rem] p-6 sm:p-8">
            <p className="eyebrow text-[#e6dcff]">How it works</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Share the problem",
                  text: "Choose the service, area and mobile number.",
                },
                {
                  number: "02",
                  title: "Confirm inspection",
                  text: "The team confirms details and a suitable visit.",
                },
                {
                  number: "03",
                  title: "Review quotation",
                  text: "Work begins after the scope and price are approved.",
                },
              ].map((step) => (
                <div key={step.number}>
                  <span className="text-xs font-bold text-[#d8c8ff]">
                    {step.number}
                  </span>
                  <h3 className="mt-2 font-bold">{step.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-[#e4d9f7]">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="app-card-raised p-6 sm:p-8">
            <p className="eyebrow text-[#a98aff]">Good fit for</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.idealFor.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-[#191320] px-4 py-3"
                >
                  <BadgeCheck size={18} style={{ color: service.accent }} />
                  <span className="text-sm font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="light-panel rounded-[1.75rem] p-6 sm:p-8">
            <p className="eyebrow text-[#6d3ae6]">Questions answered</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">
              {service.name} FAQs
            </h2>
            <div className="mt-6 space-y-3">
              {service.faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  open={index === 0}
                  className="group rounded-2xl border border-[#e2dbe8] bg-white px-5 py-4"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                    {faq.question}
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f1eaff] text-[#6d3ae6] transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="pt-3 text-sm leading-7 text-[#6f6676]">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </article>
        </div>

        <aside className="self-start lg:sticky lg:top-24">
          <div className="app-card-raised p-5">
            <span
              className="grid h-12 w-12 place-items-center rounded-2xl text-white"
              style={{ backgroundColor: service.accent }}
            >
              <ClipboardCheck size={23} />
            </span>
            <h2 className="mt-5 text-xl font-bold">Ready for an inspection?</h2>
            <p className="mt-2 text-xs leading-6 text-[#bdb2c5]">
              Send the request now. The team will confirm your Bhopal address,
              requirement and visit slot.
            </p>
            <Link
              href={`/lead?service=${encodeURIComponent(service.name)}`}
              className="button-primary mt-5 w-full"
            >
              Book {service.name}
              <ArrowRight size={17} />
            </Link>
            <a
              href="tel:+917489673372"
              className="button-secondary mt-2 w-full text-sm"
            >
              <Phone size={17} />
              Call +91 74896 73372
            </a>
            <p className="mt-4 text-center text-[10px] leading-5 text-[#8f8498]">
              No payment is required to submit a request.
            </p>
          </div>
        </aside>
      </section>

      <section className="page-shell pt-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-[#a98aff]">You may also need</p>
            <h2 className="mt-2 text-2xl font-bold">Related home services</h2>
          </div>
          <Link
            href="/services"
            className="hidden items-center gap-2 text-sm font-bold text-[#b99cff] sm:inline-flex"
          >
            All services
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {relatedServices.map((item) => (
            <Link
              key={item.slug}
              href={`/services/${item.slug}`}
              className="group app-card flex items-center gap-4 p-4 transition hover:border-[#705a89]"
            >
              <span
                className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white"
                style={{ backgroundColor: item.accent }}
              >
                <ServiceIcon name={item.icon} size={21} />
              </span>
              <span>
                <span className="block font-bold">{item.name}</span>
                <span className="mt-1 line-clamp-1 block text-xs text-[#a99eaf]">
                  {item.shortDescription}
                </span>
              </span>
              <ArrowRight
                size={16}
                className="ml-auto shrink-0 text-[#8f8498] transition group-hover:translate-x-1 group-hover:text-white"
              />
            </Link>
          ))}
        </div>
        <Link
          href="/services"
          className="button-secondary mt-4 w-full sm:hidden"
        >
          <ArrowLeft size={16} />
          View all services
        </Link>
      </section>
    </div>
  );
}
