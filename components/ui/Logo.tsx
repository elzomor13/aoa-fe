'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  height?: number | string;
  theme?: 'light' | 'dark';
}

const AcademyOfArtsLogo: React.FC<LogoProps> = ({
  className = '',
  height = 56,
  theme = 'dark',
}) => {
  return (
    <img
      src="/logo.svg"
      alt="Academy of Arts — أكاديمية الفنون"
      height={height}
      style={{
        height,
        width: 'auto',
        display: 'block',
        filter: theme === 'dark' ? 'invert(1) hue-rotate(180deg)' : undefined,
      }}
      className={className}
    />
  );
};

export default AcademyOfArtsLogo;
