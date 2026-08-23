"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  CalendarDays,
  CheckCircle2,
  Inbox,
  Loader2,
  MapPin,
  MessageCircle,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { db } from "../../../lib/firebase";

type AmcStatus = "new" | "contacted" | "converted" | "closed";

interface AmcRequest {
  id: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  serviceArea?: string;
  serviceCity?: string;
  customerMessage?: string;
  planCode?: string;
  planSnapshot?: {
    name?: string;
    durationMonths?: number;
    offerPricePaise?: number;
  };
  source?: string;
  status?: AmcStatus;
  adminNote?: string;
  requestedAt?: any;
}

const statuses: AmcStatus[] = ["new", "contacted", "converted", "closed"];

function requestTime(value: any) {
  if (typeof value?.toDate === "function") return value.toDate().getTime();
  if (value?.seconds) return value.seconds * 1000;
  const parsed = new Date(value || 0).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
}

function formatDate(value: any) {
  const time = requestTime(value);
  if (!time) return "Not available";
  return new Date(time).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatPrice(value = 0) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value / 100);
}

function whatsappLink(phone = "", plan = "BlinkUp Home AMC") {
  const digits = phone.replace(/\D/g, "");
  const number = digits.length === 10 ? `91${digits}` : digits;
  const message = encodeURIComponent(
    `Hello, this is BlinkUp. Aapki ${plan} enquiry receive hui hai. Plan discuss karne ke liye hum aapse contact kar rahe hain.`
  );
  return `https://wa.me/${number}?text=${message}`;
}

function statusClass(status: AmcStatus) {
  if (status === "converted") {
    return "border-emerald-300/15 bg-emerald-300/[0.08] text-emerald-300";
  }
  if (status === "contacted") {
    return "border-sky-300/15 bg-sky-300/[0.08] text-sky-300";
  }
  if (status === "closed") {
    return "border-white/10 bg-white/[0.04] text-[#9f94a8]";
  }
  return "border-amber-300/15 bg-amber-300/[0.08] text-amber-300";
}

export default function AdminAmcPage() {
  const [requests, setRequests] = useState<AmcRequest[]>([]);
  const [filter, setFilter] = useState<"all" | AmcStatus>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<AmcRequest | null>(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const snapshot = await getDocs(collection(db, "membershipRequests"));
      const data = snapshot.docs
        .map((item) => ({ id: item.id, ...item.data() }) as AmcRequest)
        .sort((a, b) => requestTime(b.requestedAt) - requestTime(a.requestedAt));
      setRequests(data);
    } catch (fetchError) {
      console.error("AMC request fetch failed:", fetchError);
      setError("AMC enquiries load nahi hui. Admin access ya connection check karein.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchRequests();
  }, [fetchRequests]);

  const counts = useMemo(() => {
    const values: Record<string, number> = { all: requests.length };
    statuses.forEach((status) => {
      values[status] = requests.filter(
        (request) => (request.status || "new") === status
      ).length;
    });
    return values;
  }, [requests]);

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    return requests.filter((request) => {
      const currentStatus = request.status || "new";
      const matchesStatus = filter === "all" || currentStatus === filter;
      const matchesSearch =
        !term ||
        [
          request.customerName,
          request.customerPhone,
          request.customerEmail,
          request.serviceArea,
          request.planSnapshot?.name,
          request.source,
        ].some((value) => value?.toLowerCase().includes(term));
      return matchesStatus && matchesSearch;
    });
  }, [filter, requests, search]);

  async function saveStatus(request: AmcRequest, status: AmcStatus) {
    setSaving(true);
    setError("");
    try {
      await updateDoc(doc(db, "membershipRequests", request.id), {
        status,
        adminNote: note.trim() || null,
        updatedAt: serverTimestamp(),
        lastAdminActionAt: serverTimestamp(),
      });
      setRequests((current) =>
        current.map((item) =>
          item.id === request.id ? { ...item, status, adminNote: note } : item
        )
      );
      setSelected((current) =>
        current?.id === request.id ? { ...current, status, adminNote: note } : current
      );
    } catch (saveError) {
      console.error("AMC request update failed:", saveError);
      setError("AMC status update nahi hua. Please retry.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      <section className="flex flex-col justify-between gap-5 rounded-[1.75rem] border border-white/[0.08] bg-[radial-gradient(circle_at_90%_10%,rgba(16,185,129,0.11),transparent_26%),#15101d] p-5 sm:flex-row sm:items-end sm:p-7">
        <div>
          <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-300">
            <ShieldCheck size={14} /> Membership pipeline
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.045em]">
            AMC enquiries, clearly organised.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#9f94a8]">
            Website aur customer app se aayi home-care plan requests ek jagah.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void fetchRequests()}
          disabled={loading}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-xs font-bold text-[#d6cdda] transition hover:bg-white/[0.08] disabled:opacity-60"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh enquiries
        </button>
      </section>

      {error && (
        <div className="rounded-2xl border border-rose-300/15 bg-rose-300/[0.07] p-4 text-sm text-rose-200" role="alert">
          {error}
        </div>
      )}

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {(["all", ...statuses] as const).map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilter(status)}
            className={`rounded-[1.4rem] border p-4 text-left transition ${
              filter === status
                ? "border-emerald-300/30 bg-emerald-300/[0.09] text-white"
                : "border-white/[0.07] bg-[#15101d] text-[#9f94a8] hover:bg-white/[0.04]"
            }`}
          >
            <span className="block text-[9px] font-bold uppercase tracking-[0.12em]">
              {status}
            </span>
            <span className="mt-2 block text-3xl font-bold tracking-[-0.05em]">
              {counts[status] || 0}
            </span>
          </button>
        ))}
      </section>

      <section className="rounded-[1.75rem] border border-white/[0.08] bg-[#15101d] p-4 sm:p-5">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#74687d]" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="field pl-11"
            placeholder="Search name, mobile, Bhopal area, plan or source..."
          />
        </div>
        <p className="mt-4 text-xs text-[#74687d]">
          Showing <span className="font-bold text-white">{visible.length}</span> of {requests.length} enquiries
        </p>
      </section>

      {loading ? (
        <div className="flex min-h-72 items-center justify-center gap-3 rounded-[1.75rem] border border-white/[0.08] bg-[#15101d] text-sm text-[#8f8498]">
          <Loader2 size={20} className="animate-spin text-emerald-300" />
          Loading AMC enquiries...
        </div>
      ) : visible.length === 0 ? (
        <div className="grid min-h-72 place-items-center rounded-[1.75rem] border border-white/[0.08] bg-[#15101d] p-8 text-center">
          <div>
            <Inbox size={26} className="mx-auto text-[#806f89]" />
            <p className="mt-4 font-bold">No matching AMC enquiries</p>
            <p className="mt-2 text-xs text-[#74687d]">Search ya filter change karke dekhein.</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-3">
          {visible.map((request) => {
            const status = request.status || "new";
            return (
              <article key={request.id} className="rounded-[1.5rem] border border-white/[0.08] bg-[#15101d] p-5 transition hover:bg-white/[0.025]">
                <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold">{request.customerName || "Customer"}</h3>
                      <span className={`rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase ${statusClass(status)}`}>
                        {status}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[9px] font-semibold text-[#9f94a8]">
                        {request.source || "customerApp"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-emerald-300">
                      {request.planSnapshot?.name || request.planCode || "AMC plan"} · {formatPrice(request.planSnapshot?.offerPricePaise)}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#8f8498]">
                      <span className="flex items-center gap-1.5"><Phone size={14} />{request.customerPhone || "Not shared"}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={14} />{request.serviceArea || request.serviceCity || "Bhopal"}</span>
                      <span className="flex items-center gap-1.5"><CalendarDays size={14} />{formatDate(request.requestedAt)}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {request.customerPhone && (
                      <a href={`tel:${request.customerPhone}`} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-xs font-bold text-[#c9becf]"><Phone size={14} /> Call</a>
                    )}
                    {request.customerPhone && (
                      <a href={whatsappLink(request.customerPhone, request.planSnapshot?.name)} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#25d366] px-4 text-xs font-bold text-[#062b15]"><MessageCircle size={14} /> WhatsApp</a>
                    )}
                    <button type="button" onClick={() => { setSelected(request); setNote(request.adminNote || ""); }} className="inline-flex min-h-10 items-center rounded-xl bg-emerald-400 px-4 text-xs font-bold text-[#071d17]">
                      Open enquiry
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="dialog" aria-modal="true">
          <button type="button" className="absolute inset-0" onClick={() => setSelected(null)} aria-label="Close AMC enquiry" />
          <div className="relative max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-t-[2rem] border border-white/[0.09] bg-[#15101d] shadow-2xl sm:rounded-[2rem]">
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-white/[0.07] bg-[#15101d]/95 p-6 backdrop-blur-xl">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-300">AMC enquiry</p>
                <h2 className="mt-2 text-2xl font-bold">{selected.customerName || "Customer"}</h2>
              </div>
              <button type="button" onClick={() => setSelected(null)} className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.05] text-[#a99dad]" aria-label="Close"><X size={18} /></button>
            </div>
            <div className="space-y-5 p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Mobile", selected.customerPhone || "Not shared"],
                  ["Email", selected.customerEmail || "Not shared"],
                  ["Area", selected.serviceArea || selected.serviceCity || "Bhopal"],
                  ["Received", formatDate(selected.requestedAt)],
                  ["Plan", selected.planSnapshot?.name || selected.planCode || "Not shared"],
                  ["Offer", formatPrice(selected.planSnapshot?.offerPricePaise)],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                    <p className="text-[9px] font-bold uppercase tracking-[0.11em] text-[#675c70]">{label}</p>
                    <p className="mt-2 break-words text-sm font-semibold text-[#d6cdda]">{value}</p>
                  </div>
                ))}
              </div>
              {selected.customerMessage && (
                <div className="rounded-2xl border border-amber-300/10 bg-amber-300/[0.05] p-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.11em] text-amber-300">Customer note</p>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-[#c9becf]">{selected.customerMessage}</p>
                </div>
              )}
              <label className="block text-xs font-bold text-[#c9becf]">
                Admin follow-up note
                <textarea value={note} onChange={(event) => setNote(event.target.value.slice(0, 300))} rows={4} className="field mt-2 resize-none" placeholder="Call outcome, next follow-up, customer requirement..." />
              </label>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                  <button key={status} type="button" disabled={saving} onClick={() => void saveStatus(selected, status)} className={`rounded-xl border px-4 py-2 text-xs font-bold capitalize disabled:opacity-50 ${selected.status === status ? "border-emerald-300/30 bg-emerald-400 text-[#071d17]" : "border-white/10 bg-white/[0.04] text-[#c9becf]"}`}>
                    {status}
                  </button>
                ))}
              </div>
              <p className="flex items-start gap-2 text-[10px] leading-5 text-[#74687d]"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-300" />Website enquiry ko converted mark karne se pehle customer aur final activation manually confirm karein.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
