import type { Metadata } from 'next';
import Header from '@/src/components/common/Header';
import WalletStatusIndicator from '@/src/components/common/WalletStatusIndicator';
import LanguageSelector from '@/src/components/common/LanguageSelector';
import AccessibilityToolbar from '@/src/components/common/AccessibilityToolbar';
import LandingInteractive from './components/LandingInteractive';

export const metadata: Metadata = {
  title: 'Welcome to VoteChain - Secure Blockchain Voting',
  description: 'Cast your vote securely using blockchain technology. VoteChain provides tamper-proof, transparent, and accessible voting for everyone.',
};

export default function LandingWelcomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Top Utility Bar */}
      <div className="sticky top-16 z-50 bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-end space-x-3">
            <WalletStatusIndicator />
            <LanguageSelector />
            <AccessibilityToolbar />
          </div>
        </div>
      </div>

      <LandingInteractive />
    </div>
  );
}