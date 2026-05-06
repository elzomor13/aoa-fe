'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import InstituteCard from '@/components/ui/InstituteCard';
import { EASE } from '@/lib/animations';

const instituteIcons = [
  <svg key="theatrical" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" strokeLinecap="round" />
  </svg>,
  <svg key="ballet" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="4" r="2" />
    <path d="M12 6v6l-3 5" />
    <path d="M12 12l3 5" />
    <path d="M9 11l-3 1" />
    <path d="M15 11l3 1" />
  </svg>,
  <svg key="conservatoryMusic" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>,
  <svg key="cinema" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="6" width="15" height="12" />
    <polygon points="17,9 22,6 22,18 17,15" />
    <line x1="6" y1="6" x2="6" y2="18" />
    <line x1="10" y1="6" x2="10" y2="18" />
  </svg>,
  <svg key="arabicMusic" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
    <path d="M9 9l12-2" />
  </svg>,
  <svg key="artCriticism" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 6h20v12H2z" />
    <path d="M8 6v12" />
    <path d="M16 6v12" />
    <path d="M2 12h20" />
  </svg>,
  <svg key="folkArts" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>,
  <svg key="childrensArts" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>,
  <svg key="artsMedia" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="3" width="20" height="14" rx="1" />
    <path d="M8 21h8M12 17v4" />
  </svg>,
  <svg key="cinemaAlex" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="6" width="15" height="12" />
    <polygon points="17,9 22,6 22,18 17,15" />
    <line x1="6" y1="6" x2="6" y2="18" />
  </svg>,
  <svg key="theatricalAlex" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" strokeLinecap="round" />
  </svg>,
  <svg key="balletSchool" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="4" r="2" />
    <path d="M12 6v6l-3 5M12 12l3 5" />
  </svg>,
  <svg key="arabicMusicSchool" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
  </svg>,
  <svg key="conservatorySchool" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9,22 9,12 15,12 15,22" />
  </svg>,
  <svg key="technicalSchool" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
  </svg>,
];

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardAnim: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export default function Institutes() {
  const t = useTranslations('institutes');
  const ref = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  const institutes = [
    { nameKey: 'theatricalName', descKey: 'theatricalDesc', icon: instituteIcons[0] },
    { nameKey: 'balletName', descKey: 'balletDesc', icon: instituteIcons[1] },
    { nameKey: 'conservatoryMusicName', descKey: 'conservatoryMusicDesc', icon: instituteIcons[2] },
    { nameKey: 'cinemaName', descKey: 'cinemaDesc', icon: instituteIcons[3] },
    { nameKey: 'arabicMusicName', descKey: 'arabicMusicDesc', icon: instituteIcons[4] },
    { nameKey: 'artCriticismName', descKey: 'artCriticismDesc', icon: instituteIcons[5] },
    { nameKey: 'folkArtsName', descKey: 'folkArtsDesc', icon: instituteIcons[6] },
    { nameKey: 'childrensArtsName', descKey: 'childrensArtsDesc', icon: instituteIcons[7] },
    { nameKey: 'artsMediaName', descKey: 'artsMediaDesc', icon: instituteIcons[8] },
    { nameKey: 'cinemaAlexName', descKey: 'cinemaAlexDesc', icon: instituteIcons[9] },
    { nameKey: 'theatricalAlexName', descKey: 'theatricalAlexDesc', icon: instituteIcons[10] },
    { nameKey: 'balletSchoolName', descKey: 'balletSchoolDesc', icon: instituteIcons[11] },
    { nameKey: 'arabicMusicSchoolName', descKey: 'arabicMusicSchoolDesc', icon: instituteIcons[12] },
    { nameKey: 'conservatorySchoolName', descKey: 'conservatorySchoolDesc', icon: instituteIcons[13] },
    { nameKey: 'technicalSchoolName', descKey: 'technicalSchoolDesc', icon: instituteIcons[14] },
  ];

  return (
    <section id="institutes" className="bg-[#0D0D0D] py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-end justify-between mb-12 lg:mb-16"
        >
          <div>
            <div className="font-dm-sans font-bold text-[#C8102E] text-[13px] tracking-[0.18em] uppercase mb-3">
              {t('label')}
            </div>
            <h2
              className="font-cormorant font-light text-white leading-none"
              style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}
            >
              {t('headline')}
            </h2>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
        >
          {institutes.map((inst) => (
            <motion.div key={inst.nameKey} variants={cardAnim}>
              <InstituteCard
                name={t(inst.nameKey as Parameters<typeof t>[0])}
                est=""
                desc={t(inst.descKey as Parameters<typeof t>[0])}
                icon={inst.icon}
                image="/theater.jpg"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
