import {
  PaintBrushIcon,
  BoltIcon,
  WrenchIcon,
  CubeTransparentIcon,
  Cog8ToothIcon,
  BuildingOffice2Icon,
  SparklesIcon,
  TruckIcon,
  SparklesIcon as CleaningIcon,
  Bars3CenterLeftIcon,
  AdjustmentsVerticalIcon,
  LeafIcon,
  Squares2X2Icon,
  ShieldCheckIcon,
  PuzzlePieceIcon,
} from '@heroicons/react/24/outline';

// Adjust the imports above to match the correct icons you want to use.

export interface Service {
  name: string;
  description: string;
  subServices?: string[];
  icon: React.ElementType;
}

export const services: Service[] = [
  {
    name: 'Painting',
    description: 'Interior & exterior painting, waterproofing, texture painting and more.',
    subServices: ['Interior', 'Exterior', 'Wallpaper Removal'],
    icon: PaintBrushIcon,
  },
  {
    name: 'Electrician',
    description: 'Expert electrical repairs, wiring, lighting installation, and maintenance.',
    subServices: ['Wiring', 'Lighting', 'Repairs'],
    icon: BoltIcon,
  },
  {
    name: 'Plumbing',
    description: 'Leak fixes, pipe installation, bathroom & kitchen plumbing solutions.',
    subServices: ['Leak Repair', 'Pipe Installation', 'Bathroom Fittings'],
    icon: WrenchIcon,
  },
  {
    name: 'Carpenter',
    description: 'Custom furniture, repairs, modular kitchens, and wardrobes.',
    subServices: ['Furniture Making', 'Repair', 'Installation'],
    icon: CubeTransparentIcon,
  },
  {
    name: 'Repairs & Maintenance',
    description: 'General home repairs, fixtures fixing and preventive maintenance.',
    subServices: ['General Repair', 'Fixture Fixing', 'Home Inspection'],
    icon: Cog8ToothIcon,
  },
  {
    name: 'Construction & Renovation',
    description: 'From new construction to remodeling, we handle it all.',
    subServices: ['New Construction', 'Renovation', 'Remodeling'],
    icon: BuildingOffice2Icon,
  },
  {
    name: 'Interior Design & Decoration',
    description: 'Professional interior design and décor services.',
    subServices: ['Design Consultation', '3D Modeling', 'Execution'],
    icon: SparklesIcon,
  },
  {
    name: 'Packing & Moving',
    description: 'Safe packing and moving services for home and office.',
    subServices: ['Home Moving', 'Office Moving', 'Packing'],
    icon: TruckIcon,
  },
  {
    name: 'Cleaning',
    description: 'Deep cleaning, carpet cleaning, sofa cleaning and more.',
    subServices: ['Deep Cleaning', 'Carpet Cleaning', 'Sofa Cleaning'],
    icon: CleaningIcon,
  },
  {
    name: 'AC Services',
    description: 'AC installation, repairs, and annual maintenance.',
    subServices: ['Installation', 'Repair', 'Service'],
    icon: Bars3CenterLeftIcon,
  },
  {
    name: 'Appliance Repair',
    description: 'Fixing appliances like washing machines, refrigerators, ovens, etc.',
    subServices: ['Washing Machine', 'Refrigerator', 'Microwave'],
    icon: AdjustmentsVerticalIcon,
  },
  {
    name: 'Gardening',
    description: 'Landscape design, maintenance and plant care services.',
    subServices: ['Landscaping', 'Lawn Care', 'Plant Care'],
    icon: SparklesIcon,
  },
  {
    name: 'Wall Paneling & Wallpaper',
    description: 'Wall panel installation, wallpaper selection and installation.',
    subServices: ['Wall Panels', 'Wallpaper'],
    icon: Squares2X2Icon,
  },
  {
    name: 'Security & CCTV',
    description: 'Home and office security systems, CCTV installation and monitoring.',
    subServices: ['CCTV Installation', 'Monitoring', 'Smart Locks'],
    icon: ShieldCheckIcon,
  },
  {
    name: 'Handyman On-Demand',
    description: 'A variety of tasks performed by experts on demand.',
    subServices: ['Minor Repairs', 'Furniture Assembly', 'Odd Jobs'],
    icon: PuzzlePieceIcon,
  },
];
