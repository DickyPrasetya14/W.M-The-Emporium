import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ShieldCheck, Compass, Sparkles, MapPin, Phone, Mail } from "lucide-react";
import Button from "@/components/Button";

export const metadata = {
  title: "Tentang Kami | The Emporium",
  description: "Kisah, filosofi kuratorial, dan komitmen pelestarian artefak vintage The Emporium.",
};

export default function AboutPage() {
  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative py-20 bg-[#F4EFEA] border-b border-[#D8C7B5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF6EE] border border-[#8C6F56]/40 rounded-[1px] text-[11px] font-sans tracking-[0.25em] uppercase text-[#5A4232]">
            <span>Est. 1924</span>
            <span>✦</span>
            <span>Kisah Toko</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2A1D15] leading-tight">
            Warisan Keanggunan di Tengah Modernitas
          </h1>
          <div className="ornament-divider" />
          <p className="font-serif text-lg text-[#5A4232] italic max-w-2xl mx-auto">
            “Setiap goresan patina adalah rekaman waktu, setiap detak mekanik adalah nafas dari masa yang telah silam.”
          </p>
        </div>
      </section>

      {/* Main Story Narrative */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          <div className="md:col-span-5 relative">
            <div className="relative aspect-[3/4] rounded-[2px] overflow-hidden border-2 border-[#8C6F56] shadow-vintage">
              <Image
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80"
                alt="Mesin tik antik di The Emporium"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-center filter sepia-[0.25]"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#FAF6EE] border border-[#D8C7B5] p-3 rounded-[2px] text-xs font-serif text-[#2A1D15] shadow-md hidden sm:block">
              ✦ Arsip Dokumentasi Studio Emporium ✦
            </div>
          </div>

          <div className="md:col-span-7 space-y-5">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#2A1D15]">
              Awal Mula Sebuah Kecintaan Terhadap Waktu
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#5A4232] leading-relaxed">
              The Emporium berakar dari sebuah bengkel reparasi horologi dan galeri kurio kecil yang didirikan lebih dari sembilan dasawarsa lalu. Di masa ketika jam dinding, mesin tik mekanik, dan mantel wol dijahit dengan ketelitian tangan yang tak tergantikan, setiap benda diciptakan bukan sekadar untuk dipakai — melainkan untuk diwariskan ke generasi berikutnya.
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#5A4232] leading-relaxed">
              Kini, di era modern yang serba instan dan serba plastik, The Emporium hadir sebagai pelindung nilai-nilai tersebut. Kami percaya bahwa hunian modern membutuhkan sentuhan hangat dari masa lampau: suara detak jam pendulum yang teratur, aroma kulit tua yang disamak secara alami, dan kilau keemasan kuningan berumur puluhan tahun.
            </p>
          </div>

        </div>
      </section>

      {/* 4 Curatorial Pillars */}
      <section className="bg-[#FAF6EE] border-y border-[#D8C7B5] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C6F56] font-sans block mb-1">
              Prinsip Kurasi
            </span>
            <h2 className="font-serif text-3xl text-[#2A1D15]">
              Empat Pilar The Emporium
            </h2>
            <div className="ornament-divider" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Pillar 1 */}
            <div className="p-6 bg-[#FAF7F2] border border-[#D8C7B5] rounded-[2px] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#EBDCCB]/50 border border-[#8C6F56]/40 flex items-center justify-center text-[#2A1D15]">
                <ShieldCheck className="w-5 h-5 text-[#C59B4B]" />
              </div>
              <h3 className="font-serif text-lg text-[#2A1D15]">
                Autentisitas Asli
              </h3>
              <p className="text-xs text-[#78685A] font-sans leading-relaxed">
                Kami menolak replika tiruan murahan. Setiap barang ditelusuri riwayatnya dan dipastikan berasal dari eranya.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 bg-[#FAF7F2] border border-[#D8C7B5] rounded-[2px] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#EBDCCB]/50 border border-[#8C6F56]/40 flex items-center justify-center text-[#2A1D15]">
                <Clock className="w-5 h-5 text-[#C59B4B]" />
              </div>
              <h3 className="font-serif text-lg text-[#2A1D15]">
                Restorasi Konservatif
              </h3>
              <p className="text-xs text-[#78685A] font-sans leading-relaxed">
                Kami membersihkan dan merawat bagian mekanik tanpa melenyapkan patina dan tanda usia alami yang menjadi ciri khas artefak.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 bg-[#FAF7F2] border border-[#D8C7B5] rounded-[2px] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#EBDCCB]/50 border border-[#8C6F56]/40 flex items-center justify-center text-[#2A1D15]">
                <Sparkles className="w-5 h-5 text-[#C59B4B]" />
              </div>
              <h3 className="font-serif text-lg text-[#2A1D15]">
                Karakter Abadi
              </h3>
              <p className="text-xs text-[#78685A] font-sans leading-relaxed">
                Barang yang kami pilih bukan hanya pajangan, melainkan benda fungsional bernilai estetika tinggi untuk melengkapi interior dan penampilan Anda.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 bg-[#FAF7F2] border border-[#D8C7B5] rounded-[2px] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#EBDCCB]/50 border border-[#8C6F56]/40 flex items-center justify-center text-[#2A1D15]">
                <Compass className="w-5 h-5 text-[#C59B4B]" />
              </div>
              <h3 className="font-serif text-lg text-[#2A1D15]">
                Layanan Kurator Pribadi
              </h3>
              <p className="text-xs text-[#78685A] font-sans leading-relaxed">
                Anda dapat berkonsultasi langsung, meminta video uji fungsi barang, dan memesan kemasan peti kayu khusus via WhatsApp kami.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery & Workshop Info */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2A1D15] text-[#FAF6EE] p-8 sm:p-12 border border-[#8C6F56] rounded-[2px] shadow-vintage">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.3em] text-[#C59B4B] font-sans block">
                Galeri & Workshop Fisik
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF6EE]">
                Kunjungi Galeri Kami
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#D8C7B5] leading-relaxed">
                Rasakan sendiri detak mekanis jam saku, kelembutan wol mantel vintage, dan suara ketukan tuts mesin tik tua di ruang pamer kami.
              </p>
              <div className="pt-2">
                <Button variant="gold" size="md" href="/shop">
                  Jelajahi Koleksi Online
                </Button>
              </div>
            </div>

            <div className="space-y-3 text-xs font-sans text-[#E5DCD0] bg-[#1F1813]/70 p-6 rounded-[2px] border border-[#8C6F56]/40">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C59B4B] shrink-0 mt-0.5" />
                <span>
                  <strong>Alamat:</strong> Jl. Galeri Purbakala No. 42, Kawasan Cagar Budaya, Menteng, Jakarta Pusat 10310
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#C59B4B] shrink-0" />
                <span>
                  <strong>Waktu Kunjungan:</strong> Selasa – Minggu, 10:00 – 19:00 WIB (Senin Tutup)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C59B4B] shrink-0" />
                <span>
                  <strong>WhatsApp Kurator:</strong> +62 812-3456-7890
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C59B4B] shrink-0" />
                <span>
                  <strong>Surel:</strong> kurator@the-emporium.id
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
