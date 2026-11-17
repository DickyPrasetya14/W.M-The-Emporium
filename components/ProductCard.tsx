"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/types";
import { formatRupiah } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <div className="group relative bg-[#FAF6EE] border border-[#D8C7B5]/80 hover:border-[#8C6F56] transition-all duration-300 rounded-[2px] overflow-hidden flex flex-col shadow-xs hover:shadow-vintageHover">
      {/* Product Image & Badges */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EBDCCB]/30">
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Subtle warm sepia overlay */}
          <div className="absolute inset-0 bg-[#2A1D15]/5 group-hover:bg-transparent transition-colors duration-300" />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.tag && (
            <span
              className={`px-2 py-0.5 text-[10px] font-sans uppercase tracking-widest font-semibold rounded-[2px] shadow-xs ${
                product.tag === "Rare"
                  ? "bg-[#2A1D15] text-[#C59B4B] border border-[#C59B4B]/50"
                  : product.tag === "Best Seller"
                  ? "bg-[#C59B4B] text-[#1F1813] border border-[#9E762E]"
                  : "bg-[#FAF6EE] text-[#2A1D15] border border-[#8C6F56]"
              }`}
            >
              {product.tag}
            </span>
          )}
          <span className="px-2 py-0.5 text-[10px] font-sans tracking-wider bg-[#FAF6EE]/90 text-[#3A281E] border border-[#D8C7B5] backdrop-blur-xs rounded-[2px]">
            {product.condition}
          </span>
        </div>

        {/* Quick Action Button on Hover */}
        <div className="absolute inset-x-2 bottom-2.5 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="flex-1 py-2 px-3 bg-[#2A1D15]/95 hover:bg-[#2A1D15] text-[#FAF6EE] text-[11px] font-sans uppercase tracking-wider font-medium rounded-[2px] border border-[#C59B4B]/60 shadow-md flex items-center justify-center gap-1.5 transition-all hover:border-[#C59B4B] disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* Card Info Content */}
      <div className="p-4 flex-1 flex flex-col justify-between border-t border-[#D8C7B5]/50 bg-[#FAF6EE]">
        <div>
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8C6F56] block mb-1">
            {product.category}
          </span>
          <h3 className="font-serif text-base sm:text-lg text-[#2A1D15] leading-snug line-clamp-2 group-hover:text-[#8C6F56] transition-colors">
            <Link href={`/product/${product.id}`}>{product.name}</Link>
          </h3>
        </div>

        <div className="mt-3 pt-3 border-t border-[#D8C7B5]/40 flex items-baseline justify-between">
          <div>
            <span className="text-xs text-[#78685A] block text-[10px] uppercase tracking-wider">
              Harga
            </span>
            <span className="font-serif text-base sm:text-lg font-bold text-[#2A1D15]">
              {formatRupiah(product.price)}
            </span>
          </div>
          
          <div className="text-right">
            {product.stock <= 2 && product.stock > 0 ? (
              <span className="text-[10px] text-[#A64B2A] font-sans font-medium">
                Sisa {product.stock} barang!
              </span>
            ) : product.stock > 0 ? (
              <span className="text-[10px] text-[#5A4232] font-sans">
                Stok: {product.stock}
              </span>
            ) : (
              <span className="text-[10px] text-[#8C6F56] font-sans">
                Stok Habis
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
