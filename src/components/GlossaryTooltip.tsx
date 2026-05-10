'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Sparkles } from 'lucide-react';

const DICTIONARY: Record<string, string> = {
  "PE Ratio": "Price-to-Earnings ratio. It shows if a stock is expensive or cheap relative to its earnings.",
  "CAGR": "Compound Annual Growth Rate. The mean annual growth rate of an investment over a specified period longer than one year.",
  "Beta": "A measure of a stock's volatility in relation to the overall market.",
  "Market Cap": "The total value of a company's shares. Large-cap usually means more stability.",
  "Alpha": "The excess return of an investment relative to the return of a benchmark index.",
};

export const GlossaryTooltip: React.FC<{ term: string; children: React.ReactNode }> = ({ term, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const definition = DICTIONARY[term] || "AI is still learning this term.";

  return (
    <span className="relative inline-block group">
      <span 
        className="cursor-help border-b border-dotted border-white/30 hover:border-emerald-500/50 transition-colors"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </span>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 z-[100] glass-darker p-4 rounded-2xl border border-white/10 shadow-2xl pointer-events-none"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-emerald-500" />
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">AI Definition</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              <span className="text-white font-bold">{term}:</span> {definition}
            </p>
            
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
              <div className="w-2 h-2 bg-[#050913] border-r border-b border-white/10 rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};
