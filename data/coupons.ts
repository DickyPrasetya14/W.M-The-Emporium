import { Coupon, CartItem } from "@/types";
import { formatRupiah } from "@/lib/utils";

export const COUPONS: Coupon[] = [
  {
    code: "WAREHOUSE20",
    title: "Diskon 20% Vintage Fashion",
    description: "Hemat 20% khusus pakaian klasik, mantel wol, dan sepatu kulit artisan.",
    discountPercent: 20,
    category: "Vintage Fashion",
    minPurchase: 200000,
    expiryDate: "12 Desember 2026",
  },
  {
    code: "RETRO15",
    title: "Diskon 15% Retro Accessories",
    description: "Potongan 15% untuk jam saku mekanik, kacamata tortoise, dan perhiasan antik.",
    discountPercent: 15,
    category: "Retro Accessories",
    minPurchase: 150000,
    expiryDate: "12 Desember 2026",
  },
  {
    code: "DECOR25",
    title: "Diskon 25% Antique Decor",
    description: "Diskon spesial 25% untuk lampu banker kuningan, jam pendulum, dan cermin barok.",
    discountPercent: 25,
    category: "Antique Decor",
    minPurchase: 300000,
    expiryDate: "12 Desember 2026",
  },
  {
    code: "CLASSIC10",
    title: "Diskon 10% Classic Goods",
    description: "Potongan 10% untuk mesin tik klasik, kamera rangefinder, dan gramofon kuno.",
    discountPercent: 10,
    category: "Classic Goods",
    minPurchase: 100000,
    expiryDate: "12 Desember 2026",
  },
  {
    code: "EMPORIUM30",
    title: "Diskon 30% Semua Koleksi",
    description: "Kupon utama Flash Sale 12.12 Warehouse Cleaner untuk semua kategori artefak.",
    discountPercent: 30,
    category: "Semua Kategori",
    minPurchase: 500000,
    expiryDate: "12 Desember 2026",
  },
];

export function getCoupons(): Coupon[] {
  return COUPONS;
}

export function getCouponByCode(code: string): Coupon | undefined {
  const normalized = code.trim().toUpperCase();
  return COUPONS.find((c) => c.code.toUpperCase() === normalized);
}

export interface CouponValidationResult {
  isValid: boolean;
  coupon?: Coupon;
  discountAmount: number;
  message: string;
}

/**
 * Validasi kupon terhadap isi keranjang belanja
 */
export function validateAndCalculateDiscount(
  code: string,
  items: CartItem[]
): CouponValidationResult {
  if (!code || !code.trim()) {
    return {
      isValid: false,
      discountAmount: 0,
      message: "Silakan masukkan kode kupon terlebih dahulu.",
    };
  }

  const coupon = getCouponByCode(code);
  if (!coupon) {
    return {
      isValid: false,
      discountAmount: 0,
      message: `Kode kupon "${code.trim().toUpperCase()}" tidak ditemukan atau tidak valid.`,
    };
  }

  if (items.length === 0) {
    return {
      isValid: false,
      coupon,
      discountAmount: 0,
      message: "Keranjang belanja Anda masih kosong.",
    };
  }

  // Jika kupon untuk semua kategori
  if (coupon.category === "Semua Kategori" || coupon.category === "All") {
    const totalPurchase = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    if (totalPurchase < coupon.minPurchase) {
      return {
        isValid: false,
        coupon,
        discountAmount: 0,
        message: `Minimal belanja untuk kupon ${coupon.code} adalah ${formatRupiah(
          coupon.minPurchase
        )}. Total belanja Anda saat ini ${formatRupiah(totalPurchase)}.`,
      };
    }

    const discountAmount = Math.round((totalPurchase * coupon.discountPercent) / 100);
    return {
      isValid: true,
      coupon,
      discountAmount,
      message: `Kupon ${coupon.code} berhasil diterapkan! Anda hemat ${formatRupiah(
        discountAmount
      )} (Diskon ${coupon.discountPercent}%).`,
    };
  }

  // Jika kupon khusus kategori tertentu
  const matchingItems = items.filter(
    (item) => item.product.category === coupon.category
  );

  if (matchingItems.length === 0) {
    return {
      isValid: false,
      coupon,
      discountAmount: 0,
      message: `Kupon ${coupon.code} hanya berlaku untuk artefak kategori "${coupon.category}". Keranjang Anda belum berisi produk dari kategori ini.`,
    };
  }

  const matchingSubtotal = matchingItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (matchingSubtotal < coupon.minPurchase) {
    return {
      isValid: false,
      coupon,
      discountAmount: 0,
      message: `Minimal belanja artefak kategori "${coupon.category}" untuk kupon ini adalah ${formatRupiah(
        coupon.minPurchase
      )}. Subtotal kategori ini baru ${formatRupiah(matchingSubtotal)}.`,
    };
  }

  const discountAmount = Math.round((matchingSubtotal * coupon.discountPercent) / 100);
  return {
    isValid: true,
    coupon,
    discountAmount,
    message: `Kupon ${coupon.code} berhasil diterapkan untuk kategori ${coupon.category}! Anda hemat ${formatRupiah(
      discountAmount
    )}.`,
  };
}
