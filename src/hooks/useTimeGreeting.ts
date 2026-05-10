import { useState, useEffect } from 'react';

export type TimeOfDay = 'Morning' | 'Afternoon' | 'Evening' | 'Late Night';

export const useTimeGreeting = () => {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('Morning');
  const [isNewUser, setIsNewUser] = useState(true);
  const [isReturningAfterLongTime, setIsReturningAfterLongTime] = useState(false);

  useEffect(() => {
    const hours = new Date().getHours();
    
    if (hours >= 5 && hours < 12) setTimeOfDay('Morning');
    else if (hours >= 12 && hours < 17) setTimeOfDay('Afternoon');
    else if (hours >= 17 && hours < 21) setTimeOfDay('Evening');
    else setTimeOfDay('Late Night');

    const hasOnboarded = localStorage.getItem('usemoney_onboarded');
    const lastVisit = localStorage.getItem('usemoney_last_visit');
    const now = Date.now();

    setIsNewUser(!hasOnboarded);

    if (lastVisit) {
      const daysSinceLastVisit = (now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24);
      if (daysSinceLastVisit > 30) {
        setIsReturningAfterLongTime(true);
      }
    }

    localStorage.setItem('usemoney_last_visit', now.toString());
  }, []);

  const getGreetingMessage = (userName: string = 'Investor') => {
    // Only use first name
    const firstName = userName.split(' ')[0];

    if (isNewUser) {
      return {
        title: `Welcome to UseMoney, ${firstName} 👋`,
        subtitle: "Let's build your AI investing workspace."
      };
    }

    if (isReturningAfterLongTime) {
      return {
        title: `Welcome back, ${firstName} — it's been a while 👋`,
        subtitle: "A lot has happened in the markets. Let's catch you up."
      };
    }

    const messages = {
      'Morning': `Good Morning, ${firstName} 👋`,
      'Afternoon': `Good Afternoon, ${firstName} ☀️`,
      'Evening': `Good Evening, ${firstName} 🌙`,
      'Late Night': `Burning the midnight oil, ${firstName}? Let's review your portfolio.`
    };

    return {
      title: messages[timeOfDay],
      subtitle: "Your portfolio moved +2.1% today."
    };
  };

  return { timeOfDay, isNewUser, isReturningAfterLongTime, getGreetingMessage };
};
