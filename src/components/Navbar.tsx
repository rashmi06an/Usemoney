'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, SlidersHorizontal, Sun, Moon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavbarProps {
  isBeginnerMode: boolean;
  onToggleMode: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isBeginnerMode, onToggleMode, theme, onToggleTheme }) => {
  return (
    <nav className="fixed top-0 right-0 left-0 xl:left-64 z-50 bg-background/80 backdrop-blur-xl border-b border-border-primary px-8 h-20 flex items-center">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-8">
        
        {/* Search - Left Side */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-foreground/[0.03] border border-border-primary text-muted focus-within:border-emerald-accent/50 focus-within:bg-foreground/[0.05] transition-all group">
            <Search size={18} className="group-focus-within:text-emerald-accent transition-colors" />
            <input 
              type="text" 
              placeholder="Search assets, AI roasts..." 
              className="bg-transparent border-none focus:outline-none flex-1 text-foreground placeholder:text-muted/50 font-medium text-sm"
            />
            <kbd className="hidden sm:inline-flex px-1.5 py-0.5 rounded bg-foreground/5 text-[10px] font-bold border border-border-primary">⌘K</kbd>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4 shrink-0">
          
          {/* Market Status Pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-bold text-red-500 uppercase tracking-widest whitespace-nowrap">
            <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            Market Closed
          </div>

          <div className="h-6 w-[1px] bg-border-primary mx-1 hidden lg:block" />

          {/* Mode Toggle */}
          <button 
            onClick={onToggleMode}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all font-bold text-xs whitespace-nowrap",
              isBeginnerMode 
                ? "bg-emerald-accent/10 border-emerald-accent/20 text-emerald-accent" 
                : "bg-indigo-accent/10 border-indigo-accent/20 text-indigo-accent"
            )}
          >
            <SlidersHorizontal size={14} />
            <span className="hidden sm:inline">{isBeginnerMode ? 'Beginner' : 'Advanced'}</span>
          </button>

          {/* Theme Toggle */}
          <button 
            onClick={onToggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-foreground/[0.03] border border-border-primary text-muted hover:text-foreground transition-all active:scale-95 shadow-sm"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button className="p-2.5 text-muted hover:text-foreground hover:bg-foreground/5 rounded-2xl transition-all relative">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-emerald-accent border-2 border-background" />
          </button>

          {/* Profile Section */}
          <div className="flex items-center gap-3 pl-2 group cursor-pointer border-l border-border-primary">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-foreground leading-none mb-1">Rashmi Anand</p>
              <p className="text-[10px] font-bold text-emerald-accent uppercase tracking-wider leading-none">Pro Plan</p>
            </div>
            <div className="h-10 w-10 rounded-2xl bg-emerald-accent/20 border border-emerald-accent/30 flex items-center justify-center text-emerald-accent font-bold group-hover:scale-105 transition-all shadow-lg shadow-emerald-accent/5">
              RA
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
