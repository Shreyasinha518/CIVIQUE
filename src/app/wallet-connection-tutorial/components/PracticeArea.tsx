'use client';

import { useState, useEffect } from 'react';
import Icon from '@/src/components/ui/AppIcon';

interface PracticeAreaProps {
  onComplete: () => void;
}

const PracticeArea = ({ onComplete }: PracticeAreaProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isPracticing, setIsPracticing] = useState(false);
  const [practiceStep, setPracticeStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const practiceSteps = [
    { action: 'Click "Connect Wallet"', icon: 'CursorArrowRaysIcon' },
    { action: 'Review wallet details', icon: 'EyeIcon' },
    { action: 'Confirm connection', icon: 'CheckCircleIcon' },
  ];

  const handleStartPractice = () => {
    if (!isHydrated) return;
    setIsPracticing(true);
    setPracticeStep(0);
    setShowSuccess(false);
  };

  const handleNextStep = () => {
    if (!isHydrated) return;
    
    if (practiceStep < practiceSteps.length - 1) {
      setPracticeStep(practiceStep + 1);
    } else {
      setShowSuccess(true);
      setTimeout(() => {
        setIsPracticing(false);
        setPracticeStep(0);
        setShowSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl border-2 border-dashed border-accent p-6 lg:p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
          <Icon name="AcademicCapIcon" size={24} className="text-accent-foreground" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">Practice Mode</h3>
          <p className="text-sm text-text-secondary">Try connecting without real transactions</p>
        </div>
      </div>

      {!isPracticing && !showSuccess && (
        <div className="space-y-4">
          <p className="text-foreground leading-relaxed">
            Practice the wallet connection process in a safe environment. No real blockchain transactions will occur.
          </p>
          
          <button
            onClick={handleStartPractice}
            className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all duration-200 focus-ring text-lg font-semibold"
          >
            <Icon name="PlayIcon" size={24} />
            <span>Start Practice Session</span>
          </button>
        </div>
      )}

      {isPracticing && !showSuccess && isHydrated && (
        <div className="space-y-6">
          <div className="bg-surface rounded-lg p-6 border border-border">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name={practiceSteps[practiceStep].icon as any} size={32} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-text-secondary font-medium mb-1">
                  Step {practiceStep + 1} of {practiceSteps.length}
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {practiceSteps[practiceStep].action}
                </p>
              </div>
            </div>

            <div className="flex space-x-2">
              {practiceSteps.map((_, index) => (
                <div
                  key={index}
                  className={`
                    flex-1 h-2 rounded-full transition-all duration-300
                    ${index <= practiceStep ? 'bg-primary' : 'bg-muted'}
                  `}
                />
              ))}
            </div>
          </div>

          <button
            onClick={handleNextStep}
            className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 focus-ring text-lg font-semibold"
          >
            <span>{practiceStep === practiceSteps.length - 1 ? 'Complete Practice' : 'Next Step'}</span>
            <Icon name="ArrowRightIcon" size={20} />
          </button>
        </div>
      )}

      {showSuccess && (
        <div className="text-center space-y-4 animate-slide-in">
          <div className="w-20 h-20 rounded-full bg-success mx-auto flex items-center justify-center">
            <Icon name="CheckIcon" size={40} className="text-success-foreground" />
          </div>
          <h4 className="text-2xl font-bold text-success">Practice Complete!</h4>
          <p className="text-foreground">
            You&apos;re ready to connect your real wallet and start voting.
          </p>
        </div>
      )}
    </div>
  );
};

export default PracticeArea;