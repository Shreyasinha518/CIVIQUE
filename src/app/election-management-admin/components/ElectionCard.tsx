'use client';

import { useState } from 'react';
import Icon from '@/src/components/ui/AppIcon';

interface Election {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  startTime: string;
  endTime: string;
  participantCount: number;
  totalVotes: number;
  candidates: string[];
}

interface ElectionCardProps {
  election: Election;
  onStart: (id: string) => void;
  onPause: (id: string) => void;
  onStop: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ElectionCard = ({ election, onStart, onPause, onStop, onEdit, onDelete }: ElectionCardProps) => {
  const [showActions, setShowActions] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'paused':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'completed':
        return 'bg-muted text-text-secondary border-border';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return 'PlayIcon';
      case 'paused':
        return 'PauseIcon';
      case 'completed':
        return 'CheckCircleIcon';
      default:
        return 'DocumentTextIcon';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 hover:shadow-card transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-foreground">{election.title}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(election.status)}`}>
              <Icon name={getStatusIcon(election.status) as any} size={14} className="inline mr-1" />
              {election.status.charAt(0).toUpperCase() + election.status.slice(1)}
            </span>
          </div>
          <p className="text-sm text-text-secondary line-clamp-2">{election.description}</p>
        </div>
        
        <div className="relative ml-4">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-2 hover:bg-muted rounded-lg transition-colors focus-ring"
            aria-label="Election actions"
          >
            <Icon name="EllipsisVerticalIcon" size={20} className="text-text-secondary" />
          </button>
          
          {showActions && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowActions(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-lg shadow-modal py-2 z-20">
                <button
                  onClick={() => {
                    onEdit(election.id);
                    setShowActions(false);
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-muted transition-colors text-left"
                >
                  <Icon name="PencilIcon" size={16} className="text-text-secondary" />
                  <span className="text-sm text-foreground">Edit</span>
                </button>
                <button
                  onClick={() => {
                    onDelete(election.id);
                    setShowActions(false);
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-destructive/10 transition-colors text-left"
                >
                  <Icon name="TrashIcon" size={16} className="text-destructive" />
                  <span className="text-sm text-destructive">Delete</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-text-secondary mb-1">Start Time</p>
          <p className="text-sm font-medium text-foreground">{election.startTime}</p>
        </div>
        <div>
          <p className="text-xs text-text-secondary mb-1">End Time</p>
          <p className="text-sm font-medium text-foreground">{election.endTime}</p>
        </div>
        <div>
          <p className="text-xs text-text-secondary mb-1">Participants</p>
          <p className="text-sm font-medium text-foreground">{election.participantCount}</p>
        </div>
        <div>
          <p className="text-xs text-text-secondary mb-1">Total Votes</p>
          <p className="text-sm font-medium text-foreground">{election.totalVotes}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {election.status === 'draft' && (
          <button
            onClick={() => onStart(election.id)}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-success text-white rounded-lg hover:bg-success/90 transition-colors focus-ring"
          >
            <Icon name="PlayIcon" size={16} />
            <span className="text-sm font-medium">Start</span>
          </button>
        )}
        
        {election.status === 'active' && (
          <>
            <button
              onClick={() => onPause(election.id)}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-warning text-white rounded-lg hover:bg-warning/90 transition-colors focus-ring"
            >
              <Icon name="PauseIcon" size={16} />
              <span className="text-sm font-medium">Pause</span>
            </button>
            <button
              onClick={() => onStop(election.id)}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-destructive text-white rounded-lg hover:bg-destructive/90 transition-colors focus-ring"
            >
              <Icon name="StopIcon" size={16} />
              <span className="text-sm font-medium">Stop</span>
            </button>
          </>
        )}
        
        {election.status === 'paused' && (
          <button
            onClick={() => onStart(election.id)}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-success text-white rounded-lg hover:bg-success/90 transition-colors focus-ring"
          >
            <Icon name="PlayIcon" size={16} />
            <span className="text-sm font-medium">Resume</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ElectionCard;