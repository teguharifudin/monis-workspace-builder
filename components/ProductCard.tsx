"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  selected: boolean;
  onSelect: () => void;
}

export default function ProductCard({ product, selected, onSelect }: ProductCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      className={`relative w-full text-left rounded-xl border-2 transition-all overflow-hidden bg-white ${
        selected
          ? "border-green-500 shadow-md shadow-green-100"
          : "border-stone-200 hover:border-stone-300"
      }`}
    >
      {/* Selected badge — click to deselect */}
      <div
        className={`absolute top-2 right-2 z-10 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
          selected ? "bg-green-500 text-white" : "bg-stone-100 text-stone-300"
        }`}
      >
        {selected ? "✕" : "+"}
      </div>

      <div className="p-2">
        <div className="relative h-20 w-full mb-2">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
            unoptimized
          />
        </div>
        <p className="text-xs font-semibold text-stone-800 leading-tight line-clamp-2 pr-4">
          {product.name}
        </p>
        <p className="text-xs text-green-600 font-bold mt-0.5">${product.pricePerWeek}/wk</p>
      </div>
    </motion.button>
  );
}
