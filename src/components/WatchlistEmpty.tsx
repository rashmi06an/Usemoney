'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, TrendingUp, Sparkles, Star } from 'lucide-react';

const SUGGESTIONS = [
  { symbol: "TCS", name: "Tata Consultancy", sector: "IT", change: "+1.2%" },
  { symbol: "NIFTY", name: "Nifty 50 Index", sector: "Index", change: "+0.8%" },
  { symbol: "GOLD", name: "Gold Commodities", sector: "Commodity", change: "-0.2%" },
  { symbol: "HDFCBANK", name: "HDFC Bank", sector: "Banking", change: "+2.1%" },
];

export const WatchlistEmpty: React.FC = () => {
  return (
    <div className="rounded-[2.5rem] glass-darker p-8 border border-border-primary overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <Star size={120} className="text-emerald-accent" />
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto py-12">
        <div className="h-20 w-20 rounded-3xl bg-emerald-accent/10 text-emerald-accent flex items-center justify-center mx-auto mb-6">
          <Star size={40} />
        </div>
        
        <h3 className="text-2xl font-bold text-foreground mb-2">Your Watchlist is Empty</h3>
        <p className="text-muted font-medium mb-8">
          Start tracking stocks you're interested in. AI will analyze them and alert you for buy/sell opportunities.
        </p>

        <div className="relative mb-10">
          <input
            type="text"
            placeholder="Search stocks to add..."
            className="w-full rounded-2xl bg-foreground/5 border border-border-primary py-4 pl-12 pr-5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-accent/50"
          />
          <Search size={20} className="absolute left-4 top-4 text-muted" />
        </div>

        <div className="text-left">
          <h4 className="text-xs font-bold text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
            <Sparkles size={14} className="text-emerald-accent" />
            AI Suggested for you
          </h4>
          
          <div className="grid grid-cols-1 gap-3">
            {SUGGESTIONS.map((stock) => (
              <motion.div
                key={stock.symbol}
                whileHover={{ x: 5 }}
                className="flex items-center justify-between p-4 rounded-2xl bg-foreground/[0.03] border border-border-primary hover:border-emerald-accent/20 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-foreground/10 flex items-center justify-center font-bold text-foreground">
                    {stock.symbol[0]}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{stock.symbol}</p>
                    <p className="text-xs text-muted font-medium">{stock.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-emerald-accent">{stock.change}</span>
                  <button className="h-8 w-8 rounded-lg bg-emerald-accent text-white flex items-center justify-center hover:scale-110 transition-all opacity-0 group-hover:opacity-100">
                    <Plus size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
