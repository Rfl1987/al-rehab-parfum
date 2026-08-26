import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { WHATSAPP_NUMBER } from '../config';
import { useCatalog } from '../store/catalog';
import { useCart } from '../store/cart';
import { getImage } from '../utils/db';

export default function Product() {
  const { id } = useParams();
  const products = useCatalog((s) => s.products);
  const product = products.find((p) => p.id === Number(id));
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);
  const [urls, setUrls] = useState<string[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let alive = true;
    const loaded: string[] = [];
    if (!product) return;
    const count = product.imageCount ?? 0;
    if (count === 0) {
      setUrls([]);
      return;
    }
    Promise.all(Array.from({ length: count }, (_, i) => getImage(product.id, i))).then((blobs) => {
      if (!alive) return;
      const u = blobs.filter((b): b is Blob => !!b).map((b) => URL.createObjectURL(b));
      loaded.push(...u);
      setUrls(u);
      setActive(0);
    });
    return () => {
      alive = false;
      loaded.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [product]);

  if (!product) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
        <p className="font-display text-3xl font-semibold text-espresso-900">Məhsul tapılmadı</p>
        <Link to="/" className="rounded-full bg-espresso-900 px-8 py-3 font-semibold text-ivory-100 transition-all hover:bg-gold-600">
          Geriyə qayıt
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    add(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const askUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Salam! ${product.name} (${product.volume}) haqqında soruşmaq istəyirəm.`
  )}`;

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
      <Link to="/" className="mt-8 inline-block text-sm font-semibold text-espresso-500 transition-colors hover:text-gold-600">
        ← Geri
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-espresso-900/5 bg-white shadow-card lg:aspect-square">
            {urls.length > 0 ? (
              <img src={urls[active]} alt={product.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ivory-200 via-ivory-100 to-gold-300/40">
                <span className="font-display text-9xl text-gold-600/50">{product.name.charAt(0)}</span>
              </div>
            )}
            <span className="absolute left-4 top-4 rounded-full bg-espresso-900/70 px-3 py-1 text-xs font-medium text-ivory-100 backdrop-blur">
              {product.gender}
            </span>
            {!product.inStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-espresso-900/40 backdrop-blur-[2px]">
                <span className="rounded-full bg-espresso-900/80 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-ivory-100">Tükənib</span>
              </div>
            )}
          </div>
          {urls.length > 1 && (
            <div className="flex gap-2">
              {urls.map((u, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-20 w-20 overflow-hidden rounded-xl border-2 transition-all ${
                    active === i ? 'border-gold-500' : 'border-espresso-900/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={u} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <h1 className="font-display text-4xl font-semibold text-espresso-900 sm:text-5xl">{product.name}</h1>
            <p className="mt-2 text-espresso-500">{product.tagline}</p>
          </div>

          <span className="w-fit rounded-full border border-gold-500 bg-gold-500 px-5 py-2 text-sm font-semibold text-white">
            {product.volume}
          </span>

          <p className="text-3xl font-semibold text-espresso-900">
            {product.price} ₼ <span className="text-sm font-normal text-espresso-400">/ {product.volume}</span>
          </p>

          <p className="text-sm leading-relaxed text-espresso-500">
            {product.description ??
              'Bu ətir haqqında ətraflı məlumat tezliklə əlavə olunacaq. Orijinal Al Rehab keyfiyyəti — hər damlada Şərqin zərifliyi.'}
          </p>

          <div className="rounded-2xl border border-espresso-900/5 bg-white p-5 shadow-card">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">Qoxu Piramidası</p>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-semibold text-espresso-800">Üst notlar</p>
                <p className="text-espresso-500">{product.notes.top.join(' • ')}</p>
              </div>
              <div>
                <p className="font-semibold text-espresso-800">Ürək notları</p>
                <p className="text-espresso-500">{product.notes.heart.join(' • ')}</p>
              </div>
              <div>
                <p className="font-semibold text-espresso-800">Baza notları</p>
                <p className="text-espresso-500">{product.notes.base.join(' • ')}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              disabled={!product.inStock}
              onClick={handleAdd}
              className="flex-1 whitespace-nowrap rounded-full bg-espresso-900 px-6 py-3 text-sm font-semibold text-ivory-100 transition-all hover:bg-gold-600 disabled:cursor-not-allowed disabled:bg-espresso-900/20"
            >
              {added ? '✓ Əlavə olundu' : product.inStock ? 'Səbətə əlavə et' : 'Tükənib'}
            </button>
            <a
              href={askUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-espresso-900/15 bg-white px-5 py-3 text-sm font-semibold text-espresso-800 transition-all hover:border-gold-500 hover:text-gold-600"
            >
              Soruş
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}