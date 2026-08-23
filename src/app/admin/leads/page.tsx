"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import {
  CalendarDays,
  ExternalLink,
  Filter,
  Inbox,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  RefreshCw,
  Search,
  UserRound,
  X,
} from "lucide-react";
import { db } from "../../../lib/firebase";

interface Lead {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  subService?: string;
  status?: string;
  location?: string;
  address?: string;
  mapLink?: string;
  message?: string;
  source?: string;
  createdAt?: any;
}

type LeadFilter =
  | "All"
  | "Today"
  | "New"
  | "Pending"
  | "Contacted"
  | "In Progress"
  | "Completed"
  | "Cancelled";

const filterOptions: LeadFilter[] = [
  "All",
  "Today",
  "New",
  "Pending",
  "Contacted",
  "In Progress",
  "Completed",
  "Cancelled",
];

function getLeadTime(createdAt: any): number {
  if (!createdAt) return 0;
  if (createdAt?.seconds) return createdAt.seconds * 1000;
  if (typeof createdAt?.toDate === "function") {
    return createdAt.toDate().getTime();
  }

  const parsedDate = new Date(createdAt).getTime();
  return Number.isNaN(parsedDate) ? 0 : parsedDate;
}

function formatLeadDate(createdAt: any): string {
  const time = getLeadTime(createdAt);
  if (!time) return "Not available";

  return new Date(time).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isTodayLead(createdAt: any): boolean {
  const time = getLeadTime(createdAt);
  if (!time) return false;
  return new Date(time).toDateString() === new Date().toDateString();
}

function cleanPhone(phone?: string) {
  return (phone || "").replace(/\D/g, "");
}

function getWhatsAppLink(phone?: string) {
  const number = cleanPhone(phone);
  if (!number) return "#";
  const indianNumber = number.length === 10 ? `91${number}` : number;
  const text = encodeURIComponent(
    "Hello, this is BlinkUp. We received your home-service request."
  );
  return `https://wa.me/${indianNumber}?text=${text}`;
}

function getMapLink(lead?: Lead | null) {
  if (!lead) return "";
  if (lead.mapLink) return lead.mapLink;
  const match = (lead.address || "").match(/https?:\/\/[^\s|]+/);
  return match?.[0] || "";
}

function getLeadStatus(lead: Lead) {
  return lead.status || "Pending";
}

function statusClass(status = "Pending") {
  if (status === "Completed") {
    return "border-emerald-300/15 bg-emerald-300/[0.08] text-emerald-300";
  }
  if (status === "In Progress") {
    return "border-sky-300/15 bg-sky-300/[0.08] text-sky-300";
  }
  if (status === "Contacted") {
    return "border-violet-300/15 bg-violet-300/[0.08] text-violet-300";
  }
  if (status === "Cancelled") {
    return "border-rose-300/15 bg-rose-300/[0.08] text-rose-300";
  }
  if (status === "New") {
    return "border-fuchsia-300/15 bg-fuchsia-300/[0.08] text-fuchsia-300";
  }
  return "border-amber-300/15 bg-amber-300/[0.08] text-amber-300";
}

function sourceClass(source = "website") {
  if (source.includes("chat")) {
    return "border-violet-300/15 bg-violet-300/[0.08] text-violet-300";
  }
  if (source.includes("review")) {
    return "border-fuchsia-300/15 bg-fuchsia-300/[0.08] text-fuchsia-300";
  }
  if (source.includes("contact")) {
    return "border-sky-300/15 bg-sky-300/[0.08] text-sky-300";
  }
  return "border-white/10 bg-white/[0.04] text-[#aaa0b2]";
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<LeadFilter>("All");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingLeadId, setSavingLeadId] = useState("");

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const snapshot = await getDocs(collection(db, "leads"));
      const leadsData = snapshot.docs
        .map<Lead>((document) => ({
          id: document.id,
          ...document.data(),
        }))
        .filter(
          (lead) =>
            lead.source !== "websiteAmcPage" &&
            lead.service !== "BlinkUp Home AMC"
        )
        .sort((a, b) => getLeadTime(b.createdAt) - getLeadTime(a.createdAt));

      setLeads(leadsData);
    } catch (fetchError) {
      console.error("Lead fetch error:", fetchError);
      setError("Leads load nahi hui. Connection check karke retry karein.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchLeads();
  }, [fetchLeads]);

  async function handleStatusChange(id: string, newStatus: string) {
    setSavingLeadId(id);
    setError("");

    try {
      await updateDoc(doc(db, "leads", id), { status: newStatus });
      setLeads((current) =>
        current.map((lead) =>
          lead.id === id ? { ...lead, status: newStatus } : lead
        )
      );
      setSelectedLead((current) =>
        current?.id === id ? { ...current, status: newStatus } : current
      );
    } catch (updateError) {
      console.error("Lead status update error:", updateError);
      setError("Status update nahi hua. Please retry.");
    } finally {
      setSavingLeadId("");
    }
  }

  const getFilterCount = useCallback(
    (filter: LeadFilter) => {
      if (filter === "All") return leads.length;
      if (filter === "Today") {
        return leads.filter((lead) => isTodayLead(lead.createdAt)).length;
      }
      return leads.filter((lead) => getLeadStatus(lead) === filter).length;
    },
    [leads]
  );

  const filtered = useMemo(() => {
    const queryText = search.trim().toLowerCase();

    return leads.filter((lead) => {
      const searchValues = [
        lead.name,
        lead.phone,
        lead.email,
        lead.service,
        lead.subService,
        lead.location,
        lead.address,
        lead.source,
        lead.status,
      ];
      const matchesSearch =
        !queryText ||
        searchValues.some((value) => value?.toLowerCase().includes(queryText));
      const matchesFilter =
        activeFilter === "All"
          ? true
          : activeFilter === "Today"
            ? isTodayLead(lead.createdAt)
            : getLeadStatus(lead) === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [activeFilter, leads, search]);

  return (
    <div className="space-y-5">
      <section className="flex flex-col justify-between gap-5 rounded-[1.75rem] border border-white/[0.08] bg-[#15101d] p-5 sm:flex-row sm:items-end sm:p-7">
        <div>
          <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#9b77f7]">
            <Inbox size={14} />
            Customer pipeline
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.045em]">
            Leads, without follow-up confusion.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#9f94a8]">
            Search, contact aur status update ek hi workspace se karein.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void fetchLeads()}
          disabled={loading}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-xs font-bold text-[#d6cdda] transition hover:bg-white/[0.08] disabled:opacity-60"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh leads
        </button>
      </section>

      {error && (
        <div
          className="rounded-2xl border border-rose-300/15 bg-rose-300/[0.07] p-4 text-sm text-rose-200"
          role="alert"
        >
          {error}
        </div>
      )}

      <section className="rounded-[1.75rem] border border-white/[0.08] bg-[#15101d] p-4 sm:p-5">
        <div className="relative">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#74687d]"
          />
          <input
            type="search"
            placeholder="Search name, mobile, service, area, source or status..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="field pl-11"
          />
        </div>

        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
          <span className="mr-1 inline-flex shrink-0 items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.13em] text-[#74687d]">
            <Filter size={14} />
            Filter
          </span>
          {filterOptions.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`inline-flex min-h-9 shrink-0 items-center gap-2 rounded-full border px-3 text-[11px] font-bold transition ${
                activeFilter === filter
                  ? "border-[#8f65f5]/40 bg-[#6d3ae6] text-white"
                  : "border-white/[0.08] bg-white/[0.025] text-[#9f94a8] hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              {filter}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[9px] ${
                  activeFilter === filter ? "bg-white/15" : "bg-white/[0.05]"
                }`}
              >
                {getFilterCount(filter)}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4 text-xs text-[#74687d]">
          <p>
            Showing <span className="font-bold text-white">{filtered.length}</span>{" "}
            of <span className="font-bold text-white">{leads.length}</span> leads
          </p>
          {activeFilter !== "All" && (
            <button
              type="button"
              onClick={() => setActiveFilter("All")}
              className="font-bold text-[#b99cff]"
            >
              Clear filter
            </button>
          )}
        </div>
      </section>

      {loading ? (
        <div className="flex min-h-72 items-center justify-center gap-3 rounded-[1.75rem] border border-white/[0.08] bg-[#15101d] text-sm text-[#8f8498]">
          <Loader2 size={20} className="animate-spin text-[#8f65f5]" />
          Loading customer leads...
        </div>
      ) : filtered.length === 0 ? (
        <div className="grid min-h-72 place-items-center rounded-[1.75rem] border border-white/[0.08] bg-[#15101d] p-8 text-center">
          <div>
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/[0.04] text-[#806f89]">
              <Inbox size={24} />
            </span>
            <p className="mt-4 font-bold">No matching leads</p>
            <p className="mt-2 text-xs text-[#806f89]">
              Search text ya filter change karke dekhein.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-3 lg:hidden">
            {filtered.map((lead) => (
              <article
                key={lead.id}
                className="rounded-[1.5rem] border border-white/[0.08] bg-[#15101d] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedLead(lead)}
                    className="min-w-0 text-left"
                  >
                    <p className="truncate font-bold">
                      {lead.name || "Customer"}
                    </p>
                    <p className="mt-1 text-xs text-[#9f94a8]">
                      {lead.service || "General enquiry"}
                    </p>
                  </button>
                  <span
                    className={`shrink-0 rounded-full border px-3 py-1.5 text-[9px] font-bold ${statusClass(
                      getLeadStatus(lead)
                    )}`}
                  >
                    {getLeadStatus(lead)}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl bg-white/[0.025] p-4 text-xs">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.1em] text-[#675c70]">
                      Mobile
                    </p>
                    <p className="mt-1 font-semibold text-[#c9becf]">
                      {lead.phone || "Missing"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.1em] text-[#675c70]">
                      Area
                    </p>
                    <p className="mt-1 truncate font-semibold text-[#c9becf]">
                      {lead.location || "Not shared"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.1em] text-[#675c70]">
                      Source
                    </p>
                    <p className="mt-1 truncate font-semibold capitalize text-[#c9becf]">
                      {lead.source || "website"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.1em] text-[#675c70]">
                      Received
                    </p>
                    <p className="mt-1 font-semibold text-[#c9becf]">
                      {formatLeadDate(lead.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedLead(lead)}
                    className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[#6d3ae6] text-xs font-bold"
                  >
                    View
                  </button>
                  <a
                    href={lead.phone ? `tel:${cleanPhone(lead.phone)}` : undefined}
                    className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] text-xs font-bold text-[#c9becf]"
                  >
                    <Phone size={14} />
                    Call
                  </a>
                  <a
                    href={getWhatsAppLink(lead.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl bg-[#25d366] text-xs font-bold text-[#062b15]"
                  >
                    <MessageCircle size={14} />
                    Chat
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="hidden overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#15101d] lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1120px] text-left">
                <thead>
                  <tr className="border-b border-white/[0.07] bg-white/[0.025] text-[10px] font-bold uppercase tracking-[0.1em] text-[#74687d]">
                    <th className="px-5 py-4">Customer</th>
                    <th className="px-5 py-4">Service</th>
                    <th className="px-5 py-4">Area</th>
                    <th className="px-5 py-4">Source</th>
                    <th className="px-5 py-4">Received</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {filtered.map((lead) => (
                    <tr
                      key={lead.id}
                      className="transition hover:bg-white/[0.025]"
                    >
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => setSelectedLead(lead)}
                          className="text-left"
                        >
                          <span className="block text-sm font-bold text-white">
                            {lead.name || "Customer"}
                          </span>
                          <span className="mt-1 block text-[10px] text-[#806f89]">
                            {lead.phone || "Mobile missing"}
                          </span>
                        </button>
                      </td>
                      <td className="max-w-56 px-5 py-4">
                        <p className="truncate text-sm font-semibold text-[#d1c6d5]">
                          {lead.service || "General enquiry"}
                        </p>
                        {lead.subService && (
                          <p className="mt-1 truncate text-[10px] text-[#74687d]">
                            {lead.subService}
                          </p>
                        )}
                      </td>
                      <td className="max-w-48 px-5 py-4">
                        <p className="truncate text-xs text-[#aaa0b2]">
                          {lead.location || lead.address || "Not shared"}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-[9px] font-bold capitalize ${sourceClass(
                            lead.source
                          )}`}
                        >
                          {lead.source || "website"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs text-[#8f8498]">
                        {formatLeadDate(lead.createdAt)}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-[9px] font-bold ${statusClass(
                            getLeadStatus(lead)
                          )}`}
                        >
                          {getLeadStatus(lead)}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedLead(lead)}
                            className="inline-flex min-h-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-3 text-[10px] font-bold text-[#c9becf] hover:bg-white/[0.07]"
                          >
                            View
                          </button>
                          <StatusSelect
                            value={getLeadStatus(lead)}
                            disabled={savingLeadId === lead.id}
                            onChange={(value) =>
                              void handleStatusChange(lead.id, value)
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {selectedLead && (
        <LeadModal
          lead={selectedLead}
          saving={savingLeadId === selectedLead.id}
          onClose={() => setSelectedLead(null)}
          onStatusChange={(status) =>
            void handleStatusChange(selectedLead.id, status)
          }
        />
      )}
    </div>
  );
}

function StatusSelect({
  value,
  disabled,
  onChange,
}: {
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
      className="min-h-9 rounded-xl border border-white/10 bg-[#211a2b] px-2 text-[10px] font-bold text-[#d1c6d5] outline-none focus:border-[#8f65f5] disabled:opacity-50"
      aria-label="Update lead status"
    >
      <option value="New">New</option>
      <option value="Pending">Pending</option>
      <option value="Contacted">Contacted</option>
      <option value="In Progress">In Progress</option>
      <option value="Completed">Completed</option>
      <option value="Cancelled">Cancelled</option>
    </select>
  );
}

function LeadModal({
  lead,
  saving,
  onClose,
  onStatusChange,
}: {
  lead: Lead;
  saving: boolean;
  onClose: () => void;
  onStatusChange: (value: string) => void;
}) {
  const mapLink = getMapLink(lead);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close lead details"
      />
      <div className="relative max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] border border-white/[0.09] bg-[#15101d] shadow-2xl sm:rounded-[2rem]">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/[0.07] bg-[#15101d]/95 p-5 backdrop-blur-xl sm:p-7">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8f65f5]">
              Customer lead
            </p>
            <h2
              id="lead-modal-title"
              className="mt-2 text-2xl font-bold tracking-[-0.035em]"
            >
              {lead.name || "Customer details"}
            </h2>
            <p className="mt-1 text-xs text-[#8f8498]">
              {lead.service || "General service enquiry"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/[0.05] text-[#a99dad] transition hover:bg-white/[0.09] hover:text-white"
            aria-label="Close details"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5 sm:p-7">
          <div className="flex flex-wrap gap-2">
            <span
              className={`rounded-full border px-3 py-1.5 text-[10px] font-bold capitalize ${sourceClass(
                lead.source
              )}`}
            >
              Source: {lead.source || "website"}
            </span>
            <span
              className={`rounded-full border px-3 py-1.5 text-[10px] font-bold ${statusClass(
                getLeadStatus(lead)
              )}`}
            >
              Status: {getLeadStatus(lead)}
            </span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Detail icon={<UserRound size={16} />} label="Name" value={lead.name} />
            <Detail icon={<Phone size={16} />} label="Mobile" value={lead.phone} />
            <Detail icon={<Mail size={16} />} label="Email" value={lead.email} />
            <Detail label="Service" value={lead.service} />
            <Detail label="Sub-service" value={lead.subService} />
            <Detail
              icon={<CalendarDays size={16} />}
              label="Received"
              value={formatLeadDate(lead.createdAt)}
            />
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-2">
            <DetailBox
              title="Area / location"
              icon={<MapPin size={16} />}
              content={lead.location || lead.address}
            />
            <DetailBox
              title="Full address"
              icon={<MapPin size={16} />}
              content={lead.address}
            />
          </div>

          <div className="mt-3">
            <DetailBox
              title="Customer message"
              icon={<MessageCircle size={16} />}
              content={lead.message}
              tall
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {lead.phone && (
              <>
                <a
                  href={`tel:${cleanPhone(lead.phone)}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#6d3ae6] px-4 text-xs font-bold text-white"
                >
                  <Phone size={16} />
                  Call customer
                </a>
                <a
                  href={getWhatsAppLink(lead.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#25d366] px-4 text-xs font-bold text-[#062b15]"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </>
            )}
            {mapLink && (
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-sky-300/15 bg-sky-300/[0.08] px-4 text-xs font-bold text-sky-300"
              >
                <ExternalLink size={16} />
                Open map
              </a>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 flex flex-col justify-between gap-3 border-t border-white/[0.07] bg-[#15101d]/95 p-5 backdrop-blur-xl sm:flex-row sm:items-center sm:p-7">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#8f8498]">
              Update status
            </span>
            <StatusSelect
              value={getLeadStatus(lead)}
              disabled={saving}
              onChange={onStatusChange}
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-5 text-xs font-bold text-[#c9becf]"
          >
            Close details
          </button>
        </div>
      </div>
    </div>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon?: ReactNode;
  label: string;
  value?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
      <p className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.11em] text-[#675c70]">
        {icon}
        {label}
      </p>
      <p className="mt-2 break-words text-sm font-semibold text-[#d6cdda]">
        {value || "Not shared"}
      </p>
    </div>
  );
}

function DetailBox({
  title,
  icon,
  content,
  tall = false,
}: {
  title: string;
  icon: ReactNode;
  content?: string;
  tall?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 ${
        tall ? "min-h-28" : ""
      }`}
    >
      <p className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.11em] text-[#675c70]">
        {icon}
        {title}
      </p>
      <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-[#c9becf]">
        {content || "Not shared"}
      </p>
    </div>
  );
}
