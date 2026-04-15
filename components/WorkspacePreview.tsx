"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/data/products";
import TransparentImg from "@/components/TransparentImg";

interface WorkspacePreviewProps {
  desk: Product | null;
  chair: Product | null;
  accessories: Product[];
}

const sp = { type: "spring" as const, stiffness: 280, damping: 24 };

const DESK_BOTTOM  = 14;
const DESK_LEFT    = 15;
const DESK_WIDTH   = 70;
const DESK_CENTER  = DESK_LEFT + DESK_WIDTH / 2;
const DESK_RIGHT   = DESK_LEFT + DESK_WIDTH;
const DESK_SURFACE = DESK_BOTTOM + (DESK_WIDTH * (9 / 16)) * 0.52;

const Img = TransparentImg;

export default function WorkspacePreview({ desk, chair, accessories }: WorkspacePreviewProps) {
  const monitors = accessories.filter((a) => a.category === "monitor");
  const lamps    = accessories.filter((a) => a.category === "lamp");
  const others   = accessories.filter((a) => a.category === "accessory");
  const isEmpty  = !desk && !chair && accessories.length === 0;

  // Items yang tampil di atas meja (dengan atau tanpa meja)
  const deskItems = [...monitors, ...others]; // monitor, keyboard, mouse, webcam, dll
  const hasDeskItems = deskItems.length > 0;
  const hasLamp = lamps.length > 0;

  return (
    <div className="w-full rounded-2xl overflow-hidden relative select-none" style={{ aspectRatio: "16/9" }}>

      {/* WALL */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #b8ccd8 0%, #ccdae6 50%)" }} />

      {/* FLOOR */}
      <div className="absolute bottom-0 left-0 right-0" style={{
        height: "50%",
        background: "linear-gradient(180deg, #c0a070 0%, #a07840 100%)",
      }} />
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
        height: "50%",
        backgroundImage: "repeating-linear-gradient(90deg, transparent 0px, transparent 79px, rgba(0,0,0,0.07) 80px)",
      }} />

      {/* WALL/FLOOR LINE */}
      <div className="absolute left-0 right-0 h-px" style={{ bottom: "50%", background: "rgba(80,50,20,0.3)" }} />

      {/* VIGNETTE */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ zIndex: 50, boxShadow: "inset 0 0 60px rgba(0,0,0,0.15)" }} />

      {/* EMPTY STATE */}
      {isEmpty && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }} className="text-5xl">🏝️</motion.div>
          <p className="text-stone-600 text-sm font-semibold">Build your Bali workspace</p>
          <p className="text-stone-500 text-xs">Start by picking a desk →</p>
        </motion.div>
      )}

      {/* ── DESK ── z-10, di belakang kursi */}
      <AnimatePresence>
        {desk && (
          <motion.div key={desk.id}
            initial={{ opacity: 0, scale: 0.75, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.75 }}
            transition={{ ...sp, stiffness: 240 }} className="absolute"
            style={{ zIndex: 10, bottom: `${DESK_BOTTOM}%`, left: `${DESK_LEFT}%`, width: `${DESK_WIDTH}%`, maxHeight: "85%" }}
          >
            <Img src={desk.image} alt={desk.name} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CHAIR ── z-20, di depan meja */}
      <AnimatePresence>
        {chair && (
          <motion.div key={chair.id}
            initial={{ opacity: 0, scale: 0.6, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.6 }}
            transition={sp} className="absolute"
            style={{ zIndex: 20, bottom: "31%", left: "10%", width: "75%", maxHeight: "80%" }}
          >
            <Img src={chair.image} alt={chair.name} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MONITORS + ACCESSORIES di atas meja ── */}
      <AnimatePresence>
        {hasDeskItems && (
          <motion.div key="desk-items"
            className="absolute flex items-start justify-center gap-[1%]"
            style={{
              zIndex: 30,
              top: `${100 - DESK_SURFACE - 52}%`,
              left: desk ? `${DESK_CENTER}%` : "50%",
              transform: "translateX(-50%)",
              width: deskItems.length === 1 ? "28%" : deskItems.length === 2 ? "40%" : deskItems.length === 3 ? "50%" : "60%",
            }}
          >
            {deskItems.map((item, i) => (
              <motion.div key={item.id} className="flex-1"
                initial={{ opacity: 0, scale: 0.5, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.5 }}
                transition={{ ...sp, delay: i * 0.08 }}
              >
                <Img src={item.image} alt={item.name} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── LAMP ── di samping meja (kanan) */}
      <AnimatePresence>
        {hasLamp && lamps.map((lamp, i) => (
          <motion.div key={lamp.id}
            initial={{ opacity: 0, x: 20, rotate: 15 }} animate={{ opacity: 1, x: 0, rotate: 0 }} exit={{ opacity: 0, x: 15 }}
            transition={{ ...sp, delay: i * 0.1 }} className="absolute"
            style={{
              zIndex: 30,
              top: `${100 - DESK_SURFACE - 28}%`,
              left: desk ? `${DESK_RIGHT - 12 - i * 9}%` : `${75 + i * 8}%`,
              width: "8%",
            }}
          >
            <Img src={lamp.image} alt={lamp.name} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* BADGE */}
      <AnimatePresence>
        {!isEmpty && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
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
