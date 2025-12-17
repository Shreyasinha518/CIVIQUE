'use client';

import AppImage from '@/src/components/ui/AppImage';
import Icon from '@/src/components/ui/AppIcon';

interface VoteSummaryProps {
  candidateName: string;
  candidateImage: string;
  candidateImageAlt: string;
  electionName: string;
  voteTime: string;
}

const VoteSummary = ({ candidateName, candidateImage, candidateImageAlt, electionName, voteTime }: VoteSummaryProps) => {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-xl p-6 space-y-4">
      <div className="flex items-center space-x-2 pb-3 border-b border-primary/20">
        <Icon name="CheckBadgeIcon" size={24} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Your Vote Summary</h2>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary/20">
            <AppImage
              src={candidateImage}
              alt={candidateImageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-success rounded-full flex items-center justify-center border-2 border-surface">
            <Icon name="CheckIcon" size={16} className="text-white" />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground">{candidateName}</h3>
          <p className="text-sm text-text-secondary mt-1">{electionName}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-3 border-t border-primary/20">
        <div>
          <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">Vote Cast At</label>
          <p className="text-sm font-semibold text-foreground mt-1">{voteTime}</p>
        </div>
        <div>
          <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">Status</label>
          <div className="flex items-center space-x-1 mt-1">
            <div className="w-2 h-2 bg-success rounded-full" />
            <span className="text-sm font-semibold text-success">Confirmed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteSummary;