'use client';

import Icon from '@/src/components/ui/AppIcon';
import AppImage from '@/src/components/ui/AppImage';

interface ConceptCardProps {
  icon: string;
  title: string;
  description: string;
  example: string;
  image: string;
  imageAlt: string;
}

const ConceptCard = ({ icon, title, description, example, image, imageAlt }: ConceptCardProps) => {
  return (
    <div className="bg-surface rounded-xl border border-border p-6 hover:shadow-modal transition-all duration-200">
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon name={icon as any} size={24} className="text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-bold text-foreground mb-2">{title}</h4>
          <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
        </div>
      </div>

      <div className="relative w-full h-40 rounded-lg overflow-hidden bg-muted mb-4">
        <AppImage
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-muted rounded-lg p-4">
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2">
          Example
        </p>
        <p className="text-sm text-foreground">{example}</p>
      </div>
    </div>
  );
};

export default ConceptCard;