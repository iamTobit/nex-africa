import React from 'react';

export type LogoVariant = 'group' | 'art' | 'studios' | 'cuisine' | 'events' | 'magazine';

interface NexLogoProps {
  variant?: LogoVariant;
  colorOverride?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  imageSrc?: string;
  animated?: boolean;
}

export const NexLogo: React.FC<NexLogoProps> = ({
  variant = 'group',
  className = '',
  size = 'md',
  imageSrc,
  animated = false,
}) => {
  const logoAssets: Record<LogoVariant, { png: string; mp4?: string; alt: string }> = {
    group: {
      png: '/logos/logo-group.png',
      mp4: '/logos/logo-group.mp4',
      alt: 'Nexafrica Group',
    },
    art: {
      png: '/logos/logo-art.png',
      mp4: '/logos/logo-art.mp4',
      alt: 'NexArt Africa',
    },
    studios: {
      png: '/logos/logo-studios.png',
      mp4: '/logos/logo-studios.mp4',
      alt: 'NexStudios Africa',
    },
    cuisine: {
      png: '/logos/logo-cuisine.png',
      mp4: '/logos/logo-cuisine.mp4',
      alt: 'NexAfriCuisine',
    },
    events: {
      png: '/logos/logo-events.png',
      alt: 'NexEvents Africa',
    },
    magazine: {
      png: '/logos/logo-magazine.png',
      alt: 'Nexafrica Magazine',
    },
  };

  const asset = logoAssets[variant];
  const srcToUse = imageSrc || asset.png;

  const sizeStyles = {
    sm: { height: '42px', videoHeight: '72px' },
    md: { height: '54px', videoHeight: '96px' },
    lg: { height: '76px', videoHeight: '136px' },
    xl: { height: '104px', videoHeight: '180px' },
  }[size];

  if (animated && asset.mp4) {
    return (
      <div
        className={`inline-flex items-center select-none ${className}`}
        style={{ cursor: 'pointer', backgroundColor: '#000000', borderRadius: '6px', overflow: 'hidden' }}
      >
        <video
          src={asset.mp4}
          poster={srcToUse}
          autoPlay
          muted
          playsInline
          style={{
            height: sizeStyles.videoHeight,
            width: 'auto',
            maxWidth: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center select-none ${className}`} style={{ cursor: 'pointer' }}>
      <img
        src={srcToUse}
        alt={asset.alt}
        style={{
          height: sizeStyles.height,
          width: 'auto',
          maxWidth: '100%',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
};
