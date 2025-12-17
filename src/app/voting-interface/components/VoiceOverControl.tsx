'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/src/components/ui/AppIcon';

interface VoiceOverControlProps {
  text: string;
}

const VoiceOverControl = ({ text }: VoiceOverControlProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
    }
  }, [isHydrated]);

  const handleSpeak = () => {
    if (!isHydrated || !isSupported) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  if (!isHydrated) {
    return (
      <button
        disabled
        className="flex items-center space-x-2 px-4 py-2 bg-muted text-text-secondary rounded-lg cursor-not-allowed"
        aria-label="Voice over loading"
      >
        <Icon name="SpeakerWaveIcon" size={20} />
        <span className="text-sm font-medium">Voice Guide</span>
      </button>
    );
  }

  if (!isSupported) {
    return null;
  }

  return (
    <button
      onClick={handleSpeak}
      className={`
        flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 focus-ring
        ${isPlaying 
          ? 'bg-accent text-accent-foreground' 
          : 'bg-muted text-foreground hover:bg-border'
        }
      `}
      aria-label={isPlaying ? 'Stop voice guide' : 'Play voice guide'}
    >
      <Icon 
        name={isPlaying ? 'SpeakerXMarkIcon' : 'SpeakerWaveIcon'} 
        size={20} 
      />
      <span className="text-sm font-medium">
        {isPlaying ? 'Stop' : 'Voice Guide'}
      </span>
    </button>
  );
};

export default VoiceOverControl;