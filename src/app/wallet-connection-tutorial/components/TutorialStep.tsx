'use client';

import { useState, useEffect } from 'react';
import Icon from '@/src/components/ui/AppIcon';
import AppImage from '@/src/components/ui/AppImage';

interface TutorialStepProps {
  stepNumber: number;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  voiceOverText: string;
  isActive: boolean;
}

const TutorialStep = ({
  stepNumber,
  title,
  description,
  image,
  imageAlt,
  voiceOverText,
  isActive,
}: TutorialStepProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleVoiceOver = () => {
    if (!isHydrated) return;
    
    setIsPlaying(true);
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(voiceOverText);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopVoiceOver = () => {
    if (!isHydrated) return;
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  if (!isActive) return null;

  return (
    <div className="w-full bg-surface rounded-xl border border-border p-6 lg:p-8 shadow-card animate-slide-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <span className="text-xl font-bold text-primary-foreground">{stepNumber}</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        </div>
        
        {isHydrated && (
          <button
            onClick={isPlaying ? stopVoiceOver : handleVoiceOver}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 focus-ring
              ${isPlaying ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground hover:bg-primary/90'}
            `}
            aria-label={isPlaying ? 'Stop voice over' : 'Play voice over'}
          >
            <Icon name={isPlaying ? 'StopIcon' : 'SpeakerWaveIcon'} size={20} />
            <span className="text-sm font-medium hidden sm:inline">
              {isPlaying ? 'Stop' : 'Listen'}
            </span>
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="order-2 lg:order-1 space-y-4">
          <p className="text-lg text-foreground leading-relaxed">{description}</p>
          
          <div className="bg-muted rounded-lg p-4 border-l-4 border-primary">
            <div className="flex items-start space-x-3">
              <Icon name="LightBulbIcon" size={24} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">Quick Tip</p>
                <p className="text-sm text-text-secondary">{voiceOverText}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative w-full h-64 lg:h-80 rounded-lg overflow-hidden bg-muted">
            <AppImage
              src={image}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialStep;