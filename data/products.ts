import { Product, Category } from "@/types";

export const CATEGORIES: { name: Category; description: string; image: string }[] = [
  {
    name: "Vintage Fashion",
    description: "Pakaian berpotongan klasik, mantel wol pilihan, dan sepatu kulit artisan.",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Retro Accessories",
    description: "Jam saku mekanik, kacamata tortoise, perhiasan emas filigri, dan pelengkap berkelas.",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Antique Decor",
    description: "Lampu banker kuningan, jam pendulum kayu kenari, dan cermin ukir barok.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Classic Goods",
    description: "Mesin tik antik, kamera rangefinder analog, dan gramofon kuningan bersejarah.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  },
];

// 12 Master Products
const MASTER_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Horology Heritage Mechanical Pocket Watch",
    price: 1250000,
    category: "Retro Accessories",
    description: "Jam saku mekanik antik berbahan kuningan tempa dengan ukiran motif Barok tahun 1940-an. Memiliki mekanisme putar manual klasik yang masih berdetak sangat presisi dengan kaca kristal cembung asli. Disertai rantai vest berbahan kuningan senada.",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
    stock: 3,
    condition: "Original Vintage",
    tag: "Best Seller",
  },
  {
    id: "prod-2",
    name: "Remington Antique Brass Typewriter 1932",
    price: 3800000,
    category: "Classic Goods",
    description: "Mesin tik klasik era 1930-an dengan bodi besi tempa hitam doff dan tuts berlapis cincin logam vintage. Pita tinta baru terpasang dan menghasilkan ketukan berkarakter khas sastra tempo dulu. Cocok untuk kolektor maupun dekorasi perpustakaan.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    stock: 1,
    condition: "Original Vintage",
    tag: "Rare",
  },
  {
    id: "prod-3",
    name: "Artisan Full-Grain Leather Gladstone Satchel",
    price: 1850000,
    category: "Vintage Fashion",
    description: "Tas jinjing berbahan kulit sapi asli nabati (vegetable-tanned) dengan patina coklat kayu mahoni yang menua secara elegan. Dilengkapi kunci putar kuningan antik, partisi berbahan kanvas katun tebal, dan jahitan benang lilin buatan tangan.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    stock: 5,
    condition: "Like New",
    tag: "Best Seller",
  },
  {
    id: "prod-4",
    name: "Edwardian Bankers Brass Desk Lamp",
    price: 1650000,
    category: "Antique Decor",
    description: "Lampu meja klasik para bankir era Edwardian dengan tudung kaca hijau zamrud tebal dan tiang kuningan padat dengan rantai tarik berbandul. Memberikan pencahayaan hangat temaram yang damai untuk meja kerja kayu ek Anda.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    stock: 2,
    condition: "Good Condition",
    tag: "New",
  },
  {
    id: "prod-5",
    name: "Victorian Trench Coat in Heritage Wool Blend",
    price: 2100000,
    category: "Vintage Fashion",
    description: "Mantel panjang berpotongan double-breasted klasik dari perpaduan wol Skotlandia dan katun twill tebal warna camel beige. Kancing tempurung kura-kura otentik dengan kerah lebar yang berwibawa dan sabuk pinggang buckle kuningan.",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80",
    stock: 4,
    condition: "Like New",
    tag: "New",
  },
  {
    id: "prod-6",
    name: "Leica III Rangefinder Vintage Camera 1950",
    price: 4900000,
    category: "Classic Goods",
    description: "Kamera analog 35mm rangefinder legendaris dengan bodi perak krom dan tekstur vulcanite hitam. Lensa Elmar 50mm f/3.5 bersih tanpa jamur, shutter speed mekanik berdetak halus. Karya agung teknik optik abad ke-20 yang siap pakai.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    stock: 1,
    condition: "Original Vintage",
    tag: "Rare",
  },
  {
    id: "prod-7",
    name: "Oxford Brogue Handcrafted Leather Boots",
    price: 1950000,
    category: "Vintage Fashion",
    description: "Sepatu bot kulit model wingtip Oxford dengan lubang brogue dekoratif klasik. Dibuat dengan konstruksi Goodyear welted yang tahan lama, sol kulit keras berlapis karet anti slip, dan warna coklat kastanye tua yang mewah.",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
    stock: 6,
    condition: "Like New",
    tag: "Best Seller",
  },
  {
    id: "prod-8",
    name: "Victorian Filigree Golden Hairpin & Brooch",
    price: 650000,
    category: "Retro Accessories",
    description: "Set peniti hias dan jepit rambut dengan teknik filigri emas tua yang rumit bertatahkan batu amber alami. Sentuhan romansa klasik Eropa abad ke-19 untuk menyempurnakan sanggul rambut atau kerah jas formal Anda.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    stock: 8,
    condition: "Original Vintage",
    tag: "",
  },
  {
    id: "prod-9",
    name: "Grandfather Walnut Wall Clock with Pendulum",
    price: 2750000,
    category: "Antique Decor",
    description: "Jam dinding antik berbahan kayu kenari solid dengan pendulum kuningan berayun dan dentang loncat Westminster setiap jam. Jarum jam bergaya katedral dengan angka Romawi klasik bertekstur enamel tua yang megah.",
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80",
    stock: 2,
    condition: "Good Condition",
    tag: "",
  },
  {
    id: "prod-10",
    name: "Gramophone Brass Horn Vinyl Record Player",
    price: 5200000,
    category: "Classic Goods",
    description: "Gramofon vintage dengan corong kembang kuningan tempa berdiameter 40cm dan peti kayu jati tua berukir. Dilengkapi pemutar piringan hitam 78/33 RPM manual dengan reproduksi suara akustik analog hangat yang penuh nostalgia.",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80",
    stock: 1,
    condition: "Original Vintage",
    tag: "Rare",
  },
  {
    id: "prod-11",
    name: "Tortoiseshell Acetate Classic Round Spectacles",
    price: 850000,
    category: "Retro Accessories",
    description: "Kacamata bulat berbingkai selulosa asetat motif tempurung kura-kura coklat amber vintage dengan engsel sambung 5-barrel kokoh dan jembatan hidung berbentuk lubang kunci khas intelektual era 1950-an.",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80",
    stock: 7,
    condition: "Like New",
    tag: "New",
  },
  {
    id: "prod-12",
    name: "Baroque Carved Gilt-Wood Table Mirror",
    price: 1350000,
    category: "Antique Decor",
    description: "Cermin rias meja berbingkai kayu ukir bersepuh emas antik dengan sudut ornamen daun acanthus khas gaya Barok. Kaca cermin beveled bertepi miring memberikan refleksi jernih nan ningrat pada meja rias Anda.",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
    stock: 3,
    condition: "Good Condition",
    tag: "",
  },
];

// Kumpulan template untuk membangkitkan 250 koleksi dummy secara realistis
const VINTAGE_IMAGE_POOL = [
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
];

const ITEM_NAMES_BY_CATEGORY: Record<Category, string[]> = {
  "Vintage Fashion": [
    "Savile Row Tweed Herringbone Waistcoat",
    "Florentine Hand-Stitched Leather Oxford Shoes",
    "Edinburgh Cashmere Knitted Scarf 1965",
    "Victorian Velvet Evening Smoking Jacket",
    "Heritage Double-Breasted Wool Overcoat",
    "Artisan Calfskin Waxed Duffle Bag",
    "Classic Fedora Felt Hat with Silk Ribbon",
    "Suede Chukka Boots with Crepe Sole",
    "Bespoke Linen Peaky Flat Cap",
    "Vintage Leather Aviator Bomber Jacket",
    "Milanese Tailored Wool Flannel Trousers",
    "Parisian Silk Paisley Ascot Cravat",
  ],
  "Retro Accessories": [
    "Victorian Amber Stone Signet Ring",
    "Swiss Open-Face Mechanical Pocket Watch 1928",
    "Tortoiseshell Acetate Reading Glasses",
    "Antique Brass Navigational Pocket Compass",
    "Art Deco Mother-of-Pearl Cufflinks Set",
    "Ornate Victorian Sterling Silver Locket",
    "Gold-Plated Filigree Evening Hair Comb",
    "Vintage Leather Braided Watch Fob Strap",
    "Baroque Engraved Brass Monocular Spyglass",
    "Handmade Leather Tobacco Pouch with Brass Clasp",
    "Classic 1950s Tortoise Aviator Sunglasses",
    "Engraved Silver Wax Seal Stamp & Wooden Handle",
  ],
  "Antique Decor": [
    "Edwardian Brass Swing-Arm Wall Sconce",
    "Baroque Gilt-Wood Acanthus Leaf Mirror",
    "Westminster Chime Solid Walnut Mantel Clock",
    "Emerald Glass Banker Table Reading Lamp",
    "French Provincial Carved Oak Bookstand",
    "Apothecary 12-Drawer Herb Cabinet",
    "Antique Cast Iron Victorian Key Display Rack",
    "Engraved Brass Celestial Desk Globe",
    "Victorian Floral Porcelain Teacup & Saucer Set",
    "Handmade Persian Wool Runner Rug 1940s",
    "Chesterfield Tufted Cigar Leather Footstool",
    "Ornate Pewter Candleholder with Snuffer",
  ],
  "Classic Goods": [
    "Olympia Traveller Portable Typewriter 1969",
    "Rolleiflex Medium Format Twin Lens Reflex Camera",
    "His Master Voice Brass Horn Phonograph 1920",
    "Parker 51 Aerometric Fountain Pen in Burgundy",
    "Antique Solid Brass Marine Sextant in Wooden Box",
    "Zenith Vacuum Tube Tabletop Radio 1948",
    "Leather Bound Hand-Marbled Blank Journal",
    "Vintage German Metronome in Mahogany Casing",
    "Underwood Noiseless Desktop Typewriter 1938",
    "Kodak Brownie Junior Vintage Box Camera",
    "Antique Copper Kettle with Wooden Grip",
    "Cast Iron Mechanical Coin Bank from 1910",
  ],
};

const CONDITIONS = ["Original Vintage", "Like New", "Good Condition", "Mint Condition"];
const TAGS = ["Best Seller", "Rare", "New", ""];

// Hasilkan 250 produk dummy lengkap
function generateFullCatalog(): Product[] {
  const catalog: Product[] = [...MASTER_PRODUCTS];
  const categories: Category[] = [
    "Vintage Fashion",
    "Retro Accessories",
    "Antique Decor",
    "Classic Goods",
  ];

  let idCounter = 13;
  while (catalog.length < 250) {
    const category = categories[(idCounter - 13) % categories.length];
    const namePool = ITEM_NAMES_BY_CATEGORY[category];
    const baseName = namePool[(idCounter - 13) % namePool.length];
    const image = VINTAGE_IMAGE_POOL[(idCounter - 13) % VINTAGE_IMAGE_POOL.length];
    const condition = CONDITIONS[(idCounter * 7) % CONDITIONS.length];
    const tag = TAGS[(idCounter * 3) % TAGS.length];
    
    // Variasi harga antara 450.000 s/d 5.500.000 dalam kelipatan 50.000
    const priceBase = 450000 + ((idCounter * 137000) % 4800000);
    const price = Math.round(priceBase / 50000) * 50000;
    const stock = 1 + ((idCounter * 3) % 7);

    catalog.push({
      id: `prod-${idCounter}`,
      name: `${baseName} (Series ${Math.floor(idCounter / 10) + 1})`,
      price,
      category,
      description: `Artefak vintage orisinil dari era pertengahan abad ke-20. Ditempa dan dirawat dengan keahlian tangan tinggi, memiliki detail patina alami yang khas dan masih berada dalam kondisi yang sangat prima untuk dikoleksi atau digunakan sehari-hari.`,
      image,
      stock,
      condition,
      tag,
    });

    idCounter++;
  }

  return catalog;
}

export const DUMMY_PRODUCTS: Product[] = generateFullCatalog();

export function getAllProducts(): Product[] {
  return DUMMY_PRODUCTS;
}

export function getProductById(id: string): Product | undefined {
  return DUMMY_PRODUCTS.find((p) => p.id === id);
}

export function getFeaturedProducts(limit: number = 8): Product[] {
  // Hanya ambil produk yang memiliki tag 'Best Seller' atau 'Rare'
  const curated = DUMMY_PRODUCTS.filter((p) => p.tag === "Best Seller" || p.tag === "Rare");
  if (curated.length >= limit) {
    return curated.slice(0, limit);
  }
  const others = DUMMY_PRODUCTS.filter((p) => p.tag !== "Best Seller" && p.tag !== "Rare");
  return [...curated, ...others].slice(0, limit);
}

export function getRelatedProducts(currentId: string, category: string, limit: number = 4): Product[] {
  return DUMMY_PRODUCTS.filter((p) => p.id !== currentId && p.category === category).slice(0, limit);
}
