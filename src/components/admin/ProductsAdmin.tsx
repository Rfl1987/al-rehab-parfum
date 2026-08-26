import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import type { Product } from '../../data/products';
import type { AdminProduct } from '../../store/catalog';
import { useCatalog } from '../../store/catalog';
import { deleteImages, getImage, putImage } from '../../utils/db';

const MAX_IMAGES = 2;

const parseNotes = (s: string) =>
  s
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);

export default function ProductsAdmin() {
  const products = useCatalog((s) => s.products);
  const add = useCatalog((s) => s.add);
  const [openId, setOpenId] = useState<number | null>(null);

  const newProduct = () => {
    const nextId = Math.max(0, ...products.map((p) => p.id)) + 1;
    add({
      id: nextId,
      name: 'Yeni Ətir',
      tagline: 'Təsvir',
      gender: 'Unisex',
      family: 'Şərq',
      volume: '50ml',
      price: 10,
      inStock: true,
      notes: { top: [], heart: [], base: [] },
      image: '',
      imageCount: 0,
    });
    setOpenId(nextId);
  };

  return (
    <div className="space-y-3">
      <button
        onClick={newProduct}
        className="rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-gold-600"
      >
        + Yeni məhsul
      </button>

      {products.map((p) => (
        <div key={p.id} className="rounded-2xl border border-espresso-900/5 bg-white shadow-card">
          <button
            onClick={() => setOpenId(openId === p.id ? null : p.id)}
            className="flex w-full items-center justify-between p-4 text-left"
          >
            <div>
              <p className="font-display text-lg font-semibold text-espresso-900">{p.name}</p>
              <p className="text-xs text-espresso-400">
                {p.gender} • {p.volume}: {p.price}₼ • {p.imageCount ?? 0} şəkil
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                p.inStock ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'
              }`}
            >
              {p.inStock ? 'Stokda' : 'Tükənib'}
            </span>
          </button>
          {openId === p.id && <EditForm product={p} onDone={() => setOpenId(null)} />}
        </div>
      ))}
    </div>
  );
}

function EditForm({ product, onDone }: { product: AdminProduct; onDone: () => void }) {
  const update = useCatalog((s) => s.update);
  const remove = useCatalog((s) => s.remove);
  const [name, setName] = useState(product.name);
  const [tagline, setTagline] = useState(product.tagline);
  const [description, setDescription] = useState(product.description ?? '');
  const [gender, setGender] = useState<Product['gender']>(product.gender);
  const [volume, setVolume] = useState<Product['volume']>(product.volume);
  const [price, setPrice] = useState(String(product.price));
  const [inStock, setInStock] = useState(product.inStock);
  const [noteTop, setNoteTop] = useState(product.notes.top.join(', '));
  const [noteHeart, setNoteHeart] = useState(product.notes.heart.join(', '));
  const [noteBase, setNoteBase] = useState(product.notes.base.join(', '));
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    let alive = true;
    const loaded: string[] = [];
    const count = product.imageCount ?? 0;
    Promise.all(Array.from({ length: count }, (_, i) => getImage(product.id, i))).then((blobs) => {
      if (!alive) return;
      const u = blobs.filter((b): b is Blob => !!b).map((b) => URL.createObjectURL(b));
      loaded.push(...u);
      setUrls(u);
    });
    return () => {
      alive = false;
      loaded.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [product.id, product.imageCount]);

  const pickImages = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    const currentCount = product.imageCount ?? 0;
    const space = MAX_IMAGES - currentCount;
    const take = files.slice(0, space);
    let newCount = currentCount;
    for (const file of take) {
      await putImage(product.id, newCount, file);
      newCount++;
    }
    update(product.id, { imageCount: newCount });
    e.target.value = '';
  };

  const removeImage = async (index: number) => {
    const currentCount = product.imageCount ?? 0;
    const remaining: Blob[] = [];
    for (let i = index + 1; i < currentCount; i++) {
      const b = await getImage(product.id, i);
      if (b) remaining.push(b);
    }
    await deleteImages(product.id, currentCount);
    let newCount = index;
    for (const b of remaining) {
      await putImage(product.id, newCount, b);
      newCount++;
    }
    update(product.id, { imageCount: newCount });
  };

  const inputCls =
    'w-full rounded-xl border border-espresso-900/10 bg-white px-3 py-2 text-sm text-espresso-800 outline-none transition-all focus:border-gold-500';
  const labelCls = 'mb-1 block text-[11px] font-semibold uppercase tracking-wider text-espresso-400';

  const save = async () => {
    const priceNum = Number(price);
    if (!name.trim() || !priceNum || priceNum <= 0) return;
    update(product.id, {
      name: name.trim(),
      tagline: tagline.trim(),
      description: description.trim() ? description.trim() : undefined,
      gender,
      volume,
      price: priceNum,
      inStock,
      notes: {
        top: parseNotes(noteTop),
        heart: parseNotes(noteHeart),
        base: parseNotes(noteBase),
      },
    });
    onDone();
  };

  const deleteAll = async () => {
    if (!window.confirm(`${product.name} tamamilə silinsin? (şəkilləri də daxil)`)) return;
    const count = product.imageCount ?? 0;
    await deleteImages(product.id, count);
    remove(product.id);
  };

  return (
    <div className="space-y-3 border-t border-espresso-900/5 p-4">
      <div>
        <span className={labelCls}>Şəkillər ({urls.length}/{MAX_IMAGES})</span>
        <div className="flex flex-wrap items-center gap-2">
          {urls.map((u, i) => (
            <div key={i} className="relative h-24 w-24 overflow-hidden rounded-xl border border-espresso-900/10">
              <img src={u} alt="" className="h-full w-full object-cover" />
              <button
                onClick={() => removeImage(i)}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white"
              >
                ✕
              </button>
            </div>
          ))}
          {urls.length < MAX_IMAGES && (
            <label className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gold-500/50 bg-gold-500/5 text-2xl text-gold-600 transition-all hover:border-gold-500 hover:bg-gold-500/10">
              +
              <input type="file" accept="image/*" multiple className="hidden" onChange={pickImages} />
            </label>
          )}
        </div>
      </div>

      <div>
        <span className={labelCls}>Məhsulun adı</span>
        <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <span className={labelCls}>Qısa təsvir (məhsul səhifəsində görünür)</span>
        <input className={inputCls} value={tagline} onChange={(e) => setTagline(e.target.value)} />
      </div>
      <div>
        <span className={labelCls}>Ətraflı təsvir (məhsul səhifəsində)</span>
        <textarea className={inputCls} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Ətir haqqında ətraflı məlumat..." />
      </div>

      <div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-3">
        <span className={labelCls}>Qoxu Piramidası (vergül ilə ayır)</span>
        <div className="space-y-2">
          <input className={inputCls} value={noteTop} onChange={(e) => setNoteTop(e.target.value)} placeholder="Üst notlar: Bergamot, Nanə" />
          <input className={inputCls} value={noteHeart} onChange={(e) => setNoteHeart(e.target.value)} placeholder="Ürək notları: Gül, Musk" />
          <input className={inputCls} value={noteBase} onChange={(e) => setNoteBase(e.target.value)} placeholder="Baza notları: Əmbrə, Sandal" />
        </div>
      </div>

      <div>
        <span className={labelCls}>Kateqoriya</span>
        <select className={inputCls} value={gender} onChange={(e) => setGender(e.target.value as Product['gender'])}>
          <option value="Kişi">Kişi</option>
          <option value="Qadın">Qadın</option>
          <option value="Unisex">Unisex</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <span className={labelCls}>Həcm</span>
          <select className={inputCls} value={volume} onChange={(e) => setVolume(e.target.value as Product['volume'])}>
            <option value="50ml">50ml</option>
            <option value="100ml">100ml</option>
          </select>
        </div>
        <div>
          <span className={labelCls}>Qiymət (₼)</span>
          <input className={inputCls} type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm text-espresso-700">
        <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} />
        Stokda mövcuddur
      </label>
      <div className="flex gap-2 pt-1">
        <button onClick={save} className="flex-1 rounded-full bg-espresso-900 px-4 py-2 text-sm font-semibold text-ivory-100 transition-all hover:bg-gold-600">
          Yadda saxla
        </button>
        <button
          onClick={deleteAll}
          className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-500 transition-all hover:bg-red-50"
        >
          Sil
        </button>
      </div>
    </div>
  );
}