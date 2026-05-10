'use client';

import React from 'react';
import { useTimeGreeting } from '@/hooks/useTimeGreeting';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const GreetingHeader: React.FC = () => {
  const { getGreetingMessage } = useTimeGreeting();
  const { title, subtitle } = getGreetingMessage('Rashmi');

  return (
    <div className="mb-10 pt-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-emerald-500/80 uppercase tracking-widest">
            AI Portfolio Analysis Live
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 tracking-tight">
          {title}
        </h1>
        
        <div className="flex items-center gap-3">
          <p className="text-lg text-muted">
            {subtitle}
          </p>
          <div className="flex items-center gap-1.5 rounded-full bg-indigo-accent/10 px-3 py-1 text-xs font-medium text-indigo-accent border border-indigo-accent/20">
            AI Optimized
          </div>
        </div>
      </motion.div>
    </div>
  );
};
