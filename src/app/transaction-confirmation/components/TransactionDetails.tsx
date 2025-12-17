'use client';

import { useState } from 'react';
import Icon from '@/src/components/ui/AppIcon';

interface TransactionDetailsProps {
  contractAddress: string;
  blockchainNetwork: string;
  transactionType: string;
  estimatedTime: string;
}

const TransactionDetails = ({ contractAddress, blockchainNetwork, transactionType, estimatedTime }: TransactionDetailsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Icon name="CodeBracketIcon" size={20} className="text-accent" />
          </div>
          <div className="text-left">
            <h3 className="text-base font-semibold text-foreground">Transaction Details</h3>
            <p className="text-sm text-text-secondary">View blockchain interaction information</p>
          </div>
        </div>
        <Icon
          name="ChevronDownIcon"
          size={20}
          className={`text-text-secondary transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 space-y-4 border-t border-border pt-4">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">Smart Contract</label>
              <div className="flex items-center justify-between mt-1 p-3 bg-muted rounded-lg">
                <span className="text-sm font-mono text-foreground">{truncateAddress(contractAddress)}</span>
                <button
                  onClick={() => copyToClipboard(contractAddress)}
                  className="p-1.5 hover:bg-background rounded transition-colors focus-ring"
                  aria-label="Copy contract address"
                >
                  <Icon name="ClipboardDocumentIcon" size={16} className="text-text-secondary" />
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">Network</label>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="GlobeAltIcon" size={14} className="text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{blockchainNetwork}</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">Transaction Type</label>
              <p className="text-sm font-medium text-foreground mt-1">{transactionType}</p>
            </div>

            <div>
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">Estimated Completion</label>
              <div className="flex items-center space-x-2 mt-1">
                <Icon name="ClockIcon" size={16} className="text-text-secondary" />
                <span className="text-sm font-medium text-foreground">{estimatedTime}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex items-start space-x-2 p-3 bg-primary/5 rounded-lg">
              <Icon name="InformationCircleIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-primary">Blockchain Verification</p>
                <p className="text-xs text-text-secondary mt-1">Your vote will be permanently recorded on the blockchain and cannot be altered or deleted.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionDetails;