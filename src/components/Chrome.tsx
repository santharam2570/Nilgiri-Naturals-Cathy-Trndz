"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { LeafMark, WhatsAppIcon } from "@/components/ui/Icons";
import { whatsappLink } from "@/lib/site";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-gold-600 via-gold-400 to-forest-500"
    />
  );
}

export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-forest-950 text-cream-50"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -120 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 14 }}
            className="grid h-20 w-20 place-items-center rounded-full bg-cream-50/10 text-gold-400"
          >
            <LeafMark className="h-10 w-10" />
          </motion.div>
          <div className="mt-6 overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-4xl font-semibold tracking-wide"
            >
              Nilgiri Naturals
            </motion.p>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-1 font-script text-xl text-gold-400"
          >
            Pure • Natural • Authentic
          </motion.p>
          <div className="mt-8 h-0.5 w-40 overflow-hidden rounded-full bg-cream-50/10">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.3, ease: "easeInOut" }}
              className="h-full bg-gold-400"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function FloatingWhatsApp() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => scrollY.on("change", (y) => setVisible(y > 500)), [scrollY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappLink("Hello Nilgiri Naturals! I'd like to place an order.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 sm:bottom-8 sm:right-8"
        >
          <span className="pointer-events-none hidden translate-x-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-forest-900 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
            Order on WhatsApp
          </span>
          <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#1f9d55] text-white shadow-xl shadow-green-900/30">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#1f9d55]/50" />
            <WhatsAppIcon className="relative h-7 w-7" />
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
