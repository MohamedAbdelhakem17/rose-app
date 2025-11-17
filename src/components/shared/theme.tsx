'use client';

import { Button } from '../ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Theme() {
  // Theme
  const { theme, setTheme } = useTheme();

  // Functions
  function toggleTheme() {
    if (theme === 'dark' || theme === 'system') setTheme('light');
    else setTheme('dark');
  }

  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={() => toggleTheme()}
      className='dark:text-white dark:hover:bg-zinc-500 hover:text-maroon-600 p-0 h-auto font-tajawal'
    >
      {theme === 'dark' ? (
        <Sun className='h-5 w-5' />
      ) : (
        <Moon className='h-5 w-5' />
      )}
    </Button>
  );
}
