'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { services } from '../../data/services';
import Script from 'next/script';
import LocationAutocomplete from '../../components/LocationAutocomplete';

interface LeadFormState {
  name: string;
  phone: string;
  email: string;
  service: string;
  subService: string;
  location: string;
  address: string;
  date: string;
  time: string;
}

export default function LeadFormPage() {
  const searchParams = useSearchParams();
  const defaultService = searchParams.get('service') || '';
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<LeadFormState>({
    name: '',
    phone: '',
    email: '',
    service: defaultService,
    subService: '',
    location: '',
    address: '',
    date: '',
    time: '',
  });

  const subServiceOptions =
    services.find((s) => s.name === form.service)?.subServices || [];

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handlePlaceSelected(place: google.maps.places.PlaceResult) {
    const lat = place.geometry?.location?.lat();
    const lng = place.geometry?.location?.lng();
    const address = place.formatted_address || '';
    setForm((f) => ({
      ...f,
      location: lat && lng ? `${lat},${lng}` : f.location,
      address: address || f.address,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      ...form,
      source: 'website',
      createdAt: new Date().toISOString(),
    };
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => router.push('/thank-you'), 1500);
      } else {
        console.error('Error submitting lead', await res.text());
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    }
  }

  // Auto geolocation fallback
  useEffect(() => {
    if (!form.location && typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setForm((f) => ({
            ...f,
            location: `${latitude},${longitude}`,
          }));
        },
        () => {}
      );
    }
  }, [form.location]);

  if (submitted) {
    return (
      <div className="p-6 bg-green-50 border border-green-200 rounded max-w-md mx-auto mt-12 text-center">
        <h1 className="text-2xl font-semibold mb-2">Thank you!</h1>
        <p>Your service request has been submitted. We’ll contact you soon.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="lazyOnload"
      />

      <h1 className="text-3xl font-bold mb-6">Book a Service</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name & phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="phone">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Email & Service */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1" htmlFor="email">
              Email (optional)
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="service">
              Service Type
            </label>
            <select
              id="service"
              name="service"
              required
              value={form.service}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="" disabled>
                Select a service
              </option>
              {services.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sub-service */}
        {subServiceOptions.length > 0 && (
          <div>
            <label className="block font-medium mb-1" htmlFor="subService">
              Sub-service
            </label>
            <select
              id="subService"
              name="subService"
              required
              value={form.subService}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="" disabled>
                Select a sub-service
              </option>
              {subServiceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Location & Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1" htmlFor="location">
              Location (auto-complete)
            </label>
            <LocationAutocomplete onPlaceSelected={handlePlaceSelected} />
            <p className="text-xs text-gray-500">
              Start typing your address and select from suggestions.
            </p>
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="address">
              Address Details
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required
              value={form.address}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1" htmlFor="date">
              Preferred Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              value={form.date}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="time">
              Preferred Time
            </label>
            <input
              id="time"
              name="time"
              type="time"
              required
              value={form.time}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary text-white px-6 py-3 rounded hover:bg-primary-dark"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}

