'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, PlayCircle, MessageSquare, ChevronRight, Sparkles, Zap, Shield, Target, HelpCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CATEGORIES = [
  { id: 'all', label: 'All Guides', icon: BookOpen },
  { id: 'getting-started', label: 'Getting Started', icon: Zap },
  { id: 'sync', label: 'Portfolio Sync', icon: Shield },
  { id: 'ai', label: 'AI Intelligence', icon: Sparkles },
  { id: 'fire', label: 'FIRE Planning', icon: Target },
];

const GUIDES = [
  {
    id: '1',
    category: 'getting-started',
    title: 'Your First 5 Minutes in UseMoney',
    description: 'Learn how to navigate the Action Hub and customize your AI workspace.',
    duration: '2 min read',
    type: 'article'
  },
  {
    id: '2',
    category: 'sync',
    title: 'How to Sync Your Portfolio',
    description: 'A step-by-step guide to connecting your brokers securely via our encrypted bridge.',
    duration: '5 min watch',
    type: 'video'
  },
  {
    id: '3',
    category: 'ai',
    title: 'Mastering StockSage Commands',
    description: 'Use advanced prompts like /roast or @stock to get the most out of your AI copilot.',
    duration: '3 min read',
    type: 'article'
  },
  {
    id: '4',
    category: 'fire',
    title: 'Calculating Your Freedom Number',
    description: 'The math behind Financial Independence and Retiring Early. How UseMoney tracks it.',
    duration: '4 min read',
    type: 'article'
  },
  {
    id: '5',
    category: 'getting-started',
    title: 'Beginner vs Advanced Mode',
    description: 'Understanding the difference and when to toggle between them.',
    duration: '1 min read',
    type: 'article'
  },
  {
    id: '6',
    category: 'ai',
    title: 'How AI Factor Analysis Works',
    description: 'The technical breakdown of how we analyze 5000+ data points for every stock.',
    duration: '6 min read',
    type: 'article'
  }
];

export const HelpCenter: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGuides = GUIDES.filter(guide => {
    const matchesCategory = activeCategory === 'all' || guide.category === activeCategory;
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* Hero Section */}
      <div className="text-center space-y-4 pt-8">
        <h1 className="text-5xl font-bold text-foreground tracking-tight">How can we <span className="text-emerald-accent italic">help</span> you?</h1>
        <p className="text-xl text-muted font-medium max-w-2xl mx-auto">
          Explore our guides, watch tutorials, or talk to StockSage AI for personalized assistance.
        </p>
        
        <div className="relative max-w-2xl mx-auto mt-10">
          <input
            type="text"
            placeholder="Search for guides, keywords, or features..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl bg-foreground/[0.03] border border-border-primary py-5 pl-14 pr-6 text-lg text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-emerald-accent/50 transition-all shadow-xl"
          />
          <Search size={24} className="absolute left-5 top-5 text-muted" />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all border",
              activeCategory === cat.id 
                ? "bg-emerald-accent text-black border-emerald-accent shadow-lg shadow-emerald-accent/20" 
                : "bg-foreground/[0.03] text-muted border-border-primary hover:text-foreground hover:bg-foreground/[0.05]"
            )}
          >
            <cat.icon size={18} />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.map((guide, i) => (
          <motion.div
            key={guide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group p-8 rounded-[2.5rem] glass-darker border border-border-primary hover:bg-foreground/[0.04] transition-all cursor-pointer flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="h-10 w-10 rounded-xl bg-foreground/[0.03] flex items-center justify-center text-muted group-hover:text-emerald-accent transition-colors">
                  {guide.type === 'video' ? <PlayCircle size={20} /> : <BookOpen size={20} />}
                </div>
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{guide.duration}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-emerald-accent transition-colors">
                {guide.title}
              </h3>
              <p className="text-sm text-muted font-medium leading-relaxed mb-8">
                {guide.description}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-accent uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              Read Guide
              <ChevronRight size={14} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fallback AI Support */}
      <div className="p-10 rounded-[3rem] bg-indigo-accent text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-indigo-accent/20">
        <div className="flex items-center gap-6">
          <div className="h-16 w-16 rounded-[1.5rem] bg-white/20 flex items-center justify-center backdrop-blur-md">
            <MessageSquare size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
            <p className="text-white/70 font-medium">Talk to StockSage AI for instant personalized help with your portfolio.</p>
          </div>
        </div>
        <button className="px-8 py-4 bg-white text-indigo-accent rounded-2xl font-bold hover:bg-white/90 transition-all shadow-xl shrink-0">
          Start AI Chat
        </button>
      </div>
    </div>
  );
};
