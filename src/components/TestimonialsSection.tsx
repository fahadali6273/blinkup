"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image"; // ✅ added import

const testimonials = [
  {
    name: "Amit Sharma",
    role: "Home Painting - Bhopal",
    review:
      "BlinkUp ne mere ghar ko ekdum naya look de diya! Painters time par aaye aur finishing top class thi.",
    rating: 5,
    image: "/avatars/user1.jpg",
  },
  {
    name: "Sneha Verma",
    role: "Interior Design - Indore",
    review:
      "Unka interior design service kaafi professional hai. 3D designs ke saath perfect execution mila.",
    rating: 5,
    image: "/avatars/user2.jpg",
  },
  {
    name: "Rahul Mehta",
    role: "AC Repair - Bhopal",
    review:
      "AC service quick aur affordable thi. Technician polite aur knowledgeable the.",
    rating: 4,
    image: "/avatars/user3.jpg",
  },
  {
    name: "Priya Singh",
    role: "Wall Paneling - Gwalior",
    review:
      "Beautiful wall panels lagaye BlinkUp team ne. Har visitor poochta hai kahan se karaya!",
    rating: 5,
    image: "/avatars/user4.jpg",
  },
  {
    name: "Vikas Patel",
    role: "Home Renovation - Ujjain",
    review:
      "Pure ghar ka renovation BlinkUp ne perfectly handle kiya. High quality work with smart suggestions.",
    rating: 5,
    image: "/avatars/user5.jpg",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-purple-50 via-white to-indigo-50 overflow-hidden">
      {/* floating gradient balls */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300/20 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto text-center relative z-10 px-6">
        <h2 className="text-4xl font-bold text-purple-700 mb-3">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 mb-12">
          Real experiences from happy BlinkUp users across India.
        </p>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ scale: 1.03 }}
              className="relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-purple-100 p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-purple-200">
                {/* ✅ Replaced <img> with Next.js <Image /> */}
                <Image
                  src={t.image}
                  alt={t.name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>

              <h3 className="font-semibold text-lg text-gray-800">{t.name}</h3>
              <p className="text-sm text-purple-600 mb-3">{t.role}</p>

              <div className="flex justify-center mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              <p className="text-gray-600 text-sm italic leading-relaxed">
                “{t.review}”
              </p>

              <div className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 rounded-full"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
