"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Product } from "@/data/products";

interface WorkspacePreviewProps {
  desk: Product | null;
  chair: Product | null;
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

function ItemSlot({
  product,
  animKey,
  className = "",
}: {
  product: Product;
  animKey: string;
  className?: string;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={animKey}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className={`w-full h-full relative ${className}`}
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

export default function WorkspacePreview({ desk, chair, accessories }: WorkspacePreviewProps) {
  const monitor = accessories.find((a) => a.category === "monitor");
  const lamp = accessories.find((a) => a.category === "lamp");
  const others = accessories.filter((a) => a.category === "accessory");

  const isEmpty = !desk && !chair && accessories.length === 0;

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-gradient-to-b from-slate-100 to-stone-200 p-4 flex flex-col gap-3">

      {/* Empty state */}
      {isEmpty && (
        <div className="flex flex-col items-center justify-center py-16 text-stone-400 gap-2">
          <span className="text-5xl">🏝️</span>
          <p className="text-sm font-medium">Start building your Bali workspace</p>
          <p className="text-xs opacity-60">Pick a desk to get started</p>
        </div>
      )}

      {/* Row 1: Monitor (full width) */}
      {(desk || monitor) && (
        <div className="w-full h-44 rounded-xl overflow-hidden bg-white/60 shadow-sm">
          {monitor ? (
            <ItemSlot product={monitor} animKey={monitor.id} />
          ) : (
            <EmptySlot label="Add a monitor" icon="🖥️" />
          )}
        </div>
      )}

      {/* Row 2: Desk + Lamp side by side */}
      {(desk || lamp) && (
        <div className="flex gap-3">
          <div className="flex-1 h-36 rounded-xl overflow-hidden bg-white/60 shadow-sm">
            {desk ? (
              <ItemSlot product={desk} animKey={desk.id} />
            ) : (
              <EmptySlot label="Add a desk" icon="🪵" />
            )}
          </div>
          <div className="w-28 h-36 rounded-xl overflow-hidden bg-white/60 shadow-sm">
            {lamp ? (
              <ItemSlot product={lamp} animKey={lamp.id} />
            ) : (
              <EmptySlot label="Lamp" icon="💡" />
            )}
          </div>
        </div>
      )}

      {/* Row 3: Chair + Accessories */}
      {(chair || others.length > 0) && (
        <div className="flex gap-3">
          <div className="w-36 h-32 rounded-xl overflow-hidden bg-white/60 shadow-sm flex-shrink-0">
            {chair ? (
              <ItemSlot product={chair} animKey={chair.id} />
            ) : (
              <EmptySlot label="Add a chair" icon="💺" />
            )}
          </div>
          {/* Accessories grid */}
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
                <Image
                  src={acc.image}
                  alt={acc.name}
                  fill
                  className="object-contain p-1"
                  unoptimized
                />
              </motion.div>
            ))}
            {/* Empty slots to fill grid */}
            {Array.from({ length: Math.max(0, 3 - others.length) }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="h-[60px] rounded-lg border-2 border-dashed border-stone-200 bg-stone-50/50"
              />
            ))}
          </div>
        </div>
      )}

      {/* Show desk-only row if only desk selected (no chair yet) */}
      {desk && !chair && others.length === 0 && (
        <div className="flex gap-3">
          <div className="w-36 h-32 rounded-xl overflow-hidden bg-white/20 shadow-sm flex-shrink-0">
            <EmptySlot label="Add a chair" icon="💺" />
          </div>
          <div className="flex-1 grid grid-cols-3 gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`empty-acc-${i}`}
                className="h-[60px] rounded-lg border-2 border-dashed border-stone-200 bg-stone-50/50"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
