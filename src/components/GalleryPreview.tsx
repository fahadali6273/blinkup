'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Image from 'next/image';

interface GalleryItem {
  id: string;
  imageUrl: string;
  category: string;
}

export default function GalleryPreview() {
  const [images, setImages] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      const snapshot = await getDocs(collection(db, 'gallery'));
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as GalleryItem[];
      setImages(data.slice(0, 6));
    };
    fetchGallery();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        {/* ✅ Changed heading */}
        

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img) => (
            <div key={img.id} className="relative w-full h-48 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
              <Image
                src={img.imageUrl}
                alt={img.category || 'Work'}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

