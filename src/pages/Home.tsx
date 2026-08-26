import { useState } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';
import { useCatalog } from '../store/catalog';

const filters = ['Hamısı', 'Kişi', 'Qadın', 'Unisex'] as const;
type Filter = (typeof filters)[number];
const volumes = ['Hamısı', '50ml', '100ml'];

export default function Home() {
  const products = useCatalog((s) => s.products);
  const [filter, setFilter] = useState<Filter>('Hamısı');
  const [volume, setVolume] = useState('Hamısı');

  const byVolume = volume === 'Hamısı' ? products : products.filter((p) => p.volume === volume);
  const list = filter === 'Hamısı' ? byVolume : byVolume.filter((p) => p.gender === filter);
  const countFor = (f: Filter) =>
    f === 'Hamısı' ? byVolume.length : byVolume.filter((p) => p.gender === f).length;

  return (
    <>
      <Hero />
      <section id="kolleksiya" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-3xl font-semibold text-espresso-900 sm:text-4xl">Kolleksiya</h2>
          <span className="text-sm text-espresso-400">{list.length} məhsul</span>
        </div>

        <div className="mb-3 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                filter === f
                  ? 'border-espresso-900 bg-espresso-900 text-ivory-100'
                  : 'border-espresso-900/10 bg-white/70 text-espresso-600 hover:border-gold-500 hover:text-gold-600'
              }`}
            >
              {f} <span className="opacity-60">{countFor(f)}</span>
            </button>
          ))}
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-espresso-400">Həcmi:</span>
          {volumes.map((v) => (
            <button
              key={v}
              onClick={() => setVolume(v)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                volume === v
                  ? 'border-gold-500 bg-gold-500 text-white'
                  : 'border-espresso-900/10 bg-white/70 text-espresso-600 hover:border-gold-500 hover:text-gold-600'
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={`${filter}-${volume}-${p.id}`} delay={(i % 3) * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}