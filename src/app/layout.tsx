import React from 'react';
import '../styles/tailwind.css';
import type { Metadata } from 'next';
import type { Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import Header from '@/src/components/common/Header';
import ErrorBoundary from '@/src/components/common/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VoteChain - Secure Blockchain Voting Platform',
  description: 'Cast your vote securely using blockchain technology with VoteChain',
  keywords: 'blockchain, voting, secure, decentralized, election',
  authors: [{ name: 'VoteChain Team' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-background text-foreground`} suppressHydrationWarning>
        <ErrorBoundary>
          <div className="min-h-screen flex flex-col">
            <Suspense fallback={
              <div className="w-full h-16 bg-surface border-b border-border animate-pulse" />
            }>
              <Header />
            </Suspense>
            <main className="flex-1">
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                </div>
              }>
                {children}
              </Suspense>
            </main>
          </div>
        </ErrorBoundary>

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fvotechain3537back.builtwithrocket.new&_be=https%3A%2F%2Fapplication.rocket.new&_v=0.1.12" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.1" /></body>
    </html>
  );
}
