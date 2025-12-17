'use client';

import { useState } from 'react';
import Icon from '@/src/components/ui/AppIcon';

interface IPFSFile {
  id: string;
  electionId: string;
  electionTitle: string;
  hash: string;
  size: string;
  status: 'synced' | 'syncing' | 'failed';
  lastUpdated: string;
}

const IPFSMetadataPanel = () => {
  const [files] = useState<IPFSFile[]>([
    {
      id: '1',
      electionId: 'E001',
      electionTitle: 'Presidential Election 2025',
      hash: 'QmX7Kd9fG3hN2pL4mR8sT6vW9yZ1aB3cD5eF7gH9iJ0kL',
      size: '2.4 MB',
      status: 'synced',
      lastUpdated: '2 hours ago',
    },
    {
      id: '2',
      electionId: 'E002',
      electionTitle: 'Senate Election 2025',
      hash: 'QmY8Le0gH4oP5qM9sU7wX0zB2cD4fG6hI8jK1lM3nO5pQ',
      size: '1.8 MB',
      status: 'syncing',
      lastUpdated: '5 minutes ago',
    },
    {
      id: '3',
      electionId: 'E003',
      electionTitle: 'Local Council Election',
      hash: 'QmZ9Mf1hI5pQ6rN0tV8xY1aC3eE5gG7iJ9kL2mN4oP6qR',
      size: '3.1 MB',
      status: 'synced',
      lastUpdated: '1 day ago',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'synced':
        return 'bg-success/10 text-success border-success/20';
      case 'syncing':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'failed':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'synced':
        return 'CheckCircleIcon';
      case 'syncing':
        return 'ArrowPathIcon';
      case 'failed':
        return 'XCircleIcon';
      default:
        return 'QuestionMarkCircleIcon';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">IPFS Metadata Storage</h2>
          <p className="text-sm text-text-secondary mt-1">Decentralized election data storage status</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors focus-ring">
          <Icon name="ArrowPathIcon" size={18} />
          <span className="text-sm font-medium">Sync All</span>
        </button>
      </div>

      <div className="space-y-3">
        {files.map((file) => (
          <div
            key={file.id}
            className="bg-background border border-border rounded-lg p-4 hover:shadow-card transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-sm font-semibold text-foreground">{file.electionTitle}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(file.status)}`}>
                    <Icon
                      name={getStatusIcon(file.status) as any}
                      size={12}
                      className={`inline mr-1 ${file.status === 'syncing' ? 'animate-spin' : ''}`}
                    />
                    {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                  </span>
                </div>
                <p className="text-xs text-text-secondary">Election ID: {file.electionId}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary">IPFS Hash:</span>
                <div className="flex items-center space-x-2">
                  <code className="text-xs font-mono text-foreground bg-muted px-2 py-1 rounded">
                    {file.hash.slice(0, 20)}...{file.hash.slice(-8)}
                  </code>
                  <button
                    onClick={() => copyToClipboard(file.hash)}
                    className="p-1 hover:bg-muted rounded transition-colors focus-ring"
                    aria-label="Copy hash"
                  >
                    <Icon name="ClipboardDocumentIcon" size={14} className="text-text-secondary" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary">File Size:</span>
                <span className="text-xs font-medium text-foreground">{file.size}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary">Last Updated:</span>
                <span className="text-xs font-medium text-foreground">{file.lastUpdated}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border">
              <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors focus-ring">
                <Icon name="EyeIcon" size={16} />
                <span>View</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors focus-ring">
                <Icon name="ArrowDownTrayIcon" size={16} />
                <span>Download</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors focus-ring">
                <Icon name="CheckBadgeIcon" size={16} />
                <span>Verify</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IPFSMetadataPanel;