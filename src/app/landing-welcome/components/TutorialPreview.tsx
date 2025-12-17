import Icon from '@/src/components/ui/AppIcon';

interface TutorialStep {
  step: number;
  icon: string;
  title: string;
  description: string;
}

interface TutorialPreviewProps {
  onStartTutorial: () => void;
}

const TutorialPreview = ({ onStartTutorial }: TutorialPreviewProps) => {
  const steps: TutorialStep[] = [
    {
      step: 1,
      icon: 'WalletIcon',
      title: 'Connect Your Wallet',
      description: 'Click the Connect Wallet button and approve the connection in MetaMask.',
    },
    {
      step: 2,
      icon: 'DocumentCheckIcon',
      title: 'Review Election Options',
      description: 'Browse available elections and read about each candidate or option.',
    },
    {
      step: 3,
      icon: 'HandRaisedIcon',
      title: 'Cast Your Vote',
      description: 'Select your choice and confirm the transaction in your wallet.',
    },
    {
      step: 4,
      icon: 'CheckCircleIcon',
      title: 'Vote Confirmed',
      description: 'Your vote is recorded on the blockchain and you receive a confirmation NFT badge.',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-accent/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Voting on the blockchain is simple and secure. Follow these four easy steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-border -translate-x-1/2 z-0" />
              )}

              <div className="relative bg-surface border border-border rounded-lg p-6 hover:shadow-card transition-all duration-200 z-10">
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                  {step.step}
                </div>

                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Icon name={step.icon as any} size={28} className="text-primary" />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2 text-center">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed text-center">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={onStartTutorial}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-all duration-200 focus-ring"
          >
            <Icon name="PlayCircleIcon" size={20} />
            <span>Watch Full Tutorial</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TutorialPreview;