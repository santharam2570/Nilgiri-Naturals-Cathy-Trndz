import {
  Activity,
  Brain,
  Candy,
  Cookie,
  Droplets,
  Feather,
  Flame,
  Gift,
  Hand,
  Heart,
  HeartPulse,
  Leaf,
  Mountain,
  Nut,
  ShieldCheck,
  Smile,
  Sparkles,
  Sprout,
  Wind,
  type LucideIcon,
} from "lucide-react";

export type Category = "oils" | "snacks";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  badge?: string;
  tagline: string;
  size?: string;
  short: string;
  description: string;
  accent: string;
  accentSoft: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  poster: string;
  posterWidth: number;
  posterHeight: number;
  benefits: { title: string; text: string; icon: LucideIcon }[];
  howTo: string[];
  note?: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "eucalyptus-oil",
    name: "Eucalyptus Oil",
    category: "oils",
    tagline: "Pure • Natural • Refreshing",
    size: "100 ml",
    short: "Steam-distilled from Nilgiri eucalyptus leaves to clear the airways and refresh the mind.",
    description:
      "The signature scent of the Blue Mountains. Our eucalyptus oil is steam distilled from pure eucalyptus leaves — a time-honoured companion for colds, blocked noses and tired minds.",
    accent: "#6f8f3a",
    accentSoft: "#eef2dc",
    image: "/images/eucalyptus-bottle.jpg",
    imageWidth: 340,
    imageHeight: 700,
    poster: "/images/eucalyptus-poster.jpg",
    posterWidth: 768,
    posterHeight: 1024,
    benefits: [
      {
        title: "Relieves Cold & Nasal Congestion",
        text: "Helps clear the airways and eases breathing.",
        icon: Wind,
      },
      {
        title: "Supports Respiratory Health",
        text: "Soothes cough and supports healthy lungs.",
        icon: HeartPulse,
      },
      {
        title: "Relaxes Mind & Body",
        text: "Calming aroma that reduces stress and fatigue.",
        icon: Brain,
      },
      {
        title: "Natural & Pure",
        text: "Steam distilled from pure eucalyptus leaves.",
        icon: Leaf,
      },
    ],
    howTo: [
      "Add 2–3 drops in hot water and inhale the steam.",
      "Dilute with a carrier oil and use for massage.",
      "Add a few drops to a diffuser for fresh air.",
    ],
    note: "For external use only.",
  },
  {
    slug: "gaultheria-oil",
    name: "Gaultheria Oil",
    category: "oils",
    tagline: "Pure • Natural • Effective",
    size: "100 ml",
    short: "The classic Nilgiri wintergreen oil for joint, muscle and rheumatic pain relief.",
    description:
      "Known in the hills as wintergreen, Gaultheria oil is extracted from Gaultheria leaves. Its warming action has eased aching joints and tired muscles for generations.",
    accent: "#a8323f",
    accentSoft: "#f6e3e3",
    image: "/images/gaultheria-bottle.jpg",
    imageWidth: 310,
    imageHeight: 535,
    poster: "/images/gaultheria-poster.jpg",
    posterWidth: 1024,
    posterHeight: 682,
    benefits: [
      {
        title: "Relieves Joint & Muscle Pain",
        text: "Helps reduce pain, stiffness and inflammation in joints and muscles.",
        icon: Activity,
      },
      {
        title: "Helps in Arthritis",
        text: "Beneficial for arthritis, back pain, neck pain and rheumatic conditions.",
        icon: Flame,
      },
      {
        title: "Improves Blood Circulation",
        text: "Enhances blood flow and helps relieve tension and soreness.",
        icon: HeartPulse,
      },
      {
        title: "Natural & Therapeutic",
        text: "100% pure and natural oil extracted from Gaultheria leaves for holistic care.",
        icon: Leaf,
      },
    ],
    howTo: [
      "Take a few drops and mix with coconut or any carrier oil.",
      "Gently massage on the affected area.",
    ],
    note: "For external use only.",
  },
  {
    slug: "clove-oil",
    name: "Clove Oil",
    category: "oils",
    tagline: "Pure • Natural • Powerful",
    size: "100 ml",
    short: "A powerful natural antiseptic for toothache, skin care and soothing aches.",
    description:
      "Rich, warm and spicy — clove oil is nature's analgesic. A few drops go a long way for tooth and gum discomfort, minor skin care and muscle aches.",
    accent: "#7a4a2a",
    accentSoft: "#f3e7da",
    image: "/images/clove-bottle.jpg",
    imageWidth: 340,
    imageHeight: 595,
    poster: "/images/clove-poster.jpg",
    posterWidth: 1024,
    posterHeight: 682,
    benefits: [
      {
        title: "Relieves Toothache",
        text: "Natural analgesic properties that help reduce tooth pain and gum discomfort.",
        icon: Smile,
      },
      {
        title: "Relieves Muscle & Joint Pain",
        text: "A warming effect that helps ease muscle aches, sprains and joint pain.",
        icon: Activity,
      },
      {
        title: "Supports Skin Health",
        text: "Helps treat acne, reduces blemishes and promotes clear, healthy skin.",
        icon: Sparkles,
      },
      {
        title: "Natural Antiseptic",
        text: "Powerful antimicrobial properties help protect skin from infections.",
        icon: ShieldCheck,
      },
      {
        title: "Reduces Stress & Anxiety",
        text: "Soothing aroma helps calm the mind and promote relaxation.",
        icon: Brain,
      },
      {
        title: "Supports Digestion",
        text: "Helps relieve bloating and indigestion.",
        icon: Droplets,
      },
    ],
    howTo: [
      "Dilute 1–2 drops in a carrier oil before applying on skin.",
      "For dental use, apply a drop on a cotton swab and dab gently on the area.",
    ],
    note: "For external use only. Use in small quantities.",
  },
  {
    slug: "almond-oil",
    name: "Almond Oil",
    category: "oils",
    badge: "Natural Oil",
    tagline: "Pure • Natural • Nourishing",
    size: "100 ml",
    short: "Rich in Vitamin E to deeply nourish skin, strengthen hair and care for nails.",
    description:
      "Pure care from nature for you. Our almond oil is gentle, light and packed with Vitamin E and antioxidants — a daily ritual for soft skin, healthy hair and stronger nails.",
    accent: "#a8692c",
    accentSoft: "#f7ecdd",
    image: "/images/almond-bottle.jpg",
    imageWidth: 345,
    imageHeight: 520,
    poster: "/images/almond-poster.jpg",
    posterWidth: 1024,
    posterHeight: 682,
    benefits: [
      {
        title: "Moisturizes & Nourishes Skin",
        text: "Deeply hydrates and nourishes dry skin, leaving it soft, smooth and healthy.",
        icon: Droplets,
      },
      {
        title: "Promotes Healthy Hair Growth",
        text: "Strengthens hair roots, reduces breakage and promotes shiny, healthy hair.",
        icon: Sprout,
      },
      {
        title: "Rich in Vitamin E",
        text: "Packed with Vitamin E and antioxidants that help protect against skin damage and premature aging.",
        icon: ShieldCheck,
      },
      {
        title: "Soothes & Calms Skin",
        text: "Helps reduce irritation, redness and inflammation. Ideal for sensitive skin.",
        icon: Feather,
      },
      {
        title: "Strengthens Nails & Cuticles",
        text: "Nourishes nails and cuticles, making them stronger and healthier.",
        icon: Hand,
      },
    ],
    howTo: [
      "Massage gently onto skin or scalp.",
      "Leave it on or overnight for best results.",
    ],
    note: "For external use only.",
  },
  {
    slug: "ooty-varkey",
    name: "Ooty Varkey",
    category: "snacks",
    tagline: "Delicious • Crispy • Authentic",
    short: "The famous flaky, crispy Ooty biscuit — the perfect partner for a hot cup of Nilgiri tea.",
    description:
      "Layer upon layer of golden, crispy goodness. Ooty Varkey is the hills' most loved tea-time snack — baked the traditional way for that authentic taste of Ooty.",
    accent: "#b07a2e",
    accentSoft: "#f7ecd6",
    image: "/images/ooty-varkey.jpg",
    imageWidth: 432,
    imageHeight: 432,
    poster: "/images/ooty-varkey.jpg",
    posterWidth: 432,
    posterHeight: 432,
    benefits: [
      {
        title: "Delicious & Crispy",
        text: "Flaky, golden layers with a satisfying crunch in every bite.",
        icon: Cookie,
      },
      {
        title: "Authentic Taste of Ooty",
        text: "The iconic tea-time snack straight from the Nilgiri hills.",
        icon: Mountain,
      },
    ],
    howTo: [
      "Enjoy with a hot cup of Nilgiri tea or coffee.",
      "Store in an airtight container to keep it crispy.",
    ],
  },
  {
    slug: "homemade-chocolate",
    name: "Homemade Chocolate",
    category: "snacks",
    tagline: "Pure • Fresh • Delicious",
    short: "Rich dark chocolates handmade in small batches, loaded with crunchy nuts and fruit.",
    description:
      "Homemade with love in the hills. Our rich dark chocolates are made fresh in small batches and studded with almonds, nuts and fruit — the sweet taste of Ooty's famous homemade chocolate tradition.",
    accent: "#5a3220",
    accentSoft: "#f1e4da",
    image: "/images/homemade-chocolate.jpg",
    imageWidth: 560,
    imageHeight: 555,
    poster: "/images/homemade-chocolate-poster.jpg",
    posterWidth: 1024,
    posterHeight: 819,
    benefits: [
      {
        title: "Rich Dark Chocolate",
        text: "Deep, indulgent cocoa flavour in every bite.",
        icon: Candy,
      },
      {
        title: "Homemade with Love",
        text: "Handmade fresh in small batches, the traditional Ooty way.",
        icon: Heart,
      },
      {
        title: "Loaded with Nuts & Fruit",
        text: "Crunchy almonds, nuts and fruit for texture and taste.",
        icon: Nut,
      },
      {
        title: "Perfect for Gifting",
        text: "A sweet treat for loved ones, festivals and special occasions.",
        icon: Gift,
      },
    ],
    howTo: [
      "Enjoy as a treat any time, or share with family and friends.",
      "Store in a cool, dry place away from direct sunlight.",
      "In warm weather, refrigerate to keep the chocolate firm.",
    ],
  },
];

export const CATEGORIES: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All Products" },
  { id: "oils", label: "Natural Oils" },
  { id: "snacks", label: "Ooty Delicacies" },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug)!;
}
