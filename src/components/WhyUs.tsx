"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Gift, HandHeart, Leaf, Mountain, MessageCircle, PackageCheck, ShoppingBasket } from "lucide-react";
import { useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const FEATURES = [
  {
    icon: Leaf,
    title: "100% Pure & Natural",
    text: "No shortcuts — just pure oils extracted from leaves and buds grown in the hills.",
  },
  {
    icon: Mountain,
    title: "Straight from Ooty",
    text: "Sourced from the Nilgiris, where these plants have thrived for generations.",
  },
  {
    icon: HandHeart,
    title: "Packed with Care",
    text: "Every order is personally checked and packed by Cathy_Trndz & Nilgiri Naturals.",
  },
  {
    icon: Gift,
    title: "Perfect for Gifting",
    text: "A thoughtful taste of the hills for family, friends and loved ones.",
  },
];

const STEPS = [
  { icon: ShoppingBasket, title: "Choose your products", text: "Browse oils and Ooty delicacies and pick what you love." },
  { icon: MessageCircle, title: "Message us on WhatsApp", text: "Send your order in one tap — we reply with price & delivery details." },
  { icon: PackageCheck, title: "Receive & enjoy", text: "Your order is packed with care and sent your way." },
];

export default function WhyUs() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ["start 80%", "end 60%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative overflow-hidden bg-cream-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why Nilgiri Naturals"
          title="Goodness you can trust"
          subtitle="Simple, honest products from the hills — the way nature intended."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-[2rem] border border-forest-900/10 bg-cream-50 p-8 transition-colors duration-500 hover:bg-forest-900">
                <span className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold-200/50 transition-transform duration-700 group-hover:scale-[3] group-hover:bg-forest-800" />
                <div className="relative">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-forest-900 text-gold-400 transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-gold-500 group-hover:text-forest-950">
                    <f.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 font-serif text-2xl font-semibold text-forest-900 transition-colors duration-500 group-hover:text-cream-50">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-forest-700/80 transition-colors duration-500 group-hover:text-cream-200/80">
                    {f.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div ref={stepsRef} className="relative mt-28">
          <h3 className="text-center font-serif text-3xl font-semibold text-forest-900 sm:text-4xl">
            Ordering is <span className="font-script text-gold-600">easy</span>
          </h3>
          <div className="relative mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
            <div aria-hidden className="absolute left-[16.6%] right-[16.6%] top-8 hidden h-0.5 bg-forest-900/10 md:block">
              <motion.div style={{ scaleX: lineScale }} className="h-full origin-left bg-gold-500" />
            </div>
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.15} className="relative flex flex-col items-center text-center">
                <motion.span
                  whileHover={{ scale: 1.1, rotate: 8 }}
                  className="relative grid h-16 w-16 place-items-center rounded-full border-4 border-cream-100 bg-forest-900 text-gold-400 shadow-lg"
                >
                  <s.icon className="h-6 w-6" />
                  <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-gold-500 text-xs font-bold text-forest-950">
                    {i + 1}
                  </span>
                </motion.span>
                <h4 className="mt-5 text-lg font-semibold text-forest-900">{s.title}</h4>
                <p className="mt-1 max-w-xs text-sm text-forest-700/75">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
