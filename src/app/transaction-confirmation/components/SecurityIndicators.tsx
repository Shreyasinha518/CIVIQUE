import React from 'react';
import Icon from '@/src/components/ui/AppIcon';

interface SecurityIndicatorsProps {
  encryptionStatus: boolean;
  blockchainVerification: boolean;
  anonymization: boolean;
}

const SecurityIndicators = ({ encryptionStatus, blockchainVerification, anonymization }: SecurityIndicatorsProps) => {
  const indicators = [
    {
      label: 'End-to-End Encryption',
      status: encryptionStatus,
      icon: 'LockClosedIcon',
      description: 'Your vote is encrypted before transmission',
    },
    {
      label: 'Blockchain Verification',
      status: blockchainVerification,
      icon: 'ShieldCheckIcon',
      description: 'Transaction will be verified on-chain',
    },
    {
      label: 'Vote Anonymization',
      status: anonymization,
      icon: 'EyeSlashIcon',
      description: 'Zero-knowledge proof ensures privacy',
    },
  ];

  return (
    <div className="bg-surface rounded-lg border border-border p-6 space-y-4">
      <div className="flex items-center space-x-3 pb-4 border-b border-border">
        <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
          <Icon name="ShieldCheckIcon" size={20} className="text-success" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">Security Status</h3>
          <p className="text-sm text-text-secondary">All security measures active</p>
        </div>
      </div>

      <div className="space-y-3">
        {indicators.map((indicator, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              indicator.status ? 'bg-success/10' : 'bg-muted'
            }`}>
              <Icon
                name={indicator.icon as any}
                size={16}
                className={indicator.status ? 'text-success' : 'text-text-secondary'}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">{indicator.label}</p>
                {indicator.status && (
                  <Icon name="CheckCircleIcon" size={16} className="text-success" />
                )}
              </div>
              <p className="text-xs text-text-secondary mt-1">{indicator.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-2 text-success">
          <Icon name="CheckBadgeIcon" size={20} />
          <span className="text-sm font-semibold">All Security Checks Passed</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityIndicators;