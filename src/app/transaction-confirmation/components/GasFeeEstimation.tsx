'use client';

import { useState, useEffect } from 'react';
import Icon from '@/src/components/ui/AppIcon';

interface GasFeeEstimationProps {
  ethAmount: number;
  usdEquivalent: number;
  networkCongestion: 'low' | 'medium' | 'high';
}

const GasFeeEstimation = ({ ethAmount, usdEquivalent, networkCongestion }: GasFeeEstimationProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const congestionConfig = {
    low: { color: 'text-success', bg: 'bg-success/10', icon: 'CheckCircleIcon', label: 'Low Congestion' },
    medium: { color: 'text-warning', bg: 'bg-warning/10', icon: 'ExclamationCircleIcon', label: 'Medium Congestion' },
    high: { color: 'text-destructive', bg: 'bg-destructive/10', icon: 'ExclamationTriangleIcon', label: 'High Congestion' },
  };

  const config = congestionConfig[networkCongestion];

  if (!isHydrated) {
    return (
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/3"></div>
          <div className="h-12 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border p-6 space-y-4">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Gas Fee Estimation</h3>
        <div className={`flex items-center space-x-2 px-3 py-1.5 ${config.bg} rounded-full`}>
          <Icon name={config.icon as any} size={16} className={config.color} />
          <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-sm text-text-secondary">Estimated Gas Fee</p>
              <p className="text-3xl font-bold text-foreground mt-1">{ethAmount.toFixed(6)} ETH</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-text-secondary">USD Equivalent</p>
              <p className="text-2xl font-semibold text-primary mt-1">${usdEquivalent.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Base Fee</span>
            <span className="font-medium text-foreground">{(ethAmount * 0.6).toFixed(6)} ETH</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Priority Fee</span>
            <span className="font-medium text-foreground">{(ethAmount * 0.4).toFixed(6)} ETH</span>
          </div>
        </div>

        {networkCongestion === 'high' && (
          <div className="flex items-start space-x-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <Icon name="LightBulbIcon" size={20} className="text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warning">Fee Optimization Tip</p>
              <p className="text-xs text-text-secondary mt-1">Network congestion is high. Consider waiting 10-15 minutes for lower fees.</p>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-border">
          <button className="w-full flex items-center justify-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors">
            <Icon name="InformationCircleIcon" size={16} />
            <span className="font-medium">Learn about gas fees</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GasFeeEstimation;