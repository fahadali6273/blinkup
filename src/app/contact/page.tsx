"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      });

      if (res.ok) {
        setStatus("✅ Message sent successfully! We’ll contact you soon.");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("❌ Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Something went wrong!");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-purple-700 to-purple-400 text-white text-center py-12 shadow-md">
        <h1 className="text-4xl font-bold mb-2">Contact BlinkUp</h1>
        <p className="text-lg opacity-90">We’re here to help you — get in touch anytime!</p>
      </section>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 mt-10 px-6">
        {/* Contact Form */}
        <div className="bg-white shadow-md rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">Send us a Message 💌</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Write your query here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold py-2 rounded-lg shadow hover:opacity-90 transition"
            >
              Send Message
            </button>

            {status && <p className="text-sm text-center mt-2">{status}</p>}
          </form>
        </div>

        {/* Info Cards */}
        <div className="flex flex-col justify-center space-y-6">
          {/* Email Info */}
          <div className="flex items-start p-5 bg-white rounded-xl shadow border hover:shadow-md transition">
            <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-full text-purple-600 text-xl">
              📧
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-gray-800">Email Us</h3>
              <p className="text-gray-600">info@blinkuphome.com</p>
              <p className="text-gray-600">support@blinkuphome.com</p>
              <p className="text-gray-600">admin_fahad@blinkuphome.com</p>
            </div>
          </div>

          {/* WhatsApp Info */}
          <div className="flex items-start p-5 bg-white rounded-xl shadow border hover:shadow-md transition">
            <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full text-green-600 text-xl">
              💬
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-gray-800">WhatsApp Support</h3>
              <p className="text-gray-600">+91 74896 73372</p>
            </div>
          </div>

          {/* Address Info */}
          <div className="flex items-start p-5 bg-white rounded-xl shadow border hover:shadow-md transition">
            <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full text-blue-600 text-xl">
              📍
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-gray-800">Our Location</h3>
              <p className="text-gray-600">Bhopal, Madhya Pradesh, India</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Embed */}
      <section className="mt-16 max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-lg border border-gray-200 px-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.142868658941!2d77.389095!3d23.259933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c43c6f9d0b4b1%3A0x92a41402dfbb2f79!2sBhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1699000000000"
          width="100%"
          height="400"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </section>
    </main>
  );
}
