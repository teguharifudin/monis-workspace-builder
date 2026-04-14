"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Product } from "@/data/products";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  desk: Product | null;
  chair: Product | null;
  accessories: Product[];
}

export default function CheckoutModal({ isOpen, onClose, desk, chair, accessories }: CheckoutModalProps) {
  const [weeks, setWeeks] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", date: "" });

  const items = [desk, chair, ...accessories].filter(Boolean) as Product[];
  const weeklyTotal = items.reduce((sum, p) => sum + p.pricePerWeek, 0);
  const total = weeklyTotal * weeks;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed inset-x-0 bottom-0 top-16 md:inset-auto md:left-1/2 md:-translate-x-1/2 md:top-8 md:bottom-8 md:w-full md:max-w-lg z-50 bg-white rounded-t-2xl md:rounded-2xl flex flex-col shadow-2xl"
            style={{ maxHeight: 'calc(100vh - 4rem)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h2 className="text-lg font-bold text-stone-900">Your Workspace Summary</h2>
              <button onClick={onClose} className="text-stone-400 hover:text-stone-600 text-xl leading-none">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center py-10"
                >
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">Workspace Booked!</h3>
                  <p className="text-stone-500 text-sm max-w-xs">
                    We'll contact you at <strong>{form.email}</strong> to confirm delivery details. Your Bali workspace is on its way!
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); onClose(); }}
                    className="mt-6 bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-stone-800 transition-colors"
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Items list */}
                  <div className="space-y-2 mb-5">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg bg-stone-50">
                        <div className="relative w-12 h-12 flex-shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-contain" unoptimized />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-stone-800 truncate">{item.name}</p>
                          <p className="text-xs text-stone-500 capitalize">{item.category}</p>
                        </div>
                        <p className="text-sm font-semibold text-stone-700 flex-shrink-0">${item.pricePerWeek}/wk</p>
                      </div>
                    ))}
                  </div>

                  {/* Duration selector */}
                  <div className="mb-5">
                    <label className="text-sm font-semibold text-stone-700 block mb-2">Rental Duration</label>
                    <div className="flex gap-2">
                      {[1, 2, 4, 8].map((w) => (
                        <button
                          key={w}
                          onClick={() => setWeeks(w)}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                            weeks === w
                              ? "bg-black text-white border-black"
                              : "bg-white text-stone-700 border-stone-200 hover:border-stone-400"
                          }`}
                        >
                          {w}w
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-between py-3 border-t border-b border-stone-100 mb-5">
                    <span className="text-sm text-stone-600">{weeks} week{weeks > 1 ? "s" : ""} × ${weeklyTotal}/wk</span>
                    <span className="text-xl font-bold text-stone-900">${total}</span>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      required
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-stone-400"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email address"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-stone-400"
                    />
                    <input
                      required
                      type="date"
                      placeholder="Delivery date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-stone-400"
                    />
                    <button
                      type="submit"
                      className="w-full bg-black text-white py-3 rounded-full font-semibold text-sm hover:bg-stone-800 transition-colors"
                    >
                      Rent My Workspace 🏝️
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
