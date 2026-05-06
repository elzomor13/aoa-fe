'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { EASE } from '@/lib/animations';

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const itemIcons = [
  <svg key="icon1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>,
  <svg key="icon2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>,
  <svg key="icon3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="0" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>,
  <svg key="icon4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>,
];

export default function QuickAccessBand() {
  const t = useTranslations('quickAccess');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const items = [
    { href: '#admissions', titleKey: 'prospectiveStudents', subtitleKey: 'prospectiveSubtitle' },
    { href: '#student-life', titleKey: 'currentStudents', subtitleKey: 'currentSubtitle' },
    { href: '#faculty', titleKey: 'facultyResearch', subtitleKey: 'facultySubtitle' },
    { href: '#contact', titleKey: 'visitUs', subtitleKey: 'visitSubtitle' },
  ];

  return (
    <section ref={ref} className="bg-[#1A1A1A] border-t border-white/10">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      >
        {items.map((it, i) => (
          <motion.div key={it.titleKey} variants={item}>
            <Link
              href={it.href}
              className={`group flex items-start gap-4 px-8 py-8 transition-all duration-200 hover:bg-[#222] relative ${
                i < items.length - 1 ? 'lg:border-r border-white/10' : ''
              } ${i < 2 ? 'sm:border-b lg:border-b-0 border-white/10' : ''}`}
            >
              <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C8102E] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out" />

              <div className="text-white flex-shrink-0 mt-0.5">{itemIcons[i]}</div>
              <div>
                <div className="font-dm-sans text-white text-[15px] font-medium mb-1 group-hover:text-white transition-colors">
                  {t(it.titleKey as Parameters<typeof t>[0])}
                </div>
                <div className="font-dm-mono text-white/50 text-[10px] tracking-[0.1em] uppercase leading-relaxed">
                  {t(it.subtitleKey as Parameters<typeof t>[0])}
                </div>
              </div>
              <svg
                className="ml-auto self-center text-white/20 group-hover:text-[#C8102E] transition-colors duration-200 flex-shrink-0"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
