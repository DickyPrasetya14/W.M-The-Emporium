"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Ticket,
  Copy,
  Check,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Tag,
  ShieldCheck,
  Clock,
  Eye,
} from "lucide-react";
import PromoBanner from "@/components/PromoBanner";
import Button from "@/components/Button";
import { COUPONS, Coupon } from "@/data/coupons";
import { fetchProducts } from "@/lib/supabase";
import { Product } from "@/types";
import { formatRupiah } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

// Peta diskon per kategori sesuai event Warehouse Cleaner 12.12
const CATEGORY_DISCOUNT_PERCENT: Record<string, number> = {
  "Vintage Fashion": 20,
  "Retro Accessories": 15,
  "Antique Decor": 25,
  "Classic Goods": 10,
};

export default function PromoPage() {
  const { addItem } = useCart();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // Ambil 12 produk Best Seller atau Rare dari Supabase (atau fallback dummy)
  useEffect(() => {
    let isMounted = true;
    setIsLoadingProducts(true);

    fetchProducts()
      .then((all) => {
        if (!isMounted) return;
        // Prioritaskan yang bertag 'Best Seller' atau 'Rare'
        const filtered = all.filter(
          (p) => p.tag === "Best Seller" || p.tag === "Rare"
        );
        const finalList =
          filtered.length >= 12
            ? filtered.slice(0, 12)
            : [...filtered, ...all.filter((p) => p.tag !== "Best Seller" && p.tag !== "Rare")].slice(0, 12);
        setSaleProducts(finalList);
      })
      .catch((err) => {
        console.warn("Gagal memuat produk promo:", err);
      })
      .finally(() => {
        if (isMounted) setIsLoadingProducts(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCopyCode = (code: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => {
        setCopiedCode((prev) => (prev === code ? null : prev));
      }, 3000);
    }
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. Flash Sale 12.12 Banner di Paling Atas */}
      <PromoBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Page Title & Philosophy */}
        <div className="text-center max-w-3xl mx-auto pt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF6EE] border border-[#8C6F56]/40 rounded-[2px] text-xs font-sans tracking-[0.25em] uppercase text-[#8C6F56] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B4B]" />
            <span>Warehouse Cleaner Event</span>
            <span className="text-[#C59B4B]">✦</span>
            <span>Desember 2026</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-[#2A1D15] leading-tight">
            Promo dan Warehouse Cleaner Event
          </h1>
          <div className="ornament-divider" />
          <p className="font-sans text-xs sm:text-sm text-[#78685A] leading-relaxed">
            Menjelang akhir tahun, kurator The Emporium membuka pintu ruang simpanan terdalam. Kami melepaskan ratusan artefak pilihan dengan potongan harga istimewa melalui kupon diskon dan harga khusus Flash Sale 12.12.
          </p>
        </div>

        {/* =========================================================================
            2. VINTAGE TICKETS COUPONS SECTION (#kupon)
           ========================================================================= */}
        <section id="kupon" className="space-y-8 scroll-mt-28">
          <div className="border-b border-[#D8C7B5] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#8C6F56] font-sans block mb-1">
                Kupon Resmi Toko
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#2A1D15]">
                Tiket Kupon Diskon Per Kategori
              </h2>
            </div>
            <p className="text-xs text-[#78685A] font-sans">
              Salin kode kupon dan terapkan di halaman Keranjang belanja Anda.
            </p>
          </div>

          {/* Grid 5 Kupon Bertema Tiket Kertas Tua */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COUPONS.map((coupon: Coupon) => {
              const isCopied = copiedCode === coupon.code;
              const isMainFlashSale = coupon.code === "EMPORIUM30";
              const targetCategory =
                coupon.category === "Semua Kategori" ? "All" : coupon.category;

              return (
                <div
                  key={coupon.code}
                  className={`relative bg-[#FAF6EE] border rounded-[2px] shadow-sm hover:shadow-vintage transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                    isMainFlashSale
                      ? "border-[#C59B4B] ring-1 ring-[#C59B4B]/50 bg-gradient-to-b from-[#FAF6EE] to-[#F5ECE0]"
                      : "border-[#8C6F56]/60"
                  }`}
                >
                  {/* Decorative Ticket Perforation Semicircles (Left and Right) */}
                  <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#FAF7F2] border-r border-[#8C6F56]/60 z-10" />
                  <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#FAF7F2] border-l border-[#8C6F56]/60 z-10" />

                  {/* Header / Stub */}
                  <div className="p-5 pb-4 border-b border-dashed border-[#8C6F56]/40 relative">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#8C6F56]">
                        {coupon.category}
                      </span>
                      {isMainFlashSale ? (
                        <span className="px-2 py-0.5 bg-[#2A1D15] text-[#DFC183] border border-[#C59B4B] text-[10px] font-sans uppercase font-bold rounded-[2px]">
                          Flash Sale 12.12
                        </span>
                      ) : (
                        <span className="text-[10px] font-serif text-[#C59B4B] flex items-center gap-1">
                          <Ticket className="w-3 h-3" /> Kupon Resmi
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-lg text-[#2A1D15] leading-snug font-semibold">
                      {coupon.title}
                    </h3>
                    <p className="text-xs text-[#5A4232] font-sans mt-1 line-clamp-2 leading-relaxed">
                      {coupon.description}
                    </p>
                  </div>

                  {/* Perforation Line Indicator */}
                  <div className="relative border-t border-dashed border-[#8C6F56]/40 mx-3 my-0">
                    <span className="absolute left-1/2 -translate-x-1/2 -top-2 bg-[#FAF6EE] px-2 text-[9px] font-sans uppercase tracking-widest text-[#8C6F56]/80">
                      Gunting / Klaim di Sini
                    </span>
                  </div>

                  {/* Body & Coupon Code Stamp */}
                  <div className="p-5 pt-4 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Big Coupon Code Box */}
                      <div className="flex items-center justify-between bg-[#24170F] text-[#FAF6EE] border border-[#C59B4B]/60 p-2.5 rounded-[2px] shadow-inner mb-3">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-[#C59B4B]" />
                          <span className="font-mono text-base sm:text-lg font-bold tracking-[0.2em] text-[#DFC183]">
                            {coupon.code}
                          </span>
                        </div>

                        <span className="text-[10px] font-sans uppercase text-[#C59B4B] font-semibold bg-[#2F1F15] px-2 py-0.5 rounded-[2px] border border-[#C59B4B]/30">
                          Diskon {coupon.discountPercent}%
                        </span>
                      </div>

                      {/* Terms */}
                      <div className="space-y-1 text-[11px] font-sans text-[#78685A]">
                        <p>
                          <strong>Min. Belanja:</strong> {formatRupiah(coupon.minPurchase)}
                        </p>
                        <p>
                          <strong>Berlaku Sampai:</strong> {coupon.expiryDate}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#D8C7B5]/40">
                      {/* Tombol Salin Kode */}
                      <button
                        onClick={() => handleCopyCode(coupon.code)}
                        className={`py-2 px-2.5 text-xs font-sans uppercase tracking-wider font-medium rounded-[2px] border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isCopied
                            ? "bg-[#2D6622] text-[#FAF6EE] border-[#2D6622]"
                            : "bg-[#FAF7F2] text-[#2A1D15] border-[#8C6F56]/60 hover:bg-[#2A1D15] hover:text-[#FAF6EE]"
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Kode Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#8C6F56]" />
                            <span>Salin Kode</span>
                          </>
                        )}
                      </button>

                      {/* Tombol Pakai Kupon */}
                      <Link
                        href={`/shop?category=${encodeURIComponent(targetCategory)}`}
                        className="py-2 px-2.5 text-xs font-sans uppercase tracking-wider font-semibold rounded-[2px] bg-[#C59B4B] hover:bg-[#DFBF7A] text-[#1F1813] border border-[#9E762E] transition-all flex items-center justify-center gap-1 text-center"
                      >
                        <span>Pakai Kupon</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            3. DISCOUNTED PRODUCTS SHOWCASE (12 Produk Best Seller / Rare)
           ========================================================================= */}
        <section className="space-y-8 pt-6 border-t border-[#D8C7B5]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#D8C7B5] pb-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#8C6F56] font-sans block mb-1">
                Koleksi Spesial 12.12
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#2A1D15]">
                Artefak Vintage Sedang Diskon
              </h2>
              <p className="text-xs text-[#78685A] font-sans mt-1">
                12 produk langka dan terlaris yang langsung mendapatkan potongan harga spesial Warehouse Cleaner.
              </p>
            </div>

            <Button variant="outline" size="sm" href="/shop">
              <span>Buka Semua Koleksi Toko</span>
            </Button>
          </div>

          {isLoadingProducts ? (
            <div className="text-center py-16 font-serif text-[#78685A] space-y-2">
              <span className="text-[#C59B4B] text-2xl animate-pulse block">✦</span>
              <p>Memuat Artefak Diskon Warehouse Cleaner...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {saleProducts.map((product) => {
                const discountPercent =
                  CATEGORY_DISCOUNT_PERCENT[product.category] || 15;
                const discountedPrice = Math.round(
                  product.price * (1 - discountPercent / 100)
                );

                return (
                  <div
                    key={product.id}
                    className="group relative bg-[#FAF6EE] border border-[#D8C7B5] hover:border-[#8C6F56] transition-all duration-300 rounded-[2px] overflow-hidden flex flex-col shadow-xs hover:shadow-vintageHover"
                  >
                    {/* Thumbnail & Badges */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EBDCCB]/30">
                      <Link href={`/product/${product.id}`} className="block w-full h-full">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-[#2A1D15]/5 group-hover:bg-transparent transition-colors duration-300" />
                      </Link>

                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
                        {/* Discount Badge */}
                        <span className="px-2 py-0.5 text-[10px] font-sans uppercase tracking-widest font-bold bg-[#2A1D15] text-[#DFC183] border border-[#C59B4B] rounded-[2px] shadow-sm">
                          Diskon {discountPercent}%
                        </span>

                        {product.tag && (
                          <span className="px-2 py-0.5 text-[10px] font-sans uppercase tracking-widest font-semibold bg-[#FAF6EE] text-[#2A1D15] border border-[#8C6F56] rounded-[2px]">
                            {product.tag}
                          </span>
                        )}
                      </div>

                      {/* Quick Buy Button on Hover */}
                      <div className="absolute inset-x-2 bottom-2.5 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <button
                          onClick={() => addItem(product, 1)}
                          disabled={product.stock <= 0}
                          className="flex-1 py-2 px-3 bg-[#2A1D15]/95 hover:bg-[#2A1D15] text-[#FAF6EE] text-[11px] font-sans uppercase tracking-wider font-medium rounded-[2px] border border-[#C59B4B]/60 shadow-md flex items-center justify-center gap-1.5 transition-all hover:border-[#C59B4B] disabled:opacity-50 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-[#C59B4B]" />
                          <span>{product.stock > 0 ? "Beli Cepat" : "Habis"}</span>
                        </button>
                        <Link
                          href={`/product/${product.id}`}
                          className="p-2 bg-[#FAF6EE]/95 hover:bg-[#FAF6EE] text-[#2A1D15] rounded-[2px] border border-[#8C6F56] shadow-md flex items-center justify-center transition-all"
                          title="Lihat Detail Produk"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#3A281E]" />
                        </Link>
                      </div>
                    </div>

                    {/* Info Block */}
                    <div className="p-4 flex-1 flex flex-col justify-between bg-[#FAF6EE] border-t border-[#D8C7B5]/50">
                      <div>
                        <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8C6F56] block mb-1">
                          {product.category}
                        </span>
                        <h3 className="font-serif text-base text-[#2A1D15] leading-snug line-clamp-2 group-hover:text-[#8C6F56] transition-colors">
                          <Link href={`/product/${product.id}`}>{product.name}</Link>
                        </h3>
                      </div>

                      {/* Strikethrough Old Price & New Discounted Price */}
                      <div className="mt-3 pt-3 border-t border-[#D8C7B5]/40 flex items-baseline justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-[#9E8B7A] line-through font-serif">
                              {formatRupiah(product.price)}
                            </span>
                            <span className="text-[10px] font-sans text-[#C59B4B] font-bold">
                              -{discountPercent}%
                            </span>
                          </div>
                          <span className="font-serif text-base sm:text-lg font-bold text-[#2A1D15] block mt-0.5">
                            {formatRupiah(discountedPrice)}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] text-[#5A4232] font-sans block">
                            Stok: {product.stock}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Guarantees Box */}
        <section className="bg-[#FAF6EE] border border-[#D8C7B5] p-6 sm:p-8 rounded-[2px] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-sans text-[#78685A]">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C59B4B] shrink-0 mt-0.5" />
            <div>
              <strong className="text-sm font-serif text-[#2A1D15] block mb-1">
                Kualitas & Keaslian Tetap 100%
              </strong>
              <span>
                Barang diskon Warehouse Cleaner tetap melalui proses inspeksi keaslian kurasi yang sama ketatnya.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-[#C59B4B] shrink-0 mt-0.5" />
            <div>
              <strong className="text-sm font-serif text-[#2A1D15] block mb-1">
                Koleksi Terbatas Tanpa Restock
              </strong>
              <span>
                Begitu artefak promo terjual, sebagian besar tidak dapat diperoleh kembali karena keunikannya.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Tag className="w-5 h-5 text-[#C59B4B] shrink-0 mt-0.5" />
            <div>
              <strong className="text-sm font-serif text-[#2A1D15] block mb-1">
                Kupon Dapat Digabungkan
              </strong>
              <span>
                Gunakan kupon kategori yang sesuai saat checkout untuk menikmati potongan harga tambahan.
              </span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
