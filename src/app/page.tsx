'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { GreetingHeader } from '@/components/GreetingHeader';
import { DashboardLayout } from '@/components/DashboardLayout';
import { AIAssistantCard } from '@/components/AIAssistantCard';
import { OnboardingModal } from '@/components/OnboardingModal';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useToast } from '@/components/Toast';
import { DashboardSkeleton } from '@/components/Skeleton';
import { StoryOnboarding } from '@/components/StoryOnboarding';
import { ContextualIntro } from '@/components/ContextualIntro';
import { StockSageChat } from '@/components/StockSageChat';
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
  const [activeTab, setActiveTab] = useState('dashboard');
  const { isNewUser } = useTimeGreeting();
  const { theme, toggleTheme } = useTheme();
  const { 
    isOpen: isOnboardingOpen, 
    isBeginnerMode,
    dismissedIntros,
    completeOnboarding, 
    dismissIntro,
    toggleMode
  } = useOnboarding();
  
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [activeTab]);

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
          <>
            {isBeginnerMode && (
              <ContextualIntro
                pageName="Dashboard"
                title="Your Financial Command Center"
                description="This dashboard gives you a high-level view of your net worth, portfolio performance, and AI-driven insights. It's designed to help you spot opportunities at a glance."
                isDismissed={dismissedIntros.includes('Dashboard')}
                onDismiss={() => dismissIntro('Dashboard')}
                onExplainMore={() => showToast("StockSage is preparing a detailed breakdown...", "info")}
              />
            )}
            <DashboardLayout isBeginnerMode={isBeginnerMode}>
              <AIAssistantCard />
            </DashboardLayout>
          </>
        );
      case 'watchlist':
        return (
          <>
            {isBeginnerMode && (
              <ContextualIntro
                pageName="Watchlist"
                title="Track your interests"
                description="Your watchlist is where you keep an eye on stocks you're interested in. AI will analyze them and alert you for buy/sell opportunities."
                isDismissed={dismissedIntros.includes('Watchlist')}
                onDismiss={() => dismissIntro('Watchlist')}
              />
            )}
            <WatchlistEmpty />
          </>
        );
      case 'markets':
        return (
          <>
            {isBeginnerMode && (
              <ContextualIntro
                pageName="Markets"
                title="Global Market Pulse"
                description="A simplified view of market indices, top gainers, and AI summaries of global trends."
                isDismissed={dismissedIntros.includes('Markets')}
                onDismiss={() => dismissIntro('Markets')}
              />
            )}
            <div className="rounded-3xl glass-darker p-20 text-center border border-border-primary">
               <h3 className="text-2xl font-bold text-foreground mb-2">Market View</h3>
               <p className="text-muted">Rendering {isBeginnerMode ? 'Beginner' : 'Advanced'} analytics...</p>
            </div>
          </>
        );
      case 'portfolio':
        return (
          <>
            {isBeginnerMode && (
              <ContextualIntro
                pageName="Portfolio"
                title="Asset Breakdown"
                description="See exactly where your money is. We categorize your holdings by sector, risk, and asset class."
                isDismissed={dismissedIntros.includes('Portfolio')}
                onDismiss={() => dismissIntro('Portfolio')}
              />
            )}
            <div className="rounded-3xl glass-darker p-20 text-center border border-border-primary">
              <h3 className="text-2xl font-bold text-foreground mb-2">Portfolio Analytics</h3>
              <p className="text-muted">Coming soon...</p>
            </div>
          </>
        );
      case 'research':
        return (
          <>
            {isBeginnerMode && (
              <ContextualIntro
                pageName="Research"
                title="AI Stock Research"
                description="Deep dive into any stock. AI roasts company financials and finds hidden risks."
                isDismissed={dismissedIntros.includes('Research')}
                onDismiss={() => dismissIntro('Research')}
              />
            )}
            <div className="rounded-3xl glass-darker p-20 text-center border border-border-primary">
              <h3 className="text-2xl font-bold text-foreground mb-2">AI Research Lab</h3>
              <p className="text-muted">Analyzing 5000+ stocks...</p>
            </div>
          </>
        );
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
      <Sidebar activeId={activeTab} onSelect={setActiveTab} />
      
      <div className="xl:pl-64 transition-all">
        <Navbar 
          isBeginnerMode={isBeginnerMode} 
          onToggleMode={toggleMode} 
          theme={theme} 
          onToggleTheme={toggleTheme}
        />
        
        <div className={cn(
          "mx-auto pt-20", // Push down for Navbar
          activeTab === 'chat' ? "max-w-none h-[calc(100vh-64px)] overflow-hidden" : "max-w-7xl px-6 pb-20"
        )}>
          {/* Ticker now lives inside the content container to avoid floating issues */}
          {!isNewUser && !isBeginnerMode && activeTab === 'dashboard' && (
            <div className="mb-8">
              <MarketTicker />
            </div>
          )}

          {activeTab === 'dashboard' && <GreetingHeader />}
          <div className={cn(activeTab === 'chat' ? "h-full" : "mt-6")}>
            {renderContent()}
          </div>
        </div>
      </div>

      <StoryOnboarding 
        isOpen={isOnboardingOpen}
        onClose={handleComplete}
        onSelectLevel={(isBeginner) => {
          // Explicitly set level from onboarding
          const mode = isBeginner ? 'beginner' : 'advanced';
          localStorage.setItem('usemoney_mode', mode);
          window.location.reload(); // Reload to apply mode globally
        }}
      />

      <FloatingAI currentPage={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} />
    </main>
  );
}
