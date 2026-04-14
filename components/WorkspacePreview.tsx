"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Product } from "@/data/products";

interface WorkspacePreviewProps {
  desks: Product[];
  chairs: Product[];
  accessories: Product[];
}

function EmptySlot({ label, icon }: { label: string; icon: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-1 border-2 border-dashed border-stone-200 rounded-xl bg-stone-50/50">
      <span className="text-2xl opacity-30">{icon}</span>
      <span className="text-[10px] text-stone-300 font-medium">{label}</span>
    </div>
  );
}

function ItemSlot({ product, animKey }: { product: Product; animKey: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={animKey}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className="w-full h-full relative"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-2"
          unoptimized
        />
        <div className="absolute bottom-1 left-0 right-0 flex justify-center">
          <span className="bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded-full backdrop-blur-sm truncate max-w-[90%]">
            {product.name} · ${product.pricePerWeek}/wk
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function WorkspacePreview({ desks, chairs, accessories }: WorkspacePreviewProps) {
  const monitors = accessories.filter((a) => a.category === "monitor");
  const lamps = accessories.filter((a) => a.category === "lamp");
  const others = accessories.filter((a) => a.category === "accessory");

  const isEmpty = desks.length === 0 && chairs.length === 0 && accessories.length === 0;
  const hasContent = desks.length > 0 || chairs.length > 0 || accessories.length > 0;

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-gradient-to-b from-slate-100 to-stone-200 p-4 flex flex-col gap-3">

      {isEmpty && (
        <div className="flex flex-col items-center justify-center py-16 text-stone-400 gap-2">
          <span className="text-5xl">🏝️</span>
          <p className="text-sm font-medium">Start building your Bali workspace</p>
          <p className="text-xs opacity-60">Pick a desk to get started</p>
        </div>
      )}

      {/* Monitor row — semua monitor yang dipilih */}
      {monitors.length > 0 && (
        <div className="flex gap-3">
          {monitors.map((monitor) => (
            <div key={monitor.id} className="flex-1 h-44 rounded-xl overflow-hidden bg-white/60 shadow-sm">
              <ItemSlot product={monitor} animKey={monitor.id} />
            </div>
          ))}
        </div>
      )}

      {/* Desks + Lamps row */}
      {(desks.length > 0 || lamps.length > 0) && (
        <div className="flex gap-3">
          {desks.map((desk) => (
            <div key={desk.id} className="flex-1 h-36 rounded-xl overflow-hidden bg-white/60 shadow-sm">
              <ItemSlot product={desk} animKey={desk.id} />
            </div>
          ))}
          {lamps.map((lamp) => (
            <div key={lamp.id} className="w-28 h-36 rounded-xl overflow-hidden bg-white/60 shadow-sm flex-shrink-0">
              <ItemSlot product={lamp} animKey={lamp.id} />
            </div>
          ))}
        </div>
      )}

      {/* Chairs row — show all selected chairs */}
      {chairs.length > 0 && (
        <div className="flex gap-3">
          {chairs.map((chair) => (
            <div key={chair.id} className="w-36 h-32 rounded-xl overflow-hidden bg-white/60 shadow-sm flex-shrink-0">
              <ItemSlot product={chair} animKey={chair.id} />
            </div>
          ))}
          {/* Accessories grid beside chairs */}
          {others.length > 0 && (
            <div className="flex-1 grid grid-cols-3 gap-2">
              {others.slice(0, 6).map((acc) => (
                <motion.div
                  key={acc.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                  className="h-[60px] rounded-lg overflow-hidden bg-white/60 shadow-sm relative"
                >
                  <Image src={acc.image} alt={acc.name} fill className="object-contain p-1" unoptimized />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Accessories standalone (no chair selected) */}
      {chairs.length === 0 && others.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {others.slice(0, 8).map((acc) => (
            <motion.div
              key={acc.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-[70px] rounded-lg overflow-hidden bg-white/60 shadow-sm relative"
            >
              <Image src={acc.image} alt={acc.name} fill className="object-contain p-1" unoptimized />
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty hints when partial selection */}
      {desks.length > 0 && chairs.length === 0 && others.length === 0 && lamps.length === 0 && (
        <div className="flex gap-3">
          <div className="w-36 h-32 rounded-xl overflow-hidden bg-white/20 shadow-sm flex-shrink-0">
            <EmptySlot label="Add a chair" icon="💺" />
          </div>
          <div className="flex-1 grid grid-cols-3 gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-[60px] rounded-lg border-2 border-dashed border-stone-200 bg-stone-50/50" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
