import Reveal, { SplitWords } from "@/components/ui/Reveal";
import { LeafMark } from "@/components/ui/Icons";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light = false,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignCls}`}>
      <Reveal y={16}>
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] ${
            light ? "border-gold-400/40 text-gold-200" : "border-forest-700/20 text-forest-600"
          }`}
        >
          <LeafMark className="h-3.5 w-3.5" />
          {eyebrow}
        </span>
      </Reveal>
      <h2
        className={`font-serif text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl ${
          light ? "text-cream-50" : "text-forest-900"
        }`}
      >
        <SplitWords text={title} />
      </h2>
      {subtitle && (
        <Reveal delay={0.2} y={20}>
          <p className={`text-base leading-relaxed sm:text-lg ${light ? "text-cream-200/80" : "text-forest-700/80"}`}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
