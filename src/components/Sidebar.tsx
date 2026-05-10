'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Wallet, 
  TrendingUp, 
  Search, 
  Star, 
  Settings, 
  LogOut,
  Target,
  Brain,
  Sparkles,
  Plus
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'chat', label: 'Talk to StockSage', icon: Sparkles },
  { id: 'portfolio', label: 'Portfolio', icon: Wallet },
  { id: 'research', label: 'AI Research', icon: Brain },
  { id: 'markets', label: 'Markets', icon: TrendingUp },
  { id: 'watchlist', label: 'Watchlist', icon: Star },
  { id: 'goals', label: 'FIRE Goals', icon: Target },
];

export const Sidebar: React.FC<{ activeId: string; onSelect: (id: string) => void }> = ({ activeId, onSelect }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Restore scroll position
  useEffect(() => {
    const savedScroll = sessionStorage.getItem('sidebar-scroll');
    if (savedScroll && scrollRef.current) {
      scrollRef.current.scrollTop = parseInt(savedScroll);
    }
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    sessionStorage.setItem('sidebar-scroll', e.currentTarget.scrollTop.toString());
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 glass border-r border-white/5 z-40 hidden xl:flex flex-col">
      <div className="p-8 pb-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 bg-emerald-500 rounded-xl flex items-center justify-center font-bold text-black italic text-xl shadow-lg shadow-emerald-500/20">
            U
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">UseMoney <span className="text-emerald-accent">AI</span></span>
        </div>

        <button 
          onClick={() => onSelect('chat')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-emerald-accent text-black font-bold hover:bg-emerald-accent/80 transition-all active:scale-95 shadow-lg shadow-emerald-accent/20 mb-6"
        >
          <Plus size={20} />
          <span>New chat</span>
        </button>
      </div>

      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 space-y-2 no-scrollbar pb-10"
      >
        <div className="px-4 mb-2 text-[10px] font-bold text-muted uppercase tracking-[0.2em]">Menu</div>
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group relative",
              activeId === item.id 
                ? "bg-emerald-accent/10 text-emerald-accent" 
                : "text-muted hover:text-foreground hover:bg-foreground/5"
            )}
          >
            {activeId === item.id && (
              <motion.div
                layoutId="active-indicator"
                className="absolute left-0 w-1 h-6 bg-emerald-accent rounded-r-full"
              />
            )}
            <item.icon size={20} className={cn(
              "transition-colors",
              activeId === item.id ? "text-emerald-accent" : "text-muted group-hover:text-foreground"
            )} />
            <span className="font-bold text-sm tracking-tight">{item.label}</span>
          </button>
        ))}

        <div className="px-4 mt-8 mb-2 text-[10px] font-bold text-muted uppercase tracking-[0.2em]">Settings</div>
        <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-muted hover:text-foreground hover:bg-foreground/5 transition-all">
          <Settings size={20} />
          <span className="font-bold text-sm tracking-tight">Preferences</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all">
          <LogOut size={20} />
          <span className="font-bold text-sm tracking-tight">Sign Out</span>
        </button>
      </div>

      <div className="p-6">
        <div className="p-4 rounded-2xl bg-indigo-accent/10 border border-indigo-accent/20">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-indigo-accent" />
            <span className="text-[10px] font-bold text-foreground uppercase tracking-wider">Pro Intelligence</span>
          </div>
          <p className="text-[10px] text-muted font-medium mb-3">Upgrade to unlock Portfolio Roast and Factor Analysis.</p>
          <button className="w-full py-2 bg-indigo-accent hover:bg-indigo-accent/80 text-white rounded-lg text-[10px] font-bold transition-all shadow-lg shadow-indigo-accent/20">
            Upgrade Now
          </button>
        </div>
      </div>

    </aside>
  );
};
