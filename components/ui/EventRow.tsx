'use client';

import { useState } from 'react';

interface EventRowProps {
  day: string;
  month: string;
  type: string;
  title: string;
  location: string;
}

export default function EventRow({ day, month, type, title, location }: EventRowProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex items-center gap-6 px-4 sm:px-6 py-5 border-b border-[#D4D4D4] cursor-pointer transition-all duration-200 last:border-b-0"
      style={{
        backgroundColor: hovered ? '#0D0D0D' : 'transparent',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Date block */}
      <div className="flex-shrink-0 w-12 text-center">
        <div
          className="font-cormorant font-bold text-3xl leading-none transition-colors duration-200"
          style={{ color: hovered ? '#ffffff' : '#0D0D0D' }}
        >
          {day}
        </div>
        <div className="font-dm-mono text-[#C8102E] text-[9px] tracking-[0.15em] uppercase mt-0.5">
          {month}
        </div>
      </div>

      {/* Vertical divider */}
      <div
        className="w-px h-10 flex-shrink-0 transition-colors duration-200"
        style={{ backgroundColor: hovered ? 'rgba(255,255,255,0.15)' : '#D4D4D4' }}
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="font-dm-mono text-[#C8102E] text-[9px] tracking-[0.15em] uppercase mb-1">
          {type}
        </div>
        <div
          className="font-dm-sans font-medium text-[14px] transition-colors duration-200 truncate"
          style={{ color: hovered ? '#ffffff' : '#0D0D0D' }}
        >
          {title}
        </div>
        <div
          className="font-dm-sans font-light text-[12px] mt-0.5 transition-colors duration-200"
          style={{ color: hovered ? 'rgba(255,255,255,0.55)' : '#6B6B6B' }}
        >
          {location}
        </div>
      </div>

      {/* Arrow */}
      <svg
        className="flex-shrink-0 transition-colors duration-200"
        style={{ color: hovered ? '#C8102E' : '#D4D4D4' }}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </div>
  );
}
