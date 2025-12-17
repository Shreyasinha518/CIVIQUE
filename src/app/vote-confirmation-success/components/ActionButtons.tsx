'use client';

import Link from 'next/link';
import Icon from '@/src/components/ui/AppIcon';

const ActionButtons = () => {
  return (
    <div className="space-y-4">
      <Link
        href="/vote-confirmation-success"
        className="flex items-center justify-center space-x-2 w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-200 focus-ring shadow-lg hover:shadow-xl"
      >
        <Icon name="ChartBarIcon" size={24} />
        <span className="text-lg font-semibold">View Live Results</span>
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link
          href="/voting-interface"
          className="flex items-center justify-center space-x-2 px-4 py-3 bg-surface border border-border text-foreground rounded-lg hover:bg-muted transition-all duration-200 focus-ring"
        >
          <Icon name="ArrowLeftIcon" size={20} />
          <span className="text-sm font-medium">Back to Elections</span>
        </Link>

        <Link
          href="/vote-confirmation-success"
          className="flex items-center justify-center space-x-2 px-4 py-3 bg-surface border border-border text-foreground rounded-lg hover:bg-muted transition-all duration-200 focus-ring"
        >
          <Icon name="ClockIcon" size={20} />
          <span className="text-sm font-medium">Voting History</span>
        </Link>
      </div>
    </div>
  );
};

export default ActionButtons;