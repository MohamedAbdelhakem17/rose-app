import { Footer, Header } from '@/components/layout';
import React from 'react';

export default function RouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className='min-h-screen flex flex-col justify-between '>
        <Header />
        {children}
        <Footer />
      </main>
    </>
  );
}
