export interface Testimonial {
  id: string
  name: string
  city: string
  service: string
  rating: number
  review: string
  photoUrl?: string
}

// Sample testimonials until real data is added via Firestore
export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Amit Sharma',
    city: 'Delhi',
    service: 'Painting',
    rating: 5,
    review:
      'BlinkUp made painting my house a breeze. The painters were professional and finished ahead of schedule.',
    photoUrl: undefined,
  },
  {
    id: '2',
    name: 'Seema Gupta',
    city: 'Mumbai',
    service: 'Plumbing',
    rating: 4,
    review:
      'Great service! The plumber arrived on time and fixed our leakage issue quickly.',
    photoUrl: undefined,
  },
  {
    id: '3',
    name: 'Rahul Verma',
    city: 'Bangalore',
    service: 'Electrician',
    rating: 5,
    review:
      'Highly recommend BlinkUp for electrical work. The technician was knowledgeable and friendly.',
    photoUrl: undefined,
  },
]