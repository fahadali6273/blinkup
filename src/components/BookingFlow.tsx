"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  LocateFixed,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { getServiceBySlug, serviceCatalog } from "../data/serviceCatalog";

interface BookingFlowProps {
  initialService?: string;
}

interface BookingFormState {
  service: string;
  phone: string;
  area: string;
  name: string;
  address: string;
  date: string;
  time: string;
  notes: string;
}

function normalizeInitialService(value?: string) {
  if (!value) return "";
  const decoded = decodeURIComponent(value);
  const bySlug = getServiceBySlug(decoded);
  const byName = serviceCatalog.find(
    (service) => service.name.toLowerCase() === decoded.toLowerCase()
  );
  return bySlug?.name ?? byName?.name ?? "";
}

export default function BookingFlow({ initialService }: BookingFlowProps) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showWhatsAppFallback, setShowWhatsAppFallback] = useState(false);
  const [mapLink, setMapLink] = useState("");
  const [locating, setLocating] = useState(false);
  const [minimumDate, setMinimumDate] = useState("");
  const [form, setForm] = useState<BookingFormState>({
    service: normalizeInitialService(initialService),
    phone: "",
    area: "",
    name: "",
    address: "",
    date: "",
    time: "Flexible",
    notes: "",
  });

  useEffect(() => {
    const now = new Date();
    const localDate = new Date(
      now.getTime() - now.getTimezoneOffset() * 60 * 1000
    )
      .toISOString()
      .slice(0, 10);
    setMinimumDate(localDate);
  }, []);

  function updateField(
    field: keyof BookingFormState,
    value: string
  ) {
    setError("");
    setShowWhatsAppFallback(false);
    setForm((current) => ({ ...current, [field]: value }));
  }

  function continueToDetails() {
    if (!form.service) {
      setError("Please choose a service.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    if (!form.area.trim()) {
      setError("Enter your area in Bhopal.");
      return;
    }

    setStep(2);
    setError("");
  }

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      setError("Location is unavailable. Please type your Bhopal area.");
      return;
    }

    setLocating(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setMapLink(
          `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`
        );
        updateField("area", "Current location, Bhopal");
        setLocating(false);
      },
      () => {
        setError("Location permission was not available. Please type your area.");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    setSubmitting(true);
    setError("");
    setShowWhatsAppFallback(false);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone,
          service: form.service,
          location: form.area.trim(),
          address: form.address.trim() || form.area.trim(),
          mapLink,
          date: form.date,
          time: form.time,
          message: form.notes.trim(),
          source: "website-booking-flow",
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to submit booking");
      }

      setSubmitted(true);
    } catch (submitError) {
      console.error(submitError);
      setError("Booking send nahi hui. Please try again or use WhatsApp.");
      setShowWhatsAppFallback(true);
    } finally {
      setSubmitting(false);
    }
  }

  const bookingWhatsAppUrl = `https://wa.me/917489673372?text=${encodeURIComponent(
    [
      "Hi BlinkUp, I want to book a free inspection.",
      `Name: ${form.name || "Not added"}`,
      `Mobile: ${form.phone || "Not added"}`,
      `Service: ${form.service || "Not added"}`,
      `Area: ${form.area || "Not added"}`,
      `Address: ${form.address || "Not added"}`,
      `Preferred date: ${form.date || "Flexible"}`,
      `Preferred time: ${form.time || "Flexible"}`,
      `Details: ${form.notes || "Not added"}`,
    ].join("\n")
  )}`;

  if (submitted) {
    return (
      <div className="app-card-raised flex min-h-[34rem] flex-col items-center justify-center p-7 text-center sm:p-10">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
          <BadgeCheck size={40} />
        </span>
        <p className="eyebrow mt-7 text-emerald-300">Request submitted</p>
        <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">
          We&apos;ll take it from here.
        </h2>
        <p className="mt-4 max-w-md text-sm leading-7 text-[#bdb2c5]">
          The BlinkUp team will call or WhatsApp you to confirm the requirement,
          address and inspection time.
        </p>
        <div className="mt-7 grid w-full max-w-sm gap-2 sm:grid-cols-2">
          <Link href="/" className="button-secondary">
            Back home
          </Link>
          <a
            href={`https://wa.me/917489673372?text=${encodeURIComponent(
              `Hi BlinkUp, I just submitted a ${form.service} request for ${form.area}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary"
          >
            <MessageCircle size={17} />
            WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="app-card-raised p-5 sm:p-8">
      <div className="flex items-center justify-between gap-5">
        <div>
          <p className="eyebrow text-[#a98aff]">Step {step} of 2</p>
          <h2 className="mt-1 text-2xl font-bold">
            {step === 1 ? "What do you need?" : "Confirm the visit details"}
          </h2>
        </div>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#55427a] text-[#eadfff]">
          {step === 1 ? <ShieldCheck size={23} /> : <CalendarDays size={23} />}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2" aria-hidden="true">
        <span className="h-1.5 rounded-full bg-[#8f65f5]" />
        <span
          className={`h-1.5 rounded-full ${
            step === 2 ? "bg-[#8f65f5]" : "bg-[#3c3147]"
          }`}
        />
      </div>

      {step === 1 ? (
        <div className="mt-7 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-[#bdb2c5]">
              Service
            </span>
            <select
              value={form.service}
              onChange={(event) => updateField("service", event.target.value)}
              className="field"
            >
              <option value="">Select a service</option>
              {serviceCatalog.map((service) => (
                <option key={service.slug} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-[#bdb2c5]">
              Mobile number
            </span>
            <input
              type="tel"
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
              placeholder="10-digit mobile number"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-[#bdb2c5]">
              Area in Bhopal
            </span>
            <input
              type="text"
              autoComplete="address-level2"
              value={form.area}
              onChange={(event) => updateField("area", event.target.value)}
              className="field"
              placeholder="Example: Kolar Road, Arera Colony"
            />
          </label>

          <button
            type="button"
            onClick={useCurrentLocation}
            disabled={locating}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#b99cff] disabled:opacity-60"
          >
            <LocateFixed size={16} className={locating ? "animate-pulse" : ""} />
            {locating ? "Finding location..." : "Use my current location"}
          </button>

          {error && (
            <p className="text-xs text-rose-300" role="alert">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={continueToDetails}
            className="button-primary w-full"
          >
            Continue
            <ArrowRight size={18} />
          </button>
          <p className="text-center text-[10px] leading-5 text-[#8f8498]">
            No payment is required to submit a service request.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-[#bdb2c5]">
              Your name
            </span>
            <input
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="field"
              placeholder="Name for the booking"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-[#bdb2c5]">
              Full address <span className="font-normal text-[#887c90]">(optional)</span>
            </span>
            <input
              type="text"
              autoComplete="street-address"
              value={form.address}
              onChange={(event) => updateField("address", event.target.value)}
              className="field"
              placeholder="House / flat and landmark"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label>
              <span className="mb-1.5 block text-xs font-semibold text-[#bdb2c5]">
                Preferred date <span className="font-normal text-[#887c90]">(optional)</span>
              </span>
              <input
                type="date"
                min={minimumDate}
                value={form.date}
                onChange={(event) => updateField("date", event.target.value)}
                className="field"
              />
            </label>
            <label>
              <span className="mb-1.5 block text-xs font-semibold text-[#bdb2c5]">
                Preferred time
              </span>
              <select
                value={form.time}
                onChange={(event) => updateField("time", event.target.value)}
                className="field"
              >
                <option value="Flexible">Flexible</option>
                <option value="Morning">Morning · 9 AM–12 PM</option>
                <option value="Afternoon">Afternoon · 12–4 PM</option>
                <option value="Evening">Evening · 4–8 PM</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-[#bdb2c5]">
              Problem details <span className="font-normal text-[#887c90]">(optional)</span>
            </span>
            <textarea
              rows={4}
              value={form.notes}
              onChange={(event) => updateField("notes", event.target.value)}
              className="field min-h-28 resize-y"
              placeholder="Briefly explain what needs attention..."
            />
          </label>

          {error && (
            <div role="alert">
              <p className="text-xs text-rose-300">{error}</p>
              {showWhatsAppFallback && (
                <a
                  href={bookingWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#25d366] px-4 text-xs font-bold text-[#062b15] transition hover:bg-[#39dd76]"
                >
                  <MessageCircle size={17} />
                  Continue booking on WhatsApp
                </a>
              )}
            </div>
          )}

          <div className="grid gap-2 sm:grid-cols-[auto_1fr]">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="button-secondary px-5"
            >
              <ArrowLeft size={17} />
              Back
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="button-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit service request"}
              {!submitting && <ArrowRight size={18} />}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
