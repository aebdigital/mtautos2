"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/ponuka", label: "Ponuka" },
  { href: "/dovoz", label: "Dovoz" },
  { href: "/leasing", label: "Leasing" },
  { href: "/vykup", label: "Výkup" },
  { href: "/pzp", label: "Poistenie" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-white/90 text-black shadow-sm backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 py-4">
        <Link href="/" aria-label="MT AUTOS domov" className="flex items-center">
          <img src="/logo-removebg-preview (1).png" alt="MT AUTOS" className="h-12 w-auto md:h-16" />
        </Link>

        <nav className="hidden h-full items-center md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex h-full items-center px-4 font-jost font-bold text-black hover:text-gray-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center">
          <img src="/header baner.jpg" alt="MT AUTOS Banner" className="hidden h-12 w-auto md:block" />
          <button
            type="button"
            className="ml-4 rounded p-2 md:hidden"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Otvoriť menu"
          >
            <Menu className="h-8 w-8" />
          </button>
        </div>
      </div>

      <div
        className={`fixed left-0 top-0 z-[60] h-[100dvh] w-full transform bg-white transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between border-b border-gray-100 bg-white px-4 py-4">
          <Link href="/" onClick={() => setIsMenuOpen(false)} aria-label="MT AUTOS domov">
            <img src="/logo-removebg-preview (1).png" alt="MT AUTOS" className="h-12 w-auto" />
          </Link>
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="rounded p-2"
            aria-label="Zavrieť menu"
          >
            <X className="h-8 w-8" />
          </button>
        </div>

        <nav className="flex h-full flex-col gap-5 bg-white p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-jost text-5xl font-bold text-black hover:text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
