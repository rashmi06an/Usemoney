'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Sparkles, ArrowRight, ArrowUpRight, BarChart3, Globe, Zap, Search } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MarketViewProps {
  isBeginnerMode: boolean;
}

export const MarketView: React.FC<MarketViewProps> = ({ isBeginnerMode }) => {
  const indices = [
    { name: 'NIFTY 50', price: '24,192.40', change: '+1.4%', up: true, sentiment: 'Bullish' },
    { name: 'SENSEX', price: '79,402.11', change: '+0.9%', up: true, sentiment: 'Neutral' },
    { name: 'BANK NIFTY', price: '52,310.45', change: '-0.2%', up: false, sentiment: 'Bearish' },
    { name: 'NIFTY IT', price: '29,394.00', change: '+1.21%', up: true, sentiment: 'Bullish' },
  ];

  const movers = [
    { name: 'Reliance', price: '₹2,910.20', change: '+2.4%', up: true, reason: 'Strong Q3 results' },
    { name: 'TCS', price: '₹3,840.50', change: '-1.1%', up: false, reason: 'Global IT slowdown' },
    { name: 'HDFC Bank', price: '₹1,640.15', change: '+0.7%', up: true, reason: 'FII buying interest' },
  ];

  if (isBeginnerMode) {
    return (
      <div className="space-y-10 pb-20">
        {/* AI Market Explanation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-[2.5rem] bg-indigo-accent/5 border border-indigo-accent/20 relative overflow-hidden"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-10 w-10 rounded-2xl bg-indigo-accent/10 flex items-center justify-center text-indigo-accent">
              <Sparkles size={20} fill="currentColor" />
            </div>
            <h3 className="text-xl font-bold text-foreground">AI Market Pulse</h3>
          </div>
          <p className="text-lg text-muted font-medium leading-relaxed max-w-4xl">
            Markets are <span className="text-emerald-accent font-bold italic">Green</span> today. 
            The Nifty 50 is being driven by strong performance in the <span className="text-foreground font-bold">Banking sector</span>. 
            AI detects a healthy recovery trend from yesterday's dip.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Indices */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Globe size={20} className="text-muted" />
                Key Summary
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {indices.map((index, i) => (
                <motion.div 
                  key={index.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-[2.5rem] glass-darker border border-border-primary hover:bg-foreground/[0.04] transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-1">{index.name}</p>
                      <h4 className="text-3xl font-bold text-foreground tracking-tight">{index.price}</h4>
                    </div>
                    <div className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                      index.up ? "bg-emerald-accent/10 text-emerald-accent" : "bg-red-500/10 text-red-500"
                    )}>
                      {index.sentiment}
                    </div>
                  </div>
                  <div className={cn(
                    "flex items-center gap-2 text-sm font-bold",
                    index.up ? "text-emerald-accent" : "text-red-500"
                  )}>
                    {index.up ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    {index.change}
                    <span className="text-muted font-medium ml-1">Today</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Top Movers */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Zap size={20} className="text-amber-500" />
                What Moved?
              </h3>
            </div>
            
            <div className="space-y-4">
              {movers.map((mover, i) => (
                <div key={mover.name} className="p-6 rounded-3xl bg-foreground/[0.02] border border-border-primary">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-foreground">{mover.name}</span>
                    <span className={cn("text-xs font-bold", mover.up ? "text-emerald-accent" : "text-red-500")}>
                      {mover.change}
                    </span>
                  </div>
                  <p className="text-xs text-muted font-medium mb-1 flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-indigo-accent" />
                    AI Reasoning:
                  </p>
                  <p className="text-xs font-bold text-foreground/80">{mover.reason}</p>
                </div>
              ))}
              <button className="w-full py-4 rounded-2xl bg-foreground/[0.03] text-muted text-xs font-bold hover:bg-foreground/[0.05] transition-all border border-dashed border-border-primary">
                View More Movers
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Advanced Mode (Heatmap Placeholder)
  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground tracking-tight">Market Intelligence</h2>
        <div className="flex gap-4">
          <button className="px-4 py-2 rounded-xl bg-foreground/[0.03] border border-border-primary text-xs font-bold text-muted hover:text-foreground transition-all">
             Export Data
          </button>
          <button className="px-4 py-2 rounded-xl bg-emerald-accent text-white text-xs font-bold shadow-lg shadow-emerald-accent/20">
             Open Terminal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-9">
          <div className="rounded-[2.5rem] glass-darker aspect-[16/9] border border-border-primary flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <BarChart3 size={400} className="absolute -bottom-20 -right-20" />
            </div>
            <BarChart3 size={48} className="text-muted mb-4 opacity-20" />
            <h3 className="text-xl font-bold text-foreground mb-2">Market Heatmap</h3>
            <p className="text-muted font-medium">Real-time sector performance grid loading...</p>
            
            {/* Mock Heatmap Grid Overlay */}
            <div className="absolute bottom-10 left-10 right-10 grid grid-cols-6 gap-2">
               {Array.from({ length: 18 }).map((_, i) => (
                 <div key={i} className={cn(
                   "h-8 rounded-lg",
                   i % 3 === 0 ? "bg-emerald-accent/20" : i % 2 === 0 ? "bg-red-500/20" : "bg-foreground/10"
                 )} />
               ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-3 space-y-6">
           <div className="p-6 rounded-3xl bg-foreground/[0.02] border border-border-primary">
              <h4 className="text-xs font-bold text-muted uppercase mb-4 tracking-widest">Global Correlation</h4>
              <div className="space-y-4">
                 {['S&P 500', 'NASDAQ', 'DAX', 'NIKKEI'].map(market => (
                   <div key={market} className="flex justify-between items-center">
                      <span className="text-sm font-bold text-foreground/80">{market}</span>
                      <span className="text-xs font-bold text-emerald-accent">+0.82</span>
                   </div>
                 ))}
              </div>
           </div>
           
           <div className="p-6 rounded-3xl bg-foreground/[0.02] border border-border-primary">
              <h4 className="text-xs font-bold text-muted uppercase mb-4 tracking-widest">VIX / Volatility</h4>
              <div className="flex items-center gap-4">
                 <span className="text-2xl font-bold text-foreground">12.42</span>
                 <span className="text-xs font-bold text-emerald-accent">Low Risk</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
