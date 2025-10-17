import { cn } from '@/lib/utils/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

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
          'bg-zinc-200 text-zinc-800 hover:bg-zinc-300 active:bg-zinc-400',
        'secondary-light':
          'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 active:bg-zinc-300',
        'secondary-outline':
          'border border-zinc-300 text-zinc-700 bg-white hover:bg-zinc-50 active:bg-zinc-100',
        'secondary-ghost': 'text-zinc-600 hover:bg-zinc-50 active:bg-zinc-100',
        'secondary-disabled':
          'border border-zinc-200 text-zinc-400 bg-white cursor-not-allowed',

        // Destructive variants
        destructive: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
        'destructive-outline':
          'border border-red-500 text-red-500 bg-white hover:bg-red-50 active:bg-red-100',
        'destructive-ghost': 'text-red-500 hover:bg-red-50 active:bg-red-100',

        // Success variants
        success:
          'bg-emerald-500 text-white hover:bg-emerald-600 active:bg-emerald-700',
        'success-outline':
          'border border-emerald-500 text-emerald-500 bg-white hover:bg-emerald-50 active:bg-emerald-100',

        // Warning variants
        warning:
          'bg-yellow-500 text-black hover:bg-yellow-600 active:bg-yellow-700',
        'warning-outline':
          'border border-yellow-500 text-yellow-500 bg-white hover:bg-yellow-50 active:bg-yellow-100',

        // Info variants
        info: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700',
        'info-outline':
          'border border-blue-500 text-blue-500 bg-white hover:bg-blue-50 active:bg-blue-100',

        // Ghost variants
        ghost: 'text-zinc-700 hover:bg-zinc-100 active:bg-zinc-200',
        'ghost-disabled': 'text-zinc-400 cursor-not-allowed',

        // Link variants
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
      state: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      state,
      asChild = false,
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isDisabled = disabled || loading;
    const currentState = loading
      ? 'loading'
      : isDisabled
        ? 'disabled'
        : state || 'default';

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, state: currentState, className })
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
        {!loading && leftIcon && <span className='mr-2'>{leftIcon}</span>}
        {loading ? loadingText || children : children}
        {!loading && rightIcon && <span className='ml-2'>{rightIcon}</span>}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
