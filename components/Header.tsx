"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, Compass, Clock } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Beranda", href: "/" },
    { label: "Koleksi Toko", href: "/shop" },
    { label: "Promo 12.12", href: "/promo" },
    { label: "Tentang Kami", href: "/about" },
    { label: "Keranjang", href: "/cart" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-sm border-b border-[#D8C7B5]/70 transition-all">
      {/* Top Announcement Bar - Vintage Style */}
      <div className="bg-[#2A1D15] text-[#EBDCCB] text-[11px] py-1.5 px-4 border-b border-[#3A281E] tracking-widest text-center font-sans uppercase flex items-center justify-center gap-3">
        <span className="hidden sm:inline-flex items-center gap-1.5 opacity-75">
          <Clock className="w-3 h-3 text-[#C59B4B]" /> Est. 1924
        </span>
        <span className="hidden sm:inline text-[#C59B4B]">✦</span>
        <span>Koleksi Terkurasi & Autentik — Pengiriman Aman ke Seluruh Nusantara</span>
        <span className="hidden md:inline text-[#C59B4B]">✦</span>
        <span className="hidden md:inline opacity-75">Garansi Keaslian Vintage 100%</span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 border-b border-[#D8C7B5]/30">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#2A1D15] hover:text-[#C59B4B] transition-colors focus:outline-none"
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Left Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-serif text-sm tracking-widest transition-colors hover:text-[#C59B4B] py-1 border-b-2 ${
                pathname === "/"
                  ? "border-[#C59B4B] text-[#2A1D15] font-semibold"
                  : "border-transparent text-[#5A4232]"
              }`}
            >
              BERANDA
            </Link>
            <Link
              href="/shop"
              className={`font-serif text-sm tracking-widest transition-colors hover:text-[#C59B4B] py-1 border-b-2 ${
                pathname.startsWith("/shop")
                  ? "border-[#C59B4B] text-[#2A1D15] font-semibold"
                  : "border-transparent text-[#5A4232]"
              }`}
            >
              KOLEKSI
            </Link>
            <Link
              href="/promo"
              className={`font-serif text-sm tracking-widest transition-colors hover:text-[#C59B4B] py-1 border-b-2 relative flex items-center gap-1 ${
                pathname.startsWith("/promo")
                  ? "border-[#C59B4B] text-[#2A1D15] font-semibold"
                  : "border-transparent text-[#5A4232]"
              }`}
            >
              <span>PROMO</span>
              <span className="text-[9px] font-sans px-1 py-0.2 bg-[#C59B4B] text-[#1F1813] font-bold rounded-[2px]">
                12.12
              </span>
            </Link>
            <Link
              href="/about"
              className={`font-serif text-sm tracking-widest transition-colors hover:text-[#C59B4B] py-1 border-b-2 ${
                pathname === "/about"
                  ? "border-[#C59B4B] text-[#2A1D15] font-semibold"
                  : "border-transparent text-[#5A4232]"
              }`}
            >
              TENTANG
            </Link>
          </nav>

          {/* Centered Vintage Logo */}
          <div className="text-center">
            <Link href="/" className="inline-block group">
              <span className="block font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-[0.22em] text-[#2A1D15] group-hover:text-[#3D2C20] transition-colors">
                THE EMPORIUM
              </span>
              <span className="block font-sans text-[10px] sm:text-[11px] tracking-[0.35em] text-[#8C6F56] uppercase -mt-0.5">
                Timeless Goods for Modern Life
              </span>
            </Link>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#5A4232] hover:text-[#2A1D15] px-2.5 py-1 border border-[#D8C7B5] hover:border-[#8C6F56] rounded-[2px] transition-all bg-[#FAF6EE]"
              title="Jelajahi Produk"
            >
              <Compass className="w-3.5 h-3.5 text-[#C59B4B]" />
              <span className="tracking-wider uppercase text-[11px]">Katalog</span>
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative p-2 text-[#2A1D15] hover:text-[#C59B4B] transition-colors rounded-[2px] border border-transparent hover:border-[#D8C7B5]"
              aria-label={`Keranjang Belanja (${totalItems} barang)`}
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2A1D15] text-[#FAF6EE] border border-[#C59B4B] text-[10px] font-semibold font-sans w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF6EE] border-b border-[#D8C7B5] px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 font-serif text-base tracking-wider border-b border-[#EBDCCB] ${
                pathname === link.href
                  ? "text-[#2A1D15] font-semibold bg-[#EBDCCB]/30"
                  : "text-[#5A4232] hover:text-[#2A1D15]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openCart();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 bg-[#2A1D15] text-[#FAF6EE] rounded-[2px] font-sans text-xs uppercase tracking-widest"
            >
              <span>Buka Keranjang Belanja</span>
              <span className="bg-[#C59B4B] text-[#1F1813] text-[11px] font-bold px-2 py-0.5 rounded-full">
                {totalItems} item
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
