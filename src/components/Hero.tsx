import HeroShader from './HeroShader';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ivory-200 via-ivory-100 to-ivory-100">
      <HeroShader />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 pb-16 pt-20 text-center sm:px-6 sm:pt-28">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">
          Premium Keyfiyyət • Al Rehab
        </p>
        <h1 className="font-display text-5xl font-semibold leading-tight text-espresso-900 sm:text-7xl">
          Şərqin <span className="gold-text italic">Əsl</span> Qoxusu
        </h1>
        <p className="max-w-xl text-espresso-500 sm:text-lg">
          Al Rehab-ın orijinal ətirləri — indi Bakıda. Qoxunuz sizi xatırlatsın.
        </p>
        <div className="mt-4 grid w-full max-w-md grid-cols-2 gap-2 text-center text-[11px] font-medium uppercase tracking-wider text-espresso-500 sm:text-xs">
          <div className="flex items-center justify-center rounded-xl border border-espresso-900/5 bg-white/60 px-2 py-3 text-center">
            100% Orijinal
          </div>
          <div className="flex items-center justify-center rounded-xl border border-espresso-900/5 bg-white/60 px-2 py-3 text-center">
            Bakı daxili çatdırılma
          </div>
        </div>
      </div>
    </section>
  );
}