"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../../lib/firebase';


export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<
    { id: string; name: string; feedback: string; rating: number }[]
  >([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "testimonials"));
        const list: any[] = [];
        querySnapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
        setTestimonials(list);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      {/* Header Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-purple-700 mb-3">What Our Customers Say 💬</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          BlinkUp ke saath apne ghar ke sapne ko pura karne wale customers ke real reviews.
          Professional, trusted aur time-bound services — bas ek tap pe!
        </p>
      </section>

      {/* Testimonials Grid */}
      <div className="max-w-7xl mx-auto grid gap-8 px-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.length > 0 ? (
          testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg p-6 border border-gray-100 transition-all duration-300"
            >
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-lg font-bold text-purple-700">
                  {item.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <div className="flex text-yellow-400 text-sm">
                    {"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-2">
                “{item.feedback}”
              </p>
              <div className="text-xs text-gray-500">
                Verified BlinkUp Customer ✅
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No testimonials found yet. 🙈
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <section className="mt-16 bg-gradient-to-r from-purple-600 to-purple-400 text-white text-center py-12 rounded-lg shadow-md mx-6">
        <h2 className="text-3xl font-semibold mb-2">
          Have You Tried BlinkUp Services?
        </h2>
        <p className="text-lg mb-4">
          Apna feedback share karke dusre logon ko bhi inspire karein!
        </p>
        <a
          href="/contact"
          className="inline-block bg-white text-purple-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition"
        >
          Share Your Experience
        </a>
      </section>
    </main>
  );
}
