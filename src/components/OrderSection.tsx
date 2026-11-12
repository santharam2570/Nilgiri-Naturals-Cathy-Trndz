"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, MapPin, Minus, Phone, Plus, Send } from "lucide-react";
import { useState } from "react";
import { LeafMark, MountainsSilhouette, WhatsAppIcon } from "@/components/ui/Icons";
import SectionHeading from "@/components/ui/SectionHeading";
import { PRODUCTS } from "@/lib/products";
import { PHONE_DISPLAY, PHONE_E164, whatsappLink } from "@/lib/site";

export default function OrderSection() {
  const [cart, setCart] = useState<Record<string, number>>({ "eucalyptus-oil": 1 });
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const update = (slug: string, delta: number) =>
    setCart((c) => {
      const next = Math.max(0, Math.min(50, (c[slug] ?? 0) + delta));
      const copy = { ...c };
      if (next === 0) delete copy[slug];
      else copy[slug] = next;
      return copy;
    });

  const items = PRODUCTS.filter((p) => cart[p.slug]);
  const total = items.reduce((sum, p) => sum + cart[p.slug], 0);

  const message = [
    "Hello Nilgiri Naturals! I'd like to place an order:",
    ...items.map((p) => `• ${p.name}${p.size ? ` (${p.size})` : ""} × ${cart[p.slug]}`),
    name && `Name: ${name}`,
    city && `Location: ${city}`,
    "Please share the price and delivery details. Thank you!",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <section id="order" className="grain relative overflow-hidden bg-forest-950 pb-24 pt-24 text-cream-50 sm:pt-32">
      <div aria-hidden className="absolute inset-x-0 top-0 h-24 rotate-180 text-cream-100">
        <MountainsSilhouette className="h-full w-full" />
      </div>
      <div aria-hidden className="absolute left-1/2 top-1/3 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-forest-700/30 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pt-10 sm:px-8 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <SectionHeading
            light
            align="left"
            eyebrow="Order Now"
            title="Bring the hills home"
            subtitle="Build your order below and send it to us on WhatsApp in one tap. We'll confirm the price and delivery details personally."
          />
          <div className="space-y-4">
            <a
              href={`tel:${PHONE_E164}`}
              className="group flex items-center gap-4 rounded-3xl border border-cream-50/10 bg-cream-50/5 p-5 transition hover:border-gold-400/50 hover:bg-cream-50/10"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gold-500 text-forest-950 transition-transform group-hover:rotate-12">
                <Phone className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-[0.25em] text-cream-200/60">Call or WhatsApp</span>
                <span className="block font-serif text-3xl font-semibold">{PHONE_DISPLAY}</span>
              </span>
            </a>
            <div className="flex items-center gap-4 rounded-3xl border border-cream-50/10 bg-cream-50/5 p-5">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-cream-50/10 text-gold-400">
                <MapPin className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-[0.25em] text-cream-200/60">From</span>
                <span className="block text-lg font-medium">Ooty, The Nilgiris, Tamil Nadu</span>
              </span>
            </div>
          </div>
          <p className="font-script text-3xl text-gold-400">Nature&apos;s goodness for a better you</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2.5rem] bg-cream-50 p-6 text-forest-900 shadow-2xl shadow-black/30 sm:p-9"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-3xl font-semibold">Your order</h3>
            <motion.span
              key={total}
              initial={{ scale: 1.4 }}
              animate={{ scale: 1 }}
              className="rounded-full bg-forest-900 px-3 py-1 text-sm font-semibold text-cream-50"
            >
              {total} {total === 1 ? "item" : "items"}
            </motion.span>
          </div>

          <ul className="mt-6 space-y-3">
            {PRODUCTS.map((p) => {
              const qty = cart[p.slug] ?? 0;
              return (
                <li
                  key={p.slug}
                  className={`flex items-center justify-between gap-3 rounded-2xl border p-3 pl-4 transition-colors ${
                    qty ? "border-forest-900/30 bg-white" : "border-forest-900/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-6 w-6 place-items-center rounded-full border transition-colors"
                      style={qty ? { background: p.accent, borderColor: p.accent } : undefined}
                    >
                      <AnimatePresence>
                        {qty > 0 && (
                          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Check className="h-3.5 w-3.5 text-white" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    <span>
                      <span className="block font-semibold">{p.name}</span>
                      {p.size && <span className="block text-xs text-forest-700/60">{p.size}</span>}
                    </span>
                  </div>
                  <div className="flex items-center rounded-full bg-cream-100">
                    <button
                      onClick={() => update(p.slug, -1)}
                      aria-label={`Remove one ${p.name}`}
                      className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-cream-200 disabled:opacity-30"
                      disabled={qty === 0}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold">{qty}</span>
                    <button
                      onClick={() => update(p.slug, 1)}
                      aria-label={`Add one ${p.name}`}
                      className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-cream-200"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-forest-600">Your name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya"
                className="w-full rounded-2xl border border-forest-900/15 bg-white px-4 py-3 outline-none transition focus:border-forest-600 focus:ring-4 focus:ring-forest-500/15"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-forest-600">City / Area</span>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Coimbatore"
                className="w-full rounded-2xl border border-forest-900/15 bg-white px-4 py-3 outline-none transition focus:border-forest-600 focus:ring-4 focus:ring-forest-500/15"
              />
            </label>
          </div>

          <motion.a
            href={total ? whatsappLink(message) : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!total}
            whileHover={total ? { scale: 1.02 } : undefined}
            whileTap={total ? { scale: 0.98 } : undefined}
            className={`group relative mt-6 flex items-center justify-center gap-3 overflow-hidden rounded-full px-6 py-4 font-semibold text-white transition-colors ${
              total ? "bg-[#1f9d55] hover:bg-[#178a49]" : "pointer-events-none bg-forest-900/30"
            }`}
          >
            {total > 0 && <span className="absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-white/25" />}
            <WhatsAppIcon className="h-5 w-5" />
            Send order on WhatsApp
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.a>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-forest-700/60">
            <LeafMark className="h-3.5 w-3.5 text-forest-500" />
            {total ? "Opens WhatsApp with your order pre-filled." : "Add at least one product to continue."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
