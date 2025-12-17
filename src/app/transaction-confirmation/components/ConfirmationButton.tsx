'use client';

import { useState } from 'react';
import Icon from '@/src/components/ui/AppIcon';

interface ConfirmationButtonProps {
  onConfirm: () => void;
  disabled: boolean;
}

const ConfirmationButton = ({ onConfirm, disabled }: ConfirmationButtonProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = () => {
    if (disabled || isProcessing) return;
    setIsProcessing(true);
    onConfirm();
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleClick}
        disabled={disabled || isProcessing}
        className={`
          w-full flex items-center justify-center space-x-3 px-8 py-4 rounded-lg text-lg font-semibold
          transition-all duration-200 focus-ring
          ${disabled || isProcessing
            ? 'bg-muted text-text-secondary cursor-not-allowed' :'bg-primary text-primary-foreground hover:bg-primary/90 active:scale-98'
          }
        `}
      >
        {isProcessing ? (
          <>
            <div className="w-6 h-6 border-3 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Icon name="CheckCircleIcon" size={24} />
            <span>Confirm Transaction</span>
          </>
        )}
      </button>

      <div className="flex items-start space-x-2 p-4 bg-muted rounded-lg">
        <Icon name="ShieldCheckIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-foreground">MetaMask Confirmation Required</p>
          <p className="text-xs text-text-secondary mt-1">After clicking confirm, approve the transaction in your MetaMask wallet popup.</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationButton;