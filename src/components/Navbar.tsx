"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { LeafMark } from "@/components/ui/Icons";
import { NAV_LINKS, PHONE_DISPLAY, PHONE_E164 } from "@/lib/site";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 400 && !open);
  });

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const dark = !scrolled && !open;

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6"
      >
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6 ${
            scrolled
              ? "border border-forest-900/10 bg-cream-50/80 shadow-lg shadow-forest-900/5 backdrop-blur-xl"
              : "border border-transparent bg-transparent"
          }`}
        >
          <a href="#home" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <span
              className={`grid h-10 w-10 place-items-center rounded-full transition-colors duration-500 ${
                dark ? "bg-cream-50/10 text-gold-400" : "bg-forest-900 text-gold-400"
              }`}
            >
              <LeafMark className="h-5 w-5 transition-transform duration-500 group-hover:rotate-[20deg]" />
            </span>
            <span className="leading-none">
              <span
                className={`block font-serif text-xl font-semibold tracking-wide transition-colors duration-500 ${
                  dark ? "text-cream-50" : "text-forest-900"
                }`}
              >
                Nilgiri Naturals
              </span>
              <span className={`block font-script text-sm ${dark ? "text-gold-400" : "text-gold-600"}`}>
                by Cathy_Trndz
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.slice(1, -1).map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    dark ? "text-cream-100/85 hover:text-cream-50" : "text-forest-800 hover:text-forest-950"
                  }`}
                >
                  {active === link.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className={`absolute inset-0 rounded-full ${dark ? "bg-cream-50/10" : "bg-forest-900/[0.07]"}`}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${PHONE_E164}`}
              className={`hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors md:inline-flex ${
                dark ? "text-cream-100 hover:text-gold-400" : "text-forest-800 hover:text-forest-950"
              }`}
            >
              <Phone className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
            <a
              href="#order"
              className="hidden rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-forest-950 shadow-md shadow-gold-600/30 transition hover:-translate-y-0.5 hover:bg-gold-400 sm:inline-block"
            >
              Order Now
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className={`grid h-11 w-11 place-items-center rounded-full transition-colors lg:hidden ${
                dark ? "bg-cream-50/10 text-cream-50" : "bg-forest-900 text-cream-50"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-cream-100 px-8 lg:hidden"
          >
            <ul className="space-y-2">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 font-serif text-4xl font-semibold text-forest-900 sm:text-5xl"
                  >
                    <span className="font-sans text-sm text-gold-600">0{i + 1}</span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              href={`tel:${PHONE_E164}`}
              className="mt-12 inline-flex items-center gap-3 text-lg font-medium text-forest-700"
            >
              <Phone className="h-5 w-5" /> {PHONE_DISPLAY}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
