'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Contact() {
  const t = useTranslations('contact');
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const leftInView = useInView(leftRef, { once: true, margin: '-100px' });
  const rightInView = useInView(rightRef, { once: true, margin: '-100px' });

  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const contactItems = [
    {
      label: t('addressLabel'),
      value: t('addressValue'),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      ),
    },
    {
      label: t('phoneLabel'),
      value: '+20 2 3748 0000',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.2 6.2l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
      ),
    },
    {
      label: t('emailLabel'),
      value: 'info@academyofarts.edu.eg',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
  ];

  const subjects = [
    t('subjectGeneral'),
    t('subjectAdmissions'),
    t('subjectMedia'),
    t('subjectEvents'),
    t('subjectResearch'),
    t('subjectAlumni'),
  ];

  return (
    <section id="contact" className="bg-[#F5F5F5] py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, y: 24 }}
            animate={leftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="font-dm-mono text-[#C8102E] text-[11px] tracking-[0.2em] uppercase mb-4">
              {t('label')}
            </div>
            <h2
              className="font-cormorant font-light text-[#0D0D0D] leading-none mb-5"
              style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}
            >
              {t('headline')}
            </h2>
            <div className="w-12 h-px bg-[#C8102E] mb-8" />
            <p className="font-dm-sans font-light text-[#6B6B6B] text-[15px] leading-relaxed mb-10 max-w-[42ch]">
              {t('body')}
            </p>

            <div className="space-y-6">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="text-[#0D0D0D] flex-shrink-0 mt-0.5">{item.icon}</div>
                  <div>
                    <div className="font-dm-mono text-[#6B6B6B] text-[10px] tracking-[0.12em] uppercase mb-1">
                      {item.label}
                    </div>
                    <div className="font-dm-sans font-light text-[#0D0D0D] text-[14px]">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, y: 24 }}
            animate={rightInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
          >
            <div className="bg-white border border-[#D4D4D4] p-8 lg:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-12 h-12 border border-[#C8102E] flex items-center justify-center mb-6">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="1.5">
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                  </div>
                  <h3 className="font-cormorant text-[#0D0D0D] text-2xl font-light mb-3">{t('messageSent')}</h3>
                  <p className="font-dm-sans font-light text-[#6B6B6B] text-[14px]">
                    {t('thankYou')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-dm-mono text-[10px] tracking-[0.12em] uppercase text-[#6B6B6B] mb-2">
                        {t('firstName')}
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.firstName}
                        onChange={(e) => setFormState(s => ({ ...s, firstName: e.target.value }))}
                        className="w-full border border-[#D4D4D4] bg-[#F5F5F5] px-4 py-3 font-dm-sans text-[14px] text-[#0D0D0D] outline-none focus:border-[#C8102E] transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block font-dm-mono text-[10px] tracking-[0.12em] uppercase text-[#6B6B6B] mb-2">
                        {t('lastName')}
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.lastName}
                        onChange={(e) => setFormState(s => ({ ...s, lastName: e.target.value }))}
                        className="w-full border border-[#D4D4D4] bg-[#F5F5F5] px-4 py-3 font-dm-sans text-[14px] text-[#0D0D0D] outline-none focus:border-[#C8102E] transition-colors duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-dm-mono text-[10px] tracking-[0.12em] uppercase text-[#6B6B6B] mb-2">
                      {t('emailAddress')}
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                      className="w-full border border-[#D4D4D4] bg-[#F5F5F5] px-4 py-3 font-dm-sans text-[14px] text-[#0D0D0D] outline-none focus:border-[#C8102E] transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <label className="block font-dm-mono text-[10px] tracking-[0.12em] uppercase text-[#6B6B6B] mb-2">
                      {t('subject')}
                    </label>
                    <select
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState(s => ({ ...s, subject: e.target.value }))}
                      className="w-full border border-[#D4D4D4] bg-[#F5F5F5] px-4 py-3 font-dm-sans text-[14px] text-[#0D0D0D] outline-none focus:border-[#C8102E] transition-colors duration-200 appearance-none cursor-pointer"
                    >
                      <option value="">{t('selectSubject')}</option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-dm-mono text-[10px] tracking-[0.12em] uppercase text-[#6B6B6B] mb-2">
                      {t('message')}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                      className="w-full border border-[#D4D4D4] bg-[#F5F5F5] px-4 py-3 font-dm-sans text-[14px] text-[#0D0D0D] outline-none focus:border-[#C8102E] transition-colors duration-200 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C8102E] hover:bg-[#9B0D21] text-white font-dm-mono text-[11px] tracking-[0.15em] uppercase py-4 transition-colors duration-200"
                  >
                    {t('sendMessage')}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
