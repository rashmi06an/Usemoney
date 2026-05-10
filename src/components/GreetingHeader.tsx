'use client';

import React from 'react';
import { useTimeGreeting } from '@/hooks/useTimeGreeting';
import { motion } from 'framer-motion';

export const GreetingHeader: React.FC = () => {
  const { isNewUser } = useTimeGreeting();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    const isNew = isNewUser;
    
    // Mocked for now
    const isLongGap = false; 

    if (isNew) return "Welcome to UseMoney, Rashmi 👋";
    if (isLongGap) return "Welcome back, Rashmi — it’s been a while 👋";
    
    if (hour < 12) return "Good Morning, Rashmi 👋";
    if (hour < 17) return "Good Afternoon, Rashmi 👋";
    if (hour < 21) return "Good Evening, Rashmi 🌙";
    return "Burning the midnight oil, Rashmi? 🌙";
  };

  const greeting = getGreeting();
  const subtitle = isNewUser 
    ? "Your AI-powered investing OS is ready. Let's build your wealth."
    : "Your portfolio moved +2.1% today. AI has found 3 new opportunities.";

  return (
    <div className="mb-10">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold text-foreground tracking-tight">
            {greeting}
          </h1>
          <div className="flex items-center gap-1.5 rounded-full bg-indigo-accent/10 px-3 py-1 text-xs font-bold text-indigo-accent border border-indigo-accent/20">
            AI Optimized
          </div>
        </div>
        <p className="text-lg text-muted font-medium">
          {subtitle}
        </p>
      </motion.div>
    </div>
  );
};
