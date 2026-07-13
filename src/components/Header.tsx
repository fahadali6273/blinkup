"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* 🔹 Logo / Brand */}
        <Link href="/" className="text-2xl font-bold text-purple-700">
          BlinkUp
        </Link>

        {/* 🔸 Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link href="/" className="hover:text-purple-600 transition">Home</Link>
          <Link href="/#services" className="hover:text-purple-600 transition">Services</Link>
          <Link href="/contact" className="hover:text-purple-600 transition">Contact</Link>
        </nav>

        {/* 🔸 Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* 🔻 Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md border-t">
          <nav className="flex flex-col text-center py-2">
            <Link
              href="/"
              className="py-2 hover:text-purple-600"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/#services"
              className="py-2 hover:text-purple-600"
              onClick={() => setMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="py-2 hover:text-purple-600"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}



