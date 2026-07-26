export type ServiceIconName =
  | "paint"
  | "plumbing"
  | "electrical"
  | "carpentry"
  | "renovation"
  | "interior"
  | "wall"
  | "moving"
  | "cleaning"
  | "ac"
  | "appliance"
  | "security"
  | "smart"
  | "decor"
  | "ceiling";

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceCatalogItem {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  icon: ServiceIconName;
  accent: string;
  softAccent: string;
  image: string;
  imageAlt: string;
  popular?: boolean;
  highlights: string[];
  subServices: string[];
  idealFor: string[];
  faqs: ServiceFaq[];
  searchTerms: string[];
}

export const serviceCatalog: ServiceCatalogItem[] = [
  {
    slug: "painting",
    name: "Painting",
    shortDescription: "Interior, exterior, texture and waterproofing work.",
    description:
      "Refresh a room or repaint the complete property with proper surface preparation, material guidance and a clean finish.",
    icon: "paint",
    accent: "#9a70ff",
    softAccent: "#24183a",
    image: "/images/painting-care.jpg",
    imageAlt: "Professional painter finishing a lavender wall in a Bhopal home",
    popular: true,
    highlights: [
      "Inspection-based scope and material estimate",
      "Furniture and floor protection before work",
      "Putty, primer, texture and waterproofing options",
      "Final touch-up and cleanup check",
    ],
    subServices: [
      "Interior repainting",
      "Exterior painting",
      "Damp-wall treatment",
      "Texture and stencil work",
      "Rental-home touch-up",
    ],
    idealFor: ["Flats", "Independent homes", "Offices", "Rental properties"],
    faqs: [
      {
        question: "Can BlinkUp arrange paint and other material?",
        answer:
          "Yes. After inspection, you can choose labour-only or a material-plus-labour quotation.",
      },
      {
        question: "How long does a typical 2BHK repaint take?",
        answer:
          "Most repainting jobs take a few days, but the exact schedule depends on wall condition and preparation work.",
      },
    ],
    searchTerms: ["wall paint", "painter", "waterproofing", "putty", "texture"],
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    shortDescription: "Leaks, blockages, fittings and water-line repairs.",
    description:
      "Get help with everyday plumbing problems, fixture installation and pipe repair with the issue checked before pricing.",
    icon: "plumbing",
    accent: "#5ba0ff",
    softAccent: "#151f38",
    image: "/images/plumbing-care.jpg",
    imageAlt: "Professional plumber repairing a sink pipe in a Bhopal kitchen",
    popular: true,
    highlights: [
      "Leak and blockage diagnosis",
      "Tap, sink and sanitary fitting installation",
      "Kitchen and bathroom pipeline work",
      "Clear repair scope before work starts",
    ],
    subServices: [
      "Tap and mixer repair",
      "Sink and drain blockage",
      "Toilet fitting",
      "Water-tank connection",
      "Pipe leakage repair",
    ],
    idealFor: ["Kitchens", "Bathrooms", "Balconies", "Water tanks"],
    faqs: [
      {
        question: "Can I book for a small leakage?",
        answer:
          "Absolutely. Select Plumbing, share the area and our team will confirm the inspection slot.",
      },
      {
        question: "Will the final price be shared before repair?",
        answer:
          "Yes. Pehle problem inspect hoti hai, then the repair scope and quotation are shared for approval.",
      },
    ],
    searchTerms: ["plumber", "leak", "blockage", "tap", "bathroom", "pipe"],
  },
  {
    slug: "electrical",
    name: "Electrical",
    shortDescription: "Safe repairs, wiring, lights and installation support.",
    description:
      "Book an electrical professional for switches, fans, lights, wiring checks and other residential electrical needs.",
    icon: "electrical",
    accent: "#ffad39",
    softAccent: "#302318",
    image: "/images/electrical-care.jpg",
    imageAlt: "Electrician safely testing a residential switchboard in Bhopal",
    popular: true,
    highlights: [
      "Switch, socket and fan repair",
      "Lighting and fixture installation",
      "Wiring and MCB inspection",
      "Safety-first testing before handover",
    ],
    subServices: [
      "Switch and socket repair",
      "Fan installation",
      "Light fitting",
      "MCB and distribution board check",
      "New wiring",
    ],
    idealFor: ["Homes", "Shops", "Offices", "New installations"],
    faqs: [
      {
        question: "Do you handle small electrical jobs?",
        answer:
          "Yes. You can book anything from a single switch repair to a wider wiring inspection.",
      },
      {
        question: "Can the electrician bring required parts?",
        answer:
          "The expert can identify the required parts after inspection and include them in the quotation if you prefer.",
      },
    ],
    searchTerms: ["electrician", "switch", "socket", "fan", "wiring", "mcb"],
  },
  {
    slug: "carpentry",
    name: "Carpentry",
    shortDescription: "Furniture repair, fitting and custom woodwork.",
    description:
      "From a loose hinge to custom furniture work, get the requirement measured and planned before execution.",
    icon: "carpentry",
    accent: "#d09a73",
    softAccent: "#2b201c",
    image: "/images/carpentry-care-v2.png",
    imageAlt: "BlinkUp carpenter repairing a wardrobe hinge in a Bhopal home",
    highlights: [
      "Furniture and door repair",
      "Wardrobe and modular fitting work",
      "Measurement-based custom jobs",
      "Hardware and finish options",
    ],
    subServices: [
      "Door and lock fitting",
      "Furniture repair",
      "Wardrobe work",
      "Kitchen cabinet repair",
      "Custom shelves",
    ],
    idealFor: ["Repairs", "New furniture", "Storage upgrades", "Rental fixes"],
    faqs: [
      {
        question: "Can I share reference photos?",
        answer:
          "Yes. Share your reference on WhatsApp after booking so the team can prepare for the inspection.",
      },
      {
        question: "Is material included?",
        answer:
          "Material is included only when mentioned in the approved quotation. Labour-only work is also possible.",
      },
    ],
    searchTerms: ["carpenter", "furniture", "wardrobe", "door", "cabinet", "wood"],
  },
  {
    slug: "renovation",
    name: "Renovation",
    shortDescription: "Coordinated home and office transformation.",
    description:
      "Plan civil, finishing and repair work under one coordinated scope, with site assessment before execution.",
    icon: "renovation",
    accent: "#8293df",
    softAccent: "#1c2038",
    image: "/images/renovation-care-v2.png",
    imageAlt: "BlinkUp renovation professionals surveying an apartment in Bhopal",
    popular: true,
    highlights: [
      "Site assessment and requirement mapping",
      "Phased scope, timeline and quotation",
      "Multi-service coordination",
      "Progress updates during execution",
    ],
    subServices: [
      "Full-home renovation",
      "Kitchen renovation",
      "Bathroom renovation",
      "Office renovation",
      "Rental-property refresh",
    ],
    idealFor: ["Old homes", "Newly purchased flats", "Offices", "Rental upgrades"],
    faqs: [
      {
        question: "Can BlinkUp manage multiple trades?",
        answer:
          "Yes. A renovation scope can coordinate painting, electrical, plumbing, carpentry and finishing work.",
      },
      {
        question: "Will I receive a timeline?",
        answer:
          "A practical timeline is shared after the site visit and scope discussion.",
      },
    ],
    searchTerms: ["renovation", "remodel", "civil work", "bathroom", "kitchen"],
  },
  {
    slug: "interior-design",
    name: "Interior Design",
    shortDescription: "Practical planning, materials and execution support.",
    description:
      "Turn ideas into a clear layout and finish plan suited to your space, priorities and budget.",
    icon: "interior",
    accent: "#ec6eb5",
    softAccent: "#32172c",
    image: "/images/interior-design-care-v2.png",
    imageAlt: "Interior designer reviewing a layout and material samples with a Bhopal homeowner",
    highlights: [
      "Space planning and requirement discussion",
      "Material and colour direction",
      "Furniture and lighting coordination",
      "Execution-ready scope",
    ],
    subServices: [
      "Living-room design",
      "Bedroom design",
      "Modular kitchen planning",
      "Wardrobe planning",
      "Office interiors",
    ],
    idealFor: ["New homes", "Room upgrades", "Compact spaces", "Offices"],
    faqs: [
      {
        question: "Can I start with only one room?",
        answer:
          "Yes. A single-room consultation or execution scope can be booked.",
      },
      {
        question: "Do you work with a fixed budget?",
        answer:
          "The team can plan options around a realistic budget after understanding your priorities.",
      },
    ],
    searchTerms: ["interior", "designer", "modular kitchen", "wardrobe", "decor"],
  },
  {
    slug: "wall-paneling",
    name: "Wall Paneling",
    shortDescription: "Decorative panels, wallpaper and feature walls.",
    description:
      "Create a practical feature wall with material suggestions, accurate measurement and neat installation.",
    icon: "wall",
    accent: "#3bc8c2",
    softAccent: "#142c2d",
    image: "/images/wall-paneling-care-v2.png",
    imageAlt: "BlinkUp professional installing wooden wall paneling in a Bhopal living room",
    highlights: [
      "Accurate wall measurement",
      "PVC, wood and decorative options",
      "Surface preparation guidance",
      "Clean edge and joint finishing",
    ],
    subServices: [
      "PVC panels",
      "Wooden slat panels",
      "Wallpaper installation",
      "TV feature walls",
      "Bedroom accent walls",
    ],
    idealFor: ["Living rooms", "Bedrooms", "Offices", "Reception areas"],
    faqs: [
      {
        question: "Which panel material is best?",
        answer:
          "It depends on moisture, wall condition, maintenance and the look you want. The expert will recommend suitable options.",
      },
      {
        question: "Can paneling hide an uneven wall?",
        answer:
          "Some systems can, but the wall must first be inspected for dampness or structural issues.",
      },
    ],
    searchTerms: ["wall panel", "wallpaper", "pvc", "feature wall", "tv panel"],
  },
  {
    slug: "moving",
    name: "Packing & Moving",
    shortDescription: "Organised packing and local shifting support.",
    description:
      "Plan a Bhopal move with item assessment, packaging requirements and the right vehicle decided in advance.",
    icon: "moving",
    accent: "#ffbd54",
    softAccent: "#302718",
    image: "/images/moving-care-v2.png",
    imageAlt: "BlinkUp moving professionals carefully wrapping furniture in a Bhopal apartment",
    highlights: [
      "Pre-move item assessment",
      "Packing material planning",
      "Careful loading and unloading",
      "Local home and office shifting",
    ],
    subServices: [
      "Local home shifting",
      "Office shifting",
      "Packing-only service",
      "Furniture moving",
      "Unpacking support",
    ],
    idealFor: ["Flats", "Independent homes", "Offices", "Small moves"],
    faqs: [
      {
        question: "How is the moving quotation calculated?",
        answer:
          "It depends on items, floor access, distance, packing material and vehicle requirement.",
      },
      {
        question: "Can I book only packing?",
        answer:
          "Yes. Mention that you need packing-only support when submitting the request.",
      },
    ],
    searchTerms: ["packers", "movers", "shifting", "packing", "transport"],
  },
  {
    slug: "cleaning",
    name: "Deep Cleaning",
    shortDescription: "Home, kitchen, bathroom and sofa deep cleaning.",
    description:
      "Choose focused or complete-home cleaning with the required team, equipment and scope confirmed before the visit.",
    icon: "cleaning",
    accent: "#31c6bd",
    softAccent: "#142d2e",
    image: "/images/cleaning-care.jpg",
    imageAlt: "Professional sofa deep cleaning in a Bhopal apartment",
    popular: true,
    highlights: [
      "Room-wise cleaning checklist",
      "Equipment-based sofa and surface care",
      "Kitchen and bathroom deep cleaning",
      "Final walkthrough before handover",
    ],
    subServices: [
      "Full-home deep cleaning",
      "Kitchen deep cleaning",
      "Bathroom deep cleaning",
      "Sofa cleaning",
      "Move-in cleaning",
    ],
    idealFor: ["Occupied homes", "Move-ins", "Festive cleaning", "Rental turnover"],
    faqs: [
      {
        question: "Do I need to arrange cleaning supplies?",
        answer:
          "The required supplies and equipment are confirmed with the service scope before the visit.",
      },
      {
        question: "Can I book only sofa cleaning?",
        answer:
          "Yes. Select Deep Cleaning and mention sofa cleaning in the booking details.",
      },
    ],
    searchTerms: ["cleaning", "deep clean", "sofa", "kitchen", "bathroom"],
  },
  {
    slug: "ac-service",
    name: "AC Service",
    shortDescription: "AC cleaning, repair, installation and inspection.",
    description:
      "Book seasonal maintenance, fault diagnosis or installation support for residential split and window AC units.",
    icon: "ac",
    accent: "#46bfe8",
    softAccent: "#162a35",
    image: "/images/ac-service-care-v2.png",
    imageAlt: "BlinkUp AC technician servicing an indoor split air conditioner in Bhopal",
    popular: true,
    highlights: [
      "General AC service and cleaning",
      "Cooling issue diagnosis",
      "Installation and uninstallation",
      "Repair quotation after inspection",
    ],
    subServices: [
      "Split AC service",
      "Window AC service",
      "AC installation",
      "AC uninstallation",
      "Cooling issue inspection",
    ],
    idealFor: ["Homes", "Small offices", "Seasonal servicing", "Moving homes"],
    faqs: [
      {
        question: "Does general service include gas refill?",
        answer:
          "Gas refill is not assumed. The technician checks the system first and quotes separately if it is required.",
      },
      {
        question: "Can I book installation after moving?",
        answer:
          "Yes. Share whether it is a split or window AC and the preferred visit time.",
      },
    ],
    searchTerms: ["ac", "air conditioner", "cooling", "gas", "installation"],
  },
  {
    slug: "appliance-repair",
    name: "Appliance Repair",
    shortDescription: "Diagnosis and repair support for home appliances.",
    description:
      "Get common household appliance faults inspected before deciding on repair and replacement parts.",
    icon: "appliance",
    accent: "#7888d8",
    softAccent: "#1d2038",
    image: "/images/appliance-repair-care-v2.png",
    imageAlt: "BlinkUp appliance technician diagnosing a washing machine in Bhopal",
    highlights: [
      "Fault diagnosis before repair",
      "Common home-appliance support",
      "Part requirement explained clearly",
      "Repair approval before work",
    ],
    subServices: [
      "Washing machine",
      "Refrigerator",
      "Microwave",
      "Water purifier",
      "Geyser",
    ],
    idealFor: ["Homes", "Rental properties", "Routine faults", "Installation checks"],
    faqs: [
      {
        question: "Are replacement parts included?",
        answer:
          "Parts are included only when listed in the quotation and approved by you.",
      },
      {
        question: "What details should I share?",
        answer:
          "Share the appliance type, brand, approximate age and the problem you are facing.",
      },
    ],
    searchTerms: ["appliance", "washing machine", "fridge", "microwave", "geyser"],
  },
  {
    slug: "cctv",
    name: "CCTV & Security",
    shortDescription: "Camera installation, setup and maintenance.",
    description:
      "Plan camera placement, cabling, recording and remote-view requirements for homes, shops and offices.",
    icon: "security",
    accent: "#a7a4b2",
    softAccent: "#242229",
    image: "/images/cctv-care-v2.png",
    imageAlt: "BlinkUp security technician installing a CCTV camera in a Bhopal shop",
    highlights: [
      "Site survey for camera placement",
      "Wiring and recorder planning",
      "Mobile-view setup support",
      "Existing system maintenance",
    ],
    subServices: [
      "Home CCTV installation",
      "Shop CCTV setup",
      "Camera replacement",
      "DVR and NVR setup",
      "Remote viewing support",
    ],
    idealFor: ["Homes", "Shops", "Offices", "Apartment common areas"],
    faqs: [
      {
        question: "How many cameras do I need?",
        answer:
          "That depends on entry points, blind spots and coverage goals. A site survey gives the right answer.",
      },
      {
        question: "Can you work with my existing cameras?",
        answer:
          "Yes. The system can be inspected for compatibility and faults before recommending changes.",
      },
    ],
    searchTerms: ["cctv", "camera", "security", "dvr", "nvr", "surveillance"],
  },
  {
    slug: "smart-home",
    name: "Smart Home",
    shortDescription: "Smart switches, sensors and automation setup.",
    description:
      "Upgrade selected rooms or the complete home with practical automation that remains easy for everyone to use.",
    icon: "smart",
    accent: "#9b70e8",
    softAccent: "#241a36",
    image: "/images/smart-home-care-v2.png",
    imageAlt: "BlinkUp smart-home technician configuring a connected switch in Bhopal",
    highlights: [
      "Smart switch and lighting setup",
      "Sensor and automation planning",
      "Wi-Fi and compatibility checks",
      "Simple handover and usage guidance",
    ],
    subServices: [
      "Smart switches",
      "Motion sensors",
      "Smart lighting",
      "Video doorbells",
      "Basic home automation",
    ],
    idealFor: ["New homes", "Room upgrades", "Elder-friendly homes", "Rental owners"],
    faqs: [
      {
        question: "Do I need to automate the entire home?",
        answer:
          "No. Start with one practical area, such as entry lighting or a bedroom, and expand later.",
      },
      {
        question: "Will existing wiring work?",
        answer:
          "Compatibility depends on the product and wiring. An inspection confirms what can be reused.",
      },
    ],
    searchTerms: ["smart home", "automation", "sensor", "smart switch", "doorbell"],
  },
  {
    slug: "interior-decoration",
    name: "Interior Decoration",
    shortDescription: "Lighting, styling and finishing touches for rooms.",
    description:
      "Improve the look and comfort of a space with coordinated colours, lighting, furnishings and decor.",
    icon: "decor",
    accent: "#7eb979",
    softAccent: "#1c2a1f",
    image: "/images/interior-decoration-care-v2.png",
    imageAlt: "Interior stylist arranging a finished Bhopal living room",
    highlights: [
      "Room styling direction",
      "Lighting and colour coordination",
      "Soft furnishing suggestions",
      "Practical decor placement",
    ],
    subServices: [
      "Living-room styling",
      "Bedroom refresh",
      "Lighting selection",
      "Curtains and soft furnishings",
      "Festive decor planning",
    ],
    idealFor: ["Room refreshes", "New homes", "Festive updates", "Small budgets"],
    faqs: [
      {
        question: "Can I decorate without major civil work?",
        answer:
          "Yes. Lighting, colour, panels, curtains and furniture placement can make a major difference without civil work.",
      },
      {
        question: "Can existing furniture be reused?",
        answer:
          "Yes. The plan can prioritise what you already own and add only what improves the room.",
      },
    ],
    searchTerms: ["decoration", "decor", "lighting", "curtains", "styling"],
  },
  {
    slug: "false-ceiling",
    name: "False Ceiling",
    shortDescription: "Gypsum, POP and integrated ceiling-light work.",
    description:
      "Plan ceiling design, drop height and lighting positions around the room’s proportions and practical needs.",
    icon: "ceiling",
    accent: "#ffd65a",
    softAccent: "#302b18",
    image: "/images/false-ceiling-care-v2.png",
    imageAlt: "BlinkUp professional measuring a gypsum false ceiling in a Bhopal home",
    highlights: [
      "Room measurement and ceiling plan",
      "Gypsum and POP options",
      "Integrated lighting coordination",
      "Access and maintenance planning",
    ],
    subServices: [
      "Gypsum ceiling",
      "POP ceiling",
      "Cove lighting",
      "Ceiling repair",
      "Feature ceiling",
    ],
    idealFor: ["Living rooms", "Bedrooms", "Offices", "New homes"],
    faqs: [
      {
        question: "Will a false ceiling reduce room height too much?",
        answer:
          "The drop is planned around the available height, lighting and room proportion before work begins.",
      },
      {
        question: "Can ceiling lights be included?",
        answer:
          "Yes. Electrical points and light placement can be coordinated in the same scope.",
      },
    ],
    searchTerms: ["false ceiling", "gypsum", "pop", "cove light", "ceiling"],
  },
];

export const popularServices = serviceCatalog.filter((service) => service.popular);

export function getServiceBySlug(slug: string) {
  return serviceCatalog.find((service) => service.slug === slug);
}
