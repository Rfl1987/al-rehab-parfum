import { Link } from 'react-router-dom';
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_NUMBER } from '../config';

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
      <p className="mt-10 text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">Haqqımızda</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-espresso-900 sm:text-5xl">
        Qoxunuz sizi <span className="gold-text italic">xatırlatsın</span>
      </h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-espresso-600 sm:text-base">
        <p>
          Al Rehab Parfüm — Səudiyyə Ərəbistanının məşhur Al Rehab brendinin orijinal ətirlərini Azərbaycanda
          təqdim edən onlayn mağazadır. Hər bir məhsulumuz birbaşa istehsalçıdan tədarük olunur və 100%
          orijinallıq zəmanəti ilə satışa çıxarılır.
        </p>
        <p>
          Kolleksiyamızda qadın, kişi və unisex ətirlər var — təzə və yüngül qoxulardan tutmuş dərin oud və
          ambra notlarına qədər. Premium keyfiyyəti hamı üçün əlçatan qiymətlərlə təklif edirik.
        </p>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-espresso-900/5 bg-white p-5 shadow-card">
          <p className="font-display text-lg font-semibold text-espresso-900">100% Orijinal</p>
          <p className="mt-1 text-sm text-espresso-500">Bütün məhsullar orijinallıq zəmanəti ilə.</p>
        </div>
        <div className="rounded-2xl border border-espresso-900/5 bg-white p-5 shadow-card">
          <p className="font-display text-lg font-semibold text-espresso-900">Sürətli çatdırılma</p>
          <p className="mt-1 text-sm text-espresso-500">Bakı daxili sifarişlər qısa müddətdə çatdırılır.</p>
        </div>
        <div className="rounded-2xl border border-espresso-900/5 bg-white p-5 shadow-card">
          <p className="font-display text-lg font-semibold text-espresso-900">Nağd ödəniş</p>
          <p className="mt-1 text-sm text-espresso-500">Ödəniş məhsulu təhvil alarkən edilir.</p>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-espresso-900/5 bg-white p-6 shadow-card">
        <p className="font-display text-xl font-semibold text-espresso-900">Bizimlə əlaqə</p>
        <p className="mt-2 text-sm text-espresso-500">
          Sualınız var? Zəng edin və ya WhatsApp-la yazın — kömək etməkdən məmnun olarıq.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={PHONE_TEL}
            className="rounded-full bg-espresso-900 px-6 py-3 text-sm font-semibold text-ivory-100 transition-all hover:bg-gold-600"
          >
            {PHONE_DISPLAY}
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-espresso-900/15 bg-white px-6 py-3 text-sm font-semibold text-espresso-800 transition-all hover:border-gold-500 hover:text-gold-600"
          >
            WhatsApp ilə yazın
          </a>
        </div>
      </div>

      <Link to="/" className="mt-8 inline-block text-sm font-semibold text-espresso-500 transition-colors hover:text-gold-600">
        ← Ana səhifəyə qayıt
      </Link>
    </div>
  );
}