'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, TrendingDown, Star, Plus, Share2, BarChart2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    name: string;
    price: string;
    change: string;
    up: boolean;
  } | null;
}

export const ActionSheet: React.FC<ActionSheetProps> = ({ isOpen, onClose, data }) => {
  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-[70] bg-background border-t border-border-primary rounded-t-[2.5rem] p-8 pb-12 shadow-2xl xl:max-w-4xl xl:mx-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-foreground/5 flex items-center justify-center font-bold text-2xl border border-border-primary">
                  {data.name[0]}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{data.name}</h3>
                  <p className="text-sm font-bold text-muted uppercase tracking-widest">Global Market Asset</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full bg-foreground/5 text-muted hover:text-foreground transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="p-6 rounded-3xl bg-foreground/[0.03] border border-border-primary">
                <p className="text-xs font-bold text-muted uppercase tracking-widest mb-2">Live Price</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-foreground">{data.price}</span>
                  <span className={cn(
                    "text-lg font-bold flex items-center gap-1",
                    data.up ? "text-emerald-accent" : "text-red-500"
                  )}>
                    {data.up ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                    {data.change}
                  </span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-indigo-accent/5 border border-indigo-accent/20">
                <p className="text-xs font-bold text-indigo-accent uppercase tracking-widest mb-2">AI Insight</p>
                <p className="text-sm font-medium text-foreground leading-relaxed">
                  Strong momentum detected. Relative strength index (RSI) is at 62, suggesting continued upward trend. AI recommends <span className="text-indigo-accent font-bold underline">Holding</span>.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-foreground/[0.03] hover:bg-foreground/[0.05] transition-all group">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                   <Star size={20} className="text-amber-500" />
                </div>
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Watchlist</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-foreground/[0.03] hover:bg-foreground/[0.05] transition-all group">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                   <BarChart2 size={20} className="text-indigo-accent" />
                </div>
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Analyse</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-foreground/[0.03] hover:bg-foreground/[0.05] transition-all group">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                   <Plus size={20} className="text-emerald-accent" />
                </div>
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Buy</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-foreground/[0.03] hover:bg-foreground/[0.05] transition-all group">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                   <Share2 size={20} className="text-slate-400" />
                </div>
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Share</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
