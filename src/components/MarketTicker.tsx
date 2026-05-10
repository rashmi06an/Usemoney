'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const TICKER_DATA = [
  { symbol: 'NIFTY 50', price: '24,192.40', change: '+1.4%', up: true },
  { symbol: 'SENSEX', price: '79,402.11', change: '+0.9%', up: true },
  { symbol: 'BANK NIFTY', price: '52,310.45', change: '-0.2%', up: false },
  { symbol: 'NASDAQ', price: '18,211.50', change: '+2.1%', up: true },
  { symbol: 'GOLD', price: '72,400.00', change: '+0.4%', up: true },
  { symbol: 'RELIANCE', price: '2,910.20', change: '-1.1%', up: false },
  { symbol: 'TCS', price: '3,840.50', change: '+0.7%', up: true },
  { symbol: 'HDFCBANK', price: '1,640.15', change: '+1.8%', up: true },
];

export const MarketTicker: React.FC = () => {
  return (
    <div className="w-full bg-white/[0.02] border-b border-white/5 py-2 overflow-hidden whitespace-nowrap flex items-center group">
      <div className="flex gap-12 items-center animate-ticker group-hover:[animation-play-state:paused]">
        {[...TICKER_DATA, ...TICKER_DATA].map((item, i) => (
          <div key={i} className="flex items-center gap-2 px-2 hover:bg-foreground/5 rounded-lg transition-colors cursor-pointer">
            <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{item.symbol}</span>
            <span className="text-xs font-bold text-foreground font-mono">{item.price}</span>
            <span className={item.up ? "text-emerald-accent text-[10px] font-bold flex items-center" : "text-red-500 text-[10px] font-bold flex items-center"}>
              {item.up ? <TrendingUp size={10} className="mr-1" /> : <TrendingDown size={10} className="mr-1" />}
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
