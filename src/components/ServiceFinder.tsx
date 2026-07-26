"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import { serviceCatalog } from "../data/serviceCatalog";
import ServiceIcon from "./ServiceIcon";

const groups = [
  { label: "All", slugs: serviceCatalog.map((service) => service.slug) },
  {
    label: "Quick repairs",
    slugs: ["plumbing", "electrical", "carpentry", "appliance-repair", "ac-service"],
  },
  {
    label: "Cleaning & care",
    slugs: ["cleaning", "painting", "ac-service", "wall-paneling"],
  },
  {
    label: "Improve my space",
    slugs: [
      "renovation",
      "interior-design",
      "interior-decoration",
      "wall-paneling",
      "false-ceiling",
    ],
  },
  {
    label: "Move & secure",
    slugs: ["moving", "cctv", "smart-home"],
  },
];

export default function ServiceFinder() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("All");

  const visibleServices = useMemo(() => {
    const activeGroup = groups.find((item) => item.label === group) ?? groups[0];
    const normalizedQuery = query.trim().toLowerCase();

    return serviceCatalog.filter((service) => {
      const belongsToGroup = activeGroup.slugs.includes(service.slug);
      const haystack = [
        service.name,
        service.shortDescription,
        ...service.searchTerms,
        ...service.subServices,
      ]
        .join(" ")
        .toLowerCase();

      return belongsToGroup && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [group, query]);

  return (
    <div>
      <div className="app-card-raised p-4 sm:p-5">
        <label className="relative block">
          <span className="sr-only">Search home services</span>
          <Search
            size={20}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#a99caf]"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by problem: leak, fan, sofa, paint..."
            className="field min-h-[3.6rem] pl-12"
          />
        </label>

        <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-1">
          <SlidersHorizontal size={16} className="shrink-0 text-[#9b86c4]" />
          {groups.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setGroup(item.label)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                group === item.label
                  ? "border-[#8f65f5] bg-[#6d3ae6] text-white"
                  : "border-[#43384f] bg-[#211a2b] text-[#c8bece] hover:border-[#6c5b7c]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleServices.map((service) => (
          <article
            key={service.slug}
            className="group overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#211a2b]"
          >
            <Link
              href={`/services/${service.slug}`}
              className="relative block h-48 overflow-hidden"
              aria-label={`View ${service.name} service`}
            >
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#211a2b] via-transparent to-transparent" />
              <span
                className="absolute bottom-4 left-4 grid h-12 w-12 place-items-center rounded-2xl text-white shadow-xl"
                style={{ backgroundColor: service.accent }}
              >
                <ServiceIcon name={service.icon} size={23} />
              </span>
              {service.popular && (
                <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white backdrop-blur">
                  Popular
                </span>
              )}
            </Link>

            <div className="p-5">
              <h2 className="text-xl font-bold tracking-[-0.025em]">
                {service.name}
              </h2>
              <p className="mt-2 min-h-12 text-sm leading-6 text-[#bdb2c5]">
                {service.shortDescription}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <Link
                  href={`/services/${service.slug}`}
                  className="button-secondary min-h-11 px-3 text-xs"
                >
                  Details
                </Link>
                <Link
                  href={`/lead?service=${encodeURIComponent(service.name)}`}
                  className="button-primary min-h-11 px-3 text-xs"
                >
                  Book
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {visibleServices.length === 0 && (
        <div className="mt-7 rounded-[1.5rem] border border-dashed border-[#574866] bg-[#211a2b] px-6 py-12 text-center">
          <p className="font-bold">No exact match found</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#bdb2c5]">
            Try a simpler word or tell us the problem on WhatsApp. We will help
            choose the right service.
          </p>
          <a
            href="https://wa.me/917489673372?text=Hi%20BlinkUp%2C%20I%20need%20help%20choosing%20a%20service."
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary mt-5"
          >
            Ask BlinkUp
            <ArrowRight size={17} />
          </a>
        </div>
      )}
    </div>
  );
}
