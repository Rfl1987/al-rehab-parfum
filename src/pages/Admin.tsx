import { useState } from 'react';
import Dashboard from '../components/admin/Dashboard';
import OrdersAdmin from '../components/admin/OrdersAdmin';
import ProductsAdmin from '../components/admin/ProductsAdmin';
import { ADMIN_PASSCODE } from '../config';

type Tab = 'dash' | 'products' | 'orders';

export default function Admin() {
  const [authed, setAuthed] = useState(sessionStorage.getItem('admin_ok') === '1');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState(false);
  const [tab, setTab] = useState<Tab>('dash');

  if (!authed) {
    return (
      <div className="mx-auto flex max-w-sm flex-col gap-4 px-4 py-24">
        <h1 className="text-center font-display text-3xl font-semibold text-espresso-900">Admin Giriş</h1>
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Parol"
          className="rounded-xl border border-espresso-900/10 bg-white px-4 py-3 text-sm text-espresso-800 outline-none transition-all focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
        />
        {err && <p className="text-center text-xs text-red-500">Yanlış parol</p>}
        <button
          onClick={() => {
            if (pass === ADMIN_PASSCODE) {
              sessionStorage.setItem('admin_ok', '1');
              setAuthed(true);
            } else {
              setErr(true);
            }
          }}
          className="rounded-full bg-espresso-900 px-8 py-3 font-semibold text-ivory-100 transition-all hover:bg-gold-600"
        >
          Giriş
        </button>
      </div>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'dash', label: 'Panel' },
    { id: 'products', label: 'Məhsullar' },
    { id: 'orders', label: 'Sifarişlər' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div className="mt-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold text-espresso-900">Admin Panel</h1>
        <button
          onClick={() => {
            sessionStorage.removeItem('admin_ok');
            setAuthed(false);
          }}
          className="text-sm font-semibold text-espresso-500 transition-colors hover:text-red-500"
        >
          Çıxış
        </button>
      </div>

      <div className="mb-6 mt-4 flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
              tab === t.id
                ? 'border-espresso-900 bg-espresso-900 text-ivory-100'
                : 'border-espresso-900/10 bg-white/70 text-espresso-600 hover:border-gold-500 hover:text-gold-600'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'dash' && <Dashboard go={setTab} />}
      {tab === 'products' && <ProductsAdmin />}
      {tab === 'orders' && <OrdersAdmin />}
    </div>
  );
}