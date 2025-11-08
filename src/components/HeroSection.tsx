"use client";
import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { sendAdminAlert } from "../lib/notifications";

export default function HeroSection() {
  const [form, setForm] = useState({
    name: "",
    service: "",
    phone: "",
    location: "",
  });
  const [autoLocation, setAutoLocation] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // 🎨 Dynamic gradient colors
  const gradients = [
    "from-purple-700 via-pink-600 to-orange-500",
    "from-blue-700 via-cyan-500 to-teal-400",
    "from-orange-600 via-yellow-500 to-red-500",
    "from-green-600 via-lime-500 to-emerald-400",
    "from-indigo-600 via-purple-500 to-fuchsia-500",
  ];
  const [currentGradient, setCurrentGradient] = useState(gradients[0]);

  // 🧠 Dynamic heading text
  const headings = [
    "Hello Bhopal Get Professional Home Services at Your Doorstep",
    "Fast, Reliable & Trusted Experts in bhopal",
    "Interior, Painting, Renovation & More in bhopal ",
    "All Home Needs in One App in bhopal — BlinkUp",
  ];
  const [currentHeading, setCurrentHeading] = useState(headings[0]);

  // ⏱ Auto change background gradient
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGradient((prev) => {
        const i = gradients.indexOf(prev);
        return gradients[(i + 1) % gradients.length];
      });
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ⏱ Auto change heading
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeading((prev) => {
        const i = headings.indexOf(prev);
        return headings[(i + 1) % headings.length];
      });
    }, 4000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 📍 Auto-detect location
  useEffect(() => {
    if (!autoLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setForm((f) => ({
            ...f,
            location: `${latitude}, ${longitude}`,
          }));
          setAutoLocation(true);
        },
        () => console.warn("Location denied")
      );
    }
  }, [autoLocation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "leads"), {
        ...form,
        source: "website",
        createdAt: new Date().toISOString(),
        status: "New",
      });
      await sendAdminAlert(form);
      setSubmitted(true);
      setForm({ name: "", service: "", phone: "", location: "" });
    } catch (error) {
      console.error("Error submitting lead:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <section className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Thank You!</h1>
        <p className="text-lg">We’ve received your request. Our team will contact you shortly.</p>
      </section>
    );
  }

  return (
    <section
      className={`relative bg-gradient-to-r ${currentGradient} text-white py-16 transition-all duration-1000`}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* 🔹 Left Section */}
        <div className="max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-snug transition-all duration-700">
            {currentHeading}
          </h1>
          <p className="mb-6 text-lg opacity-90">
            From painters to electricians — all home services in one place, fast and reliable.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 700, behavior: "smooth" })}
            className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-purple-100 transition"
          >
            Explore Services
          </button>
        </div>

        {/* 🔸 Right Section (Form) */}
        <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-lg w-full md:w-[360px]">
          <h2 className="text-xl font-semibold mb-4 text-center text-purple-700">
            Book a Quick Service
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select Service</option>
              <option>Painting</option>
              <option>Electrician</option>
              <option>Plumbing</option>
              <option>Carpenter</option>
              <option>Renovation</option>
              <option>Interior Design</option>
              <option>Packing & Moving</option>
              <option>Cleaning</option>
              <option>AC Service</option>
              <option>Appliance Repair</option>
              <option>Wall Paneling</option>
              <option>CCTV</option>
              <option>Smart Home</option>
              <option>Decoration</option>
              <option>False Ceiling</option>
            </select>
            <input
              name="phone"
              placeholder="Mobile Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
            <input
              name="location"
              placeholder="Enter Location"
              value={form.location}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            <button
              type="submit"
              className="bg-purple-700 text-white w-full py-2 rounded-lg hover:bg-purple-800 transition"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}


