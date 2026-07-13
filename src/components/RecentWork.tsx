'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Image from 'next/image';
import { Star } from 'lucide-react';

interface Work {
  id: string;
  title: string;
  desc: string;
  location: string;
  rating: number;
  imageUrl: string;
  createdAt?: any;
}

export default function RecentWork() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const worksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as any),
        })) as Work[];
        setWorks(worksData.slice(0, 6)); // sirf latest 6 show
      } catch (error) {
        console.error('Error fetching works:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50" id="recent-work">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-purple-600">Recent Work</span>
          </h2>
          <p className="text-gray-500">Loading recent projects...</p>
        </div>
      </section>
    );
  }

  if (works.length === 0) {
    return (
      <section className="py-16 bg-gray-50" id="recent-work">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-purple-600">Recent Work</span>
          </h2>
          <p className="text-gray-400 italic">
            Abhi tak koi project upload nahi hua. Please add from admin panel.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50" id="recent-work">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Our <span className="text-purple-600">Recent Work</span>
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          BlinkUp ke experts dwara complete kiye gaye latest home service projects —
          painting, interior, renovation aur aur bhi bahut kuch.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work) => (
            <div
              key={work.id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={work.imageUrl}
                  alt={work.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  📍 {work.location}
                </div>
              </div>

              <div className="p-5 text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {work.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {work.desc?.length > 80
                    ? work.desc.slice(0, 80) + '...'
                    : work.desc}
                </p>

                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={
                        i < Math.round(work.rating || 5)
                          ? 'currentColor'
                          : 'none'
                      }
                    />
                  ))}
                  <span className="text-gray-600 text-xs ml-1">
                    ({work.rating || 5})
                  </span>
                </div>

                <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm hover:shadow-md transition">
                  Book Similar Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
