"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LeadPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 🎯 Auto-fill from URL query
  const prefilledService = searchParams.get("service") || "";
  const prefilledSubService = searchParams.get("subService") || "";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    service: prefilledService,
    subService: prefilledSubService,
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const onlyNumbers = value.replace(/\D/g, "").slice(0, 10);
      setForm({ ...form, phone: onlyNumbers });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const isValidPhone = (phone: string) => {
    return /^[6-9]\d{9}$/.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.phone.trim()) {
      alert("Please enter mobile number.");
      return;
    }

    if (!isValidPhone(form.phone)) {
      alert("Please enter a valid 10 digit Indian mobile number.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          phone: form.phone.trim(),
        }),
      });

      if (res.ok) {
        setSuccess(true);
        router.push("/thank-you");
      } else {
        alert("Something went wrong, please try again!");
      }
    } catch (err) {
      console.error(err);
      alert("Network error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-purple-100">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Request a Service
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Fill your details below — our BlinkUp team will contact you shortly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Mobile Number *"
              value={form.phone}
              onChange={handleChange}
              required
              inputMode="numeric"
              pattern="[6-9][0-9]{9}"
              maxLength={10}
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="text"
            name="location"
            placeholder="Your Location / Area"
            value={form.location}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Service Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="service"
              placeholder="Select Service"
              value={form.service}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
              type="text"
              name="subService"
              placeholder="Sub Service (optional)"
              value={form.subService}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <textarea
            name="message"
            placeholder="Describe your requirement"
            value={form.message}
            onChange={handleChange}
            rows={4}
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>

        {success && (
          <p className="text-green-600 mt-4 text-center font-medium">
            ✅ Thank you! We’ll contact you shortly.
          </p>
        )}
      </div>
    </div>
  );
}