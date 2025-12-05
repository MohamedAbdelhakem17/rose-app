import * as React from 'react';

import { cn } from '@/lib/utils/utils';
import { Eye, EyeOff } from 'lucide-react';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    // Sate
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    // Function
    const togglePasswordVisibility = () => {
      setIsPasswordVisible(prev => !prev);
    };

    // Variables
    const IS_PASSWORD = type === 'password';

    // Base Element
    const inputElement = (
      <input
        type={isPasswordVisible ? 'text' : type}
        className={cn(
          'flex w-full border border-input bg-transparent px-3 py-3 text-base transition-colors file:border-0 rounded-md file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-gray-200 shadow-none dark:bg-zinc-700 dark:text-zinc-400 dark:border-zinc-500',
          'aria-[invalid=true]:border-red-600',
          'focus-visible:outline-none',
          'aria-[invalid=true]:focus-visible:ring-0',
          'aria-[invalid=false]:focus-visible:ring-1 aria-[invalid=false]:focus-visible:ring-maroon-600',
          className
        )}
        ref={ref}
        {...props}
      />
    );

    // Return default input
    if (!IS_PASSWORD) {
      return inputElement;
    }
    // Return Password input
    return (
      <div className='relative'>
        {inputElement}
        <button
          type='button'
          onClick={togglePasswordVisibility}
          aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
          className='absolute end-2 top-2/4 -translate-y-1/2'
        >
          {isPasswordVisible ? (
            <EyeOff strokeWidth={1} className='w-4 h-4' />
          ) : (
            <Eye strokeWidth={1} className='w-4 h-4' />
          )}
        </button>
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
