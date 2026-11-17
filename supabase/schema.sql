-- =========================================================
-- THE EMPORIUM — SKEMA DATABASE LENGKAP UNTUK SUPABASE
-- =========================================================
-- Skrip ini akan:
-- 1. Membuat tabel 'products' jika belum ada
-- 2. Mengaktifkan Row Level Security (RLS) & Policy akses publik
-- 3. Memasukkan 250 koleksi artefak vintage lengkap secara otomatis
-- =========================================================

-- 1. Buat Tabel Products
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 1,
  condition TEXT NOT NULL,
  tag TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 3. Kebijakan Akses Baca Publik (Semua pengunjung web dapat melihat produk)
DROP POLICY IF EXISTS "Public Read Access" ON public.products;
CREATE POLICY "Public Read Access"
  ON public.products
  FOR SELECT
  USING (true);

-- 4. Masukkan 12 Master Produk Utama
INSERT INTO public.products (id, name, price, category, description, image, stock, condition, tag)
VALUES
  (
    'prod-1',
    'Horology Heritage Mechanical Pocket Watch',
    1250000,
    'Retro Accessories',
    'Jam saku mekanik antik berbahan kuningan tempa dengan ukiran motif Barok tahun 1940-an. Memiliki mekanisme putar manual klasik yang masih berfungsi sangat presisi dengan kaca kristal cembung asli.',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    3,
    'Original Vintage',
    'Best Seller'
  ),
  (
    'prod-2',
    'Remington Antique Brass Typewriter 1932',
    3800000,
    'Classic Goods',
    'Mesin tik klasik era 1930-an dengan bodi besi tempa hitam doff dan tuts berlapis cincin logam vintage. Pita tinta baru terpasang dan menghasilkan ketukan berkarakter khas sastra tempo dulu.',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    1,
    'Original Vintage',
    'Rare'
  ),
  (
    'prod-3',
    'Artisan Full-Grain Leather Gladstone Satchel',
    1850000,
    'Vintage Fashion',
    'Tas jinjing berbahan kulit sapi asli nabati (vegetable-tanned) dengan patina coklat kayu mahoni yang menua secara elegan. Dilengkapi kunci putar kuningan antik dan jahitan benang lilin tebal buatan tangan.',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    5,
    'Like New',
    'Best Seller'
  ),
  (
    'prod-4',
    'Edwardian Bankers Brass Desk Lamp',
    1650000,
    'Antique Decor',
    'Lampu meja klasik para bankir era Edwardian dengan tudung kaca hijau zamrud dan tiang kuningan padat dengan rantai tarik berbandul. Memberikan pencahayaan hangat temaram yang damai untuk ruang baca.',
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    2,
    'Good Condition',
    'New'
  ),
  (
    'prod-5',
    'Victorian Trench Coat in Heritage Wool Blend',
    2100000,
    'Vintage Fashion',
    'Mantel panjang berpotongan double-breasted klasik dari perpaduan wol Skotlandia dan katun twill tebal warna camel beige. Kancing tempurung kura-kura otentik dengan kerah lebar yang berwibawa.',
    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80',
    4,
    'Like New',
    'New'
  ),
  (
    'prod-6',
    'Leica III Rangefinder Vintage Camera 1950',
    4900000,
    'Classic Goods',
    'Kamera analog 35mm rangefinder legendaris dengan bodi perak krom dan tekstur vulcanite hitam. Lensa Elmar 50mm f/3.5 bersih tanpa jamur, shutter speed mekanik berdetak halus.',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    1,
    'Original Vintage',
    'Rare'
  ),
  (
    'prod-7',
    'Oxford Brogue Handcrafted Leather Boots',
    1950000,
    'Vintage Fashion',
    'Sepatu bot kulit model wingtip Oxford dengan lubang brogue dekoratif klasik. Dibuat dengan konstruksi Goodyear welted yang tahan lama, sol kulit keras, dan warna coklat kastanye tua yang mewah.',
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
    6,
    'Like New',
    'Best Seller'
  ),
  (
    'prod-8',
    'Victorian Filigree Golden Hairpin & Brooch',
    650000,
    'Retro Accessories',
    'Set peniti hias dan jepit rambut dengan teknik filigri emas tua yang rumit bertatahkan batu amber alami. Sentuhan romansa klasik Eropa abad ke-19 untuk menyempurnakan busana formal vintage.',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    8,
    'Original Vintage',
    ''
  ),
  (
    'prod-9',
    'Grandfather Walnut Wall Clock with Pendulum',
    2750000,
    'Antique Decor',
    'Jam dinding antik berbahan kayu kenari solid dengan pendulum kuningan berayun dan dentang loncat Westminster setiap jam. Jarum jam bergaya katedral dengan angka Romawi klasik bertekstur enamel.',
    'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80',
    2,
    'Good Condition',
    ''
  ),
  (
    'prod-10',
    'Gramophone Brass Horn Vinyl Record Player',
    5200000,
    'Classic Goods',
    'Gramofon vintage dengan corong kembang kuningan tempa berdiameter 40cm dan peti kayu jati ukir. Dilengkapi pemutar piringan hitam 78/33 RPM manual dengan suara hangat analog yang nostalgia.',
    'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80',
    1,
    'Original Vintage',
    'Rare'
  ),
  (
    'prod-11',
    'Tortoiseshell Acetate Classic Round Spectacles',
    850000,
    'Retro Accessories',
    'Kacamata bulat bingkai selulosa asetat motif tempurung kura-kura coklat amber vintage dengan engsel sambung 5-barrel dan jembatan hidung berbentuk lubang kunci era 1950-an.',
    'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80',
    7,
    'Like New',
    'New'
  ),
  (
    'prod-12',
    'Baroque Carved Gilt-Wood Table Mirror',
    1350000,
    'Antique Decor',
    'Cermin rias meja berbingkai kayu ukir bersepuh emas antik dengan sudut ornamen daun acanthus khas gaya Barok. Kaca cermin beveled bertepi miring memberikan refleksi jernih nan ningrat.',
    'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80',
    3,
    'Good Condition',
    ''
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  category = EXCLUDED.category,
  image = EXCLUDED.image,
  stock = EXCLUDED.stock,
  condition = EXCLUDED.condition,
  tag = EXCLUDED.tag;

-- 5. Masukkan 238 Artefak Tambahan (Total Tepat 250 Koleksi di Supabase)
DO $$
DECLARE
  i INTEGER;
  cat_arr TEXT[] := ARRAY['Vintage Fashion', 'Retro Accessories', 'Antique Decor', 'Classic Goods'];
  cond_arr TEXT[] := ARRAY['Original Vintage', 'Like New', 'Good Condition', 'Mint Condition'];
  tag_arr TEXT[] := ARRAY['Best Seller', 'Rare', 'New', ''];
  img_arr TEXT[] := ARRAY[
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80'
  ];
  fashion_names TEXT[] := ARRAY[
    'Savile Row Tweed Herringbone Waistcoat', 'Florentine Hand-Stitched Oxford Shoes',
    'Edinburgh Cashmere Knitted Scarf 1965', 'Victorian Velvet Evening Smoking Jacket',
    'Heritage Double-Breasted Wool Overcoat', 'Artisan Calfskin Waxed Duffle Bag',
    'Classic Fedora Felt Hat with Silk Ribbon', 'Suede Chukka Boots with Crepe Sole',
    'Bespoke Linen Peaky Flat Cap', 'Vintage Leather Aviator Bomber Jacket',
    'Milanese Tailored Wool Flannel Trousers', 'Parisian Silk Paisley Ascot Cravat'
  ];
  access_names TEXT[] := ARRAY[
    'Victorian Amber Stone Signet Ring', 'Swiss Open-Face Pocket Watch 1928',
    'Tortoiseshell Acetate Reading Glasses', 'Antique Brass Navigational Pocket Compass',
    'Art Deco Mother-of-Pearl Cufflinks Set', 'Ornate Victorian Sterling Silver Locket',
    'Gold-Plated Filigree Evening Hair Comb', 'Vintage Leather Braided Watch Fob Strap',
    'Baroque Engraved Brass Monocular Spyglass', 'Handmade Leather Tobacco Pouch with Brass Clasp',
    'Classic 1950s Tortoise Aviator Sunglasses', 'Engraved Silver Wax Seal Stamp & Wooden Handle'
  ];
  decor_names TEXT[] := ARRAY[
    'Edwardian Brass Swing-Arm Wall Sconce', 'Baroque Gilt-Wood Acanthus Leaf Mirror',
    'Westminster Chime Solid Walnut Mantel Clock', 'Emerald Glass Banker Table Reading Lamp',
    'French Provincial Carved Oak Bookstand', 'Apothecary 12-Drawer Herb Cabinet',
    'Antique Cast Iron Victorian Key Display Rack', 'Engraved Brass Celestial Desk Globe',
    'Victorian Floral Porcelain Teacup & Saucer Set', 'Handmade Persian Wool Runner Rug 1940s',
    'Chesterfield Tufted Cigar Leather Footstool', 'Ornate Pewter Candleholder with Snuffer'
  ];
  goods_names TEXT[] := ARRAY[
    'Olympia Traveller Portable Typewriter 1969', 'Rolleiflex Medium Format TLR Camera',
    'His Master Voice Brass Horn Phonograph 1920', 'Parker 51 Aerometric Fountain Pen in Burgundy',
    'Antique Solid Brass Marine Sextant in Wooden Box', 'Zenith Vacuum Tube Tabletop Radio 1948',
    'Leather Bound Hand-Marbled Blank Journal', 'Vintage German Metronome in Mahogany Casing',
    'Underwood Noiseless Desktop Typewriter 1938', 'Kodak Brownie Junior Vintage Box Camera',
    'Antique Copper Kettle with Wooden Grip', 'Cast Iron Mechanical Coin Bank from 1910'
  ];
  chosen_cat TEXT;
  chosen_name TEXT;
  chosen_img TEXT;
  chosen_cond TEXT;
  chosen_tag TEXT;
  chosen_price NUMERIC;
  chosen_stock INTEGER;
BEGIN
  FOR i IN 13..250 LOOP
    chosen_cat := cat_arr[1 + ((i - 13) % 4)];
    IF chosen_cat = 'Vintage Fashion' THEN
      chosen_name := fashion_names[1 + ((i - 13) % 12)] || ' (Series ' || ((i / 10) + 1)::TEXT || ')';
    ELSIF chosen_cat = 'Retro Accessories' THEN
      chosen_name := access_names[1 + ((i - 13) % 12)] || ' (Series ' || ((i / 10) + 1)::TEXT || ')';
    ELSIF chosen_cat = 'Antique Decor' THEN
      chosen_name := decor_names[1 + ((i - 13) % 12)] || ' (Series ' || ((i / 10) + 1)::TEXT || ')';
    ELSE
      chosen_name := goods_names[1 + ((i - 13) % 12)] || ' (Series ' || ((i / 10) + 1)::TEXT || ')';
    END IF;

    chosen_img := img_arr[1 + ((i - 13) % 20)];
    chosen_cond := cond_arr[1 + ((i * 7) % 4)];
    chosen_tag := tag_arr[1 + ((i * 3) % 4)];
    chosen_price := ROUND((450000 + ((i * 137000) % 4800000)) / 50000) * 50000;
    chosen_stock := 1 + ((i * 3) % 7);

    INSERT INTO public.products (id, name, price, category, description, image, stock, condition, tag)
    VALUES (
      'prod-' || i::TEXT,
      chosen_name,
      chosen_price,
      chosen_cat,
      'Artefak vintage orisinil dari era pertengahan abad ke-20. Ditempa dan dirawat dengan keahlian tangan tinggi, memiliki detail patina alami yang khas dan masih berada dalam kondisi yang sangat prima untuk dikoleksi atau digunakan sehari-hari.',
      chosen_img,
      chosen_stock,
      chosen_cond,
      chosen_tag
    )
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      price = EXCLUDED.price,
      category = EXCLUDED.category,
      image = EXCLUDED.image,
      stock = EXCLUDED.stock,
      condition = EXCLUDED.condition,
      tag = EXCLUDED.tag;
  END LOOP;
END $$;
