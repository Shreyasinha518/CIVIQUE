'use client';

import { useEffect, useState } from 'react';
import Icon from '@/src/components/ui/AppIcon';

const VoiceOverFeedback = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const playVoiceOver = () => {
    if (!isHydrated) return;

    setIsPlaying(true);
    
    if ('speechSynthesis' in window) {
      const message = "Congratulations! Your vote has been successfully recorded on the blockchain. Your transaction is confirmed and your participation has been rewarded with an NFT badge. You can now view the live election results or return to cast votes in other elections.";
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onend = () => {
        setIsPlaying(false);
      };
      
      window.speechSynthesis?.speak(utterance);
    }
  };

  const stopVoiceOver = () => {
    if (!isHydrated) return;
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis?.cancel();
      setIsPlaying(false);
    }
  };

  if (!isHydrated) {
    return (
      <button
        disabled
        className="flex items-center space-x-2 px-4 py-2.5 bg-muted text-text-secondary rounded-lg cursor-not-allowed"
        aria-label="Voice feedback loading"
      >
        <Icon name="SpeakerWaveIcon" size={20} />
        <span className="text-sm font-medium">Loading...</span>
      </button>
    );
  }

  return (
    <div className="flex items-center justify-center">
      {!isPlaying ? (
        <button
          onClick={playVoiceOver}
          className="flex items-center space-x-2 px-4 py-2.5 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-all duration-200 focus-ring"
          aria-label="Play voice feedback"
        >
          <Icon name="SpeakerWaveIcon" size={20} />
          <span className="text-sm font-medium">Hear Success Message</span>
        </button>
      ) : (
        <button
          onClick={stopVoiceOver}
          className="flex items-center space-x-2 px-4 py-2.5 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-all duration-200 focus-ring"
          aria-label="Stop voice feedback"
        >
          <Icon name="StopIcon" size={20} />
          <span className="text-sm font-medium">Stop Audio</span>
        </button>
      )}
    </div>
  );
};

export default VoiceOverFeedback;