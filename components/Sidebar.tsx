'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Calculator } from 'lucide-react';
import Link from 'next/link';
import { Post } from '@/lib/posts';
import { fetchLivePrices, Ticker } from '@/lib/prices';

interface SidebarProps {
  posts: Post[];
}

function formatPrice(price: number | null | undefined): string {
  if (price == null) return 'N/A';
  return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function Sidebar({ posts }: SidebarProps) {
  const [tickers, setTickers] = useState<Ticker[]>([]);

  const [calcAmount, setCalcAmount] = useState('1000');
  const [calcFrom, setCalcFrom] = useState('USD');
  const [calcTo, setCalcTo] = useState('BTC');
  const [calcResult, setCalcResult] = useState<number | null>(null);

  const trendingPosts = [...posts].sort((a, b) => b.title.length - a.title.length).slice(0, 4);

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

  const priceOf = (currency: string): number | null => {
    if (currency === 'USD') return 1;
    const t = tickers.find(x => x.symbol === `${currency}/USD`);
    return t?.price ?? null;
  };

  useEffect(() => {
    const amount = parseFloat(calcAmount) || 0;
    const rateInUSD = priceOf(calcFrom);
    const targetRateInUSD = priceOf(calcTo);
    if (rateInUSD == null || targetRateInUSD == null) {
      setCalcResult(null);
      return;
    }
    setCalcResult(Number(((amount * rateInUSD) / targetRateInUSD).toFixed(6)));
  }, [calcAmount, calcFrom, calcTo, tickers]);

  return (
    <aside className="space-y-4 sm:space-y-6">
      <div className="bg-[#0a1020] border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-xl space-y-3 sm:space-y-4">
        <h3 className="text-[10px] sm:text-xs font-extrabold uppercase text-gray-500 tracking-wider font-mono border-b border-white/5 pb-2 sm:pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 select-none">
          <span>Watchlist</span>
          <span className="text-[8px] sm:text-[9px] text-amber-400 bg-amber-400/5 px-1.5 py-0.5 rounded border border-amber-400/10 tracking-widest font-bold self-start sm:self-auto">LIVE</span>
        </h3>
        <div className="divide-y divide-white/5 font-mono">
          {tickers.map((ticker) => {
            const isUp = (ticker.changePercent ?? 0) >= 0;
            return (
              <div key={ticker.symbol} className="py-2 sm:py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 first:pt-0 last:pb-0">
                <div>
                  <div className="text-[10px] sm:text-xs font-extrabold text-white truncate">{ticker.symbol}</div>
                  <div className="hidden sm:block text-[9px] text-gray-600 truncate">{ticker.name}</div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-[10px] sm:text-xs font-bold text-gray-200">
                    {formatPrice(ticker.price)}
                  </div>
                  {ticker.price != null ? (
                    <div className={`text-[9px] sm:text-[10px] font-bold flex items-center sm:justify-end gap-0.5 ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isUp ? '+' : ''}{ticker.changePercent}%
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-[#0a1020] border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-xl space-y-3 sm:space-y-4">
        <h3 className="text-[10px] sm:text-xs font-extrabold uppercase text-gray-500 tracking-wider font-mono border-b border-white/5 pb-2 sm:pb-3 flex items-center gap-1.5 select-none">
          <Calculator className="h-3.5 w-3.5 text-amber-400 shrink-0" /> <span className="truncate">Convert</span>
        </h3>
        <div className="space-y-2 sm:space-y-3 font-mono text-[10px] sm:text-xs">
          <div className="bg-white/[0.03] border border-white/5 rounded-lg p-1.5 sm:p-2 flex items-center justify-between gap-1">
            <input
              type="number"
              value={calcAmount}
              onChange={(e) => setCalcAmount(e.target.value)}
              className="bg-transparent text-white font-bold w-1/2 focus:outline-none min-w-0"
              placeholder="0.00"
            />
            <select value={calcFrom} onChange={(e) => setCalcFrom(e.target.value)} className="bg-transparent text-gray-500 font-bold focus:outline-none border-l border-white/5 pl-1 sm:pl-2 cursor-pointer text-[10px] sm:text-xs shrink-0">
              <option value="USD">USD</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="SOL">SOL</option>
              <option value="XRP">XRP</option>
              <option value="BNB">BNB</option>
              <option value="DOGE">DOGE</option>
            </select>
          </div>
          <div className="bg-white/[0.03] border border-white/5 rounded-lg p-1.5 sm:p-2 flex items-center justify-between gap-1">
            <div className="text-amber-400 font-bold select-all overflow-x-auto min-w-0 flex-1">
              {calcResult != null ? calcResult : 'N/A'}
            </div>
            <select value={calcTo} onChange={(e) => setCalcTo(e.target.value)} className="bg-transparent text-gray-500 font-bold focus:outline-none border-l border-white/5 pl-1 sm:pl-2 cursor-pointer text-[10px] sm:text-xs shrink-0">
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="SOL">SOL</option>
              <option value="XRP">XRP</option>
              <option value="BNB">BNB</option>
              <option value="DOGE">DOGE</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <div className="text-[8px] sm:text-[10px] text-gray-600 text-center select-none pt-0.5">
            Live rates via CoinGecko
          </div>
        </div>
      </div>

      <div className="bg-[#0a1020] border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-xl space-y-3 sm:space-y-4">
        <h3 className="text-[10px] sm:text-xs font-extrabold uppercase text-gray-500 tracking-wider font-mono border-b border-white/5 pb-2 sm:pb-3 flex items-center gap-1.5">
          <TrendingUp className="h-3.5 w-3.5 text-amber-400 shrink-0" /> <span>Trending</span>
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {trendingPosts.map((p, idx) => (
            <Link
              key={p.slug}
              href={`/posts/${p.slug}`}
              className="flex gap-2 sm:gap-3 items-center group min-w-0"
            >
              <div className="text-sm sm:text-lg font-bold font-mono text-gray-700 group-hover:text-amber-400 transition-colors w-5 sm:w-6 text-center select-none shrink-0">
                0{idx + 1}
              </div>
              <div className="flex-1 space-y-0.5 sm:space-y-1 min-w-0">
                <span className="text-[8px] sm:text-[9px] font-extrabold font-mono tracking-wider uppercase text-amber-400/70">
                  {p.category}
                </span>
                <h4 className="text-[10px] sm:text-xs font-bold text-gray-300 group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                  {p.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}