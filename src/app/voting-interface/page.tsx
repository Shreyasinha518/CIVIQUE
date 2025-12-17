import type { Metadata } from 'next';
import Header from '@/src/components/common/Header';
import ProgressBreadcrumb from '@/src/components/common/ProgressBreadcrumb';
import WalletStatusIndicator from '@/src/components/common/WalletStatusIndicator';
import LanguageSelector from '@/src/components/common/LanguageSelector';
import AccessibilityToolbar from '@/src/components/common/AccessibilityToolbar';
import ElectionHeader from './components/ElectionHeader';
import VotingInteractive from './components/VotingInteractive';

export const metadata: Metadata = {
  title: 'Voting Interface - VoteChain',
  description: 'Cast your secure blockchain vote by selecting your preferred candidate from the list. One vote per wallet with transparent gas fee estimation.'
};

interface Candidate {
  id: string;
  name: string;
  party: string;
  description: string;
  image: string;
  alt: string;
  voteCount: number;
}

export default function VotingInterfacePage() {
  const electionData = {
    title: '2025 Presidential Election',
    description: 'Cast your vote for the next President of the United States. This election uses blockchain technology to ensure transparency, security, and tamper-proof results. Your vote is anonymous and cannot be changed once submitted.',
    endDate: 'December 31, 2025',
    totalVotes: 15847
  };

  const candidates: Candidate[] = [
  {
    id: 'candidate-1',
    name: 'Sarah Johnson',
    party: 'Democratic Party',
    description: 'Former Senator with 15 years of public service experience. Focuses on healthcare reform, climate action, and economic equality.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_161890a39-1763294680205.png",
    alt: 'Professional portrait of Sarah Johnson, middle-aged woman with short brown hair wearing navy blue blazer',
    voteCount: 6234
  },
  {
    id: 'candidate-2',
    name: 'Michael Chen',
    party: 'Republican Party',
    description: 'Business entrepreneur and former Governor. Advocates for lower taxes, strong defense, and traditional values.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18b84cf35-1763296048414.png",
    alt: 'Professional headshot of Michael Chen, Asian man in his 40s with black hair wearing gray suit and blue tie',
    voteCount: 5892
  },
  {
    id: 'candidate-3',
    name: 'Elena Rodriguez',
    party: 'Green Party',
    description: 'Environmental scientist and activist. Prioritizes renewable energy, education reform, and social justice.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1279e5988-1763300778238.png",
    alt: 'Portrait of Elena Rodriguez, Hispanic woman with long dark hair wearing green blazer and glasses',
    voteCount: 3721
  }];


  const gasFeeData = {
    gasFeeETH: '0.0024',
    gasFeeUSD: '4.85',
    estimatedTime: '~30 seconds'
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressBreadcrumb />

      {/* Top Bar with Wallet Status and Tools */}
      <div className="w-full bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-end space-x-3">
            <WalletStatusIndicator />
            <LanguageSelector />
            <AccessibilityToolbar />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ElectionHeader
          title={electionData.title}
          description={electionData.description}
          endDate={electionData.endDate}
          totalVotes={electionData.totalVotes} />


        <VotingInteractive
          candidates={candidates}
          gasFeeETH={gasFeeData.gasFeeETH}
          gasFeeUSD={gasFeeData.gasFeeUSD}
          estimatedTime={gasFeeData.estimatedTime} />

      </main>

      {/* Footer */}
      <footer className="w-full bg-surface border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <p className="text-sm text-text-secondary">
              &copy; {new Date().getFullYear()} VoteChain. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">
                Help Center
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>);

}