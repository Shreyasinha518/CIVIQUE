import Icon from '@/src/components/ui/AppIcon';

interface Indicator {
  icon: string;
  label: string;
  value: string;
}

const TrustIndicators = () => {
  const indicators: Indicator[] = [
    {
      icon: 'UsersIcon',
      label: 'Active Voters',
      value: '12,847',
    },
    {
      icon: 'DocumentCheckIcon',
      label: 'Votes Cast',
      value: '45,293',
    },
    {
      icon: 'ChartBarIcon',
      label: 'Elections Held',
      value: '127',
    },
    {
      icon: 'ShieldCheckIcon',
      label: 'Security Rating',
      value: '99.9%',
    },
  ];

  return (
    <section className="py-12 bg-primary/5 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {indicators.map((indicator, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                <Icon name={indicator.icon as any} size={24} className="text-primary" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                {indicator.value}
              </div>
              <div className="text-sm text-text-secondary font-medium">
                {indicator.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;