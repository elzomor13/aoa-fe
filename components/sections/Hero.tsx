'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { EASE } from '@/lib/animations';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE, delay },
  }),
};

export default function Hero() {
  const t = useTranslations('hero');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.pause(); } else { v.play(); }
    setPlaying(!playing);
  }

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-[#0D0D0D]"
    >
      {/* Video — sits behind everything */}
      <video
        ref={videoRef}
        src="/videos/hero.mp4"
        autoPlay
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-contain object-center"
        aria-hidden="true"
      />

      {/* Layout — normal flow, dvh height, text pushed to bottom via mt-auto */}
      <div className="relative z-10 flex flex-col min-h-[50dvh] md:min-h-[65dvh] lg:min-h-[100dvh]
                      px-6 sm:px-10 lg:px-16 xl:px-20 pb-6 lg:pb-10">

        {/* Grid: text on left half, play button pinned bottom-right */}
        <div className="mt-auto grid grid-cols-12 gap-4 items-end">

          {/* Text — left 7 cols on desktop, full width on mobile */}
          <div className="col-span-12 md:col-span-7 lg:col-span-6">
            <motion.h1
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="font-cormorant font-light text-white mb-3 leading-[1.05]"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 5.5rem)' }}
            >
              {t('heroTitle')}
            </motion.h1>

            <motion.p
              custom={0.15}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="font-dm-sans font-light text-white/80 text-sm md:text-base lg:text-[17px] leading-relaxed"
            >
              {t('heroTagline')}
            </motion.p>
          </div>

          {/* Play / Pause + Mute — bottom-right of the grid */}
          <div className="col-span-12 md:col-span-5 lg:col-span-6 flex justify-end items-center gap-2">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              onClick={toggleMute}
              aria-label={muted ? 'Unmute video' : 'Mute video'}
              className="w-10 h-10 flex items-center justify-center border border-white/40
                         text-white/70 hover:text-white hover:border-white transition-colors duration-200"
            >
              {muted ? (
                /* Speaker muted */
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                /* Speaker with waves */
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              )}
            </motion.button>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              onClick={togglePlay}
              aria-label={playing ? 'Pause video' : 'Play video'}
              className="w-10 h-10 flex items-center justify-center border border-white/40
                         text-white/70 hover:text-white hover:border-white transition-colors duration-200"
            >
              {playing ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="5" y="3" width="4" height="18" rx="1" />
                  <rect x="15" y="3" width="4" height="18" rx="1" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              )}
            </motion.button>
          </div>

        </div>
      </div>
    </section>
  );
}
