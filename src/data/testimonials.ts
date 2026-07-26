export interface Testimonial {
  id: string;
  name: string;
  city: string;
  service: string;
  rating: number;
  review: string;
  verified: boolean;
  photoUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "painting-kolar",
    name: "Amit S.",
    city: "Kolar Road, Bhopal",
    service: "Painting",
    rating: 5,
    review:
      "Inspection ke baad wall condition aur material clearly explain kiya. Team ne furniture cover karke clean finishing di aur daily update bhi milta raha.",
    verified: false,
  },
  {
    id: "plumbing-arera",
    name: "Seema G.",
    city: "Arera Colony, Bhopal",
    service: "Plumbing",
    rating: 5,
    review:
      "Kitchen sink leakage ka exact issue pehle check hua, phir price confirm karke repair start ki. Booking aur WhatsApp coordination dono easy rahe.",
    verified: false,
  },
  {
    id: "electrical-gulmohar",
    name: "Rahul V.",
    city: "Gulmohar Colony, Bhopal",
    service: "Electrical",
    rating: 5,
    review:
      "MCB aur wiring safely test ki gayi. Technician ne sirf required repair suggest ki aur kaam complete hone ke baad sab points dobara check kiye.",
    verified: false,
  },
  {
    id: "cleaning-hoshangabad",
    name: "Nidhi M.",
    city: "Hoshangabad Road, Bhopal",
    service: "Deep Cleaning",
    rating: 4,
    review:
      "Move-in se pehle full-home cleaning book ki thi. Team time par aayi, checklist follow hui aur final walkthrough mein remaining spots bhi cover kiye.",
    verified: false,
  },
  {
    id: "ac-shahpura",
    name: "Imran K.",
    city: "Shahpura, Bhopal",
    service: "AC Service",
    rating: 5,
    review:
      "Cooling issue ka proper diagnosis hua. Unnecessary gas refill suggest nahi kiya; filter cleaning aur servicing ke baad AC performance better ho gayi.",
    verified: false,
  },
  {
    id: "renovation-ayodhya",
    name: "Pooja T.",
    city: "Ayodhya Bypass, Bhopal",
    service: "Renovation",
    rating: 5,
    review:
      "Multiple work items ko ek clear scope mein organise kiya gaya. Timeline aur quotation discuss hone se renovation decisions lena kaafi convenient raha.",
    verified: false,
  },
];
