"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useCallback, useContext, useState } from "react";
import ProductModal from "@/components/ProductModal";
import { getProduct, type Product } from "@/lib/products";

type ModalContextValue = {
  openProduct: (slug: string) => void;
};

const ModalContext = createContext<ModalContextValue>({ openProduct: () => {} });

export function useProductModal() {
  return useContext(ModalContext);
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [product, setProduct] = useState<Product | null>(null);
  const openProduct = useCallback((slug: string) => setProduct(getProduct(slug)), []);

  return (
    <MotionConfig reducedMotion="user">
      <ModalContext.Provider value={{ openProduct }}>
        {children}
        <ProductModal product={product} onClose={() => setProduct(null)} />
      </ModalContext.Provider>
    </MotionConfig>
  );
}
