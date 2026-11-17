import React from "react";
import Link from "next/link";
import { ShieldCheck, Truck, Clock, MapPin, Phone, Mail } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#231811] text-[#EBDCCB] border-t-2 border-[#8C6F56]/60 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Proposition Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 mb-12 border-b border-[#3A281E]">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#2E2016] border border-[#8C6F56]/40 rounded-[2px] text-[#C59B4B] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base text-[#FAF6EE] tracking-wide">
                Autentisitas Terjamin
              </h4>
              <p className="text-xs text-[#9E8B7A] mt-1 font-sans leading-relaxed">
                Setiap artefak dan pakaian vintage diperiksa cermat untuk memastikan keaslian era dan kondisinya.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#2E2016] border border-[#8C6F56]/40 rounded-[2px] text-[#C59B4B] shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base text-[#FAF6EE] tracking-wide">
                Pengemasan Kolektor
              </h4>
              <p className="text-xs text-[#9E8B7A] mt-1 font-sans leading-relaxed">
                Pengemasan protektif berlapis dengan kardus kokoh dan pelindung ekstra khusus barang antik.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#2E2016] border border-[#8C6F56]/40 rounded-[2px] text-[#C59B4B] shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base text-[#FAF6EE] tracking-wide">
                Layanan Personal WhatsApp
              </h4>
              <p className="text-xs text-[#9E8B7A] mt-1 font-sans leading-relaxed">
                Konsultasi langsung detail fisik produk, video cek kondisi, dan konfirmasi pengiriman via WhatsApp.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#3A281E]">
          {/* Brand Intro */}
          <div className="md:col-span-5 space-y-4">
            <span className="block font-serif text-2xl font-normal tracking-[0.2em] text-[#FAF6EE]">
              THE EMPORIUM
            </span>
            <p className="font-sans text-xs text-[#9E8B7A] tracking-wider uppercase">
              Timeless Goods for Modern Life — Sejak 1924
            </p>
            <p className="font-sans text-xs text-[#C7B5A3] leading-relaxed max-w-sm">
              Rumah kurasi bagi para pencinta estetika klasik. Kami mengumpulkan artefak masa lalu, jam saku mekanik, pakaian wol bersejarah, dan barang dekorasi langka yang membawa jiwa keabadian ke dalam ruang modern Anda.
            </p>
            <div className="pt-2 text-xs text-[#C59B4B] flex items-center gap-2 font-serif">
              <span>✦</span>
              <span>Koleksi Terbatas & Bernilai Nostalgia</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="font-serif text-sm tracking-widest text-[#FAF6EE] uppercase border-b border-[#3A281E] pb-2">
              Jelajahi
            </h5>
            <ul className="space-y-2 text-xs font-sans text-[#C7B5A3]">
              <li>
                <Link href="/" className="hover:text-[#C59B4B] transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#C59B4B] transition-colors">
                  Semua Koleksi
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#C59B4B] transition-colors">
                  Cerita Toko
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-[#C59B4B] transition-colors">
                  Keranjang Belanja
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-[#C59B4B] transition-colors">
                  Penyelesaian Pesanan
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="font-serif text-sm tracking-widest text-[#FAF6EE] uppercase border-b border-[#3A281E] pb-2">
              Kategori
            </h5>
            <ul className="space-y-2 text-xs font-sans text-[#C7B5A3]">
              <li>
                <Link href="/shop?category=Vintage+Fashion" className="hover:text-[#C59B4B] transition-colors">
                  Vintage Fashion
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Retro+Accessories" className="hover:text-[#C59B4B] transition-colors">
                  Retro Accessories
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Antique+Decor" className="hover:text-[#C59B4B] transition-colors">
                  Antique Decor
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Classic+Goods" className="hover:text-[#C59B4B] transition-colors">
                  Classic Goods
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Workshop */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-serif text-sm tracking-widest text-[#FAF6EE] uppercase border-b border-[#3A281E] pb-2">
              Galeri & Kontak
            </h5>
            <div className="space-y-2.5 text-xs font-sans text-[#C7B5A3]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C59B4B] shrink-0 mt-0.5" />
                <span>Jl. Galeri Purbakala No. 42, Kawasan Cagar Budaya, Jakarta</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C59B4B] shrink-0" />
                <span>WhatsApp: +62 812-3456-7890</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C59B4B] shrink-0" />
                <span>layanan@the-emporium.id</span>
              </div>
              <div className="pt-2 text-[11px] text-[#9E8B7A] border-t border-[#3A281E]/60">
                Buka: Selasa - Minggu, 10:00 - 19:00 WIB
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7A6B] font-sans gap-4">
          <p>
            © {new Date().getFullYear()} The Emporium. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div className="flex items-center space-x-6 text-[11px]">
            <span>Kurasi Otentik</span>
            <span>•</span>
            <span>Estetika Masa Lalu</span>
            <span>•</span>
            <span>Kualitas Abadi</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
