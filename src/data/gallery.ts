export interface GalleryItem {
  id: string
  category: string
  imageUrl: string
  description?: string
  date?: string
}

export const gallery: GalleryItem[] = [
  {
    id: 'g1',
    category: 'Painting',
    imageUrl: '/gallery/painting.png',
    description: 'Completed painting project',
    date: '2025-01-12',
  },
  {
    id: 'g2',
    category: 'Electrician',
    imageUrl: '/gallery/electrician.png',
    description: 'Electrical wiring and lighting',
    date: '2025-02-05',
  },
  {
    id: 'g3',
    category: 'Plumbing',
    imageUrl: '/gallery/plumbing.png',
    description: 'Fixing pipeline leakage',
    date: '2025-02-28',
  },
]

export const galleryCategories = [
  'All',
  'Painting',
  'Electrician',
  'Plumbing',
]