'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ToggleTheme() {
  // Hooks
  const { setTheme, themes } = useTheme();
  return (
    <DropdownMenu>
      {/* Menu trigger */}
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='hover:bg-transparent shadow-none rounded-none active:ring-0 m-0 p-0 h-fit w-fit'
        >
          {/* Light icon */}
          <Sun className='size-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />

          {/* Dark icon */}
          <Moon className='absolute size-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />

          {/* Label */}
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      {/* Menu Options  */}
      <DropdownMenuContent align='center'>
        {themes.map((theme, index) => (
          // Theme
          <DropdownMenuItem key={index} onClick={() => setTheme(theme)}>
            {theme}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
