"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, BadgeCheck, MessageCircle } from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const whatsappUrl = `https://wa.me/917489673372?text=${encodeURIComponent(
    [
      "Hi BlinkUp, I need help with a home service.",
      `Name: ${form.name || "Not added"}`,
      `Mobile: ${form.phone || "Not added"}`,
      `Email: ${form.email || "Not added"}`,
      `Message: ${form.message || "Not added"}`,
    ].join("\n")
  )}`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Message could not be sent");

      setStatus("sent");
      setForm(initialForm);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex min-h-[28rem] flex-col items-center justify-center rounded-[1.75rem] border border-emerald-400/20 bg-emerald-400/10 p-8 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
          <BadgeCheck size={32} />
        </span>
        <h2 className="mt-5 text-2xl font-bold">Message received</h2>
        <p className="mt-3 max-w-sm text-sm leading-7 text-[#c9becf]">
          BlinkUp will respond by call, WhatsApp or email using the details you
          shared.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="button-secondary mt-6"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="app-card-raised p-6 sm:p-8">
      <p className="eyebrow text-[#a98aff]">Write to BlinkUp</p>
      <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em]">
        How can we help?
      </h2>
      <p className="mt-2 text-xs leading-6 text-[#a99eaf]">
        For a service booking, use the quick booking page. Use this form for
        questions, feedback or support.
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
            onChange={(event) =>
              setForm((current) => ({ ...current, name: event.target.value }))
            }
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
              setForm((current) => ({
                ...current,
                phone: event.target.value.replace(/\D/g, "").slice(0, 10),
              }))
            }
            className="field"
            placeholder="10-digit number"
          />
        </label>
      </div>

      <label className="mt-3 block">
        <span className="mb-1.5 block text-xs font-semibold text-[#bdb2c5]">
          Email <span className="font-normal text-[#887c90]">(optional)</span>
        </span>
        <input
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(event) =>
            setForm((current) => ({ ...current, email: event.target.value }))
          }
          className="field"
          placeholder="you@example.com"
        />
      </label>

      <label className="mt-3 block">
        <span className="mb-1.5 block text-xs font-semibold text-[#bdb2c5]">
          Message
        </span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(event) =>
            setForm((current) => ({ ...current, message: event.target.value }))
          }
          className="field min-h-36 resize-y"
          placeholder="Tell us your question or concern..."
        />
      </label>

      {status === "error" && (
        <div
          className="mt-4 rounded-2xl border border-rose-300/15 bg-rose-300/[0.07] p-4"
          role="alert"
        >
          <p className="text-xs leading-5 text-rose-200">
            Please check the mobile number and try again, or continue on
            WhatsApp.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#25d366] px-4 text-xs font-bold text-[#062b15] transition hover:bg-[#39dd76]"
          >
            <MessageCircle size={17} />
            Continue on WhatsApp
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="button-primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending message..." : "Send message"}
        {status !== "sending" && <ArrowRight size={18} />}
      </button>
    </form>
  );
}
