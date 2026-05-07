'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import AcademyOfArtsLogo from '@/components/ui/Logo';

export default function Navbar() {
  const t = useTranslations('navbar');
  const tInstitutes = useTranslations('institutes');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);

  const institutes = [
    { nameKey: 'theatricalName', href: '#institutes' },
    { nameKey: 'cinemaName', href: '#institutes' },
    { nameKey: 'balletName', href: '#institutes' },
    { nameKey: 'arabicMusicName', href: '#institutes' },
    { nameKey: 'artCriticismName', href: '#institutes' },
    { nameKey: 'folkArtsName', href: '#institutes' },
  ];

  const navLinks = [
    { labelKey: 'about', href: '#about' },
    { labelKey: 'institutes', href: '#institutes', hasMega: true },
    { labelKey: 'newsEvents', href: '#news' },
    { labelKey: 'admissions', href: '#admissions' },
    { labelKey: 'studentLife', href: '#student-life' },
    { labelKey: 'faculty', href: '#faculty' },
    { labelKey: 'contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'border-b border-white/10' : ''
        } bg-[#0D0D0D]`}
      >
        <nav className="max-w-[1440px] mx-auto px-6 lg:px-10 h-16 lg:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0" aria-label="Academy of Arts — Home">
            <AcademyOfArtsLogo height={60} theme="dark" />
          </Link>

          {/* Center nav — desktop */}
          <div className="hidden lg:flex items-center gap-0">
            {navLinks.map((link) =>
              link.hasMega ? (
                <div
                  key={link.labelKey}
                  ref={megaRef}
                  className="relative"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                >
                  <button
                    className="group relative px-4 py-2 font-dm-sans text-[15px] font-400 text-white/80 hover:text-white transition-colors duration-200 tracking-wide"
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                  >
                    {t(link.labelKey as Parameters<typeof t>[0])}
                    <span className="absolute bottom-0 left-4 right-4 h-px bg-[#C8102E] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                  </button>

                  <AnimatePresence>
                    {megaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[520px] bg-[#1A1A1A] border border-white/10"
                      >
                        <div className="grid grid-cols-2 p-2">
                          {institutes.map((inst) => (
                            <Link
                              key={inst.nameKey}
                              href={inst.href}
                              className="group px-4 py-3 text-white/70 hover:text-white hover:bg-[#222] transition-all duration-200 flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 bg-[#C8102E] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                              <span className="font-dm-sans text-[13px]">
                                {tInstitutes(inst.nameKey as any)}
                              </span>
                            </Link>
                          ))}
                        </div>
                        <div className="border-t border-white/10 px-6 py-3">
                          <Link href="#institutes" className="font-dm-mono text-[11px] text-[#C8102E] tracking-[0.15em] uppercase hover:text-white transition-colors">
                            {t('viewAllInstitutes')}
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.labelKey}
                  href={link.href}
                  className="group relative px-4 py-2 font-dm-sans text-[15px] text-white/80 hover:text-white transition-colors duration-200 tracking-wide"
                >
                  {t(link.labelKey as Parameters<typeof t>[0])}
                  <span className="absolute bottom-0 left-4 right-4 h-px bg-[#C8102E] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                </Link>
              )
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              aria-label={t('search')}
              className="hidden lg:flex text-white/60 hover:text-white transition-colors duration-200 p-1"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="22" y2="22" />
              </svg>
            </button>

            <LanguageSwitcher />

            <Link
              href="#admissions"
              className="hidden lg:block bg-[#C8102E] hover:bg-[#9B0D21] text-white font-dm-sans text-[15px] font-500 tracking-wide px-5 py-2.5 transition-colors duration-200"
            >
              {t('applyNow')}
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label={t('openMenu')}
              className="lg:hidden text-white p-1"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-[#0D0D0D] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-16">
              <Link href="/" onClick={() => setMobileOpen(false)}>
                <AcademyOfArtsLogo height={52} theme="dark" />
              </Link>
              <div className="flex items-center gap-3">
                <LanguageSwitcher />
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label={t('closeMenu')}
                  className="text-white p-1"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
              className="flex-1 flex flex-col justify-center px-8 gap-2"
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.labelKey}
                  variants={{ hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } } }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block font-cormorant text-white text-5xl font-light hover:text-[#C8102E] transition-colors duration-300 py-2"
                  >
                    {t(link.labelKey as Parameters<typeof t>[0])}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <div className="px-8 pb-10">
              <Link
                href="#admissions"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center bg-[#C8102E] hover:bg-[#9B0D21] text-white font-dm-sans text-[13px] font-500 tracking-wide px-5 py-4 transition-colors duration-200"
              >
                {t('applyNow')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
