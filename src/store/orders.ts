import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface OrderItem {
  id: number;
  name: string;
  volume: string;
  qty: number;
  price: number;
}

export type OrderStatus = 'yeni' | 'hazirlanir' | 'yolda' | 'catdirildi';

export const STATUS_LABELS: Record<OrderStatus, string> = {
  yeni: 'Yeni',
  hazirlanir: 'Hazırlanır',
  yolda: 'Yolda',
  catdirildi: 'Çatdırıldı',
};

export interface Order {
  id: string;
  createdAt: string;
  customer: { name: string; phone: string; address: string; note: string };
  items: OrderItem[];
  total: number;
  status: OrderStatus;
}

interface OrdersState {
  orders: Order[];
  addOrder: (o: Order) => void;
  setStatus: (id: string, status: OrderStatus) => void;
}

export const useOrders = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (o) => set((s) => ({ orders: [o, ...s.orders] })),
      setStatus: (id, status) =>
        set((s) => ({ orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)) })),
    }),
    { name: 'al-rehab-orders', version: 1 }
  )
);