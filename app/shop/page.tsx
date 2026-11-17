"use client";

import React, { useState, useMemo, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import ProductGrid from "@/components/ProductGrid";
import { CATEGORIES, DUMMY_PRODUCTS } from "@/data/products";
import { fetchProducts } from "@/lib/supabase";
import { Category, Product } from "@/types";
import PromoBanner from "@/components/PromoBanner";

const ITEMS_PER_PAGE = 24;

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const shopTopRef = useRef<HTMLDivElement>(null);

  const [products, setProducts] = useState<Product[]>(DUMMY_PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);

  const categoryList = useMemo(() => CATEGORIES.map((c) => c.name), []);

  // Ambil data produk dari Supabase (fallback otomatis ke dummy jika belum disetting)
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetchProducts()
      .then((data) => {
        if (isMounted && data && data.length > 0) {
          setProducts(data);
        }
      })
      .catch((err) => {
        console.warn("Gagal memuat produk dari Supabase:", err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Update selectedCategory if query param changes
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategory(cat);
      setCurrentPage(1);
    }
  }, [searchParams]);

  // Reset ke halaman 1 saat filter atau pencarian berubah
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("featured");
    setCurrentPage(1);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product: Product) => {
        // Category filter
        if (selectedCategory && selectedCategory !== "All") {
          if (product.category !== selectedCategory) return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchName = product.name.toLowerCase().includes(query);
          const matchDesc = product.description.toLowerCase().includes(query);
          const matchCat = product.category.toLowerCase().includes(query);
          const matchCond = product.condition.toLowerCase().includes(query);
          if (!matchName && !matchDesc && !matchCat && !matchCond) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") {
          return a.price - b.price;
        }
        if (sortBy === "price-desc") {
          return b.price - a.price;
        }
        if (sortBy === "name-asc") {
          return a.name.localeCompare(b.name);
        }
        // "featured" default sorting
        return 0;
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  // Hitung jumlah halaman total
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;

  // Pastikan currentPage tidak melebihi totalPages
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  // Ambil 24 produk untuk halaman yang sedang aktif
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, startIndex]);

  // Pindah halaman dengan scroll halus ke bagian atas katalog
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    if (shopTopRef.current) {
      shopTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Logika pembuatan tombol nomor halaman dengan ellipsis (...)
  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  }, [currentPage, totalPages]);

  return (
    <div>
      {/* 12.12 Flash Sale Banner at top */}
      <PromoBanner />

      <div ref={shopTopRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 scroll-mt-24">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto pt-4 pb-2">
        <span className="text-xs uppercase tracking-[0.3em] text-[#8C6F56] font-sans block mb-2">
          Koleksi Terkurasi
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#2A1D15] tracking-wide">
          Galeri Artefak & Barang Antik
        </h1>
        <div className="ornament-divider" />
        <p className="font-sans text-xs sm:text-sm text-[#78685A] leading-relaxed">
          Temukan koleksi busana vintage orisinil, jam saku mekanik, pernak-pernik dekorasi, dan perlengkapan klasik tempo dulu yang siap menemani hari Anda.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-4">
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Cari nama barang, kategori, atau era (contoh: Remington, jam saku, mantel, kulit)..."
          onClear={() => handleSearchChange("")}
        />

        <FilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          categories={categoryList}
        />
      </div>

      {/* Active Filter Tags Bar (if filtered) */}
      {(selectedCategory !== "All" || searchQuery) && (
        <div className="flex items-center gap-2 text-xs font-sans text-[#78685A] flex-wrap">
          <span>Filter aktif:</span>
          {selectedCategory !== "All" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#2A1D15] text-[#FAF6EE] rounded-[2px]">
              Kategori: {selectedCategory}
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#2A1D15] text-[#FAF6EE] rounded-[2px]">
              Pencarian: &quot;{searchQuery}&quot;
            </span>
          )}
          <button
            onClick={handleResetFilters}
            className="text-[#8C6F56] hover:text-[#2A1D15] underline ml-2 cursor-pointer"
          >
            Reset Semua Filter
          </button>
        </div>
      )}

      {/* Product Grid - 24 per page */}
      <ProductGrid
        products={paginatedProducts}
        emptyMessage="Tidak ada barang vintage yang sesuai dengan kata kunci atau kategori yang Anda pilih. Coba bersihkan filter pencarian."
      />

      {/* =========================================================================
          PAGINATION CONTROLS (Halaman 1, 2, 3, dst.) - Tanpa Tulisan Hitungan
         ========================================================================= */}
      {totalPages > 1 && (
        <div className="pt-10 pb-6 border-t border-[#D8C7B5] flex justify-center">
          <nav
            aria-label="Navigasi Halaman"
            className="flex items-center gap-1.5 flex-wrap justify-center select-none"
          >
            {/* Tombol Sebelumnya */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-sans uppercase tracking-wider rounded-[2px] border border-[#D8C7B5] bg-[#FAF6EE] text-[#2A1D15] hover:bg-[#F2ECE1] hover:border-[#8C6F56] transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Halaman Sebelumnya"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Sebelumnya</span>
            </button>

            {/* Tombol Nomor Halaman: 1, 2, 3, dst */}
            {pageNumbers.map((page, idx) => {
              if (page === "...") {
                return (
                  <span
                    key={`ellipsis-${idx}`}
                    className="px-2 py-1 text-xs text-[#8C6F56] font-serif"
                  >
                    …
                  </span>
                );
              }

              const pageNum = Number(page);
              const isActive = currentPage === pageNum;

              return (
                <button
                  key={`page-${pageNum}`}
                  onClick={() => handlePageChange(pageNum)}
                  aria-current={isActive ? "page" : undefined}
                  className={`min-w-[36px] h-9 px-2 text-xs font-sans font-medium rounded-[2px] transition-all cursor-pointer border ${
                    isActive
                      ? "bg-[#2A1D15] text-[#FAF6EE] border-[#C59B4B] shadow-sm font-bold"
                      : "bg-[#FAF6EE] text-[#5A4232] border-[#D8C7B5] hover:border-[#8C6F56] hover:bg-[#F2ECE1]"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Tombol Selanjutnya */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-sans uppercase tracking-wider rounded-[2px] border border-[#D8C7B5] bg-[#FAF6EE] text-[#2A1D15] hover:bg-[#F2ECE1] hover:border-[#8C6F56] transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Halaman Selanjutnya"
            >
              <span>Selanjutnya</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </nav>
        </div>
      )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center font-serif text-[#78685A]">
          Memuat Galeri Koleksi...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
