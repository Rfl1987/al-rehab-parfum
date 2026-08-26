import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  qty: number;
}

interface CartState {
  items: CartItem[];
  add: (id: number) => void;
  dec: (id: number) => void;
  remove: (id: number) => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (id) =>
        set((s) => {
          const ex = s.items.find((i) => i.id === id);
          return ex
            ? { items: s.items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)) }
            : { items: [...s.items, { id, qty: 1 }] };
        }),
      dec: (id) =>
        set((s) => ({
          items: s.items.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i)).filter((i) => i.qty > 0),
        })),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    { name: 'al-rehab-cart-v2' }
  )
);