'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/src/components/ui/AppIcon';
import CandidateCard from './CandidateCard';
import GasFeeEstimator from './GasFeeEstimator';
import VoteStatusIndicator from './VoteStatusIndicator';
import VoiceOverControl from './VoiceOverControl';

interface Candidate {
  id: string;
  name: string;
  party: string;
  description: string;
  image: string;
  alt: string;
  voteCount: number;
}

interface VotingInteractiveProps {
  candidates: Candidate[];
  gasFeeETH: string;
  gasFeeUSD: string;
  estimatedTime: string;
}

const VotingInteractive = ({
  candidates,
  gasFeeETH,
  gasFeeUSD,
  estimatedTime,
}: VotingInteractiveProps) => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const storedAddress = localStorage.getItem('walletAddress');
    const votedStatus = localStorage.getItem('hasVotedInElection');
    
    if (storedAddress) {
      setWalletAddress(storedAddress);
    }
    
    if (votedStatus === 'true') {
      setHasVoted(true);
    }
  }, [isHydrated]);

  const handleCandidateSelect = (id: string) => {
    if (hasVoted) return;
    setSelectedCandidate(id);
  };

  const handleCastVote = () => {
    if (!selectedCandidate || hasVoted || isSubmitting) return;

    setIsSubmitting(true);

    localStorage.setItem('selectedCandidateId', selectedCandidate);
    localStorage.setItem('gasFeeETH', gasFeeETH);
    localStorage.setItem('gasFeeUSD', gasFeeUSD);

    setTimeout(() => {
      router.push('/transaction-confirmation');
    }, 500);
  };

  const selectedCandidateData = candidates.find(c => c.id === selectedCandidate);

  const voiceOverText = `Voting Interface. Select your preferred candidate from the list below. ${
    selectedCandidate 
      ? `You have selected ${selectedCandidateData?.name} from ${selectedCandidateData?.party}. Click Cast Vote to proceed.`
      : 'No candidate selected yet.'
  }`;

  if (!isHydrated) {
    return (
      <div className="space-y-6">
        <div className="bg-surface border border-border rounded-xl p-6 animate-pulse">
          <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-muted rounded w-full mb-2"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-surface border border-border rounded-xl p-6 animate-pulse">
              <div className="flex items-start space-x-4">
                <div className="w-24 h-24 bg-muted rounded-lg"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-muted rounded w-1/2"></div>
                  <div className="h-4 bg-muted rounded w-1/3"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Voice Over Control */}
      <div className="flex justify-end">
        <VoiceOverControl text={voiceOverText} />
      </div>

      {/* Vote Status */}
      <VoteStatusIndicator hasVoted={hasVoted} walletAddress={walletAddress} />

      {/* Candidates List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="UserGroupIcon" size={24} className="text-primary" />
          <span>Select Your Candidate</span>
        </h2>

        {candidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            {...candidate}
            isSelected={selectedCandidate === candidate.id}
            onSelect={handleCandidateSelect}
          />
        ))}
      </div>

      {/* Gas Fee Estimator */}
      <GasFeeEstimator
        gasFeeETH={gasFeeETH}
        gasFeeUSD={gasFeeUSD}
        estimatedTime={estimatedTime}
      />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => router.push('/landing-welcome')}
          className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 bg-muted text-foreground rounded-xl hover:bg-border transition-all duration-200 focus-ring"
        >
          <Icon name="ArrowLeftIcon" size={20} />
          <span className="font-semibold">Back to Home</span>
        </button>

        <button
          onClick={handleCastVote}
          disabled={!selectedCandidate || hasVoted || isSubmitting}
          className={`
            flex-1 flex items-center justify-center space-x-2 px-6 py-4 rounded-xl font-semibold transition-all duration-200 focus-ring
            ${!selectedCandidate || hasVoted || isSubmitting
              ? 'bg-muted text-text-secondary cursor-not-allowed' :'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl'
            }
          `}
        >
          {isSubmitting ? (
            <>
              <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Icon name="CheckCircleIcon" size={20} />
              <span>Cast Vote</span>
            </>
          )}
        </button>
      </div>

      {/* Help Text */}
      {!hasVoted && (
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <Icon name="LightBulbIcon" size={20} className="text-accent flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-accent mb-1">Voting Instructions</h4>
              <ul className="text-xs text-text-secondary space-y-1 list-disc list-inside">
                <li>Select one candidate by clicking on their card</li>
                <li>Review the gas fee estimate before proceeding</li>
                <li>Click "Cast Vote" to confirm your selection</li>
                <li>You can only vote once per wallet address</li>
                
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VotingInteractive