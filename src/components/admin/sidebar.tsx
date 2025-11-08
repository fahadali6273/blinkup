'use client';

import Link from 'next/link';
import { BarChart, Image as ImageIcon, ClipboardList, LogOut } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg p-6 hidden md:block">
      <h1 className="text-2xl font-bold text-purple-600 mb-10">BlinkUp Admin</h1>

      <nav className="space-y-3">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-600"
        >
          <BarChart size={18} />
          Dashboard
        </Link>

        <Link
          href="/admin/leads"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-600"
        >
          <ClipboardList size={18} />
          Leads
        </Link>

        <Link
          href="/admin/gallery"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-600"
        >
          <ImageIcon size={18} />
          Recent Work
        </Link>
      </nav>

      <button className="mt-10 flex items-center gap-2 text-red-500 hover:underline">
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}
