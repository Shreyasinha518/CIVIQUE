'use client';

import { useState, useEffect } from 'react';
import Icon from '@/src/components/ui/AppIcon';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface LanguageSelectorProps {
  className?: string;
}

const LanguageSelector = ({ className = '' }: LanguageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
  });

  const languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      const lang = languages.find(l => l.code === savedLanguage);
      if (lang) {
        setSelectedLanguage(lang);
      }
    }
  }, []);

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    localStorage.setItem('selectedLanguage', language.code);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-muted transition-all duration-200 focus-ring"
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        <span className="text-xl">{selectedLanguage.flag}</span>
        <span className="text-sm font-medium text-foreground hidden lg:inline">
          {selectedLanguage.name}
        </span>
        <Icon
          name="ChevronDownIcon"
          size={16}
          className={`text-text-secondary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[150]"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          <div className="absolute right-0 top-full mt-2 w-56 bg-surface rounded-lg shadow-modal border border-border py-2 z-[200] animate-slide-in">
            <div className="px-3 py-2 border-b border-border">
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                Select Language
              </p>
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2.5 hover:bg-muted transition-colors duration-150
                    ${selectedLanguage.code === language.code ? 'bg-primary/10' : ''}
                  `}
                >
                  <span className="text-xl">{language.flag}</span>
                  <span
                    className={`
                      text-sm font-medium flex-1 text-left
                      ${selectedLanguage.code === language.code ? 'text-primary' : 'text-foreground'}
                    `}
                  >
                    {language.name}
                  </span>
                  {selectedLanguage.code === language.code && (
                    <Icon name="CheckIcon" size={16} className="text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;