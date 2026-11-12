"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X, ImageIcon, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/Icons";
import type { Product } from "@/lib/products";
import { REGISTRATIONS, whatsappLink } from "@/lib/site";

const fssai = REGISTRATIONS.find((r) => r.id === "fssai")!;

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && <ModalBody key={product.slug} product={product} onClose={onClose} />}
    </AnimatePresence>
  );
}

function ModalBody({ product, onClose }: { product: Product; onClose: () => void }) {
  const [qty, setQty] = useState(1);
  const [showPoster, setShowPoster] = useState(false);
  const hasPoster = product.poster !== product.image;

  const message = `Hello Nilgiri Naturals! I'd like to order ${qty} × ${product.name}${
    product.size ? ` (${product.size})` : ""
  }. Please share the price and delivery details.`;

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <motion.button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-forest-950/70 backdrop-blur-md"
      />
      <motion.div
        initial={{ y: 80, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.97 }}
        transition={{ type: "spring", damping: 26, stiffness: 260 }}
        className="relative z-10 grid max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-t-[2rem] bg-cream-50 shadow-2xl sm:rounded-[2rem] md:grid-cols-[1fr_1.15fr] md:overflow-hidden"
      >
        <button
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/80 text-forest-900 shadow backdrop-blur transition hover:rotate-90 hover:bg-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div
          className="relative flex min-h-[320px] items-center justify-center overflow-hidden p-8"
          style={{ background: `radial-gradient(circle at 50% 40%, #fff 0%, ${product.accentSoft} 60%)` }}
        >
          <motion.div
            className="absolute h-72 w-72 rounded-full blur-3xl"
            style={{ background: product.accent, opacity: 0.18 }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={showPoster ? "poster" : "image"}
              initial={{ opacity: 0, rotateY: -25, scale: 0.9 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: 25, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {showPoster ? (
                <Image
                  src={product.poster}
                  alt={`${product.name} poster`}
                  width={product.posterWidth}
                  height={product.posterHeight}
                  className="max-h-[60vh] w-auto rounded-2xl shadow-xl"
                />
              ) : (
                <Image
                  src={product.image}
                  alt={product.name}
                  width={product.imageWidth}
                  height={product.imageHeight}
                  className={`max-h-[56vh] w-auto shadow-2xl ${
                    product.category === "snacks" ? "rounded-full" : "rounded-[2rem]"
                  }`}
                />
              )}
            </motion.div>
          </AnimatePresence>
          {hasPoster && (
            <button
              onClick={() => setShowPoster((s) => !s)}
              className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-xs font-medium text-forest-800 shadow backdrop-blur transition hover:bg-white"
            >
              <ImageIcon className="h-4 w-4" />
              {showPoster ? "View product" : "View full poster"}
            </button>
          )}
        </div>

        <div className="flex flex-col gap-6 p-6 sm:p-10 md:max-h-[92vh] md:overflow-y-auto">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em]" style={{ color: product.accent }}>
              {product.tagline}
            </p>
            <h3 className="mt-2 font-serif text-4xl font-semibold text-forest-900 sm:text-5xl">{product.name}</h3>
            {product.size && (
              <span className="mt-3 inline-block rounded-full bg-forest-900 px-3 py-1 text-xs font-medium text-cream-50">
                {product.size}
              </span>
            )}
            <p className="mt-4 leading-relaxed text-forest-700/85">{product.description}</p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-forest-600">Benefits</h4>
            <ul className="grid gap-3 sm:grid-cols-2">
              {product.benefits.map((b, i) => (
                <motion.li
                  key={b.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  className="flex gap-3 rounded-2xl border border-forest-900/5 bg-white p-3"
                >
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white"
                    style={{ background: product.accent }}
                  >
                    <b.icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-forest-900">{b.title}</span>
                    <span className="block text-xs leading-relaxed text-forest-700/75">{b.text}</span>
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-forest-600">How to use</h4>
            <ol className="space-y-2">
              {product.howTo.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm text-forest-800">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-200 text-xs font-semibold text-forest-900">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            {product.note && <p className="mt-3 text-xs font-medium italic text-wine-700">{product.note}</p>}
          </div>

          {product.category === "snacks" && (
            <div className="flex items-center gap-3 rounded-2xl border border-gold-500/40 bg-gold-200/30 px-4 py-3">
              <ShieldCheck className="h-6 w-6 shrink-0 text-forest-700" />
              <div>
                <p className="text-sm font-semibold text-forest-900">{fssai.shortLabel}</p>
                <p className="text-xs text-forest-700/70">{fssai.authority}</p>
              </div>
            </div>
          )}

          <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-forest-900/10 pt-6">
            <div className="flex items-center rounded-full border border-forest-900/15 bg-white">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-cream-200"
              >
                <Minus className="h-4 w-4" />
              </button>
              <motion.span key={qty} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-8 text-center font-semibold">
                {qty}
              </motion.span>
              <button
                onClick={() => setQty((q) => Math.min(50, q + 1))}
                aria-label="Increase quantity"
                className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-cream-200"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full bg-[#1f9d55] px-6 py-3.5 font-medium text-white shadow-lg shadow-green-900/20 transition hover:bg-[#178a49]"
            >
              <span className="absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-white/25" />
              <WhatsAppIcon className="h-5 w-5" />
              Order on WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
