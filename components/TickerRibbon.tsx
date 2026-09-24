'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { fetchLivePrices, Ticker } from '@/lib/prices';

export default function TickerRibbon() {
  const [tickers, setTickers] = useState<Ticker[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const data = await fetchLivePrices();
      if (!cancelled && data.length) setTickers(data);
    }
    load();
    const interval = setInterval(load, 60000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-[#080d1a] border-b border-white/5 overflow-hidden h-10 flex items-center select-none text-xs">
      <div className="bg-amber-500 text-[#060a13] px-3 py-1.5 font-extrabold tracking-wider uppercase flex items-center gap-1.5 h-full z-10 font-mono shadow-[4px_0_16px_rgba(245,158,11,0.15)]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#060a13] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#060a13]"></span>
        </span>
        Live
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 py-2">
          {[...tickers, ...tickers].map((ticker, idx) => {
            const isUp = (ticker.changePercent ?? 0) >= 0;
            return (
              <div key={idx} className="inline-flex items-center gap-2 font-mono border-r border-white/5 pr-8">
                <span className="text-gray-500 font-semibold">{ticker.symbol}</span>
                {ticker.price != null ? (
                  <span className="text-gray-200 font-medium">
                    ${ticker.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                ) : (
                  <span className="text-gray-600 font-medium">N/A</span>
                )}
                {ticker.price != null ? (
                  <span className={`flex items-center gap-0.5 font-bold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {isUp ? '+' : ''}{ticker.changePercent}%
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}