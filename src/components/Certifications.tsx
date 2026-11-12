"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Building2, ShieldCheck, type LucideIcon } from "lucide-react";
import { LeafMark } from "@/components/ui/Icons";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { REGISTRATIONS, type Registration } from "@/lib/site";

const ICONS: Record<Registration["id"], LucideIcon> = {
  fssai: ShieldCheck,
  msme: Building2,
};

export default function Certifications() {
  return (
    <section id="certifications" className="grain relative overflow-hidden bg-forest-950 py-24 text-cream-50 sm:py-32">
      <div aria-hidden className="absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-gold-500/10 blur-3xl" />
      <div aria-hidden className="absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-forest-600/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          light
          eyebrow="Licensed & Registered"
          title="Certified for your peace of mind"
          subtitle="Nilgiri Naturals is a government-registered business. Our licenses and registrations are listed below for complete transparency. Certificate details are available on request."
        />

        <div className="mx-auto mt-16 grid max-w-4xl gap-7 md:grid-cols-2">
          {REGISTRATIONS.map((reg, i) => (
            <Reveal key={reg.id} delay={i * 0.12}>
              <CertificateCard reg={reg} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-sm text-cream-200/60">
            <LeafMark className="h-4 w-4 text-gold-400" />
            Registered with the Government of India
            <span className="text-gold-400">•</span>
            Food safety compliant
            <span className="text-gold-400">•</span>
            Proudly made in the Nilgiris
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function CertificateCard({ reg }: { reg: Registration }) {
  const Icon = ICONS[reg.id];

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative h-full rounded-[2rem] bg-gradient-to-br from-gold-400 via-gold-200/60 to-gold-600 p-px shadow-2xl shadow-black/30"
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(2rem-1px)] bg-cream-50 p-7 text-forest-900">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-radial-gradient(circle at 100% 0%, #14291d 0 1px, transparent 1px 10px)",
          }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-3 rounded-[1.5rem] border border-gold-500/30" />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[130%] group-hover:opacity-100"
        />

        <div className="relative flex items-start justify-between gap-4">
          <div className="relative grid h-16 w-16 shrink-0 place-items-center">
            <span className="absolute inset-0 animate-spin-slow rounded-full border-2 border-dashed border-gold-500/60" />
            <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-forest-700 to-forest-950 text-gold-400 shadow-lg">
              <Icon className="h-6 w-6" />
            </span>
          </div>
          <span className="rounded-full bg-forest-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-200">
            Govt. of India
          </span>
        </div>

        <h3 className="relative mt-6 font-serif text-3xl font-semibold">{reg.name}</h3>
        <p className="relative mt-1 text-xs font-medium uppercase tracking-[0.15em] text-forest-600">{reg.authority}</p>
        <p className="relative mt-4 text-sm leading-relaxed text-forest-700/80">{reg.description}</p>

        <div className="relative mt-auto pt-6">
          <div className="flex items-center gap-3 rounded-2xl border border-forest-900/10 bg-white px-4 py-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-forest-900 text-gold-400">
              <BadgeCheck className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-forest-900">{reg.shortLabel}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
