import TestimonialCard from '../../components/TestimonialCard'
import { testimonials } from '../../data/testimonials'

export const metadata = {
  title: 'Testimonials – BlinkUp',
  description: 'Read customer reviews and ratings for BlinkUp home services.',
}

export default function TestimonialsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Customer Testimonials</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} />
        ))}
      </div>
    </div>
  )
}