import productNecklace1 from "@/assets/product-necklace-1.jpg";
import productNecklace2 from "@/assets/product-necklace-2.jpg";
import productNecklace3 from "@/assets/product-necklace-3.jpg";
import productBracelet1 from "@/assets/product-bracelet-1.jpg";
import productEarrings1 from "@/assets/product-earrings-1.jpg";
import productRing1 from "@/assets/product-ring-1.jpg";
import productRing2 from "@/assets/product-ring-2.jpg";

import type { Product } from "./cart-context";

export const products: Product[] = [
  {
    id: "1",
    name: "Chaîne Dorée Délicate",
    price: 89,
    image: productNecklace1,
    category: "Necklaces",
    description: "A timeless delicate gold chain that elevates any outfit. Perfect for layering or wearing alone.",
  },
  {
    id: "2",
    name: "Pendentif Lune",
    price: 120,
    image: productNecklace2,
    category: "Necklaces",
    description: "A dainty moon pendant on a fine chain. A celestial touch for your everyday look.",
  },
  {
    id: "3",
    name: "Collier Multi-Rangs",
    price: 149,
    image: productNecklace3,
    category: "Necklaces",
    description: "Layered gold chains for a bold yet elegant statement. The ultimate gift.",
  },
  {
    id: "4",
    name: "Bracelet Maille Dorée",
    price: 75,
    image: productBracelet1,
    category: "Bracelets",
    description: "A classic gold chain bracelet. Timeless elegance for your wrist.",
  },
  {
    id: "5",
    name: "Créoles Classiques",
    price: 95,
    image: productEarrings1,
    category: "Earrings",
    description: "Classic gold hoop earrings. Effortlessly chic and endlessly versatile.",
  },
  {
    id: "6",
    name: "Bagues Dorées Set",
    price: 110,
    image: productRing1,
    category: "Rings",
    description: "A curated set of gold stacking rings. Mix, match, and make them yours.",
  },
  {
    id: "7",
    name: "Chevalière Signature",
    price: 130,
    image: productRing2,
    category: "Rings",
    description: "A statement signet ring with delicate detailing. Bold and feminine.",
  },
];
