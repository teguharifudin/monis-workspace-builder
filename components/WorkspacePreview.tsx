"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Product } from "@/data/products";

interface WorkspacePreviewProps {
  desk: Product | null;
  chair: Product | null;
  accessories: Product[];
}

// Semua gambar 920x920, objek aktual ~60% dari canvas dengan padding ~20% tiap sisi
// Scene 16:9, floor mulai dari bottom 40%
// Desk surface (tempat monitor duduk) ~58% dari bottom

const BLEND: React.CSSProperties = { mixBlendMode: "multiply" };

const sp = { type: "spring" as const, stiffness: 280, damping: 24 };

export default function WorkspacePreview({ desk, chair, accessories }: WorkspacePreviewProps) {
  const monitors = accessories.filter((a) => a.category === "monitor");
  const lamp = accessories.find((a) => a.category === "lamp");
  const others = accessories.filter((a) => a.category === "accessory");
  const isEmpty = !desk && !chair && accessories.length === 0;

  return (
    <div className="w-full rounded-2xl overflow-hidden relative select-none" style={{ aspectRatio: "16/9" }}>

      {/* Room background */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, #c8d4e0 0%, #dde5ee 50%, #b8a898 50%, #a08060 100%)"
      }} />
      {/* Wall subtle gradient */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 50%, transparent 100%)"
      }} />
      {/* Floor wood lines */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: "50%", opacity: 0.15,
        backgroundImage: "repeating-linear-gradient(90deg, transparent 0px, transparent 48px, #5c3d11 49px)",
      }} />
      {/* Vignette */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: "inset 0 0 100px rgba(0,0,0,0.18)" }} />

      {/* Empty state */}
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
        LAYOUT (% dari container 16:9):
        - Floor starts at bottom 50%
        - Desk bottom edge: 50% from bottom (sits on floor)
        - Desk width: 58% of container (gambar 920px, objek ~55% dari canvas)
        - Chair bottom edge: 50% from bottom
        - Chair width: 24% (proporsional dengan meja — kursi ~40% lebar meja)
        - Monitor bottom: 58% from bottom (di atas permukaan meja)
        - Monitor width: 32% per monitor
        - Lamp bottom: 56%, right side
        - Accessories: 52% from bottom, left side
      */}

      {/* CHAIR — di belakang meja, sedikit ke kiri dari center */}
      <AnimatePresence>
        {chair && (
          <motion.div key={chair.id}
            initial={{ opacity: 0, scale: 0.6, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={sp}
            className="absolute z-10"
            style={{ ...BLEND, bottom: "48%", left: "50%", marginLeft: "-12%", width: "24%" }}
          >
            <Image src={chair.image} alt={chair.name} width={400} height={400}
              className="w-full h-auto" unoptimized />
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESK — center, sits on floor */}
      <AnimatePresence>
        {desk && (
          <motion.div key={desk.id}
            initial={{ opacity: 0, scale: 0.75, y: 35 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 25 }}
            transition={{ ...sp, stiffness: 240 }}
            className="absolute z-20"
            style={{ ...BLEND, bottom: "48%", left: "50%", marginLeft: "-29%", width: "58%" }}
          >
            <Image src={desk.image} alt={desk.name} width={600} height={600}
              className="w-full h-auto" unoptimized />
          </motion.div>
        )}
      </AnimatePresence>

      {/* MONITORS — on desk surface */}
      <AnimatePresence>
        {desk && monitors.length > 0 && (
          <motion.div
            key={monitors.map((m) => m.id).join("-")}
            initial={{ opacity: 0, y: -25, scale: 0.65 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.65 }}
            transition={sp}
            className="absolute z-30 flex items-end gap-[0.5%]"
            style={{
              bottom: "60%",
              left: "50%",
              marginLeft: monitors.length === 1 ? "-16%" : monitors.length === 2 ? "-24%" : "-30%",
              width: monitors.length === 1 ? "32%" : monitors.length === 2 ? "48%" : "60%",
            }}
          >
            {monitors.map((m, i) => (
              <motion.div key={m.id} className="flex-1"
                initial={{ opacity: 0, scale: 0.5, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ ...sp, delay: i * 0.1 }}
                style={BLEND}
              >
                <Image src={m.image} alt={m.name} width={400} height={400}
                  className="w-full h-auto" unoptimized />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* LAMP — kanan meja */}
      <AnimatePresence>
        {desk && lamp && (
          <motion.div key={lamp.id}
            initial={{ opacity: 0, x: 18, rotate: 18 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: 14, rotate: 14 }}
            transition={sp}
            className="absolute z-30"
            style={{ ...BLEND, bottom: "55%", right: "18%", width: "8%" }}
          >
            <Image src={lamp.image} alt={lamp.name} width={120} height={120}
              className="w-full h-auto" unoptimized />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ACCESSORIES — kiri meja, di atas permukaan */}
      <AnimatePresence>
        {desk && others.length > 0 && (
          <motion.div key="acc-row" className="absolute z-30 flex items-end gap-[1%]"
            style={{ bottom: "54%", left: "19%", width: "22%" }}
          >
            {others.slice(0, 4).map((acc, i) => (
              <motion.div key={acc.id} className="flex-1"
                initial={{ opacity: 0, scale: 0.3, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.3 }}
                transition={{ ...sp, delay: i * 0.07 }}
                style={BLEND}
              >
                <Image src={acc.image} alt={acc.name} width={100} height={100}
                  className="w-full h-auto" unoptimized />
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
                className="bg-white/75 backdrop-blur-sm rounded-2xl aspect-square relative shadow-lg"
                style={BLEND}
              >
                <Image src={acc.image} alt={acc.name} fill className="object-contain p-2" unoptimized />
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
            className="absolute top-3 right-3 z-40 flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            {[desk, chair, ...accessories].filter(Boolean).length} items
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
