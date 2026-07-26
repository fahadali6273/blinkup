"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  Images,
  Inbox,
  Loader2,
  RefreshCw,
  Sparkles,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { db } from "../../../lib/firebase";

interface Lead {
  id: string;
  name?: string;
  phone?: string;
  service?: string;
  subService?: string;
  location?: string;
  address?: string;
  status?: string;
  source?: string;
  createdAt?: any;
}

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
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusClass(status = "Pending") {
  if (status === "Completed") {
    return "border-emerald-300/15 bg-emerald-300/[0.08] text-emerald-300";
  }
  if (status === "In Progress") {
    return "border-sky-300/15 bg-sky-300/[0.08] text-sky-300";
  }
  if (status === "Cancelled") {
    return "border-rose-300/15 bg-rose-300/[0.08] text-rose-300";
  }
  if (status === "Contacted") {
    return "border-violet-300/15 bg-violet-300/[0.08] text-violet-300";
  }
  return "border-amber-300/15 bg-amber-300/[0.08] text-amber-300";
}

export default function Dashboard() {
  const [allLeads, setAllLeads] = useState<Lead[]>([]);
  const [recentWork, setRecentWork] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [leadSnap, workSnap] = await Promise.all([
        getDocs(collection(db, "leads")),
        getDocs(collection(db, "gallery")),
      ]);

      const leadsData = leadSnap.docs
        .map<Lead>((document) => ({
          id: document.id,
          ...document.data(),
        }))
        .sort((a, b) => getLeadTime(b.createdAt) - getLeadTime(a.createdAt));

      setAllLeads(leadsData);
      setRecentWork(workSnap.size);
    } catch (fetchError) {
      console.error("Dashboard data fetch error:", fetchError);
      setError("Dashboard data load nahi hua. Connection check karke retry karein.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const stats = useMemo(() => {
    const completed = allLeads.filter(
      (lead) => lead.status === "Completed"
    ).length;
    const active = allLeads.filter(
      (lead) => lead.status !== "Completed" && lead.status !== "Cancelled"
    ).length;
    const today = allLeads.filter((lead) => {
      const timestamp = getLeadTime(lead.createdAt);
      if (!timestamp) return false;
      const leadDate = new Date(timestamp);
      const now = new Date();
      return leadDate.toDateString() === now.toDateString();
    }).length;

    return { completed, active, today };
  }, [allLeads]);

  const cards = [
    {
      label: "Total leads",
      value: allLeads.length,
      helper: `${stats.today} received today`,
      icon: UsersRound,
      accent: "from-[#6d3ae6] to-[#8f65f5]",
    },
    {
      label: "Active pipeline",
      value: stats.active,
      helper: "Needs follow-up",
      icon: CalendarClock,
      accent: "from-[#8653d8] to-[#a879f1]",
    },
    {
      label: "Completed",
      value: stats.completed,
      helper: "Closed successfully",
      icon: BadgeCheck,
      accent: "from-[#167b64] to-[#35b78f]",
    },
    {
      label: "Gallery projects",
      value: recentWork,
      helper: "Published work",
      icon: Images,
      accent: "from-[#9c5d28] to-[#dc9450]",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-5 rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-[#211a2b] to-[#15101d] p-6 sm:flex-row sm:items-end sm:p-8">
        <div>
          <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#9b77f7]">
            <Sparkles size={14} />
            Daily business snapshot
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.045em] sm:text-4xl">
            Good decisions start with a clear view.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#a99dad]">
            New enquiries, active follow-ups aur completed work ka current
            overview.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void fetchData()}
          disabled={loading}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-xs font-bold text-[#d6cdda] transition hover:bg-white/[0.08] disabled:opacity-60"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh data
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

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.label}
              className="relative overflow-hidden rounded-[1.65rem] border border-white/[0.08] bg-[#18121f] p-5"
            >
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.accent}`}
              />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-[#93879b]">
                    {card.label}
                  </p>
                  <p className="mt-3 text-4xl font-bold tracking-[-0.05em]">
                    {loading ? "..." : card.value}
                  </p>
                  <p className="mt-2 text-[10px] text-[#74687d]">
                    {card.helper}
                  </p>
                </div>
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${card.accent} text-white shadow-lg`}
                >
                  <Icon size={22} />
                </span>
              </div>
            </article>
          );
        })}
      </section>

      <section className="overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#15101d]">
        <div className="flex flex-col justify-between gap-4 border-b border-white/[0.07] p-5 sm:flex-row sm:items-center sm:p-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#806f89]">
              Latest activity
            </p>
            <h2 className="mt-2 text-xl font-bold">Recent customer leads</h2>
          </div>
          <Link
            href="/admin/leads"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#6d3ae6]/15 px-4 text-xs font-bold text-[#b99cff] transition hover:bg-[#6d3ae6]/25"
          >
            Open lead manager
            <ArrowRight size={15} />
          </Link>
        </div>

        {loading ? (
          <div className="flex min-h-56 items-center justify-center gap-3 text-sm text-[#8f8498]">
            <Loader2 size={20} className="animate-spin text-[#8f65f5]" />
            Loading business activity...
          </div>
        ) : allLeads.length === 0 ? (
          <div className="grid min-h-64 place-items-center p-8 text-center">
            <div>
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/[0.04] text-[#806f89]">
                <Inbox size={24} />
              </span>
              <p className="mt-4 font-bold">No leads yet</p>
              <p className="mt-2 text-xs text-[#806f89]">
                New website enquiries will appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.06]">
            {allLeads.slice(0, 8).map((lead) => (
              <article
                key={lead.id}
                className="grid gap-4 p-5 transition hover:bg-white/[0.025] sm:grid-cols-[1.2fr_1fr_0.8fr_auto] sm:items-center sm:p-6"
              >
                <div className="min-w-0">
                  <p className="truncate font-bold">
                    {lead.name || "Customer"}
                  </p>
                  <a
                    href={lead.phone ? `tel:${lead.phone}` : undefined}
                    className="mt-1 block text-xs text-[#9f94a8] hover:text-white"
                  >
                    {lead.phone || "Mobile not shared"}
                  </a>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#d1c6d5]">
                    {lead.service || "General enquiry"}
                  </p>
                  <p className="mt-1 truncate text-[10px] text-[#74687d]">
                    {lead.location || lead.address || "Location not shared"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#a99dad]">
                    {formatLeadDate(lead.createdAt)}
                  </p>
                  <p className="mt-1 text-[10px] capitalize text-[#74687d]">
                    {lead.source || "website"}
                  </p>
                </div>
                <span
                  className={`w-fit rounded-full border px-3 py-1.5 text-[10px] font-bold ${statusClass(
                    lead.status
                  )}`}
                >
                  {lead.status || "Pending"}
                </span>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Follow up active leads",
            text: `${stats.active} customers currently need an update.`,
            href: "/admin/leads",
            icon: TrendingUp,
          },
          {
            title: "Add completed work",
            text: "Keep the public gallery fresh and credible.",
            href: "/admin/gallery",
            icon: Images,
          },
          {
            title: "Moderate reviews",
            text: "Verify customer feedback before publishing.",
            href: "/admin/testimonials",
            icon: BadgeCheck,
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.href}
              className="group flex items-start gap-4 rounded-[1.5rem] border border-white/[0.07] bg-white/[0.025] p-5 transition hover:border-[#8f65f5]/30 hover:bg-[#6d3ae6]/[0.07]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#6d3ae6]/15 text-[#b99cff]">
                <Icon size={20} />
              </span>
              <div>
                <p className="text-sm font-bold">{item.title}</p>
                <p className="mt-2 text-xs leading-5 text-[#806f89]">
                  {item.text}
                </p>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
