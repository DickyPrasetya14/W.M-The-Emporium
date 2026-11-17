import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata = {
  title: "Penyelesaian Pesanan | The Emporium",
  description: "Formulir penyelesaian pesanan resmi The Emporium via WhatsApp.",
};

export default function CheckoutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-sans text-[#8C6F56]">
        <Link href="/" className="hover:text-[#2A1D15] transition-colors">
          Beranda
        </Link>
        <ChevronRight className="w-3.5 h-3.5 opacity-60" />
        <Link href="/cart" className="hover:text-[#2A1D15] transition-colors">
          Keranjang
        </Link>
        <ChevronRight className="w-3.5 h-3.5 opacity-60" />
        <span className="text-[#2A1D15] font-medium">Checkout</span>
      </nav>

      {/* Page Title */}
      <div className="text-center max-w-xl mx-auto pt-2 pb-4">
        <span className="text-xs uppercase tracking-[0.3em] text-[#8C6F56] font-sans block mb-1">
          Langkah Terakhir
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#2A1D15]">
          Penyelesaian Pesanan
        </h1>
        <div className="ornament-divider" />
        <p className="font-sans text-xs sm:text-sm text-[#78685A]">
          Isi alamat pengiriman dan pilih metode pembayaran. Rincian pesanan akan disiapkan untuk konfirmasi langsung via WhatsApp kurator.
        </p>
      </div>

      {/* Interactive Checkout Form */}
      <CheckoutForm />

    </div>
  );
}
