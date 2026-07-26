"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ArrowRight, BadgeCheck, Quote, Star, Users } from "lucide-react";
import { db } from "../lib/firebase";
import {
  testimonials,
  type Testimonial,
} from "../data/testimonials";

interface TestimonialsSectionProps {
  showAll?: boolean;
}

export default function TestimonialsSection({
  showAll = false,
}: TestimonialsSectionProps) {
  const [verifiedReviews, setVerifiedReviews] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchVerifiedReviews = async () => {
      try {
        const reviewQuery = query(
          collection(db, "testimonials"),
          where("approved", "==", true)
        );
        const snapshot = await getDocs(reviewQuery);
        const liveReviews = snapshot.docs
          .map((document) => {
            const data = document.data();
            const createdAt = data.createdAt?.seconds
              ? data.createdAt.seconds * 1000
              : 0;

            return {
              id: document.id,
              name: data.name || "BlinkUp Customer",
              city: data.city || "Bhopal",
              service: data.service || "Home Service",
              rating: Math.min(5, Math.max(1, Number(data.rating) || 5)),
              review: data.review || data.feedback || "",
              verified: true,
              createdAt,
            };
          })
          .filter((review) => review.review)
          .sort((a, b) => b.createdAt - a.createdAt)
          .map(({ createdAt: _createdAt, ...review }) => review);

        setVerifiedReviews(liveReviews);
      } catch (error) {
        console.error("Verified review fetch error:", error);
      }
    };

    void fetchVerifiedReviews();
  }, []);

  const allReviews = useMemo(
    () => [...verifiedReviews, ...testimonials],
    [verifiedReviews]
  );
  const visibleReviews = showAll ? allReviews : allReviews.slice(0, 3);
  const hasVerifiedReviews = verifiedReviews.length > 0;
  return (
    <section
      id="reviews"
      className="scroll-mt-24 bg-[#15101d] pb-24 pt-6"
      aria-labelledby="customer-reviews-title"
    >
      <div className="page-shell">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="section-kicker">
              <BadgeCheck size={13} />
              {hasVerifiedReviews ? "Verified customer reviews" : "Customer review preview"}
            </p>
            <h2
              id="customer-reviews-title"
              className="mt-4 text-3xl font-bold tracking-[-0.045em] sm:text-5xl"
            >
              {hasVerifiedReviews
                ? "Bhopal customers ka verified BlinkUp experience."
                : "Bhopal customer reviews ke liye trust-ready section."}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#bdb2c5]">
              {hasVerifiedReviews
                ? "Real booking feedback, admin verification ke baad publish kiya gaya hai. Sample cards sirf layout preview ke liye clearly marked hain."
                : "Ye sample review content layout preview ke liye hai. Real booking-verified feedback approval ke baad isi section mein publish hoga."}
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-[1.35rem] border border-white/10 bg-[#211a2b] px-5 py-4">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-400/15 text-amber-300">
              <Star size={24} fill="currentColor" />
            </span>
            <div>
              <p className="text-xl font-bold">
                {hasVerifiedReviews ? `${verifiedReviews.length} verified` : "Review-ready"}
              </p>
              <p className="text-xs text-[#a99dad]">
                {hasVerifiedReviews
                  ? "Real customer experiences"
                  : `${testimonials.length} sample experience cards`}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleReviews.map((review, index) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="app-card-raised flex min-h-[20rem] flex-col p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#8f65f5] to-[#4b249d] text-sm font-bold text-white"
                    aria-hidden="true"
                  >
                    {review.name.charAt(0)}
                  </span>
                  <div>
                    <h3 className="font-bold">{review.name}</h3>
                    <p className="mt-0.5 text-[11px] text-[#9f94a8]">
                      {review.city}
                    </p>
                  </div>
                </div>
                <Quote size={25} className="shrink-0 text-[#8068ae]" />
              </div>

              <div
                className="mt-5 flex items-center gap-1 text-amber-300"
                aria-label={`${review.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }, (_, starIndex) => (
                  <Star
                    key={starIndex}
                    size={16}
                    fill={starIndex < review.rating ? "currentColor" : "none"}
                    className={
                      starIndex < review.rating
                        ? "text-amber-300"
                        : "text-[#5a4e64]"
                    }
                  />
                ))}
              </div>

              <blockquote className="mt-4 flex-1 text-sm leading-7 text-[#d4cbd9]">
                “{review.review}”
              </blockquote>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
                <span className="rounded-full bg-[#6d3ae6]/15 px-3 py-1.5 text-[10px] font-bold text-[#c7b4fa]">
                  {review.service}
                </span>
                {review.verified && (
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-300">
                    <BadgeCheck size={14} />
                    Booking verified
                  </span>
                )}
                {!review.verified && (
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#bdb2c5]">
                    <BadgeCheck size={14} />
                    Sample review
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {!showAll && (
          <div className="mt-7 flex flex-col items-start justify-between gap-4 rounded-[1.5rem] border border-white/[0.08] bg-[#211a2b] p-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#55427a] text-[#eadfff]">
                <Users size={21} />
              </span>
              <div>
                <p className="font-bold">Aur customer experiences dekhein</p>
                <p className="mt-1 text-xs text-[#9f94a8]">
                  Service-wise reviews aur feedback form ek hi page par.
                </p>
              </div>
            </div>
            <Link
              href="/testimonials"
              className="button-secondary w-full px-5 text-sm sm:w-auto"
            >
              View All Reviews
              <ArrowRight size={17} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
