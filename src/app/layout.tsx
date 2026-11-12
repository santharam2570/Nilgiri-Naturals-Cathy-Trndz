import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Dancing_Script, Jost } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nilgiri-naturals-cathy-trndz.vercel.app"),
  title: "Nilgiri Naturals | Pure Essential Oils & Ooty Delicacies",
  description:
    "Pure, natural and authentic products from the Nilgiri hills — Eucalyptus, Gaultheria, Clove and Almond oils, crispy Ooty Varkey and rich homemade dark chocolate. Order on WhatsApp from Cathy_Trndz & Nilgiri Naturals.",
  keywords: [
    "Nilgiri Naturals",
    "Ooty products",
    "Eucalyptus oil",
    "Gaultheria oil",
    "Clove oil",
    "Almond oil",
    "Ooty Varkey",
    "Ooty homemade chocolate",
    "Cathy_Trndz",
  ],
  openGraph: {
    title: "Nilgiri Naturals — Nature's goodness for a better you",
    description:
      "Pure essential oils and authentic Ooty delicacies, straight from the Blue Mountains.",
    images: ["/images/eucalyptus-poster.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#14291d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${cormorant.variable} ${dancing.variable} antialiased`}
    >
      <body className="min-h-full font-sans" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
