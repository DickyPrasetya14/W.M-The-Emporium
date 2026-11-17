"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Product, Coupon } from "@/types";
import { calculateCartTotal, calculateTotalItems } from "@/lib/utils";
import { validateAndCalculateDiscount, getCouponByCode } from "@/data/coupons";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
  appliedCoupon: Coupon | null;
  discountAmount: number;
  finalPrice: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "the_emporium_cart_v1";
const COUPON_STORAGE_KEY = "the_emporium_coupon_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart and coupon from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }

      const storedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
      if (storedCoupon) {
        const parsedCoupon = JSON.parse(storedCoupon);
        if (parsedCoupon && parsedCoupon.code) {
          const validCoupon = getCouponByCode(parsedCoupon.code);
          if (validCoupon) {
            setAppliedCoupon(validCoupon);
          }
        }
      }
    } catch (e) {
      console.error("Failed to load cart/coupon from localStorage", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save cart to localStorage on updates (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.error("Failed to save cart to localStorage", e);
      }
    }
  }, [items, isHydrated]);

  // Save or remove coupon in localStorage
  useEffect(() => {
    if (isHydrated) {
      try {
        if (appliedCoupon) {
          localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
        } else {
          localStorage.removeItem(COUPON_STORAGE_KEY);
        }
      } catch (e) {
        console.error("Failed to save coupon to localStorage", e);
      }
    }
  }, [appliedCoupon, isHydrated]);

  const addItem = (product: Product, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        const newQty = Math.min(
          updated[existingIndex].quantity + quantity,
          product.stock
        );
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };
        return updated;
      } else {
        return [...prevItems, { product, quantity: Math.min(quantity, product.stock) }];
      }
    });

    // Auto open drawer when item is added
    setIsCartOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.product.id === productId) {
          const clampedQty = Math.min(quantity, item.product.stock);
          return { ...item, quantity: clampedQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const result = validateAndCalculateDiscount(code, items);
    if (result.isValid && result.coupon) {
      setAppliedCoupon(result.coupon);
      return { success: true, message: result.message };
    }
    return { success: false, message: result.message };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const totalItems = calculateTotalItems(items);
  const totalPrice = calculateCartTotal(items);

  // Hitung diskon kupon aktif secara dinamis
  let discountAmount = 0;
  if (appliedCoupon && items.length > 0) {
    const check = validateAndCalculateDiscount(appliedCoupon.code, items);
    if (check.isValid) {
      discountAmount = check.discountAmount;
    }
  }

  const finalPrice = Math.max(0, totalPrice - discountAmount);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        totalItems,
        totalPrice,
        appliedCoupon,
        discountAmount,
        finalPrice,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
