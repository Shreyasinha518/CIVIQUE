'use client';

import { useState } from 'react';
import Icon from '@/src/components/ui/AppIcon';

interface Candidate {
  id: string;
  name: string;
}

interface CreateElectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const CreateElectionModal = ({ isOpen, onClose, onSubmit }: CreateElectionModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    gasLimit: '300000',
    maxVoters: '1000',
  });

  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: '1', name: '' },
    { id: '2', name: '' },
  ]);

  const handleAddCandidate = () => {
    setCandidates([...candidates, { id: Date.now().toString(), name: '' }]);
  };

  const handleRemoveCandidate = (id: string) => {
    if (candidates.length > 2) {
      setCandidates(candidates.filter(c => c.id !== id));
    }
  };

  const handleCandidateChange = (id: string, value: string) => {
    setCandidates(candidates.map(c => c.id === id ? { ...c, name: value } : c));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      candidates: candidates.filter(c => c.name.trim() !== ''),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-surface rounded-lg shadow-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-surface border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Create New Election</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors focus-ring"
            aria-label="Close modal"
          >
            <Icon name="XMarkIcon" size={20} className="text-text-secondary" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Election Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              placeholder="e.g., Presidential Election 2025"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground resize-none"
              placeholder="Brief description of the election"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Start Date *
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Start Time *
              </label>
              <input
                type="time"
                required
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                End Date *
              </label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                End Time *
              </label>
              <input
                type="time"
                required
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-foreground">
                Candidates * (Min: 2, Max: 5)
              </label>
              <button
                type="button"
                onClick={handleAddCandidate}
                disabled={candidates.length >= 5}
                className="flex items-center space-x-1 px-3 py-1 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-ring"
              >
                <Icon name="PlusIcon" size={16} />
                <span>Add</span>
              </button>
            </div>
            <div className="space-y-2">
              {candidates.map((candidate, index) => (
                <div key={candidate.id} className="flex items-center space-x-2">
                  <input
                    type="text"
                    required
                    value={candidate.name}
                    onChange={(e) => handleCandidateChange(candidate.id, e.target.value)}
                    className="flex-1 px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                    placeholder={`Candidate ${index + 1} name`}
                  />
                  {candidates.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveCandidate(candidate.id)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors focus-ring"
                      aria-label="Remove candidate"
                    >
                      <Icon name="TrashIcon" size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Gas Limit
              </label>
              <input
                type="number"
                value={formData.gasLimit}
                onChange={(e) => setFormData({ ...formData, gasLimit: e.target.value })}
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Max Voters
              </label>
              <input
                type="number"
                value={formData.maxVoters}
                onChange={(e) => setFormData({ ...formData, maxVoters: e.target.value })}
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors focus-ring"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors focus-ring"
            >
              Create Election
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateElectionModal;