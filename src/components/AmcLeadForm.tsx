"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, PhoneCall } from "lucide-react";
import { amcPlans } from "../data/amc";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  area: "",
  planCode: "homeCare12",
  message: "",
  website: "",
};

export default function AmcLeadForm() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setError("");

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setError("Valid 10-digit Indian mobile number enter karein.");
      return;
    }

    if (!form.area.toLowerCase().includes("bhopal")) {
      setError("AMC abhi Bhopal ke liye available hai. Area ke saath Bhopal likhein.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/amc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "AMC request submit nahi ho saki.");
      }
      setReference(data.requestId);
      setForm(initialForm);
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
              .replace("FirebaseError: ", "")
              .replace(/^functions\/[a-z-]+:\s*/i, "")
          : "AMC request submit nahi ho saki.";
      setError(`${message} Please dobara try karein ya WhatsApp karein.`);
    } finally {
      setSubmitting(false);
    }
  }

  if (reference) {
    return (
      <div className="rounded-[2rem] border border-emerald-300/20 bg-emerald-300/[0.07] p-7 text-center sm:p-9">
        <CheckCircle2 className="mx-auto text-emerald-300" size={52} />
        <h3 className="mt-5 text-2xl font-bold tracking-[-0.035em]">
          Callback request receive ho gayi
        </h3>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#bdb2c5]">
          BlinkUp team plan aur home eligibility confirm karne ke liye contact
          karegi. Abhi koi payment nahi li gayi hai.
        </p>
        <p className="mt-4 text-[10px] font-semibold text-emerald-300">
          Reference: {reference}
        </p>
        <button
          type="button"
          onClick={() => setReference("")}
          className="button-secondary mt-6 text-xs"
        >
          Dusri enquiry bhejein
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-[2rem] border border-white/[0.09] bg-[#211a2b] p-6 shadow-2xl shadow-black/20 sm:p-8"
    >
      <div className="flex items-start gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-300/10 text-emerald-300">
          <PhoneCall size={23} />
        </span>
        <div>
          <h3 className="text-xl font-bold tracking-[-0.03em]">
            Free AMC consultation
          </h3>
          <p className="mt-1 text-xs leading-6 text-[#9f94a8]">
            Team plan samjhayegi. Form submit karne par payment nahi hoti.
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <Field label="Full name">
          <input
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="field mt-2"
            placeholder="Aapka naam"
          />
        </Field>
        <Field label="Mobile number">
          <input
            required
            inputMode="numeric"
            maxLength={10}
            value={form.phone}
            onChange={(event) =>
              setForm({
                ...form,
                phone: event.target.value.replace(/\D/g, "").slice(0, 10),
              })
            }
            className="field mt-2"
            placeholder="10-digit mobile"
          />
        </Field>
        <Field label="Email (optional)">
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            className="field mt-2"
            placeholder="name@example.com"
          />
        </Field>
        <Field label="Bhopal area">
          <input
            required
            value={form.area}
            onChange={(event) => setForm({ ...form, area: event.target.value })}
            className="field mt-2"
            placeholder="Kolar Road, Bhopal"
          />
        </Field>
      </div>

      <Field label="Interested plan" className="mt-4 block">
        <select
          value={form.planCode}
          onChange={(event) => setForm({ ...form, planCode: event.target.value })}
          className="field mt-2"
        >
          {amcPlans.map((plan) => (
            <option key={plan.code} value={plan.code}>
              {plan.shortName} · {plan.durationLabel}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Ghar ya maintenance details (optional)" className="mt-4 block">
        <textarea
          value={form.message}
          onChange={(event) =>
            setForm({ ...form, message: event.target.value.slice(0, 500) })
          }
          rows={4}
          className="field mt-2 resize-none"
          placeholder="Example: 3 BHK house, plumbing aur electrical support chahiye..."
        />
      </Field>

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={form.website}
        onChange={(event) => setForm({ ...form, website: event.target.value })}
        className="hidden"
      />

      {error && (
        <p className="mt-4 rounded-2xl border border-rose-300/15 bg-rose-300/[0.07] p-4 text-xs leading-6 text-rose-200">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-4 text-sm font-bold text-[#071d17] shadow-lg shadow-emerald-500/15 transition hover:-translate-y-0.5 hover:bg-emerald-400 disabled:cursor-wait disabled:opacity-60"
      >
        {submitting && <Loader2 size={18} className="animate-spin" />}
        {submitting ? "Request bhej rahe hain..." : "Request AMC Call"}
      </button>
      <p className="mt-3 text-center text-[10px] leading-5 text-[#74687d]">
        Submit karke aap BlinkUp ko is AMC enquiry ke liye call/WhatsApp karne
        ki permission dete hain.
      </p>
    </form>
  );
}

function Field({
  label,
  className = "block",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`${className} text-xs font-bold text-[#c9becf]`}>
      {label}
      {children}
    </label>
  );
}
