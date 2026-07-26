"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Search, Sparkles } from "lucide-react";
import { popularServices } from "../data/serviceCatalog";
import ServiceIcon from "./ServiceIcon";

export default function ServicesSection() {
  return (
    <section id="services" className="bg-[#15101d] pb-24 pt-4">
      <div className="page-shell">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="section-kicker">
              <Sparkles size={13} />
              Popular in Bhopal
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-[-0.045em] sm:text-5xl">
              Ghar ke har corner ke liye right expert.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[#bdb2c5]">
              Bas problem bataiye. Hum correct service, free inspection aur
              work scope confirm karne mein help karenge.
            </p>
          </div>
          <Link
            href="/services"
            className="button-secondary self-start px-5 text-sm sm:self-auto"
          >
            <Search size={17} />
            View All Services
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularServices.map((service, index) => (
            <motion.article
              key={service.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className={`group relative min-h-[22rem] overflow-hidden rounded-[1.75rem] border border-white/10 ${
                index === 0 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#130e19] via-[#130e19]/45 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="mb-5 flex items-center justify-between">
                  <span
                    className="grid h-12 w-12 place-items-center rounded-2xl text-white shadow-xl"
                    style={{ background: service.accent }}
                  >
                    <ServiceIcon name={service.icon} size={23} strokeWidth={2.2} />
                  </span>
                  <span className="rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white backdrop-blur">
                    Free inspection
                  </span>
                </div>
                <h3 className="text-2xl font-bold tracking-[-0.035em]">
                  {service.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#ddd4e2]">
                  {service.shortDescription}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white"
                >
                  Service dekhein
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="app-gradient-soft mt-5 flex flex-col items-start justify-between gap-4 rounded-[1.5rem] px-6 py-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-bold">Exact requirement nahi mil rahi?</p>
            <p className="mt-1 text-sm text-[#e5dbf8]">
              WhatsApp par problem share kijiye—BlinkUp aapko right service
              category tak guide karega.
            </p>
          </div>
          <a
            href="https://wa.me/917489673372?text=Hi%20BlinkUp%2C%20I%27m%20not%20sure%20which%20service%20to%20book."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-[#25d366] px-5 text-sm font-bold text-[#062b15] shadow-lg shadow-[#25d366]/15 transition hover:-translate-y-0.5"
          >
            <MessageCircle size={18} />
            WhatsApp par poochhein
            <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
