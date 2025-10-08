import { NextIntlClientProvider } from 'next-intl';
import React from 'react';
import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider>
      <QueryProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </QueryProvider>
    </NextIntlClientProvider>
  );
}
