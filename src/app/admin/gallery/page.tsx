'use client';

import { useEffect, useState, FormEvent } from 'react';
import { db, storage } from '../../../lib/firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';

interface GalleryItem {
  id: string;
  title: string;
  desc: string;
  location: string;
  rating: number;
  imageUrl: string;
  createdAt?: any;
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any),
      })) as GalleryItem[];
      setItems(data);
    } catch (error) {
      console.error('Error loading gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('Please select an image file');
      return;
    }
    try {
      setUploading(true);

      // 1) Upload image to Firebase Storage
      const fileRef = ref(storage, `gallery/${Date.now()}-${file.name}`);
      await uploadBytes(fileRef, file);
      const imageUrl = await getDownloadURL(fileRef);

      // 2) Save doc to Firestore
      await addDoc(collection(db, 'gallery'), {
        title: title || 'BlinkUp Project',
        desc: desc || '',
        location: location || 'Not specified',
        rating: Number(rating) || 5,
        imageUrl,
        createdAt: serverTimestamp(),
      });

      // 3) Clear form + reload list
      setTitle('');
      setDesc('');
      setLocation('');
      setRating(5);
      setFile(null);
      await fetchItems();
    } catch (error) {
      console.error('Error uploading project:', error);
      alert('Error uploading project. Check console.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const ok = confirm('Are you sure you want to delete this project?');
    if (!ok) return;
    try {
      await deleteDoc(doc(db, 'gallery', id));
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const formatDate = (ts?: any) => {
    if (!ts?.toDate) return '-';
    const d = ts.toDate() as Date;
    return d.toLocaleString();
  };

  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Recent Work / Gallery Management
        </h2>
        <p className="text-gray-500 mt-1">
          Yahan se aap latest projects upload kar sakte hain jo homepage ke
          &quot;Our Recent Work&quot; section aur gallery preview me dikhेंगे.
        </p>
      </div>

      {/* Upload Form Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Upload New Project
        </h3>
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="3BHK Interior – Bhopal"
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location / City
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Bhopal, Indore, etc."
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating (out of 5)
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value={5}>5 ★</option>
              <option value={4}>4 ★</option>
              <option value={3}>3 ★</option>
              <option value={2}>2 ★</option>
              <option value={1}>1 ★</option>
            </select>
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
            />
            <p className="text-xs text-gray-400 mt-1">
              Recommended: 1200x800 px, JPG/PNG
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Short Description
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Example: Premium interior painting with texture walls and LED lighting..."
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={uploading}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg disabled:opacity-60"
            >
              {uploading ? 'Uploading...' : 'Upload Project'}
            </button>
          </div>
        </form>
      </div>

      {/* List of existing items */}
      <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Uploaded Projects
          </h3>
          <span className="text-sm text-gray-500">
            Total: {items.length} projects
          </span>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading projects...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-400 italic">
            Abhi tak koi project upload nahi hua.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-3">#</th>
                  <th className="p-3">Preview</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3">Created At</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3 align-top">{index + 1}</td>
                    <td className="p-3 align-top">
                      <div className="relative w-20 h-14 rounded-md overflow-hidden bg-gray-100">
                        {item.imageUrl && (
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                    </td>
                    <td className="p-3 align-top">
                      <div className="font-medium text-gray-800">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.desc?.slice(0, 60)}
                        {item.desc && item.desc.length > 60 ? '...' : ''}
                      </div>
                    </td>
                    <td className="p-3 align-top text-gray-700">
                      {item.location}
                    </td>
                    <td className="p-3 align-top text-yellow-500">
                      {item.rating} ★
                    </td>
                    <td className="p-3 align-top text-gray-500">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="p-3 align-top text-right">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:underline text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
