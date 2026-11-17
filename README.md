# The Emporium — Timeless Goods for Modern Life

Toko online artefak dan barang vintage dengan estetika klasik, elegan, dan hangat (warm brown, antique gold, cream, beige). Dibangun menggunakan Next.js App Router, TypeScript, Tailwind CSS, serta integrasi Supabase yang siap pakai.

---

## 🏛️ Teknologi yang Digunakan

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React Server & Client Components)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/) (Strict typing, no `any`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) dengan palet warna custom classic vintage
- **Database**: [Supabase](https://supabase.com/) (Disediakan schema SQL dan client terisolasi aman tanpa error jika belum disetting)
- **State Keranjang**: React Context API dengan sinkronisasi otomatis ke `localStorage`
- **Pemesanan**: WhatsApp Order Generator otomatis dengan rincian data pemesan, alamat, metode bayar (COD/Transfer), dan detail barang.

---

## 📁 Struktur Folder Proyek

```
W.M The Emporium/
├── app/
│   ├── about/
│   │   └── page.tsx              # Halaman cerita The Emporium & 4 pilar kurasi
│   ├── cart/
│   │   └── page.tsx              # Halaman keranjang belanja lengkap
│   ├── checkout/
│   │   └── page.tsx              # Halaman formulir pemesanan & WA checkout
│   ├── product/[id]/
│   │   └── page.tsx              # Halaman detail produk & produk serupa
│   ├── shop/
│   │   └── page.tsx              # Halaman katalog, search, filter & sort
│   ├── globals.css               # Styling vintage & texture parchment
│   ├── layout.tsx                # Root layout, fonts Google Serif & Sans, CartProvider
│   └── page.tsx                  # Beranda: Hero, Kategori, Unggulan, Testimoni
├── components/
│   ├── Button.tsx                # Tombol kotak vintage dengan border coklat tipis
│   ├── CartDrawer.tsx            # Drawer keranjang geser dari kanan
│   ├── CategoryCard.tsx          # Kartu kategori dengan frame klasik
│   ├── CheckoutForm.tsx          # Form COD/Transfer & WhatsApp order
│   ├── FilterBar.tsx             # Filter kategori & pengurutan harga
│   ├── Footer.tsx                # Footer lengkap, garansi & info galeri
│   ├── Header.tsx                # Navigasi, logo serif, counter keranjang
│   ├── ProductCard.tsx           # Kartu produk dengan badge kondisi & tag
│   ├── ProductGrid.tsx           # Grid responsif dengan pesan kosong elegan
│   └── SearchBar.tsx             # Pencarian artefak tempo dulu
├── data/
│   └── products.ts               # 12 produk dummy bernuansa vintage dengan gambar Unsplash
├── lib/
│   ├── cart-context.tsx          # State keranjang & sinkronisasi localStorage
│   ├── supabase.ts               # Supabase client aman & panduan schema
│   └── utils.ts                  # Format Rupiah & generator pesan WhatsApp
├── public/
│   └── images/
│       └── logo.svg              # Logo vektor The Emporium
├── supabase/
│   └── schema.sql                # SQL migration & seed data untuk Supabase
├── types/
│   └── index.ts                  # Definisi tipe Product, CartItem, Order, Category
├── tailwind.config.ts            # Konfigurasi warna vintage, font & shadow
├── tsconfig.json                 # Konfigurasi TypeScript compiler
└── package.json
```

---

## 📦 Menjalankan Proyek

1. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
2. Buka browser di [http://localhost:3000](http://localhost:3000).

---

## 🗄️ Setup Database Supabase (Opsional)

Website ini sudah **langsung berjalan** tanpa setup Supabase dengan memanfaatkan 12 data produk dummy di `data/products.ts`.

Jika ingin menghubungkan ke database Supabase:
1. Buat project baru di [Supabase Dashboard](https://supabase.com).
2. Salin isi file `supabase/schema.sql` dan jalankan di menu **SQL Editor** pada Supabase.
3. Buat file `.env.local` di root folder:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```
4. Restart development server (`npm run dev`).
