'use client';

import { useState, useEffect } from 'react';
import Icon from '@/src/components/ui/AppIcon';

interface AccessibilityToolbarProps {
  className?: string;
}

const AccessibilityToolbar = ({ className = '' }: AccessibilityToolbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    highContrast: false,
    voiceOver: false,
    fontSize: 'medium',
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
      applySettings(parsed);
    }
  }, []);

  const applySettings = (newSettings: typeof settings) => {
    if (newSettings.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    document.documentElement.setAttribute('data-font-size', newSettings.fontSize);
  };

  const updateSetting = (key: keyof typeof settings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('accessibilitySettings', JSON.stringify(newSettings));
    applySettings(newSettings);
  };

  const fontSizeOptions = [
    { value: 'small', label: 'Small', size: 'A' },
    { value: 'medium', label: 'Medium', size: 'A' },
    { value: 'large', label: 'Large', size: 'A' },
  ];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-all duration-200 focus-ring"
        aria-expanded={isOpen}
        aria-label="Accessibility settings"
        title="Accessibility Options"
      >
        <Icon name="AdjustmentsHorizontalIcon" size={20} className="text-foreground" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[300]"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          <div className="absolute right-0 top-full mt-2 w-80 bg-surface rounded-lg shadow-modal border border-border p-4 z-[400] animate-slide-in">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Accessibility</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-muted rounded transition-colors focus-ring"
                aria-label="Close"
              >
                <Icon name="XMarkIcon" size={18} className="text-text-secondary" />
              </button>
            </div>

            <div className="space-y-4">
              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Icon name="EyeIcon" size={20} className="text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">High Contrast</p>
                    <p className="text-xs text-text-secondary">Increase color contrast</p>
                  </div>
                </div>
                <button
                  onClick={() => updateSetting('highContrast', !settings.highContrast)}
                  className={`
                    relative w-11 h-6 rounded-full transition-colors duration-200 focus-ring
                    ${settings.highContrast ? 'bg-primary' : 'bg-border'}
                  `}
                  role="switch"
                  aria-checked={settings.highContrast}
                >
                  <span
                    className={`
                      absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200
                      ${settings.highContrast ? 'translate-x-5' : 'translate-x-0'}
                    `}
                  />
                </button>
              </div>

              {/* Voice Over */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Icon name="SpeakerWaveIcon" size={20} className="text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Voice Over</p>
                    <p className="text-xs text-text-secondary">Enable audio guidance</p>
                  </div>
                </div>
                <button
                  onClick={() => updateSetting('voiceOver', !settings.voiceOver)}
                  className={`
                    relative w-11 h-6 rounded-full transition-colors duration-200 focus-ring
                    ${settings.voiceOver ? 'bg-primary' : 'bg-border'}
                  `}
                  role="switch"
                  aria-checked={settings.voiceOver}
                >
                  <span
                    className={`
                      absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200
                      ${settings.voiceOver ? 'translate-x-5' : 'translate-x-0'}
                    `}
                  />
                </button>
              </div>

              {/* Font Size */}
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Icon name="DocumentTextIcon" size={20} className="text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Text Size</p>
                    <p className="text-xs text-text-secondary">Adjust reading size</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between space-x-2 ml-13">
                  {fontSizeOptions.map((option, index) => (
                    <button
                      key={option.value}
                      onClick={() => updateSetting('fontSize', option.value)}
                      className={`
                        flex-1 flex items-center justify-center py-2 rounded-lg border-2 transition-all duration-200 focus-ring
                        ${settings.fontSize === option.value
                          ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-text-secondary'
                        }
                      `}
                      aria-label={`${option.label} text size`}
                    >
                      <span
                        className={`font-semibold ${
                          index === 0 ? 'text-xs' : index === 1 ? 'text-sm' : 'text-base'
                        }`}
                      >
                        {option.size}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => {
                  const defaultSettings = {
                    highContrast: false,
                    voiceOver: false,
                    fontSize: 'medium',
                  };
                  setSettings(defaultSettings);
                  localStorage.setItem('accessibilitySettings', JSON.stringify(defaultSettings));
                  applySettings(defaultSettings);
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-muted hover:bg-border text-foreground rounded-lg transition-all duration-200 focus-ring mt-2"
              >
                <Icon name="ArrowPathIcon" size={18} />
                <span className="text-sm font-medium">Reset to Default</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AccessibilityToolbar;