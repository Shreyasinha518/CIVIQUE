'use client';

import { useState, useEffect } from 'react';
import Icon from '@/src/components/ui/AppIcon';
import ElectionCard from './ElectionCard';
import CreateElectionModal from './CreateElectionModal';
import MonitoringDashboard from './MonitoringDashboard';
import AnalyticsPanel from './AnalyticsPanel';
import IPFSMetadataPanel from './IPFSMetadataPanel';
import GasFeeOptimization from './GasFeeOptimization';

interface Election {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  startTime: string;
  endTime: string;
  participantCount: number;
  totalVotes: number;
  candidates: string[];
}

const AdminInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState('elections');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [elections, setElections] = useState<Election[]>([
    {
      id: 'E001',
      title: 'Presidential Election 2025',
      description: 'National presidential election for selecting the next president of the country',
      status: 'active',
      startTime: 'Dec 15, 2025 09:00 AM',
      endTime: 'Dec 15, 2025 06:00 PM',
      participantCount: 1247,
      totalVotes: 892,
      candidates: ['John Smith', 'Sarah Johnson', 'Michael Brown'],
    },
    {
      id: 'E002',
      title: 'Senate Election 2025',
      description: 'State senate election for selecting representatives',
      status: 'paused',
      startTime: 'Dec 14, 2025 08:00 AM',
      endTime: 'Dec 14, 2025 08:00 PM',
      participantCount: 856,
      totalVotes: 423,
      candidates: ['David Wilson', 'Emily Davis'],
    },
    {
      id: 'E003',
      title: 'Local Council Election',
      description: 'Municipal council election for local governance',
      status: 'draft',
      startTime: 'Dec 20, 2025 10:00 AM',
      endTime: 'Dec 20, 2025 05:00 PM',
      participantCount: 0,
      totalVotes: 0,
      candidates: ['Robert Taylor', 'Jennifer Martinez', 'William Anderson', 'Lisa Thomas'],
    },
  ]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleStartElection = (id: string) => {
    setElections(elections.map(e => 
      e.id === id ? { ...e, status: 'active' as const } : e
    ));
  };

  const handlePauseElection = (id: string) => {
    setElections(elections.map(e => 
      e.id === id ? { ...e, status: 'paused' as const } : e
    ));
  };

  const handleStopElection = (id: string) => {
    setElections(elections.map(e => 
      e.id === id ? { ...e, status: 'completed' as const } : e
    ));
  };

  const handleEditElection = (id: string) => {
    console.log('Edit election:', id);
  };

  const handleDeleteElection = (id: string) => {
    setElections(elections.filter(e => e.id !== id));
  };

  const handleCreateElection = (data: any) => {
    const newElection: Election = {
      id: `E${String(elections.length + 1).padStart(3, '0')}`,
      title: data.title,
      description: data.description,
      status: 'draft',
      startTime: `${data.startDate} ${data.startTime}`,
      endTime: `${data.endDate} ${data.endTime}`,
      participantCount: 0,
      totalVotes: 0,
      candidates: data.candidates.map((c: any) => c.name),
    };
    setElections([...elections, newElection]);
  };

  const tabs = [
    { id: 'elections', label: 'Elections', icon: 'DocumentTextIcon' },
    { id: 'monitoring', label: 'Monitoring', icon: 'ChartBarIcon' },
    { id: 'analytics', label: 'Analytics', icon: 'PresentationChartLineIcon' },
    { id: 'ipfs', label: 'IPFS Storage', icon: 'CloudIcon' },
    { id: 'gas', label: 'Gas Optimization', icon: 'CogIcon' },
  ];

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-muted rounded w-1/3" />
            <div className="h-64 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Election Management</h1>
            <p className="text-text-secondary">Configure, monitor, and control blockchain elections</p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors focus-ring"
          >
            <Icon name="PlusIcon" size={20} />
            <span className="font-medium">Create Election</span>
          </button>
        </div>

        <div className="mb-6 border-b border-border overflow-x-auto">
          <nav className="flex space-x-1" aria-label="Admin tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap focus-ring ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-foreground hover:border-border'
                }`}
              >
                <Icon name={tab.icon as any} size={18} />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div>
          {activeTab === 'elections' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {elections.map((election) => (
                  <ElectionCard
                    key={election.id}
                    election={election}
                    onStart={handleStartElection}
                    onPause={handlePauseElection}
                    onStop={handleStopElection}
                    onEdit={handleEditElection}
                    onDelete={handleDeleteElection}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'monitoring' && <MonitoringDashboard />}
          {activeTab === 'analytics' && <AnalyticsPanel />}
          {activeTab === 'ipfs' && <IPFSMetadataPanel />}
          {activeTab === 'gas' && <GasFeeOptimization />}
        </div>
      </div>

      <CreateElectionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateElection}
      />
    </div>
  );
};

export default AdminInteractive;