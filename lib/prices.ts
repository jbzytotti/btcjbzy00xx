export interface Ticker {
  symbol: string;
  name: string;
  price: number | null;
  change: number;
  changePercent: number;
}

export const TICKER_DEFS = [
  { symbol: 'BTC/USD', name: 'Bitcoin', id: 'bitcoin', pair: 'BTCUSDT' },
  { symbol: 'ETH/USD', name: 'Ethereum', id: 'ethereum', pair: 'ETHUSDT' },
  { symbol: 'SOL/USD', name: 'Solana', id: 'solana', pair: 'SOLUSDT' },
  { symbol: 'XRP/USD', name: 'XRP', id: 'ripple', pair: 'XRPUSDT' },
  { symbol: 'BNB/USD', name: 'BNB', id: 'binancecoin', pair: 'BNBUSDT' },
  { symbol: 'DOGE/USD', name: 'Dogecoin', id: 'dogecoin', pair: 'DOGEUSDT' },
] as const;

type Def = (typeof TICKER_DEFS)[number];

function empty(defs: readonly Def[]): Ticker[] {
  return defs.map(def => ({
    symbol: def.symbol,
    name: def.name,
    price: null,
    change: 0,
    changePercent: 0,
  }));
}

async function fromCoinGecko(defs: readonly Def[]): Promise<Ticker[] | null> {
  try {
    const ids = defs.map(d => d.id).join(',');
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
    );
    if (!res.ok) return null;
    const data: Record<string, { usd?: number; usd_24h_change?: number }> = await res.json();
    return defs.map(def => {
      const row = data[def.id];
      const pct = Number(row?.usd_24h_change ?? 0);
      const price = row?.usd ?? null;
      return {
        symbol: def.symbol,
        name: def.name,
        price,
        change: price != null ? (pct / 100) * price : 0,
        changePercent: price != null ? pct : 0,
      };
    });
  } catch {
    return null;
  }
}

async function fromBinance(defs: readonly Def[]): Promise<Ticker[] | null> {
  try {
    const symbols = JSON.stringify(defs.map(d => d.pair));
    const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=${encodeURIComponent(symbols)}`);
    if (!res.ok) return null;
    const rows: Array<{ symbol?: string; lastPrice?: string; priceChangePercent?: string }> = await res.json();
    const map = new Map(rows.filter(r => r.symbol).map(r => [r.symbol, r]));
    return defs.map(def => {
      const r = map.get(def.pair);
      const price = r?.lastPrice != null ? parseFloat(r.lastPrice) : NaN;
      const pct = r?.priceChangePercent != null ? parseFloat(r.priceChangePercent) : NaN;
      if (!Number.isFinite(price) || price <= 0) {
        return { symbol: def.symbol, name: def.name, price: null as number | null, change: 0, changePercent: 0 };
      }
      const safePct = Number.isFinite(pct) ? pct : 0;
      return {
        symbol: def.symbol,
        name: def.name,
        price,
        change: (safePct / 100) * price,
        changePercent: safePct,
      };
    });
  } catch {
    return null;
  }
}

export async function fetchLivePrices(): Promise<Ticker[]> {
  const defs = TICKER_DEFS;
  const data = (await fromCoinGecko(defs)) ?? (await fromBinance(defs));
  return data ?? empty(defs);
}