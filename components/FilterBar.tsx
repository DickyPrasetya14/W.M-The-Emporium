"use client";

import React from "react";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Category } from "@/types";

interface FilterBarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  categories: Category[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  categories,
}) => {
  return (
    <div className="bg-[#FAF6EE] border border-[#D8C7B5] p-4 rounded-[2px] shadow-xs space-y-4">
      {/* Category Pills */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-xs font-serif text-[#5A4232]">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#C59B4B]" />
          <span className="uppercase tracking-widest font-semibold text-[11px]">
            Kategori Koleksi
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSelectCategory("All")}
            className={`px-3 py-1.5 text-xs font-sans tracking-wider uppercase rounded-[2px] transition-all border ${
              selectedCategory === "All" || !selectedCategory
                ? "bg-[#2A1D15] text-[#FAF6EE] border-[#2A1D15] font-medium shadow-xs"
                : "bg-[#FAF7F2] text-[#5A4232] border-[#D8C7B5] hover:border-[#8C6F56] hover:bg-[#F2ECE1]"
            }`}
          >
            Semua Koleksi
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-3 py-1.5 text-xs font-sans tracking-wider uppercase rounded-[2px] transition-all border ${
                selectedCategory === category
                  ? "bg-[#2A1D15] text-[#FAF6EE] border-[#2A1D15] font-medium shadow-xs"
                  : "bg-[#FAF7F2] text-[#5A4232] border-[#D8C7B5] hover:border-[#8C6F56] hover:bg-[#F2ECE1]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Filter Line: Sort Selector */}
      <div className="flex items-center justify-end pt-3 border-t border-[#D8C7B5]/60 text-xs">
        <div className="flex items-center gap-2">
          <label
            htmlFor="sort-select"
            className="flex items-center gap-1.5 text-[#5A4232] font-sans uppercase tracking-wider text-[11px] whitespace-nowrap"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-[#C59B4B]" />
            <span>Urutkan:</span>
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-[#FAF7F2] text-[#2A1D15] border border-[#D8C7B5] rounded-[2px] px-3 py-1.5 text-xs font-sans focus:outline-none focus:border-[#8C6F56] cursor-pointer"
          >
            <option value="featured">Koleksi Pilihan</option>
            <option value="price-asc">Harga: Termurah</option>
            <option value="price-desc">Harga: Termahal</option>
            <option value="name-asc">Nama: A - Z</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
