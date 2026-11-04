import React from 'react';

export type LogoVariant = 'group' | 'art' | 'studios' | 'cuisine' | 'events';

interface NexLogoProps {
  variant?: LogoVariant;
  colorOverride?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const NexLogo: React.FC<NexLogoProps> = ({
  variant = 'group',
  colorOverride,
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  // Brand color mappings from brief
  const colors: Record<LogoVariant, { hex: string; subtitle: string }> = {
    group: { hex: '#111111', subtitle: 'GROUP' },
    art: { hex: '#B8912A', subtitle: 'ART AFRICA' },
    studios: { hex: '#A6192E', subtitle: 'STUDIOS AFRICA' },
    cuisine: { hex: '#2F6B3A', subtitle: 'AFRICUISINE' },
    events: { hex: '#111111', subtitle: 'EVENTS AFRICA' },
  };

  const current = colors[variant];
  const primaryColor = colorOverride || current.hex;

  const sizeDimensions = {
    sm: { width: 140, height: 42, nexSize: 22, subSize: 6.5 },
    md: { width: 180, height: 54, nexSize: 28, subSize: 8 },
    lg: { width: 240, height: 72, nexSize: 38, subSize: 10.5 },
  }[size];

  return (
    <div className={`inline-flex items-center select-none ${className}`} style={{ cursor: 'pointer' }}>
      <svg
        width={sizeDimensions.width}
        height={sizeDimensions.height}
        viewBox="0 0 200 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Africa Continent Accent Silhouette */}
        <path
          d="M72 10 C68 8, 59 12, 57 18 C56 24, 61 29, 60 34 C59 39, 64 45, 66 48 C68 47, 69 43, 71 39 C76 32, 78 24, 76 17 C74 13, 73 11, 72 10 Z"
          fill={primaryColor}
          opacity="0.22"
        />

        {/* Bold Serif "NEX" Wordmark */}
        <text
          x="10"
          y="35"
          fontFamily="'Playfair Display', Georgia, serif"
          fontWeight="900"
          fontSize={sizeDimensions.nexSize}
          fill={primaryColor}
          letterSpacing="1.5"
        >
          NEX
        </text>

        {/* Small Africa dot accent */}
        <circle cx="75" cy="18" r="3" fill={primaryColor} />

        {/* Small Caps Subtitle Label (Matches Logo Family Look) */}
        {showSubtitle && (
          <text
            x="12"
            y="50"
            fontFamily="'Inter', -apple-system, sans-serif"
            fontWeight="700"
            fontSize={sizeDimensions.subSize}
            fill={primaryColor}
            letterSpacing="3.5"
            style={{ textTransform: 'uppercase' }}
          >
            {current.subtitle}
          </text>
        )}
      </svg>
    </div>
  );
};
