export interface GalleryItem {
  id: string;
  category: string;
  imageUrl: string;
  description: string;
  alt: string;
}

export const gallery: GalleryItem[] = [
  {
    id: "painting-care",
    category: "Painting",
    imageUrl: "/images/painting-care.jpg",
    description: "Protected furniture and a careful interior wall finish.",
    alt: "Professional painter working on an interior wall",
  },
  {
    id: "electrical-care",
    category: "Electrical",
    imageUrl: "/images/electrical-care.jpg",
    description: "Safety-first inspection with the correct testing tools.",
    alt: "Electrician safely testing a residential switchboard",
  },
  {
    id: "plumbing-care",
    category: "Plumbing",
    imageUrl: "/images/plumbing-care.jpg",
    description: "A tidy kitchen-pipe inspection and repair setup.",
    alt: "Plumber repairing the pipe connection below a kitchen sink",
  },
  {
    id: "cleaning-care",
    category: "Cleaning",
    imageUrl: "/images/cleaning-care.jpg",
    description: "Equipment-based sofa and home deep cleaning.",
    alt: "Professional using an upholstery extractor on a sofa",
  },
  {
    id: "interior-care",
    category: "Interiors",
    imageUrl: "/images/interior-care.jpg",
    description: "Material choices reviewed before renovation work begins.",
    alt: "Interior designer and homeowner reviewing finish samples",
  },
  {
    id: "inspection-care",
    category: "Inspection",
    imageUrl: "/images/hero-home-care.jpg",
    description: "Requirements and next steps explained before execution.",
    alt: "Home-service expert explaining an inspection checklist",
  },
];

export const galleryCategories = [
  "All",
  "Painting",
  "Electrical",
  "Plumbing",
  "Cleaning",
  "Interiors",
  "Inspection",
];
