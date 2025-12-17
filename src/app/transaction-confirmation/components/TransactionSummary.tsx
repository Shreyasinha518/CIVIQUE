import React from 'react';
import Icon from '@/src/components/ui/AppIcon';

interface Candidate {
  id: number;
  name: string;
  party: string;
}

interface Election {
  id: number;
  title: string;
  description: string;
}

interface TransactionSummaryProps {
  selectedCandidate: Candidate;
  election: Election;
  timestamp: string;
}

const TransactionSummary = ({ selectedCandidate, election, timestamp }: TransactionSummaryProps) => {
  return (
    <div className="bg-surface rounded-lg border border-border p-6 space-y-4">
      <div className="flex items-center space-x-3 pb-4 border-b border-border">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon name="DocumentCheckIcon" size={24} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Vote Summary</h2>
          <p className="text-sm text-text-secondary">Review your selection before confirming</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">Election</label>
          <p className="text-base font-semibold text-foreground mt-1">{election.title}</p>
          <p className="text-sm text-text-secondary mt-1">{election.description}</p>
        </div>

        <div>
          <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">Your Vote</label>
          <div className="mt-2 p-4 bg-primary/5 border-2 border-primary/20 rounded-lg">
            <p className="text-lg font-bold text-primary">{selectedCandidate.name}</p>
            <p className="text-sm text-text-secondary mt-1">{selectedCandidate.party}</p>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">Timestamp</label>
          <div className="flex items-center space-x-2 mt-1">
            <Icon name="ClockIcon" size={16} className="text-text-secondary" />
            <p className="text-sm text-foreground">{timestamp}</p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <div className="flex items-start space-x-2 p-3 bg-success/10 rounded-lg">
          <Icon name="ShieldCheckIcon" size={20} className="text-success flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-success">Vote Encryption Active</p>
            <p className="text-xs text-text-secondary mt-1">Your vote will be anonymized using zero-knowledge proof technology</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionSummary;