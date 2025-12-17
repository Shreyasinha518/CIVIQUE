'use client';

import { useState, useEffect } from 'react';
import Icon from '@/src/components/ui/AppIcon';

interface TransactionStatusProps {
  status: 'pending' | 'confirming' | 'success' | 'error';
  message: string;
  progress: number;
}

const TransactionStatus = ({ status, message, progress }: TransactionStatusProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const statusConfig = {
    pending: {
      icon: 'ClockIcon',
      color: 'text-warning',
      bg: 'bg-warning/10',
      border: 'border-warning/20',
      label: 'Pending',
    },
    confirming: {
      icon: 'ArrowPathIcon',
      color: 'text-primary',
      bg: 'bg-primary/10',
      border: 'border-primary/20',
      label: 'Confirming',
    },
    success: {
      icon: 'CheckCircleIcon',
      color: 'text-success',
      bg: 'bg-success/10',
      border: 'border-success/20',
      label: 'Success',
    },
    error: {
      icon: 'XCircleIcon',
      color: 'text-destructive',
      bg: 'bg-destructive/10',
      border: 'border-destructive/20',
      label: 'Error',
    },
  };

  const config = statusConfig[status];

  if (!isHydrated) {
    return (
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="h-2 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-surface rounded-lg border-2 ${config.border} p-6 space-y-4`}>
      <div className="flex items-center space-x-3">
        <div className={`w-12 h-12 rounded-full ${config.bg} flex items-center justify-center`}>
          <Icon
            name={config.icon as any}
            size={24}
            className={`${config.color} ${status === 'confirming' ? 'animate-spin' : ''}`}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-semibold ${config.color}`}>{config.label}</h3>
            {status === 'confirming' && (
              <span className="text-sm font-medium text-text-secondary">{progress}%</span>
            )}
          </div>
          <p className="text-sm text-text-secondary mt-1">{message}</p>
        </div>
      </div>

      {status === 'confirming' && (
        <div className="space-y-2">
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-text-secondary text-center">Estimated time: 30-60 seconds</p>
        </div>
      )}

      {status === 'error' && (
        <div className="pt-4 border-t border-border">
          <button className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors focus-ring">
            <Icon name="ArrowPathIcon" size={18} />
            <span className="text-sm font-medium">Retry Transaction</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionStatus;