import { useState } from 'react';
import { STATUS_LABELS, useOrders } from '../../store/orders';
import type { OrderStatus } from '../../store/orders';

const statuses: OrderStatus[] = ['yeni', 'hazirlanir', 'yolda', 'catdirildi'];

export default function OrdersAdmin() {
  const orders = useOrders((s) => s.orders);
  const setStatus = useOrders((s) => s.setStatus);
  const [openId, setOpenId] = useState<string | null>(null);

  if (orders.length === 0) {
    return <p className="rounded-2xl border border-espresso-900/5 bg-white p-6 text-sm text-espresso-500 shadow-card">Hələ sifariş yoxdur.</p>;
  }

  return (
    <div className="space-y-3">
      {orders.map((o) => (
        <div key={o.id} className="rounded-2xl border border-espresso-900/5 bg-white p-4 shadow-card">
          <button onClick={() => setOpenId(openId === o.id ? null : o.id)} className="flex w-full items-center justify-between text-left">
            <div>
              <p className="font-semibold text-espresso-900">{o.customer.name}</p>
              <p className="text-xs text-espresso-400">{o.createdAt} • {o.items.length} məhsul</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-espresso-900">{o.total} ₼</p>
              <p className="text-xs text-gold-600">{STATUS_LABELS[o.status]}</p>
            </div>
          </button>

          {openId === o.id && (
            <div className="mt-4 space-y-3 border-t border-espresso-900/5 pt-3 text-sm">
              <ul className="space-y-1 text-espresso-600">
                {o.items.map((it, i) => (
                  <li key={i}>
                    {it.name} ({it.volume}) x{it.qty} — {it.price * it.qty} ₼
                  </li>
                ))}
              </ul>
              <p className="text-espresso-600">📞 {o.customer.phone}</p>
              <p className="text-espresso-600">📍 {o.customer.address}</p>
              {o.customer.note && <p className="text-espresso-500">📝 {o.customer.note}</p>}
              <div className="flex flex-wrap gap-2 pt-1">
                {statuses.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(o.id, s)}
                    className={`rounded-full border px-3 py-1 text-[11px] font-semibold transition-all ${
                      o.status === s
                        ? 'border-gold-500 bg-gold-500 text-white'
                        : 'border-espresso-900/10 bg-white text-espresso-600 hover:border-gold-400'
                    }`}
                  >
                    {STATUS_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}