'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Shield, Target, Rocket, ChevronRight, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const NewUserDashboard: React.FC = () => {
  const steps = [
    { id: 1, title: 'Complete your profile', description: 'Tell us about your risk appetite and goals.', completed: true },
    { id: 2, title: 'Link your first broker', description: 'Sync your holdings to get AI insights.', completed: false },
    { id: 3, title: 'Create a watchlist', description: 'Track 5 stocks to see AI in action.', completed: false },
    { id: 4, title: 'Set your FIRE goal', description: 'Calculate your freedom number.', completed: false },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Hero Setup */}
      <div className="relative p-12 rounded-[3rem] bg-emerald-accent text-black overflow-hidden shadow-2xl shadow-emerald-accent/20">
        <div className="absolute -bottom-20 -right-20 opacity-10">
          <Rocket size={320} />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="px-3 py-1 rounded-full bg-black/10 text-[10px] font-bold uppercase tracking-widest border border-black/10">
              Onboarding Phase 1/4
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6 tracking-tight leading-tight">
            Let's build your <span className="italic">personalized</span> investing workspace.
          </h1>
          <p className="text-xl text-black/70 font-medium mb-10 leading-relaxed">
            Welcome to UseMoney AI. To give you the best experience, we need to understand your financial personality.
          </p>
          <button className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-2xl font-bold hover:opacity-90 transition-all shadow-xl group">
            Start Setup
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Setup Progress */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold text-foreground">Getting Started</h3>
            <span className="text-sm font-bold text-emerald-accent">25% Complete</span>
          </div>
          
          <div className="space-y-4">
            {steps.map((step) => (
              <div 
                key={step.id}
                className={cn(
                  "flex items-center justify-between p-6 rounded-3xl border transition-all cursor-pointer group",
                  step.completed 
                    ? "bg-emerald-accent/5 border-emerald-accent/20" 
                    : "bg-foreground/[0.02] border-border-primary hover:bg-foreground/[0.04]"
                )}
              >
                <div className="flex items-center gap-5">
                  <div className={cn(
                    "h-12 w-12 rounded-2xl flex items-center justify-center transition-all",
                    step.completed ? "bg-emerald-accent text-white" : "bg-foreground/5 text-muted group-hover:text-foreground"
                  )}>
                    {step.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                  </div>
                  <div>
                    <h4 className={cn("font-bold text-lg", step.completed ? "text-foreground" : "text-foreground/80")}>
                      {step.title}
                    </h4>
                    <p className="text-sm text-muted font-medium">{step.description}</p>
                  </div>
                </div>
                {!step.completed && <ChevronRight size={20} className="text-muted group-hover:text-foreground transition-colors" />}
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="space-y-8">
          <div className="p-8 rounded-[2.5rem] glass-darker border border-border-primary">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-2xl bg-emerald-accent/10 flex items-center justify-center text-emerald-accent">
                <Target size={20} />
              </div>
              <h3 className="font-bold text-foreground">Why complete setup?</h3>
            </div>
            
            <ul className="space-y-6">
              {[
                { icon: Shield, text: "Unlock precise risk scores for every stock you track." },
                { icon: Rocket, text: "Get early access to AI factor analysis reports." },
                { icon: UserPlus, text: "Personalized alerts based on your portfolio size." },
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <item.icon size={18} className="text-muted shrink-0" />
                  <p className="text-sm font-medium text-muted leading-relaxed">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 rounded-[2.5rem] bg-foreground/[0.03] border border-dashed border-border-primary text-center">
            <p className="text-sm text-muted font-medium mb-4">Need help setting up?</p>
            <button className="text-xs font-bold text-emerald-accent hover:underline">
              Talk to StockSage AI Helper
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
