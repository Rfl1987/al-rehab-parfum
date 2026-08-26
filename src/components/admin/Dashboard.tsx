import { useCatalog } from '../../store/catalog';
import { STATUS_LABELS, useOrders } from '../../store/orders';

export default function Dashboard({ go }: { go: (t: 'dash' | 'products' | 'orders') => void }) {
  const orders = useOrders((s) => s.orders);
  const products = useCatalog((s) => s.products);

  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const newCount = orders.filter((o) => o.status === 'yeni').length;
  const outStock = products.filter((p) => !p.inStock).length;

  const stats = [
    { label: 'Ümumi sifariş', value: String(orders.length) },
    { label: 'Yeni sifariş', value: String(newCount) },
    { label: 'Gəlir', value: `${revenue} ₼` },
    { label: 'Stokda yoxdur', value: String(outStock) },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-espresso-900/5 bg-white p-4 text-center shadow-card">
            <p className="text-2xl font-semibold text-espresso-900">{s.value}</p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-espresso-400">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-espresso-900/5 bg-white p-5 shadow-card">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-display text-xl font-semibold text-espresso-900">Son sifarişlər</p>
          <button onClick={() => go('orders')} className="text-xs font-semibold text-gold-600">
            Hamısına bax →
          </button>
        </div>
        {orders.length === 0 ? (
          <p className="text-sm text-espresso-500">Hələ sifariş yoxdur. Publik saytda test sifarişi ver!</p>
        ) : (
          <ul className="divide-y divide-espresso-900/5">
            {orders.slice(0, 5).map((o) => (
              <li key={o.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="font-semibold text-espresso-800">{o.customer.name}</p>
                  <p className="text-xs text-espresso-400">{o.createdAt}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-espresso-900">{o.total} ₼</p>
                  <p className="text-xs text-gold-600">{STATUS_LABELS[o.status]}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}