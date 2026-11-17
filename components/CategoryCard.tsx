import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Category } from "@/types";

interface CategoryCardProps {
  category: {
    name: Category;
    description: string;
    image: string;
  };
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const queryParam = encodeURIComponent(category.name);

  return (
    <Link
      href={`/shop?category=${queryParam}`}
      className="group relative block aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-[2px] border border-[#D8C7B5] shadow-xs hover:shadow-vintageHover transition-all duration-500"
    >
      {/* Background Image with Warm Vintage Filter */}
      <Image
        src={category.image}
        alt={category.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
      />

      {/* Dark Sepia / Vignette Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1F1813]/90 via-[#2A1D15]/40 to-transparent group-hover:from-[#1F1813]/95 transition-all duration-300" />

      {/* Thin Inner Border / Stamp Outline */}
      <div className="absolute inset-3 border border-[#EBDCCB]/30 group-hover:border-[#C59B4B]/60 transition-colors pointer-events-none rounded-[1px]" />

      {/* Content at Bottom */}
      <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col justify-end text-[#FAF6EE]">
        <div className="flex items-center gap-1.5 text-[#C59B4B] text-xs font-serif mb-1">
          <span>✦</span>
          <span className="uppercase tracking-[0.25em] text-[10px] font-sans">
            Koleksi
          </span>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl text-[#FAF6EE] group-hover:text-[#DFBF7A] transition-colors duration-300">
          {category.name}
        </h3>

        <p className="text-xs text-[#E5DCD0] font-sans mt-2 line-clamp-2 opacity-90 leading-relaxed font-light">
          {category.description}
        </p>

        <div className="mt-4 pt-3 border-t border-[#EBDCCB]/20 flex items-center justify-between text-xs font-sans tracking-widest uppercase text-[#FAF6EE] group-hover:text-[#C59B4B] transition-colors">
          <span>Lihat Koleksi</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
