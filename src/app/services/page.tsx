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

const services = [
  { slug: "painting", name: "Painting", icon: Paintbrush, color: "from-purple-500 to-purple-700" },
  { slug: "plumbing", name: "Plumbing", icon: Wrench, color: "from-sky-500 to-sky-700" },
  { slug: "electrical", name: "Electrical", icon: Plug, color: "from-amber-500 to-orange-600" },
  { slug: "carpentry", name: "Carpentry", icon: Hammer, color: "from-emerald-500 to-green-600" },
  { slug: "interior-design", name: "Interior Design", icon: Home, color: "from-rose-500 to-pink-600" },
  { slug: "renovation", name: "Renovation", icon: Building, color: "from-gray-700 to-gray-900" },
  { slug: "wall-paneling", name: "Wall Paneling", icon: Wallpaper, color: "from-cyan-500 to-blue-600" },
  { slug: "moving", name: "Packing & Moving", icon: Truck, color: "from-orange-400 to-yellow-500" },
  { slug: "cleaning", name: "Cleaning", icon: Sparkles, color: "from-lime-400 to-green-500" },
  { slug: "ac-service", name: "AC Service", icon: Wind, color: "from-sky-400 to-cyan-500" },
  { slug: "appliance-repair", name: "Appliance Repair", icon: Tv, color: "from-indigo-400 to-blue-600" },
  { slug: "cctv", name: "CCTV & Security", icon: Shield, color: "from-gray-700 to-black" },
  { slug: "smart-home", name: "Smart Home", icon: UserCog, color: "from-purple-400 to-fuchsia-500" },
  { slug: "interior-decoration", name: "Interior Decoration", icon: Leaf, color: "from-pink-400 to-rose-500" },
  { slug: "false-ceiling", name: "False Ceiling", icon: Ruler, color: "from-yellow-400 to-amber-500" },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Our Services</h1>
        <p className="text-gray-600 mb-8">
          BlinkUp brings you 15+ professional home services — one tap away 🚀
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Link
                href={`/services/${service.slug}`}
                key={i}
                className="group relative rounded-2xl shadow-sm bg-white border border-gray-100 hover:shadow-md transition overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${service.color} h-24 flex items-center justify-center text-white`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div className="p-4">
                  <h2 className="font-semibold text-gray-800 mb-1 group-hover:text-purple-600 transition">
                    {service.name}
                  </h2>
                  <p className="text-sm text-gray-500">Professional & verified experts</p>
                  <div className="mt-3 flex justify-between text-xs">
                    <span className="text-gray-400">View Details →</span>
                    <span className="text-purple-600 font-semibold group-hover:underline">Book Now</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
