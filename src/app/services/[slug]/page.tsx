"use client";

import React from "react";
import { useParams } from "next/navigation";
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
  Star,
} from "lucide-react";

// 🔹 MASTER CONFIG – yahi se saari 15 services ka data aa raha hai
const SERVICES = {
  // 1) Painting
  "painting": {
    slug: "painting",
    title: "Painting",
    subtitle: "Interior & exterior painting",
    icon: Paintbrush,
    gradient: "from-purple-500 via-purple-600 to-purple-700",
    badge: "Most booked BlinkUp service",
    rating: "4.9",
    reviews: "320+",
    eta: "Same / next-day visit",
    description:
      "Premium interior & exterior painting with high-quality paints, expert surface preparation and smooth finishing.",
    highlights: [
      "Interior & exterior painting",
      "Texture, stencil & designer walls",
      "Putty, primer & polish work",
      "Colour consultation & sample palettes",
    ],
    subServicesTitle: "Popular painting jobs",
    subServices: [
      "1BHK / 2BHK repainting",
      "Full villa / kothi painting",
      "Office & shop repainting",
      "Waterproofing for damp walls",
      "Rental touch-up packages",
    ],
    idealFor: ["Ghar renovation", "New construction finishing", "Festive repainting", "Rental refresh"],
    faqs: [
      {
        q: "Paint ka material aap log laate ho ya main kharidna padega?",
        a: "Dono options possible hain. BlinkUp expert aapko best brands suggest karega – aap khud bhi le sakte hain ya hum material + labour complete package de sakte hain.",
      },
      {
        q: "Kitna time lagega 2BHK paint karne me?",
        a: "Normally 2–4 din depending on putty / primer requirement aur work ki condition.",
      },
    ],
  },

  // 2) Plumbing
  "plumbing": {
    slug: "plumbing",
    title: "Plumbing",
    subtitle: "Leakage & blockage repair",
    icon: Wrench,
    gradient: "from-sky-500 via-sky-600 to-sky-700",
    badge: "Emergency support available",
    rating: "4.8",
    reviews: "210+",
    eta: "Within 90 minutes*",
    description:
      "Leakage, blockage ya installation – BlinkUp ke expert plumbers har type ke plumbing ka solution dete hain.",
    highlights: [
      "Tap, shower & mixer fitting",
      "Pipe leakage & blockage repair",
      "Bathroom & kitchen line work",
      "Water tank, geyser & filter connections",
    ],
    subServicesTitle: "Common plumbing jobs",
    subServices: [
      "Leakage & seepage repair",
      "Choked drain / toilet unblock",
      "New bathroom fittings",
      "Water tank pipeline work",
      "Filter / RO connection",
    ],
    idealFor: ["Rental houses", "Offices & shops", "Bathroom renovation"],
    faqs: [
      {
        q: "Kya plumbing work same-day ho jata hai?",
        a: "Chote jobs jaise tap replacement, blockage, etc. mostly same-day complete ho jate hain. Big line shifting work 1–2 din le sakta hai.",
      },
    ],
  },

  // 3) Electrical
  "electrical": {
    slug: "electrical",
    title: "Electrical",
    subtitle: "Wiring, rewiring & safety check",
    icon: Plug,
    gradient: "from-amber-500 via-orange-500 to-orange-600",
    badge: "Certified electricians",
    rating: "4.9",
    reviews: "270+",
    eta: "Same-day service",
    description:
      "Safe & professional electrical work for homes, offices and shops – wiring, rewiring, MCB, lights, fans aur bahut kuch.",
    highlights: [
      "Switchboard, socket & MCB work",
      "Lighting & ceiling fan installation",
      "Full house wiring & rewiring",
      "Earthing & safety inspection",
    ],
    subServicesTitle: "Popular electrical jobs",
    subServices: [
      "Fan / light / chandelier fitting",
      "New switchboard installation",
      "Meter to main line wiring",
      "Inverter / UPS wiring",
      "MCB / DB repair & upgrade",
    ],
    idealFor: ["New flats", "Shops & showrooms", "Old wiring upgrade"],
    faqs: [
      {
        q: "Kya material (wire, MCB, switch) aap provide karte ho?",
        a: "Agar aap chaho to BlinkUp verified brands ka material bhi arrange kiya ja sakta hai, ya aap khud ka material use kar sakte ho.",
      },
    ],
  },

  // 4) Carpentry
  "carpentry": {
    slug: "carpentry",
    title: "Carpentry",
    subtitle: "Door, window & furniture repair",
    icon: Hammer,
    gradient: "from-emerald-500 via-green-500 to-emerald-600",
    badge: "Custom furniture experts",
    rating: "4.7",
    reviews: "180+",
    eta: "As per project",
    description:
      "Furniture repair se lekar custom wardrobe tak – BlinkUp carpenters har type ka woodwork handle karte hain.",
    highlights: [
      "Door, window & lock repair",
      "Modular furniture fitting",
      "Polish & laminate finish",
      "Custom wardrobe & storage design",
    ],
    subServicesTitle: "Carpentry jobs",
    subServices: [
      "Bed / sofa / chair repair",
      "Wardrobe & cabinet fitting",
      "Modular kitchen fitting help",
      "Wooden door & frame work",
      "Window & sliding channel repair",
    ],
    idealFor: ["Old furniture upgrade", "New house setup"],
    faqs: [
      {
        q: "Kya aap log pura custom furniture bana sakte ho?",
        a: "Haan, design final hone ke baad blinkUp partner workshop me furniture banakar site pe fitment kar sakta hai.",
      },
    ],
  },

  // 5) Interior Design
  "interior-design": {
    slug: "interior-design",
    title: "Interior Design",
    subtitle: "Living, bedroom & kitchen design",
    icon: Home,
    gradient: "from-rose-500 via-pink-500 to-rose-600",
    badge: "Concept to completion",
    rating: "4.9",
    reviews: "95+",
    eta: "Design planning 3–5 days",
    description:
      "Modern, functional aur stylish interiors – BlinkUp ke designers aapke budget aur taste ke according plan banate hain.",
    highlights: [
      "2D / 3D layout planning",
      "Theme-based interiors",
      "Furniture, lighting & decor planning",
      "End-to-end project coordination",
    ],
    subServicesTitle: "Interior solutions",
    subServices: [
      "Living room makeover",
      "Bedroom & wardrobe design",
      "Modular kitchen layout",
      "Home office & study area",
      "Complete home interiors",
    ],
    idealFor: ["New flats", "Villa / kothi", "Rental conversions"],
    faqs: [
      {
        q: "Kya site visit free hoti hai?",
        a: "City / area ke hisab se nominal visiting charges ho sakte hain, jo project confirm hone par adjust kiye ja sakte hain.",
      },
    ],
  },

  // 6) Renovation
  "renovation": {
    slug: "renovation",
    title: "Renovation",
    subtitle: "Civil + interior + finishing",
    icon: Building,
    gradient: "from-slate-700 via-slate-800 to-gray-900",
    badge: "End-to-end renovation partner",
    rating: "4.8",
    reviews: "130+",
    eta: "As per scope",
    description:
      "Civil work, plumbing, electrical, tiles, paint, false ceiling – sab ek hi jagah se manage karo BlinkUp ke through.",
    highlights: [
      "Structural & layout changes",
      "Flooring & tiling work",
      "False ceiling & lighting",
      "Complete kitchen & bathroom renovation",
    ],
    subServicesTitle: "Renovation packages",
    subServices: [
      "Partial flat renovation",
      "Full home makeover",
      "Office & shop renovation",
      "Bathroom redo from scratch",
      "Kitchen layout revamp",
    ],
    idealFor: ["Old houses", "Commercial spaces"],
    faqs: [
      {
        q: "Kya aap fixed quotation dete ho?",
        a: "Site measurement & requirement samajhne ke baad detailed BOQ + quotation share kiya jata hai.",
      },
    ],
  },

  // 7) Wall Paneling
  "wall-paneling": {
    slug: "wall-paneling",
    title: "Wall Paneling",
    subtitle: "Decorative wall solutions",
    icon: Wallpaper,
    gradient: "from-cyan-500 via-sky-500 to-blue-600",
    badge: "Designer feature walls",
    rating: "4.8",
    reviews: "70+",
    eta: "1–3 days typical",
    description:
      "3D panels, MDF, PVC, fabric or wooden – har type ke modern wall paneling options BlinkUp provide karta hai.",
    highlights: [
      "Living room TV wall",
      "Bed back wall design",
      "Office reception panels",
      "Acoustic & fabric panels",
    ],
    subServicesTitle: "Paneling styles",
    subServices: [
      "3D PVC / MDF panels",
      "Grooved wooden panels",
      "Fabric upholstered walls",
      "Gypsum designs with lights",
      "Mix & match concepts",
    ],
    idealFor: ["Living rooms", "Bedrooms", "Offices"],
    faqs: [
      {
        q: "Paneling washable hoti hai?",
        a: "Material ke hisab se care change hoti hai – PVC & MDF wipe-clean hote hain, fabric panels ke liye dry clean recommend hai.",
      },
    ],
  },

  // 8) Packing & Moving
  "moving": {
    slug: "moving",
    title: "Packing & Moving",
    subtitle: "Local & intercity shifting",
    icon: Truck,
    gradient: "from-orange-400 via-amber-500 to-yellow-500",
    badge: "Damage-free shifting",
    rating: "4.7",
    reviews: "160+",
    eta: "Scheduled as per need",
    description:
      "Professional packing, loading, transport & unloading – taaki aapka ghar ka saman safe tarike se new location tak pahunch sake.",
    highlights: [
      "Multi-layer protective packing",
      "Loading & unloading support",
      "Local & intercity moves",
      "Basic unpacking & placement",
    ],
    subServicesTitle: "Move types",
    subServices: [
      "Within-city shifting",
      "Inter-city relocation",
      "Office / shop shifting",
      "Mini truck for few items",
      "Bike / scooter transport",
    ],
    idealFor: ["Tenant shifting", "Office moves"],
    faqs: [
      {
        q: "Insurance milta hai kya?",
        a: "High-value items ke liye transit insurance arrange kiya ja sakta hai – quotation se pehle discuss kiya jata hai.",
      },
    ],
  },

  // 9) Cleaning
  "cleaning": {
    slug: "cleaning",
    title: "Cleaning",
    subtitle: "Deep cleaning & sanitization",
    icon: Sparkles,
    gradient: "from-lime-400 via-green-400 to-emerald-500",
    badge: "Move-in ready cleaning",
    rating: "4.8",
    reviews: "200+",
    eta: "Slot based",
    description:
      "Professional deep cleaning team jo aapke ghar, office ya shop ko top-to-bottom clean & fresh bana deti hai.",
    highlights: [
      "Full home deep cleaning",
      "Kitchen grease removal",
      "Bathroom descaling & sanitization",
      "Sofa, mattress & chair shampooing",
    ],
    subServicesTitle: "Cleaning services",
    subServices: [
      "Post-construction clean-up",
      "Move-in / move-out cleaning",
      "Sofa & upholstery cleaning",
      "Office & shop cleaning",
      "Kitchen & chimney deep clean",
    ],
    idealFor: ["New move-in", "Festive cleaning"],
    faqs: [
      {
        q: "Chemicals safe hote hain?",
        a: "Haan, professional-grade but home-safe chemicals use kiye jate hain. Child & pet-friendly options bhi available hai.",
      },
    ],
  },

  // 10) AC Service
  "ac-service": {
    slug: "ac-service",
    title: "AC Service",
    subtitle: "Cooling, repair & installation",
    icon: Wind,
    gradient: "from-sky-400 via-cyan-500 to-sky-600",
    badge: "Summer special packages",
    rating: "4.7",
    reviews: "140+",
    eta: "24–48 hours",
    description:
      "Split, window, inverter AC – saari brands ke liye expert servicing, gas refill aur installation support.",
    highlights: [
      "AC jet pump cleaning",
      "Gas refill & leakage check",
      "Installation & uninstallation",
      "Cooling performance inspection",
    ],
    subServicesTitle: "AC jobs",
    subServices: [
      "Regular servicing",
      "Deep cleaning with jet pump",
      "Compressor check & repair",
      "New AC installation",
      "AC relocation & uninstallation",
    ],
    idealFor: ["Homes", "Shops", "Offices"],
    faqs: [
      {
        q: "Kitne time baad servicing karani chahiye?",
        a: "Har season (6 mahine) me ek detailed AC service karana best hota hai for good cooling & low power usage.",
      },
    ],
  },

  // 11) Appliance Repair
  "appliance-repair": {
    slug: "appliance-repair",
    title: "Appliance Repair",
    subtitle: "TV, fridge, washing machine & more",
    icon: Tv,
    gradient: "from-indigo-400 via-blue-500 to-indigo-600",
    badge: "Multi-brand experts",
    rating: "4.6",
    reviews: "120+",
    eta: "Same / next-day",
    description:
      "Home appliances jaise TV, fridge, washing machine, microwave, geyser etc. ka reliable repair & service.",
    highlights: [
      "TV & LED panel issues",
      "Fridge cooling problems",
      "Top / front load machine repair",
      "Microwave, geyser & chimney work",
    ],
    subServicesTitle: "Appliance categories",
    subServices: [
      "Smart & LED TV",
      "Single / double door fridge",
      "Semi / fully automatic washing machines",
      "Microwave, OTG & chimney",
      "Geyser & water heater",
    ],
    idealFor: ["Homes", "PGs", "Hostels"],
    faqs: [
      {
        q: "Parts ka warranty milta hai?",
        a: "Jo parts replace kiye jate hain unka brand warranty as per manufacturer provide kiya jata hai.",
      },
    ],
  },

  // 12) CCTV & Security
  "cctv": {
    slug: "cctv",
    title: "CCTV & Security",
    subtitle: "Camera & alarm setup",
    icon: Shield,
    gradient: "from-gray-700 via-slate-800 to-black",
    badge: "Secure home & business",
    rating: "4.8",
    reviews: "90+",
    eta: "Planned visit",
    description:
      "Indoor/outdoor CCTV cameras, DVR, remote viewing & alarm systems – BlinkUp ke through smart security setup.",
    highlights: [
      "New CCTV installation",
      "Existing system upgrade",
      "Remote viewing configuration",
      "Alarm & access control integration",
    ],
    subServicesTitle: "Security solutions",
    subServices: [
      "Home CCTV kits",
      "Shop & office surveillance",
      "Parking & society cameras",
      "Video door phones",
      "Alarm & motion sensors",
    ],
    idealFor: ["Homes", "Shops", "Warehouses"],
    faqs: [
      {
        q: "Kya mobile se live view possible hai?",
        a: "Haan, maximum systems me mobile viewing configure kiya ja sakta hai – aap kahin se bhi cameras dekh sakte hain.",
      },
    ],
  },

  // 13) Smart Home
  "smart-home": {
    slug: "smart-home",
    title: "Smart Home",
    subtitle: "Automation & IoT setup",
    icon: UserCog,
    gradient: "from-purple-400 via-fuchsia-500 to-purple-600",
    badge: "Future-ready living",
    rating: "4.7",
    reviews: "60+",
    eta: "Custom planning",
    description:
      "Smart switches, voice control, smart locks, sensors – BlinkUp aapke ghar ko smart & connected banata hai.",
    highlights: [
      "Alexa / Google Assistant setup",
      "Smart lighting & scenes",
      "Smart door locks & sensors",
      "Energy monitoring solutions",
    ],
    subServicesTitle: "Automation ideas",
    subServices: [
      "Room-wise smart lighting",
      "Curtain & blind automation",
      "Security & door automation",
      "Entire home smart retrofit",
      "Voice-controlled scenes",
    ],
    idealFor: ["New homes", "Premium rentals"],
    faqs: [
      {
        q: "Kya pura wiring change karni padegi?",
        a: "Mostly smart retrofit switches use hote hain jo existing wiring par hi work kar lete hain – heavy rewiring ki zaroorat nahi padti.",
      },
    ],
  },

  // 14) Interior Decoration
  "interior-decoration": {
    slug: "interior-decoration",
    title: "Interior Decoration",
    subtitle: "Styling, decor & furnishing",
    icon: Leaf,
    gradient: "from-pink-400 via-rose-500 to-pink-600",
    badge: "Instant visual upgrade",
    rating: "4.8",
    reviews: "80+",
    eta: "Design in 2–3 days",
    description:
      "Curtains, rugs, wall art, lighting & decor accessories se BlinkUp aapke space ko completely style kar sakta hai.",
    highlights: [
      "Soft furnishings selection",
      "Wall art & decor ideas",
      "Lighting mood planning",
      "Furniture layout adjustment",
    ],
    subServicesTitle: "Decoration focus areas",
    subServices: [
      "Living room styling",
      "Bedroom decor",
      "Kids’ room theme setup",
      "Entrance & foyer decor",
      "Office cabin styling",
    ],
    idealFor: ["Photo-ready homes", "Airbnb / rental styling"],
    faqs: [
      {
        q: "Kya aap budget friendly options bhi suggest karte ho?",
        a: "Bilkul, hum hamesha budget, usage aur long-term maintenance ko dhyan me rakhkar decor options suggest karte hain.",
      },
    ],
  },

  // 15) False Ceiling
  "false-ceiling": {
    slug: "false-ceiling",
    title: "False Ceiling",
    subtitle: "POP & gypsum with lighting",
    icon: Ruler,
    gradient: "from-yellow-400 via-amber-500 to-orange-500",
    badge: "Designer ceilings",
    rating: "4.7",
    reviews: "75+",
    eta: "2–7 days as per area",
    description:
      "POP, gypsum, grid ceilings with LED & strip lighting – BlinkUp ke saath designer ceilings easily plan karo.",
    highlights: [
      "Living & dining ceiling design",
      "Bedroom cove & tray ceiling",
      "LED strip + spot lighting",
      "POP mouldings & borders",
    ],
    subServicesTitle: "Ceiling concepts",
    subServices: [
      "Minimal cove designs",
      "Multi-layer ceilings",
      "Hotel / office grid ceiling",
      "Ceiling with indirect lights",
      "POP + wood combo designs",
    ],
    idealFor: ["New flats", "Renovations"],
    faqs: [
      {
        q: "False ceiling se height kam lagti hai?",
        a: "Standard planning me 6–8 inch drop rakha jata hai taaki room proportion maintain rahe – designer aapko best option suggest karega.",
      },
    ],
  },
} as const;

type ServiceKey = keyof typeof SERVICES;

export default function ServiceDetailsPage() {
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const service = slug ? SERVICES[slug as ServiceKey] : undefined;

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Service not found</h1>
        <p className="text-gray-600 mb-4">
          Shayad yeh service abhi BlinkUp me add nahi hui. Aap services list se koi aur service choose kar sakte hain.
        </p>
        <Link
          href="/services"
          className="px-5 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
        >
          Back to Services
        </Link>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* HERO SECTION */}
      <header
        className={`bg-gradient-to-r ${service.gradient} text-white shadow-lg mb-10`}
      >
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full text-xs mb-3 backdrop-blur">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              <span className="uppercase tracking-wide">
                BlinkUp • Home Service • {service.title}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white/20 rounded-2xl p-2">
                <Icon className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                  {service.title}
                </h1>
                <p className="text-sm md:text-base opacity-90">
                  {service.subtitle}
                </p>
              </div>
            </div>

            <p className="text-sm md:text-base opacity-90 max-w-xl">
              {service.description}
            </p>

            <div className="flex flex-wrap gap-4 mt-4 text-sm">
              <div className="flex items-center gap-1 bg-black/15 px-3 py-1 rounded-full">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-300 fill-yellow-300"
                  />
                ))}
                <span className="ml-1 font-semibold">
                  {service.rating}/5
                </span>
                <span className="opacity-80">({service.reviews} reviews)</span>
              </div>
              <div className="bg-black/15 px-3 py-1 rounded-full">
                ⏱ {service.eta}
              </div>
              <div className="bg-white/20 px-3 py-1 rounded-full">
                ⭐ {service.badge}
              </div>
            </div>
          </div>

          <div className="bg-white/15 rounded-2xl p-4 md:p-5 w-full md:w-80 backdrop-blur shadow-lg">
            <h3 className="text-sm font-semibold mb-2">
              Quick Booking – BlinkUp Lead Form
            </h3>
            <p className="text-xs mb-3 opacity-90">
              30 seconds me request bhejein, team aapko call / WhatsApp karegi.
            </p>
            <Link
              href={`/lead?service=${encodeURIComponent(service.title)}`}
              className="block w-full text-center bg-white text-purple-700 font-semibold py-2.5 rounded-lg shadow hover:bg-purple-50 transition"
            >
              Book {service.title} Service
            </Link>
            <p className="text-[11px] mt-2 opacity-80">
              No advance payment required. Service confirmation call pe details
              final hoti hain.
            </p>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-4 space-y-10">
        {/* Highlights + Ideal For */}
        <section className="grid md:grid-cols-[1.6fr,1fr] gap-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-purple-50">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Service Highlights
            </h2>
            <ul className="space-y-2 text-sm text-gray-700">
              {service.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 text-purple-600">✔</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
            <h3 className="text-sm font-semibold text-purple-800 mb-2">
              Best suited for
            </h3>
            <ul className="space-y-1.5 text-sm text-purple-950">
              {service.idealFor.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[11px] mt-3 text-purple-800/80">
              Confused? Lead form submit karein – team aapko call karke best
              package suggest karegi.
            </p>
          </div>
        </section>

        {/* Sub-services pills */}
        <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            {service.subServicesTitle}
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Ye kuch common tasks hain jo customers is service ke liye BlinkUp se
            book karte hain:
          </p>
          <div className="flex flex-wrap gap-2">
            {service.subServices.map((item, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs text-gray-800"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* Why BlinkUp */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900 text-white rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/40 blur-3xl" />
            <h2 className="text-lg font-semibold mb-3 relative">
              Why BlinkUp for {service.title}?
            </h2>
            <ul className="space-y-2 text-sm relative">
              <li>✔ Verified & trained partner network</li>
              <li>✔ Upfront scope discussion & transparent pricing</li>
              <li>✔ WhatsApp + email notifications for each lead</li>
              <li>✔ Easy re-scheduling & dedicated support</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              How BlinkUp service journey works?
            </h3>
            <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
              <li>Lead form / WhatsApp se request place karein.</li>
              <li>Admin aapko call / message karke details confirm karega.</li>
              <li>Nearest BlinkUp partner ko job assign hota hai.</li>
              <li>Work complete hone ke baad payment directly service partner ko.</li>
            </ol>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            FAQs – {service.title} Service
          </h2>
          <div className="space-y-4">
            {service.faqs.map((faq, i) => (
              <details
                key={i}
                className="group border border-gray-100 rounded-xl px-4 py-3"
              >
                <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-gray-800">
                  <span>{faq.q}</span>
                  <span className="text-purple-500 group-open:rotate-180 transition-transform">
                    ▾
                  </span>
                </summary>
                <p className="mt-2 text-sm text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-purple-600 rounded-2xl text-white px-6 py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-md">
          <div>
            <h2 className="text-xl font-semibold mb-1">
              Ready to book {service.title} with BlinkUp?
            </h2>
            <p className="text-sm text-purple-50 max-w-xl">
              Ek chhota sa form submit karein – hamari team aapse WhatsApp / call
              par contact karke timing, pricing aur scope confirm karegi.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/lead?service=${encodeURIComponent(service.title)}`}
              className="bg-white text-purple-700 px-6 py-2.5 rounded-lg font-semibold shadow hover:bg-purple-50 transition"
            >
              Book via Lead Form
            </Link>
            <Link
              href="https://wa.me/+917489673372"
              target="_blank"
              className="border border-white/70 px-5 py-2.5 rounded-lg text-sm hover:bg-white/10 transition flex items-center gap-2"
            >
              <span>Chat on WhatsApp</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
