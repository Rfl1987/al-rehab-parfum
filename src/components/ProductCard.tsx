import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../data/products';
import { useCatalog } from '../store/catalog';
import { useCart } from '../store/cart';
import { getImage } from '../utils/db';

export default function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const navigate = useNavigate();
  const count = useCatalog((s) => s.products.find((p) => p.id === product.id)?.imageCount ?? 0);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let revoke: string | null = null;
    if (count > 0) {
      getImage(product.id, 0).then((blob) => {
        if (blob) {
          const u = URL.createObjectURL(blob);
          setUrl(u);
          revoke = u;
        }
      });
    } else {
      setUrl(null);
    }
    return () => {
      if (revoke) URL.revokeObjectURL(revoke);
    };
  }, [product.id, count]);

  return (
    <article
      onClick={() => navigate(`/product/${product.id}`)}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-espresso-900/5 bg-white shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover"
    >
      <div className="relative aspect-square overflow-hidden bg-ivory-200">
        {url ? (
          <img src={url} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ivory-200 via-ivory-100 to-gold-300/40">
            <span className="font-display text-6xl text-gold-600/50">{product.name.charAt(0)}</span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-espresso-900/70 px-3 py-1 text-[11px] font-medium text-ivory-100 backdrop-blur">
          {product.gender}
        </span>
        {!product.inStock && (
          <div className="absolute inset-0 bg-espresso-900/40 backdrop-blur-[2px]">
            <span className="absolute right-3 top-3 rounded-full bg-espresso-900/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ivory-100">Tükənib</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-display text-xl font-semibold text-espresso-900">{product.name}</h3>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-semibold text-espresso-900">
            {product.price} ₼ <span className="text-xs font-normal text-espresso-400">/ {product.volume}</span>
          </span>
          <button
            disabled={!product.inStock}
            onClick={(e) => {
              e.stopPropagation();
              add(product.id);
            }}
            className="whitespace-nowrap rounded-full bg-espresso-900 px-4 py-2 text-xs font-semibold text-ivory-100 transition-all hover:bg-gold-600 disabled:cursor-not-allowed disabled:bg-espresso-900/20"
          >
            {product.inStock ? 'Əlavə et' : 'Tükənib'}
          </button>
        </div>
      </div>
    </article>
  );
}