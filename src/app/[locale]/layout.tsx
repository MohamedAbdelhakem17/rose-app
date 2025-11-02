import Providers from '@/components/providers';
import { routing } from '@/i18n/routing';
import { hasLocale } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { Sarabun, Tajawal } from 'next/font/google';
import { notFound } from 'next/navigation';
import { Toaster } from '../../components/ui/sonner';

const sarabun = Sarabun({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-sarabun',
  display: 'swap',
});

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  variable: '--font-tajawal',
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const t = await getTranslations({ locale });

  return {
    title: t('metadata-title'),
    description: t('metadata-description'),
    icons: { icon: '/assets/logo1.svg' },
  };
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body
        className={`${sarabun.variable} ${tajawal.variable} dark:bg-zinc-800 ${
          locale === 'ar' ? 'font-tajawal' : 'font-sarabun'
        } antialiased`}
      >
        <Providers locale={locale} messages={messages}>
          <Toaster
            richColors
            position='bottom-right'
            theme='dark'
            toastOptions={{
              className: '!bg-emerald-50 !text-zinc-800 border border-gray-700',
            }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
