"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  Plus,
  Minus,
  MessageCircle,
  ChevronRight,
  Check,
  Clock,
} from "lucide-react";
import { fetchProductById, fetchRelatedProducts } from "@/lib/supabase";
import { getProductById, getRelatedProducts } from "@/data/products";
import { formatRupiah } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { Product } from "@/types";
import Button from "@/components/Button";
import ProductGrid from "@/components/ProductGrid";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params.id === "string" ? params.id : "";

  // Inisialisasi awal dengan dummy agar tidak ada layar putih
  const initialProduct = getProductById(id);
  const [product, setProduct] = useState<Product | null>(initialProduct || null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>(() =>
    initialProduct ? getRelatedProducts(initialProduct.id, initialProduct.category, 4) : []
  );
  const [isLoading, setIsLoading] = useState<boolean>(!initialProduct);

  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  // Ambil detail produk dari Supabase (fallback ke dummy otomatis jika belum disetting)
  useEffect(() => {
    let isMounted = true;
    if (!id) return;

    fetchProductById(id)
      .then((data) => {
        if (isMounted) {
          if (data) {
            setProduct(data);
            fetchRelatedProducts(data.id, data.category, 4).then((rel) => {
              if (isMounted && rel.length > 0) {
                setRelatedProducts(rel);
              }
            });
          }
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.warn("Gagal memuat detail produk dari Supabase:", err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading && !product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <span className="text-[#C59B4B] text-2xl font-serif block animate-pulse">✦</span>
        <h2 className="font-serif text-2xl text-[#2A1D15]">
          Memuat Detail Artefak...
        </h2>
        <p className="text-xs text-[#78685A] font-sans">
          Mengambil data koleksi vintage dari arsip The Emporium.
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <span className="text-[#C59B4B] text-3xl font-serif">✦</span>
        <h1 className="font-serif text-3xl text-[#2A1D15]">
          Artefak Tidak Ditemukan
        </h1>
        <p className="text-sm text-[#78685A] font-sans max-w-md mx-auto">
          Artefak yang Anda cari mungkin telah berpindah tangan ke kolektor lain atau tautan tidak valid.
        </p>
        <div>
          <Button variant="primary" href="/shop">
            Kembali ke Galeri Koleksi
          </Button>
        </div>
      </div>
    );
  }

  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (product.stock <= 0) return;
    addItem(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  const handleConsultWhatsApp = () => {
    const message = encodeURIComponent(
      `Halo Admin The Emporium, saya tertarik dengan artefak "${product.name}" (${formatRupiah(
        product.price
      )}). Boleh minta informasi tambahan atau foto/video kondisi detailnya? Terima kasih.`
    );
    window.open(`https://wa.me/6281234567890?text=${message}`, "_blank");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-sans text-[#8C6F56] overflow-x-auto pb-1">
        <Link href="/" className="hover:text-[#2A1D15] transition-colors whitespace-nowrap">
          Beranda
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
        <Link href="/shop" className="hover:text-[#2A1D15] transition-colors whitespace-nowrap">
          Koleksi
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
        <Link
          href={`/shop?category=${encodeURIComponent(product.category)}`}
          className="hover:text-[#2A1D15] transition-colors whitespace-nowrap"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
        <span className="text-[#2A1D15] font-medium truncate max-w-[200px] sm:max-w-xs">
          {product.name}
        </span>
      </nav>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
        
        {/* Large Product Photo */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[4/5] sm:aspect-square w-full rounded-[2px] overflow-hidden border-2 border-[#8C6F56]/60 shadow-vintage bg-[#FAF6EE]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            {/* Vintage Subtle Edge Overlay */}
            <div className="absolute inset-0 bg-[#2A1D15]/5 pointer-events-none" />

            {/* Badges on image */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {product.tag && (
                <span
                  className={`px-3 py-1 text-xs font-sans uppercase tracking-widest font-semibold rounded-[2px] shadow-sm ${
                    product.tag === "Rare"
                      ? "bg-[#2A1D15] text-[#C59B4B] border border-[#C59B4B]"
                      : product.tag === "Best Seller"
                      ? "bg-[#C59B4B] text-[#1F1813] border border-[#9E762E]"
                      : "bg-[#FAF6EE] text-[#2A1D15] border border-[#8C6F56]"
                  }`}
                >
                  {product.tag}
                </span>
              )}
            </div>
          </div>
          <p className="text-[11px] text-center text-[#8C6F56] font-sans mt-2 italic">
            ✦ Foto dokumentasi asli dari unit artefak fisik The Emporium ✦
          </p>
        </div>

        {/* Product Details & Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs uppercase tracking-[0.25em] text-[#8C6F56] font-sans">
                {product.category}
              </span>
              <span className="text-[#8C6F56]">•</span>
              <span className="text-xs font-sans text-[#5A4232] bg-[#FAF6EE] px-2 py-0.5 border border-[#D8C7B5] rounded-[2px]">
                {product.condition}
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl text-[#2A1D15] leading-tight">
              {product.name}
            </h1>

            <div className="mt-4 pt-4 border-t border-[#D8C7B5] flex items-baseline justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#78685A] block">
                  Harga Koleksi
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1D15]">
                  {formatRupiah(product.price)}
                </span>
              </div>
              
              <div className="text-right">
                {product.stock <= 2 && product.stock > 0 ? (
                  <span className="inline-block px-2.5 py-1 text-xs font-sans font-medium text-[#A64B2A] bg-[#FDF0EB] border border-[#E8BDB0] rounded-[2px]">
                    Tersisa {product.stock} unit saja!
                  </span>
                ) : product.stock > 0 ? (
                  <span className="inline-block px-2.5 py-1 text-xs font-sans text-[#2A1D15] bg-[#FAF6EE] border border-[#D8C7B5] rounded-[2px]">
                    Stok Tersedia: {product.stock} unit
                  </span>
                ) : (
                  <span className="inline-block px-2.5 py-1 text-xs font-sans text-[#A64B2A] bg-[#FDF0EB] border border-[#E8BDB0] rounded-[2px]">
                    Koleksi Habis
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Condition & Authenticity Info Box */}
          <div className="p-4 bg-[#FAF6EE] border border-[#D8C7B5] rounded-[2px] space-y-2 text-xs font-sans">
            <div className="flex items-center gap-2 text-[#2A1D15] font-semibold">
              <Clock className="w-4 h-4 text-[#C59B4B]" />
              <span>Kondisi Fisik: {product.condition}</span>
            </div>
            <p className="text-[#5A4232] leading-relaxed">
              Barang telah melalui inspeksi fungsi, keutuhan material, dan pembersihan konservatif oleh kurator vintage kami. Patina alami dipertahankan demi menjaga nilai historisnya.
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-serif text-sm tracking-widest uppercase text-[#2A1D15]">
              Deskripsi Artefak
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#5A4232] leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {/* Quantity Selector & Add to Cart */}
          <div className="pt-4 border-t border-[#D8C7B5] space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-sans uppercase tracking-wider text-[#2A1D15] font-semibold">
                Jumlah:
              </span>
              <div className="flex items-center border border-[#8C6F56] rounded-[2px] bg-[#FAF6EE]">
                <button
                  onClick={handleDecrease}
                  disabled={quantity <= 1 || product.stock <= 0}
                  className="px-3 py-2 text-[#2A1D15] hover:bg-[#EBDCCB]/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Kurangi kuantitas"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 py-1 text-sm font-sans font-bold text-[#2A1D15] min-w-[36px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  disabled={quantity >= product.stock || product.stock <= 0}
                  className="px-3 py-2 text-[#2A1D15] hover:bg-[#EBDCCB]/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Tambah kuantitas"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Actions Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary"
                size="lg"
                disabled={product.stock <= 0}
                onClick={handleAddToCart}
                className="flex-1 py-4 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#C59B4B]" />
                <span>
                  {product.stock > 0 ? "Tambah ke Keranjang" : "Artefak Telah Terjual"}
                </span>
              </Button>

              <button
                onClick={handleConsultWhatsApp}
                className="px-4 py-3.5 bg-[#FAF6EE] text-[#2A1D15] border border-[#8C6F56] hover:bg-[#F2ECE1] rounded-[2px] text-xs font-sans tracking-wider uppercase font-semibold flex items-center justify-center gap-2 transition-all"
                title="Tanya Kurator via WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Tanya via WhatsApp</span>
              </button>
            </div>

            {addedNotice && (
              <div className="p-2.5 bg-[#F4FAF2] border border-[#5BB348]/40 text-[#2D6622] text-xs font-sans rounded-[2px] flex items-center gap-2 animate-fadeIn">
                <Check className="w-4 h-4" />
                <span>Artefak berhasil ditambahkan ke keranjang belanja Anda!</span>
              </div>
            )}
          </div>

          {/* Assurance Guarantees */}
          <div className="pt-4 border-t border-[#D8C7B5] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-[#78685A]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C59B4B]" />
              <span>Sertifikat Cek Keaslian Vintage</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#C59B4B]" />
              <span>Pengemasan Box Ekstra Aman</span>
            </div>
          </div>
        </div>

      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-[#D8C7B5] space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#8C6F56] font-sans block mb-1">
                Koleksi Terkait
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#2A1D15]">
                Produk Serupa di Kategori Ini
              </h2>
            </div>
            <Link
              href={`/shop?category=${encodeURIComponent(product.category)}`}
              className="text-xs font-sans text-[#8C6F56] hover:text-[#2A1D15] underline"
            >
              Lihat Kategori Ini
            </Link>
          </div>

          <ProductGrid products={relatedProducts} />
        </section>
      )}

    </div>
  );
}
