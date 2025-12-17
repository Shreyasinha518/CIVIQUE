'use client';

import { useState, useEffect } from 'react';
import ConfettiAnimation from './ConfettiAnimation';
import SuccessHeader from './SuccessHeader';
import TransactionDetails from './TransactionDetails';
import VoteSummary from './VoteSummary';
import NFTBadgeReward from './NFTBadgeReward';
import ParticipationStats from './ParticipationStats';
import SocialSharing from './SocialSharing';
import ActionButtons from './ActionButtons';
import VoiceOverFeedback from './VoiceOverFeedback';

interface VoteData {
  candidateName: string;
  candidateImage: string;
  candidateImageAlt: string;
  electionName: string;
  transactionHash: string;
  blockNumber: number;
  timestamp: string;
  voteTime: string;
}

const VoteConfirmationInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [voteData, setVoteData] = useState<VoteData>({
    candidateName: 'Sarah Johnson',
    candidateImage: "https://img.rocket.new/generatedImages/rocket_gen_img_122f6d06e-1764690565988.png",
    candidateImageAlt: 'Professional headshot of Sarah Johnson, woman with brown hair in navy blazer smiling at camera',
    electionName: '2025 Presidential Election',
    transactionHash: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb8',
    blockNumber: 18456789,
    timestamp: '2025-12-15 14:51:25',
    voteTime: '2:51 PM'
  });

  useEffect(() => {
    setIsHydrated(true);

    const storedVote = localStorage.getItem('lastVote');
    if (storedVote) {
      try {
        const parsedVote = JSON.parse(storedVote);
        setVoteData(parsedVote);
      } catch (error) {
        console.error('Error parsing stored vote:', error);
      }
    }
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>);

  }

  return (
    <>
      <ConfettiAnimation />
      
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <SuccessHeader />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <VoteSummary
              candidateName={voteData.candidateName}
              candidateImage={voteData.candidateImage}
              candidateImageAlt={voteData.candidateImageAlt}
              electionName={voteData.electionName}
              voteTime={voteData.voteTime} />


            <NFTBadgeReward
              badgeName="First Vote Badge"
              badgeImage="https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg"
              badgeImageAlt="Digital NFT badge with golden trophy and blockchain symbols on purple gradient background"
              pointsEarned={100} />

          </div>

          <TransactionDetails
            transactionHash={voteData.transactionHash}
            blockNumber={voteData.blockNumber}
            timestamp={voteData.timestamp} />


          <ParticipationStats />

          <SocialSharing />

          <VoiceOverFeedback />

          <ActionButtons />

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
            <p className="text-sm text-text-secondary">
              Your vote is now permanently recorded on the Ethereum blockchain and cannot be altered or deleted. Thank you for participating in transparent, secure democracy.
            </p>
          </div>
        </div>
      </div>
    </>);

};

export default VoteConfirmationInteractive;