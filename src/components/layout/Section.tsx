import { cn } from '@/lib/utils/utils';
import * as React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullScreen?: boolean;
}

export function Section({
  children,
  className,
  id,
  fullScreen = false,
}: SectionProps) {
  return (
    <section id={id} className={cn('py-16', className)}>
      <div
        className={`${fullScreen ? 'min-w-screen px-0' : 'container mx-auto px-4'}`}
      >
        {children}
      </div>
    </section>
  );
}
