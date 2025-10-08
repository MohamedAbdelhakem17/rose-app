import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        // Design System Colors
        maroon: {
          50: '#fbeaea',
          100: '#f3c5c7',
          200: '#ea9fa2',
          300: '#e07a7d',
          400: '#d75458',
          500: '#cd2e33',
          600: '#a6252a',
          700: '#741c21',
          800: '#501419',
          900: '#2c0c10',
          950: '#20090c',
        },
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#dc2626',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        pink: {
          50: '#fff0f8',
          100: '#ffd6ec',
          200: '#ffaddc',
          300: '#ff84cb',
          400: '#ff5bba',
          500: '#f82ba9',
          600: '#d0198f',
          700: '#a41173',
          800: '#790a55',
          900: '#52043a',
          950: '#340021',
        },
        'soft-pink': {
          50: '#fff1f5',
          100: '#ffe0e7',
          200: '#ffc2d0',
          300: '#ffa3b9',
          400: '#ff85a2',
          500: '#ff668b',
          600: '#e65073',
          700: '#cc3a5b',
          800: '#b32443',
          900: '#99102c',
          950: '#590414',
        },
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bedbff',
          300: '#8ec5ff',
          400: '#50a2ff',
          500: '#2b7fff',
          600: '#155dfc',
          700: '#193cb8',
          800: '#193cb8',
          900: '#1c398e',
          950: '#162456',
        },
        emerald: {
          50: '#ecfdf5',
          100: '#d0fae5',
          200: '#a4f4cf',
          300: '#5ee9b5',
          400: '#00d492',
          500: '#00bc7d',
          600: '#009966',
          700: '#007a55',
          800: '#006045',
          900: '#004f3b',
          950: '#002c22',
        },
        yellow: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
        zinc: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#090906',
        },
        // Semantic colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      spacing: {
        //spacing for elements
        'element-xs': '0.25rem',
        'element-sm': '0.5rem',
        'element-md': '0.75rem',
        'element-lg': '1rem',
        'element-xl': '1.5rem',

        //spacing for sections
        'section-xs': '2rem',
        'section-sm': '4rem',
        'section-md': '6rem',
        'section-lg': '8rem',
        'section-xl': '10rem',
      },
    },
    fontSize: {
      // Headings
      'h-1': ['3rem', { lineHeight: '1.2', fontWeight: '700' }], // ~48px
      'h-2': ['2.5rem', { lineHeight: '1.25', fontWeight: '700' }], // ~40px
      'h-3': ['2.25rem', { lineHeight: '1.3', fontWeight: '700' }], // ~36px
      'h-4': ['1.5rem', { lineHeight: '1.4', fontWeight: '700' }], // ~24px
      'h-5': ['1.25rem', { lineHeight: '1.4', fontWeight: '700' }], // ~20px
      'h-6': ['1rem', { lineHeight: '1.5', fontWeight: '700' }], // ~16px

      // Paragraphs
      'p-1': ['1.125rem', { lineHeight: '1.7' }], // ~18px
      'p-2': ['1rem', { lineHeight: '1.7' }], // ~16px
      'p-3': ['0.875rem', { lineHeight: '1.6' }], // ~14px
      'p-4': ['0.75rem', { lineHeight: '1.5' }], // ~12px
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
