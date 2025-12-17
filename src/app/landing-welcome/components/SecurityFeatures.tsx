import Icon from '@/src/components/ui/AppIcon';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const SecurityFeatures = () => {
  const features: Feature[] = [
    {
      icon: 'ShieldCheckIcon',
      title: 'Blockchain Security',
      description: 'Every vote is encrypted and stored on the blockchain, making it impossible to alter or delete.',
    },
    {
      icon: 'LockClosedIcon',
      title: 'One Vote Per Wallet',
      description: 'Smart contracts ensure each wallet can only vote once, preventing fraud and duplicate votes.',
    },
    {
      icon: 'EyeIcon',
      title: 'Complete Transparency',
      description: 'View real-time results and verify your vote on the blockchain at any time.',
    },
    {
      icon: 'CheckBadgeIcon',
      title: 'Anonymous Voting',
      description: 'Zero-knowledge proofs protect your identity while ensuring vote authenticity.',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why VoteChain is Secure
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Built on blockchain technology to ensure every vote counts and cannot be tampered with
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background border border-border rounded-lg p-6 hover:shadow-card transition-all duration-200 hover:border-primary/30"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name={feature.icon as any} size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityFeatures;