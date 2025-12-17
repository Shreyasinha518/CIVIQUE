import type { Metadata } from 'next';
import Header from '@/src/components/common/Header';
import ProgressBreadcrumb from '@/src/components/common/ProgressBreadcrumb';
import TransactionConfirmationInteractive from './components/TransactionConfirmationInteractive';

export const metadata: Metadata = {
  title: 'Transaction Confirmation - VoteChain',
  description: 'Review your vote details, gas fees, and confirm your blockchain transaction securely with transparent fee disclosure and MetaMask integration.',
};

export default function TransactionConfirmationPage() {
  return (
    <>
      <Header />
      <ProgressBreadcrumb />
      <TransactionConfirmationInteractive />
    </>
  );
}