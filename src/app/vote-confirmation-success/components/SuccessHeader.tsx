'use client';

import Icon from '@/src/components/ui/AppIcon';

const SuccessHeader = () => {
  return (
    <div className="text-center space-y-4 animate-fade-in">
      <div className="flex justify-center">
        <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center animate-scale-in">
          <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center">
            <Icon name="CheckIcon" size={48} className="text-white" />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Vote Successfully Cast!
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Your vote has been securely recorded on the blockchain. Thank you for participating in this democratic process.
        </p>
      </div>
    </div>
  );
};

export default SuccessHeader;