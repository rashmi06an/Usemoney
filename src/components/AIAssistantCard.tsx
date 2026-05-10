'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Zap, Ghost, TrendingDown, Target } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const PROMPTS = [
  { label: "Analyze my portfolio", icon: Zap },
  { label: "Suggest undervalued stocks", icon: Target },
  { label: "How close am I to FIRE?", icon: TrendingDown },
  { label: "Roast my holdings", icon: Ghost },
];

export const AIAssistantCard: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setIsTyping(true);
    setInputValue('');
    setTimeout(() => setIsTyping(false), 2000);
  };

  return (
    <div className="rounded-3xl glass-darker overflow-hidden border border-white/10 shadow-2xl">
      <div className="p-6 border-b border-border-primary bg-foreground/[0.03]">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="font-semibold text-foreground">StockSage AI</h3>
            <p className="text-xs text-muted flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-accent" />
              Online & Analyzing
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 space-y-4 min-h-[120px] flex flex-col justify-end">
          <AnimatePresence mode="wait">
            {isTyping ? (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-2"
              >
                <div className="rounded-2xl rounded-tl-none bg-indigo-accent/10 px-4 py-3 border border-indigo-accent/20">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-accent" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-accent [animation-delay:0.2s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-accent [animation-delay:0.4s]" />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.p
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-muted italic"
              >
                "I've analyzed your recent transactions. You're currently overexposed to mid-cap tech. Want a breakdown?"
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-6">
          {PROMPTS.map((prompt) => (
            <button
              key={prompt.label}
              onClick={() => setInputValue(prompt.label)}
              className="flex items-center gap-2 rounded-xl border border-border-primary bg-foreground/[0.03] px-3 py-2.5 text-left text-xs font-medium text-muted hover:bg-foreground/[0.06] hover:border-foreground/10 transition-all active:scale-[0.98]"
            >
              <prompt.icon size={14} className="text-indigo-accent" />
              {prompt.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask StockSage anything..."
            className="w-full rounded-2xl bg-foreground/[0.03] border border-border-primary py-4 pl-5 pr-14 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-indigo-accent/50 transition-all"
          />
          <button
            onClick={handleSend}
            className="absolute right-2 top-2 h-10 w-10 rounded-xl bg-indigo-accent flex items-center justify-center text-white hover:bg-indigo-accent/80 transition-all active:scale-95"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

    </div>
  );
};
