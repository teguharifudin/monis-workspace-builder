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
    <div className="w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
      {/* Room scene — uses CSS grid rows to simulate depth */}
      <div className="relative w-full h-full flex flex-col bg-gradient-to-b from-slate-200 via-stone-100 to-stone-300">

        {/* Wall */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#dde3ea] to-[#c8cdd4]" />

        {/* Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-[#b5a99a] to-[#ccc0b0]" />

        {/* Wall/floor border */}
        <div className="absolute left-0 right-0 h-[2px] bg-[#a89880]/40" style={{ bottom: "30%" }} />

        {/* Empty state */}
        {isEmpty && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10">
            <span className="text-4xl">🏝️</span>
            <p className="text-sm font-medium text-stone-500">Build your Bali workspace</p>
            <p className="text-xs text-stone-400">Start by picking a desk</p>
          </div>
        )}

        {/* CHAIR — floor level, behind desk */}
        <AnimatePresence>
          {chair && (
            <motion.div
              key={chair.id}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="absolute z-10"
              style={{ bottom: "28%", left: "50%", transform: "translateX(-44%)", width: "22%" }}
            >
              <Image src={chair.image} alt={chair.name} width={200} height={240}
                className="w-full h-auto object-contain drop-shadow-lg" unoptimized />
              <p className="text-center text-[8px] text-white/80 mt-0.5 truncate">{chair.name}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DESK — sits on floor */}
        <AnimatePresence>
          {desk && (
            <motion.div
              key={desk.id}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className="absolute z-20"
              style={{ bottom: "28%", left: "50%", transform: "translateX(-50%)", width: "68%" }}
            >
              <Image src={desk.image} alt={desk.name} width={600} height={320}
                className="w-full h-auto object-contain drop-shadow-xl" unoptimized />
              <p className="text-center text-[8px] text-white/80 mt-0.5 truncate">{desk.name}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MONITORS — on desk surface, centered */}
        <AnimatePresence>
          {desk && monitors.length > 0 && (
            <motion.div
              key="monitors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="absolute z-30 flex gap-[1%] items-end"
              style={{
                bottom: "54%",
                left: "50%",
                transform: "translateX(-50%)",
                width: monitors.length === 1 ? "38%" : "58%",
              }}
            >
              {monitors.map((m) => (
                <div key={m.id} className="flex-1">
                  <Image src={m.image} alt={m.name} width={400} height={300}
                    className="w-full h-auto object-contain drop-shadow-lg" unoptimized />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* LAMP — right side of desk */}
        <AnimatePresence>
          {desk && lamp && (
            <motion.div
              key={lamp.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="absolute z-30"
              style={{ bottom: "46%", right: "17%", width: "8%" }}
            >
              <Image src={lamp.image} alt={lamp.name} width={80} height={140}
                className="w-full h-auto object-contain drop-shadow-md" unoptimized />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ACCESSORIES — small items on desk, left side */}
        <AnimatePresence>
          {desk && others.length > 0 && (
            <motion.div
              key="others"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute z-30 flex items-end gap-[1%]"
              style={{ bottom: "44%", left: "17%", width: "28%" }}
            >
              {others.slice(0, 4).map((acc, i) => (
                <motion.div
                  key={acc.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex-1"
                >
                  <Image src={acc.image} alt={acc.name} width={60} height={60}
                    className="w-full h-auto object-contain" unoptimized />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Accessories without desk — floating grid */}
        {!desk && others.length > 0 && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-2 p-4 w-[70%]">
              {others.slice(0, 6).map((acc) => (
                <motion.div key={acc.id}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/70 rounded-xl p-2 aspect-square relative shadow"
                >
                  <Image src={acc.image} alt={acc.name} fill className="object-contain p-1" unoptimized />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Item count */}
        {!isEmpty && (
          <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full z-40 backdrop-blur-sm">
            {[desk, chair, ...accessories].filter(Boolean).length} items
          </div>
        )}
      </div>
    </div>
  );
}
