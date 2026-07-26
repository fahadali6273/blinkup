import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Camera, Sparkles } from "lucide-react";
import GalleryGrid from "../../components/GalleryGrid";

export const metadata: Metadata = {
  title: "Home Service Gallery · BlinkUp Bhopal",
  description:
    "Explore representative BlinkUp service moments for painting, plumbing, electrical work, cleaning and interiors in Bhopal homes.",
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <div className="bg-[#15101d] pb-24 pt-8">
      <section className="page-shell">
        <div className="soft-grid overflow-hidden rounded-[2rem] border border-white/10 bg-[#211a2b] px-6 py-14 sm:px-10 sm:py-20">
          <p className="section-kicker">
            <Camera size={13} />
            Service gallery
          </p>
          <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-[-0.05em] sm:text-6xl">
                Professional care, shown in the details.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#bdb2c5]">
                Representative service moments showing the tidy setup, correct
                tools and inspection-first approach BlinkUp aims to deliver.
              </p>
            </div>
            <Link href="/lead" className="button-primary self-start px-6 lg:self-auto">
              Book Free Inspection
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="page-shell pt-12">
        <div className="mb-6 flex items-center gap-2 text-xs text-[#9f94a8]">
          <Sparkles size={14} className="text-[#a98aff]" />
          Select a category, then open any image for a closer look.
        </div>
        <GalleryGrid />
      </section>
    </div>
  );
}
