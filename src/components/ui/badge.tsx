import { cn } from '@/lib/utils/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        primary:
          'bg-maroon-600 text-white hover:bg-maroon-700 border-transparent',
        secondary:
          'border-transparent bg-maroon-50 text-maroon-600 hover:bg-maroon-100',
        subtle:
          'border-transparent bg-zinc-100 text-zinc-700 hover:bg-zinc-200',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        // Design system variants
        maroon:
          'border-transparent bg-maroon-500 text-white hover:bg-maroon-600',
        pink: 'border-transparent bg-pink-500 text-white hover:bg-pink-600',
        'soft-pink':
          'border-transparent bg-soft-pink-500 text-white hover:bg-soft-pink-600',
        blue: 'border-transparent bg-blue-500 text-white hover:bg-blue-600',
        emerald:
          'border-transparent bg-emerald-500 text-white hover:bg-emerald-600',
        yellow:
          'border-transparent bg-yellow-500 text-black hover:bg-yellow-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
