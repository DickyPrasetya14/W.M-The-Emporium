export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  stock: number;
  condition: string; // e.g. "Original Vintage", "Like New", "Good Condition", "Mint Condition"
  tag?: string;      // e.g. "Best Seller", "New", "Rare", or ""
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Coupon {
  code: string;
  title: string;
  description: string;
  discountPercent: number;
  category: string; // e.g. "Vintage Fashion", "Retro Accessories", "Antique Decor", "Classic Goods", or "Semua Kategori"
  minPurchase: number;
  expiryDate: string;
}

export interface Order {
  id: string;
  customerName: string;
  whatsapp: string;
  address: string;
  notes?: string;
  paymentMethod: "COD" | "Transfer Bank";
  items: CartItem[];
  totalPrice: number;
  discountAmount?: number;
  finalPrice?: number;
  couponCode?: string;
  createdAt: string;
}

export type Category = 
  | "Vintage Fashion"
  | "Retro Accessories"
  | "Antique Decor"
  | "Classic Goods";
