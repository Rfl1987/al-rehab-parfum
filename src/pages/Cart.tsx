import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '../config';
import { useCart } from '../store/cart';
import { useCatalog } from '../store/catalog';
import { useOrders } from '../store/orders';

export default function Cart() {
  const { items, add, dec, remove, clear } = useCart();
  const products = useCatalog((s) => s.products);
  const addOrder = useOrders((s) => s.addOrder);
  const [form, setForm] = useState({ name: '', phone: '', address: '', note: '' });
  const [sent, setSent] = useState(false);

  const lines = items.flatMap((i) => {
    const product = products.find((p) => p.id === i.id);
    return product ? [{ qty: i.qty, product }] : [];
  });

  const total = lines.reduce((s, l) => s + l.product.price * l.qty, 0);

  const submit = (e: FormEvent) => {
    e.preventDefault();

    addOrder({
      id: `${Date.now().toString(36)}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toLocaleString('az'),
      customer: { ...form },
      items: lines.map((l) => ({
        id: l.product.id,
        name: l.product.name,
        volume: l.product.volume,
        qty: l.qty,
        price: l.product.price,
      })),
      total,
      status: 'yeni',
    });

    const msg = [
      '🛍️ YENİ SİFARİŞ',
      '──────────────',
      ...lines.map((l, idx) => `${idx + 1}. ${l.product.name} (${l.product.volume}) x${l.qty} — ${l.product.price * l.qty} ₼`),
      '──────────────',
      `Cəmi: ${total} ₼`,
      `Ad: ${form.name}`,
      `Telefon: ${form.phone}`,
      `Ünvan: ${form.address}`,
      form.note.trim() ? `Qeyd: ${form.note.trim()}` : '',
      'Ödəniş: Nağd (çatdırılmada)',
    ]
      .filter(Boolean)
      .join('\n');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    clear();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 text-3xl text-white">✓</div>
        <h1 className="font-display text-3xl font-semibold text-espresso-900">Sifarişiniz göndərildi!</h1>
        <p className="text-espresso-500">
          Sifarişiniz WhatsApp üzərindən bizə çatdı. Tezliklə sizinlə əlaqə saxlayacağıq. WhatsApp açılmadısa: {WHATSAPP_DISPLAY}
        </p>
        <Link to="/" className="rounded-full bg-espresso-900 px-8 py-3 font-semibold text-ivory-100 transition-all hover:bg-gold-600">
          Alış-verişə davam et
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
        <p className="font-display text-3xl font-semibold text-espresso-900">Səbətiniz boşdur</p>
        <p className="text-espresso-500">Kolleksiyamıza baxın və öz qoxunuzu tapın.</p>
        <Link to="/" className="rounded-full bg-espresso-900 px-8 py-3 font-semibold text-ivory-100 transition-all hover:bg-gold-600">
          Kolleksiyaya bax
        </Link>
      </div>
    );
  }

  const inputCls =
    'w-full rounded-xl border border-espresso-900/10 bg-white px-4 py-3 text-sm text-espresso-800 outline-none transition-all placeholder:text-espresso-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20';

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <h1 className="mb-8 mt-10 font-display text-4xl font-semibold text-espresso-900">Səbət</h1>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          {lines.map((l) => (
            <div key={l.product.id} className="flex items-center gap-3 rounded-2xl border border-espresso-900/5 bg-white p-4 shadow-card sm:gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-ivory-200 to-gold-300/40 font-display text-2xl text-gold-600">
                {l.product.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-display text-lg font-semibold text-espresso-900">{l.product.name}</p>
                <p className="text-xs text-espresso-400">{l.product.volume} • {l.product.price} ₼</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => dec(l.product.id)} className="h-8 w-8 rounded-full border border-espresso-900/10 text-espresso-700 transition-colors hover:border-gold-500 hover:text-gold-600">−</button>
                <span className="w-6 text-center text-sm font-semibold">{l.qty}</span>
                <button onClick={() => add(l.product.id)} className="h-8 w-8 rounded-full border border-espresso-900/10 text-espresso-700 transition-colors hover:border-gold-500 hover:text-gold-600">+</button>
              </div>
              <div className="w-16 text-right font-semibold text-espresso-900 sm:w-20">{l.product.price * l.qty} ₼</div>
              <button onClick={() => remove(l.product.id)} aria-label="Sil" className="text-espresso-400 transition-colors hover:text-red-500">✕</button>
            </div>
          ))}
        </div>

        <form onSubmit={submit} className="flex h-fit flex-col gap-4 rounded-2xl border border-espresso-900/5 bg-white p-6 shadow-card">
          <h2 className="font-display text-2xl font-semibold text-espresso-900">Çatdırılma məlumatları</h2>
          <input required className={inputCls} placeholder="Ad, Soyad" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input required type="tel" className={inputCls} placeholder="Telefon: +994 XX XXX XX XX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <textarea required rows={3} className={inputCls} placeholder="Çatdırılma ünvanı" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <textarea rows={2} className={inputCls} placeholder="Qeyd (istəyə görə)" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
          <div className="flex items-center justify-between border-t border-espresso-900/5 pt-4 text-lg font-semibold text-espresso-900">
            <span>Cəmi</span>
            <span>{total} ₼</span>
          </div>
          <button type="submit" className="rounded-full bg-gold-500 px-8 py-4 font-semibold text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-gold-600 hover:shadow-card-hover">
            Sifarişi WhatsApp-la göndər
          </button>
          <p className="text-center text-xs text-espresso-400">Ödəniş: Nağd — çatdırılma zamanı</p>
        </form>
      </div>
    </div>
  );
}