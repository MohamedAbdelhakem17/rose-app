import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils/utils';

const buttonVariants = cva(
  // removed the font-weight property to match with the design
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm  transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Primary variants
        // changed the primary main color and hover state to match with the design
        primary:
          'bg-maroon-600  text-white hover:bg-maroon-500 text-sm active:bg-maroon-700 dark:bg-soft-pink-200 dark:text-zinc-800',
        'primary-light':
          'bg-soft-pink-200 text-maroon-600 hover:bg-soft-pink-300 active:bg-soft-pink-400',
        'primary-outline':
          'border border-maroon-500 text-maroon-500 bg-white hover:bg-maroon-50 active:bg-maroon-100',
        'primary-ghost':
          'text-maroon-500 hover:bg-maroon-50 active:bg-maroon-100',
        'primary-disabled':
          'border border-zinc-300 text-zinc-500 bg-white cursor-not-allowed',

        // Secondary variants
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        default: 'py-2 px-6 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
        'icon-lg': 'h-12 w-12',
      },
      state: {
        default: '',
        loading: 'cursor-wait',
        disabled: 'cursor-not-allowed opacity-50',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
