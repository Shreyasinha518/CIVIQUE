import type { Metadata } from 'next';
import Header from '@/src/components/common/Header';
import WalletStatusIndicator from '@/src/components/common/WalletStatusIndicator';
import ProgressBreadcrumb from '@/src/components/common/ProgressBreadcrumb';
import LanguageSelector from '@/src/components/common/LanguageSelector';
import AccessibilityToolbar from '@/src/components/common/AccessibilityToolbar';
import TutorialInteractive from './components/TutorialInteractive';

export const metadata: Metadata = {
  title: 'Wallet Connection Tutorial - VoteChain',
  description: 'Learn how to connect your MetaMask wallet and participate in secure blockchain-based voting with step-by-step guidance and practice mode.',
};

export default function WalletConnectionTutorialPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressBreadcrumb />
      
      <div className="fixed top-20 right-4 z-50 flex items-center space-x-2">
        <WalletStatusIndicator />
        <LanguageSelector />
        <AccessibilityToolbar />
      </div>

      <TutorialInteractive />
    </div>
  );
}