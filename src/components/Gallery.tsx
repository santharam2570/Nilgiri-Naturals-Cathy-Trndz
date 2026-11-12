"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { LeafMark } from "@/components/ui/Icons";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const ITEMS = [
  { src: "/images/homemade-chocolate-poster.jpg", w: 1024, h: 819, alt: "Homemade Chocolate poster", cls: "sm:col-span-2 lg:row-span-2" },
  { src: "/images/eucalyptus-poster.jpg", w: 768, h: 1024, alt: "Eucalyptus Oil poster", cls: "lg:row-span-2" },
  { src: "/images/ooty-varkey.jpg", w: 432, h: 432, alt: "Ooty Varkey label", cls: "" },
  { src: "/images/gaultheria-poster.jpg", w: 1024, h: 682, alt: "Gaultheria Oil poster", cls: "sm:col-span-2" },
  { src: "/images/almond-poster.jpg", w: 1024, h: 682, alt: "Almond Oil poster", cls: "sm:col-span-2 lg:row-span-2" },
  { src: "/images/clove-poster.jpg", w: 1024, h: 682, alt: "Clove Oil poster", cls: "sm:col-span-2" },
];

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: number) => setIndex((i) => (i === null ? i : (i + dir + ITEMS.length) % ITEMS.length)),
    []
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  return (
    <section id="gallery" className="bg-cream-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Gallery"
          title="A glimpse of the hills"
          subtitle="Tap any image to view it in full."
        />

        <div className="mt-14 grid grid-flow-dense auto-rows-[260px] gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, i) => (
            <Reveal key={item.src} delay={i * 0.08} className={item.cls}>
              <button
                onClick={() => setIndex(i)}
                className="group relative h-full w-full overflow-hidden rounded-[2rem] bg-cream-200"
                aria-label={`Open ${item.alt}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-5 left-5 flex translate-y-4 items-center gap-2 text-sm font-medium text-cream-50 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <Expand className="h-4 w-4" /> {item.alt}
                </span>
              </button>
            </Reveal>
          ))}
          <Reveal delay={0.35}>
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] bg-forest-900 p-7 text-cream-50">
              <LeafMark className="absolute -bottom-6 -right-6 h-40 w-40 rotate-12 text-forest-700/60" />
              <LeafMark className="h-8 w-8 text-gold-400" />
              <p className="relative font-script text-3xl leading-snug text-gold-200">
                Breathe better, live better — naturally!
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-forest-950/90 p-4 backdrop-blur-md"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                onClick={(e) => e.stopPropagation()}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) step(1);
                  if (info.offset.x > 80) step(-1);
                }}
                className="relative cursor-grab active:cursor-grabbing"
              >
                <Image
                  src={ITEMS[index].src}
                  alt={ITEMS[index].alt}
                  width={ITEMS[index].w}
                  height={ITEMS[index].h}
                  className="pointer-events-none max-h-[85vh] w-auto max-w-[92vw] rounded-2xl shadow-2xl"
                />
              </motion.div>
            </AnimatePresence>

            <button
              onClick={close}
              aria-label="Close viewer"
              className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-cream-50/10 text-cream-50 transition hover:rotate-90 hover:bg-cream-50/20"
            >
              <X className="h-6 w-6" />
            </button>
            {[
              { dir: -1, icon: ChevronLeft, cls: "left-3 sm:left-6", label: "Previous image" },
              { dir: 1, icon: ChevronRight, cls: "right-3 sm:right-6", label: "Next image" },
            ].map(({ dir, icon: Icon, cls, label }) => (
              <button
                key={dir}
                onClick={(e) => {
                  e.stopPropagation();
                  step(dir);
                }}
                aria-label={label}
                className={`absolute top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-cream-50/10 text-cream-50 transition hover:bg-cream-50/25 ${cls}`}
              >
                <Icon className="h-6 w-6" />
              </button>
            ))}
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-cream-200/70">
              {index + 1} / {ITEMS.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
