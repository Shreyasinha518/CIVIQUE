'use client';

import { useState, useEffect } from 'react';
import AppImage from '@/src/components/ui/AppImage';
import Icon from '@/src/components/ui/AppIcon';

interface NFTBadgeRewardProps {
  badgeName: string;
  badgeImage: string;
  badgeImageAlt: string;
  pointsEarned: number;
}

const NFTBadgeReward = ({ badgeName, badgeImage, badgeImageAlt, pointsEarned }: NFTBadgeRewardProps) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/30 rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-accent/20">
        <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="SparklesIcon" size={24} className="text-accent" />
          <span>Reward Unlocked!</span>
        </h2>
        <div className="px-3 py-1 bg-accent/20 rounded-full">
          <span className="text-sm font-bold text-accent">+{pointsEarned} Points</span>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className={`relative ${isAnimating ? 'animate-bounce' : ''}`}>
          <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-accent/30 shadow-lg">
            <AppImage
              src={badgeImage}
              alt={badgeImageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -top-2 -right-2 w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <Icon name="StarIcon" size={20} className="text-white" />
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-bold text-foreground">{badgeName}</h3>
          <p className="text-sm text-text-secondary mt-1">
            Commemorative NFT Badge for participating in this election
          </p>
        </div>

        <div className="w-full grid grid-cols-2 gap-3">
          <div className="bg-surface/50 rounded-lg p-3 text-center">
            <Icon name="TrophyIcon" size={24} className="text-warning mx-auto mb-1" />
            <p className="text-xs text-text-secondary">Achievement</p>
            <p className="text-sm font-semibold text-foreground">Voter</p>
          </div>
          <div className="bg-surface/50 rounded-lg p-3 text-center">
            <Icon name="FireIcon" size={24} className="text-destructive mx-auto mb-1" />
            <p className="text-xs text-text-secondary">Streak</p>
            <p className="text-sm font-semibold text-foreground">1 Vote</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTBadgeReward;