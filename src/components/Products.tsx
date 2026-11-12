"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useProductModal } from "@/components/Providers";
import { WhatsAppIcon } from "@/components/ui/Icons";
import SectionHeading from "@/components/ui/SectionHeading";
import { CATEGORIES, PRODUCTS, type Category, type Product } from "@/lib/products";
import { whatsappLink } from "@/lib/site";

export default function Products() {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const visible = PRODUCTS.filter((p) => filter === "all" || p.category === filter);

  return (
    <section id="products" className="relative bg-cream-50 py-24 sm:py-32">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-cream-100 to-transparent"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our Collection"
          title="Pure gifts from the hills"
          subtitle="Every product is sourced from the Nilgiris and packed with care. Tap any product to see its benefits, how to use it, and order instantly on WhatsApp."
        />

        <div className="mt-12 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-forest-900/10 bg-cream-100 p-1.5">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`relative rounded-full px-3.5 py-2 text-xs font-medium transition-colors sm:px-5 sm:py-2.5 sm:text-sm ${
                  filter === c.id ? "text-cream-50" : "text-forest-700 hover:text-forest-950"
                }`}
              >
                {filter === c.id && (
                  <motion.span
                    layoutId="product-filter"
                    className="absolute inset-0 rounded-full bg-forest-900"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { openProduct } = useProductModal();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(mx, (v) => `${v * 100}%`);
  const glareY = useTransform(my, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.45), transparent 55%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-forest-900/10 bg-white shadow-sm transition-shadow duration-500 hover:shadow-2xl hover:shadow-forest-900/15"
    >
      <button
        onClick={() => openProduct(product.slug)}
        className="relative block overflow-hidden"
        style={{ background: product.accentSoft }}
        aria-label={`View details for ${product.name}`}
      >
        <Image
          src={product.image}
          alt={product.name}
          width={product.imageWidth}
          height={product.imageHeight}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
          className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 sm:aspect-[4/5]"
        />
        <motion.span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: glare }} />
        <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-forest-800 backdrop-blur">
          {product.badge ?? (product.category === "oils" ? "Essential Oil" : "Ooty Delicacy")}
        </span>
        {product.size && (
          <span className="absolute right-4 top-4 rounded-full bg-forest-900/85 px-3 py-1 text-[11px] font-semibold text-cream-50 backdrop-blur">
            {product.size}
          </span>
        )}
        <span className="absolute bottom-4 right-4 grid h-12 w-12 translate-y-4 place-items-center rounded-full bg-gold-500 text-forest-950 opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </button>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em]" style={{ color: product.accent }}>
          {product.tagline}
        </p>
        <h3 className="mt-2 font-serif text-3xl font-semibold text-forest-900">{product.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-forest-700/80">{product.short}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {product.benefits.slice(0, 2).map((b) => (
            <span
              key={b.title}
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium text-forest-800"
              style={{ background: product.accentSoft }}
            >
              <b.icon className="h-3.5 w-3.5" style={{ color: product.accent }} />
              {b.title.split("&")[0].trim()}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-6">
          <button
            onClick={() => openProduct(product.slug)}
            className="flex-1 rounded-full bg-forest-900 px-4 py-3 text-sm font-medium text-cream-50 transition hover:bg-forest-700"
          >
            View details
          </button>
          <a
            href={whatsappLink(`Hello Nilgiri Naturals! I'm interested in ${product.name}${product.size ? ` (${product.size})` : ""}.`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Order ${product.name} on WhatsApp`}
            className="grid h-11 w-11 place-items-center rounded-full border border-forest-900/15 text-[#1f9d55] transition hover:scale-110 hover:border-[#1f9d55] hover:bg-[#1f9d55] hover:text-white"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
