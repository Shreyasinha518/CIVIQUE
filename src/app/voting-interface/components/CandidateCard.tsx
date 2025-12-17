'use client';

import React from 'react';
import AppImage from '@/src/components/ui/AppImage';
import Icon from '@/src/components/ui/AppIcon';

interface CandidateCardProps {
  id: string;
  name: string;
  party: string;
  description: string;
  image: string;
  alt: string;
  voteCount: number;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const CandidateCard = ({
  id,
  name,
  party,
  description,
  image,
  alt,
  voteCount,
  isSelected,
  onSelect,
}: CandidateCardProps) => {
  return (
    <button
      onClick={() => onSelect(id)}
      className={`
        w-full text-left p-6 rounded-xl border-2 transition-all duration-200
        ${isSelected 
          ? 'border-primary bg-primary/5 shadow-lg' 
          : 'border-border bg-surface hover:border-primary/50 hover:shadow-card'
        }
        focus-ring
      `}
      aria-pressed={isSelected}
      aria-label={`Vote for ${name} from ${party}`}
    >
      <div className="flex items-start space-x-4">
        {/* Candidate Image */}
        <div className="flex-shrink-0">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 border-border">
            <AppImage
              src={image}
              alt={alt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Candidate Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">
                {name}
              </h3>
              <p className="text-sm font-medium text-primary">{party}</p>
            </div>
            
            {/* Selection Indicator */}
            <div className={`
              flex-shrink-0 ml-3 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200
              ${isSelected 
                ? 'border-primary bg-primary' :'border-border bg-surface'
              }
            `}>
              {isSelected && (
                <Icon name="CheckIcon" size={20} className="text-primary-foreground" />
              )}
            </div>
          </div>

          <p className="text-sm text-text-secondary leading-relaxed mb-3">
            {description}
          </p>

          {/* Vote Count */}
          <div className="flex items-center space-x-2">
            <Icon name="ChartBarIcon" size={16} className="text-text-secondary" />
            <span className="text-xs font-medium text-text-secondary">
              {voteCount.toLocaleString()} votes
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default CandidateCard;