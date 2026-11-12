"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { PHONE_DISPLAY } from "@/lib/site";

const FAQS = [
  {
    q: "How do I place an order?",
    a: `Simply tap any "Order on WhatsApp" button on this site, or message/call us on ${PHONE_DISPLAY}. We'll confirm availability, price and delivery details with you directly.`,
  },
  {
    q: "Are your oils 100% pure?",
    a: "Yes. Our oils are pure and natural — Eucalyptus oil is steam distilled from eucalyptus leaves and Gaultheria oil is extracted from Gaultheria leaves in the Nilgiris.",
  },
  {
    q: "Can I apply the oils directly on my skin?",
    a: "Our oils are for external use only. Almond oil can be massaged gently onto skin or scalp as it is. For Eucalyptus, Gaultheria and Clove oils, mix a few drops with coconut oil or any carrier oil before applying on skin. For clove oil, use only a small quantity.",
  },
  {
    q: "What is almond oil good for?",
    a: "Our almond oil is rich in Vitamin E and antioxidants. It moisturizes and soothes dry or sensitive skin, strengthens hair roots to reduce breakage, and nourishes nails and cuticles. Leave it on or overnight for best results.",
  },
  {
    q: "Which oil should I use for joint or muscle pain?",
    a: "Gaultheria oil is the classic Nilgiri remedy for joint pain, muscle stiffness, arthritis, back and neck pain. Clove oil also offers a warming effect for aches and sprains.",
  },
  {
    q: "What is Ooty Varkey?",
    a: "Ooty Varkey is a famous flaky, crispy baked snack from Ooty — perfect with a hot cup of tea or coffee. Store it in an airtight container to keep it crispy.",
  },
  {
    q: "How should I store the homemade chocolate?",
    a: "Our rich dark chocolates are made fresh in small batches. Keep them in a cool, dry place away from sunlight, and refrigerate in warm weather so they stay firm.",
  },
  {
    q: "Is Nilgiri Naturals a registered business?",
    a: "Yes. We hold an FSSAI License and MSME registration with the Government of India. Certificate details are available on request.",
  },
  {
    q: "Do you offer bulk or gift orders?",
    a: "Yes — reach out to us on WhatsApp with your requirements and we'll be happy to help with bulk or gift orders.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream-100 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="Questions? We've got answers."
            subtitle="Everything you need to know about our products and ordering."
          />
        </div>

        <div className="space-y-4">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.05} y={20}>
                <div
                  className={`overflow-hidden rounded-3xl border transition-colors duration-300 ${
                    isOpen ? "border-forest-900 bg-forest-900 text-cream-50" : "border-forest-900/10 bg-cream-50"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left sm:px-8"
                  >
                    <span className="font-serif text-xl font-semibold sm:text-2xl">{item.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
                        isOpen ? "bg-gold-500 text-forest-950" : "bg-forest-900 text-cream-50"
                      }`}
                    >
                      <Plus className="h-5 w-5" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-6 pb-6 leading-relaxed text-cream-200/85 sm:px-8">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
