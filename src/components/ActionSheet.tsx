'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, TrendingDown, Star, Plus, Share2, BarChart2, Zap, Target, Shield, Info, ChevronRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    name?: string;
    label?: string;
    price?: string;
    value?: string;
    change?: string;
    up?: boolean;
    type?: 'stock' | 'index' | 'stat' | 'setup';
    description?: string;
  } | null;
}

export const ActionSheet: React.FC<ActionSheetProps> = ({ isOpen, onClose, data }) => {
  if (!data) return null;

  const displayName = data.name || data.label || 'Action Hub';
  const displayValue = data.price || data.value || '0.00';
  const isUp = data.up ?? true;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[130] bg-background border-t border-border-primary rounded-t-[3rem] p-8 pb-12 shadow-[0_-20px_80px_rgba(0,0,0,0.5)] xl:max-w-5xl xl:mx-auto"
          >
            {/* Drag Handle */}
            <div className="w-12 h-1.5 bg-foreground/10 rounded-full mx-auto mb-8" />

            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-5">
                <div className="h-16 w-16 rounded-[1.5rem] bg-foreground/[0.03] flex items-center justify-center font-bold text-3xl border border-border-primary shadow-inner">
                  {displayName[0]}
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-foreground tracking-tight">{displayName}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-muted uppercase tracking-[0.2em]">Real-time {data.type || 'Asset'}</span>
                    <div className="h-1 w-1 rounded-full bg-emerald-accent animate-pulse" />
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-3 rounded-full bg-foreground/[0.03] text-muted hover:text-foreground transition-all hover:bg-foreground/[0.06]"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Chart & Price */}
              <div className="lg:col-span-8 space-y-6">
                <div className="p-8 rounded-[2.5rem] bg-foreground/[0.02] border border-border-primary relative overflow-hidden">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <p className="text-xs font-bold text-muted uppercase tracking-widest mb-2">Live Valuation</p>
                      <div className="flex items-baseline gap-4">
                        <span className="text-5xl font-bold text-foreground tracking-tighter">{displayValue}</span>
                        {data.change && (
                          <span className={cn(
                            "text-xl font-bold flex items-center gap-1",
                            isUp ? "text-emerald-accent" : "text-red-500"
                          )}>
                            {isUp ? <TrendingUp size={22} /> : <TrendingDown size={22} />}
                            {data.change}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {['1D', '1W', '1M', '1Y', 'ALL'].map((p) => (
                        <button key={p} className={cn(
                          "px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all",
                          p === '1D' ? "bg-emerald-accent text-white" : "bg-foreground/[0.03] text-muted hover:text-foreground"
                        )}>{p}</button>
                      ))}
                    </div>
                  </div>

                  {/* Mock Chart Visualization */}
                  <div className="h-48 w-full relative flex items-end gap-1 px-2">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${20 + Math.random() * 80}%` }}
                        transition={{ delay: i * 0.01 }}
                        className={cn(
                          "flex-1 rounded-t-sm",
                          isUp ? "bg-emerald-accent/20" : "bg-red-500/20"
                        )}
                      />
                    ))}
                    <div className={cn(
                      "absolute inset-0 border-b-2",
                      isUp ? "border-emerald-accent/30" : "border-red-500/30"
                    )} />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-foreground/[0.02] border border-border-primary">
                    <p className="text-[10px] font-bold text-muted uppercase mb-1">Open</p>
                    <p className="text-sm font-bold text-foreground">24,010.50</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-foreground/[0.02] border border-border-primary">
                    <p className="text-[10px] font-bold text-muted uppercase mb-1">High</p>
                    <p className="text-sm font-bold text-emerald-accent">24,250.20</p>
                  </div>
                  <div className={cn(
                    "p-5 rounded-2xl bg-foreground/[0.02] border border-border-primary",
                    !isUp && "border-red-500/20 bg-red-500/[0.02]"
                  )}>
                    <p className="text-[10px] font-bold text-muted uppercase mb-1">Low</p>
                    <p className="text-sm font-bold text-red-500">23,980.15</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-foreground/[0.02] border border-border-primary">
                    <p className="text-[10px] font-bold text-muted uppercase mb-1">Volume</p>
                    <p className="text-sm font-bold text-foreground">2.4M</p>
                  </div>
                </div>
              </div>

              {/* Right Column: AI Insights & Actions */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-8 rounded-[2.5rem] bg-indigo-accent/5 border border-indigo-accent/20 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Zap size={60} className="text-indigo-accent" />
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-8 w-8 rounded-xl bg-indigo-accent/10 flex items-center justify-center text-indigo-accent">
                      <Zap size={16} fill="currentColor" />
                    </div>
                    <span className="text-xs font-bold text-indigo-accent uppercase tracking-widest">AI Context</span>
                  </div>
                  <p className="text-sm font-medium text-foreground/90 leading-relaxed mb-6">
                    {data.description || `The technical outlook for ${displayName} remains robust. We've detected a strong resistance level at ${displayValue}. RSI is at 58, indicating healthy consolidation.`}
                  </p>
                  <button className="w-full py-3 rounded-xl bg-indigo-accent text-white text-xs font-bold hover:opacity-90 transition-all shadow-lg shadow-indigo-accent/20">
                    Ask StockSage for Deep Dive
                  </button>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] px-2 mb-2">Primary Actions</p>
                  <button className="w-full flex items-center justify-between p-5 rounded-2xl bg-foreground/[0.03] border border-border-primary hover:bg-foreground/[0.06] transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-emerald-accent/10 text-emerald-accent flex items-center justify-center">
                        <Plus size={20} />
                      </div>
                      <span className="font-bold text-sm text-foreground">Add to Watchlist</span>
                    </div>
                    <ChevronRight size={18} className="text-muted group-hover:text-foreground transition-transform" />
                  </button>
                  <button className="w-full flex items-center justify-between p-5 rounded-2xl bg-foreground/[0.03] border border-border-primary hover:bg-foreground/[0.06] transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-indigo-accent/10 text-indigo-accent flex items-center justify-center">
                        <BarChart2 size={20} />
                      </div>
                      <span className="font-bold text-sm text-foreground">Compare Performance</span>
                    </div>
                    <ChevronRight size={18} className="text-muted group-hover:text-foreground transition-transform" />
                  </button>
                  <button className="w-full flex items-center justify-between p-5 rounded-2xl bg-foreground/[0.03] border border-border-primary hover:bg-foreground/[0.06] transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-slate-400/10 text-slate-400 flex items-center justify-center">
                        <Share2 size={20} />
                      </div>
                      <span className="font-bold text-sm text-foreground">Share Analysis</span>
                    </div>
                    <ChevronRight size={18} className="text-muted group-hover:text-foreground transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
