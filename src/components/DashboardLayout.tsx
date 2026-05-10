'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  Shield, 
  Zap, 
  Info, 
  ChevronRight, 
  BarChart3, 
  LineChart,
  Plus,
  HelpCircle,
  Wallet,
  Target,
  Sparkles,
  BookOpen,
  PieChart,
  Rocket
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ActionSheet } from './ActionSheet';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DashboardLayoutProps {
  isBeginnerMode: boolean;
  children?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ isBeginnerMode, children }) => {
  const [selectedStock, setSelectedStock] = React.useState<any>(null);
  
  const stats = [
    { label: 'Invested', value: '$84,200', icon: BarChart3, color: 'text-indigo-accent', desc: 'The total capital you have deployed across all your assets.' },
    { label: 'Returns', value: '+$40,392', icon: Zap, color: 'text-emerald-accent', desc: 'Your net profit or loss since you started investing.' },
    { label: 'Safety Score', value: '84/100', icon: Shield, color: 'text-amber-500', desc: 'Measures how well-diversified and stable your portfolio is.' },
    { label: 'FIRE Progress', value: '12%', icon: LineChart, color: 'text-purple-500', desc: 'Tracks your journey toward Financial Independence and Retiring Early.' },
  ];

  const ONBOARDING_ACTIONS = [
    { title: 'Connect Broker', desc: 'Auto-sync your stocks and mutual funds securely.', icon: Wallet, color: 'bg-emerald-accent' },
    { title: 'Create Watchlist', desc: 'Monitor your dream stocks with AI alerts.', icon: BarChart3, color: 'bg-indigo-accent' },
    { title: 'Explore Markets', desc: 'See what is moving in the global economy.', icon: TrendingUp, color: 'bg-amber-500' },
    { title: 'Learn Basics', desc: 'Get a 2-minute intro to smart investing.', icon: BookOpen, color: 'bg-purple-500' },
  ];

  const EDUCATIONAL_CARDS = [
    { title: 'What is a Portfolio?', desc: 'It’s your collection of financial investments like stocks, bonds, and cash.', icon: PieChart },
    { title: 'How Returns Work?', desc: 'Profit earned on an investment, usually shown as a percentage of what you invested.', icon: Zap },
    { title: 'What is FIRE?', desc: 'Financial Independence, Retire Early. A goal to save enough to live off your wealth.', icon: Target },
    { title: 'Why Track Assets?', desc: 'To ensure your money is growing faster than inflation and stay on track for goals.', icon: Shield },
  ];

  const holdings = [
    { name: 'Nifty 50', price: '$24,192.40', change: '+1.4%', up: true },
    { name: 'Gold', price: '$24,192.40', change: '+1.4%', up: true },
    { name: 'US Tech', price: '$24,192.40', change: '+1.4%', up: true },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Main Content Area */}
      <div className="lg:col-span-2 space-y-12">
        
        {/* Beginner Welcome & Setup Hero */}
        {isBeginnerMode && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-10 rounded-[3rem] bg-emerald-accent text-black relative overflow-hidden shadow-2xl shadow-emerald-accent/20"
          >
            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="px-3 py-1 rounded-full bg-black/10 text-[10px] font-bold uppercase tracking-widest border border-black/10">
                  Onboarding Phase 1/4
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
                Let's build your <span className="italic">personalized</span> investing workspace.
              </h1>
              <p className="text-lg md:text-xl text-black/70 font-medium mb-10 leading-relaxed">
                Welcome to UseMoney AI. To give you the best experience, we need to understand your financial personality.
              </p>
              <button className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-2xl font-bold hover:opacity-90 transition-all shadow-xl group">
                Start Setup
                <ArrowUpRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="absolute -bottom-20 -right-20 opacity-10">
              <Rocket size={320} />
            </div>
          </motion.div>
        )}

        {/* Total Value Card (Preview State for Beginners) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2.5rem] glass-darker p-10 relative overflow-hidden cursor-pointer group hover:bg-foreground/[0.04] transition-all border border-white/5"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp size={120} />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">Total Portfolio Value</span>
              {!isBeginnerMode && (
                <div className="px-2 py-0.5 rounded-md bg-emerald-accent/10 text-emerald-accent text-[10px] font-bold">
                  +2.1% Today
                </div>
              )}
            </div>
            {isBeginnerMode ? (
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-foreground tracking-tight mb-2">Start building your <span className="italic text-emerald-accent">wealth</span></h2>
                <p className="text-muted font-medium max-w-md leading-relaxed">This will track your total net worth across all platforms once you link your accounts.</p>
              </div>
            ) : (
              <>
                <h2 className="text-5xl font-bold text-foreground tracking-tight mb-4">$124,592.30</h2>
                <p className="text-muted font-medium flex items-center gap-2">
                  <span className="text-emerald-accent font-bold">+$2,612.10</span> 
                  since last market close
                </p>
              </>
            )}
          </div>
        </motion.div>

        {/* Stats Grid: Predictive/Educational for Beginners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-[2.5rem] glass-darker p-8 border border-border-primary relative group overflow-hidden"
            >
              <div className={cn("h-12 w-12 rounded-2xl bg-foreground/[0.03] flex items-center justify-center mb-6", stat.color)}>
                <stat.icon size={24} />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold text-muted uppercase tracking-widest">{stat.label}</p>
                {isBeginnerMode ? (
                  <p className="text-sm text-foreground/70 font-medium leading-relaxed italic pr-12">
                    {stat.desc}
                  </p>
                ) : (
                  <h4 className="text-3xl font-bold text-foreground tracking-tight">{stat.value}</h4>
                )}
              </div>
              {isBeginnerMode && (
                <div className="absolute top-8 right-8 text-muted opacity-20">
                  <Info size={16} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Actionable Onboarding Cards (Beginners Only) */}
        {isBeginnerMode && (
          <div className="space-y-8">
            <div className="px-2">
              <h3 className="text-xl font-bold text-foreground tracking-tight">Setup your Hub</h3>
              <p className="text-sm text-muted font-medium">Step-by-step guidance to unlock full analytics.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ONBOARDING_ACTIONS.map((action, i) => (
                <motion.button
                  key={action.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-[2rem] bg-foreground/[0.02] border border-border-primary hover:bg-foreground/[0.04] transition-all text-left flex items-start gap-5 group"
                >
                  <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-lg", action.color)}>
                    <action.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1 group-hover:text-emerald-accent transition-colors">{action.title}</h4>
                    <p className="text-xs text-muted leading-relaxed font-medium">{action.desc}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Advanced Data (Hidden for Beginners) */}
        {!isBeginnerMode && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-bold text-foreground">Top Movers</h3>
              <button className="text-xs font-bold text-emerald-accent hover:underline uppercase tracking-widest font-bold">View All</button>
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
        )}
      </div>

      {/* Sidebar Area: Simplified for Beginners */}
      <div className="space-y-10">
        {/* Custom children (AIAssistantCard) */}
        {children}

        {/* Beginner Educational Blocks */}
        {isBeginnerMode ? (
          <div className="space-y-6 pt-4">
            <div className="px-2 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-accent animate-pulse" />
              <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Investing 101</h3>
            </div>
            <div className="space-y-4">
              {EDUCATIONAL_CARDS.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-[2rem] glass-darker border border-border-primary hover:border-emerald-accent/30 transition-all group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-8 w-8 rounded-xl bg-foreground/[0.03] flex items-center justify-center text-muted group-hover:text-emerald-accent transition-colors">
                      <card.icon size={18} />
                    </div>
                    <h4 className="font-bold text-sm text-foreground">{card.title}</h4>
                  </div>
                  <p className="text-xs text-muted leading-relaxed font-medium">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Advanced Sidebar Widgets */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-[2.5rem] glass-darker p-8 border border-border-primary shadow-xl"
            >
              <div className="flex items-center gap-2 mb-8">
                <div className="h-10 w-10 rounded-2xl bg-indigo-accent/10 flex items-center justify-center text-indigo-accent">
                  <Sparkles size={20} />
                </div>
                <h3 className="font-bold text-foreground tracking-tight text-lg">AI Copilot Insights</h3>
              </div>
              
              <div className="space-y-6">
                {[
                  { text: "Your US Tech allocation is 12% above benchmark.", type: "warning" },
                  { text: "Detected 3 undervalued stocks in Renewable sector.", type: "opportunity" },
                  { text: "Monthly SIP completed for Nifty 50 Index Fund.", type: "success" },
                ].map((insight, i) => (
                  <div key={i} className="flex gap-4 group cursor-pointer items-start">
                    <div className={cn(
                      "h-2 w-2 rounded-full mt-1.5 shrink-0 transition-transform group-hover:scale-150 shadow-sm",
                      insight.type === 'warning' ? "bg-amber-500 shadow-amber-500/20" : insight.type === 'opportunity' ? "bg-indigo-accent shadow-indigo-accent/20" : "bg-emerald-accent shadow-emerald-accent/20"
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

            <div className="p-10 rounded-[2.5rem] bg-indigo-accent text-white shadow-2xl shadow-indigo-accent/30 relative overflow-hidden group cursor-pointer">
              <div className="absolute -bottom-10 -right-10 opacity-20 transition-transform group-hover:scale-110">
                <Zap size={180} />
              </div>
              <div className="relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 opacity-70">Upgrade Hub</p>
                <h4 className="text-2xl font-bold mb-6 leading-tight">Unlock AI Roast for your Portfolio</h4>
                <button className="px-6 py-3 bg-white text-indigo-accent rounded-xl text-xs font-bold hover:bg-white/90 transition-all shadow-lg">
                  Get Pro Now
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <ActionSheet 
        isOpen={!!selectedStock} 
        onClose={() => setSelectedStock(null)} 
        data={selectedStock} 
      />
    </div>
  );
};
