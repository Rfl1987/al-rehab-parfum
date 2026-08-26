import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../store/cart';

export default function Navbar() {
  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const [open, setOpen] = useState(false);

  return (
    <header className="glass fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="font-display text-2xl font-semibold text-espresso-900">
          Al Rehab <span className="gold-text">Parfüm</span>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-espresso-700 sm:flex">
          <Link to="/" className="transition-colors hover:text-gold-600">Ana səhifə</Link>
          <a href="#kolleksiya" className="transition-colors hover:text-gold-600">Kolleksiya</a>
          <a href="#elaqe" className="transition-colors hover:text-gold-600">Əlaqə</a>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/cart" aria-label="Səbət" className="relative rounded-full border border-espresso-900/10 bg-white/60 p-2.5 text-espresso-800 transition-all hover:border-gold-500 hover:text-gold-600">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <button onClick={() => setOpen(!open)} aria-label="Menyu" className="rounded-full border border-espresso-900/10 bg-white/60 p-2.5 text-espresso-800 sm:hidden">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-espresso-900/5 bg-ivory-50/95 px-4 py-3 backdrop-blur-xl sm:hidden">
          <div className="flex flex-col gap-3 text-sm font-medium text-espresso-700">
            <Link to="/" onClick={() => setOpen(false)} className="hover:text-gold-600">Ana səhifə</Link>
            <a href="#kolleksiya" onClick={() => setOpen(false)} className="hover:text-gold-600">Kolleksiya</a>
            <a href="#elaqe" onClick={() => setOpen(false)} className="hover:text-gold-600">Əlaqə</a>
          </div>
        </div>
      )}
    </header>
  );
}