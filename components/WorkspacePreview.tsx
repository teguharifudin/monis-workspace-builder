"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Product } from "@/data/products";

interface WorkspacePreviewProps {
  desk: Product | null;
  chair: Product | null;
  accessories: Product[];
}

export default function WorkspacePreview({ desk, chair, accessories }: WorkspacePreviewProps) {
  const monitors = accessories.filter((a) => a.category === "monitor");
  const lamp = accessories.find((a) => a.category === "lamp");
  const others = accessories.filter((a) => a.category === "accessory");
  const isEmpty = !desk && !chair && accessories.length === 0;

  return (
    <div
      className="w-full rounded-2xl overflow-hidden relative select-none"
      style={{ aspectRatio: "16/9" }}
    >
      {/* === BACKGROUND ROOM === */}
      {/* Wall */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#e8edf2] via-[#dde3ea] to-[#d0d8e0]" />

      {/* Subtle wall texture lines */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 59px, #94a3b8 60px)" }} />

      {/* Floor */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#a89070] via-[#bba888] to-[#c8b89a]"
        style={{ height: "32%" }} />

      {/* Floor reflection line */}
      <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
        style={{ bottom: "32%" }} />

      {/* Baseboard */}
      <div className="absolute left-0 right-0 h-[3%] bg-[#d4c4b0]"
        style={{ bottom: "32%" }} />

      {/* Floor wood grain */}
      <div className="absolute bottom-0 left-0 right-0 opacity-20"
        style={{
          height: "32%",
          backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 39px, #8b6914 40px)",
        }} />

      {/* === EMPTY STATE === */}
      {isEmpty && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10"
        >
          <motion.span
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="text-5xl"
          >
            🏝️
          </motion.span>
          <p className="text-sm font-semibold text-stone-500">Build your Bali workspace</p>
          <p className="text-xs text-stone-400">Start by picking a desk →</p>
        </motion.div>
      )}

      {/* === CHAIR — behind desk, on floor === */}
      <AnimatePresence>
        {chair && (
          <motion.div
            key={chair.id}
            initial={{ opacity: 0, y: 40, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.7 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="absolute z-10"
            style={{
              bottom: "30%",
              left: "50%",
              transform: "translateX(-38%)",
              width: "18%",
              filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.25))",
            }}
          >
            <Image src={chair.image} alt={chair.name} width={200} height={260}
              className="w-full h-auto object-contain" unoptimized />
          </motion.div>
        )}
      </AnimatePresence>

      {/* === DESK — on floor === */}
      <AnimatePresence>
        {desk && (
          <motion.div
            key={desk.id}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            className="absolute z-20"
            style={{
              bottom: "30%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "70%",
              filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.3))",
            }}
          >
            <Image src={desk.image} alt={desk.name} width={700} height={380}
              className="w-full h-auto object-contain" unoptimized />
          </motion.div>
        )}
      </AnimatePresence>

      {/* === MONITORS — on desk surface === */}
      <AnimatePresence>
        {desk && monitors.length > 0 && (
          <motion.div
            key={monitors.map((m) => m.id).join("-")}
            initial={{ opacity: 0, y: -20, scale: 0.75 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.75 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="absolute z-30 flex items-end gap-[1%]"
            style={{
              bottom: "55%",
              left: "50%",
              transform: "translateX(-50%)",
              width: monitors.length === 1 ? "36%" : monitors.length === 2 ? "54%" : "66%",
              filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.2))",
            }}
          >
            {monitors.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, scale: 0.6, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 320, damping: 26 }}
                className="flex-1"
              >
                <Image src={m.image} alt={m.name} width={400} height={300}
                  className="w-full h-auto object-contain" unoptimized />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* === LAMP — right side of desk === */}
      <AnimatePresence>
        {desk && lamp && (
          <motion.div
            key={lamp.id}
            initial={{ opacity: 0, x: 20, rotate: 15 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: 20, rotate: 10 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            className="absolute z-30"
            style={{
              bottom: "47%",
              right: "16%",
              width: "7%",
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
            }}
          >
            <Image src={lamp.image} alt={lamp.name} width={80} height={150}
              className="w-full h-auto object-contain" unoptimized />
          </motion.div>
        )}
      </AnimatePresence>

      {/* === ACCESSORIES — left side of desk === */}
      <AnimatePresence>
        {desk && others.length > 0 && (
          <motion.div
            key="others"
            className="absolute z-30 flex items-end gap-[1.5%]"
            style={{ bottom: "45%", left: "18%", width: "26%" }}
          >
            {others.slice(0, 4).map((acc, i) => (
              <motion.div
                key={acc.id}
                initial={{ opacity: 0, scale: 0.4, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.4 }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 340, damping: 26 }}
                className="flex-1"
                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))" }}
              >
                <Image src={acc.image} alt={acc.name} width={60} height={60}
                  className="w-full h-auto object-contain" unoptimized />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accessories without desk */}
      {!desk && others.length > 0 && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-3 p-4 w-[65%]">
            {others.slice(0, 6).map((acc, i) => (
              <motion.div
                key={acc.id}
                initial={{ opacity: 0, scale: 0.6, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 300, damping: 24 }}
                className="bg-white/70 backdrop-blur-sm rounded-xl p-2 aspect-square relative shadow-md"
              >
                <Image src={acc.image} alt={acc.name} fill className="object-contain p-1" unoptimized />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* === ITEM COUNT BADGE === */}
      <AnimatePresence>
        {!isEmpty && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-3 right-3 bg-black/65 text-white text-[10px] font-medium px-2.5 py-1 rounded-full z-40 backdrop-blur-sm flex items-center gap-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            {[desk, chair, ...accessories].filter(Boolean).length} items
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
