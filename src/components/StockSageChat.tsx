'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Plus, 
  Search, 
  MessageSquare, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight,
  Zap,
  Target,
  Ghost,
  PieChart,
  Command,
  AtSign,
  Send,
  MoreHorizontal
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CHAT_HISTORY = [
  { id: '1', title: 'NIPPON INDIA SILVER ETF LATE..', date: 'Today' },
  { id: '2', title: 'Research', date: 'Today' },
  { id: '3', title: "How's my portfolio doing this q..", date: 'Today' },
  { id: '4', title: "Market overview — how are Nif..", date: 'Yesterday' },
  { id: '5', title: 'Research a stock', date: 'Last Week' },
];

const MARKET_INDICES = [
  { name: 'NIFTY 50', price: '24,176', change: '-0.62%', up: false },
  { name: 'SENSEX', price: '77,328', change: '-0.66%', up: false },
  { name: 'NIFTY BANK', price: '55,311', change: '-1.31%', up: false },
  { name: 'NIFTY IT', price: '29,394', change: '+1.21%', up: true },
];

import { ActionSheet } from './ActionSheet';

interface StockSageChatProps {
  isBeginnerMode: boolean;
}

export const StockSageChat: React.FC<StockSageChatProps> = ({ isBeginnerMode }) => {
  const [input, setInput] = useState('');
  const [activeChatId, setActiveChatId] = useState('1');
  const [selectedIndex, setSelectedIndex] = useState<any>(null);

  return (
    <div className="flex h-full w-full overflow-hidden bg-transparent">
      <ActionSheet 
        isOpen={!!selectedIndex} 
        onClose={() => setSelectedIndex(null)} 
        data={selectedIndex} 
      />
      
      {/* Sub-Sidebar: Chat History - Hidden for beginners */}
      {!isBeginnerMode && (
        <div className="w-72 border-r border-white/5 flex flex-col bg-[#050913]/40 backdrop-blur-xl">
          <div className="p-6">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-bold hover:bg-emerald-500/20 transition-all text-xs">
              <Plus size={16} />
              <span>New Chat</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 space-y-6 no-scrollbar pb-10">
            <div className="space-y-1">
              <p className="px-4 text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-2">Today</p>
              {CHAT_HISTORY.filter(c => c.date === 'Today').map(chat => (
                <button
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs transition-all group",
                    activeChatId === chat.id ? "bg-white/5 text-white" : "text-slate-500 hover:text-white hover:bg-white/5"
                  )}
                >
                  <MessageSquare size={14} className={activeChatId === chat.id ? "text-emerald-500" : "text-slate-600"} />
                  <span className="truncate flex-1 font-semibold">{chat.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative p-6 overflow-hidden bg-[radial-gradient(circle_at_50%_-20%,rgba(16,185,129,0.05),transparent)]">
        
        {/* Hero Section - Minimized */}
        <div className="text-center mb-8 relative pt-4">
          <h1 className="text-4xl font-bold text-foreground tracking-tight mb-2">
            Good evening, <span className="italic text-emerald-accent">Rashmi</span>
          </h1>
          <p className="text-lg text-muted font-medium">
            What are we <span className="italic text-emerald-accent">researching</span> today?
          </p>
        </div>

        {/* Market Grid - Minimized */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl mb-8">
          {MARKET_INDICES.map((index) => (
            <div 
              key={index.name} 
              onClick={() => setSelectedIndex(index)}
              className="p-4 rounded-2xl bg-foreground/[0.03] border border-border-primary hover:bg-foreground/[0.06] transition-all cursor-pointer group shadow-sm active:scale-95"
            >
              <p className="text-[9px] font-bold text-muted uppercase tracking-widest mb-1">{index.name}</p>
              <h4 className="text-lg font-bold text-foreground">{index.price}</h4>
              <p className={cn(
                "text-[10px] font-bold flex items-center gap-1",
                index.up ? "text-emerald-500" : "text-red-500"
              )}>
                {index.up ? <ArrowUpRight size={10} /> : <TrendingDown size={10} />}
                {index.change}
              </p>
            </div>
          ))}
        </div>

        {/* Immersive Input Box - Minimized */}
        <div className="w-full max-w-3xl">
          <div className="rounded-3xl bg-background border border-border-primary p-1 shadow-2xl focus-within:border-emerald-accent/40 transition-all">
            <div className="px-6 pt-4 pb-1 flex justify-between items-center">
              <p className="text-xs text-muted font-bold uppercase tracking-widest opacity-60">Ask StockSage anything...</p>
              <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-emerald-accent/10 border border-emerald-accent/20 text-emerald-accent text-[9px] font-bold">
                <Zap size={8} fill="currentColor" />
                195
              </div>
            </div>
            
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-transparent border-none focus:outline-none px-6 py-2 text-sm text-foreground placeholder:text-muted/30 resize-none h-20 font-medium"
              placeholder="Suggest some undervalued tech stocks..."
            />

            <div className="px-4 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-xl bg-foreground/[0.03] hover:bg-foreground/[0.06] text-muted transition-all">
                  <Plus size={16} />
                </button>
                <div className="h-4 w-[1px] bg-border-primary mx-1" />
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-foreground/[0.03] text-muted text-[10px] font-bold">
                  <AtSign size={12} />
                  mention
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-foreground/[0.03] text-muted text-[10px] font-bold">
                  <Command size={12} />
                  command
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-foreground/[0.03] border border-border-primary text-muted text-[10px] font-bold">
                  <div className="h-4 w-4 rounded-lg bg-indigo-accent flex items-center justify-center text-[8px] text-white font-bold">G</div>
                  2.5 Pro
                </button>
                <button className={cn(
                  "h-10 w-10 rounded-xl flex items-center justify-center transition-all",
                  input.trim() ? "bg-emerald-accent text-white shadow-lg shadow-emerald-accent/20" : "bg-foreground/[0.03] text-muted/30 cursor-not-allowed"
                )}>
                  <Send size={18} fill={input.trim() ? "currentColor" : "none"} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap justify-center gap-8 text-[9px] font-bold text-muted uppercase tracking-widest">
            <span className="flex items-center gap-2">/ commands</span>
            <span className="flex items-center gap-2">@ stocks</span>
            <span className="flex items-center gap-2">⏎ send</span>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2 pb-4">
            {[
              { label: 'Market pulse', icon: TrendingUp },
              { label: "How's my portfolio?", icon: PieChart },
              { label: 'Roast my holdings', icon: Ghost },
              { label: 'Research a stock', icon: Search },
              { label: 'FIRE status', icon: Target },
            ].map((pill) => (
              <button 
                key={pill.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/[0.03] border border-border-primary text-[10px] font-bold text-muted hover:text-emerald-accent hover:border-emerald-accent/30 transition-all group"
              >
                <pill.icon size={12} className="opacity-70 group-hover:opacity-100" />
                {pill.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
