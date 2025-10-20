import React from 'react';
import { cn } from '@/lib/utils/utils';

export default function authenticationHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'text-h-4 text-zinc-800 capitalize dark:text-zinc-50 mb-2',
        className
      )}
      {...props}
    />
  );
}
