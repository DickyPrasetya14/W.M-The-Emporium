import { CartItem } from "@/types";

/**
 * Format number to Indonesian Rupiah (e.g. Rp 450.000)
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate total price of all items in cart before discount
 */
export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
}

/**
 * Calculate total count of individual items in cart
 */
export function calculateTotalItems(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Generate formatted WhatsApp checkout message with coupon discount support
 */
export function generateWhatsAppOrderMessage(
  customerName: string,
  whatsapp: string,
  address: string,
  paymentMethod: string,
  items: CartItem[],
  notes?: string,
  couponCode?: string,
  discountAmount: number = 0
): string {
  const subtotal = calculateCartTotal(items);
  const finalTotal = Math.max(0, subtotal - (discountAmount || 0));
  const dateStr = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let message = `*PESANAN BARU - THE EMPORIUM*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Tanggal: ${dateStr}\n\n`;
  message += `*DATA PEMESAN:*\n`;
  message += `Nama: ${customerName}\n`;
  message += `WhatsApp: ${whatsapp}\n`;
  message += `Alamat Pengiriman: ${address}\n`;
  message += `Metode Pembayaran: ${paymentMethod}\n`;
  if (notes && notes.trim()) {
    message += `Catatan: ${notes.trim()}\n`;
  }
  message += `\n*DETAIL PRODUK:*\n`;

  items.forEach((item, index) => {
    const itemSubtotal = item.product.price * item.quantity;
    message += `${index + 1}. ${item.product.name}\n`;
    message += `   ${item.quantity}x @ ${formatRupiah(item.product.price)} = ${formatRupiah(itemSubtotal)}\n`;
    message += `   Kategori: ${item.product.category} | Kondisi: ${item.product.condition}\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Subtotal Barang: ${formatRupiah(subtotal)}\n`;
  if (couponCode && discountAmount > 0) {
    message += `Kupon Diskon (${couponCode}): -${formatRupiah(discountAmount)}\n`;
  }
  message += `*TOTAL AKHIR: ${formatRupiah(finalTotal)}*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `Halo Admin The Emporium, saya ingin menyelesaikan pemesanan di atas. Mohon konfirmasi ketersediaan barang dan detail nomor rekening / instruksi pembayaran. Terima kasih.`;

  return encodeURIComponent(message);
}
