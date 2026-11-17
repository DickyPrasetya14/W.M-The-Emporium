import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Product } from "@/types";
import { DUMMY_PRODUCTS, getProductById, getFeaturedProducts, getRelatedProducts } from "@/data/products";

/**
 * ============================================================================
 * SUPABASE CLIENT CONFIGURATION
 * ============================================================================
 * Menggunakan environment variable:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY
 * ============================================================================
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

// Cek apakah URL dan Key valid dan bukan placeholder bawaan
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith("http") &&
  !supabaseUrl.includes("your-project") &&
  !supabaseUrl.includes("placeholder") &&
  !supabaseAnonKey.includes("your-anon-key") &&
  supabaseAnonKey.length > 20
);

// Inisialisasi client secara aman
let client: SupabaseClient | null = null;

if (isSupabaseConfigured && supabaseUrl && supabaseAnonKey) {
  try {
    client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
    });
  } catch (err) {
    console.warn("Peringatan: Gagal menginisialisasi Supabase client, beralih ke data dummy:", err);
    client = null;
  }
}

export const supabase = client;

/**
 * ============================================================================
 * DATA FETCHING HELPERS WITH AUTOMATIC DUMMY FALLBACK
 * ============================================================================
 */

/**
 * Ambil semua produk dari Supabase.
 * Jika Supabase belum disetting / error koneksi, otomatis fallback ke dummy products.
 */
export async function fetchProducts(): Promise<Product[]> {
  if (!supabase) {
    return DUMMY_PRODUCTS;
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) {
      console.warn("Supabase query error (products):", error.message);
      return DUMMY_PRODUCTS;
    }

    if (data && data.length > 0) {
      // Normalisasi format produk
      return data.map((item) => ({
        id: String(item.id),
        name: String(item.name || ""),
        price: Number(item.price || 0),
        category: String(item.category || "Vintage Fashion"),
        description: String(item.description || ""),
        image: String(item.image || ""),
        stock: Number(item.stock ?? 1),
        condition: String(item.condition || "Original Vintage"),
        tag: item.tag ? String(item.tag) : "",
      }));
    }

    // Jika tabel kosong, fallback ke dummy
    return DUMMY_PRODUCTS;
  } catch (err) {
    console.warn("Gagal menghubungi Supabase, menggunakan data dummy:", err);
    return DUMMY_PRODUCTS;
  }
}

/**
 * Ambil detail produk berdasarkan ID.
 * Fallback ke dummy jika tidak ditemukan di Supabase / terjadi error.
 */
export async function fetchProductById(id: string): Promise<Product | null> {
  if (!supabase) {
    return getProductById(id) || null;
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.warn(`Supabase error (product ${id}):`, error.message);
      return getProductById(id) || null;
    }

    if (data) {
      return {
        id: String(data.id),
        name: String(data.name || ""),
        price: Number(data.price || 0),
        category: String(data.category || "Vintage Fashion"),
        description: String(data.description || ""),
        image: String(data.image || ""),
        stock: Number(data.stock ?? 1),
        condition: String(data.condition || "Original Vintage"),
        tag: data.tag ? String(data.tag) : "",
      };
    }

    // Cek juga di dummy jika id tersebut ada di data lokal
    return getProductById(id) || null;
  } catch (err) {
    console.warn("Gagal mengambil produk dari Supabase:", err);
    return getProductById(id) || null;
  }
}

/**
 * Ambil produk unggulan untuk halaman Home (8 produk dengan tag Best Seller atau Rare).
 */
export async function fetchFeaturedProducts(limit: number = 8): Promise<Product[]> {
  const all = await fetchProducts();
  const featured = all.filter((p) => p.tag === "Best Seller" || p.tag === "Rare");
  if (featured.length >= limit) {
    return featured.slice(0, limit);
  }
  const additional = all.filter((p) => p.tag !== "Best Seller" && p.tag !== "Rare");
  return [...featured, ...additional].slice(0, limit);
}

/**
 * Ambil produk yang serupa berdasarkan kategori.
 */
export async function fetchRelatedProducts(
  currentId: string,
  category: string,
  limit: number = 4
): Promise<Product[]> {
  const all = await fetchProducts();
  return all.filter((p) => p.id !== currentId && p.category === category).slice(0, limit);
}
