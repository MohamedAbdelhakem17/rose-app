'use client';
import { cn } from '@/lib/utils/utils';
import { Eye, EyeOff } from 'lucide-react';
import * as React from 'react';

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, disabled, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isActive, setActive] = React.useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };
  return (
    <div className=' relative h-[49px] w-[406px] '>
      <label
        htmlFor='password'
        className={cn(
          `capitalize font-medium text-zinc-800  w-[406px] h-[23px] align-text-top
               mb-1.5 leading-[100%] 
            `,
          disabled &&
            `capitalize font-medium text-zinc-400  w-[406px] h-[23px] align-text-top
               mb-1.5 leading-[100%] `
        )}
      >
        pasaword
      </label>
      <input
        type={showPassword ? 'text' : 'password'}
        id='password'
        className={cn(
          `flex h-[49px] w-[406px] rounded-[10px] border-2 border-zinc-300 p-4 text-sm 
              placeholder:text-sm  placeholder:text-zinc-400
             hover:border-zinc-400 
             focus:border-maroon-600 
              error:'border-red-600
             `,
          disabled && `bg-zinc-100 border-zinc-100`,
          isActive && 'text-zinc-800',

          className
        )}
        placeholder='******'
        ref={ref}
        onBlur={() => setActive(false)}
        onInput={() => setActive(true)}
        {...props}
      />
      <button
        type='button'
        onClick={togglePasswordVisibility}
        className='absolute top-1/2 right-4 translate-y-3.5  '
      >
        {showPassword ? (
          <Eye
            className={cn(
              'w-4.5 h-4.5 text-zinc-400 ',
              isActive && 'w-4.5 h-4.5 text-zinc-800'
            )}
          />
        ) : (
          <EyeOff
            className={cn(
              'w-4.5 h-4.5 text-zinc-400',
              isActive && 'w-4.5 h-4.5 text-zinc-800'
            )}
          />
        )}
      </button>
    </div>
  );
});
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
