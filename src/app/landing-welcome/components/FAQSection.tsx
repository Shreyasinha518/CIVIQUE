'use client';

import { useState } from 'react';
import Icon from '@/src/components/ui/AppIcon';

interface FAQ {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: 'What is blockchain voting?',
      answer: 'Blockchain voting uses distributed ledger technology to record votes in a secure, transparent, and tamper-proof manner. Each vote is encrypted and permanently stored on the blockchain, ensuring it cannot be altered or deleted.',
    },
    {
      question: 'Do I need cryptocurrency to vote?',
      answer: 'You need a small amount of ETH to pay for gas fees (transaction costs). However, you can try our demo mode without any cryptocurrency to understand how the system works.',
    },
    {
      question: 'Is my vote anonymous?',
      answer: 'Yes! VoteChain uses zero-knowledge proofs to ensure your vote is anonymous while still being verifiable on the blockchain. Your wallet address is not linked to your vote choice.',
    },
    {
      question: 'Can I change my vote after submitting?',
      answer: 'No. Once your vote is recorded on the blockchain, it becomes permanent and cannot be changed. This ensures the integrity of the election results.',
    },
    {
      question: 'How do I get a MetaMask wallet?',
      answer: 'MetaMask is a free browser extension wallet. Visit metamask.io to download and install it. Our tutorial will guide you through the setup process step by step.',
    },
    {
      question: 'What happens if I lose internet connection while voting?',
      answer: 'If you lose connection before confirming the transaction, your vote will not be submitted. You can safely reconnect and try again. Once confirmed, your vote is permanently recorded.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-text-secondary">
            Everything you need to know about voting on VoteChain
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-card transition-all duration-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus-ring"
                aria-expanded={openIndex === index}
              >
                <span className="text-base font-semibold text-foreground pr-4">
                  {faq.question}
                </span>
                <Icon
                  name="ChevronDownIcon"
                  size={20}
                  className={`text-text-secondary flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 animate-slide-in">
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;