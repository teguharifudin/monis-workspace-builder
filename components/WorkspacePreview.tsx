"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Product } from "@/data/products";

interface WorkspacePreviewProps {
  desk: Product | null;
  chair: Product | null;
  accessories: Product[];
}

const spring = { type: "spring" as const, stiffness: 300, damping: 24 };

export default function WorkspacePreview({ desk, chair, accessories }: WorkspacePreviewProps) {
  const monitors = accessories.filter((a) => a.category === "monitor");
  const lamp = accessories.find((a) => a.category === "lamp");
  const others = accessories.filter((a) => a.category === "accessory");
  const isEmpty = !desk && !chair && accessories.length === 0;

  return (
    <div className="w-full rounded-2xl overflow-hidden relative" style={{ aspectRatio: "16/9" }}>

      {/* Background room */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, #c9d4e0 0%, #dde5ee 45%, #dde5ee 55%, #b8a898 55%, #a89070 100%)"
      }} />

      {/* Wall detail */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 50%)"
      }} />

      {/* Floor perspective lines */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: "45%" }}>
        <svg className="w-full h-full" viewBox="0 0 1600 400" preserveAspectRatio="none">
          <defs>
            <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c4aa8a" />
              <stop offset="100%" stopColor="#8b6914" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <rect width="1600" height="400" fill="url(#floorGrad)" />
          {/* Wood planks */}
          {[0,1,2,3,4,5,6,7].map(i => (
            <line key={i} x1="0" y1={i*55} x2="1600" y2={i*55} stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
          ))}
          {/* Perspective lines */}
          {[-400,-200,0,200,400,600,800,1000,1200,1400,1600,1800].map((x, i) => (
            <line key={i} x1={x} y1="0" x2={800} y2={-200} stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
          ))}
        </svg>
      </div>

      {/* Wall/floor divider */}
      <div className="absolute left-0 right-0 h-px bg-white/20" style={{ bottom: "45%" }} />

      {/* Empty state */}
      {isEmpty && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-20"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
            className="text-5xl"
          >🏝️</motion.div>
          <p className="text-stone-500 text-sm font-semibold">Build your Bali workspace</p>
          <p className="text-stone-400 text-xs">Pick a desk to get started →</p>
        </motion.div>
      )}

      {/* ── CHAIR ── behind desk, floor level */}
      <AnimatePresence>
        {chair && (
          <motion.div key={chair.id}
            initial={{ opacity: 0, scale: 0.5, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={spring}
            className="absolute z-10"
            style={{ bottom: "28%", left: "50%", marginLeft: "-9%", width: "18%" }}
          >
            <Image src={chair.image} alt={chair.name} width={300} height={300}
              className="w-full h-auto"
              style={{ mixBlendMode: "multiply" }}
              unoptimized />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── DESK ── floor level, center */}
      <AnimatePresence>
        {desk && (
          <motion.div key={desk.id}
            initial={{ opacity: 0, scale: 0.7, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 30 }}
            transition={{ ...spring, stiffness: 260 }}
            className="absolute z-20"
            style={{ bottom: "28%", left: "50%", marginLeft: "-35%", width: "70%" }}
          >
            <Image src={desk.image} alt={desk.name} width={700} height={700}
              className="w-full h-auto"
              style={{ mixBlendMode: "multiply" }}
              unoptimized />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MONITORS ── on desk, center-top */}
      <AnimatePresence>
        {desk && monitors.length > 0 && (
          <motion.div key={monitors.map(m => m.id).join()}
            initial={{ opacity: 0, y: -30, scale: 0.6 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.6 }}
            transition={spring}
            className="absolute z-30 flex items-end justify-center gap-[0.5%]"
            style={{
              bottom: "52%",
              left: "50%",
              marginLeft: monitors.length === 1 ? "-18%" : monitors.length === 2 ? "-26%" : "-32%",
              width: monitors.length === 1 ? "36%" : monitors.length === 2 ? "52%" : "64%",
            }}
          >
            {monitors.map((m, i) => (
              <motion.div key={m.id} className="flex-1"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...spring, delay: i * 0.1 }}
              >
                <Image src={m.image} alt={m.name} width={400} height={400}
                  className="w-full h-auto"
                  style={{ mixBlendMode: "multiply" }}
                  unoptimized />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── LAMP ── right side of desk */}
      <AnimatePresence>
        {desk && lamp && (
          <motion.div key={lamp.id}
            initial={{ opacity: 0, x: 20, rotate: 20 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: 15, rotate: 15 }}
            transition={spring}
            className="absolute z-30"
            style={{ bottom: "44%", right: "15%", width: "7%" }}
          >
            <Image src={lamp.image} alt={lamp.name} width={100} height={100}
              className="w-full h-auto"
              style={{ mixBlendMode: "multiply" }}
              unoptimized />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── ACCESSORIES ── left side of desk */}
      <AnimatePresence>
        {desk && others.length > 0 && (
          <motion.div key="acc" className="absolute z-30 flex items-end gap-[1%]"
            style={{ bottom: "43%", left: "17%", width: "24%" }}
          >
            {others.slice(0, 4).map((acc, i) => (
              <motion.div key={acc.id} className="flex-1"
                initial={{ opacity: 0, scale: 0.3, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.3 }}
                transition={{ ...spring, delay: i * 0.07 }}
              >
                <Image src={acc.image} alt={acc.name} width={80} height={80}
                  className="w-full h-auto"
                  style={{ mixBlendMode: "multiply" }}
                  unoptimized />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accessories without desk — floating */}
      {!desk && others.length > 0 && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-3 p-6 w-[70%]">
            {others.slice(0, 6).map((acc, i) => (
              <motion.div key={acc.id}
                initial={{ opacity: 0, scale: 0.5, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ ...spring, delay: i * 0.07 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 aspect-square relative shadow-lg"
              >
                <Image src={acc.image} alt={acc.name} fill className="object-contain p-1" unoptimized />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Item count badge */}
      <AnimatePresence>
        {!isEmpty && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="absolute top-3 right-3 z-40 flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            {[desk, chair, ...accessories].filter(Boolean).length} items
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vignette overlay for depth */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{ boxShadow: "inset 0 0 80px rgba(0,0,0,0.15)" }} />
    </div>
  );
}
