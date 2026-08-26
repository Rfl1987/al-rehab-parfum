import { useEffect, useState } from 'react';

interface LogItem {
  type: 'error' | 'warn';
  msg: string;
  time: string;
}

export default function DevErrorConsole() {
  const [items, setItems] = useState<LogItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const push = (type: LogItem['type'], msg: string) =>
      setItems((s) => [...s.slice(-49), { type, msg, time: new Date().toLocaleTimeString() }]);

    const onError = (e: ErrorEvent) =>
      push('error', `${e.message}${e.filename ? ` @ ${e.filename}:${e.lineno}` : ''}`);
    const onRej = (e: PromiseRejectionEvent) =>
      push('error', `Unhandled rejection: ${String(e.reason)}`);
    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRej);

    const origErr = console.error;
    const origWarn = console.warn;
    console.error = (...args: unknown[]) => { push('error', args.map(String).join(' ')); origErr(...args); };
    console.warn = (...args: unknown[]) => { push('warn', args.map(String).join(' ')); origWarn(...args); };

    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRej);
      console.error = origErr;
      console.warn = origWarn;
    };
  }, []);

  const errors = items.filter((i) => i.type === 'error').length;

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Dev console"
        className={`fixed bottom-10 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full text-xl shadow-lg transition-all ${
          errors > 0 ? 'bg-red-500 text-white' : 'bg-espresso-900 text-ivory-100'
        }`}
      >
        {errors > 0 ? '😵' : '🐞'}
        {errors > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-bold text-red-600">
            {errors}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-x-4 bottom-24 z-50 max-h-[50vh] overflow-auto rounded-2xl border border-espresso-900/10 bg-white/95 p-4 shadow-card-hover backdrop-blur-xl">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-espresso-700">Dev Console</p>
            <button onClick={() => setItems([])} className="text-xs font-semibold text-red-500">Təmizlə</button>
          </div>
          {items.length === 0 ? (
            <p className="text-sm text-espresso-500">Xəta yoxdur ✅</p>
          ) : (
            <ul className="space-y-2">
              {items.map((it, i) => (
                <li
                  key={i}
                  className={`rounded-lg px-3 py-2 text-xs ${
                    it.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  <span className="font-mono opacity-60">{it.time}</span> {it.msg}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}