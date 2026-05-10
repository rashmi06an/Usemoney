'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, LayoutDashboard, Wallet, TrendingUp, Sparkles, GraduationCap, Zap, MousePointer2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const STORIES = [
  {
    id: "track",
    title: "Track what matters",
    subtitle: "Your Watchlist is where you keep an eye on stocks you're interested in. No noise, just data.",
    icon: LayoutDashboard,
    color: "bg-emerald-accent",
    action: "Add First Stock"
  },
  {
    id: "sync",
    title: "All in one place",
    subtitle: "Holdings shows everything you own across all brokers. Secure, synced, and simplified.",
    icon: Wallet,
    color: "bg-indigo-accent",
    action: "Sync Broker"
  },
  {
    id: "markets",
    title: "Market Pulse",
    subtitle: "Stay updated with Nifty, Sensex, and global trends. Real-time insights without the jargon.",
    icon: TrendingUp,
    color: "bg-amber-500",
    action: "View Markets"
  },
  {
    id: "ai",
    title: "AI-First Investing",
    subtitle: "StockSage AI roasts your portfolio, finds undervalued gems, and explains finance simply.",
    icon: Sparkles,
    color: "bg-emerald-accent",
    action: "Ask AI"
  }
];

interface StoryOnboardingProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLevel: (isBeginner: boolean) => void;
}

export const StoryOnboarding: React.FC<StoryOnboardingProps> = ({ isOpen, onClose, onSelectLevel }) => {
  const [current, setCurrent] = useState(-1); // -1 is the level selection step

  if (!isOpen) return null;

  const next = () => {
    if (current < STORIES.length - 1) {
      setCurrent(current + 1);
    } else {
      onClose();
    }
  };

  const handleLevelSelect = (isBeginner: boolean) => {
    console.log("Level selected:", isBeginner ? "Beginner" : "Advanced");
    onSelectLevel(isBeginner);
    // Note: page.tsx usually reloads here, but we set current just in case it doesn't
    setCurrent(0);
  };

  const story = current >= 0 ? STORIES[current] : null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl p-4">
      <div className="relative w-full max-w-[400px] aspect-[9/16] overflow-hidden rounded-[2.5rem] bg-background border border-border-primary shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
        
        {/* Progress Bars */}
        {current >= 0 && (
          <div className="absolute top-6 left-6 right-6 flex gap-1.5 z-30">
            {STORIES.map((_, i) => (
              <div key={i} className="h-1 flex-1 rounded-full bg-foreground/10 overflow-hidden">
                <motion.div
                  className="h-full bg-emerald-accent"
                  initial={{ width: 0 }}
                  animate={{ width: i < current ? "100%" : i === current ? "100%" : "0%" }}
                  transition={{ duration: i === current ? 5 : 0.3, ease: "linear" }}
                  onAnimationComplete={() => i === current && next()}
                />
              </div>
            ))}
          </div>
        )}

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-10 right-6 z-40 p-2 text-muted hover:text-foreground transition-colors"
        >
          <X size={24} />
        </button>

        {/* Level Selection (Step -1) */}
        <AnimatePresence mode="wait">
          {current === -1 ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-20"
            >
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-accent text-white shadow-xl shadow-emerald-accent/20">
                <GraduationCap size={40} />
              </div>

              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground leading-tight">
                Welcome to <span className="text-emerald-accent">UseMoney AI</span>
              </h2>

              <p className="mb-10 text-base text-muted leading-relaxed font-medium">
                Choose your experience level to customize your AI workspace.
              </p>

              <div className="w-full space-y-4">
                <button
                  type="button"
                  onClick={() => handleLevelSelect(true)}
                  className="w-full flex items-center justify-between p-6 rounded-3xl bg-foreground/[0.03] border border-border-primary text-left hover:bg-foreground/[0.05] hover:border-emerald-accent/50 transition-all group relative z-50"
                >
                  <div>
                    <h3 className="font-bold text-foreground text-lg">Beginner</h3>
                    <p className="text-sm text-muted">Simple language & guided UI</p>
                  </div>
                  <ChevronRight size={20} className="text-muted group-hover:text-emerald-accent transition-colors" />
                </button>

                <button
                  type="button"
                  onClick={() => handleLevelSelect(false)}
                  className="w-full flex items-center justify-between p-6 rounded-3xl bg-foreground/[0.03] border border-border-primary text-left hover:bg-foreground/[0.05] hover:border-indigo-accent/50 transition-all group relative z-50"
                >
                  <div>
                    <h3 className="font-bold text-foreground text-lg">Advanced</h3>
                    <p className="text-sm text-muted">Deep metrics & raw data</p>
                  </div>
                  <Zap size={20} className="text-muted group-hover:text-indigo-accent transition-colors" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1.1, x: -20 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center z-20"
            >
              <div className={cn(
                "mb-8 flex h-24 w-24 items-center justify-center rounded-[2rem] text-white shadow-2xl",
                story?.color.includes('bg-') ? story.color : `bg-${story?.color}`
              )}>
                {story && <story.icon size={48} strokeWidth={1.5} />}
              </div>

              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground leading-tight">
                {story?.title}
              </h2>

              <p className="mb-12 text-lg text-muted leading-relaxed font-medium">
                {story?.subtitle}
              </p>

              <button
                onClick={next}
                className="group flex items-center gap-3 rounded-2xl bg-foreground text-background px-8 py-4 text-sm font-bold hover:opacity-90 transition-all active:scale-95 shadow-xl"
              >
                {story?.action}
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tap Zones - Only active for story slides */}
        {current >= 0 && (
          <div className="absolute inset-0 flex z-10">
            <div className="w-1/3 h-full cursor-pointer" onClick={() => setCurrent(Math.max(0, current - 1))} />
            <div className="w-2/3 h-full cursor-pointer" onClick={next} />
          </div>
        )}

        {/* Bottom indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center opacity-40">
           <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-bold">
             {current === -1 ? 'Select your level' : 'Tap to continue'}
           </span>
        </div>
      </div>
    </div>
  );
};
