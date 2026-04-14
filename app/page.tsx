"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { desks, chairs, accessories, Product } from "@/data/products";
import WorkspacePreview from "@/components/WorkspacePreview";
import ProductCard from "@/components/ProductCard";
import CheckoutModal from "@/components/CheckoutModal";

type Step = "desk" | "chair" | "accessories";

const STEPS: { id: Step; label: string; emoji: string }[] = [
  { id: "desk", label: "Desk", emoji: "🪑" },
  { id: "chair", label: "Chair", emoji: "💺" },
  { id: "accessories", label: "Extras", emoji: "🖥️" },
];

export default function Home() {
  const [step, setStep] = useState<Step>("desk");
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);

  function toggle(product: Product) {
    setSelectedItems((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  }

  const selectedDesk = selectedItems.filter((p) => p.category === "desk");
  const selectedChair = selectedItems.filter((p) => p.category === "chair");
  const selectedAccessories = selectedItems.filter(
    (p) => p.category === "monitor" || p.category === "lamp" || p.category === "accessory"
  );
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const totalItems = selectedItems.length;
  const weeklyTotal = selectedItems.reduce((sum, p) => sum + p.pricePerWeek, 0);

  const stepProducts = step === "desk" ? desks : step === "chair" ? chairs : accessories;

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-stone-100 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Image
            src="https://www.monis.rent/img/monisrent-white.png"
            alt="monis.rent"
            width={90}
            height={24}
            style={{ width: "auto", height: "24px" }}
            className="invert"
            unoptimized
          />
          <span className="text-stone-300 text-sm hidden sm:block">|</span>
          <span className="text-stone-500 text-sm hidden sm:block">Workspace Builder</span>
        </div>
        <div className="flex items-center gap-3">
          {totalItems > 0 && (
            <span className="text-sm text-stone-600">
              <span className="font-bold text-stone-900">${weeklyTotal}</span>/wk
            </span>
          )}
          <button
            onClick={() => setCheckoutOpen(true)}
            disabled={totalItems === 0}
            className="bg-black text-white text-sm px-4 py-2 rounded-full font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-800 transition-colors"
          >
            Rent ({totalItems})
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full overflow-hidden" style={{ height: 'calc(100vh - 57px)' }}>
        {/* Left panel - selector */}
        <div className="lg:w-80 xl:w-96 flex-shrink-0 flex flex-col border-r border-stone-100 bg-white h-full">
          {/* Step tabs */}
          <div className="flex border-b border-stone-100">
            {STEPS.map((s) => (
              <button
                key={s.id}
                onClick={() => setStep(s.id)}
                className={`flex-1 py-3 text-sm font-medium transition-all relative ${
                  step === s.id ? "text-stone-900" : "text-stone-400 hover:text-stone-600"
                }`}
              >
                <span className="mr-1">{s.emoji}</span>
                {s.label}
                {step === s.id && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Step hint */}
          <div className="px-4 py-3 bg-stone-50 border-b border-stone-100">
            <p className="text-xs text-stone-500">
              {step === "desk" && "Choose your desk — the foundation of your setup"}
              {step === "chair" && "Pick a chair you'll actually want to sit in all day"}
              {step === "accessories" && "Add monitors, lamps & accessories to complete the vibe"}
            </p>
          </div>

          {/* Products grid */}
          <div className="flex-1 overflow-y-auto p-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.15 }}
                className="grid grid-cols-2 gap-2"
              >
                {stepProducts.map((product) => {
                  const isSelected = !!selectedItems.find((p) => p.id === product.id);

                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                      selected={isSelected}
                      onSelect={() => toggle(product)}
                    />
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next step button */}
          <div className="p-3 border-t border-stone-100">
            {step !== "accessories" ? (
              <button
                onClick={() => setStep(step === "desk" ? "chair" : "accessories")}
                className="w-full bg-stone-900 text-white py-2.5 rounded-full text-sm font-medium hover:bg-stone-700 transition-colors"
              >
                Next: {step === "desk" ? "Choose Chair →" : "Add Accessories →"}
              </button>
            ) : (
              <button
                onClick={() => setCheckoutOpen(true)}
                disabled={totalItems === 0}
                className="w-full bg-black text-white py-2.5 rounded-full text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-800 transition-colors"
              >
                Rent My Workspace 🏝️
              </button>
            )}
          </div>
        </div>

        {/* Right panel - preview */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-stone-900">Your Workspace Preview</h1>
              <p className="text-sm text-stone-500">Updates live as you build</p>
            </div>
            {totalItems > 0 && (
              <div className="text-right">
                <p className="text-2xl font-bold text-stone-900">${weeklyTotal}<span className="text-sm font-normal text-stone-500">/wk</span></p>
                <p className="text-xs text-stone-400">{totalItems} item{totalItems !== 1 ? "s" : ""} selected</p>
              </div>
            )}
          </div>

          <div className="w-full">
            <WorkspacePreview
              desks={selectedDesk}
              chairs={selectedChair}
              accessories={selectedAccessories}
            />
          </div>

          {/* Selected items chips */}
          {totalItems > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-2"
            >
              {selectedItems.map((item) => (
                  <span
                    key={item.id}
                    className="inline-flex items-center gap-1.5 bg-white border border-stone-200 text-stone-700 text-xs px-3 py-1.5 rounded-full"
                  >
                    <span className="w-4 h-4 relative flex-shrink-0">
                      <Image src={item.image} alt="" fill className="object-contain" unoptimized />
                    </span>
                    {item.name}
                    <span className="text-stone-400">${item.pricePerWeek}/wk</span>
                  </span>
                ))}
            </motion.div>
          )}
        </div>
      </div>

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        desk={selectedDesk[0] ?? null}
        chair={selectedChair[0] ?? null}
        accessories={selectedAccessories}
      />
    </div>
  );
}
