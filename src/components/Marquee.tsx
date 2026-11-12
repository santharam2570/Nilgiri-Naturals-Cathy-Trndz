import { LeafMark } from "@/components/ui/Icons";

const ITEMS = [
  "100% Pure",
  "Eucalyptus Oil",
  "Natural & Authentic",
  "Gaultheria Oil",
  "Straight from Ooty",
  "Clove Oil",
  "Pure Care from Nature",
  "Almond Oil",
  "Handpicked in the Nilgiris",
  "Ooty Varkey",
  "Homemade with Love",
  "Homemade Chocolate",
];

export default function Marquee({ reverse = false, dark = false }: { reverse?: boolean; dark?: boolean }) {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div
      className={`relative overflow-hidden py-5 ${
        dark ? "bg-forest-900 text-cream-100" : "bg-gold-500 text-forest-950"
      } ${reverse ? "-rotate-1" : "rotate-1"} scale-[1.02]`}
    >
      <div
        className="flex w-max animate-marquee items-center gap-10 hover:[animation-play-state:paused]"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap font-serif text-2xl font-semibold italic sm:text-3xl">
            {item}
            <LeafMark className={`h-6 w-6 ${dark ? "text-gold-400" : "text-forest-800"}`} />
          </span>
        ))}
      </div>
    </div>
  );
}
