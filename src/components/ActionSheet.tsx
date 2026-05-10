'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Info, Zap, Target, Share2, BarChart3 } from 'lucide-react';

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const ActionSheet: React.FC<ActionSheetProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-4 top-[10%] bottom-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-3xl z-[70] overflow-hidden rounded-[2.5rem] glass-darker border border-border-primary shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-border-primary flex items-center justify-between bg-foreground/[0.02]">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-emerald-accent/10 text-emerald-accent flex items-center justify-center">
                  <BarChart3 size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{title}</h2>
                  <p className="text-sm text-muted">Live Insights & Analysis</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-foreground/5 text-muted hover:text-foreground transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8">
              {children}
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-border-primary bg-foreground/[0.02] flex items-center justify-between gap-4">
               <div className="flex items-center gap-2">
                 <button className="p-3 rounded-xl bg-foreground/5 text-muted hover:text-foreground transition-all">
                   <Share2 size={20} />
                 </button>
                 <button className="p-3 rounded-xl bg-foreground/5 text-muted hover:text-foreground transition-all">
                   <Target size={20} />
                 </button>
               </div>
               
               <div className="flex items-center gap-3">
                 <button 
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl text-sm font-bold text-muted hover:text-foreground transition-all"
                 >
                   Dismiss
                 </button>
                 <button className="px-8 py-3 rounded-xl bg-emerald-accent text-sm font-bold text-white hover:bg-emerald-accent/80 transition-all shadow-lg shadow-emerald-accent/10">
                   Add to Watchlist
                 </button>
               </div>
            </div>
          </motion.div>

        </>
      )}
    </AnimatePresence>
  );
};
