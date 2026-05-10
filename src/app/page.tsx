'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { GreetingHeader } from '@/components/GreetingHeader';
import { DashboardLayout } from '@/components/DashboardLayout';
import { AIAssistantCard } from '@/components/AIAssistantCard';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useToast } from '@/components/Toast';
import { DashboardSkeleton } from '@/components/Skeleton';
import { StoryOnboarding } from '@/components/StoryOnboarding';
import { ContextualIntro } from '@/components/ContextualIntro';
import { StockSageChat } from '@/components/StockSageChat';
import { MarketView } from '@/components/MarketView';
import { HelpCenter } from '@/components/HelpCenter';
import { FloatingAI } from '@/components/FloatingAI';
import { WatchlistEmpty } from '@/components/WatchlistEmpty';
import { useTheme } from '@/hooks/useTheme';
import { MarketTicker } from '@/components/MarketTicker';
import { useTimeGreeting } from '@/hooks/useTimeGreeting';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Home() {
  const { isNewUser } = useTimeGreeting();
  const [activeTab, setActiveTab] = useState('dashboard');
  const { theme, toggleTheme } = useTheme();
  const { 
    isOpen: isOnboardingOpen, 
    isBeginnerMode,
    completeOnboarding, 
    toggleMode
  } = useOnboarding();
  
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = React.useState(true);
  const [dismissedIntros, setDismissedIntros] = useState<Record<string, boolean>>({});

  const PAGE_INTROS: Record<string, { title: string; description: string; name: string }> = {
    dashboard: {
      name: 'Dashboard',
      title: 'Welcome to your Investing OS',
      description: 'The Action Hub is where you track your total wealth, see top movers, and get AI insights in real-time.'
    },
    portfolio: {
      name: 'Portfolio',
      title: 'Track Your Performance',
      description: 'Monitor your holdings, see profit/loss, and get AI suggestions to rebalance your portfolio for better returns.'
    },
    'ai-research': {
      name: 'AI Research',
      title: 'Deep-Dive with StockSage',
      description: 'Enter any stock symbol to get a complete 360° AI analysis, risk reports, and future outlook.'
    },
    markets: {
      name: 'Markets',
      title: 'Market Pulse',
      description: 'Pulse of the global economy. Beginner mode simplifies complex heatmaps into easy-to-read summary cards.'
    },
    watchlist: {
      name: 'Watchlist',
      title: 'Track Before You Buy',
      description: 'Save stocks here to let AI monitor them. You will get alerts when it is the best time to enter or exit.'
    },
    'fire-goals': {
      name: 'FIRE Goals',
      title: 'Plan Your Freedom',
      description: 'Set your retirement targets and track your progress towards Financial Independence and Retiring Early.'
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [activeTab]);

  React.useEffect(() => {
    const saved = localStorage.getItem('dismissed_intros');
    if (saved) setDismissedIntros(JSON.parse(saved));
  }, []);

  const dismissIntro = (pageId: string) => {
    const updated = { ...dismissedIntros, [pageId]: true };
    setDismissedIntros(updated);
    localStorage.setItem('dismissed_intros', JSON.stringify(updated));
  };

  const handleComplete = () => {
    completeOnboarding();
    showToast("Welcome aboard! Your workspace is ready.", "success");
  };

  const renderContent = () => {
    if (isLoading) return <DashboardSkeleton />;

    switch (activeTab) {
      case 'chat':
        return <StockSageChat isBeginnerMode={isBeginnerMode} />;
      case 'dashboard':
        return (
          <DashboardLayout isBeginnerMode={isBeginnerMode}>
            <AIAssistantCard />
          </DashboardLayout>
        );
      case 'watchlist':
        return <WatchlistEmpty />;
      case 'markets':
        return <MarketView isBeginnerMode={isBeginnerMode} />;
      case 'portfolio':
        return (
          <div className="rounded-3xl glass-darker p-20 text-center border border-border-primary">
            <h3 className="text-2xl font-bold text-foreground mb-2">Portfolio Analytics</h3>
            <p className="text-muted">Coming soon...</p>
          </div>
        );
      case 'ai-research':
        return (
          <div className="rounded-3xl glass-darker p-20 text-center border border-border-primary">
            <h3 className="text-2xl font-bold text-foreground mb-2">AI Research Lab</h3>
            <p className="text-muted">Analyzing 5000+ stocks...</p>
          </div>
        );
      case 'help':
        return <HelpCenter />;
      default:
        return (
          <div className="rounded-3xl glass-darker p-20 text-center border border-border-primary">
            <h3 className="text-2xl font-bold text-foreground mb-2">{activeTab.toUpperCase()}</h3>
            <p className="text-muted">Coming soon in the next update.</p>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen glow-bg">
      {isBeginnerMode && activeTab !== 'chat' && PAGE_INTROS[activeTab] && !dismissedIntros[activeTab] && (
        <ContextualIntro 
          pageName={PAGE_INTROS[activeTab].name}
          title={PAGE_INTROS[activeTab].title}
          description={PAGE_INTROS[activeTab].description}
          isDismissed={false}
          onDismiss={() => dismissIntro(activeTab)}
          onExplainMore={() => {
            dismissIntro(activeTab);
            setActiveTab('chat');
          }}
        />
      )}

      <Sidebar 
        activeId={activeTab} 
        onSelect={setActiveTab}
      />
      
      <div className="xl:pl-64 transition-all">
        <Navbar 
          isBeginnerMode={isBeginnerMode} 
          onToggleMode={toggleMode} 
          theme={theme} 
          onToggleTheme={toggleTheme}
        />
        
        <div className={cn(
          "mx-auto pt-20", 
          activeTab === 'chat' ? "max-w-none h-[calc(100vh-64px)] overflow-hidden" : "max-w-7xl px-6 pb-20"
        )}>
          {!isNewUser && !isBeginnerMode && activeTab === 'dashboard' && (
            <div className="mb-8">
              <MarketTicker />
            </div>
          )}

          {activeTab === 'dashboard' && <GreetingHeader isBeginnerMode={isBeginnerMode} />}
          <div className={cn(activeTab === 'chat' ? "h-full" : "mt-6")}>
            {renderContent()}
          </div>
        </div>
      </div>

      <StoryOnboarding 
        isOpen={isOnboardingOpen}
        onClose={handleComplete}
        onSelectLevel={(isFirstTime) => {
          setActiveTab('dashboard');
          if (isFirstTime) {
            if (!isBeginnerMode) toggleMode(); 
            localStorage.setItem('usemoney_mode', 'beginner');
          } else {
            if (isBeginnerMode) toggleMode();
            localStorage.setItem('usemoney_mode', 'advanced');
          }
          localStorage.setItem('usemoney_onboarded', 'true');
        }}
      />

      <FloatingAI currentPage={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} />
    </main>
  );
}
