'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { EASE } from '@/lib/animations';

function AdmissionCard({ num, title, desc, link }: { num: string; title: string; desc: string; link: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative bg-[#1A1A1A] p-8 lg:p-10 overflow-hidden transition-colors duration-200 hover:bg-[#202020]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.span
        className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C8102E]"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ transformOrigin: 'top' }}
      />

      <div
        className="font-cormorant italic text-[3rem] font-light leading-none mb-6"
        style={{ color: 'rgba(200, 16, 46, 0.2)' }}
      >
        {num}
      </div>
      <h3 className="font-cormorant font-semibold text-white text-[1.4rem] mb-4 leading-snug">
        {title}
      </h3>
      <p className="font-dm-sans font-light text-white/50 text-[13px] leading-relaxed mb-8">
        {desc}
      </p>
      <a
        href="#admissions"
        className="font-dm-mono text-[#C8102E] text-[10px] tracking-[0.15em] hover:text-white transition-colors duration-200"
      >
        {link}
      </a>
    </div>
  );
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export default function Admissions() {
  const t = useTranslations('admissions');
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });
  const cardsInView = useInView(cardsRef, { once: true, margin: '-100px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' });

  const cards = [
    { num: '01', title: t('undergraduateTitle'), desc: t('undergraduateDesc'), link: t('howToApply') },
    { num: '02', title: t('postgraduateTitle'), desc: t('postgraduateDesc'), link: t('howToApply') },
    { num: '03', title: t('internationalTitle'), desc: t('internationalDesc'), link: t('howToApply') },
  ];

  return (
    <section id="admissions" className="relative bg-[#0D0D0D] py-20 lg:py-28 overflow-hidden">
      <div
        className="absolute bottom-0 right-0 font-cormorant font-light select-none pointer-events-none leading-none"
        style={{ fontSize: '18vw', color: 'rgba(255,255,255,0.03)', lineHeight: 1 }}
        aria-hidden="true"
      >
        ARTS
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-14 lg:mb-18"
        >
          <div className="font-dm-sans font-bold text-[#C8102E] text-[13px] tracking-[0.18em] uppercase mb-4">
            {t('label')}
          </div>
          <h2
            className="font-cormorant font-light text-white leading-none mb-5"
            style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}
          >
            {t('headline')}
          </h2>
          <p className="font-dm-sans font-light text-white/55 text-[15px] max-w-[50ch] mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          ref={cardsRef}
          variants={stagger}
          initial="hidden"
          animate={cardsInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 border border-white/10 mb-12"
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              className={i < cards.length - 1 ? 'md:border-r border-white/10' : ''}
            >
              <AdmissionCard {...card} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 20 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#admissions"
            className="bg-[#C8102E] hover:bg-[#9B0D21] text-white font-dm-sans text-[13px] font-medium tracking-wide px-8 py-4 transition-colors duration-200"
          >
            {t('applyNow')}
          </a>
          <a
            href="#admissions"
            className="border border-white text-white hover:bg-white hover:text-[#0D0D0D] font-dm-sans text-[13px] font-medium tracking-wide px-8 py-4 transition-all duration-200"
          >
            {t('downloadProspectus')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
