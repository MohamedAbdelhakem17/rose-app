import { Footer } from '@/components/layout/footer/Footer';
import { Header } from '@/components/layout/navbar';
import React from 'react';

export default function RouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
