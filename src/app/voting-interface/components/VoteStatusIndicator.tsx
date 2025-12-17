import React from 'react';
import Icon from '@/src/components/ui/AppIcon';

interface VoteStatusIndicatorProps {
  hasVoted: boolean;
  walletAddress: string;
}

const VoteStatusIndicator = ({ hasVoted, walletAddress }: VoteStatusIndicatorProps) => {
  if (hasVoted) {
    return (
      <div className="bg-success/10 border border-success/20 rounded-xl p-5">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-10 h-10 bg-success rounded-lg flex items-center justify-center">
            <Icon name="CheckCircleIcon" size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-success mb-1">Vote Already Cast</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Your wallet has already voted in this election. One vote per wallet is enforced by the blockchain.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-xl p-5">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="ShieldCheckIcon" size={24} className="text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-primary mb-1">Ready to Vote</h3>
          <p className="text-xs text-text-secondary leading-relaxed mb-2">
            Your wallet is eligible to cast one vote in this election.
          </p>
          <div className="flex items-center space-x-2">
            <Icon name="WalletIcon" size={14} className="text-text-secondary" />
            <span className="text-xs font-mono text-text-secondary">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteStatusIndicator;