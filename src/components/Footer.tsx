"use client";

import { motion } from "framer-motion";
import { ArrowUp, BadgeCheck, Phone } from "lucide-react";
import { useSyncExternalStore } from "react";
import { LeafMark, WhatsAppIcon } from "@/components/ui/Icons";
import { PRODUCTS } from "@/lib/products";
import { NAV_LINKS, PHONE_DISPLAY, PHONE_E164, REGISTRATIONS, whatsappLink } from "@/lib/site";

export default function Footer() {
  const year = useSyncExternalStore(
    () => () => {},
    () => new Date().getFullYear(),
    () => 2026
  );

  return (
    <footer className="relative overflow-hidden bg-forest-950 text-cream-100">
      <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
        <div className="grid gap-12 border-t border-cream-50/10 pt-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-cream-50/10 text-gold-400">
                <LeafMark className="h-6 w-6" />
              </span>
              <span className="font-serif text-2xl font-semibold text-cream-50">Nilgiri Naturals</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-200/65">
              Pure, natural and authentic products from the Nilgiri hills — brought to you by Cathy_Trndz &
              Nilgiri Naturals.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={whatsappLink("Hello Nilgiri Naturals!")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid h-11 w-11 place-items-center rounded-full bg-cream-50/10 transition hover:-translate-y-1 hover:bg-[#1f9d55]"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <a
                href={`tel:${PHONE_E164}`}
                aria-label="Call"
                className="grid h-11 w-11 place-items-center rounded-full bg-cream-50/10 transition hover:-translate-y-1 hover:bg-gold-500 hover:text-forest-950"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          <FooterList
            title="Explore"
            links={[
              ...NAV_LINKS.map((l) => ({ href: l.href, label: l.label })),
              { href: "#certifications", label: "Licenses & Registrations" },
            ]}
          />
          <FooterList title="Products" links={PRODUCTS.map((p) => ({ href: "#products", label: p.name }))} />

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">Contact</h4>
            <ul className="mt-5 space-y-3 text-sm text-cream-200/70">
              <li>
                <a href={`tel:${PHONE_E164}`} className="transition hover:text-cream-50">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>Ooty, The Nilgiris</li>
              <li>Tamil Nadu, India</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-7xl px-5 sm:px-8">
        <a
          href="#certifications"
          className="grid gap-3 rounded-3xl border border-cream-50/10 bg-cream-50/[0.03] p-5 transition hover:border-gold-400/40 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-cream-50/10"
        >
          {REGISTRATIONS.map((reg) => (
            <div key={reg.id} className="flex items-center gap-3 sm:justify-center sm:px-4">
              <BadgeCheck className="h-5 w-5 shrink-0 text-gold-400" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-cream-50">{reg.name}</p>
                <p className="text-[11px] text-cream-200/50">{reg.authority}</p>
              </div>
            </div>
          ))}
        </a>
      </div>

      <div className="relative mt-12 select-none overflow-hidden">
        <motion.p
          initial={{ y: "60%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="whitespace-nowrap text-center font-serif text-[15vw] font-semibold leading-[0.8] tracking-tight text-cream-50/[0.06]"
          aria-hidden
        >
          Nilgiri Naturals
        </motion.p>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-cream-50/10 px-5 py-6 text-xs text-cream-200/50 sm:flex-row sm:px-8">
        <p>© {year} Cathy_Trndz & Nilgiri Naturals. All rights reserved.</p>
        <p className="text-center">Oils are for external use only. Consult a doctor for medical conditions.</p>
        <a
          href="#home"
          className="group inline-flex items-center gap-2 text-cream-100 transition hover:text-gold-400"
        >
          Back to top
          <span className="grid h-8 w-8 place-items-center rounded-full border border-cream-50/20 transition group-hover:-translate-y-1 group-hover:border-gold-400">
            <ArrowUp className="h-4 w-4" />
          </span>
        </a>
      </div>
    </footer>
  );
}

function FooterList({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">{title}</h4>
      <ul className="mt-5 space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="group inline-flex items-center gap-2 text-cream-200/70 transition hover:text-cream-50">
              <span className="h-px w-0 bg-gold-400 transition-all duration-300 group-hover:w-4" />
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
