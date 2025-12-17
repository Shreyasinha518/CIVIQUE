interface HeroSectionProps {
  onConnectWallet: () => void;
  onStartTutorial: () => void;
}

const HeroSection = ({ onConnectWallet, onStartTutorial }: HeroSectionProps) => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Trust Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-success/10 border border-success/20 rounded-full">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm font-medium text-success">Blockchain Secured</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Welcome to <span className="text-primary">VoteChain</span>
            </h1>
            <p className="text-xl sm:text-2xl text-text-secondary max-w-3xl mx-auto">
              Secure, Transparent, and Tamper-Proof Blockchain Voting
            </p>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-text-primary max-w-2xl mx-auto leading-relaxed">
            Cast your vote with confidence using blockchain technology. Every vote is encrypted, verified, and permanently recorded on the blockchain for complete transparency and security.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onConnectWallet}
              className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all duration-200 focus-ring shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Connect Wallet to Vote
            </button>
            <button
              onClick={onStartTutorial}
              className="w-full sm:w-auto px-8 py-4 bg-surface text-foreground border-2 border-border rounded-lg font-semibold text-lg hover:bg-muted transition-all duration-200 focus-ring"
            >
              Watch Tutorial First
            </button>
          </div>

          {/* Demo Mode Link */}
          <div className="pt-4">
            <button
              onClick={onStartTutorial}
              className="text-sm text-primary hover:text-primary/80 font-medium underline transition-colors duration-200"
            >
              Try Demo Mode (No Wallet Required)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;