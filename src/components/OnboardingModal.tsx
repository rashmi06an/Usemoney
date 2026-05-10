'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Sparkles, TrendingUp, Wallet, Brain, Flame, Target, CheckCircle } from 'lucide-react';
import { ONBOARDING_STEPS } from '@/data/mockData';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface OnboardingModalProps {
  isOpen: boolean;
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  onComplete: () => void;
}

const ICONS = [Wallet, TrendingUp, Brain, Flame, Target, CheckCircle];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  currentStep,
  onNext,
  onPrev,
  onClose,
  onComplete,
}) => {
  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1;
  const StepIcon = ICONS[currentStep] || Sparkles;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl glass-darker shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-0">
              <div className="flex gap-1.5">
                {ONBOARDING_STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1 rounded-full transition-all duration-300",
                      i <= currentStep ? "w-8 bg-emerald-500" : "w-4 bg-white/10"
                    )}
                  />
                ))}
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1 text-white/40 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-10 text-center">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-400">
                  <StepIcon size={48} strokeWidth={1.5} />
                </div>
                
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">
                  {ONBOARDING_STEPS[currentStep].title}
                </h2>
                
                <p className="mb-10 text-lg text-slate-400 leading-relaxed max-w-sm">
                  {ONBOARDING_STEPS[currentStep].description}
                </p>
              </motion.div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={onPrev}
                  disabled={currentStep === 0}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-all",
                    currentStep === 0 
                      ? "opacity-0 pointer-events-none" 
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <ChevronLeft size={18} />
                  Back
                </button>

                {isLastStep ? (
                  <button
                    onClick={onComplete}
                    className="flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-3 text-sm font-semibold text-black hover:bg-emerald-400 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Investing
                    <ChevronRight size={18} />
                  </button>
                ) : (
                  <button
                    onClick={onNext}
                    className="flex items-center gap-2 rounded-xl bg-white px-8 py-3 text-sm font-semibold text-black hover:bg-slate-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Next
                    <ChevronRight size={18} />
                  </button>
                )}
              </div>

              {currentStep === 0 && (
                <button 
                  onClick={onComplete}
                  className="mt-6 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  Skip walkthrough
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
