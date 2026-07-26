"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bolt,
  LocateFixed,
  MessageCircle,
  Minus,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import { popularServices, serviceCatalog } from "../data/serviceCatalog";
import ServiceIcon from "./ServiceIcon";

type Screen = "choose" | "details" | "success";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [screen, setScreen] = useState<Screen>("choose");
  const [service, setService] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [note, setNote] = useState("");
  const [mapLink, setMapLink] = useState("");
  const [locating, setLocating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function reset() {
    setScreen("choose");
    setService("");
    setPhone("");
    setArea("");
    setNote("");
    setMapLink("");
    setError("");
  }

  function chooseService(value: string) {
    setService(value);
    setScreen("details");
    setError("");
  }

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      setError("Please type your Bhopal area.");
      return;
    }

    setLocating(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setArea("Current location, Bhopal");
        setMapLink(
          `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`
        );
        setLocating(false);
      },
      () => {
        setError("Location unavailable—please type your area.");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!service) {
      setScreen("choose");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    if (!area.trim()) {
      setError("Enter your Bhopal area.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          service,
          location: area.trim(),
          address: area.trim(),
          mapLink,
          message: note.trim(),
          source: "blinku-assistant",
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to send request");
      }

      setScreen("success");
    } catch (submitError) {
      console.error(submitError);
      setError("Could not send. Please try WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!isOpen) {
    return (
      <button
        data-blinku-launcher
        type="button"
        onClick={() => setIsOpen(true)}
        className="app-gradient relative flex items-center gap-3 rounded-2xl px-4 py-3 text-left shadow-2xl shadow-black/35 transition hover:-translate-y-1"
        aria-label="Open Blinku booking assistant"
      >
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[#6d3ae6]">
          <Bolt size={21} fill="currentColor" />
        </span>
        <span className="hidden sm:block">
          <span className="block text-xs font-bold">Need help choosing?</span>
          <span className="mt-0.5 block text-[10px] text-[#e8def8]">
            Ask Blinku
          </span>
        </span>
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#15101d] bg-emerald-400" />
      </button>
    );
  }

  return (
    <div className="flex h-[min(38rem,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-[24rem] flex-col overflow-hidden rounded-[1.6rem] border border-[#4d4059] bg-[#17121f] shadow-2xl shadow-black/50">
      <div className="app-gradient flex items-center gap-3 p-4">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-[#6d3ae6]">
          <Bolt size={22} fill="currentColor" />
        </span>
        <div>
          <h2 className="text-sm font-bold">Blinku Assistant</h2>
          <p className="mt-0.5 text-[10px] text-[#e8def8]">
            Quick booking help · Bhopal
          </p>
        </div>
        <div className="ml-auto flex gap-1">
          <button
            type="button"
            onClick={reset}
            className="grid h-9 w-9 place-items-center rounded-xl bg-white/10"
            aria-label="Reset assistant"
          >
            <RotateCcw size={16} />
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="grid h-9 w-9 place-items-center rounded-xl bg-white/10"
            aria-label="Minimize assistant"
          >
            <Minus size={17} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {screen === "choose" && (
          <>
            <div className="max-w-[88%] rounded-2xl rounded-tl-md bg-[#2a2136] p-3 text-xs leading-6 text-[#e1d7e6]">
              <span className="mb-1 flex items-center gap-1.5 font-bold text-white">
                <Sparkles size={14} className="text-[#b99cff]" />
                Hi, I&apos;m Blinku.
              </span>
              What needs attention at home? Choose a service to continue.
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {popularServices.map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => chooseService(item.name)}
                  className="flex items-center gap-2 rounded-2xl border border-[#43384f] bg-[#211a2b] p-3 text-left text-[11px] font-semibold transition hover:border-[#796290]"
                >
                  <span
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-xl text-white"
                    style={{ backgroundColor: item.accent }}
                  >
                    <ServiceIcon name={item.icon} size={16} />
                  </span>
                  {item.name}
                </button>
              ))}
            </div>
            <label className="mt-3 block">
              <span className="sr-only">All services</span>
              <select
                value=""
                onChange={(event) => chooseService(event.target.value)}
                className="field min-h-11 text-xs"
              >
                <option value="">See all services...</option>
                {serviceCatalog.map((item) => (
                  <option key={item.slug} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
          </>
        )}

        {screen === "details" && (
          <>
            <button
              type="button"
              onClick={() => setScreen("choose")}
              className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#b99cff]"
            >
              <ArrowLeft size={14} />
              Change service
            </button>
            <div className="rounded-2xl rounded-tl-md bg-[#2a2136] p-3 text-xs leading-6 text-[#e1d7e6]">
              Great—<strong className="text-white">{service}</strong>. Share your
              number and area; the team will call to confirm the inspection.
            </div>
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <label className="block">
                <span className="mb-1 block text-[10px] font-semibold text-[#9f94a8]">
                  Mobile number
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={phone}
                  onChange={(event) =>
                    setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  className="field min-h-11 text-xs"
                  placeholder="10-digit number"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-[10px] font-semibold text-[#9f94a8]">
                  Bhopal area
                </span>
                <input
                  type="text"
                  value={area}
                  onChange={(event) => setArea(event.target.value)}
                  className="field min-h-11 text-xs"
                  placeholder="Example: Kolar Road"
                />
              </label>
              <button
                type="button"
                onClick={useCurrentLocation}
                disabled={locating}
                className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#b99cff] disabled:opacity-60"
              >
                <LocateFixed
                  size={15}
                  className={locating ? "animate-pulse" : ""}
                />
                {locating ? "Finding location..." : "Use current location"}
              </button>
              <label className="block">
                <span className="mb-1 block text-[10px] font-semibold text-[#9f94a8]">
                  Short note <span className="font-normal">(optional)</span>
                </span>
                <textarea
                  rows={3}
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  className="field min-h-20 resize-none text-xs"
                  placeholder="What is the problem?"
                />
              </label>
              {error && (
                <p className="flex items-start gap-1.5 text-[11px] text-rose-300">
                  <X size={13} className="mt-0.5 shrink-0" />
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="button-primary min-h-11 w-full text-xs disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Request callback"}
                {!submitting && <ArrowRight size={15} />}
              </button>
            </form>
          </>
        )}

        {screen === "success" && (
          <div className="flex min-h-full flex-col items-center justify-center text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
              <BadgeCheck size={31} />
            </span>
            <h2 className="mt-5 text-xl font-bold">Request received</h2>
            <p className="mt-2 text-xs leading-6 text-[#bdb2c5]">
              BlinkUp will call or WhatsApp you to confirm the service details.
            </p>
            <a
              href={`https://wa.me/917489673372?text=${encodeURIComponent(
                `Hi BlinkUp, I submitted a ${service} request from Blinku.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary mt-5 min-h-11 w-full text-xs"
            >
              <MessageCircle size={16} />
              Continue on WhatsApp
            </a>
          </div>
        )}
      </div>

      <div className="border-t border-white/8 bg-[#130f19] px-4 py-2.5 text-center text-[9px] text-[#766b7f]">
        Your details are used only to coordinate the requested service.
      </div>
    </div>
  );
}

