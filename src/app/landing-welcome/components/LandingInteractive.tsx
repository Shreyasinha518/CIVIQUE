'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeroSection from './HeroSection';
import SecurityFeatures from './SecurityFeatures';
import TutorialPreview from './TutorialPreview';
import TrustIndicators from './TrustIndicators';
import AccessibilityHighlight from './AccessibilityHighlight';
import FAQSection from './FAQSection';
import Footer from './Footer';

const LandingInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [voiceOverEnabled, setVoiceOverEnabled] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const savedVoiceOver = localStorage.getItem('voiceOverEnabled');
    if (savedVoiceOver === 'true') {
      setVoiceOverEnabled(true);
    }
  }, [isHydrated]);

  const handleConnectWallet = () => {
    if (!isHydrated) return;
    
    const walletConnected = localStorage.getItem('walletConnected');
    if (walletConnected === 'true') {
      router?.push('/voting-interface');
    } else {
      router?.push('/wallet-connection-tutorial');
    }
  };

  const handleStartTutorial = () => {
    if (!isHydrated) return;
    router?.push('/wallet-connection-tutorial');
  };

  const handleEnableVoiceOver = () => {
    if (!isHydrated) return;
    
    const newState = !voiceOverEnabled;
    setVoiceOverEnabled(newState);
    localStorage.setItem('voiceOverEnabled', String(newState));
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-text-secondary">Loading VoteChain...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        onConnectWallet={handleConnectWallet}
        onStartTutorial={handleStartTutorial}
      />
      <TrustIndicators />
      <SecurityFeatures />
      <TutorialPreview onStartTutorial={handleStartTutorial} />
      <AccessibilityHighlight onEnableVoiceOver={handleEnableVoiceOver} />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default LandingInteractive;
