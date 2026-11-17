import React from "react";
import { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  emptyMessage = "Belum ada produk yang sesuai dengan kriteria pencarian Anda.",
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-[#FAF6EE] border border-dashed border-[#D8C7B5] rounded-[2px] my-6">
        <span className="text-[#C59B4B] text-2xl font-serif block mb-2">✦</span>
        <h3 className="font-serif text-lg text-[#2A1D15] mb-2">
          Koleksi Tidak Ditemukan
        </h3>
        <p className="text-sm text-[#78685A] font-sans max-w-md mx-auto">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
