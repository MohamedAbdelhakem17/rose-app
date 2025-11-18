import { NextIntlClientProvider } from 'next-intl';
import React from 'react';
import { Toaster } from '../../components/ui/sonner';
import AuthProvider from './auth-provider';
import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';

export default function Providers({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages?: Record<string, string>;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <QueryProvider>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Toaster
            richColors
            position='bottom-right'
            theme='dark'
            toastOptions={{
              className: '!bg-emerald-50 !text-zinc-800 border border-gray-700',
            }}
          />
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </QueryProvider>
    </NextIntlClientProvider>
  );
}
