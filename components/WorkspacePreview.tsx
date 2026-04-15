"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/data/products";

interface WorkspacePreviewProps {
  desk: Product | null;
  chair: Product | null;
  accessories: Product[];
}

const sp = { type: "spring" as const, stiffness: 280, damping: 24 };

const DESK_BOTTOM  = 25;
const DESK_LEFT    = 20;
const DESK_WIDTH   = 70;
const DESK_CENTER  = DESK_LEFT + DESK_WIDTH / 2;
const DESK_RIGHT   = DESK_LEFT + DESK_WIDTH;
const DESK_SURFACE = DESK_BOTTOM + (DESK_WIDTH * (9 / 16)) * 0.58;

// blendStyle hanya untuk container yang butuh — tidak dipakai di wrapper div
// Blend mode ada di <Img> langsung

// eslint-disable-next-line @next/next/no-img-element
const Img = ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} className="w-full h-auto block" style={{ mixBlendMode: "multiply" }} />
);

export default function WorkspacePreview({ desk, chair, accessories }: WorkspacePreviewProps) {
  const monitors = accessories.filter((a) => a.category === "monitor");
  const lamp     = accessories.find((a)  => a.category === "lamp");
  const others   = accessories.filter((a) => a.category === "accessory");
  const isEmpty  = !desk && !chair && accessories.length === 0;

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

      {/* CHAIR */}
      <AnimatePresence>
        {chair && (
          <motion.div key={chair.id}
            initial={{ opacity: 0, scale: 0.6, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.6, y: 15 }}
            transition={sp}
            className="absolute"
            style={{ zIndex: 10, bottom: "35%", left: "10%", width: "75%", maxHeight: "80%" }}
          >
            <Img src={chair.image} alt={chair.name} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESK */}
      <AnimatePresence>
        {desk && (
          <motion.div key={desk.id}
            initial={{ opacity: 0, scale: 0.75, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.75, y: 20 }}
            transition={{ ...sp, stiffness: 240 }}
            className="absolute"
            style={{ zIndex: 20, bottom: `${DESK_BOTTOM}%`, left: `${DESK_LEFT}%`, width: `${DESK_WIDTH}%`, maxHeight: "85%" }}
          >
            <Img src={desk.image} alt={desk.name} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* MONITORS */}
      <AnimatePresence>
        {desk && monitors.length > 0 && (
          <motion.div key={monitors.map((m) => m.id).join("-")}
            initial={{ opacity: 0, y: -20, scale: 0.65 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -15, scale: 0.65 }}
            transition={sp}
            className="absolute flex items-end gap-[1%]"
            style={{ zIndex: 30, bottom: `${DESK_SURFACE}%`, left: `${DESK_CENTER}%`, transform: "translateX(-50%)", width: monitors.length === 1 ? "26%" : monitors.length === 2 ? "40%" : "52%" }}
          >
            {monitors.map((m, i) => (
              <motion.div key={m.id} className="flex-1"
                initial={{ opacity: 0, scale: 0.5, y: -8 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ ...sp, delay: i * 0.1 }}
              >
                <Img src={m.image} alt={m.name} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* LAMP */}
      <AnimatePresence>
        {desk && lamp && (
          <motion.div key={lamp.id}
            initial={{ opacity: 0, x: 15, rotate: 15 }} animate={{ opacity: 1, x: 0, rotate: 0 }} exit={{ opacity: 0, x: 12 }}
            transition={sp}
            className="absolute"
            style={{ zIndex: 30, bottom: `${DESK_SURFACE}%`, left: `${DESK_RIGHT - 14}%`, width: "7%" }}
          >
            <Img src={lamp.image} alt={lamp.name} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ACCESSORIES on desk */}
      <AnimatePresence>
        {desk && others.length > 0 && (
          <motion.div key="acc-row" className="absolute flex items-end gap-[1%]"
            style={{ zIndex: 30, bottom: `${DESK_SURFACE}%`, left: `${DESK_LEFT + 2}%`, width: "22%" }}
          >
            {others.slice(0, 4).map((acc, i) => (
              <motion.div key={acc.id} className="flex-1"
                initial={{ opacity: 0, scale: 0.3, y: -8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.3 }}
                transition={{ ...sp, delay: i * 0.07 }}
              >
                <Img src={acc.image} alt={acc.name} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ACCESSORIES tanpa desk */}
      {!desk && others.length > 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="grid grid-cols-3 gap-3 p-6 w-[65%]">
            {others.slice(0, 6).map((acc, i) => (
              <motion.div key={acc.id}
                initial={{ opacity: 0, scale: 0.5, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ ...sp, delay: i * 0.07 }}
                style={{ aspectRatio: "1" }}
              >
                <Img src={acc.image} alt={acc.name} />
              </motion.div>
            ))}
          </div>
        </div>
      )}

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
