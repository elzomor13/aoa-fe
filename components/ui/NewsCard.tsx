'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface NewsCardProps {
  tag: string;
  title: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

function NewsImagePlaceholder({ featured }: { featured?: boolean }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox={featured ? '0 0 560 373' : '0 0 400 266'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <rect width="100%" height="100%" fill="#1A1A1A" />
      {/* Stage silhouette */}
      <rect x="20%" y="20%" width="60%" height="4" fill="#252525" />
      <rect x="20%" y="24%" width="8%" height="50%" fill="#222" />
      <rect x="72%" y="24%" width="8%" height="50%" fill="#222" />
      <rect x="28%" y="24%" width="44%" height="50%" fill="#1E1E1E" />
      {/* Lines */}
      <line x1="28%" y1="40%" x2="72%" y2="40%" stroke="#252525" strokeWidth="1" />
      <line x1="28%" y1="55%" x2="72%" y2="55%" stroke="#252525" strokeWidth="0.5" />
      {/* Accent */}
      <rect x="45%" y="68%" width="10%" height="6%" fill="#C8102E" opacity="0.3" />
    </svg>
  );
}

export default function NewsCard({ tag, title, date, readTime, featured }: NewsCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group cursor-pointer transition-transform duration-300"
      style={{ transform: hovered ? 'translateY(-4px)' : 'translateY(0)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top border */}
      <div
        className="h-0.5 transition-colors duration-300"
        style={{ backgroundColor: hovered ? '#C8102E' : '#0D0D0D' }}
      />

      {/* Image */}
      <div className={`overflow-hidden bg-[#1A1A1A] ${featured ? 'aspect-[3/2]' : 'aspect-[3/2]'}`}>
        <NewsImagePlaceholder featured={featured} />
      </div>

      {/* Content */}
      <div className="pt-5 pb-2">
        <div className="font-dm-mono text-[#C8102E] text-[10px] tracking-[0.15em] uppercase mb-3">
          {tag}
        </div>
        <h3
          className={`font-cormorant font-semibold text-[#0D0D0D] leading-snug mb-3 ${
            featured ? 'text-[1.4rem]' : 'text-[1.15rem]'
          }`}
        >
          {title}
        </h3>
        <div className="flex items-center gap-3">
          <span className="font-dm-mono text-[#6B6B6B] text-[10px] tracking-[0.1em]">{date}</span>
          <span className="w-1 h-1 rounded-full bg-[#D4D4D4]" />
          <span className="font-dm-mono text-[#6B6B6B] text-[10px] tracking-[0.1em]">{readTime}</span>
        </div>
      </div>
    </div>
  );
}
