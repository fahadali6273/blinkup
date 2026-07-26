"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  BadgeCheck,
  ImagePlus,
  Images,
  Loader2,
  MapPin,
  RefreshCw,
  Star,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { db, storage } from "../../../lib/firebase";

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
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(5);
  const [file, setFile] = useState<File | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setMessage(null);

    try {
      const galleryQuery = query(
        collection(db, "gallery"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(galleryQuery);
      const data = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      })) as GalleryItem[];
      setItems(data);
    } catch (fetchError) {
      console.error("Error loading gallery:", fetchError);
      setMessage({
        type: "error",
        text: "Gallery projects load nahi hue. Please retry.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchItems();
  }, [fetchItems]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    if (!file) {
      setMessage({ type: "error", text: "Project image select karna required hai." });
      return;
    }

    setUploading(true);

    try {
      const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
      const fileRef = ref(storage, `gallery/${Date.now()}-${safeFileName}`);
      await uploadBytes(fileRef, file);
      const imageUrl = await getDownloadURL(fileRef);

      await addDoc(collection(db, "gallery"), {
        title: title.trim() || "BlinkUp Project",
        desc: desc.trim(),
        location: location.trim() || "Bhopal",
        rating: Number(rating) || 5,
        imageUrl,
        createdAt: serverTimestamp(),
      });

      setTitle("");
      setDesc("");
      setLocation("");
      setRating(5);
      setFile(null);
      setFileInputKey((key) => key + 1);
      await fetchItems();
      setMessage({
        type: "success",
        text: "Project uploaded and added to the public gallery.",
      });
    } catch (uploadError) {
      console.error("Error uploading project:", uploadError);
      setMessage({
        type: "error",
        text: "Project upload nahi hua. Storage access aur connection check karein.",
      });
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Is project ko gallery se permanently delete karna hai?"
    );
    if (!confirmed) return;

    setDeletingId(id);
    setMessage(null);

    try {
      await deleteDoc(doc(db, "gallery", id));
      setItems((current) => current.filter((item) => item.id !== id));
      setMessage({ type: "success", text: "Project removed from the gallery." });
    } catch (deleteError) {
      console.error("Error deleting project:", deleteError);
      setMessage({ type: "error", text: "Project delete nahi hua. Please retry." });
    } finally {
      setDeletingId("");
    }
  }

  function formatDate(timestamp?: any) {
    if (!timestamp?.toDate) return "Not available";
    return (timestamp.toDate() as Date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-5 rounded-[1.75rem] border border-white/[0.08] bg-[#15101d] p-5 sm:flex-row sm:items-end sm:p-7">
        <div>
          <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#9b77f7]">
            <Images size={14} />
            Project proof
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.045em]">
            Keep recent work fresh and credible.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#9f94a8]">
            Completed project photos upload karein jo homepage aur work gallery
            mein customers ko dikhengi.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void fetchItems()}
          disabled={loading}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-xs font-bold text-[#d6cdda] transition hover:bg-white/[0.08] disabled:opacity-60"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh gallery
        </button>
      </section>

      {message && (
        <div
          className={`rounded-2xl border p-4 text-sm ${
            message.type === "success"
              ? "border-emerald-300/15 bg-emerald-300/[0.07] text-emerald-200"
              : "border-rose-300/15 bg-rose-300/[0.07] text-rose-200"
          }`}
          role="status"
        >
          {message.text}
        </div>
      )}

      <section className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
        <form
          onSubmit={handleSubmit}
          className="h-fit rounded-[1.75rem] border border-white/[0.08] bg-[#15101d] p-5 sm:p-7"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#806f89]">
                New gallery item
              </p>
              <h3 className="mt-2 text-xl font-bold">Upload completed work</h3>
            </div>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#6d3ae6]/15 text-[#b99cff]">
              <ImagePlus size={22} />
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <AdminField label="Project title">
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="field"
                placeholder="Example: 3BHK interior painting"
              />
            </AdminField>

            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField label="Location">
                <input
                  type="text"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  className="field"
                  placeholder="Kolar Road, Bhopal"
                />
              </AdminField>
              <AdminField label="Customer rating">
                <select
                  value={rating}
                  onChange={(event) => setRating(Number(event.target.value))}
                  className="field"
                >
                  {[5, 4, 3, 2, 1].map((value) => (
                    <option key={value} value={value}>
                      {value} out of 5
                    </option>
                  ))}
                </select>
              </AdminField>
            </div>

            <AdminField label="Project image">
              <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#574866] bg-white/[0.025] p-5 text-center transition hover:border-[#8f65f5]/50 hover:bg-[#6d3ae6]/[0.06]">
                <UploadCloud size={24} className="text-[#9b77f7]" />
                <span className="mt-3 text-xs font-bold text-[#c9becf]">
                  {file ? file.name : "Choose JPG, PNG or WebP"}
                </span>
                <span className="mt-1 text-[10px] text-[#74687d]">
                  Recommended landscape image, maximum quality
                </span>
                <input
                  key={fileInputKey}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(event) =>
                    setFile(event.target.files?.[0] || null)
                  }
                  className="sr-only"
                />
              </label>
            </AdminField>

            <AdminField label="Short description">
              <textarea
                value={desc}
                onChange={(event) => setDesc(event.target.value)}
                rows={4}
                className="field min-h-28 resize-y"
                placeholder="Work scope, finish and important details..."
              />
            </AdminField>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="button-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploading ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Uploading project...
              </>
            ) : (
              <>
                <UploadCloud size={17} />
                Publish project
              </>
            )}
          </button>
        </form>

        <div className="overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#15101d]">
          <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] p-5 sm:p-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#806f89]">
                Public gallery
              </p>
              <h3 className="mt-2 text-xl font-bold">Uploaded projects</h3>
            </div>
            <span className="rounded-full bg-white/[0.04] px-3 py-2 text-[10px] font-bold text-[#9f94a8]">
              {items.length} projects
            </span>
          </div>

          {loading ? (
            <div className="flex min-h-80 items-center justify-center gap-3 text-sm text-[#8f8498]">
              <Loader2 size={20} className="animate-spin text-[#8f65f5]" />
              Loading projects...
            </div>
          ) : items.length === 0 ? (
            <div className="grid min-h-80 place-items-center p-8 text-center">
              <div>
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/[0.04] text-[#806f89]">
                  <Images size={24} />
                </span>
                <p className="mt-4 font-bold">No uploaded projects yet</p>
                <p className="mt-2 text-xs text-[#806f89]">
                  First completed-work image upload karein.
                </p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.06]">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="grid gap-4 p-5 transition hover:bg-white/[0.025] sm:grid-cols-[7rem_1fr_auto] sm:items-center sm:p-6"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/[0.04]">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="grid h-full place-items-center text-[#675c70]">
                        <Images size={22} />
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-bold">
                      {item.title || "BlinkUp project"}
                    </p>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#8f8498]">
                      {item.desc || "No description added."}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-[10px] text-[#74687d]">
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={12} />
                        {item.location || "Bhopal"}
                      </span>
                      <span className="inline-flex items-center gap-1 text-amber-300">
                        <Star size={12} fill="currentColor" />
                        {item.rating || 5}/5
                      </span>
                      <span>{formatDate(item.createdAt)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => void handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-rose-300/15 bg-rose-300/[0.07] px-3 text-[10px] font-bold text-rose-300 transition hover:bg-rose-300/[0.12] disabled:opacity-50"
                  >
                    {deletingId === item.id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                    Delete
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="flex items-start gap-3 rounded-2xl border border-emerald-300/10 bg-emerald-300/[0.05] p-4 text-xs leading-6 text-emerald-100/80">
        <BadgeCheck size={18} className="mt-0.5 shrink-0 text-emerald-300" />
        Only upload completed BlinkUp work that you are comfortable showing
        publicly. Customer faces, phone numbers and private documents should
        not appear in project images.
      </div>
    </div>
  );
}

function AdminField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-[#c9becf]">{label}</span>
      {children}
    </label>
  );
}
