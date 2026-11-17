"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, ShieldCheck, Tag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatRupiah } from "@/lib/utils";
import Button from "@/components/Button";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    totalPrice,
    totalItems,
    appliedCoupon,
    discountAmount,
    finalPrice,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [couponSuccess, setCouponSuccess] = useState(false);

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    const result = applyCoupon(couponInput.trim().toUpperCase());
    setCouponMessage(result.message);
    setCouponSuccess(result.success);
    if (result.success) setCouponInput('');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-[#FAF6EE] border border-[#D8C7B5] flex items-center justify-center text-[#8C6F56] shadow-xs">
          <ShoppingBag className="w-10 h-10 opacity-70" />
        </div>
        <span className="text-xs uppercase tracking-[0.25em] text-[#8C6F56] font-sans block">
          Keranjang Kosong
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#2A1D15]">
          Belum Ada Artefak yang Disimpan
        </h1>
        <p className="text-xs sm:text-sm text-[#78685A] font-sans max-w-md mx-auto leading-relaxed">
          Koleksi Anda masih kosong. Setiap benda di The Emporium adalah artefak terpilih yang hanya tersedia dalam jumlah sangat terbatas.
        </p>
        <div className="pt-2">
          <Button variant="primary" size="lg" href="/shop">
            Mulai Menjelajahi Koleksi
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Heading */}
      <div className="border-b border-[#D8C7B5] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C6F56] font-sans block mb-1">
            Peti Belanja Anda
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#2A1D15]">
            Keranjang Belanja ({totalItems} item)
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-sans text-[#A64B2A] hover:text-[#782810] underline self-start sm:self-auto cursor-pointer"
        >
          Kosongkan Semua Keranjang
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Cart Item List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="p-4 sm:p-5 bg-[#FAF6EE] border border-[#D8C7B5] rounded-[2px] flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between shadow-xs"
            >
              {/* Product Thumbnail & Details */}
              <div className="flex gap-4 items-center min-w-0 flex-1">
                <div className="relative w-20 h-24 sm:w-24 sm:h-28 shrink-0 bg-[#EBDCCB]/30 rounded-[1px] overflow-hidden border border-[#D8C7B5]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="100px"
                    className="object-cover object-center"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-sans uppercase tracking-wider text-[#8C6F56] block">
                    {product.category}
                  </span>
                  <Link
                    href={`/product/${product.id}`}
                    className="font-serif text-base sm:text-lg text-[#2A1D15] hover:text-[#8C6F56] transition-colors font-medium line-clamp-1"
                  >
                    {product.name}
                  </Link>
                  <p className="text-[11px] font-sans text-[#78685A] mt-0.5">
                    Kondisi: <span className="text-[#2A1D15] font-medium">{product.condition}</span>
                  </p>
                  <p className="text-xs font-serif font-bold text-[#2A1D15] mt-1">
                    {formatRupiah(product.price)} / unit
                  </p>
                </div>
              </div>

              {/* Quantity Controls & Subtotal */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#D8C7B5]/50">
                {/* Quantity */}
                <div className="flex items-center border border-[#8C6F56] rounded-[2px] bg-[#FAF7F2]">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="p-1.5 text-[#2A1D15] hover:bg-[#EBDCCB]/50 transition-colors"
                    aria-label="Kurangi kuantitas"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-sans font-bold text-[#2A1D15] min-w-[28px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="p-1.5 text-[#2A1D15] hover:bg-[#EBDCCB]/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Tambah kuantitas"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[110px]">
                  <span className="text-[10px] uppercase tracking-wider text-[#78685A] block sm:hidden">
                    Subtotal
                  </span>
                  <span className="font-serif text-base font-bold text-[#2A1D15]">
                    {formatRupiah(product.price * quantity)}
                  </span>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(product.id)}
                  className="text-[#9E8B7A] hover:text-[#A64B2A] p-1.5 transition-colors"
                  title="Hapus dari keranjang"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Coupon Section */}
          <div className="mt-6 p-4 sm:p-5 bg-[#FAF6EE] border border-[#D8C7B5] rounded-[2px] shadow-xs space-y-3">
            <div className="flex items-center gap-2 border-b border-[#D8C7B5]/60 pb-3">
              <Tag className="w-4 h-4 text-[#8C6F56]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#8C6F56] font-sans font-medium">
                Kupon &amp; Diskon
              </span>
            </div>

            {appliedCoupon ? (
              <div className="text-[#5A7A5A] bg-[#F0F5F0] border border-[#AACAAA] rounded p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-xs font-sans">
                  ✓ Kupon <span className="font-bold font-mono">{appliedCoupon.code}</span> diterapkan — {appliedCoupon.title}
                </span>
                <button
                  onClick={() => {
                    removeCoupon();
                    setCouponMessage('');
                    setCouponSuccess(false);
                  }}
                  className="text-[#8C6F56] underline text-sm font-sans whitespace-nowrap self-start sm:self-auto"
                >
                  Hapus Kupon
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleApplyCoupon(); }}
                  placeholder="Masukkan Kode Kupon, contoh: WAREHOUSE20"
                  className="flex-1 px-3 py-2 text-xs font-sans bg-[#FAF7F2] border border-[#C4A882] rounded-[2px] text-[#2A1D15] placeholder-[#B8A898] focus:outline-none focus:border-[#8C6F56] focus:ring-1 focus:ring-[#8C6F56]/30 transition-colors uppercase tracking-wider"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 text-xs font-sans font-semibold uppercase tracking-wider bg-[#8C6F56] text-[#FAF6EE] hover:bg-[#6B5240] rounded-[2px] transition-colors whitespace-nowrap"
                >
                  Terapkan
                </button>
              </div>
            )}

            {couponMessage && (
              <p className={`text-xs font-sans ${couponSuccess ? 'text-[#5A7A5A]' : 'text-[#8C3A2A]'}`}>
                {couponMessage}
              </p>
            )}
          </div>

          {/* Continue Shopping Link */}
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-xs font-sans text-[#8C6F56] hover:text-[#2A1D15] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali Memilih Artefak Lain</span>
            </Link>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="lg:col-span-4 bg-[#FAF6EE] border border-[#D8C7B5] p-6 rounded-[2px] shadow-xs space-y-6">
          <h2 className="font-serif text-xl text-[#2A1D15] border-b border-[#D8C7B5] pb-3">
            Ringkasan Pesanan
          </h2>

          <div className="space-y-3 text-xs font-sans text-[#5A4232]">
            <div className="flex justify-between">
              <span>Subtotal ({totalItems} barang)</span>
              <span className="font-serif font-medium text-[#2A1D15]">
                {formatRupiah(totalPrice)}
              </span>
            </div>

            {appliedCoupon && discountAmount > 0 && (
              <div className="flex justify-between text-[#5A7A5A]">
                <span>Diskon ({appliedCoupon.code})</span>
                <span className="font-serif font-medium">
                  &minus;{formatRupiah(discountAmount)}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Pengemasan Peti &amp; Bubble Tebal</span>
              <span className="text-[#C59B4B] font-semibold">Gratis</span>
            </div>
            <div className="flex justify-between">
              <span>Ongkos Kirim</span>
              <span className="text-[#8C6F56] italic">Dikonfirmasi saat WhatsApp</span>
            </div>

            <div className="pt-4 border-t border-[#D8C7B5] flex justify-between items-baseline">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#78685A] block">
                  Total Pembayaran
                </span>
                <span className="font-serif text-2xl font-bold text-[#2A1D15]">
                  {formatRupiah(finalPrice)}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 space-y-3">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              href="/checkout"
              className="flex items-center justify-center gap-2 py-4"
            >
              <span>Lanjut ke Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              size="md"
              fullWidth
              href="/shop"
            >
              Tambah Barang Lagi
            </Button>
          </div>

          <div className="pt-4 border-t border-[#D8C7B5]/60 text-[11px] font-sans text-[#78685A] space-y-2">
            <div className="flex items-center gap-2 text-[#2A1D15]">
              <ShieldCheck className="w-4 h-4 text-[#C59B4B]" />
              <span className="font-medium">Jaminan Kerusakan Pengiriman</span>
            </div>
            <p className="leading-relaxed">
              Jika paket mengalami kerusakan saat diterima, kami memberikan garansi perbaikan atau penggantian senilai harga barang.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
