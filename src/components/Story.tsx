"use client";

import { animate, motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const STATS = [
  { value: 100, suffix: "%", label: "Pure & natural" },
  { value: 3, suffix: "", label: "Therapeutic oils" },
  { value: 2637, suffix: " m", label: "Doddabetta, the Nilgiris' highest peak" },
  { value: 100, suffix: " ml", label: "Generous bottles" },
];

export default function Story() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <section id="story" ref={ref} className="relative overflow-hidden bg-cream-100 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        <div className="relative mx-auto h-[460px] w-full max-w-lg sm:h-[560px]">
          <motion.div
            style={{ y: y1 }}
            className="absolute left-0 top-0 w-[58%] overflow-hidden rounded-[2.5rem] shadow-2xl shadow-forest-900/20"
          >
            <Image
              src="/images/eucalyptus-bottle.jpg"
              alt="Nilgiri Naturals eucalyptus oil among eucalyptus leaves"
              width={340}
              height={700}
              sizes="(max-width: 1024px) 60vw, 300px"
              className="aspect-[3/4.4] w-full object-cover"
            />
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            className="absolute bottom-0 right-0 w-[52%] overflow-hidden rounded-[2.5rem] border-8 border-cream-100 shadow-2xl shadow-forest-900/20"
          >
            <Image
              src="/images/ooty-varkey.jpg"
              alt="Crispy Ooty Varkey"
              width={432}
              height={432}
              sizes="(max-width: 1024px) 50vw, 280px"
              className="aspect-square w-full object-cover"
            />
          </motion.div>
          <motion.div
            style={{ rotate }}
            className="absolute bottom-[38%] left-[46%] z-10 rounded-3xl bg-forest-900 px-5 py-4 text-cream-50 shadow-xl"
          >
            <p className="font-script text-2xl text-gold-400">Hill heritage</p>
            <p className="text-xs uppercase tracking-[0.25em] text-cream-200/70">Handpicked in Ooty</p>
          </motion.div>
        </div>

        <div className="flex flex-col gap-8">
          <SectionHeading
            align="left"
            eyebrow="Our Story"
            title="Rooted in the misty Blue Mountains"
          />
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed text-forest-700/85">
              <span className="font-serif text-2xl italic text-forest-900">Nilgiri</span> means
              &ldquo;Blue Mountains&rdquo; — a land of eucalyptus groves, wintergreen shrubs, tea gardens and
              cool mountain air. For generations, families in Ooty have relied on the healing oils and
              simple delicacies these hills provide.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="text-lg leading-relaxed text-forest-700/85">
              <strong className="font-semibold text-forest-900">Cathy_Trndz & Nilgiri Naturals</strong> bring
              that heritage to you — pure, natural and authentic products, carefully packed and delivered
              with love, so you can enjoy nature&apos;s goodness wherever you are.
            </p>
          </Reveal>

          <div className="mt-4 grid grid-cols-2 gap-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={0.1 * i} y={24}>
                <div className="group h-full rounded-3xl border border-forest-900/10 bg-cream-50 p-5 transition hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-xl hover:shadow-forest-900/5">
                  <p className="font-serif text-4xl font-semibold text-forest-900 sm:text-5xl">
                    <Counter to={s.value} />
                    <span className="text-gold-600">{s.suffix}</span>
                  </p>
                  <p className="mt-1 text-sm text-forest-700/75">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{value.toLocaleString("en-IN")}</span>;
}
