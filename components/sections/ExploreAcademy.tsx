'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';

function ArchitecturalIllustration() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 560 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <rect width="560" height="800" fill="#1A1A1A" />
      <rect x="40" y="60" width="480" height="10" fill="#222" />
      <rect x="40" y="60" width="50" height="700" fill="#1E1E1E" />
      <rect x="470" y="60" width="50" height="700" fill="#1E1E1E" />
      <rect x="110" y="70" width="30" height="660" fill="#1C1C1C" />
      <rect x="420" y="70" width="30" height="660" fill="#1C1C1C" />
      <rect x="90" y="720" width="380" height="12" fill="#252525" />
      <rect x="90" y="700" width="380" height="20" fill="#202020" />
      <polygon points="240,70 180,700 300,700" fill="#252525" opacity="0.4" />
      <polygon points="320,70 260,700 380,700" fill="#252525" opacity="0.3" />
      <rect x="140" y="70" width="280" height="630" fill="#181818" />
      <line x1="140" y1="200" x2="420" y2="200" stroke="#202020" strokeWidth="1" />
      <line x1="140" y1="350" x2="420" y2="350" stroke="#202020" strokeWidth="1" />
      <line x1="140" y1="500" x2="420" y2="500" stroke="#1F1F1F" strokeWidth="0.5" />
      <line x1="220" y1="70" x2="220" y2="700" stroke="#202020" strokeWidth="0.5" />
      <line x1="280" y1="70" x2="280" y2="700" stroke="#202020" strokeWidth="0.5" />
      <line x1="340" y1="70" x2="340" y2="700" stroke="#202020" strokeWidth="0.5" />
      <rect x="140" y="70" width="280" height="30" fill="#1E1E1E" />
      <ellipse cx="280" cy="560" rx="18" ry="40" fill="#222" />
      <ellipse cx="280" cy="500" rx="12" ry="12" fill="#222" />
      <rect x="200" y="340" width="20" height="20" fill="#C8102E" opacity="0.7" />
      <line x1="140" y1="660" x2="420" y2="660" stroke="#232323" strokeWidth="1" />
      <line x1="140" y1="640" x2="420" y2="640" stroke="#212121" strokeWidth="0.5" />
    </svg>
  );
}

export default function ExploreAcademy() {
  const t = useTranslations('explore');
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const leftInView = useInView(leftRef, { once: true, margin: '-100px' });
  const rightInView = useInView(rightRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const pillars = [
    { num: '01', title: t('pillar1Title'), desc: t('pillar1Desc') },
    { num: '02', title: t('pillar2Title'), desc: t('pillar2Desc') },
    { num: '03', title: t('pillar3Title'), desc: t('pillar3Desc') },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-[#F5F5F5] min-h-screen flex flex-col lg:flex-row overflow-hidden"
    >
      {/* Left — illustration */}
      <motion.div
        ref={leftRef}
        initial={{ opacity: 0, x: -48 }}
        animate={leftInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="lg:w-1/2 relative overflow-hidden min-h-[50vh] lg:min-h-screen"
      >
        <motion.div
          style={{ y: parallaxY }}
          className="absolute inset-0 scale-110"
        >
          <ArchitecturalIllustration />
        </motion.div>
      </motion.div>

      {/* Right — text */}
      <motion.div
        ref={rightRef}
        initial={{ opacity: 0, y: 32 }}
        animate={rightInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
        className="lg:w-1/2 flex items-center px-8 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-24"
      >
        <div className="max-w-[520px]">
          <div className="font-dm-sans font-bold text-[#C8102E] text-[13px] tracking-[0.18em] uppercase mb-3">
            {t('label')}
          </div>
          <div className="w-12 h-px bg-[#C8102E] mb-8" />

          <h2
            className="font-cormorant font-light text-[#0D0D0D] leading-[1.1] mb-7"
            style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)' }}
          >
            {t('headline1')}<br />{t('headline2')}
          </h2>

          <p className="font-dm-sans font-light text-[#6B6B6B] text-[15px] leading-[1.75] mb-10">
            {t('body')}
          </p>

          {/* Pillars */}
          <div className="space-y-0 mb-10">
            {pillars.map((p, i) => (
              <div
                key={p.num}
                className={`flex items-start gap-6 py-5 ${
                  i < pillars.length - 1 ? 'border-b border-[#D4D4D4]' : ''
                } ${i === 0 ? 'border-t border-[#D4D4D4]' : ''}`}
              >
                <span className="font-cormorant italic text-[#C8102E] text-2xl font-light w-8 flex-shrink-0 leading-none pt-0.5">
                  {p.num}
                </span>
                <div>
                  <div className="font-dm-sans font-medium text-[#0D0D0D] text-[14px] mb-1">{p.title}</div>
                  <div className="font-dm-sans font-light text-[#6B6B6B] text-[13px] leading-relaxed">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <a
            href="#about"
            className="group inline-flex items-center gap-2 font-dm-sans text-[#0D0D0D] text-[14px] relative"
          >
            <span className="relative">
              {t('cta')}
              <span className="absolute bottom-0 left-0 w-full h-px bg-[#C8102E] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </span>
            <span className="text-[#C8102E] group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
