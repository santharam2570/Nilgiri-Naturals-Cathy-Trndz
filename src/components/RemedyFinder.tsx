"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Bone,
  Coffee,
  Droplets,
  Flower2,
  Gift,
  Smile,
  Sparkles,
  Sprout,
  Thermometer,
  Wind,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useProductModal } from "@/components/Providers";
import { WhatsAppIcon } from "@/components/ui/Icons";
import SectionHeading from "@/components/ui/SectionHeading";
import { getProduct } from "@/lib/products";
import { whatsappLink } from "@/lib/site";

const NEEDS: { label: string; icon: LucideIcon; slug: string; benefit: number }[] = [
  { label: "Cold & blocked nose", icon: Thermometer, slug: "eucalyptus-oil", benefit: 0 },
  { label: "Cough & breathing", icon: Wind, slug: "eucalyptus-oil", benefit: 1 },
  { label: "Stress & fatigue", icon: Flower2, slug: "eucalyptus-oil", benefit: 2 },
  { label: "Joint & muscle pain", icon: Activity, slug: "gaultheria-oil", benefit: 0 },
  { label: "Arthritis & back pain", icon: Bone, slug: "gaultheria-oil", benefit: 1 },
  { label: "Toothache", icon: Smile, slug: "clove-oil", benefit: 0 },
  { label: "Acne & skin care", icon: Sparkles, slug: "clove-oil", benefit: 2 },
  { label: "Dry skin", icon: Droplets, slug: "almond-oil", benefit: 0 },
  { label: "Hair fall & dry hair", icon: Sprout, slug: "almond-oil", benefit: 1 },
  { label: "Tea-time cravings", icon: Coffee, slug: "ooty-varkey", benefit: 0 },
  { label: "Sweet tooth & gifting", icon: Gift, slug: "homemade-chocolate", benefit: 0 },
];

export default function RemedyFinder() {
  const [active, setActive] = useState(0);
  const { openProduct } = useProductModal();
  const need = NEEDS[active];
  const product = getProduct(need.slug);
  const benefit = product.benefits[need.benefit];

  return (
    <section id="remedy" className="grain relative overflow-hidden bg-forest-900 py-24 text-cream-50 sm:py-32">
      <div
        aria-hidden
        className="absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full blur-3xl transition-colors duration-1000"
        style={{ background: product.accent, opacity: 0.25 }}
      />
      <div aria-hidden className="absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-gold-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          light
          eyebrow="Find Your Remedy"
          title="What does your body need today?"
          subtitle="Choose what you're looking for and we'll suggest the right product from the hills."
        />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-wrap gap-3">
            {NEEDS.map((n, i) => (
              <motion.button
                key={n.label}
                onClick={() => setActive(i)}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                aria-pressed={active === i}
                className={`relative inline-flex items-center gap-2.5 rounded-full border px-5 py-3 text-sm font-medium transition-colors ${
                  active === i
                    ? "border-gold-400 text-forest-950"
                    : "border-cream-50/15 text-cream-100 hover:border-cream-50/40 hover:bg-cream-50/5"
                }`}
              >
                {active === i && (
                  <motion.span
                    layoutId="remedy-pill"
                    className="absolute inset-0 rounded-full bg-gold-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <n.icon className="relative h-4 w-4" />
                <span className="relative">{n.label}</span>
              </motion.button>
            ))}
          </div>

          <div className="relative min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid overflow-hidden rounded-[2.5rem] border border-cream-50/10 bg-cream-50/[0.06] backdrop-blur-xl sm:grid-cols-[0.8fr_1fr]"
              >
                <div className="relative overflow-hidden" style={{ background: product.accentSoft }}>
                  <motion.div
                    initial={{ scale: 1.2, rotate: -4 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={product.imageWidth}
                      height={product.imageHeight}
                      sizes="(max-width: 640px) 90vw, 320px"
                      className="h-full max-h-[440px] w-full object-cover"
                    />
                  </motion.div>
                </div>
                <div className="flex flex-col gap-5 p-7 sm:p-9">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">We recommend</p>
                  <h3 className="font-serif text-4xl font-semibold leading-tight">{product.name}</h3>
                  <div className="flex gap-3 rounded-2xl bg-cream-50/[0.07] p-4">
                    <span
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white"
                      style={{ background: product.accent }}
                    >
                      <benefit.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-semibold">{benefit.title}</p>
                      <p className="text-sm text-cream-200/75">{benefit.text}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-cream-200/75">
                    <span className="font-semibold text-cream-50">How to use: </span>
                    {product.howTo[0]}
                    {product.note ? ` ${product.note}` : ""}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-3">
                    <button
                      onClick={() => openProduct(product.slug)}
                      className="rounded-full bg-cream-50 px-5 py-3 text-sm font-semibold text-forest-900 transition hover:bg-gold-200"
                    >
                      View details
                    </button>
                    <a
                      href={whatsappLink(`Hello Nilgiri Naturals! I'm looking for something for "${need.label}". I'd like to order ${product.name}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#1f9d55] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#178a49]"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Order now
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
