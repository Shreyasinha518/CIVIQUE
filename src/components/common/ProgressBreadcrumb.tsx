'use client';

import { usePathname } from 'next/navigation';

import Icon from '@/src/components/ui/AppIcon';

interface BreadcrumbStep {
  label: string;
  path: string;
  order: number;
}

const ProgressBreadcrumb = () => {
  const pathname = usePathname();

  const votingWorkflowSteps: BreadcrumbStep[] = [
    { label: 'Voting Interface', path: '/voting-interface', order: 1 },
    { label: 'Confirm Transaction', path: '/transaction-confirmation', order: 2 },
    { label: 'Vote Success', path: '/vote-confirmation-success', order: 3 },
  ];

  const isVotingWorkflow = votingWorkflowSteps.some(step => step.path === pathname);

  if (!isVotingWorkflow) {
    return null;
  }

  const currentStepIndex = votingWorkflowSteps.findIndex(step => step.path === pathname);

  return (
    <nav aria-label="Progress" className="w-full bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Desktop View */}
        <ol className="hidden sm:flex items-center justify-center space-x-4">
          {votingWorkflowSteps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const isUpcoming = index > currentStepIndex;

            return (
              <li key={step.path} className="flex items-center">
                {index > 0 && (
                  <div className={`w-16 h-0.5 mx-4 ${isCompleted ? 'bg-success' : 'bg-border'}`} />
                )}
                
                <div className="flex items-center space-x-3">
                  <div
                    className={`
                      flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200
                      ${isCompleted ? 'bg-success border-success' : ''}
                      ${isCurrent ? 'bg-primary border-primary' : ''}
                      ${isUpcoming ? 'bg-muted border-border' : ''}
                    `}
                  >
                    {isCompleted ? (
                      <Icon name="CheckIcon" size={16} className="text-white" />
                    ) : (
                      <span
                        className={`
                          text-sm font-semibold
                          ${isCurrent ? 'text-primary-foreground' : 'text-text-secondary'}
                        `}
                      >
                        {step.order}
                      </span>
                    )}
                  </div>
                  
                  <span
                    className={`
                      text-sm font-medium whitespace-nowrap
                      ${isCurrent ? 'text-foreground' : ''}
                      ${isCompleted ? 'text-success' : ''}
                      ${isUpcoming ? 'text-text-secondary' : ''}
                    `}
                  >
                    {step.label}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Mobile View */}
        <div className="sm:hidden flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary">
              <span className="text-sm font-bold text-primary-foreground">
                {currentStepIndex + 1}
              </span>
            </div>
            <div>
              <p className="text-xs text-text-secondary font-medium">
                Step {currentStepIndex + 1} of {votingWorkflowSteps.length}
              </p>
              <p className="text-sm font-semibold text-foreground">
                {votingWorkflowSteps[currentStepIndex].label}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            {votingWorkflowSteps.map((_, index) => (
              <div
                key={index}
                className={`
                  w-2 h-2 rounded-full transition-all duration-200
                  ${index <= currentStepIndex ? 'bg-primary' : 'bg-border'}
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ProgressBreadcrumb;