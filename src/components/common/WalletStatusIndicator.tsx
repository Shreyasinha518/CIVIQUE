'use client';

import { useState, useEffect } from 'react';
import Icon from '@/src/components/ui/AppIcon';

interface WalletStatusIndicatorProps {
  className?: string;
}

const WalletStatusIndicator = ({ className = '' }: WalletStatusIndicatorProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [network, setNetwork] = useState('Ethereum Mainnet');

  useEffect(() => {
    const storedAddress = localStorage.getItem('walletAddress');
    const storedConnection = localStorage.getItem('walletConnected');
    
    if (storedAddress && storedConnection === 'true') {
      setIsConnected(true);
      setWalletAddress(storedAddress);
    }
  }, []);

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress(null);
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletConnected');
    setIsExpanded(false);
  };

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
    }
  };

  if (!isConnected) {
    return (
      <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg bg-muted ${className}`}>
        <div className="w-2 h-2 rounded-full bg-warning animate-pulse" />
        <span className="text-sm font-medium text-text-secondary hidden sm:inline">
          Not Connected
        </span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-success/10 border border-success/20 hover:bg-success/20 transition-all duration-200 focus-ring"
        aria-expanded={isExpanded}
        aria-label="Wallet status"
      >
        <div className="w-2 h-2 rounded-full bg-success" />
        <span className="text-sm font-medium text-success font-mono hidden sm:inline">
          {truncateAddress(walletAddress || '')}
        </span>
        <Icon 
          name="ChevronDownIcon" 
          size={16} 
          className={`text-success transition-transform duration-200 hidden sm:block ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Expanded Dropdown */}
      {isExpanded && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-surface rounded-lg shadow-modal border border-border p-4 space-y-3 animate-slide-in z-[200]">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <span className="text-sm font-semibold text-foreground">Wallet Connected</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="text-xs text-success font-medium">Active</span>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <label className="text-xs text-text-secondary font-medium">Network</label>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="GlobeAltIcon" size={14} className="text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{network}</span>
              </div>
            </div>

            <div>
              <label className="text-xs text-text-secondary font-medium">Address</label>
              <div className="flex items-center justify-between mt-1 p-2 bg-muted rounded-md">
                <span className="text-sm font-mono text-foreground">
                  {truncateAddress(walletAddress || '')}
                </span>
                <button
                  onClick={copyAddress}
                  className="p-1 hover:bg-background rounded transition-colors focus-ring"
                  aria-label="Copy address"
                >
                  <Icon name="ClipboardDocumentIcon" size={16} className="text-text-secondary" />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleDisconnect}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-all duration-200 focus-ring"
          >
            <Icon name="ArrowRightOnRectangleIcon" size={18} />
            <span className="text-sm font-medium">Disconnect</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletStatusIndicator;