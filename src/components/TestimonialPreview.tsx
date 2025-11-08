import { testimonials } from '../data/testimonials'
import TestimonialCard from './TestimonialCard'

export default function TestimonialPreview() {
  const preview = testimonials.slice(0, 3)
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {preview.map((t) => (
        <TestimonialCard key={t.id} testimonial={t} />
      ))}
    </div>
  )
}