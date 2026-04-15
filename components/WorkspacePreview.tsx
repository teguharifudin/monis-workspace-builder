"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/data/products";

interface WorkspacePreviewProps {
  desk: Product | null;
  chair: Product | null;
  accessories: Product[];
}

const sp = { type: "spring" as const, stiffness: 280, damping: 24 };

// Single source of truth — ubah di sini, semua items ikut
const DESK_BOTTOM = 25;   // % dari bawah container
const DESK_LEFT   = 20;   // % dari kiri
const DESK_WIDTH  = 70;   // % lebar container

// Derived — jangan ubah manual
const DESK_CENTER = DESK_LEFT + DESK_WIDTH / 2;          // 55%
const DESK_RIGHT  = DESK_LEFT + DESK_WIDTH;               // 90%
// Permukaan meja: gambar 920x920, meja mengisi ~60% tinggi gambar, surface ~55% dari bawah gambar
// Dalam container 16:9: desk height ≈ DESK_WIDTH * (9/16) ≈ 39% container height
// Surface ≈ DESK_BOTTOM + 39% * 0.58 ≈ 47%
const DESK_SURFACE = DESK_BOTTOM + (DESK_WIDTH * (9 / 16)) * 0.58;

// Gunakan <img> biasa agar mix-blend-mode bekerja langsung pada elemen
function BlendImg({ src, alt }: { src: string; alt: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className="w-full h-auto block" style={{ mixBlendMode: "multiply" }} />;
}

export default function WorkspacePreview({ desk, chair, accessories }: WorkspacePreviewProps) {
  const monitors = accessories.filter((a) => a.category === "monitor");
  const lamp     = accessories.find((a)  => a.category === "lamp");
  const others   = accessories.filter((a) => a.category === "accessory");
  const isEmpty  = !desk && !chair && accessories.length === 0;

  return (
    <div
      className="w-full rounded-2xl overflow-hidden relative select-none"
      style={{ aspectRatio: "16/9", isolation: "isolate" }}
    >
      {/* ── BASE: putih murni agar multiply = transparan ── */}
      <div className="absolute inset-0" style={{ background: "#fff", zIndex: 0 }} />

      {/* ── WALL ── */}
      <div className="absolute inset-0" style={{
        zIndex: 1,
        background: "linear-gradient(180deg, #c8d8e8 0%, #dde8f2 50%)",
      }} />

      {/* ── FLOOR ── */}
      <div className="absolute bottom-0 left-0 right-0" style={{
        zIndex: 1,
        height: "50%",
        background: "linear-gradient(180deg, #c8aa80 0%, #b89060 100%)",
        backgroundImage: "repeating-linear-gradient(90deg, transparent 0px, transparent 79px, rgba(0,0,0,0.06) 80px)",
      }} />

      {/* ── WALL/FLOOR DIVIDER ── */}
      <div className="absolute left-0 right-0" style={{
        zIndex: 2, bottom: "50%", height: "2px",
        background: "rgba(100,70,30,0.25)",
      }} />

      {/* ── VIGNETTE ── */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
        zIndex: 99,
        boxShadow: "inset 0 0 60px rgba(0,0,0,0.12)",
      }} />

      {/* ── EMPTY STATE ── */}
      {isEmpty && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          style={{ zIndex: 10 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="text-5xl"
          >🏝️</motion.div>
          <p className="text-stone-500 text-sm font-semibold">Build your Bali workspace</p>
          <p className="text-stone-400 text-xs">Start by picking a desk →</p>
        </motion.div>
      )}

      {/* ── CHAIR ── z-10, di belakang meja */}
      <AnimatePresence>
        {chair && (
          <motion.div
            key={chair.id}
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 15 }}
            transition={sp}
            className="absolute"
            style={{ zIndex: 10, bottom: "35%", left: "10%", width: "75%", maxHeight: "80%" }}
          >
            <BlendImg src={chair.image} alt={chair.name} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── DESK ── z-20 */}
      <AnimatePresence>
        {desk && (
          <motion.div
            key={desk.id}
            initial={{ opacity: 0, scale: 0.75, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 20 }}
            transition={{ ...sp, stiffness: 240 }}
            className="absolute"
            style={{
              zIndex: 20,
              bottom: `${DESK_BOTTOM}%`,
              left: `${DESK_LEFT}%`,
              width: `${DESK_WIDTH}%`,
              maxHeight: "85%",
            }}
          >
            <BlendImg src={desk.image} alt={desk.name} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MONITORS ── z-30, center di atas permukaan meja */}
      <AnimatePresence>
        {desk && monitors.length > 0 && (
          <motion.div
            key={monitors.map((m) => m.id).join("-")}
            initial={{ opacity: 0, y: -20, scale: 0.65 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.65 }}
            transition={sp}
            className="absolute flex items-end gap-[1%]"
            style={{
              zIndex: 30,
              bottom: `${DESK_SURFACE}%`,
              left: `${DESK_CENTER}%`,
              transform: "translateX(-50%)",
              width: monitors.length === 1 ? "26%" : monitors.length === 2 ? "40%" : "52%",
            }}
          >
            {monitors.map((m, i) => (
              <motion.div
                key={m.id}
                className="flex-1"
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

      {/* ── LAMP ── z-30, kanan permukaan meja */}
      <AnimatePresence>
        {desk && lamp && (
          <motion.div
            key={lamp.id}
            initial={{ opacity: 0, x: 15, rotate: 15 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={sp}
            className="absolute"
            style={{
              zIndex: 30,
              bottom: `${DESK_SURFACE}%`,
              left: `${DESK_RIGHT - 14}%`,
              width: "7%",
            }}
          >
            <BlendImg src={lamp.image} alt={lamp.name} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── ACCESSORIES ── z-30, kiri permukaan meja */}
      <AnimatePresence>
        {desk && others.length > 0 && (
          <motion.div
            key="acc-row"
            className="absolute flex items-end gap-[1%]"
            style={{
              zIndex: 30,
              bottom: `${DESK_SURFACE}%`,
              left: `${DESK_LEFT + 2}%`,
              width: "22%",
            }}
          >
            {others.slice(0, 4).map((acc, i) => (
              <motion.div
                key={acc.id}
                className="flex-1"
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

      {/* ── ACCESSORIES tanpa desk ── */}
      {!desk && others.length > 0 && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 10 }}>
          <div className="grid grid-cols-3 gap-3 p-6 w-[65%]">
            {others.slice(0, 6).map((acc, i) => (
              <motion.div
                key={acc.id}
                initial={{ opacity: 0, scale: 0.5, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ ...sp, delay: i * 0.07 }}
                className="aspect-square"
              >
                <BlendImg src={acc.image} alt={acc.name} />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ── BADGE ── */}
      <AnimatePresence>
        {!isEmpty && (
          <motion.div
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full"
            style={{ zIndex: 40 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            {[desk, chair, ...accessories].filter(Boolean).length} items
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
