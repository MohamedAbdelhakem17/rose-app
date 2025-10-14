import { cn } from '@/lib/utils/utils';
import React from 'react';

export default function ForgotPasswordHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'border-b border-b-zinc-200 dark:border-b-zinc-600 space-y-1 mb-6',
        className
      )}
      {...props}
    />
  );
}

ForgotPasswordHeading.title = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h2
      className={cn(
        'text-zinc-800 dark:text-zinc-50 font-semibold text-h-4  ',
        className
      )}
      {...props}
    />
  );
};

ForgotPasswordHeading.description = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p
      className={cn(
        'text-zinc-700 dark:text-zinc-50 font-normal text-base',
        className
      )}
      {...props}
    />
  );
};
