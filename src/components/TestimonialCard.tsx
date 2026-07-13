import { Testimonial } from '../data/testimonials'
import Image from 'next/image'

interface Props {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: Props) {
  const { name, city, service, rating, review, photoUrl } = testimonial
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm flex flex-col h-full">
      <div className="flex items-center mb-3">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={name}
            width={40}
            height={40}
            className="rounded-full mr-3"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center text-gray-600 text-sm">
            {name[0]}
          </div>
        )}
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-xs text-gray-500">
            {city} • {service}
          </p>
        </div>
      </div>
      <div className="flex items-center mb-3">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={
              i < rating ? 'text-yellow-400 text-lg' : 'text-gray-300 text-lg'
            }
          >
            ★
          </span>
        ))}
      </div>
      <p className="text-gray-700 text-sm line-clamp-4">{review}</p>
    </div>
  )
}