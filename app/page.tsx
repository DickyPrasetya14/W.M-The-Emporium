import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass, ShieldCheck, Sparkles, Star, Quote } from "lucide-react";
import Button from "@/components/Button";
import CategoryCard from "@/components/CategoryCard";
import ProductGrid from "@/components/ProductGrid";
import { CATEGORIES } from "@/data/products";
import { fetchFeaturedProducts } from "@/lib/supabase";
import PromoBanner from "@/components/PromoBanner";

export const revalidate = 60;

export default async function HomePage() {
  const featuredProducts = await fetchFeaturedProducts(8);

  return (
    <div>
      {/* 12.12 Flash Sale Promo Banner */}
      <PromoBanner />

      <div className="space-y-24 sm:space-y-32 pb-16">
      
      {/* =========================================================================
          HERO SECTION - Classic Vintage Aesthetic
         ========================================================================= */}
      <section className="relative min-h-[82vh] flex items-center justify-center border-b border-[#D8C7B5]/60 overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Background Image with Warm Vintage Overlay */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=2000&q=80"
            alt="The Emporium Vintage Workshop"
            fill
            priority
            className="object-cover object-center filter sepia-[0.35] brightness-[0.78] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2A1D15]/80 via-[#2A1D15]/60 to-[#FAF7F2]" />
          <div className="absolute inset-0 bg-[#3A281E]/40 backdrop-blur-[1px]" />
        </div>

        {/* Vintage Content Box */}
        <div className="max-w-4xl mx-auto text-center py-20 px-6 sm:px-12 relative z-10 border border-[#EBDCCB]/30 bg-[#2A1D15]/75 backdrop-blur-md rounded-[2px] shadow-2xl">
          {/* Top Stamp Ornament */}
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#C59B4B]/60 rounded-[1px] mb-6 bg-[#2A1D15]/80">
            <span className="text-[#C59B4B] text-xs">✦</span>
            <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-[#FAF6EE] font-medium">
              Curated Vintage Heritage — Est. 1924
            </span>
            <span className="text-[#C59B4B] text-xs">✦</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-[0.18em] text-[#FAF6EE] leading-tight mb-4">
            THE EMPORIUM
          </h1>

          <p className="font-serif text-lg sm:text-2xl text-[#DFC183] italic tracking-wide mb-6 font-light">
            “Timeless Goods for Modern Life”
          </p>

          <p className="font-sans text-xs sm:text-sm text-[#E5DCD0] max-w-2xl mx-auto leading-relaxed mb-8 font-light">
            Menghidupkan kembali pesona artefak masa lalu ke dalam hunian dan gaya hidup masa kini. Dari jam saku mekanik berukir, pakaian wol bersejarah, hingga mesin tik antik yang sarat kenangan.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="gold"
              size="lg"
              href="/shop"
              className="w-full sm:w-auto shadow-lg"
            >
              Lihat Koleksi Toko
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/about"
              className="w-full sm:w-auto"
            >
              Cerita Tentang Kami
            </Button>
          </div>

          {/* Subtle Vintage Badge */}
          <div className="mt-10 pt-6 border-t border-[#EBDCCB]/20 flex items-center justify-center gap-6 text-[11px] font-sans text-[#DFC183]/80 uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C59B4B]" /> 100% Autentik
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B4B]" /> Terkurasi Khusus
            </span>
            <span>•</span>
            <span className="hidden sm:inline">Pengiriman Aman</span>
          </div>
        </div>
      </section>


      {/* =========================================================================
          CATEGORIES SECTION - 4 Key Categories
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-sans uppercase tracking-[0.25em] text-[#8C6F56] mb-2">
            <span>✦</span>
            <span>Pilihan Kuratorial</span>
            <span>✦</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1D15]">
            Koleksi Berdasarkan Kategori
          </h2>
          <div className="ornament-divider" />
          <p className="font-sans text-xs sm:text-sm text-[#78685A] leading-relaxed">
            Jelajahi setiap sudut galeri kami yang dipilah secara seksama berdasarkan jenis artefak dan era bersejarahnya.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.name} category={cat} />
          ))}
        </div>
      </section>


      {/* =========================================================================
          FEATURED PRODUCTS (Produk Unggulan)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#D8C7B5]">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-[0.25em] text-[#8C6F56] mb-1">
              <span>✦</span>
              <span>Harta Karun Terpilih</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1D15]">
              Produk Unggulan
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#78685A] mt-1">
              Koleksi paling dicari dengan karakter otentik dan nilai sejarah yang tak lekang waktu.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <Button variant="outline" size="sm" href="/shop">
              <span className="flex items-center gap-1.5">
                <span>Lihat Semua Koleksi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Button>
          </div>
        </div>

        <ProductGrid products={featuredProducts} />
      </section>


      {/* =========================================================================
          STORE STORY (Cerita Singkat Toko)
         ========================================================================= */}
      <section className="bg-[#F4EFEA] border-y border-[#D8C7B5] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story Visual Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-[2px] overflow-hidden border-2 border-[#8C6F56] shadow-vintage">
                <Image
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80"
                  alt="Jam Saku Mekanik The Emporium"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center filter sepia-[0.2]"
                />
              </div>
              {/* Overlapping Decorative Badge */}
              <div className="absolute -bottom-6 -right-6 bg-[#2A1D15] text-[#FAF6EE] p-6 rounded-[2px] border border-[#C59B4B] shadow-lg hidden sm:block max-w-[200px] text-center">
                <span className="font-serif text-3xl font-bold text-[#DFC183] block">100+</span>
                <span className="text-[11px] font-sans tracking-wider uppercase text-[#EBDCCB] mt-1 block">
                  Tahun Warisan & Inspirasi
                </span>
              </div>
            </div>

            {/* Story Prose */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.25em] text-[#8C6F56]">
                <span>Tentang The Emporium</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1D15] leading-tight">
                Menghargai Jejak Masa Lalu di Tengah Laju Zaman
              </h2>

              <div className="ornament-divider !justify-start" />

              <p className="font-sans text-sm text-[#5A4232] leading-relaxed">
                Di era di mana segala sesuatu diproduksi secara massal dan lekas usang, The Emporium berdiri sebagai penghormatan terhadap masa ketika setiap benda diciptakan dengan keahlian tangan, ketelitian mekanik, dan jiwa.
              </p>

              <p className="font-sans text-sm text-[#5A4232] leading-relaxed">
                Kami menjelajahi pasar loak bersejarah di Eropa, rumah lelang antik, dan bengkel perajin warisan untuk mengumpulkan artefak terbaik. Setiap barang yang sampai ke tangan Anda membawa cerita, goresan patina alami, dan martabat keabadian.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-6 border-t border-[#D8C7B5] text-xs font-sans text-[#78685A]">
                <div>
                  <strong className="font-serif text-sm text-[#2A1D15] block">Kurasi Ketat</strong>
                  <span>Hanya barang berkondisi prima dan otentik yang kami loloskan.</span>
                </div>
                <div>
                  <strong className="font-serif text-sm text-[#2A1D15] block">Perawatan Khusus</strong>
                  <span>Restorasi konservasi yang menjaga patina asli tanpa merusak nilai sejarah.</span>
                </div>
              </div>

              <div className="pt-2">
                <Button variant="primary" size="md" href="/about">
                  Baca Kisah Selengkapnya
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================================
          TESTIMONIALS (Testimoni Para Kolektor)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-sans uppercase tracking-[0.25em] text-[#8C6F56] mb-2">
            <span>✦</span>
            <span>Ulasan & Kesan</span>
            <span>✦</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1D15]">
            Kata Para Kolektor
          </h2>
          <div className="ornament-divider" />
          <p className="font-sans text-xs sm:text-sm text-[#78685A]">
            Kisah kepuasan dari mereka yang telah menyambut artefak The Emporium ke dalam hidup mereka.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-[#FAF6EE] border border-[#D8C7B5] p-6 rounded-[2px] shadow-xs flex flex-col justify-between relative">
            <Quote className="w-8 h-8 text-[#C59B4B]/30 absolute top-4 right-4" />
            <div>
              <div className="flex text-[#C59B4B] mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="font-serif text-sm text-[#3A281E] leading-relaxed italic mb-4">
                “Jam saku Horology Heritage yang saya pesan tiba dengan selamat dalam peti kayu rapi. Detak mekaniknya luar biasa menenangkan, tepat seperti deskripsi kurator.”
              </p>
            </div>
            <div className="pt-4 border-t border-[#D8C7B5]/60">
              <strong className="font-serif text-sm text-[#2A1D15] block">
                Bambang Sudiro
              </strong>
              <span className="text-[11px] font-sans text-[#8C6F56]">
                Kolektor Horologi, Bandung
              </span>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-[#FAF6EE] border border-[#D8C7B5] p-6 rounded-[2px] shadow-xs flex flex-col justify-between relative">
            <Quote className="w-8 h-8 text-[#C59B4B]/30 absolute top-4 right-4" />
            <div>
              <div className="flex text-[#C59B4B] mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="font-serif text-sm text-[#3A281E] leading-relaxed italic mb-4">
                “Mesin tik Remington 1932 menjadi pusat perhatian di studio penulisan saya. Komunikasi via WhatsApp sangat ramah dan transparan memberikan video kondisi tuts.”
              </p>
            </div>
            <div className="pt-4 border-t border-[#D8C7B5]/60">
              <strong className="font-serif text-sm text-[#2A1D15] block">
                Clara Andini
              </strong>
              <span className="text-[11px] font-sans text-[#8C6F56]">
                Penulis & Kurator Buku, Yogyakarta
              </span>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-[#FAF6EE] border border-[#D8C7B5] p-6 rounded-[2px] shadow-xs flex flex-col justify-between relative">
            <Quote className="w-8 h-8 text-[#C59B4B]/30 absolute top-4 right-4" />
            <div>
              <div className="flex text-[#C59B4B] mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="font-serif text-sm text-[#3A281E] leading-relaxed italic mb-4">
                “Tas kulit Gladstone Satchel memiliki patina yang sungguh menawan. Tercium aroma kulit samak nabati otentik. Kualitas barang vintage yang tidak bisa ditiru pabrik modern.”
              </p>
            </div>
            <div className="pt-4 border-t border-[#D8C7B5]/60">
              <strong className="font-serif text-sm text-[#2A1D15] block">
                Hendrawan Kusuma
              </strong>
              <span className="text-[11px] font-sans text-[#8C6F56]">
                Arsitek, Jakarta Selatan
              </span>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          NEWSLETTER / INVITATION BANNER
         ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-[#2A1D15] text-[#FAF6EE] p-8 sm:p-12 border border-[#8C6F56] rounded-[2px] text-center space-y-6 shadow-vintage">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C59B4B] font-sans block">
            Jurnal Waktu & Rilisan Terbatas
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl">
            Ingin Menjadi yang Pertama Mengetahui Koleksi Langka?
          </h2>
          <p className="text-xs sm:text-sm text-[#D8C7B5] max-w-xl mx-auto font-sans leading-relaxed">
            Katalog kami diperbarui saat artefak unik berhasil kami peroleh. Kunjungi galeri atau hubungi langsung kurator kami untuk reservasi khusus.
          </p>
          <div className="pt-2 flex justify-center">
            <Button variant="gold" size="md" href="/shop">
              Jelajahi Katalog Lengkap
            </Button>
          </div>
        </div>
      </section>

      </div>
    </div>
  );
}
