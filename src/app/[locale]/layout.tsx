import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Providers from '@/components/providers';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Sarabun, Tajawal } from 'next/font/google';
import { NextFontWithVariable } from 'next/dist/compiled/@next/font';

// Sarabun font for English (all weights: 100-800)
const sarabun: NextFontWithVariable = Sarabun({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-sarabun',
  display: 'swap',
});

// Tajawal font for Arabic (all weights: 200-900)
const tajawal: NextFontWithVariable = Tajawal({
  subsets: ['arabic'],
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  variable: '--font-tajawal',
  display: 'swap',
});

/* ******** IMPORTANT *********

  * We must add generateStaticParams () for all routes and layout to make SSG
  * Notes: This layout is already made page.tsx SSG

  export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}
  
  ****************************
*/

// props type
type LocaleLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

// Metadata
export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, 'params'>) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t('metadata-title'),
    description: t('metadata-description'),
    icons: {
      icon: '/assets/logo1.svg',
    },
  };
}

// To make SSG
export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body
        className={`${sarabun.variable} ${tajawal.variable} font-sarabun antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
