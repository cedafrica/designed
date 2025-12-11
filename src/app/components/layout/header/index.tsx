"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { getImgPath } from "@/utils/pathUtils";

export default function Header() {
  const pathname = usePathname();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Sticky detection
  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on outside click
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setNavbarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "How It Works", href: "#how" },
    { name: "Features", href: "#features" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Security", href: "#security" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${
          sticky
            ? "backdrop-blur-xl bg-white/85 border-b border-black/10 shadow-lg"
            : "bg-transparent lg:bg-transparent bg-gradient-to-br from-[#001f3f] to-[#003b73]"
        }
      `}
    >
      {/* Background glow (desktop only, not sticky) */}
      {!sticky && (
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          <div className="absolute top-0 left-20 w-60 h-60 bg-blue-300/20 blur-3xl rounded-full"></div>
          <div className="absolute top-0 right-20 w-60 h-60 bg-primary/25 blur-3xl rounded-full"></div>
        </div>
      )}

      <div className="relative z-20 container mx-auto max-w-screen-xl px-6 py-5 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src={getImgPath("/images/logo/chuks.png")}
            alt="Chuks AI Logo"
            width={150}
            height={40}
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center space-x-10">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-base transition-all ${
                sticky
                  ? "text-black hover:text-primary"
                  : "text-white hover:text-primary"
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* DESKTOP CTA */}
        <div className="hidden lg:flex">
          <a
            href="#"
            className={`px-6 py-3 rounded-full text-sm font-semibold transition
              ${
                sticky
                  ? "bg-primary text-white hover:bg-blue-700"
                  : "bg-white text-primary hover:bg-gray-200"
              }
            `}
          >
            Start on WhatsApp
          </a>
        </div>

        {/* MOBILE MENU OPEN BUTTON */}
        <button
          onClick={() => setNavbarOpen(true)}
          className={`lg:hidden p-2 rounded-lg border 
            ${
              sticky
                ? "bg-black/10 border-black/20"
                : "bg-white/20 border-white/20"
            }
          `}
        >
          <Menu className={`w-6 h-6 ${sticky ? "text-black" : "text-white"}`} />
        </button>
      </div>

      {/* MOBILE SLIDE DRAWER */}
      <div
        ref={mobileMenuRef}
        className={`
          fixed top-0 right-0 h-full w-[75%] max-w-xs z-50
          bg-gradient-to-br from-[#001f3f] to-[#003b73] 
          text-white shadow-2xl
          transition-transform duration-300
          ${navbarOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Drawer Header */}
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Menu</h2>

          <button
            onClick={() => setNavbarOpen(false)}
            className="p-2 rounded-lg hover:bg-white/10"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <nav className="flex flex-col gap-6 px-6">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setNavbarOpen(false)}
              className={`text-lg font-medium transition 
                ${
                  pathname === item.href
                    ? "text-primary"
                    : "text-white"
                }
                hover:text-primary
              `}
            >
              {item.name}
            </a>
          ))}

          {/* MOBILE CTA */}
          <a
            href="#"
            className="mt-6 px-6 py-3 bg-white text-primary rounded-full text-center font-semibold hover:bg-gray-200 transition"
          >
            Start on WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
