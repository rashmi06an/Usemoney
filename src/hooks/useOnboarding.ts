import { useState, useEffect } from 'react';

export const useOnboarding = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isBeginnerMode, setIsBeginnerMode] = useState(true);
  const [dismissedIntros, setDismissedIntros] = useState<string[]>([]);

  useEffect(() => {
    const hasOnboarded = localStorage.getItem('usemoney_onboarded');
    const mode = localStorage.getItem('usemoney_mode');
    const intros = localStorage.getItem('usemoney_dismissed_intros');

    if (!hasOnboarded) {
      setIsOpen(true);
    }

    if (mode) {
      setIsBeginnerMode(mode === 'beginner');
    }

    if (intros) {
      setDismissedIntros(JSON.parse(intros));
    }
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem('usemoney_onboarded', 'true');
    setIsOpen(false);
  };

  const setLevel = (isBeginner: boolean) => {
    setIsBeginnerMode(isBeginner);
    localStorage.setItem('usemoney_mode', isBeginner ? 'beginner' : 'advanced');
  };

  const toggleMode = () => {
    const newMode = !isBeginnerMode;
    setIsBeginnerMode(newMode);
    localStorage.setItem('usemoney_mode', newMode ? 'beginner' : 'advanced');
  };

  const dismissIntro = (pageName: string) => {
    const newIntros = [...dismissedIntros, pageName];
    setDismissedIntros(newIntros);
    localStorage.setItem('usemoney_dismissed_intros', JSON.stringify(newIntros));
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => Math.max(0, prev - 1));

  return { 
    isOpen, 
    currentStep, 
    isBeginnerMode, 
    dismissedIntros,
    nextStep, 
    prevStep, 
    completeOnboarding, 
    setIsOpen,
    toggleMode,
    dismissIntro
  };
};
