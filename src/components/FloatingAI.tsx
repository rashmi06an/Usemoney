'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircle, X, Send, Zap, Ghost, Target, TrendingUp, Info } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FloatingAIProps {
  currentPage: string;
}

export const FloatingAI: React.FC<FloatingAIProps> = ({ currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getContextPrompts = () => {
    const common = [
      { label: "What is this page?", icon: Info },
      { label: "Explain simply", icon: Zap },
    ];

    if (currentPage === 'Holdings') {
      return [...common, { label: "Analyze my portfolio", icon: Target }, { label: "Roast my holdings", icon: Ghost }];
    }
    if (currentPage === 'Markets') {
      return [...common, { label: "What moved today?", icon: TrendingUp }, { label: "Market sentiment", icon: Sparkles }];
    }
    return common;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setIsTyping(true);
    setInputValue('');
    setTimeout(() => setIsTyping(false), 2000);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-8 right-8 z-50 h-16 w-16 rounded-2xl bg-indigo-500 text-white flex items-center justify-center shadow-2xl shadow-indigo-500/40 hover:scale-110 active:scale-95 transition-all group",
          isOpen && "bg-slate-800"
        )}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
              <div className="relative">
                <Sparkles size={28} />
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-indigo-500 animate-pulse" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute right-full mr-4 px-3 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
            Ask StockSage AI
          </div>
        )}
      </motion.button>

      {/* Side Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            className="fixed bottom-28 right-8 z-50 w-[380px] max-w-[calc(100vw-64px)] rounded-3xl glass-darker border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 bg-indigo-500/5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500 text-white">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">StockSage AI</h3>
                  <p className="text-xs text-indigo-400 font-medium">Investments Copilot</p>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 min-h-[300px]">
              <div className="rounded-2xl rounded-tl-none bg-white/5 border border-white/10 p-4">
                <p className="text-sm text-slate-300 leading-relaxed">
                  Hi! I'm your AI investing companion. I see you're on the **{currentPage}** page. How can I help you understand this view?
                </p>
              </div>

              {isTyping && (
                <div className="flex gap-1.5 p-2">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            {/* Suggestions */}
            <div className="px-6 py-4 grid grid-cols-2 gap-2">
              {getContextPrompts().map((prompt) => (
                <button
                  key={prompt.label}
                  onClick={() => setInputValue(prompt.label)}
                  className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-3 py-2.5 text-left text-xs font-bold text-slate-400 hover:bg-white/10 hover:text-white transition-all active:scale-95"
                >
                  <prompt.icon size={14} className="text-indigo-400" />
                  {prompt.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-6 pt-0">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="w-full rounded-2xl bg-white/5 border border-white/10 py-4 pl-5 pr-14 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-2 top-2 h-10 w-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white hover:bg-indigo-400 transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
