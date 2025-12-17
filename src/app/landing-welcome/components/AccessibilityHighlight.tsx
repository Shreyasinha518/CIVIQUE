import Icon from '@/src/components/ui/AppIcon';

interface AccessibilityHighlightProps {
  onEnableVoiceOver: () => void;
}

const AccessibilityHighlight = ({ onEnableVoiceOver }: AccessibilityHighlightProps) => {
  const features = [
    {
      icon: 'SpeakerWaveIcon',
      title: 'Voice Guidance',
      description: 'Audio instructions for every step',
    },
    {
      icon: 'LanguageIcon',
      title: 'Multi-Language',
      description: 'Available in English, Spanish, and more',
    },
    {
      icon: 'DevicePhoneMobileIcon',
      title: 'Mobile Optimized',
      description: 'Large buttons for easy touch interaction',
    },
    {
      icon: 'EyeIcon',
      title: 'High Contrast',
      description: 'Enhanced visibility for better readability',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-4">
            <Icon name="HeartIcon" size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">Designed for Everyone</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Accessible to All Voters
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            VoteChain is built with accessibility in mind, ensuring everyone can participate in democracy
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background border border-border rounded-lg p-6 text-center hover:shadow-card transition-all duration-200"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Icon name={feature.icon as any} size={24} className="text-accent" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-text-secondary">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={onEnableVoiceOver}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-accent/10 text-accent border border-accent/20 rounded-lg font-semibold hover:bg-accent/20 transition-all duration-200 focus-ring"
          >
            <Icon name="SpeakerWaveIcon" size={20} />
            <span>Enable Voice Guidance</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AccessibilityHighlight;