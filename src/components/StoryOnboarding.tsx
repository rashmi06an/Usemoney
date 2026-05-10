'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Zap, 
  Shield, 
  Target, 
  Wallet, 
  TrendingUp, 
  Brain,
  Rocket,
  LayoutDashboard,
  UserPlus,
  LogIn,
  BarChart3,
  LineChart,
  PieChart
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface StoryOnboardingProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLevel: (isFirstTime: boolean) => void;
}

const STORIES = [
  {
    id: 'welcome',
    title: "Your Entire Wealth, All In One Place.",
    description: "Connect your bank, broker, and crypto. Stop switching apps and start seeing the big picture.",
    icon: Wallet,
    color: "bg-emerald-accent",
    accent: "text-emerald-accent",
    visualText: "Unified Portfolio",
    visualIcon: BarChart3
  },
  {
    id: 'ai',
    title: "Meet StockSage, Your AI Co-Pilot.",
    description: "Deep-dive into 5000+ stocks with real-time risk reports, factor analysis, and technical insights.",
    icon: Sparkles,
    color: "bg-indigo-accent",
    accent: "text-indigo-accent",
    visualText: "AI Intelligence",
    visualIcon: Brain
  },
  {
    id: 'action',
    title: "An Action Hub, Not Just A Dashboard.",
    description: "Every card is interactive. Analyze, compare, and rebalance your portfolio with a single tap.",
    icon: Zap,
    color: "bg-amber-500",
    accent: "text-amber-500",
    visualText: "Interactive Hub",
    visualIcon: Zap
  },
  {
    id: 'fire',
    title: "Plan Your Path to Financial Freedom.",
    description: "Track your FIRE progress in real-time. Know exactly when you can stop working and start living.",
    icon: Target,
    color: "bg-purple-500",
    accent: "text-purple-500",
    visualText: "FIRE Strategy",
    visualIcon: Target
  }
];

export const StoryOnboarding: React.FC<StoryOnboardingProps> = ({ isOpen, onClose, onSelectLevel }) => {
  const [current, setCurrent] = useState(-1); // -1 means Selection Screen
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const next = () => {
    if (current < STORIES.length - 1) {
      setDirection(1);
      setCurrent(current + 1);
    } else {
      onSelectLevel(true);
      onClose();
    }
  };

  const prev = () => {
    if (current > 0) {
      setDirection(-1);
      setCurrent(current - 1);
    } else {
      setCurrent(-1);
    }
  };

  const isSelectionScreen = current === -1;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-5xl bg-background rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 flex flex-col md:flex-row min-h-[600px]"
      >
        {/* Left Column: Icon-Based Visuals */}
        <div className="w-full md:w-1/2 relative overflow-hidden min-h-[300px] md:min-h-full flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            {isSelectionScreen ? (
              <motion.div
                key="selection-visual"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-gradient-to-br from-emerald-accent/20 via-background to-background"
              >
                <div className="h-32 w-32 rounded-[2.5rem] bg-emerald-accent/10 border border-emerald-accent/20 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                  <Rocket size={64} className="text-emerald-accent" />
                </div>
                <h2 className="text-4xl font-bold text-foreground mb-4 tracking-tighter">UseMoney <span className="text-emerald-accent">AI</span></h2>
                <p className="text-muted font-medium px-8 leading-relaxed">Your professional workspace for high-conviction investing.</p>
              </motion.div>
            ) : (
              <motion.div
                key={STORIES[current].id}
                custom={direction}
                initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className={cn("absolute inset-0 flex flex-col items-center justify-center p-12 text-center overflow-hidden", STORIES[current].color.replace('bg-', 'bg-opacity-10 bg-'))}
              >
                {/* Dynamic Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10"><BarChart3 size={120} /></div>
                  <div className="absolute bottom-10 right-10"><LineChart size={120} /></div>
                </div>

                <div className={cn(
                  "h-48 w-48 rounded-[3rem] flex items-center justify-center mb-10 shadow-2xl relative z-10",
                  STORIES[current].color,
                  "text-white"
                )}>
                  {React.createElement(STORIES[current].visualIcon, { size: 80 })}
                </div>
                
                <div className="relative z-10">
                  <span className={cn("px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] bg-white/10 border border-white/20 mb-4 inline-block text-white")}>
                    {STORIES[current].visualText}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Content */}
        <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-between bg-background border-l border-white/5">
          <AnimatePresence mode="wait">
            {isSelectionScreen ? (
              <motion.div
                key="selection-content"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="space-y-4">
                  <span className="text-[10px] font-bold text-emerald-accent uppercase tracking-[0.3em]">Launchpad</span>
                  <h2 className="text-4xl font-bold text-foreground tracking-tight leading-tight">
                    Welcome <br />
                    <span className="text-emerald-accent italic">to the Hub.</span>
                  </h2>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => {
                      onSelectLevel(true);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-7 rounded-[2.5rem] bg-foreground/[0.03] border border-border-primary text-left hover:bg-foreground/[0.05] hover:border-emerald-accent/50 transition-all group"
                  >
                    <div className="flex items-center gap-5">
                      <div className="h-14 w-14 rounded-2xl bg-emerald-accent/10 text-emerald-accent flex items-center justify-center">
                        <UserPlus size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg">Sign In</h3>
                        <p className="text-sm text-muted">New user? Go to beginner dashboard.</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-muted group-hover:text-emerald-accent transition-transform" />
                  </button>

                  <button
                    onClick={() => {
                      onSelectLevel(false);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-7 rounded-[2.5rem] bg-foreground/[0.03] border border-border-primary text-left hover:bg-foreground/[0.05] hover:border-indigo-accent/50 transition-all group"
                  >
                    <div className="flex items-center gap-5">
                      <div className="h-14 w-14 rounded-2xl bg-indigo-accent/10 text-indigo-accent flex items-center justify-center">
                        <LogIn size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg">Log In</h3>
                        <p className="text-sm text-muted">Already an investor? Go to hub.</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-muted group-hover:text-indigo-accent transition-transform" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="walkthrough-content"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                {/* Progress Bar */}
                <div className="flex gap-2 mb-8">
                  {STORIES.map((_, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "h-1.5 flex-1 rounded-full transition-all duration-500",
                        i <= current ? "bg-emerald-accent" : "bg-foreground/10"
                      )} 
                    />
                  ))}
                </div>

                <div className="space-y-6">
                  <h2 className="text-4xl font-bold text-foreground tracking-tight leading-tight">
                    {STORIES[current].title}
                  </h2>
                  <p className="text-xl text-muted font-medium leading-relaxed">
                    {STORIES[current].description}
                  </p>
                </div>

                <div className="flex items-center gap-6 pt-10">
                  <button 
                    onClick={prev}
                    className="h-14 w-14 rounded-2xl bg-foreground/5 text-muted hover:text-foreground flex items-center justify-center transition-all active:scale-95"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={next}
                    className="flex-1 h-14 bg-foreground text-background rounded-2xl font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl active:scale-95"
                  >
                    {current === STORIES.length - 1 ? 'Start Setup' : 'Next'}
                    <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isSelectionScreen && (
            <p className="text-center text-[10px] text-muted font-bold uppercase tracking-[0.3em] mt-10">
              Trusted by 50,000+ investors globally
            </p>
          )}
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-[210] p-2 rounded-full bg-background/50 backdrop-blur-md text-muted hover:text-foreground transition-all hover:rotate-90"
        >
          <X size={24} />
        </button>
      </motion.div>
    </div>
  );
};
