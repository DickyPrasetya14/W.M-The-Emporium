"use client";

import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Cari artefak, jam saku, mantel wol, atau mesin tik antik...",
  onClear,
}) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C6F56]">
        <Search className="w-4 h-4" />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-3 bg-[#FAF6EE] text-[#2A1D15] placeholder-[#9E8B7A] text-xs sm:text-sm font-sans border border-[#D8C7B5] rounded-[2px] focus:outline-none focus:border-[#8C6F56] focus:ring-1 focus:ring-[#8C6F56]/30 transition-all shadow-xs"
      />

      {value && (
        <button
          type="button"
          onClick={() => {
            onChange("");
            if (onClear) onClear();
          }}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8C6F56] hover:text-[#2A1D15] transition-colors"
          aria-label="Bersihkan pencarian"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
