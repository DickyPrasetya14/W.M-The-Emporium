"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare, ShieldCheck, CreditCard, Truck, CheckCircle2, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatRupiah, generateWhatsAppOrderMessage } from "@/lib/utils";
import Button from "@/components/Button";

// Nomor WhatsApp Official Toko
const EMPORIUM_WA_NUMBER = "6281234567890";

export const CheckoutForm: React.FC = () => {
  const { items, totalPrice, appliedCoupon, discountAmount, finalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "Transfer Bank" as "Transfer Bank" | "COD",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim()) {
      setErrorMsg("Mohon masukkan nama lengkap Anda.");
      return;
    }
    if (!formData.whatsapp.trim()) {
      setErrorMsg("Mohon masukkan nomor WhatsApp yang aktif.");
      return;
    }
    if (!formData.address.trim()) {
      setErrorMsg("Mohon masukkan alamat pengiriman lengkap Anda.");
      return;
    }

    const fullAddress = `${formData.address.trim()}${
      formData.city ? `, ${formData.city.trim()}` : ""
    }${formData.postalCode ? `, Kodepos: ${formData.postalCode.trim()}` : ""}`;

    // Generate WhatsApp encoded message
    const encodedMessage = generateWhatsAppOrderMessage(
      formData.name.trim(),
      formData.whatsapp.trim(),
      fullAddress,
      formData.paymentMethod === "COD" ? "COD (Bayar di Tempat)" : "Transfer Bank Resmi",
      items,
      formData.notes
    );

    const waUrl = `https://wa.me/${EMPORIUM_WA_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(waUrl, "_blank");

    setIsSubmitted(true);
    clearCart();
  };

  if (isSubmitted) {
    return (
      <div className="bg-[#FAF6EE] border border-[#D8C7B5] p-8 sm:p-12 text-center rounded-[2px] max-w-2xl mx-auto space-y-6 shadow-xs">
        <div className="w-16 h-16 bg-[#EBDCCB]/50 border border-[#C59B4B] rounded-full mx-auto flex items-center justify-center text-[#2A1D15]">
          <CheckCircle2 className="w-10 h-10 text-[#C59B4B]" />
        </div>
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#8C6F56] font-sans">
            Pesanan Berhasil Disiapkan
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#2A1D15]">
            Terima Kasih atas Pesanan Anda
          </h2>
          <p className="text-xs sm:text-sm text-[#5A4232] font-sans leading-relaxed max-w-md mx-auto">
            Jendela WhatsApp Anda telah terbuka untuk mengirimkan rincian pesanan langsung ke kurator The Emporium. Kami akan segera memverifikasi ketersediaan dan menyiapkan pengemasan khusus.
          </p>
        </div>

        <div className="p-4 bg-[#FAF7F2] border border-[#D8C7B5]/60 rounded-[2px] text-xs text-[#78685A] font-sans text-left space-y-1">
          <p>
            <strong>Nama:</strong> {formData.name}
          </p>
          <p>
            <strong>WhatsApp:</strong> {formData.whatsapp}
          </p>
          <p>
            <strong>Metode Pembayaran:</strong> {formData.paymentMethod}
          </p>
          <p className="text-[11px] text-[#8C6F56] pt-1 border-t border-[#D8C7B5]/40">
            Jika tab WhatsApp belum terbuka otomatis, Anda dapat menghubungi kami langsung di nomor +62 812-3456-7890.
          </p>
        </div>

        <div className="pt-4 flex justify-center gap-4">
          <Button variant="primary" href="/shop">
            Kembali ke Koleksi
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-[#FAF6EE] border border-[#D8C7B5] p-12 text-center rounded-[2px] max-w-lg mx-auto space-y-4">
        <span className="text-[#C59B4B] text-2xl font-serif">✦</span>
        <h3 className="font-serif text-xl text-[#2A1D15]">Keranjang Belanja Kosong</h3>
        <p className="text-xs text-[#78685A] font-sans">
          Silakan pilih artefak atau barang vintage yang ingin Anda koleksi terlebih dahulu sebelum checkout.
        </p>
        <div className="pt-2">
          <Button variant="primary" href="/shop">
            Lihat Koleksi Toko
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Checkout Form */}
      <div className="lg:col-span-7 bg-[#FAF6EE] border border-[#D8C7B5] p-6 sm:p-8 rounded-[2px] shadow-xs">
        <div className="border-b border-[#D8C7B5] pb-4 mb-6">
          <div className="flex items-center gap-2 text-xs text-[#8C6F56] uppercase tracking-widest font-sans mb-1">
            <span>The Emporium</span>
            <span>•</span>
            <span>Formulir Pemesanan</span>
          </div>
          <h2 className="font-serif text-2xl text-[#2A1D15]">
            Data Pengiriman & Pemesan
          </h2>
          <p className="text-xs text-[#78685A] font-sans mt-1">
            Harap isi informasi pengiriman dengan teliti untuk keamanan pengiriman artefak.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 bg-[#FAF2EE] border border-[#C56B4B]/40 text-[#9E3E20] text-xs font-sans rounded-[2px]">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nama Lengkap */}
          <div>
            <label
              htmlFor="name"
              className="block font-sans text-xs uppercase tracking-wider font-semibold text-[#2A1D15] mb-1.5"
            >
              Nama Lengkap <span className="text-[#A64B2A]">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Contoh: Raden Surya Prasetya"
              className="w-full px-3.5 py-2.5 bg-[#FAF7F2] text-[#2A1D15] placeholder-[#9E8B7A] text-xs sm:text-sm font-sans border border-[#D8C7B5] rounded-[2px] focus:outline-none focus:border-[#8C6F56] transition-colors"
            />
          </div>

          {/* Nomor WhatsApp */}
          <div>
            <label
              htmlFor="whatsapp"
              className="block font-sans text-xs uppercase tracking-wider font-semibold text-[#2A1D15] mb-1.5"
            >
              Nomor WhatsApp Aktif <span className="text-[#A64B2A]">*</span>
            </label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              required
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="Contoh: 081234567890"
              className="w-full px-3.5 py-2.5 bg-[#FAF7F2] text-[#2A1D15] placeholder-[#9E8B7A] text-xs sm:text-sm font-sans border border-[#D8C7B5] rounded-[2px] focus:outline-none focus:border-[#8C6F56] transition-colors"
            />
            <span className="text-[11px] text-[#8C6F56] mt-1 block font-sans">
              Digunakan untuk konfirmasi pesanan dan update resi pengiriman.
            </span>
          </div>

          {/* Alamat Lengkap */}
          <div>
            <label
              htmlFor="address"
              className="block font-sans text-xs uppercase tracking-wider font-semibold text-[#2A1D15] mb-1.5"
            >
              Alamat Lengkap Tujuan <span className="text-[#A64B2A]">*</span>
            </label>
            <textarea
              id="address"
              name="address"
              required
              rows={3}
              value={formData.address}
              onChange={handleChange}
              placeholder="Nama Jalan, Nomor Bangunan, RT/RW, Kelurahan, Kecamatan"
              className="w-full px-3.5 py-2.5 bg-[#FAF7F2] text-[#2A1D15] placeholder-[#9E8B7A] text-xs sm:text-sm font-sans border border-[#D8C7B5] rounded-[2px] focus:outline-none focus:border-[#8C6F56] transition-colors resize-none"
            />
          </div>

          {/* Kota & Kode Pos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="city"
                className="block font-sans text-xs uppercase tracking-wider font-semibold text-[#2A1D15] mb-1.5"
              >
                Kota / Kabupaten
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Contoh: Jakarta Pusat"
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] text-[#2A1D15] placeholder-[#9E8B7A] text-xs sm:text-sm font-sans border border-[#D8C7B5] rounded-[2px] focus:outline-none focus:border-[#8C6F56] transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="postalCode"
                className="block font-sans text-xs uppercase tracking-wider font-semibold text-[#2A1D15] mb-1.5"
              >
                Kode Pos
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Contoh: 10310"
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] text-[#2A1D15] placeholder-[#9E8B7A] text-xs sm:text-sm font-sans border border-[#D8C7B5] rounded-[2px] focus:outline-none focus:border-[#8C6F56] transition-colors"
              />
            </div>
          </div>

          {/* Metode Pembayaran */}
          <div>
            <label className="block font-sans text-xs uppercase tracking-wider font-semibold text-[#2A1D15] mb-2">
              Pilihan Metode Pembayaran <span className="text-[#A64B2A]">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`p-4 border rounded-[2px] cursor-pointer flex items-start gap-3 transition-all ${
                  formData.paymentMethod === "Transfer Bank"
                    ? "bg-[#FAF7F2] border-[#2A1D15] ring-1 ring-[#2A1D15]"
                    : "bg-[#FAF6EE] border-[#D8C7B5] hover:border-[#8C6F56]"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Transfer Bank"
                  checked={formData.paymentMethod === "Transfer Bank"}
                  onChange={handleChange}
                  className="mt-1 accent-[#2A1D15]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#C59B4B]" />
                    <span className="font-serif text-sm font-medium text-[#2A1D15]">
                      Transfer Bank
                    </span>
                  </div>
                  <p className="text-[11px] text-[#78685A] font-sans mt-1">
                    BCA, Mandiri, BNI. Rekening resmi dikirimkan via WhatsApp.
                  </p>
                </div>
              </label>

              <label
                className={`p-4 border rounded-[2px] cursor-pointer flex items-start gap-3 transition-all ${
                  formData.paymentMethod === "COD"
                    ? "bg-[#FAF7F2] border-[#2A1D15] ring-1 ring-[#2A1D15]"
                    : "bg-[#FAF6EE] border-[#D8C7B5] hover:border-[#8C6F56]"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={formData.paymentMethod === "COD"}
                  onChange={handleChange}
                  className="mt-1 accent-[#2A1D15]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#C59B4B]" />
                    <span className="font-serif text-sm font-medium text-[#2A1D15]">
                      COD (Bayar di Tempat)
                    </span>
                  </div>
                  <p className="text-[11px] text-[#78685A] font-sans mt-1">
                    Bayar saat kurir mengantarkan paket ke alamat Anda.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Catatan Khusus */}
          <div>
            <label
              htmlFor="notes"
              className="block font-sans text-xs uppercase tracking-wider font-semibold text-[#2A1D15] mb-1.5"
            >
              Catatan Pesanan (Opsional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={2}
              value={formData.notes}
              onChange={handleChange}
              placeholder="Contoh: Titipkan ke satpam, atau butuh kemasan pita kado vintage..."
              className="w-full px-3.5 py-2.5 bg-[#FAF7F2] text-[#2A1D15] placeholder-[#9E8B7A] text-xs sm:text-sm font-sans border border-[#D8C7B5] rounded-[2px] focus:outline-none focus:border-[#8C6F56] transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-[#D8C7B5]">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              className="flex items-center justify-center gap-2 bg-[#2A1D15] hover:bg-[#3D2C20] py-4"
            >
              <MessageSquare className="w-4 h-4 text-[#C59B4B]" />
              <span>Order via WhatsApp</span>
            </Button>
            <p className="text-[11px] text-center text-[#8C6F56] font-sans mt-2.5">
              Klik untuk mengirim detail pesanan otomatis ke WhatsApp resmi The Emporium.
            </p>
          </div>
        </form>
      </div>

      {/* Order Summary Sidebar */}
      <div className="lg:col-span-5 bg-[#FAF6EE] border border-[#D8C7B5] p-6 rounded-[2px] shadow-xs space-y-6">
        <div className="border-b border-[#D8C7B5] pb-3 flex items-center justify-between">
          <h3 className="font-serif text-lg text-[#2A1D15]">
            Ringkasan Pesanan
          </h3>
          <Link
            href="/cart"
            className="text-xs font-sans text-[#8C6F56] hover:text-[#2A1D15] underline"
          >
            Ubah Keranjang
          </Link>
        </div>

        {/* Item List */}
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex gap-3 py-2 border-b border-[#D8C7B5]/40 text-xs font-sans"
            >
              <div className="relative w-14 h-16 shrink-0 bg-[#EBDCCB]/30 rounded-[1px] overflow-hidden border border-[#D8C7B5]/50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="60px"
                  className="object-cover object-center"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-serif text-xs text-[#2A1D15] line-clamp-1 font-medium">
                  {product.name}
                </h4>
                <p className="text-[11px] text-[#8C6F56]">
                  {quantity}x @ {formatRupiah(product.price)}
                </p>
                <p className="text-[10px] text-[#9E8B7A]">
                  Kondisi: {product.condition}
                </p>
              </div>
              <div className="text-right font-serif font-semibold text-[#2A1D15]">
                {formatRupiah(product.price * quantity)}
              </div>
            </div>
          ))}
        </div>

        {/* Price Calculations */}
        <div className="space-y-2 pt-2 border-t border-[#D8C7B5] text-xs font-sans text-[#5A4232]">
          <div className="flex justify-between">
            <span>Subtotal Barang</span>
            <span className="font-serif font-medium text-[#2A1D15]">
              {formatRupiah(totalPrice)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Ongkos Kirim</span>
            <span className="text-[#8C6F56] italic">Dihitung saat konfirmasi WA</span>
          </div>
          <div className="flex justify-between">
            <span>Asuransi & Kemasan Kayu</span>
            <span className="text-[#C59B4B] font-medium">Gratis (Promo Toko)</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-[#D8C7B5] text-sm font-serif font-bold text-[#2A1D15]">
            <span>Total Sementara</span>
            <span className="text-base text-[#2A1D15]">{formatRupiah(totalPrice)}</span>
          </div>
        </div>

        {/* Heritage Trust Badges */}
        <div className="p-3.5 bg-[#FAF7F2] border border-[#D8C7B5]/70 rounded-[2px] space-y-2 text-[11px] font-sans text-[#78685A]">
          <div className="flex items-center gap-2 text-[#2A1D15] font-medium">
            <ShieldCheck className="w-4 h-4 text-[#C59B4B]" />
            <span>Garansi Keaslian Artefak</span>
          </div>
          <p className="leading-relaxed">
            Setiap produk yang dikirimkan telah melalui inspeksi kurasi vintage. Foto dan video detail sebelum pengiriman dapat diminta langsung via WhatsApp.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-sans text-[#8C6F56] hover:text-[#2A1D15] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Lanjut Memilih Artefak Lain</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
