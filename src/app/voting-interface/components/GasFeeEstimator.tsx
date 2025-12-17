import React from 'react';
import Icon from '@/src/components/ui/AppIcon';

interface GasFeeEstimatorProps {
  gasFeeETH: string;
  gasFeeUSD: string;
  estimatedTime: string;
}

const GasFeeEstimator = ({ gasFeeETH, gasFeeUSD, estimatedTime }: GasFeeEstimatorProps) => {
  return (
    <div className="bg-muted border border-border rounded-xl p-5">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="BoltIcon" size={20} className="text-warning" />
        <h3 className="text-sm font-semibold text-foreground">Transaction Fee Estimate</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Gas Fee (ETH)</span>
          <span className="text-base font-bold text-foreground font-mono">{gasFeeETH}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Equivalent (USD)</span>
          <span className="text-base font-semibold text-foreground">${gasFeeUSD}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-sm text-text-secondary">Estimated Time</span>
          <div className="flex items-center space-x-1">
            <Icon name="ClockIcon" size={16} className="text-text-secondary" />
            <span className="text-sm font-medium text-foreground">{estimatedTime}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="InformationCircleIcon" size={18} className="text-warning flex-shrink-0 mt-0.5" />
          <p className="text-xs text-text-secondary leading-relaxed">
            Gas fees vary based on network congestion. This is an estimate and may change before confirmation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GasFeeEstimator;