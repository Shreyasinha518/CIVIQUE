import React from 'react';
import Icon from '@/src/components/ui/AppIcon';

interface ElectionHeaderProps {
  title: string;
  description: string;
  endDate: string;
  totalVotes: number;
}

const ElectionHeader = ({ title, description, endDate, totalVotes }: ElectionHeaderProps) => {
  return (
    <div className="bg-surface border border-border rounded-xl p-6 mb-6 shadow-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            {title}
          </h1>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
            {description}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="CheckCircleIcon" size={28} className="text-primary" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="CalendarIcon" size={20} className="text-accent" />
          </div>
          <div>
            <p className="text-xs text-text-secondary font-medium">Voting Ends</p>
            <p className="text-sm font-semibold text-foreground">{endDate}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="UsersIcon" size={20} className="text-secondary" />
          </div>
          <div>
            <p className="text-xs text-text-secondary font-medium">Total Votes Cast</p>
            <p className="text-sm font-semibold text-foreground">{totalVotes.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionHeader;