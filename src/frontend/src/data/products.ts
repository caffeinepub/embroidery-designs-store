import type { CartProduct } from "../context/CartContext";

export const mockProducts: CartProduct[] = [
  {
    id: "golden-rose-bouquet",
    name: "Golden Rose Bouquet",
    category: "Floral",
    priceUsd: "$4.99",
    imageUrl: "/assets/generated/product-floral.dim_400x400.jpg",
    description:
      "A stunning floral embroidery design featuring golden roses in full bloom. Perfect for garments, accessories, and home decor. Machine-tested for perfect stitch density.",
    formats: "DST, PES, JEF, EXP",
  },
  {
    id: "classic-monogram-set",
    name: "Classic Monogram Set",
    category: "Logo",
    priceUsd: "$6.99",
    imageUrl: "/assets/generated/product-logo.dim_400x400.jpg",
    description:
      "Premium monogram and logo embroidery set with 26 letter variations. Ideal for personalizing caps, shirts, towels, and business merchandise.",
    formats: "DST, PES, JEF, EXP, XXX",
  },
  {
    id: "paisley-dreams",
    name: "Paisley Dreams",
    category: "Traditional",
    priceUsd: "$5.49",
    imageUrl: "/assets/generated/product-traditional.dim_400x400.jpg",
    description:
      "Intricate paisley pattern inspired by traditional South Asian embroidery. Rich in detail with optimized thread paths for clean results on all machine types.",
    formats: "DST, PES, JEF, EXP",
  },
  {
    id: "teddy-bear-collection",
    name: "Teddy Bear Collection",
    category: "Kids",
    priceUsd: "$3.99",
    imageUrl: "/assets/generated/product-kids.dim_400x400.jpg",
    description:
      "Adorable teddy bear designs perfect for children's clothing, blankets, and plush items. 5 variations included, tested on soft fabrics.",
    formats: "DST, PES, JEF, EXP",
  },
  {
    id: "lotus-mandala",
    name: "Lotus Mandala",
    category: "Floral",
    priceUsd: "$5.99",
    imageUrl: "/assets/generated/product-floral.dim_400x400.jpg",
    description:
      "Elegant lotus mandala design with fine geometric detail. Ideal for spiritual wear, bags, and wall art embroidery.",
    formats: "DST, PES, JEF, EXP",
  },
  {
    id: "sports-team-badge",
    name: "Sports Team Badge",
    category: "Logo",
    priceUsd: "$7.99",
    imageUrl: "/assets/generated/product-logo.dim_400x400.jpg",
    description:
      "Bold sports badge design for team jerseys and caps. Clean outlines optimized for caps and thick fabrics.",
    formats: "DST, PES, JEF, EXP, VP3",
  },
  {
    id: "heritage-peacock",
    name: "Heritage Peacock",
    category: "Traditional",
    priceUsd: "$6.49",
    imageUrl: "/assets/generated/product-traditional.dim_400x400.jpg",
    description:
      "Traditional peacock design featuring intricate feather details. A timeless classic for sarees, kurtas, and table linens.",
    formats: "DST, PES, JEF, EXP",
  },
  {
    id: "unicorn-magic",
    name: "Unicorn Magic",
    category: "Kids",
    priceUsd: "$4.49",
    imageUrl: "/assets/generated/product-kids.dim_400x400.jpg",
    description:
      "Whimsical unicorn design with rainbow mane. Popular for girls' clothing, backpacks, and party items.",
    formats: "DST, PES, JEF, EXP",
  },
];

export function getProductById(id: string): CartProduct | undefined {
  return mockProducts.find((p) => p.id === id);
}
