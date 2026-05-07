import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans, DM_Mono, Cairo } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cairo',
  display: 'swap',
});

const SITE_URL = 'https://aoa.aoa-online.uk';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Academy of Arts — أكاديمية الفنون | Cairo, Egypt',
  description:
    "Egypt's foremost conservatory of performing and visual arts — shaping generations of artists, critics, and cultural leaders across eight disciplines since 1959.",
  keywords: ['Academy of Arts', 'Egypt', 'Cairo', 'Arts Education', 'Theatre', 'Cinema', 'Ballet', 'Music'],
  openGraph: {
    title: 'Academy of Arts — أكاديمية الفنون',
    description: "Egypt's premier institution for performing and visual arts, established 1959.",
    type: 'website',
    url: SITE_URL,
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Academy of Arts — أكاديمية الفنون' }],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === 'ar';

  return (
    <html
      lang={locale}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable} ${cairo.variable}`}
    >
      <body className={`font-dm-sans bg-[#0D0D0D] text-white overflow-x-hidden${isRTL ? ' font-cairo text-[110%]' : ''}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
