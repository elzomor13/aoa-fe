'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import AcademyOfArtsLogo from '@/components/ui/Logo';

const social = [
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    name: 'X (Twitter)',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4l16 16M20 4L4 20" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
        <polygon points="9.75,15.02 15.5,12 9.75,8.98" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Footer() {
  const t = useTranslations('footer');

  const footerLinks = {
    [t('categories.institutes')]: [
      { label: t('links.theatricalArts'), href: '#institutes' },
      { label: t('links.cinema'), href: '#institutes' },
      { label: t('links.ballet'), href: '#institutes' },
      { label: t('links.music'), href: '#institutes' },
      { label: t('links.dramaticArts'), href: '#institutes' },
      { label: t('links.folkArts'), href: '#institutes' },
    ],
    [t('categories.students')]: [
      { label: t('links.admissions'), href: '#admissions' },
      { label: t('links.studentLife'), href: '#student-life' },
      { label: t('links.scholarships'), href: '#admissions' },
      { label: t('links.international'), href: '#admissions' },
      { label: t('links.alumniNetwork'), href: '#' },
    ],
    [t('categories.academy')]: [
      { label: t('links.about'), href: '#about' },
      { label: t('links.newsEvents'), href: '#news' },
      { label: t('links.faculty'), href: '#faculty' },
      { label: t('links.research'), href: '#' },
      { label: t('links.contact'), href: '#contact' },
    ],
  };

  return (
    <footer className="bg-[#0D0D0D]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div>
            <div className="mb-6">
              <AcademyOfArtsLogo height={120} theme="dark" />
            </div>
            <p className="font-dm-sans font-light text-white/40 text-[13px] leading-relaxed mb-2">
              {t('tagline')}
            </p>
            <p className="font-dm-sans font-light text-white/30 text-[13px] mb-6">
              {t('est')}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {social.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="text-white/40 hover:text-[#C8102E] transition-colors duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <div className="font-dm-mono text-white/30 text-[10px] tracking-[0.15em] uppercase mb-5">
                {category}
              </div>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-dm-sans font-light text-white/55 text-[13px] hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-dm-sans font-light text-white/30 text-[12px]">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-5">
            {[
              { key: 'privacy', label: t('privacy') },
              { key: 'accessibility', label: t('accessibility') },
              { key: 'terms', label: t('terms') },
            ].map((item) => (
              <a
                key={item.key}
                href="#"
                className="font-dm-sans font-light text-white/30 text-[12px] hover:text-white/60 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
