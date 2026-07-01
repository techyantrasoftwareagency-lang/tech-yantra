'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-2xl text-blue-600">
          Tech Yantra
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          <Link href="#services" className="hover:text-blue-600 transition">
            Services
          </Link>
          <Link href="#portfolio" className="hover:text-blue-600 transition">
            Portfolio
          </Link>
          <Link href="#blog" className="hover:text-blue-600 transition">
            Blog
          </Link>
          <Link href="#contact" className="hover:text-blue-600 transition">
            Contact
          </Link>
        </div>

        <Link href="#contact" className="hidden md:block btn btn-primary">
          Get Started
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t p-4 space-y-4">
          <Link href="#services" className="block hover:text-blue-600">
            Services
          </Link>
          <Link href="#portfolio" className="block hover:text-blue-600">
            Portfolio
          </Link>
          <Link href="#blog" className="block hover:text-blue-600">
            Blog
          </Link>
          <Link href="#contact" className="block hover:text-blue-600">
            Contact
          </Link>
          <Link href="#contact" className="block btn btn-primary text-center">
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
