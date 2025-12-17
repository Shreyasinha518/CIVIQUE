'use client';

import { useState, useEffect } from 'react';
import Icon from '@/src/components/ui/AppIcon';

interface SystemMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: string;
  color: string;
}

const MonitoringDashboard = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    {
      label: 'Concurrent Voters',
      value: '247',
      change: '+12%',
      trend: 'up',
      icon: 'UsersIcon',
      color: 'text-primary',
    },
    {
      label: 'Network Performance',
      value: '98.5%',
      change: '+2.1%',
      trend: 'up',
      icon: 'SignalIcon',
      color: 'text-success',
    },
    {
      label: 'Avg Gas Fee',
      value: '0.0023 ETH',
      change: '-5%',
      trend: 'down',
      icon: 'BanknotesIcon',
      color: 'text-warning',
    },
    {
      label: 'System Health',
      value: 'Excellent',
      change: 'Stable',
      trend: 'stable',
      icon: 'HeartIcon',
      color: 'text-success',
    },
  ]);

  const [alerts] = useState([
    {
      id: '1',
      type: 'warning',
      message: 'High network congestion detected in Election #3',
      time: '2 minutes ago',
    },
    {
      id: '2',
      type: 'info',
      message: 'IPFS metadata sync completed for Election #5',
      time: '15 minutes ago',
    },
  ]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-muted rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'ArrowTrendingUpIcon';
      case 'down':
        return 'ArrowTrendingDownIcon';
      default:
        return 'MinusIcon';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-warning/10 border-warning/20 text-warning';
      case 'error':
        return 'bg-destructive/10 border-destructive/20 text-destructive';
      default:
        return 'bg-primary/10 border-primary/20 text-primary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Real-Time Monitoring</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-background border border-border rounded-lg p-4 hover:shadow-card transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${metric.color}`}>
                  <Icon name={metric.icon as any} size={20} />
                </div>
                <div className="flex items-center space-x-1 text-xs">
                  <Icon
                    name={getTrendIcon(metric.trend) as any}
                    size={14}
                    className={metric.trend === 'up' ? 'text-success' : metric.trend === 'down' ? 'text-destructive' : 'text-text-secondary'}
                  />
                  <span className={metric.trend === 'up' ? 'text-success' : metric.trend === 'down' ? 'text-destructive' : 'text-text-secondary'}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <p className="text-xs text-text-secondary mb-1">{metric.label}</p>
              <p className="text-2xl font-bold text-foreground">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">System Alerts</h2>
          <button className="text-sm text-primary hover:underline focus-ring">
            View All
          </button>
        </div>
        
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-start space-x-3 p-4 border rounded-lg ${getAlertColor(alert.type)}`}
            >
              <Icon
                name={alert.type === 'warning' ? 'ExclamationTriangleIcon' : 'InformationCircleIcon'}
                size={20}
                className="flex-shrink-0 mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{alert.message}</p>
                <p className="text-xs opacity-75 mt-1">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonitoringDashboard;