"use client";
import Link from "next/link";
import {
  Paintbrush,
  Plug,
  Wrench,
  Hammer,
  Home,
  Building,
  Wallpaper,
  Truck,
  Sparkles,
  Wind,
  Tv,
  Shield,
  UserCog,
  Leaf,
  Ruler,
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    name: "Painting",
    subtitle: "Interior & exterior painting",
    icon: Paintbrush,
    color: "from-purple-500 to-purple-700",
    tags: ["Interior & exterior", "Texture walls", "Putty & primer"],
    desc: "Premium painting with luxury finish & safe eco paints.",
    slug: "painting",
  },
  {
    name: "Plumbing",
    subtitle: "Leakage & blockage repair",
    icon: Wrench,
    color: "from-sky-500 to-blue-600",
    tags: ["Tap & pipe fix", "Drain cleaning", "Bathroom repair"],
    desc: "Quick & clean plumbing fixes for homes & offices.",
    slug: "plumbing",
  },
  {
    name: "Electrical",
    subtitle: "Wiring & installation",
    icon: Plug,
    color: "from-amber-500 to-orange-600",
    tags: ["Switchboard", "Wiring", "Lighting setup"],
    desc: "Safe wiring, repair & new fittings by expert electricians.",
    slug: "electrical",
  },
  {
    name: "Carpentry",
    subtitle: "Furniture & polish work",
    icon: Hammer,
    color: "from-green-500 to-emerald-600",
    tags: ["Furniture", "Wood polish", "Door fitting"],
    desc: "Custom furniture, wood polish & modular carpentry work.",
    slug: "carpentry",
  },
  {
    name: "Interior Design",
    subtitle: "Home & office design",
    icon: Home,
    color: "from-pink-500 to-rose-600",
    tags: ["2D/3D Design", "Furniture layout", "Lighting plan"],
    desc: "Modern interior solutions with 3D design & smart planning.",
    slug: "interior-design",
  },
  {
    name: "Renovation",
    subtitle: "Complete home makeover",
    icon: Building,
    color: "from-slate-600 to-gray-800",
    tags: ["Civil work", "Finishing", "Redesign"],
    desc: "Transform your old space with full renovation service.",
    slug: "renovation",
  },
  {
    name: "Wall Paneling",
    subtitle: "3D decorative wall panels",
    icon: Wallpaper,
    color: "from-cyan-500 to-blue-600",
    tags: ["Wooden panels", "PVC sheets", "Gypsum design"],
    desc: "Stylish wall paneling with soundproof & modern textures.",
    slug: "wall-paneling",
  },
  {
    name: "Packing & Moving",
    subtitle: "Local & city shifting",
    icon: Truck,
    color: "from-orange-400 to-yellow-500",
    tags: ["Local shifting", "Packing", "Intercity relocation"],
    desc: "Quick, safe & insured moving services all over India.",
    slug: "moving",
  },
  {
    name: "Cleaning",
    subtitle: "Deep cleaning & sanitization",
    icon: Sparkles,
    color: "from-lime-400 to-green-500",
    tags: ["Home cleaning", "Sofa cleaning", "Bathroom cleaning"],
    desc: "Professional deep cleaning for homes & workplaces.",
    slug: "cleaning",
  },
  {
    name: "AC Services",
    subtitle: "Cooling & maintenance",
    icon: Wind,
    color: "from-sky-400 to-cyan-500",
    tags: ["Gas refill", "Servicing", "Installation"],
    desc: "AC servicing & repair by trained technicians.",
    slug: "ac-service",
  },
  {
    name: "Appliance Repair",
    subtitle: "Home electronics",
    icon: Tv,
    color: "from-indigo-400 to-blue-500",
    tags: ["TV", "Fridge", "Washing machine"],
    desc: "All brands appliance repair with original parts.",
    slug: "appliance-repair",
  },
  {
    name: "CCTV & Security",
    subtitle: "Smart camera setup",
    icon: Shield,
    color: "from-gray-700 to-black",
    tags: ["Camera install", "Maintenance", "Security setup"],
    desc: "Full surveillance setup with motion detection systems.",
    slug: "cctv",
  },
  {
    name: "Smart Home",
    subtitle: "Voice & app automation",
    icon: UserCog,
    color: "from-purple-400 to-fuchsia-600",
    tags: ["Alexa setup", "Smart switches", "IoT lighting"],
    desc: "Transform your home with smart automation & sensors.",
    slug: "smart-home",
  },
  {
    name: "Decoration",
    subtitle: "Furniture & lighting decor",
    icon: Leaf,
    color: "from-pink-400 to-rose-500",
    tags: ["Curtains", "Decor setup", "Lighting art"],
    desc: "Artistic interiors & designer home decor service.",
    slug: "interior-decoration",
  },
  {
    name: "False Ceiling",
    subtitle: "POP & gypsum design",
    icon: Ruler,
    color: "from-yellow-400 to-amber-500",
    tags: ["POP design", "LED setup", "Gypsum ceiling"],
    desc: "Luxury false ceiling with lighting integration.",
    slug: "false-ceiling",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Light background blur effect */}
      <div className="absolute top-20 left-40 w-72 h-72 bg-purple-300/30 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-10 right-40 w-72 h-72 bg-fuchsia-300/30 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto text-center mb-12 relative z-10">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-900 mb-3">
          Our Services
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-base">
          BlinkUp har ghar ke liye professional home services laata hai — ek app, ek click aur expert at your doorstep!
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto relative z-10">
        {services.map((s, i) => (
          <motion.div
            key={s.name}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="relative group"
          >
            {/* Glow shadow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-fuchsia-500/30 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500 rounded-2xl"></div>

            <Link
              href={`/services/${s.slug}`}
              className="relative bg-white/80 backdrop-blur-lg border border-gray-200 shadow-lg hover:shadow-purple-200 rounded-2xl overflow-hidden transition-all duration-500 block"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${s.color} text-white px-6 py-4 flex items-center`}>
                <s.icon className="w-7 h-7 mr-3 drop-shadow-lg" />
                <div>
                  <h3 className="text-lg font-semibold">{s.name}</h3>
                  <p className="text-sm opacity-90">{s.subtitle}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 text-left">
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">{s.desc}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {s.tags.map((t, i) => (
                    <span
                      key={i}
                      className="bg-purple-50 text-purple-700 border border-purple-100 px-3 py-1 rounded-full text-xs font-medium hover:bg-purple-100 transition-all"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-purple-600 text-sm font-medium hover:underline">
                  Details dekhne ke liye card par click kare →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
