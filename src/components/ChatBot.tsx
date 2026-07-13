"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

type Sender = "bot" | "user";

type Step =
  | "start"
  | "service"
  | "subService"
  | "name"
  | "phone"
  | "location"
  | "address"
  | "details"
  | "submitted";

interface ChatMessage {
  sender: Sender;
  text: string;
  options?: string[];
}

interface LeadData {
  name: string;
  phone: string;
  service: string;
  subService: string;
  location: string;
  address: string;
  mapLink: string;
  message: string;
}

const ADMIN_WHATSAPP_NUMBER = "917489673372";
const ADMIN_CALL_NUMBER = "+917489673372";

const SERVICE_CITY = "Bhopal";

const BHOPAL_CENTER = {
  latitude: 23.2599,
  longitude: 77.4126,
};

const BHOPAL_SERVICE_RADIUS_KM = 35;

const SERVICES = [
  "Painting",
  "Electrician",
  "Plumbing",
  "Carpenter",
  "Cleaning",
  "Interior Design",
  "Renovation",
  "False Ceiling",
  "Wall Paneling",
  "Packing & Moving",
  "Repairs",
  "Construction",
];

const SUB_SERVICES: Record<string, string[]> = {
  Painting: [
    "Full Home Painting",
    "Room Painting",
    "Wall Texture",
    "Waterproofing",
    "Other",
  ],
  Electrician: [
    "Fan Installation",
    "Light Fitting",
    "Switch Board",
    "Wiring Work",
    "Other",
  ],
  Plumbing: [
    "Tap Repair",
    "Leakage Repair",
    "Bathroom Fitting",
    "Pipeline Work",
    "Other",
  ],
  Carpenter: [
    "Furniture Repair",
    "Door Repair",
    "Modular Kitchen",
    "Custom Furniture",
    "Other",
  ],
  Cleaning: [
    "Home Cleaning",
    "Bathroom Cleaning",
    "Kitchen Cleaning",
    "Sofa Cleaning",
    "Other",
  ],
  "Interior Design": [
    "Home Interior",
    "Kitchen Design",
    "Bedroom Design",
    "Office Interior",
    "Other",
  ],
  Renovation: [
    "Home Renovation",
    "Bathroom Renovation",
    "Kitchen Renovation",
    "Office Renovation",
    "Other",
  ],
  "False Ceiling": [
    "POP Ceiling",
    "Gypsum Ceiling",
    "Ceiling Light Design",
    "Other",
  ],
  "Wall Paneling": [
    "PVC Panel",
    "Wooden Panel",
    "TV Wall Panel",
    "Decorative Panel",
    "Other",
  ],
  "Packing & Moving": [
    "Home Shifting",
    "Office Shifting",
    "Local Shifting",
    "Other",
  ],
  Repairs: ["Home Repair", "Appliance Help", "Maintenance Work", "Other"],
  Construction: [
    "New Construction",
    "Civil Work",
    "Labour Work",
    "Material Work",
    "Other",
  ],
};

const BHOPAL_AREA_KEYWORDS = [
  "bhopal",
  "mp nagar",
  "m p nagar",
  "new market",
  "old bhopal",
  "kolar",
  "kolar road",
  "bairagarh",
  "lalghati",
  "karond",
  "ayodhya bypass",
  "ayodhya nagar",
  "arera",
  "arera colony",
  "shahpura",
  "gulmohar",
  "habibganj",
  "rani kamlapati",
  "misrod",
  "hoshangabad road",
  "baghmugalia",
  "bawadia kalan",
  "bawadiya kalan",
  "trilanga",
  "chunabhatti",
  "nehru nagar",
  "tt nagar",
  "t t nagar",
  "shyamla hills",
  "kohefiza",
  "idgah hills",
  "airport road",
  "awadhpuri",
  "piplani",
  "govindpura",
  "ashoka garden",
  "subhash nagar",
  "jahangirabad",
  "peer gate",
  "chhola",
  "minaal",
  "minal",
  "danish nagar",
  "danish kunj",
  "sakshi dhaba",
  "bhopal railway station",
];

const OUTSIDE_CITY_KEYWORDS = [
  "indore",
  "jabalpur",
  "gwalior",
  "ujjain",
  "sagar",
  "rewa",
  "satna",
  "dewas",
  "ratlam",
  "sehore",
  "vidisha",
  "raisen",
  "delhi",
  "mumbai",
  "pune",
  "bangalore",
  "bengaluru",
  "hyderabad",
  "jaipur",
  "lucknow",
];

const initialMessage: ChatMessage = {
  sender: "bot",
  text: "👋 Hi! Main Blinku Assistant hoon. BlinkUp service abhi sirf Bhopal me available hai. Aapko kis service me help chahiye?",
  options: ["Book a Service", "Services List", "Call Now", "WhatsApp"],
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function cleanPhone(phone: string) {
  return phone.replace(/\D/g, "");
}

function isValidIndianMobile(phone: string) {
  const digits = cleanPhone(phone);
  return /^[6-9]\d{9}$/.test(digits);
}

function normalizeText(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function hasOutsideCity(text: string) {
  const normalized = normalizeText(text);
  return OUTSIDE_CITY_KEYWORDS.some((city) => normalized.includes(city));
}

function isBhopalLocationText(location: string) {
  const text = normalizeText(location);

  if (hasOutsideCity(text)) return false;

  return BHOPAL_AREA_KEYWORDS.some((area) => text.includes(area));
}

function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const earthRadiusKm = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}

function isInsideBhopalByCoordinates(latitude: number, longitude: number) {
  const distance = getDistanceKm(
    latitude,
    longitude,
    BHOPAL_CENTER.latitude,
    BHOPAL_CENTER.longitude
  );

  return distance <= BHOPAL_SERVICE_RADIUS_KM;
}

function detectService(text: string) {
  const lower = text.toLowerCase();

  const map = [
    {
      service: "Painting",
      keywords: ["paint", "painting", "painter", "color", "colour"],
    },
    {
      service: "Electrician",
      keywords: ["electric", "electrician", "light", "fan", "wiring", "switch"],
    },
    {
      service: "Plumbing",
      keywords: ["plumber", "plumbing", "tap", "leakage", "pipe", "bathroom"],
    },
    {
      service: "Carpenter",
      keywords: ["carpenter", "wood", "furniture", "door", "almirah"],
    },
    {
      service: "Cleaning",
      keywords: ["clean", "cleaning", "sofa", "bathroom cleaning", "kitchen cleaning"],
    },
    {
      service: "Interior Design",
      keywords: ["interior", "design", "modular", "kitchen design"],
    },
    {
      service: "Renovation",
      keywords: ["renovation", "renovate", "remodel"],
    },
    {
      service: "False Ceiling",
      keywords: ["false ceiling", "ceiling", "pop", "gypsum"],
    },
    {
      service: "Wall Paneling",
      keywords: ["wall panel", "paneling", "pvc panel", "tv wall"],
    },
    {
      service: "Packing & Moving",
      keywords: ["packing", "moving", "shifting", "packers"],
    },
    {
      service: "Repairs",
      keywords: ["repair", "fix", "maintenance"],
    },
    {
      service: "Construction",
      keywords: ["construction", "civil", "building", "labour"],
    },
  ];

  const matched = map.find((item) =>
    item.keywords.some((keyword) => lower.includes(keyword))
  );

  return matched?.service || "";
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState<Step>("start");

  const [lead, setLead] = useState<LeadData>({
    name: "",
    phone: "",
    service: "",
    subService: "",
    location: "",
    address: "",
    mapLink: "",
    message: "",
  });

  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBotTyping, isGettingLocation]);

  useEffect(() => {
    audioRef.current = new Audio("/notification.mp3");
  }, []);

  const playSound = async () => {
    try {
      if (audioRef.current) await audioRef.current.play();
    } catch {
      // ignore autoplay block
    }
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { sender: "user", text }]);
  };

  const addBotMessage = async (text: string, options?: string[]) => {
    setIsBotTyping(true);
    await delay(450);
    setIsBotTyping(false);

    setMessages((prev) => [...prev, { sender: "bot", text, options }]);
    playSound();
  };

  const resetChat = () => {
    setMessages([initialMessage]);
    setInput("");
    setStep("start");
    setLead({
      name: "",
      phone: "",
      service: "",
      subService: "",
      location: "",
      address: "",
      mapLink: "",
      message: "",
    });
  };

  const openCall = () => {
    window.location.href = `tel:${ADMIN_CALL_NUMBER}`;
  };

  const openWhatsApp = () => {
    const serviceText = lead.service ? ` for ${lead.service}` : "";
    const message = `Hello BlinkUp, I need help${serviceText}. Please contact me.`;
    const url = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const submitLead = async (finalLead: LeadData) => {
    setIsSubmitting(true);

    const addressForAdmin = finalLead.mapLink
      ? `${finalLead.address} | Google Maps: ${finalLead.mapLink}`
      : finalLead.address;

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: finalLead.name,
          phone: finalLead.phone,
          service: finalLead.service || "Chatbot Lead",
          subService: finalLead.subService,
          location: finalLead.location,
          address: addressForAdmin,
          mapLink: finalLead.mapLink,
          message:
            finalLead.message ||
            `Lead submitted from BlinkUp chatbot for ${finalLead.service}.`,
          source: "chatbot",
        }),
      });

      if (!response.ok) {
        throw new Error("Lead submit failed");
      }

      setStep("submitted");

      await addBotMessage(
        `✅ Thank you ${finalLead.name}! Aapka ${finalLead.service} request receive ho gaya hai. BlinkUp team jaldi hi aapse contact karegi.`,
        ["Call Now", "WhatsApp", "Book Another Service"]
      );
    } catch (error) {
      console.error("Chatbot lead submit error:", error);

      await addBotMessage(
        "❌ Sorry, lead submit nahi ho payi. Aap direct call ya WhatsApp kar sakte hain.",
        ["Call Now", "WhatsApp", "Try Again"]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCurrentLocation = async () => {
    if (typeof window === "undefined") return;

    if (!navigator.geolocation) {
      await addBotMessage(
        "❌ Aapke browser me location support nahi hai. Please manually Bhopal ka area type karein. Example: MP Nagar, Bhopal"
      );
      return;
    }

    setIsGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

        setIsGettingLocation(false);

        if (!isInsideBhopalByCoordinates(latitude, longitude)) {
          setStep("location");

          await addBotMessage(
            `❌ Sorry, BlinkUp service abhi sirf ${SERVICE_CITY} me available hai. Aapki current location Bhopal service area ke bahar lag rahi hai. Agar service Bhopal me chahiye to Bhopal ka area type karein.`,
            ["Call Now"]
          );

          return;
        }

        setLead((prev) => ({
          ...prev,
          location: "Bhopal - GPS Location",
          mapLink: mapsLink,
        }));

        setStep("address");

        await addBotMessage(
          "✅ GPS location mil gayi. Ab please full address type karein: House/Flat no, Colony, Landmark. Example: Flat 203, Near Aura Mall, Shahpura, Bhopal"
        );
      },
      async () => {
        setIsGettingLocation(false);
        setStep("location");

        await addBotMessage(
          "❌ Location permission nahi mili. Koi baat nahi, manually Bhopal ka area type kar dijiye. Example: MP Nagar, Bhopal",
          ["Use Current Location"]
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0,
      }
    );
  };

  const handleUserText = async (rawText: string) => {
    const text = rawText.trim();
    if (!text || isBotTyping || isSubmitting || isGettingLocation) return;

    addUserMessage(text);
    setInput("");

    const lower = text.toLowerCase();

    if (lower === "call now") {
      openCall();
      await addBotMessage("📞 Calling BlinkUp team...");
      return;
    }

    if (lower === "whatsapp") {
      openWhatsApp();
      await addBotMessage("✅ WhatsApp open ho raha hai...");
      return;
    }

    if (lower === "use current location") {
      if (step !== "location") {
        await addBotMessage(
          "Location use karne ke liye pehle service details complete karein."
        );
        return;
      }

      await addBotMessage("📍 Browser location permission me Allow dabaiye.");
      await handleCurrentLocation();
      return;
    }

    if (lower === "try again") {
      setStep("service");
      await addBotMessage("No problem. Kaunsi service chahiye?", SERVICES);
      return;
    }

    if (lower === "book another service") {
      setLead({
        name: "",
        phone: "",
        service: "",
        subService: "",
        location: "",
        address: "",
        mapLink: "",
        message: "",
      });
      setStep("service");
      await addBotMessage("Sure! Kaunsi service book karni hai?", SERVICES);
      return;
    }

    if (step === "start") {
      if (lower === "book a service") {
        setStep("service");
        await addBotMessage("Great! Kaunsi service chahiye?", SERVICES);
        return;
      }

      if (lower === "services list") {
        setStep("service");
        await addBotMessage("BlinkUp me ye services available hain:", SERVICES);
        return;
      }

      const detected = detectService(text);

      if (detected) {
        setLead((prev) => ({ ...prev, service: detected }));
        setStep("subService");

        await addBotMessage(
          `Great! ${detected} ke liye kaunsa kaam chahiye?`,
          SUB_SERVICES[detected] || ["Other"]
        );
        return;
      }

      await addBotMessage(
        "Aap service book karna chahte hain ya direct team se baat karna chahte hain?",
        ["Book a Service", "Services List", "Call Now", "WhatsApp"]
      );
      return;
    }

    if (step === "service") {
      const selectedService = SERVICES.includes(text)
        ? text
        : detectService(text) || text;

      setLead((prev) => ({ ...prev, service: selectedService }));
      setStep("subService");

      await addBotMessage(
        `Perfect! ${selectedService} me kaunsa kaam chahiye?`,
        SUB_SERVICES[selectedService] || ["Other"]
      );
      return;
    }

    if (step === "subService") {
      setLead((prev) => ({ ...prev, subService: text }));
      setStep("name");

      await addBotMessage("Aapka naam kya hai?");
      return;
    }

    if (step === "name") {
      if (text.length < 2) {
        await addBotMessage("Please apna valid naam type karein.");
        return;
      }

      setLead((prev) => ({ ...prev, name: text }));
      setStep("phone");

      await addBotMessage(
        `Nice to meet you ${text}! Ab apna 10 digit mobile number bhejiye.`
      );
      return;
    }

    if (step === "phone") {
      const digits = cleanPhone(text);

      if (!isValidIndianMobile(digits)) {
        await addBotMessage(
          "Please valid 10 digit Indian mobile number bhejiye. Example: 9876543210"
        );
        return;
      }

      setLead((prev) => ({ ...prev, phone: digits }));
      setStep("location");

      await addBotMessage(
        `Service abhi sirf ${SERVICE_CITY} me available hai. Please Bhopal ka area type karein ya current location use karein.`,
        ["Use Current Location"]
      );
      return;
    }

    if (step === "location") {
      if (text.length < 2) {
        await addBotMessage("Please valid location/area type karein.");
        return;
      }

      if (!isBhopalLocationText(text)) {
        await addBotMessage(
          `❌ Sorry, BlinkUp service abhi sirf ${SERVICE_CITY} me available hai. Please Bhopal ka valid area type karein. Example: MP Nagar, Bhopal / Kolar Road, Bhopal / Arera Colony, Bhopal`,
          ["Use Current Location", "Call Now"]
        );
        return;
      }

      setLead((prev) => ({
        ...prev,
        location: text,
        mapLink: "",
      }));

      setStep("address");

      await addBotMessage(
        "✅ Great! Ye Bhopal service area me hai. Ab please full address type karein: House/Flat no, Colony, Landmark. Example: H No. 21, Near DB Mall, MP Nagar, Bhopal"
      );
      return;
    }

    if (step === "address") {
      if (text.length < 8) {
        await addBotMessage(
          "Please thoda complete address type karein. Example: House no, colony, nearby landmark, Bhopal"
        );
        return;
      }

      if (hasOutsideCity(text)) {
        await addBotMessage(
          `❌ Address Bhopal ke bahar lag raha hai. BlinkUp service abhi sirf ${SERVICE_CITY} me available hai. Please Bhopal ka full address type karein.`
        );
        return;
      }

      setLead((prev) => ({
        ...prev,
        address: text,
      }));

      setStep("details");

      await addBotMessage(
        "✅ Address save ho gaya. Agar koi extra detail hai to type karein. Nahi hai to Skip select karein.",
        ["Skip"]
      );
      return;
    }

    if (step === "details") {
      const finalLead = {
        ...lead,
        message: lower === "skip" ? "" : text,
      };

      await submitLead(finalLead);
      return;
    }

    if (step === "submitted") {
      await addBotMessage(
        "Aapka request already record ho gaya hai. Aap call/WhatsApp kar sakte hain ya new service book kar sakte hain.",
        ["Call Now", "WhatsApp", "Book Another Service"]
      );
    }
  };

  const handleSend = () => {
    handleUserText(input);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  const getPlaceholder = () => {
    if (step === "phone") return "Enter 10 digit mobile number...";
    if (step === "location") return "Enter Bhopal area or use location...";
    if (step === "address") return "House no, colony, landmark...";
    if (step === "name") return "Enter your name...";
    if (step === "details") return "Type details or select Skip...";
    return "Type a message...";
  };

  return (
    <div className="fixed bottom-5 right-4 md:bottom-6 md:right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative bg-gradient-to-r from-purple-700 to-purple-500 text-white font-semibold px-5 py-3 rounded-full shadow-2xl hover:scale-105 transition-transform"
        >
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-400 animate-ping" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-400" />
          💬 Blinku Assistant
        </button>
      )}

      {isOpen && (
        <div className="w-[92vw] max-w-[390px] h-[560px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-purple-100">
          <div className="bg-gradient-to-r from-purple-800 to-purple-500 text-white p-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm">Blinku Assistant</h3>
              <p className="text-xs text-purple-100">
                Online • Bhopal Only • Visit Support
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={resetChat}
                className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded"
              >
                Reset
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 text-xl font-bold leading-none"
                aria-label="Minimize chat"
              >
                −
              </button>
            </div>
          </div>

          <div className="bg-purple-50 border-b border-purple-100 px-4 py-2">
            <p className="text-[12px] text-purple-700">
              📍 For home visit, please share GPS location + full address.
            </p>
          </div>

          <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
            {messages.map((message, index) => (
              <div key={index} className="my-3">
                <div
                  className={`p-3 rounded-2xl text-sm max-w-[85%] leading-relaxed ${
                    message.sender === "bot"
                      ? "bg-white text-gray-800 border border-gray-100 shadow-sm"
                      : "bg-purple-600 text-white ml-auto"
                  }`}
                >
                  {message.text}
                </div>

                {message.sender === "bot" && message.options && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {message.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleUserText(option)}
                        disabled={isBotTyping || isSubmitting || isGettingLocation}
                        className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-3 py-2 rounded-full hover:bg-purple-100 disabled:opacity-60"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isBotTyping && (
              <div className="my-3">
                <div className="bg-white text-gray-500 border border-gray-100 shadow-sm p-3 rounded-2xl text-sm max-w-[85%]">
                  Blinku typing...
                </div>
              </div>
            )}

            {isGettingLocation && (
              <div className="my-3">
                <div className="bg-white text-gray-500 border border-gray-100 shadow-sm p-3 rounded-2xl text-sm max-w-[85%]">
                  📍 Getting your GPS location...
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          <div className="border-t bg-white p-3">
            <div className="flex items-center gap-2">
              <input
                type={step === "phone" ? "tel" : "text"}
                inputMode={step === "phone" ? "numeric" : "text"}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={getPlaceholder()}
                disabled={isBotTyping || isSubmitting || isGettingLocation}
                className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:bg-gray-100"
              />

              <button
                onClick={handleSend}
                disabled={
                  isBotTyping ||
                  isSubmitting ||
                  isGettingLocation ||
                  !input.trim()
                }
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting || isGettingLocation ? "..." : "Send"}
              </button>
            </div>

            <p className="text-[11px] text-gray-400 mt-2 text-center">
              Powered by BlinkUp • Details used only for service contact
            </p>
          </div>
        </div>
      )}
    </div>
  );
}


