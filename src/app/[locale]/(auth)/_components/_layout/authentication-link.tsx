import Link from 'next/link';
import React from 'react';

type PropsType = {
  link: {
    label: string;
    href: string;
  };
  message: string;
} & React.HTMLAttributes<HTMLParagraphElement>;

/**
 * AuthenticationLink Component
 *
 * Renders a short message followed by a clickable link.
 * Commonly used in authentication pages such as login or signup forms
 * to direct users to related pages (e.g., "Don’t have an account yet? Sign up").
 *
 * @example
 * ```tsx
 * <AuthenticationLink
 *   message="Don’t have an account yet?"
 *   link={{ href: "/register", label: "Sign up" }}
 * />
 * ```
 *
 * @param {PropsType} props - Component props.
 * @returns {JSX.Element} A paragraph containing the message and a Next.js link.
 */

export default function AuthenticationLink({
  message,
  link,
  ...props
}: PropsType): JSX.Element {
  return (
    <p
      className='border-t border-t-zinc-200 dark:border-t-zinc-600 pt-5 dark:text-white text-zinc-800 my-9 text-center'
      {...props}
    >
      {message}
      <Link
        href={link.href}
        className='ms-1 text-sm font-bold text-maroon-700 dark:text-soft-pink-300'
      >
        {link.label}
      </Link>
    </p>
  );
}
