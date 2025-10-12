import { NextIntlClientProvider } from 'next-intl';
import React from 'react';
import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider>
      <QueryProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </QueryProvider>
    </NextIntlClientProvider>
  );
}
