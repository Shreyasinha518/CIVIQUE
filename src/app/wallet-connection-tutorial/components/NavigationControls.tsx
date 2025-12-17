'use client';

import Icon from '@/src/components/ui/AppIcon';

interface NavigationControlsProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSkip: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

const NavigationControls = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSkip,
  canGoNext,
  canGoPrevious,
}: NavigationControlsProps) => {
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="w-full bg-surface rounded-lg border border-border p-4 shadow-card">
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
        <button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className={`
            w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 focus-ring
            ${canGoPrevious
              ? 'bg-muted text-foreground hover:bg-border'
              : 'bg-muted/50 text-text-secondary cursor-not-allowed opacity-50'
            }
          `}
        >
          <Icon name="ArrowLeftIcon" size={20} />
          <span className="font-medium">Previous</span>
        </button>

        <button
          onClick={onSkip}
          className="w-full sm:w-auto px-6 py-3 text-text-secondary hover:text-foreground transition-colors duration-200 focus-ring rounded-lg font-medium"
        >
          Skip Tutorial
        </button>

        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={`
            w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 focus-ring font-semibold
            ${canGoNext
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-muted/50 text-text-secondary cursor-not-allowed opacity-50'
            }
          `}
        >
          <span>{isLastStep ? 'Finish Tutorial' : 'Next Step'}</span>
          <Icon name={isLastStep ? 'CheckIcon' : 'ArrowRightIcon'} size={20} />
        </button>
      </div>
    </div>
  );
};

export default NavigationControls;