import { Link } from 'react-router-dom';
import { PHONE_DISPLAY, PHONE_TEL } from '../config';

export default function Footer() {
  const goHome = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer id="elaqe" className="border-t border-espresso-900/5 bg-ivory-50">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-10 sm:px-6">
        <nav className="flex flex-col items-start gap-2 text-sm font-semibold text-espresso-800">
          <Link to="/" onClick={goHome} className="transition-colors hover:text-gold-600">
            Ana səhifə
          </Link>
          <a href={PHONE_TEL} className="transition-colors hover:text-gold-600">
            {PHONE_DISPLAY}
          </a>
          <Link to="/about" className="transition-colors hover:text-gold-600">
            Haqqımızda
          </Link>
        </nav>
        <p className="text-xs text-espresso-400">© 2026 Al Rehab Parfüm. Bütün hüquqlar qorunur.</p>
      </div>
    </footer>
  );
}