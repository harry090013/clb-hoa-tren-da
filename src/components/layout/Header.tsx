"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, Sparkles } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Về chúng tôi", href: "/ve-chung-toi" },
    { name: "Hoạt động", href: "/hoat-dong" },
    { name: "Dự án", href: "/du-an" },
    { name: "Hành trình", href: "/hanh-trinh" },
    { name: "Minh bạch", href: "/minh-bach" },
    { name: "Liên hệ", href: "/lien-he" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <img
                src="/logo_clb_hoatrenda.jpg"
                alt="Hoa Trên Đá Logo"
                className="w-10 h-10 rounded-full object-cover shadow-md group-hover:opacity-90 transition-opacity duration-200"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-primary leading-tight tracking-wide font-sans">
                  HOA TRÊN ĐÁ
                </span>
                <span className="text-[11px] sm:text-xs text-gray-500 font-medium tracking-tight">
                  Từ đá nở hoa, từ tâm lan tỏa
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? "text-accent border-b-2 border-accent pb-1"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <Link
              href="/dong-hanh"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-bold text-white bg-accent hover:bg-accent-dark shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <Heart className="w-4 h-4 mr-2 fill-current" />
              Đồng hành
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-primary hover:bg-gray-50 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Mở menu chính</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 rounded-md text-base font-semibold ${
                    isActive
                      ? "text-accent bg-pink-50"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-4 pb-2 px-3">
              <Link
                href="/dong-hanh"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center px-4 py-3 rounded-full text-base font-bold text-white bg-accent hover:bg-accent-dark shadow-md"
              >
                <Heart className="w-5 h-5 mr-2 fill-current" />
                Đồng hành
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
