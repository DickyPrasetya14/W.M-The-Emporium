"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatRupiah } from "@/lib/utils";
import Button from "@/components/Button";

export const CartDrawer: React.FC = () => {
  const { items, isCartOpen, closeCart, updateQuantity, removeItem, totalPrice, totalItems } = useCart();

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1F1813]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Slide-out Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#8C6F56] shadow-vintageDrawer flex flex-col transform transition-transform duration-300 ease-in-out">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#D8C7B5] bg-[#FAF6EE] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C59B4B]" />
              <h2 className="font-serif text-lg text-[#2A1D15] tracking-wide">
                Keranjang Belanja
              </h2>
              <span className="text-xs font-sans bg-[#2A1D15] text-[#FAF6EE] px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-[#5A4232] hover:text-[#2A1D15] hover:bg-[#EBDCCB]/50 rounded-[2px] transition-colors"
              aria-label="Tutup keranjang"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body - Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#EBDCCB]/40 border border-[#D8C7B5] flex items-center justify-center text-[#8C6F56]">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-serif text-lg text-[#2A1D15]">
                  Keranjang Masih Kosong
                </h3>
                <p className="text-xs text-[#78685A] font-sans max-w-xs mx-auto">
                  Belum ada artefak vintage yang Anda tambahkan. Temukan harta karun tempo dulu di galeri kami.
                </p>
                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={closeCart}
                    href="/shop"
                  >
                    Lihat Koleksi
                  </Button>
                </div>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-[#FAF6EE] border border-[#D8C7B5]/70 rounded-[2px] relative group"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-24 shrink-0 bg-[#EBDCCB]/30 rounded-[1px] overflow-hidden border border-[#D8C7B5]/50">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="80px"
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${product.id}`}
                          onClick={closeCart}
                          className="font-serif text-sm text-[#2A1D15] hover:text-[#8C6F56] transition-colors line-clamp-1 font-medium"
                        >
                          {product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-[#9E8B7A] hover:text-[#A64B2A] p-0.5 transition-colors"
                          title="Hapus dari keranjang"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-[10px] text-[#8C6F56] uppercase tracking-wider block font-sans">
                        {product.condition}
                      </span>
                      <span className="text-xs font-serif font-semibold text-[#2A1D15] mt-0.5 block">
                        {formatRupiah(product.price)}
                      </span>
                    </div>

                    {/* Quantity Selector & Subtotal */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#D8C7B5]/40">
                      <div className="flex items-center border border-[#8C6F56]/40 rounded-[2px] bg-[#FAF7F2]">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-1 text-[#2A1D15] hover:bg-[#EBDCCB]/40 transition-colors"
                          aria-label="Kurangi kuantitas"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-sans font-medium text-[#2A1D15] min-w-[20px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          disabled={quantity >= product.stock}
                          className="p-1 text-[#2A1D15] hover:bg-[#EBDCCB]/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          aria-label="Tambah kuantitas"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-serif font-bold text-[#2A1D15]">
                        {formatRupiah(product.price * quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#D8C7B5] bg-[#FAF6EE] space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-sans uppercase tracking-widest text-[#78685A]">
                  Subtotal Produk
                </span>
                <span className="font-serif text-xl font-bold text-[#2A1D15]">
                  {formatRupiah(totalPrice)}
                </span>
              </div>
              <p className="text-[11px] text-[#8C6F56] font-sans leading-relaxed">
                Biaya pengiriman dan konfirmasi pesanan diproses di halaman checkout atau via WhatsApp resmi.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <Button
                  variant="secondary"
                  size="md"
                  fullWidth
                  onClick={closeCart}
                  href="/cart"
                >
                  Lihat Keranjang
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={closeCart}
                  href="/checkout"
                  className="flex items-center justify-center gap-1.5"
                >
                  <span>Lanjut Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
