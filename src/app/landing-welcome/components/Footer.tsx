import Link from 'next/link';
import Icon from '@/src/components/ui/AppIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'How It Works', href: '/wallet-connection-tutorial' },
      { label: 'Vote Now', href: '/voting-interface' },
      { label: 'View Results', href: '/vote-confirmation-success' },
      { label: 'Admin Panel', href: '/election-management-admin' },
    ],
    resources: [
      { label: 'Tutorial', href: '/wallet-connection-tutorial' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Security', href: '#security' },
      { label: 'Accessibility', href: '#accessibility' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Cookie Policy', href: '#cookies' },
      { label: 'Compliance', href: '#compliance' },
    ],
  };

  const socialLinks = [
    { icon: 'GlobeAltIcon', label: 'Website', href: '#' },
    { icon: 'ChatBubbleLeftRightIcon', label: 'Discord', href: '#' },
    { icon: 'DocumentTextIcon', label: 'Documentation', href: '#' },
  ];

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
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
              <span className="text-xl font-semibold text-foreground">VoteChain</span>
            </div>
            <p className="text-sm text-text-secondary mb-4 max-w-xs">
              Secure, transparent, and tamper-proof blockchain voting platform for democratic elections.
            </p>
            <div className="flex items-center space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-muted hover:bg-primary/10 rounded-lg flex items-center justify-center transition-colors duration-200 focus-ring"
                  aria-label={social.label}
                >
                  <Icon name={social.icon as any} size={20} className="text-text-secondary hover:text-primary" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <p className="text-sm text-text-secondary">
              &copy; {currentYear} VoteChain. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="text-sm text-text-secondary">
                Blockchain Status: Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
