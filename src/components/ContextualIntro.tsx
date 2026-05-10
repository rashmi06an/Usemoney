'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Info, Zap, HelpCircle } from 'lucide-react';

interface ContextualIntroProps {
  pageName: string;
  title: string;
  description: string;
  isDismissed: boolean;
  onDismiss: () => void;
  onExplainMore?: () => void;
}

export const ContextualIntro: React.FC<ContextualIntroProps> = ({
  pageName,
  title,
  description,
  isDismissed,
  onDismiss,
  onExplainMore
}) => {
  if (isDismissed) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-background border border-border-primary shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)]"
        >
          {/* Header Image/Icon Area */}
          <div className="h-32 bg-emerald-accent/10 flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 opacity-10">
                <HelpCircle size={120} className="absolute -bottom-10 -right-10" />
             </div>
             <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-accent text-white shadow-xl shadow-emerald-accent/20">
               <Sparkles size={32} />
             </div>
          </div>

          <div className="p-10 pt-8 text-center">
            <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-accent/10 text-emerald-accent uppercase tracking-widest font-bold mb-4 inline-block">
              Beginner Guide
            </span>
            
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {title}
            </h3>
            
            <p className="text-muted leading-relaxed font-medium mb-8">
              {description}
            </p>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={onDismiss}
                className="w-full py-4 rounded-2xl bg-foreground text-background font-bold hover:opacity-90 transition-all active:scale-95"
              >
                Explore {pageName}
              </button>
              {onExplainMore && (
                <button
                  onClick={onExplainMore}
                  className="w-full py-4 rounded-2xl bg-foreground/5 text-foreground font-bold hover:bg-foreground/10 transition-all text-sm"
                >
                  Ask AI to explain more
                </button>
              )}
            </div>
          </div>

          <button
            onClick={onDismiss}
            className="absolute top-4 right-4 p-2 text-muted/30 hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
