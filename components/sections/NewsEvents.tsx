'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import NewsCard from '@/components/ui/NewsCard';
import EventRow from '@/components/ui/EventRow';
import { EASE } from '@/lib/animations';

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export default function NewsEvents() {
  const t = useTranslations('news');
  const headerRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });
  const newsInView = useInView(newsRef, { once: true, margin: '-100px' });
  const eventsInView = useInView(eventsRef, { once: true, margin: '-100px' });

  const news = [
    { tag: t('news1Tag'), title: t('news1Title'), date: t('news1Date'), readTime: t('news1Read'), featured: true },
    { tag: t('news2Tag'), title: t('news2Title'), date: t('news2Date'), readTime: t('news2Read') },
    { tag: t('news3Tag'), title: t('news3Title'), date: t('news3Date'), readTime: t('news3Read') },
  ];

  const events = [
    { day: '12', month: t('event1Month'), type: t('event1Type'), title: t('event1Title'), location: t('event1Location') },
    { day: '18', month: t('event2Month'), type: t('event2Type'), title: t('event2Title'), location: t('event2Location') },
    { day: '24', month: t('event3Month'), type: t('event3Type'), title: t('event3Title'), location: t('event3Location') },
    { day: '03', month: t('event4Month'), type: t('event4Type'), title: t('event4Title'), location: t('event4Location') },
    { day: '10', month: t('event5Month'), type: t('event5Type'), title: t('event5Title'), location: t('event5Location') },
  ];

  return (
    <section id="news" className="bg-[#F5F5F5] py-20 lg:py-28">
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
            <div className="font-dm-mono text-[#C8102E] text-[11px] tracking-[0.2em] uppercase mb-3">
              {t('label')}
            </div>
            <h2
              className="font-cormorant font-light text-[#0D0D0D] leading-none"
              style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}
            >
              {t('headline')}
            </h2>
          </div>
          <a
            href="#news"
            className="hidden sm:block font-dm-sans text-[#0D0D0D] text-[13px] hover:text-[#C8102E] transition-colors duration-200 tracking-wide"
          >
            {t('allNews')}
          </a>
        </motion.div>

        {/* News grid */}
        <motion.div
          ref={newsRef}
          variants={stagger}
          initial="hidden"
          animate={newsInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-16 lg:mb-20"
        >
          {news.map((article) => (
            <motion.div key={article.title} variants={fadeUp}>
              <NewsCard
                tag={article.tag}
                title={article.title}
                date={article.date}
                readTime={article.readTime}
                featured={article.featured}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Events */}
        <motion.div
          ref={eventsRef}
          initial={{ opacity: 0, y: 24 }}
          animate={eventsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="font-dm-mono text-[#0D0D0D] text-[11px] tracking-[0.2em] uppercase">
              {t('upcomingEvents')}
            </div>
            <a
              href="#news"
              className="font-dm-sans text-[#6B6B6B] text-[12px] hover:text-[#C8102E] transition-colors duration-200"
            >
              {t('fullCalendar')}
            </a>
          </div>

          <div className="border border-[#D4D4D4]">
            {events.map((event) => (
              <EventRow
                key={event.title}
                day={event.day}
                month={event.month}
                type={event.type}
                title={event.title}
                location={event.location}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
