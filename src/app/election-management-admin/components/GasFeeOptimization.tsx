'use client';

import { useState } from 'react';
import Icon from '@/src/components/ui/AppIcon';

const GasFeeOptimization = () => {
  const [gasSettings, setGasSettings] = useState({
    priority: 'medium',
    maxFee: '50',
    maxPriorityFee: '2',
    gasLimit: '300000',
  });

  const [estimatedCost, setEstimatedCost] = useState({
    eth: '0.0045',
    usd: '8.73',
  });

  const priorityLevels = [
    {
      value: 'low',
      label: 'Low',
      description: 'Slower confirmation (~5 min)',
      icon: 'ChevronDownIcon',
      color: 'text-text-secondary',
    },
    {
      value: 'medium',
      label: 'Medium',
      description: 'Standard confirmation (~2 min)',
      icon: 'MinusIcon',
      color: 'text-primary',
    },
    {
      value: 'high',
      label: 'High',
      description: 'Fast confirmation (~30 sec)',
      icon: 'ChevronUpIcon',
      color: 'text-warning',
    },
  ];

  const handlePriorityChange = (priority: string) => {
    setGasSettings({ ...gasSettings, priority });
    
    const costs = {
      low: { eth: '0.0032', usd: '6.21' },
      medium: { eth: '0.0045', usd: '8.73' },
      high: { eth: '0.0067', usd: '13.01' },
    };
    
    setEstimatedCost(costs[priority as keyof typeof costs]);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Gas Fee Optimization</h2>
          <p className="text-sm text-text-secondary mt-1">Configure network parameters and cost estimates</p>
        </div>
        <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 border border-success/20 rounded-lg">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm font-medium text-success">Network Active</span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Transaction Priority
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {priorityLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => handlePriorityChange(level.value)}
                className={`p-4 border-2 rounded-lg transition-all duration-200 focus-ring ${
                  gasSettings.priority === level.value
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Icon
                    name={level.icon as any}
                    size={18}
                    className={gasSettings.priority === level.value ? 'text-primary' : level.color}
                  />
                  <span className={`text-sm font-semibold ${gasSettings.priority === level.value ? 'text-primary' : 'text-foreground'}`}>
                    {level.label}
                  </span>
                </div>
                <p className="text-xs text-text-secondary text-left">{level.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Max Fee (Gwei)
            </label>
            <input
              type="number"
              value={gasSettings.maxFee}
              onChange={(e) => setGasSettings({ ...gasSettings, maxFee: e.target.value })}
              className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Max Priority Fee (Gwei)
            </label>
            <input
              type="number"
              value={gasSettings.maxPriorityFee}
              onChange={(e) => setGasSettings({ ...gasSettings, maxPriorityFee: e.target.value })}
              className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Gas Limit
          </label>
          <input
            type="number"
            value={gasSettings.gasLimit}
            onChange={(e) => setGasSettings({ ...gasSettings, gasLimit: e.target.value })}
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
          />
        </div>

        <div className="bg-background border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Estimated Cost</h3>
            <Icon name="InformationCircleIcon" size={18} className="text-text-secondary" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">ETH Amount:</span>
              <span className="text-lg font-bold text-foreground">{estimatedCost.eth} ETH</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">USD Equivalent:</span>
              <span className="text-lg font-bold text-success">${estimatedCost.usd}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex-1 px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors focus-ring">
            Reset to Default
          </button>
          <button className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors focus-ring">
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default GasFeeOptimization;