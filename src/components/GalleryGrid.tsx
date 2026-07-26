"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Expand, X } from "lucide-react";
import { gallery, galleryCategories, type GalleryItem } from "../data/gallery";

export default function GalleryGrid() {
  const [category, setCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filtered =
    category === "All"
      ? gallery
      : gallery.filter((item) => item.category === category);

  useEffect(() => {
    if (!selectedItem) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedItem(null);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [selectedItem]);

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-2" aria-label="Gallery filters">
        {galleryCategories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition ${
              category === item
                ? "border-[#8f65f5] bg-[#6d3ae6] text-white"
                : "border-[#43384f] bg-[#211a2b] text-[#c8bece] hover:border-[#6f5c81]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-6 grid auto-rows-[18rem] gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedItem(item)}
            className={`group relative overflow-hidden rounded-[1.6rem] border border-white/10 text-left ${
              category === "All" && index === 0 ? "sm:col-span-2" : ""
            }`}
            aria-label={`Open image: ${item.description}`}
          >
            <Image
              src={item.imageUrl}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#130e19] via-transparent to-transparent" />
            <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-black/30 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
              <Expand size={17} />
            </span>
            <span className="absolute inset-x-0 bottom-0 p-5">
              <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-[#c7adff]">
                {item.category}
              </span>
              <span className="mt-1 block text-sm font-semibold leading-6 text-white">
                {item.description}
              </span>
            </span>
          </button>
        ))}
      </div>

      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedItem.category} service image`}
          className="fixed inset-0 z-[70] grid place-items-center bg-[#09060d]/90 p-4 backdrop-blur-md"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#211a2b] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={selectedItem.imageUrl}
                alt={selectedItem.alt}
                fill
                sizes="90vw"
                className="object-cover"
              />
            </div>
            <div className="flex items-start justify-between gap-4 p-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#a98aff]">
                  {selectedItem.category}
                </p>
                <p className="mt-1 text-sm text-[#d4cad9]">
                  {selectedItem.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#30263a] text-white"
                aria-label="Close image"
              >
                <X size={19} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
