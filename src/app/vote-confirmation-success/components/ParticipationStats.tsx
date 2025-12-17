'use client';

import Icon from '@/src/components/ui/AppIcon';

interface Stat {
  label: string;
  value: string;
  icon: string;
  color: string;
}

const ParticipationStats = () => {
  const stats: Stat[] = [
    {
      label: 'Total Votes Cast',
      value: '1',
      icon: 'CheckCircleIcon',
      color: 'text-primary',
    },
    {
      label: 'Voting Streak',
      value: '1 Election',
      icon: 'FireIcon',
      color: 'text-warning',
    },
    {
      label: 'Community Rank',
      value: 'Active Voter',
      icon: 'TrophyIcon',
      color: 'text-accent',
    },
    {
      label: 'Points Earned',
      value: '100',
      icon: 'StarIcon',
      color: 'text-success',
    },
  ];

  return (
    <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
      <div className="flex items-center space-x-2 pb-3 border-b border-border">
        <Icon name="ChartBarIcon" size={24} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Your Participation</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-muted rounded-lg p-4 hover:bg-border transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-lg bg-surface flex items-center justify-center ${stat.color}`}>
                <Icon name={stat.icon as any} size={24} />
              </div>
              <div>
                <p className="text-xs text-text-secondary font-medium">{stat.label}</p>
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-secondary">Next Milestone</span>
          <span className="text-sm font-semibold text-primary">5 Votes</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-accent w-1/5 transition-all duration-500" />
        </div>
        <p className="text-xs text-text-secondary mt-2 text-center">
          4 more votes to unlock &quot;Dedicated Voter&quot; badge
        </p>
      </div>
    </div>
  );
};

export default ParticipationStats;