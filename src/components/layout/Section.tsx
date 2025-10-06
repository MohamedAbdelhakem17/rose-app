import { cn } from '@/lib/utils/utils';
import * as React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn('py-16', className)}>
      <div className='container mx-auto px-4'>{children}</div>
    </section>
  );
}
