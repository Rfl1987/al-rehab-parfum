import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../data/products';
import { products as seed } from '../data/products';

export type AdminProduct = Product & { description?: string; imageCount?: number };

interface CatalogState {
  products: AdminProduct[];
  update: (id: number, patch: Partial<AdminProduct>) => void;
  add: (p: AdminProduct) => void;
  remove: (id: number) => void;
  reset: () => void;
}

export const useCatalog = create<CatalogState>()(
  persist(
    (set) => ({
      products: seed as AdminProduct[],
      update: (id, patch) =>
        set((s) => ({ products: s.products.map((p) => (p.id === id ? { ...p, ...patch } : p)) })),
      add: (p) => set((s) => ({ products: [p, ...s.products] })), // yeni əvvələ
      remove: (id) => set((s) => ({ products: s.products.filter((p) => p.id !== id) })),
      reset: () => set({ products: seed as AdminProduct[] }),
    }),
    { name: 'al-rehab-catalog-v2' }
  )
);