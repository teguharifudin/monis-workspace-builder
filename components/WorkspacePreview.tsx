"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/data/products";

interface WorkspacePreviewProps {
  desk: Product | null;
  chair: Product | null;
  accessories: Product[];
}

const sp = { type: "spring" as const, stiffness: 280, damping: 24 };

// Gunakan <img> biasa agar mix-blend-mode bekerja langsung
function BlendImg({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`w-full h-auto ${className}`}
      style={{ mixBlendMode: "multiply", display: "block" }}
    />
  );
}

export default function WorkspacePreview({ desk, chair, accessories }: WorkspacePreviewProps) {
  const monitors = accessories.filter((a) => a.category === "monitor");
  const lamp = accessories.find((a) => a.category === "lamp");
  const others = accessories.filter((a) => a.category === "accessory");
  const isEmpty = !desk && !chair && accessories.length === 0;

  return (
    <div className="w-full rounded-2xl overflow-hidden relative select-none" style={{ aspectRatio: "16/9" }}>

      {/* === BACKGROUND — terang agar multiply bekerja === */}
      {/* Wall — warm light gray */}
      <div className="absolute inset-0" style={{ background: "#f0ece6" }} />
      {/* Wall gradient subtle */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, #e8e2da 0%, #f0ece6 40%, #f0ece6 55%, #d4c4a8 55%, #c8b490 100%)"
      }} />
      {/* Floor wood planks */}
      <div className="absolute bottom-0 left-0 right-0" style={{
        height: "45%",
        backgroundImage: "repeating-linear-gradient(90deg, transparent 0px, transparent 59px, rgba(160,120,60,0.12) 60px)",
        backgroundSize: "60px 100%",
      }} />
      {/* Floor sheen */}
      <div className="absolute bottom-0 left-0 right-0" style={{
        height: "45%",
        background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 40%)",
      }} />
      {/* Wall/floor line */}
      <div className="absolute left-0 right-0 h-[2px]" style={{ bottom: "45%", background: "rgba(160,130,90,0.3)" }} />
      {/* Vignette */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: "inset 0 0 80px rgba(0,0,0,0.12)" }} />

      {/* === EMPTY STATE === */}
      {isEmpty && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-20">
          <motion.div animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="text-5xl">🏝️</motion.div>
          <p className="text-stone-500 text-sm font-semibold">Build your Bali workspace</p>
          <p className="text-stone-400 text-xs">Start by picking a desk →</p>
        </motion.div>
      )}

      {/*
        Semua gambar 920x920 square, objek di tengah dengan padding ~15% tiap sisi.
        Scene 16:9. Floor line = bottom 45%.
        DESK: lebar 52%, bottom 45%, center horizontal
        CHAIR: lebar 20%, bottom 45%, sedikit ke kiri dari center
        MONITOR: lebar 30% per monitor, bottom 60%
        LAMP: lebar 7%, bottom 58%, kanan meja
        ACCESSORIES: lebar 6% per item, bottom 57%, kiri meja
      */}

      {/* CHAIR */}
      <AnimatePresence>
        {chair && (
          <motion.div key={chair.id}
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 15 }}
            transition={sp}
            className="absolute z-10"
            style={{ bottom: "35%", left: "10%", width: "75%", maxHeight: "80%" }}
          >
            <BlendImg src={chair.image} alt={chair.name} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESK */}
      <AnimatePresence>
        {desk && (
          <motion.div key={desk.id}
            initial={{ opacity: 0, scale: 0.75, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 20 }}
            transition={{ ...sp, stiffness: 240 }}
            className="absolute z-20"
            style={{ bottom: "25%", left: "20%", width: "70%", maxHeight: "85%" }}
          >
            <BlendImg src={desk.image} alt={desk.name} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* MONITORS — center di atas meja, desk center = left 20% + 70%/2 = 55% */}
      <AnimatePresence>
        {desk && monitors.length > 0 && (
          <motion.div
            key={monitors.map((m) => m.id).join("-")}
            initial={{ opacity: 0, y: -20, scale: 0.65 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.65 }}
            transition={sp}
            className="absolute z-30 flex items-end gap-[1%]"
            style={{
              bottom: "55%",
              left: "55%",
              transform: "translateX(-50%)",
              width: monitors.length === 1 ? "26%" : monitors.length === 2 ? "40%" : "52%",
            }}
          >
            {monitors.map((m, i) => (
              <motion.div key={m.id} className="flex-1"
                initial={{ opacity: 0, scale: 0.5, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ ...sp, delay: i * 0.1 }}
              >
                <BlendImg src={m.image} alt={m.name} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* LAMP */}
      <AnimatePresence>
        {desk && lamp && (
          <motion.div key={lamp.id}
            initial={{ opacity: 0, x: 15, rotate: 15 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={sp}
            className="absolute z-30"
            style={{ bottom: "48%", left: "78%", width: "7%" }}
          >
            <BlendImg src={lamp.image} alt={lamp.name} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ACCESSORIES — kiri meja */}
      <AnimatePresence>
        {desk && others.length > 0 && (
          <motion.div key="acc-row" className="absolute z-30 flex items-end gap-[1%]"
            style={{ bottom: "47%", left: "22%", width: "22%" }}
          >
            {others.slice(0, 4).map((acc, i) => (
              <motion.div key={acc.id} className="flex-1"
                initial={{ opacity: 0, scale: 0.3, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.3 }}
                transition={{ ...sp, delay: i * 0.07 }}
              >
                <BlendImg src={acc.image} alt={acc.name} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accessories tanpa desk */}
      {!desk && others.length > 0 && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-3 p-6 w-[65%]">
            {others.slice(0, 6).map((acc, i) => (
              <motion.div key={acc.id}
                initial={{ opacity: 0, scale: 0.5, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ ...sp, delay: i * 0.07 }}
                className="aspect-square relative"
              >
                <BlendImg src={acc.image} alt={acc.name} className="w-full h-full object-contain" />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Badge */}
      <AnimatePresence>
        {!isEmpty && (
          <motion.div
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="absolute top-3 right-3 z-40 flex items-center gap-1.5 bg-black/50 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            {[desk, chair, ...accessories].filter(Boolean).length} items
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
