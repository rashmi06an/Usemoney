'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowUpRight, Shield, Zap, Info, ChevronRight, BarChart3, LineChart } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { ActionSheet } from './ActionSheet';

interface DashboardLayoutProps {
  isBeginnerMode: boolean;
  children?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ isBeginnerMode, children }) => {
  const [selectedStock, setSelectedStock] = React.useState<any>(null);
  
  const stats = [
    { label: 'Invested', value: '$84,200', icon: BarChart3, color: 'text-indigo-accent' },
    { label: 'Returns', value: '+$40,392', icon: Zap, color: 'text-emerald-accent' },
    { label: 'Safety Score', value: '84/100', icon: Shield, color: 'text-amber-500' },
    { label: 'FIRE Progress', value: '12%', icon: LineChart, color: 'text-purple-500' },
  ];

  const holdings = [
    { name: 'Nifty 50', price: '$24,192.40', change: '+1.4%', up: true },
    { name: 'Gold', price: '$24,192.40', change: '+1.4%', up: true },
    { name: 'US Tech', price: '$24,192.40', change: '+1.4%', up: true },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content Area */}
      <div className="lg:col-span-2 space-y-8">
        {/* Total Value Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setSelectedStock({ name: 'Net Worth', value: '$124,592.30', change: '+2.1%', up: true, type: 'stat' })}
          className="rounded-[2.5rem] glass-darker p-10 relative overflow-hidden cursor-pointer group hover:bg-foreground/[0.04] transition-all"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp size={120} />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">Total Portfolio Value</span>
              <div className="px-2 py-0.5 rounded-md bg-emerald-accent/10 text-emerald-accent text-[10px] font-bold">
                +2.1% Today
              </div>
            </div>
            <h2 className="text-5xl font-bold text-foreground tracking-tight mb-4">$124,592.30</h2>
            <p className="text-muted font-medium flex items-center gap-2">
              <span className="text-emerald-accent font-bold">+$2,612.10</span> 
              since last market close
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedStock({ ...stat, type: 'stat', up: i === 1 })}
              className="rounded-3xl glass-darker p-8 border border-border-primary cursor-pointer hover:bg-foreground/[0.04] transition-all active:scale-95 group"
            >
              <div className={cn("h-10 w-10 rounded-2xl bg-foreground/[0.03] flex items-center justify-center mb-6", stat.color)}>
                <stat.icon size={20} />
              </div>
              <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1">{stat.label}</p>
              <h4 className="text-2xl font-bold text-foreground tracking-tight">{stat.value}</h4>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Section (AI Roast or Holdings) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold text-foreground">Top Movers</h3>
            <button className="text-xs font-bold text-emerald-accent hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {holdings.map((stock, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedStock(stock)}
                className="flex items-center justify-between p-6 rounded-3xl bg-foreground/[0.02] border border-border-primary hover:bg-foreground/[0.04] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-foreground/[0.03] flex items-center justify-center border border-border-primary text-muted group-hover:text-foreground transition-colors">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{stock.name}</p>
                    <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Global Market</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">{stock.price}</p>
                  <p className="text-xs font-bold text-emerald-accent">{stock.change}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <ActionSheet 
        isOpen={!!selectedStock} 
        onClose={() => setSelectedStock(null)} 
        data={selectedStock} 
      />

      {/* Sidebar Area */}
      <div className="space-y-8">
        {children}

        {/* AI Insights Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-[2.5rem] glass-darker p-8 border border-border-primary"
        >
          <div className="flex items-center gap-2 mb-8">
            <div className="h-8 w-8 rounded-xl bg-indigo-accent/10 flex items-center justify-center text-indigo-accent">
              <Zap size={18} />
            </div>
            <h3 className="font-bold text-foreground">AI Copilot Insights</h3>
          </div>
          
          <div className="space-y-6">
            {[
              { text: "Your US Tech allocation is 12% above benchmark.", type: "warning" },
              { text: "Detected 3 undervalued stocks in Renewable sector.", type: "opportunity" },
              { text: "Monthly SIP completed for Nifty 50 Index Fund.", type: "success" },
            ].map((insight, i) => (
              <div key={i} className="flex gap-4 group cursor-pointer">
                <div className={cn(
                  "h-1.5 w-1.5 rounded-full mt-2 shrink-0 transition-transform group-hover:scale-150",
                  insight.type === 'warning' ? "bg-amber-500" : insight.type === 'opportunity' ? "bg-indigo-accent" : "bg-emerald-accent"
                )} />
                <p className="text-sm font-medium text-muted leading-relaxed group-hover:text-foreground transition-colors">
                  {insight.text}
                </p>
              </div>
            ))}
          </div>

          <button className="w-full mt-10 py-4 rounded-2xl bg-foreground/5 text-foreground font-bold text-sm hover:bg-foreground/10 transition-all flex items-center justify-center gap-2">
            View All Reports
            <ChevronRight size={16} />
          </button>
        </motion.div>

        {/* Subscription/Promotion */}
        <div className="p-8 rounded-[2.5rem] bg-indigo-accent text-white shadow-2xl shadow-indigo-accent/20 relative overflow-hidden group cursor-pointer">
          <div className="absolute -bottom-10 -right-10 opacity-20 transition-transform group-hover:scale-110">
            <Zap size={160} />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-80">Limited Offer</p>
          <h4 className="text-2xl font-bold mb-4 leading-tight">Unlock AI Roast for your Portfolio</h4>
          <button className="px-6 py-2.5 bg-white text-indigo-accent rounded-xl text-xs font-bold hover:bg-white/90 transition-all">
            Get Pro Now
          </button>
        </div>
      </div>
    </div>
  );
};
