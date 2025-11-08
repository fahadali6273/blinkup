import GalleryGrid from '../../components/GalleryGrid'

export const metadata = {
  title: 'Gallery – BlinkUp',
  description: 'View completed projects and work showcase by BlinkUp.',
}

export default function GalleryPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Work Gallery</h1>
      <p className="mb-6 text-gray-700">
        Browse through some of our completed projects. Use the filters to
        narrow down by category.
      </p>
      <GalleryGrid />
    </div>
  )
}