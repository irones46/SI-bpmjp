import React from 'react';

interface BpmjpLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BpmjpLogo: React.FC<BpmjpLogoProps> = ({
  variant = 'light',
  className = '',
  size = 'md',
  showSubtitle = true
}) => {
  const isDark = variant === 'dark';
  
  const emblemColor = isDark ? '#ffffff' : '#0f2444';
  const kemendagColor = isDark ? '#94a3b8' : '#64748b';
  const titleColor = isDark ? '#ffffff' : '#0b192c';
  const subtitleColor = isDark ? '#cbd5e1' : '#475569';

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-13 h-13'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official styled emblem */}
      <div className={`relative shrink-0 flex items-center justify-center ${iconSizes[size]}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          {/* Outer circle with gear notches */}
          <circle cx="50" cy="50" r="44" stroke={emblemColor} strokeWidth="3" strokeDasharray="6 3" />
          <circle cx="50" cy="50" r="39" stroke={emblemColor} strokeWidth="2" opacity="0.6" />
          
          {/* Metrology scales & shield */}
          <path d="M50 20 L50 78" stroke={emblemColor} strokeWidth="3" strokeLinecap="round" />
          <path d="M28 34 L72 34" stroke={emblemColor} strokeWidth="3" strokeLinecap="round" />
          
          {/* Left scale pan */}
          <path d="M28 34 L21 54 M28 34 L35 54" stroke={emblemColor} strokeWidth="1.5" />
          <path d="M18 54 Q28 60 38 54 Z" fill={isDark ? '#38bdf8' : '#0284c7'} opacity="0.8" />
          
          {/* Right scale pan */}
          <path d="M72 34 L65 54 M72 34 L79 54" stroke={emblemColor} strokeWidth="1.5" />
          <path d="M62 54 Q72 60 82 54 Z" fill={isDark ? '#38bdf8' : '#0284c7'} opacity="0.8" />
          
          {/* Center fulcrum & star */}
          <circle cx="50" cy="34" r="4" fill={isDark ? '#facc15' : '#eab308'} />
          <polygon points="50,15 52,21 58,21 53,25 55,31 50,27 45,31 47,25 42,21 48,21" fill={isDark ? '#facc15' : '#eab308'} />
          
          {/* Base pedestal */}
          <path d="M36 78 L64 78 M42 74 L58 74" stroke={emblemColor} strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      <div className="flex flex-col leading-tight">
        <span
          style={{ color: kemendagColor }}
          className="text-[9px] font-bold tracking-wider uppercase font-sans"
        >
          KEMENTERIAN PERDAGANGAN
        </span>
        <span
          style={{ color: titleColor }}
          className="text-lg font-extrabold tracking-tight"
        >
          BPMJP
        </span>
        {showSubtitle && (
          <span
            style={{ color: subtitleColor }}
            className="text-[9.5px] font-medium leading-none max-w-[200px]"
          >
            Balai Pelatihan SDM Metrologi, Mutu dan Jasa Perdagangan
          </span>
        )}
      </div>
    </div>
  );
};
