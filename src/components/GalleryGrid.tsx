'use client'

import { useState } from 'react'
import Image from 'next/image'
import { gallery, galleryCategories } from '../data/gallery'

export default function GalleryGrid() {
  const [category, setCategory] = useState('All')
  const [lightbox, setLightbox] = useState<{
    image: string
    description?: string
  } | null>(null)

  const filtered = category === 'All' ? gallery : gallery.filter((item) => item.category === category)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-4">
        {galleryCategories.map((cat) => {
          const isSelected = category === cat
          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={
                'px-4 py-2 rounded text-sm border ' +
                (isSelected ? 'bg-primary text-white' : 'bg-white text-gray-700')
              }
            >
              {cat}
            </button>
          )
        })}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer group overflow-hidden rounded shadow"
            onClick={() => setLightbox({ image: item.imageUrl, description: item.description })}
          >
            <Image
              src={item.imageUrl}
              alt={item.description || item.category}
              width={300}
              height={200}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
            />
            {item.description && (
              <p className="p-2 text-sm text-gray-600 truncate">{item.description}</p>
            )}
          </div>
        ))}
      </div>
      {lightbox && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative bg-white p-4 rounded shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setLightbox(null)}
            >
              ✕
            </button>
            <Image
              src={lightbox.image}
              alt={lightbox.description || 'Gallery image'}
              width={600}
              height={400}
              className="w-full h-auto object-contain mb-2"
            />
            {lightbox.description && (
              <p className="text-center text-sm text-gray-700">{lightbox.description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}