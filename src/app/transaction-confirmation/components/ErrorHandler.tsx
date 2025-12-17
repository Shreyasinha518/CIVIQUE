import React from 'react';
import Icon from '@/src/components/ui/AppIcon';

interface ErrorHandlerProps {
  errorType: 'insufficient_funds' | 'network_error' | 'rejected' | 'timeout';
  onRetry: () => void;
  onCancel: () => void;
}

const ErrorHandler = ({ errorType, onRetry, onCancel }: ErrorHandlerProps) => {
  const errorConfig = {
    insufficient_funds: {
      title: 'Insufficient Funds',
      message: 'Your wallet does not have enough ETH to cover the gas fee for this transaction.',
      solution: 'Add more ETH to your wallet or try again when network fees are lower.',
      icon: 'CurrencyDollarIcon',
    },
    network_error: {
      title: 'Network Connection Issue',
      message: 'Unable to connect to the Ethereum network. Please check your internet connection.',
      solution: 'Verify your connection and try again. If the problem persists, check network status.',
      icon: 'WifiIcon',
    },
    rejected: {
      title: 'Transaction Rejected',
      message: 'You rejected the transaction in MetaMask.',
      solution: 'Click retry to attempt the transaction again, or cancel to return to voting.',
      icon: 'XCircleIcon',
    },
    timeout: {
      title: 'Transaction Timeout',
      message: 'The transaction took too long to process and has timed out.',
      solution: 'Network congestion may be high. Try again or wait for better network conditions.',
      icon: 'ClockIcon',
    },
  };

  const config = errorConfig[errorType];

  return (
    <div className="bg-surface rounded-lg border-2 border-destructive/20 p-6 space-y-4">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
          <Icon name={config.icon as any} size={24} className="text-destructive" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-destructive">{config.title}</h3>
          <p className="text-sm text-foreground mt-2">{config.message}</p>
        </div>
      </div>

      <div className="p-4 bg-muted rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="LightBulbIcon" size={18} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Suggested Solution</p>
            <p className="text-sm text-text-secondary mt-1">{config.solution}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={onRetry}
          className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 focus-ring"
        >
          <Icon name="ArrowPathIcon" size={18} />
          <span className="font-medium">Retry Transaction</span>
        </button>
        <button
          onClick={onCancel}
          className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-muted text-foreground rounded-lg hover:bg-border transition-all duration-200 focus-ring"
        >
          <Icon name="XMarkIcon" size={18} />
          <span className="font-medium">Cancel</span>
        </button>
      </div>

      <div className="pt-4 border-t border-border">
        <button className="w-full flex items-center justify-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors">
          <Icon name="QuestionMarkCircleIcon" size={16} />
          <span className="font-medium">Get Help</span>
        </button>
      </div>
    </div>
  );
};

export default ErrorHandler;