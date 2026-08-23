"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BarChart3,
  ExternalLink,
  Images,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareHeart,
  ShieldCheck,
  Settings,
  UsersRound,
  X,
} from "lucide-react";

const links = [
  {
    href: "/admin/dashboard",
    label: "Overview",
    description: "Business snapshot",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/leads",
    label: "Leads",
    description: "Customer enquiries",
    icon: UsersRound,
  },
  {
    href: "/admin/gallery",
    label: "Work gallery",
    description: "Project uploads",
    icon: Images,
  },
  {
    href: "/admin/amc",
    label: "AMC enquiries",
    description: "Home-care plan leads",
    icon: ShieldCheck,
  },
  {
    href: "/admin/testimonials",
    label: "Reviews",
    description: "Moderate feedback",
    icon: MessageSquareHeart,
  },
  {
    href: "/admin/settings",
    label: "Settings",
    description: "Business details",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";
  const [menuOpen, setMenuOpen] = useState(false);
  const [authReady, setAuthReady] = useState(isLogin);

  useEffect(() => {
    setMenuOpen(false);

    if (isLogin) {
      setAuthReady(true);
      return;
    }

    const isLoggedIn = localStorage.getItem("adminAuth") === "true";

    if (!isLoggedIn) {
      router.replace("/admin/login");
      return;
    }

    setAuthReady(true);
  }, [isLogin, pathname, router]);

  function handleLogout() {
    localStorage.removeItem("adminAuth");
    router.replace("/admin/login");
  }

  if (isLogin) return <>{children}</>;

  if (!authReady) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#0e0a13]">
        <div className="text-center">
          <span className="mx-auto block h-10 w-10 animate-spin rounded-full border-2 border-[#6d3ae6] border-t-transparent" />
          <p className="mt-4 text-sm text-[#9f94a8]">Opening secure admin...</p>
        </div>
      </div>
    );
  }

  const activeLink =
    links.find((link) => pathname.startsWith(link.href)) ?? links[0];

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-20 items-center gap-3 border-b border-white/[0.07] px-5">
        <Image
          src="/images/blinkup-app-logo.png"
          alt=""
          width={46}
          height={46}
          className="h-[2.875rem] w-[2.875rem] rounded-2xl ring-1 ring-white/10"
        />
        <div>
          <p className="text-lg font-bold tracking-[-0.035em]">BlinkUp</p>
          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8f65f5]">
            Admin workspace
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1.5 overflow-y-auto p-3" aria-label="Admin navigation">
        <p className="px-3 pb-2 pt-2 text-[9px] font-bold uppercase tracking-[0.16em] text-[#675c70]">
          Manage business
        </p>
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-2xl px-3 py-3 transition ${
                active
                  ? "bg-[#6d3ae6] text-white shadow-lg shadow-[#6d3ae6]/20"
                  : "text-[#c6bbc9] hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                  active ? "bg-white/15" : "bg-white/[0.04]"
                }`}
              >
                <Icon size={19} />
              </span>
              <span>
                <span className="block text-sm font-bold">{link.label}</span>
                <span
                  className={`mt-0.5 block text-[10px] ${
                    active ? "text-white/70" : "text-[#776b80]"
                  }`}
                >
                  {link.description}
                </span>
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-white/[0.07] p-3">
        <Link
          href="/"
          target="_blank"
          className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] text-xs font-bold text-[#c6bbc9] transition hover:bg-white/[0.07] hover:text-white"
        >
          <ExternalLink size={16} />
          View live website
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-rose-400/10 text-xs font-bold text-rose-300 transition hover:bg-rose-400/15"
        >
          <LogOut size={16} />
          Secure logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0e0a13] text-white">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/[0.07] bg-[#15101d] lg:block">
        {sidebar}
      </aside>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close admin navigation"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <aside className="absolute inset-y-0 left-0 w-[88%] max-w-72 border-r border-white/[0.08] bg-[#15101d] shadow-2xl">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-xl bg-white/[0.06] text-[#c6bbc9]"
              aria-label="Close navigation"
            >
              <X size={19} />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-4 border-b border-white/[0.07] bg-[#0e0a13]/90 px-4 backdrop-blur-2xl sm:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/10 bg-[#211a2b] lg:hidden"
              aria-label="Open admin navigation"
            >
              <Menu size={20} />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#806f89]">
                <BarChart3 size={13} className="text-[#8f65f5]" />
                BlinkUp operations
              </div>
              <h1 className="mt-1 truncate text-lg font-bold tracking-[-0.025em] sm:text-xl">
                {activeLink.label}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full border border-emerald-300/15 bg-emerald-300/[0.07] px-3 py-2 text-[10px] font-bold text-emerald-300 sm:inline-flex">
              Live operations
            </span>
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[#8f65f5] to-[#4b249d] text-xs font-bold">
              FA
            </span>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[96rem] p-4 sm:p-7 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
