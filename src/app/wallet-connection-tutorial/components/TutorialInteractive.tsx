'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TutorialStep from './TutorialStep';
import ProgressIndicator from './ProgressIndicator';
import PracticeArea from './PracticeArea';
import ConceptCard from './ConceptCard';
import NavigationControls from './NavigationControls';

interface TutorialData {
  stepNumber: number;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  voiceOverText: string;
}

const TutorialInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPractice, setShowPractice] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const tutorialSteps: TutorialData[] = [
  {
    stepNumber: 1,
    title: 'What is a Blockchain Wallet?',
    description: 'A blockchain wallet is like a digital ID card that lets you participate in secure online voting. Think of it as your personal voting booth that only you can access. No one else can see how you vote, and your vote cannot be changed once submitted.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_149e59688-1764643919491.png",
    imageAlt: 'Digital wallet interface showing secure blockchain connection with lock icon and encrypted data visualization',
    voiceOverText: 'A blockchain wallet is your secure digital identity for voting. It keeps your vote private and safe, just like a locked ballot box.'
  },
  {
    stepNumber: 2,
    title: 'Installing MetaMask Wallet',
    description: 'MetaMask is a free wallet that works in your web browser. Click the MetaMask icon in your browser, or visit metamask.io to install it. The installation takes less than 2 minutes. Once installed, you will see a small fox icon in your browser toolbar.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_142d275a2-1764708685303.png",
    imageAlt: 'Browser extension installation screen showing MetaMask fox logo with download button and installation progress bar',
    voiceOverText: 'Installing MetaMask is easy. Just click the download button and follow the simple steps. Look for the orange fox icon when done.'
  },
  {
    stepNumber: 3,
    title: 'Creating Your Wallet Account',
    description: 'After installing MetaMask, click "Create a Wallet" and set a strong password. You will receive a secret recovery phrase - write this down on paper and keep it safe. Never share this phrase with anyone. This phrase is the only way to recover your wallet if you forget your password.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bf1e2e91-1765409696959.png",
    imageAlt: 'Wallet creation screen displaying password setup form and 12-word recovery phrase with security warning message',
    voiceOverText: 'Create your wallet by choosing a password and saving your recovery phrase. Keep this phrase secret and safe - it is like the key to your voting booth.'
  },
  {
    stepNumber: 4,
    title: 'Connecting to VoteChain',
    description: 'Once your wallet is ready, click the "Connect Wallet" button on VoteChain. A popup will appear asking for permission to connect. Click "Connect" to link your wallet to the voting platform. You only need to do this once.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_174f7db22-1765810619215.png",
    imageAlt: 'VoteChain connection screen showing MetaMask popup with connect button and wallet address confirmation',
    voiceOverText: 'Connect your wallet to VoteChain by clicking the connect button. Approve the connection in the popup window that appears.'
  },
  {
    stepNumber: 5,
    title: 'Understanding Gas Fees',
    description: 'Gas fees are small transaction costs paid to process your vote on the blockchain. Think of it like a postage stamp for sending your vote. The fee is usually very small (less than $1) and ensures your vote is recorded permanently and securely.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d462745f-1765164137630.png",
    imageAlt: 'Gas fee estimation display showing cost breakdown with dollar amount and transaction speed options',
    voiceOverText: 'Gas fees are tiny costs to record your vote securely. They are like paying for a stamp to mail your ballot, usually less than one dollar.'
  },
  {
    stepNumber: 6,
    title: 'Casting Your Vote',
    description: 'Select your preferred candidate and click "Submit Vote". Review the transaction details including the gas fee. Click "Confirm" in your MetaMask wallet to cast your vote. Your vote will be recorded on the blockchain within seconds and cannot be changed.',
    image: "https://images.unsplash.com/photo-1651044126288-9e51a7991bd1",
    imageAlt: 'Voting interface showing candidate selection cards with submit button and MetaMask confirmation dialog',
    voiceOverText: 'Choose your candidate, review the details, and confirm in MetaMask. Your vote will be recorded securely and permanently.'
  }];


  const keyConcepts = [
  {
    icon: 'ShieldCheckIcon',
    title: 'Vote Security',
    description: 'Your vote is encrypted and stored on the blockchain, making it impossible to tamper with or change after submission.',
    example: 'Like sealing your ballot in a locked box that can never be opened or altered.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1af4c91bb-1764634614761.png",
    imageAlt: 'Digital security shield icon with encrypted blockchain data and padlock symbol'
  },
  {
    icon: 'EyeSlashIcon',
    title: 'Vote Privacy',
    description: 'Zero-knowledge proofs ensure your vote choice remains private while still being verifiable on the blockchain.',
    example: 'Others can see that you voted, but not who you voted for - like a sealed envelope.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dd35bcb9-1765562101073.png",
    imageAlt: 'Privacy concept showing masked user identity with encrypted vote data and anonymous verification'
  },
  {
    icon: 'BanknotesIcon',
    title: 'Transaction Costs',
    description: 'Small gas fees (typically $0.50-$2) cover the cost of recording your vote permanently on the blockchain.',
    example: 'Similar to paying for certified mail to ensure your ballot is delivered and tracked.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_10069f110-1764855971758.png",
    imageAlt: 'Transaction fee breakdown showing cost estimation with dollar amounts and blockchain processing'
  },
  {
    icon: 'ClockIcon',
    title: 'Vote Confirmation',
    description: 'After submitting, your vote is confirmed within 15-30 seconds and becomes part of the permanent blockchain record.',
    example: 'Like receiving a receipt that proves your ballot was counted and recorded.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e9418893-1764855968634.png",
    imageAlt: 'Vote confirmation screen showing checkmark icon with transaction hash and timestamp'
  }];


  const handleNext = () => {
    if (!isHydrated) return;

    if (currentStep < tutorialSteps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/voting-interface');
    }
  };

  const handlePrevious = () => {
    if (!isHydrated) return;

    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSkip = () => {
    if (!isHydrated) return;
    router.push('/voting-interface');
  };

  const handlePracticeComplete = () => {
    if (!isHydrated) return;
    setShowPractice(false);
    router.push('/voting-interface');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
            Wallet Connection Tutorial
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Learn how to connect your blockchain wallet and participate in secure voting. Follow these simple steps to get started.
          </p>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={currentStep} totalSteps={tutorialSteps.length} />

        {/* Tutorial Step */}
        {tutorialSteps.map((step) =>
        <TutorialStep
          key={step.stepNumber}
          {...step}
          isActive={currentStep === step.stepNumber} />

        )}

        {/* Key Concepts Section */}
        {currentStep === tutorialSteps.length &&
        <div className="space-y-6 animate-slide-in">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">Key Concepts to Remember</h2>
              <p className="text-text-secondary">
                Understanding these concepts will help you vote confidently
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {keyConcepts.map((concept, index) =>
            <ConceptCard key={index} {...concept} />
            )}
            </div>
          </div>
        }

        {/* Practice Area */}
        {currentStep === tutorialSteps.length && !showPractice &&
        <div className="animate-slide-in">
            <PracticeArea onComplete={handlePracticeComplete} />
          </div>
        }

        {/* Navigation Controls */}
        <NavigationControls
          currentStep={currentStep}
          totalSteps={tutorialSteps.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSkip={handleSkip}
          canGoNext={isHydrated}
          canGoPrevious={isHydrated && currentStep > 1} />


        {/* Help Section */}
        <div className="bg-primary/5 rounded-xl border border-primary/20 p-6 text-center">
          <h3 className="text-lg font-bold text-foreground mb-2">Need Help?</h3>
          <p className="text-text-secondary mb-4">
            If you encounter any issues during the wallet connection process, our support team is here to assist you.
          </p>
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 focus-ring font-medium">
            Contact Support
          </button>
        </div>
      </div>
    </div>);

};

export default TutorialInteractive;