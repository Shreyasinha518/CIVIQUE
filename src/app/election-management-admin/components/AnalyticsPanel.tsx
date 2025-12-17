'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import Icon from '@/src/components/ui/AppIcon';

const AnalyticsPanel = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const participationData = [
    { date: 'Dec 8', votes: 145 },
    { date: 'Dec 9', votes: 189 },
    { date: 'Dec 10', votes: 234 },
    { date: 'Dec 11', votes: 198 },
    { date: 'Dec 12', votes: 267 },
    { date: 'Dec 13', votes: 312 },
    { date: 'Dec 14', votes: 289 },
  ];

  const deviceData = [
    { name: 'Desktop', value: 45, color: '#2563EB' },
    { name: 'Mobile', value: 35, color: '#059669' },
    { name: 'Tablet', value: 20, color: '#7C3AED' },
  ];

  const performanceMetrics = [
    { label: 'Total Elections', value: '12', icon: 'DocumentTextIcon' },
    { label: 'Active Voters', value: '1,847', icon: 'UsersIcon' },
    { label: 'Avg Participation', value: '68.5%', icon: 'ChartBarIcon' },
    { label: 'Success Rate', value: '99.2%', icon: 'CheckCircleIcon' },
  ];

  if (!isHydrated) {
    return (
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/4" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Analytics Overview</h2>
          <div className="flex items-center space-x-2">
            {['24h', '7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors focus-ring ${
                  timeRange === range
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:bg-muted'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {performanceMetrics.map((metric, index) => (
            <div key={index} className="bg-background border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name={metric.icon as any} size={16} className="text-primary" />
                </div>
                <p className="text-xs text-text-secondary">{metric.label}</p>
              </div>
              <p className="text-2xl font-bold text-foreground">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Participation Trends</h3>
            <div className="w-full h-64" aria-label="Participation trends bar chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={participationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" stroke="#6B7280" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="votes" fill="#2563EB" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Device Distribution</h3>
            <div className="w-full h-64" aria-label="Device distribution pie chart">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry: any) => `${entry.name} ${(entry.percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    wrapperStyle={{ fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end">
          <button
            type="button"
            aria-label="Export report"
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors focus-ring"
          >
            <Icon name="ArrowDownTrayIcon" size={18} />
            <span className="text-sm font-medium">Export Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;