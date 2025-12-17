'use client';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator = ({ currentStep, totalSteps }: ProgressIndicatorProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-surface rounded-lg border border-border p-4 shadow-card">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-foreground">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-primary">
          {Math.round(progressPercentage)}% Complete
        </span>
      </div>
      
      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
          role="progressbar"
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      <div className="flex justify-between mt-3">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div
            key={step}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200
              ${step < currentStep ? 'bg-success text-success-foreground' : ''}
              ${step === currentStep ? 'bg-primary text-primary-foreground scale-110' : ''}
              ${step > currentStep ? 'bg-muted text-text-secondary' : ''}
            `}
          >
            {step < currentStep ? '✓' : step}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;