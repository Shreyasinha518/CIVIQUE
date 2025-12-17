import type { Metadata } from 'next';
import Header from '@/src/components/common/Header';
import WalletStatusIndicator from '@/src/components/common/WalletStatusIndicator';
import LanguageSelector from '@/src/components/common/LanguageSelector';
import AccessibilityToolbar from '@/src/components/common/AccessibilityToolbar';
import Adminiterative from './components/Adminiterative';

export const metadata: Metadata = {
  title: 'Election Management Admin - VoteChain',
  description: 'Configure, monitor, and control blockchain elections through comprehensive administrative tools with real-time monitoring and analytics.',
};

export default function ElectionManagementAdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="sticky top-16 z-40 bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-end space-x-3">
            <WalletStatusIndicator />
            <LanguageSelector />
            <AccessibilityToolbar />
          </div>
        </div>
      </div>

      <main>
        <Adminiterative />
      </main>

      <footer className="bg-surface border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary-foreground"
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold text-foreground">VoteChain</span>
            </div>
            
            <p className="text-sm text-text-secondary">
              &copy; {new Date().getFullYear()} VoteChain. Secure blockchain voting platform.
            </p>
            
            <div className="flex items-center space-x-4">
              <a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}