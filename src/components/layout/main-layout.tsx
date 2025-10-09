import { cn } from '@/lib/utils/utils';
import * as React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className={cn('min-h-screen bg-background', className)}>
      <div className='container mx-auto px-4 py-8'>{children}</div>
    </div>
  );
}
