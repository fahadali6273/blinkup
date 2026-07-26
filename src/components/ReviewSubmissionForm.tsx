"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowRight,
  BadgeCheck,
  MessageCircle,
  ShieldCheck,
  Star,
} from "lucide-react";
import { serviceCatalog } from "../data/serviceCatalog";

const initialForm = {
  name: "",
  phone: "",
  area: "",
  service: "",
  rating: 5,
  review: "",
};

export default function ReviewSubmissionForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showWhatsAppFallback, setShowWhatsAppFallback] = useState(false);

  const whatsappUrl = useMemo(() => {
    const message = [
      "Hi BlinkUp, I want to share my customer feedback.",
      `Name: ${form.name || "Not added"}`,
      `Area: ${form.area || "Not added"}`,
      `Service: ${form.service || "Not added"}`,
      `Rating: ${form.rating}/5`,
      `Review: ${form.review || "Not added"}`,
    ].join("\n");

    return `https://wa.me/917489673372?text=${encodeURIComponent(message)}`;
  }, [form]);

  function updateField(
    field: keyof typeof initialForm,
    value: string | number
  ) {
    setForm((current) => ({ ...current, [field]: value }));
    setStatus("idle");
    setErrorMessage("");
    setShowWhatsAppFallback(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setShowWhatsAppFallback(false);

    if (form.name.trim().length < 2) {
      setStatus("error");
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setStatus("error");
      setErrorMessage("Enter a valid 10-digit mobile number.");
      return;
    }

    if (!form.area.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your area in Bhopal.");
      return;
    }

    if (!form.service) {
      setStatus("error");
      setErrorMessage("Please choose the service you booked.");
      return;
    }

    if (form.review.trim().length < 20) {
      setStatus("error");
      setErrorMessage("Review thoda detail mein likhein (minimum 20 characters).");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone,
          service: `Customer Review - ${form.service}`,
          location: form.area.trim(),
          message: `[CUSTOMER REVIEW - ${form.rating}/5]\n${form.review.trim()}`,
          source: "customer-review-submission",
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to send review");
      }

      setStatus("sent");
      setForm(initialForm);
    } catch (submitError) {
      console.error("Customer review submission error:", submitError);
      setStatus("error");
      setErrorMessage(
        "Review abhi online submit nahi hui. WhatsApp se directly share kar sakte hain."
      );
      setShowWhatsAppFallback(true);
    }
  }

  if (status === "sent") {
    return (
      <div className="app-card-raised flex min-h-[34rem] flex-col items-center justify-center p-7 text-center sm:p-10">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
          <BadgeCheck size={40} />
        </span>
        <p className="eyebrow mt-7 text-emerald-300">Feedback received</p>
        <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">
          Thank you for sharing.
        </h2>
        <p className="mt-4 max-w-md text-sm leading-7 text-[#bdb2c5]">
          Aapka review booking details ke saath verify hoga. Verification ke
          baad hi website par publish kiya jayega.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="button-secondary mt-7"
        >
          Share another review
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="app-card-raised p-6 sm:p-8">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="eyebrow text-[#a98aff]">Customer feedback</p>
          <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em]">
            Apna experience share karein
          </h2>
        </div>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#55427a] text-[#eadfff]">
          <ShieldCheck size={23} />
        </span>
      </div>

      <p className="mt-3 text-xs leading-6 text-[#a99eaf]">
        Review publish karne se pehle booking verify ki jaati hai. Aapka phone
        number sirf verification ke liye hai aur public page par show nahi hoga.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <label>
          <span className="mb-1.5 block text-xs font-semibold text-[#bdb2c5]">
            Name
          </span>
          <input
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="field"
            placeholder="Your name"
          />
        </label>
        <label>
          <span className="mb-1.5 block text-xs font-semibold text-[#bdb2c5]">
            Mobile number
          </span>
          <input
            type="tel"
            required
            inputMode="numeric"
            autoComplete="tel"
            maxLength={10}
            value={form.phone}
            onChange={(event) =>
              updateField(
                "phone",
                event.target.value.replace(/\D/g, "").slice(0, 10)
              )
            }
            className="field"
            placeholder="10-digit number"
          />
        </label>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label>
          <span className="mb-1.5 block text-xs font-semibold text-[#bdb2c5]">
            Area in Bhopal
          </span>
          <input
            type="text"
            required
            autoComplete="address-level2"
            value={form.area}
            onChange={(event) => updateField("area", event.target.value)}
            className="field"
            placeholder="Example: Kolar Road"
          />
        </label>
        <label>
          <span className="mb-1.5 block text-xs font-semibold text-[#bdb2c5]">
            Service booked
          </span>
          <select
            required
            value={form.service}
            onChange={(event) => updateField("service", event.target.value)}
            className="field"
          >
            <option value="">Choose service</option>
            {serviceCatalog.map((service) => (
              <option key={service.slug} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset className="mt-5">
        <legend className="text-xs font-semibold text-[#bdb2c5]">
          Your rating
        </legend>
        <div className="mt-2 flex gap-2" aria-label="Choose rating">
          {Array.from({ length: 5 }, (_, index) => {
            const rating = index + 1;
            const selected = rating <= form.rating;

            return (
              <button
                key={rating}
                type="button"
                onClick={() => updateField("rating", rating)}
                className={`grid h-11 w-11 place-items-center rounded-xl border transition ${
                  selected
                    ? "border-amber-300/30 bg-amber-300/10 text-amber-300"
                    : "border-white/10 bg-white/[0.03] text-[#695d73]"
                }`}
                aria-label={`${rating} star${rating > 1 ? "s" : ""}`}
                aria-pressed={form.rating === rating}
              >
                <Star size={19} fill={selected ? "currentColor" : "none"} />
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="mt-5 block">
        <span className="mb-1.5 block text-xs font-semibold text-[#bdb2c5]">
          Your review
        </span>
        <textarea
          required
          rows={5}
          minLength={20}
          maxLength={600}
          value={form.review}
          onChange={(event) => updateField("review", event.target.value)}
          className="field min-h-36 resize-y"
          placeholder="Service, timing, quality aur coordination kaisa raha?"
        />
        <span className="mt-1 block text-right text-[10px] text-[#887c90]">
          {form.review.length}/600
        </span>
      </label>

      {status === "error" && (
        <div
          className="mt-4 rounded-2xl border border-rose-300/15 bg-rose-300/[0.07] p-4"
          role="alert"
        >
          <p className="text-xs leading-5 text-rose-200">{errorMessage}</p>
          {showWhatsAppFallback && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#25d366] px-4 text-xs font-bold text-[#062b15] transition hover:bg-[#39dd76]"
            >
              <MessageCircle size={17} />
              Send review on WhatsApp
            </a>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="button-primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending review..." : "Submit for verification"}
        {status !== "sending" && <ArrowRight size={18} />}
      </button>
    </form>
  );
}
