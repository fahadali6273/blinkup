"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  BadgeCheck,
  Check,
  Clock3,
  Loader2,
  MessageSquareHeart,
  Phone,
  RefreshCw,
  ShieldCheck,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { db } from "../../../lib/firebase";

interface ReviewSubmission {
  id: string;
  name?: string;
  phone?: string;
  service?: string;
  location?: string;
  message?: string;
  status?: string;
  source?: string;
  createdAt?: any;
}

interface PublishedReview {
  id: string;
  name?: string;
  city?: string;
  service?: string;
  rating?: number;
  review?: string;
  feedback?: string;
  verified?: boolean;
  approved?: boolean;
  createdAt?: any;
}

function getTimestamp(value: any): number {
  if (!value) return 0;
  if (value?.seconds) return value.seconds * 1000;
  if (typeof value?.toDate === "function") return value.toDate().getTime();
  const parsed = new Date(value).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
}

function formatDate(value: any) {
  const timestamp = getTimestamp(value);
  if (!timestamp) return "Date not available";
  return new Date(timestamp).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function parseSubmission(submission: ReviewSubmission) {
  const rawMessage = submission.message || "";
  const match = rawMessage.match(
    /\[CUSTOMER REVIEW\s*-\s*(\d)\/5\]\s*([\s\S]*)/i
  );
  const rating = Math.min(5, Math.max(1, Number(match?.[1]) || 5));
  const review = (match?.[2] || rawMessage).trim();
  const service = (submission.service || "Home Service")
    .replace(/^Customer Review\s*-\s*/i, "")
    .trim();

  return { rating, review, service };
}

export default function AdminTestimonialsPage() {
  const [submissions, setSubmissions] = useState<ReviewSubmission[]>([]);
  const [published, setPublished] = useState<PublishedReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setMessage(null);

    try {
      const [leadSnapshot, reviewSnapshot] = await Promise.all([
        getDocs(collection(db, "leads")),
        getDocs(collection(db, "testimonials")),
      ]);

      const reviewLeads = leadSnapshot.docs
        .map<ReviewSubmission>((document) => ({
          id: document.id,
          ...document.data(),
        }))
        .filter(
          (lead) =>
            lead.source === "customer-review-submission" ||
            lead.service?.startsWith("Customer Review")
        )
        .sort(
          (a, b) => getTimestamp(b.createdAt) - getTimestamp(a.createdAt)
        );

      const publishedReviews = reviewSnapshot.docs
        .map<PublishedReview>((document) => ({
          id: document.id,
          ...document.data(),
        }))
        .sort(
          (a, b) => getTimestamp(b.createdAt) - getTimestamp(a.createdAt)
        );

      setSubmissions(reviewLeads);
      setPublished(publishedReviews);
    } catch (fetchError) {
      console.error("Review moderation fetch error:", fetchError);
      setMessage({
        type: "error",
        text: "Review data load nahi hua. Please retry.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchReviews();
  }, [fetchReviews]);

  const pending = useMemo(
    () =>
      submissions.filter(
        (submission) =>
          submission.status !== "Completed" &&
          submission.status !== "Cancelled"
      ),
    [submissions]
  );

  const reviewed = useMemo(
    () =>
      submissions.filter(
        (submission) =>
          submission.status === "Completed" ||
          submission.status === "Cancelled"
      ),
    [submissions]
  );

  async function publishReview(submission: ReviewSubmission) {
    const parsed = parseSubmission(submission);

    if (!parsed.review) {
      setMessage({
        type: "error",
        text: "Review text missing hai, isliye publish nahi ho sakta.",
      });
      return;
    }

    setActiveId(submission.id);
    setMessage(null);

    try {
      await addDoc(collection(db, "testimonials"), {
        name: submission.name?.trim() || "BlinkUp Customer",
        city: submission.location?.trim() || "Bhopal",
        service: parsed.service,
        rating: parsed.rating,
        review: parsed.review,
        feedback: parsed.review,
        verified: true,
        approved: true,
        sourceLeadId: submission.id,
        createdAt: serverTimestamp(),
      });
      await updateDoc(doc(db, "leads", submission.id), {
        status: "Completed",
        reviewPublished: true,
      });

      await fetchReviews();
      setMessage({
        type: "success",
        text: "Verified review public website par publish ho gaya.",
      });
    } catch (publishError) {
      console.error("Review publishing error:", publishError);
      setMessage({
        type: "error",
        text: "Review publish nahi hua. Please retry.",
      });
    } finally {
      setActiveId("");
    }
  }

  async function rejectReview(submission: ReviewSubmission) {
    const confirmed = window.confirm(
      "Is customer review ko reject karke archive karna hai?"
    );
    if (!confirmed) return;

    setActiveId(submission.id);
    setMessage(null);

    try {
      await updateDoc(doc(db, "leads", submission.id), {
        status: "Cancelled",
        reviewPublished: false,
      });
      setSubmissions((current) =>
        current.map((item) =>
          item.id === submission.id
            ? { ...item, status: "Cancelled" }
            : item
        )
      );
      setMessage({ type: "success", text: "Review rejected and archived." });
    } catch (rejectError) {
      console.error("Review rejection error:", rejectError);
      setMessage({ type: "error", text: "Review reject nahi hua. Please retry." });
    } finally {
      setActiveId("");
    }
  }

  async function deletePublishedReview(review: PublishedReview) {
    const confirmed = window.confirm(
      "Is published review ko public website se remove karna hai?"
    );
    if (!confirmed) return;

    setActiveId(review.id);
    setMessage(null);

    try {
      await deleteDoc(doc(db, "testimonials", review.id));
      setPublished((current) => current.filter((item) => item.id !== review.id));
      setMessage({
        type: "success",
        text: "Review public website se remove ho gaya.",
      });
    } catch (deleteError) {
      console.error("Published review deletion error:", deleteError);
      setMessage({
        type: "error",
        text: "Published review remove nahi hua. Please retry.",
      });
    } finally {
      setActiveId("");
    }
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-5 rounded-[1.75rem] border border-white/[0.08] bg-[#15101d] p-5 sm:flex-row sm:items-end sm:p-7">
        <div>
          <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#9b77f7]">
            <MessageSquareHeart size={14} />
            Trust moderation
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.045em]">
            Publish only verified customer feedback.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#9f94a8]">
            Booking details check karke review approve karein. Customer phone
            number kabhi public nahi hoga.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void fetchReviews()}
          disabled={loading}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-xs font-bold text-[#d6cdda] transition hover:bg-white/[0.08] disabled:opacity-60"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh reviews
        </button>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          {
            label: "Pending verification",
            value: pending.length,
            icon: Clock3,
            tone: "text-amber-300 bg-amber-300/[0.08]",
          },
          {
            label: "Published reviews",
            value: published.length,
            icon: BadgeCheck,
            tone: "text-emerald-300 bg-emerald-300/[0.08]",
          },
          {
            label: "Reviewed archive",
            value: reviewed.length,
            icon: ShieldCheck,
            tone: "text-[#b99cff] bg-[#6d3ae6]/15",
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.label}
              className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-white/[0.08] bg-[#15101d] p-5"
            >
              <div>
                <p className="text-xs text-[#8f8498]">{item.label}</p>
                <p className="mt-2 text-3xl font-bold">{item.value}</p>
              </div>
              <span
                className={`grid h-12 w-12 place-items-center rounded-2xl ${item.tone}`}
              >
                <Icon size={22} />
              </span>
            </article>
          );
        })}
      </section>

      {message && (
        <div
          className={`rounded-2xl border p-4 text-sm ${
            message.type === "success"
              ? "border-emerald-300/15 bg-emerald-300/[0.07] text-emerald-200"
              : "border-rose-300/15 bg-rose-300/[0.07] text-rose-200"
          }`}
          role="status"
        >
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="flex min-h-72 items-center justify-center gap-3 rounded-[1.75rem] border border-white/[0.08] bg-[#15101d] text-sm text-[#8f8498]">
          <Loader2 size={20} className="animate-spin text-[#8f65f5]" />
          Loading review workflow...
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          <section className="overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#15101d]">
            <div className="border-b border-white/[0.07] p-5 sm:p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-amber-300">
                Action required
              </p>
              <h3 className="mt-2 text-xl font-bold">Pending verification</h3>
            </div>

            {pending.length === 0 ? (
              <div className="grid min-h-72 place-items-center p-8 text-center">
                <div>
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-300/[0.08] text-emerald-300">
                    <Check size={24} />
                  </span>
                  <p className="mt-4 font-bold">Review queue is clear</p>
                  <p className="mt-2 text-xs text-[#806f89]">
                    New customer feedback yahan appear hoga.
                  </p>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-white/[0.06]">
                {pending.map((submission) => {
                  const parsed = parseSubmission(submission);

                  return (
                    <article key={submission.id} className="p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-bold">
                            {submission.name || "BlinkUp Customer"}
                          </p>
                          <p className="mt-1 text-[10px] text-[#74687d]">
                            {submission.location || "Bhopal"} - {parsed.service}
                          </p>
                        </div>
                        <div
                          className="flex gap-1 text-amber-300"
                          aria-label={`${parsed.rating} out of 5 stars`}
                        >
                          {Array.from({ length: 5 }, (_, index) => (
                            <Star
                              key={index}
                              size={14}
                              fill={
                                index < parsed.rating ? "currentColor" : "none"
                              }
                              className={
                                index < parsed.rating
                                  ? "text-amber-300"
                                  : "text-[#504457]"
                              }
                            />
                          ))}
                        </div>
                      </div>

                      <p className="mt-4 rounded-2xl bg-white/[0.025] p-4 text-sm leading-7 text-[#c9becf]">
                        &ldquo;{parsed.review || "Review text missing"}&rdquo;
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-3 text-[10px] text-[#74687d]">
                        <a
                          href={
                            submission.phone
                              ? `tel:${submission.phone.replace(/\D/g, "")}`
                              : undefined
                          }
                          className="inline-flex items-center gap-1.5 hover:text-white"
                        >
                          <Phone size={13} />
                          {submission.phone || "Phone missing"}
                        </a>
                        <span>{formatDate(submission.createdAt)}</span>
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => void publishReview(submission)}
                          disabled={activeId === submission.id}
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-3 text-xs font-bold text-[#08261d] disabled:opacity-50"
                        >
                          {activeId === submission.id ? (
                            <Loader2 size={15} className="animate-spin" />
                          ) : (
                            <BadgeCheck size={15} />
                          )}
                          Publish verified
                        </button>
                        <button
                          type="button"
                          onClick={() => void rejectReview(submission)}
                          disabled={activeId === submission.id}
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-rose-300/15 bg-rose-300/[0.07] px-3 text-xs font-bold text-rose-300 disabled:opacity-50"
                        >
                          <X size={15} />
                          Reject
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>

          <section className="overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#15101d]">
            <div className="border-b border-white/[0.07] p-5 sm:p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-300">
                Live on website
              </p>
              <h3 className="mt-2 text-xl font-bold">Published reviews</h3>
            </div>

            {published.length === 0 ? (
              <div className="grid min-h-72 place-items-center p-8 text-center">
                <div>
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/[0.04] text-[#806f89]">
                    <MessageSquareHeart size={24} />
                  </span>
                  <p className="mt-4 font-bold">No database reviews yet</p>
                  <p className="mt-2 max-w-sm text-xs leading-5 text-[#806f89]">
                    Verified feedback publish karne ke baad public reviews
                    section automatically update hoga.
                  </p>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-white/[0.06]">
                {published.map((review) => {
                  const rating = Math.min(
                    5,
                    Math.max(1, Number(review.rating) || 5)
                  );

                  return (
                    <article key={review.id} className="p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold">
                              {review.name || "BlinkUp Customer"}
                            </p>
                            <BadgeCheck
                              size={15}
                              className="text-emerald-300"
                            />
                          </div>
                          <p className="mt-1 text-[10px] text-[#74687d]">
                            {review.city || "Bhopal"} -{" "}
                            {review.service || "Home Service"}
                          </p>
                        </div>
                        <div className="flex gap-1 text-amber-300">
                          {Array.from({ length: 5 }, (_, index) => (
                            <Star
                              key={index}
                              size={14}
                              fill={index < rating ? "currentColor" : "none"}
                              className={
                                index < rating
                                  ? "text-amber-300"
                                  : "text-[#504457]"
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-[#c9becf]">
                        &ldquo;{review.review || review.feedback}&rdquo;
                      </p>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-300">
                          <ShieldCheck size={13} />
                          Booking verified
                        </span>
                        <button
                          type="button"
                          onClick={() => void deletePublishedReview(review)}
                          disabled={activeId === review.id}
                          className="inline-flex min-h-9 items-center gap-2 rounded-xl border border-rose-300/15 bg-rose-300/[0.07] px-3 text-[10px] font-bold text-rose-300 disabled:opacity-50"
                        >
                          {activeId === review.id ? (
                            <Loader2 size={13} className="animate-spin" />
                          ) : (
                            <Trash2 size={13} />
                          )}
                          Remove
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      )}

      <div className="flex items-start gap-3 rounded-2xl border border-[#8f65f5]/15 bg-[#6d3ae6]/[0.07] p-4 text-xs leading-6 text-[#b8acbf]">
        <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#b99cff]" />
        Publish karne se pehle customer name, service, area aur phone ko original
        booking se match karein. Public website par phone number save ya display
        nahi kiya jata.
      </div>
    </div>
  );
}
