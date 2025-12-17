'use client';

import { useState } from 'react';
import Icon from '@/src/components/ui/AppIcon';

const SocialSharing = () => {
  const [copied, setCopied] = useState(false);

  const shareMessage = "I just cast my vote securely on the blockchain using VoteChain! Join me in making democracy more transparent and accessible. #VoteChain #BlockchainVoting";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      name: 'Twitter',
      icon: 'ChatBubbleLeftRightIcon',
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`, '_blank'),
    },
    {
      name: 'Facebook',
      icon: 'UserGroupIcon',
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}`, '_blank'),
    },
    {
      name: 'LinkedIn',
      icon: 'BriefcaseIcon',
      color: 'bg-blue-700 hover:bg-blue-800',
      action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`, '_blank'),
    },
  ];

  return (
    <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
      <div className="flex items-center space-x-2 pb-3 border-b border-border">
        <Icon name="ShareIcon" size={24} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Share Your Participation</h2>
      </div>

      <p className="text-sm text-text-secondary">
        Celebrate your civic engagement and encourage others to participate in blockchain-based voting!
      </p>

      <div className="flex flex-wrap gap-3">
        {shareOptions.map((option, index) => (
          <button
            key={index}
            onClick={option.action}
            className={`flex items-center space-x-2 px-4 py-2.5 ${option.color} text-white rounded-lg transition-all duration-200 focus-ring`}
            aria-label={`Share on ${option.name}`}
          >
            <Icon name={option.icon as any} size={18} />
            <span className="text-sm font-medium">{option.name}</span>
          </button>
        ))}
      </div>

      <div className="pt-3 border-t border-border">
        <label className="text-sm font-medium text-text-secondary">Or copy link</label>
        <div className="flex items-center space-x-2 mt-2">
          <input
            type="text"
            value={window.location.origin}
            readOnly
            className="flex-1 px-4 py-2.5 bg-muted border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleCopyLink}
            className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 focus-ring"
            aria-label="Copy link"
          >
            <Icon name={copied ? 'CheckIcon' : 'ClipboardDocumentIcon'} size={20} />
          </button>
        </div>
        {copied && (
          <p className="text-xs text-success mt-2 flex items-center space-x-1">
            <Icon name="CheckCircleIcon" size={14} />
            <span>Link copied to clipboard!</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default SocialSharing;