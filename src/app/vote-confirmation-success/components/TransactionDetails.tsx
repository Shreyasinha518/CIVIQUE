'use client';

import { useState, useEffect } from 'react';
import Icon from '@/src/components/ui/AppIcon';

interface TransactionDetailsProps {
  transactionHash: string;
  blockNumber: number;
  timestamp: string;
}

const TransactionDetails = ({ transactionHash, blockNumber, timestamp }: TransactionDetailsProps) => {
  const [copied, setCopied] = useState(false);
  const [confirmations, setConfirmations] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setConfirmations((prev) => (prev < 12 ? prev + 1 : prev));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transactionHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="DocumentCheckIcon" size={24} className="text-primary" />
          <span>Transaction Details</span>
        </h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-sm font-medium text-success">Confirmed</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-text-secondary">Transaction Hash</label>
          <div className="flex items-center justify-between mt-2 p-3 bg-muted rounded-lg">
            <span className="text-sm font-mono text-foreground">{truncateHash(transactionHash)}</span>
            <button
              onClick={copyToClipboard}
              className="p-2 hover:bg-background rounded-lg transition-colors focus-ring"
              aria-label="Copy transaction hash"
            >
              <Icon
                name={copied ? 'CheckIcon' : 'ClipboardDocumentIcon'}
                size={18}
                className={copied ? 'text-success' : 'text-text-secondary'}
              />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-text-secondary">Block Number</label>
            <p className="text-lg font-semibold text-foreground mt-1">#{blockNumber.toLocaleString()}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-text-secondary">Timestamp</label>
            <p className="text-lg font-semibold text-foreground mt-1">{timestamp}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-text-secondary">Confirmations</label>
            <span className="text-sm font-semibold text-primary">{confirmations}/12</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${(confirmations / 12) * 100}%` }}
            />
          </div>
        </div>

        <a
          href={`https://etherscan.io/tx/${transactionHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all duration-200 focus-ring"
        >
          <span className="text-sm font-medium">View on Etherscan</span>
          <Icon name="ArrowTopRightOnSquareIcon" size={16} />
        </a>
      </div>
    </div>
  );
};

export default TransactionDetails;