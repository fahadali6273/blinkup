"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

interface FormData {
  name: string;
  service: string;
  phone: string;
  location: string;
  date: string;
  time: string;
}

interface TimeSlot {
  value: string;
  label: string;
  startHour: number;
}

const INITIAL_FORM: FormData = {
  name: "",
  service: "",
  phone: "",
  location: "",
  date: "",
  time: "",
};

const BHOPAL_LATITUDE = 23.2599;
const BHOPAL_LONGITUDE = 77.4126;
const SERVICE_RADIUS_KM = 35;

const GRADIENTS = [
  "from-purple-700 via-pink-600 to-orange-500",
  "from-blue-700 via-cyan-500 to-teal-400",
  "from-orange-600 via-yellow-500 to-red-500",
  "from-green-600 via-lime-500 to-emerald-400",
  "from-indigo-600 via-purple-500 to-fuchsia-500",
];

const HEADINGS = [
  "Hello Bhopal Get Professional Home Services at Your Doorstep",
  "Fast, Reliable & Trusted Experts in Bhopal",
  "Interior, Painting, Renovation & More in Bhopal",
  "All Home Needs in One App in Bhopal — BlinkUp",
];

const SERVICES = [
  "Painting",
  "Electrician",
  "Plumbing",
  "Carpenter",
  "Renovation",
  "Interior Design",
  "Packing & Moving",
  "Cleaning",
  "AC Service",
  "Appliance Repair",
  "Wall Paneling",
  "CCTV",
  "Smart Home",
  "Decoration",
  "False Ceiling",
];

const TIME_SLOTS: TimeSlot[] = [
  {
    value: "09:00 AM - 11:00 AM",
    label: "9 AM – 11 AM",
    startHour: 9,
  },
  {
    value: "11:00 AM - 01:00 PM",
    label: "11 AM – 1 PM",
    startHour: 11,
  },
  {
    value: "01:00 PM - 03:00 PM",
    label: "1 PM – 3 PM",
    startHour: 13,
  },
  {
    value: "03:00 PM - 05:00 PM",
    label: "3 PM – 5 PM",
    startHour: 15,
  },
  {
    value: "05:00 PM - 07:00 PM",
    label: "5 PM – 7 PM",
    startHour: 17,
  },
  {
    value: "07:00 PM - 09:00 PM",
    label: "7 PM – 9 PM",
    startHour: 19,
  },
];

function getLocalDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const earthRadius = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return (
    earthRadius *
    2 *
    Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  );
}

function isPastTimeSlot(selectedDate: string, startHour: number) {
  if (!selectedDate) return false;

  const now = new Date();
  const today = getLocalDateString(now);

  if (selectedDate !== today) return false;

  return now.getHours() >= startHour;
}

export default function HeroSection() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);

  const [mapLink, setMapLink] = useState("");
  const [gpsVerified, setGpsVerified] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [minimumDate, setMinimumDate] = useState("");

  const [currentGradientIndex, setCurrentGradientIndex] =
    useState(0);

  const [currentHeadingIndex, setCurrentHeadingIndex] =
    useState(0);

  useEffect(() => {
    setMinimumDate(getLocalDateString(new Date()));
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentGradientIndex(
        (previous) => (previous + 1) % GRADIENTS.length
      );
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentHeadingIndex(
        (previous) => (previous + 1) % HEADINGS.length
      );
    }, 4000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const distance = getDistanceKm(
          latitude,
          longitude,
          BHOPAL_LATITUDE,
          BHOPAL_LONGITUDE
        );

        if (distance <= SERVICE_RADIUS_KM) {
          setGpsVerified(true);

          setMapLink(
            `https://www.google.com/maps?q=${latitude},${longitude}`
          );

          setForm((previous) => ({
            ...previous,
            location:
              previous.location || "Bhopal - Current Location",
          }));
        }
      },
      () => {
        console.warn("Location permission denied");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }, []);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setError("");

    setForm((previous) => ({
      ...previous,
      [name]:
        name === "phone"
          ? value.replace(/\D/g, "").slice(0, 10)
          : value,
      ...(name === "date" ? { time: "" } : {}),
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    const locationText = form.location.toLowerCase();

    if (!gpsVerified && !locationText.includes("bhopal")) {
      setError(
        "BlinkUp service is currently available only in Bhopal."
      );
      return;
    }

    const today = getLocalDateString(new Date());

    if (!form.date || form.date < today) {
      setError("Please select a valid service date.");
      return;
    }

    if (!form.time) {
      setError("Please select your preferred time slot.");
      return;
    }

    const selectedSlot = TIME_SLOTS.find(
      (slot) => slot.value === form.time
    );

    if (
      selectedSlot &&
      isPastTimeSlot(form.date, selectedSlot.startHour)
    ) {
      setError(
        "This time slot has already passed. Please select another slot."
      );
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          service: form.service,
          phone: form.phone,
          location: form.location.trim(),
          address: form.location.trim(),
          mapLink,
          date: form.date,
          time: form.time,
          message: "Homepage quick service request.",
          source: "homepage",
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || result.message || "Lead submission failed"
        );
      }

      setSubmitted(true);
      setForm(INITIAL_FORM);
      setMapLink("");
      setGpsVerified(false);
    } catch (submitError) {
      console.error("Homepage lead error:", submitError);

      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="bg-gradient-to-r from-purple-700 to-indigo-700 py-16 text-center text-white">
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">
          Thank You!
        </h1>

        <p className="text-lg">
          We’ve received your request. Our team will contact you
          shortly.
        </p>
      </section>
    );
  }

  return (
    <section
      className={`relative bg-gradient-to-r ${GRADIENTS[currentGradientIndex]} py-16 text-white transition-all duration-1000`}
    >
      <div className="container mx-auto flex flex-col items-center justify-between gap-12 px-4 md:flex-row">
        <div className="max-w-lg">
          <h1 className="mb-6 text-4xl font-bold leading-snug transition-all duration-700 md:text-5xl">
            {HEADINGS[currentHeadingIndex]}
          </h1>

          <p className="mb-6 text-lg opacity-90">
            From painters to electricians — all home services in one
            place, fast and reliable.
          </p>

          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 700,
                behavior: "smooth",
              })
            }
            className="rounded-lg bg-white px-6 py-3 font-semibold text-purple-700 transition hover:bg-purple-100"
          >
            Explore Services
          </button>
        </div>

        <div className="w-full rounded-2xl bg-white p-6 text-gray-800 shadow-lg md:w-[360px]">
          <h2 className="mb-4 text-center text-xl font-semibold text-purple-700">
            Book a Quick Service
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              required
            />

            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              required
            >
              <option value="">Select Service</option>

              {SERVICES.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>

            <input
              name="phone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="Mobile Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              required
            />

            <input
              name="location"
              type="text"
              placeholder="Bhopal Area / Full Address"
              value={form.location}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              required
            />

            <div className="grid grid-cols-2 gap-2">
              <input
                name="date"
                type="date"
                min={minimumDate}
                value={form.date}
                onChange={handleChange}
                className="w-full min-w-0 rounded border px-2 py-2 text-sm"
                aria-label="Preferred service date"
                required
              />

              <select
                name="time"
                value={form.time}
                onChange={handleChange}
                className="w-full min-w-0 rounded border px-2 py-2 text-sm"
                aria-label="Preferred time slot"
                required
              >
                <option value="">Time Slot</option>

                {TIME_SLOTS.map((slot) => (
                  <option
                    key={slot.value}
                    value={slot.value}
                    disabled={isPastTimeSlot(
                      form.date,
                      slot.startHour
                    )}
                  >
                    {slot.label}
                  </option>
                ))}
              </select>
            </div>

            {gpsVerified && (
              <p className="text-xs text-green-600">
                ✓ Current GPS location captured
              </p>
            )}

            {error && (
              <p className="text-xs text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-purple-700 py-2 text-white transition hover:bg-purple-800 disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
