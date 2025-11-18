import { routing } from '@/i18n/routing';

// Local Types
export type LocaleType = (typeof routing.locales)[number];

// Hook props  type
type FormatDateHook = {
  locale: LocaleType;
  date: string;
};

export default function useDateFormat({ locale, date }: FormatDateHook) {
  // Select locale based language
  const dateLocale = locale === 'ar' ? 'ar-EG' : 'en-US';

  const formattedDate = new Date(date).toLocaleString(dateLocale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return { formattedDate };
}
