"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowDown, ArrowRight, BadgeCheck } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useProductModal } from "@/components/Providers";
import { SplitWords } from "@/components/ui/Reveal";
import { LeafMark, MountainsSilhouette, WhatsAppIcon } from "@/components/ui/Icons";
import { getProduct } from "@/lib/products";
import { whatsappLink } from "@/lib/site";

const LEAVES = [
  { left: "6%", size: 18, delay: 0, duration: 14 },
  { left: "18%", size: 12, delay: 4, duration: 17 },
  { left: "34%", size: 22, delay: 2, duration: 15 },
  { left: "52%", size: 14, delay: 7, duration: 19 },
  { left: "66%", size: 20, delay: 1, duration: 16 },
  { left: "78%", size: 12, delay: 5, duration: 13 },
  { left: "90%", size: 16, delay: 3, duration: 18 },
];

const BOTTLES = [
  { slug: "gaultheria-oil", depth: 30, className: "left-[2%] top-[18%] w-[34%] -rotate-[9deg]", floatDelay: 0.8 },
  { slug: "clove-oil", depth: 30, className: "right-[2%] top-[18%] w-[34%] rotate-[9deg]", floatDelay: 1.6 },
  { slug: "eucalyptus-oil", depth: 55, className: "left-1/2 top-0 z-10 w-[42%] -translate-x-1/2", floatDelay: 0 },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { openProduct } = useProductModal();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const backY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "32%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });

  const onPointerMove = (e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      id="home"
      ref={ref}
      onPointerMove={onPointerMove}
      className="grain relative isolate flex min-h-[100svh] items-center overflow-hidden bg-forest-950 pb-40 pt-32 text-cream-50 sm:pb-48"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_20%,#2c5a45_0%,transparent_55%),radial-gradient(ellipse_at_10%_80%,#3b5866_0%,transparent_50%)]" />

      <motion.div
        aria-hidden
        className="absolute -left-40 top-1/3 -z-10 h-72 w-[60rem] rounded-full bg-cream-100/10 blur-3xl"
        animate={{ x: [0, 120, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-40 top-2/3 -z-10 h-56 w-[50rem] rounded-full bg-mist-200/10 blur-3xl"
        animate={{ x: [0, -140, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {LEAVES.map((leaf, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute -top-10 z-0 text-forest-300/40"
          style={{ left: leaf.left }}
          animate={{ y: ["0vh", "115vh"], x: [0, 40, -30, 20], rotate: [0, 180, 300] }}
          transition={{ duration: leaf.duration, delay: leaf.delay, repeat: Infinity, ease: "linear" }}
        >
          <LeafMark style={{ width: leaf.size, height: leaf.size }} />
        </motion.span>
      ))}

      <motion.div style={{ y: backY }} className="absolute inset-x-0 bottom-0 -z-10 text-[#2f4f5c]/70">
        <MountainsSilhouette className="h-56 w-full sm:h-80" />
      </motion.div>
      <motion.div style={{ y: midY }} className="absolute inset-x-0 -bottom-6 -z-10 scale-x-[-1] text-forest-800">
        <MountainsSilhouette className="h-44 w-full sm:h-64" />
      </motion.div>
      <div className="absolute inset-x-0 -bottom-1 z-0 text-cream-100">
        <MountainsSilhouette className="h-24 w-full sm:h-32" />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr]"
      >
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-cream-50/5 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-gold-200 backdrop-blur sm:text-xs sm:tracking-[0.28em]"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-400" />
            From the Blue Mountains of Ooty
          </motion.p>

          <h1 className="font-serif text-5xl font-semibold leading-[0.98] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            <SplitWords text="Nature's goodness," animateOnMount delay={0.3} />
            <br />
            <span className="text-gradient-gold italic">
              <SplitWords text="bottled in the" animateOnMount delay={0.5} />
            </span>{" "}
            <SplitWords text="Nilgiris." animateOnMount delay={0.7} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-cream-200/80"
          >
            Pure essential oils and authentic Ooty delicacies — handpicked from the misty hills of
            the Nilgiris and brought to your doorstep by Cathy_Trndz & Nilgiri Naturals.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#products"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gold-500 px-7 py-4 font-semibold text-forest-950 shadow-xl shadow-gold-600/20 transition hover:-translate-y-0.5"
            >
              <span className="absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-white/40" />
              <span className="relative">Explore Products</span>
              <span className="relative grid h-7 w-7 place-items-center rounded-full bg-forest-950 text-gold-400 transition-transform group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
            <a
              href={whatsappLink("Hello Nilgiri Naturals! I'd like to know more about your products.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-cream-50/25 px-6 py-4 font-medium text-cream-50 backdrop-blur transition hover:border-cream-50/60 hover:bg-cream-50/10"
            >
              <WhatsAppIcon className="h-5 w-5 text-[#4ade80]" />
              Chat on WhatsApp
            </a>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.12, delayChildren: 1.35 }}
            className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-cream-200/80"
          >
            {["100% Pure", "Authentic", "FSSAI Licensed", "MSME Registered"].map((item) => (
              <motion.li
                key={item}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                className="flex items-center gap-2"
              >
                <BadgeCheck className="h-5 w-5 text-gold-400" />
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div className="relative mx-auto aspect-[1/1] w-full max-w-[560px]">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-[8%] rounded-full border border-gold-400/20 bg-[radial-gradient(circle,#2f5d3c_0%,transparent_70%)]"
          />
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.55, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-[18%] rounded-full border border-dashed border-gold-400/25 animate-spin-slow"
          />

          {BOTTLES.map((b, i) => (
            <ParallaxBottle
              key={b.slug}
              slug={b.slug}
              depth={b.depth}
              sx={sx}
              sy={sy}
              className={b.className}
              index={i}
              floatDelay={b.floatDelay}
              onOpen={() => openProduct(b.slug)}
            />
          ))}

          <RotatingBadge />
        </div>
      </motion.div>

      <motion.a
        href="#story"
        aria-label="Scroll to our story"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-36 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-cream-100/70 lg:flex"
      >
        <span className="grid h-12 w-7 justify-center rounded-full border border-cream-100/30 pt-2">
          <motion.span
            className="h-2 w-1 rounded-full bg-cream-100/70"
            animate={{ y: [0, 16, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </span>
        <ArrowDown className="h-3 w-3" />
      </motion.a>
    </section>
  );
}

function ParallaxBottle({
  slug,
  depth,
  sx,
  sy,
  className,
  index,
  floatDelay,
  onOpen,
}: {
  slug: string;
  depth: number;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  className: string;
  index: number;
  floatDelay: number;
  onOpen: () => void;
}) {
  const product = getProduct(slug);
  const x = useTransform(sx, (v) => v * depth);
  const y = useTransform(sy, (v) => v * depth);

  return (
    <motion.div style={{ x, y }} className={`absolute ${className}`}>
      <motion.button
        onClick={onOpen}
        aria-label={`View ${product.name}`}
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 + index * 0.18, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.05, rotate: 0 }}
        className="group block w-full"
      >
        <div className="animate-float" style={{ animationDelay: `${floatDelay}s` }}>
          <div className="relative overflow-hidden rounded-t-full rounded-b-[2rem] border-4 border-cream-50/10 bg-cream-100 shadow-2xl shadow-black/40">
            <Image
              src={product.image}
              alt={product.name}
              width={product.imageWidth}
              height={product.imageHeight}
              preload={index === 2}
              sizes="(max-width: 1024px) 40vw, 240px"
              className="aspect-[3/5] h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-forest-950/90 to-transparent p-3 pt-8 text-center text-xs font-semibold text-cream-50 transition-transform duration-500 group-hover:translate-y-0">
              {product.name}
            </span>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}

function RotatingBadge() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 1.4, type: "spring", stiffness: 120 }}
      className="absolute -bottom-2 right-[6%] z-20 grid h-28 w-28 place-items-center rounded-full bg-cream-50 text-forest-900 shadow-xl sm:h-32 sm:w-32"
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden>
        <defs>
          <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-forest-800 text-[9.5px] font-semibold uppercase tracking-[0.2em]">
          <textPath href="#badge-circle">Pure • Natural • Authentic • </textPath>
        </text>
      </svg>
      <LeafMark className="h-8 w-8 text-gold-600" />
    </motion.div>
  );
}
