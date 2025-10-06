import { Footer, Header } from '@/components/layout';
import { QueryProvider } from '@/components/providers';
import type { Metadata } from 'next';
import { Sarabun, Tajawal } from 'next/font/google';
import './globals.css';

// Sarabun font for English (all weights: 100-800)
const sarabun = Sarabun({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-sarabun',
  display: 'swap',
});

// Tajawal font for Arabic (all weights: 200-900)
const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  variable: '--font-tajawal',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rose App',
  description: 'Rose App E-Commerce',
  icons: {
    icon: '/assets/logo1.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${sarabun.variable} ${tajawal.variable} font-sarabun antialiased`}
      >
        <QueryProvider>
          <Header />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
