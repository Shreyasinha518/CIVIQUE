'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/src/components/ui/AppIcon';

interface HeaderProps {
  isOpen?: boolean;
}

const Header = ({ isOpen = false }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(isOpen);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  // Ensure consistent client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  const navigationItems = [
    {
      label: 'Vote',
      path: '/voting-interface',
      icon: 'CheckCircleIcon',
      tooltip: 'Cast your vote securely',
    },
    {
      label: 'Learn',
      path: '/wallet-connection-tutorial',
      icon: 'AcademicCapIcon',
      tooltip: 'Learn how to connect your wallet',
    },
    {
      label: 'Results',
      path: '/vote-confirmation-success',
      icon: 'ChartBarIcon',
      tooltip: 'View voting results',
    },
    {
      label: 'Admin',
      path: '/election-management-admin',
      icon: 'CogIcon',
      tooltip: 'Manage elections',
      adminOnly: true,
    },
  ];

  const isActivePath = (path: string) => {
    if (!isClient) return false;
    return pathname === path;
  };

  // Prevent rendering until client-side hydration is complete
  if (!isClient) {
    return (
      <header className="w-full bg-surface border-b border-border sticky top-0 z-[100]">
        <div className="w-full">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            {/* Logo placeholder during SSR */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-6 h-6"
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
              <span className="text-xl font-semibold text-foreground hidden sm:block">
                VoteChain
              </span>
            </div>
            
            {/* Navigation placeholder */}
            <div className="hidden md:flex items-center space-x-1">
              {/* Loading state navigation */}
            </div>
            
            {/* Mobile menu button placeholder */}
            <div className="md:hidden p-2 w-10 h-10"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full bg-surface border-b border-border sticky top-0 z-[100]">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <Link 
            href="/landing-welcome" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            suppressHydrationWarning
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-6 h-6"
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
            <span className="text-xl font-bold text-foreground hidden sm:block">
              VoteChain
            </span>
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`
                  px-3 py-2 rounded text-sm font-medium transition-all duration-200 flex items-center space-x-1
                  ${
                    isActivePath(item.path)
                      ? 'text-foreground'
                      : 'text-text-secondary hover:text-foreground'
                  }
                  focus-ring
                `}
                title={item.tooltip}
                suppressHydrationWarning
              >
                <Icon name={item.icon as any} size={16} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Side - Wallet Status, Language, Menu */}
          <div className="flex items-center space-x-4">
            {/* Wallet Status */}
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-muted">
              <div className="w-2 h-2 rounded-full bg-warning"></div>
              <span className="text-sm text-text-secondary">Not Connected</span>
            </div>

            {/* Language Selector */}
            <button
              className="hidden sm:flex items-center space-x-1 px-3 py-1.5 rounded hover:bg-muted transition-colors text-text-secondary text-sm"
              suppressHydrationWarning
            >
              <span>US English</span>
              <Icon name="ChevronDownIcon" size={14} />
            </button>

            {/* Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-muted transition-colors focus-ring"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              suppressHydrationWarning
            >
              <Icon
                name={mobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'}
                size={20}
                className="text-foreground"
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-border bg-surface animate-slide-in">
            <div className="px-4 py-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200
                    ${
                      isActivePath(item.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-text-primary hover:bg-muted'
                    }
                    focus-ring
                  `}
                  suppressHydrationWarning
                >
                  <Icon name={item.icon as any} size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;