'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TransactionSummary from './TransactionSummary';
import GasFeeEstimation from './GasFeeEstimation';
import TransactionDetails from './TransactionDetails';
import ConfirmationButton from './ConfirmationButton';
import TransactionStatus from './TransactionStatus';
import ErrorHandler from './ErrorHandler';
import SecurityIndicators from './SecurityIndicators';

interface Candidate {
  id: number;
  name: string;
  party: string;
}

interface Election {
  id: number;
  title: string;
  description: string;
}

const TransactionConfirmationInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [transactionState, setTransactionState] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorType, setErrorType] = useState<'insufficient_funds' | 'network_error' | 'rejected' | 'timeout' | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTimestamp, setCurrentTimestamp] = useState('');

  const mockCandidate: Candidate = {
    id: 1,
    name: 'Sarah Johnson',
    party: 'Democratic Party',
  };

  const mockElection: Election = {
    id: 1,
    title: '2025 Presidential Election',
    description: 'Vote for the next President of the United States',
  };

  const mockGasFee = {
    ethAmount: 0.002145,
    usdEquivalent: 4.87,
    networkCongestion: 'medium' as const,
  };

  const mockTransactionDetails = {
    contractAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    blockchainNetwork: 'Ethereum Mainnet',
    transactionType: 'Vote Submission',
    estimatedTime: '30-60 seconds',
  };

  useEffect(() => {
    setIsHydrated(true);
    const now = new Date();
    setCurrentTimestamp(now.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }));
  }, []);

  useEffect(() => {
    if (transactionState === 'processing') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTransactionState('success');
            setTimeout(() => {
              router.push('/vote-confirmation-success');
            }, 1500);
            return 100;
          }
          return prev + 10;
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [transactionState, router]);

  const handleConfirm = () => {
    const walletConnected = localStorage.getItem('walletConnected');
    
    if (walletConnected !== 'true') {
      setErrorType('rejected');
      setTransactionState('error');
      return;
    }

    const randomError = Math.random();
    if (randomError < 0.15) {
      const errors: Array<'insufficient_funds' | 'network_error' | 'rejected' | 'timeout'> = [
        'insufficient_funds',
        'network_error',
        'rejected',
        'timeout',
      ];
      setErrorType(errors[Math.floor(Math.random() * errors.length)]);
      setTransactionState('error');
      return;
    }

    setTransactionState('processing');
    setProgress(0);
  };

  const handleRetry = () => {
    setTransactionState('idle');
    setErrorType(null);
    setProgress(0);
  };

  const handleCancel = () => {
    router.push('/voting-interface');
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-48 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const getStatusMessage = () => {
    switch (transactionState) {
      case 'processing':
        return 'Confirming your vote on the blockchain...';
      case 'success':
        return 'Transaction confirmed successfully!';
      case 'error':
        return 'Transaction failed. Please try again.';
      default:
        return 'Ready to submit your vote';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Transaction Confirmation</h1>
          <p className="text-base text-text-secondary">Review your vote and confirm the blockchain transaction</p>
        </div>

        {transactionState === 'processing' && (
          <TransactionStatus
            status="confirming"
            message={getStatusMessage()}
            progress={progress}
          />
        )}

        {transactionState === 'error' && errorType && (
          <ErrorHandler
            errorType={errorType}
            onRetry={handleRetry}
            onCancel={handleCancel}
          />
        )}

        {transactionState === 'idle' && (
          <>
            <TransactionSummary
              selectedCandidate={mockCandidate}
              election={mockElection}
              timestamp={currentTimestamp}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GasFeeEstimation
                ethAmount={mockGasFee.ethAmount}
                usdEquivalent={mockGasFee.usdEquivalent}
                networkCongestion={mockGasFee.networkCongestion}
              />

              <SecurityIndicators
                encryptionStatus={true}
                blockchainVerification={true}
                anonymization={true}
              />
            </div>

            <TransactionDetails
              contractAddress={mockTransactionDetails.contractAddress}
              blockchainNetwork={mockTransactionDetails.blockchainNetwork}
              transactionType={mockTransactionDetails.transactionType}
              estimatedTime={mockTransactionDetails.estimatedTime}
            />

            <ConfirmationButton
              onConfirm={handleConfirm}
              disabled={transactionState !== 'idle'}
            />
          </>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
          <button
            onClick={handleCancel}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-muted text-foreground rounded-lg hover:bg-border transition-all duration-200 focus-ring"
          >
            <span className="font-medium">Back to Voting</span>
          </button>

          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <span>Need help?</span>
            <button className="text-primary hover:text-primary/80 font-medium transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionConfirmationInteractive;