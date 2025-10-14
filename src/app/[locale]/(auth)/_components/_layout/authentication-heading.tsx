import { cn } from '@/lib/utils/utils';
import React from 'react';

/**
 * AuthenticationHeading Component
 *
 * A wrapper component used for grouping authentication-related headings and descriptions.
 * Commonly used in login/register pages to provide consistent section styling.
 *
 * @example
 * ```tsx
 * <AuthenticationHeading>
 *   <AuthenticationHeading.title>Welcome Back</AuthenticationHeading.title>
 *   <AuthenticationHeading.description>
 *     Please sign in to your account
 *   </AuthenticationHeading.description>
 * </AuthenticationHeading>
 * ```
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Standard HTML div attributes.
 * @returns {JSX.Element} A styled div element serving as a heading container.
 */

export default function AuthenticationHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
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

/**
 * AuthenticationHeading.title
 *
 * Sub component used for rendering the main heading text (usually `<h2>`).
 *
 * @example
 * ```tsx
 * <AuthenticationHeading.title>Sign in</AuthenticationHeading.title>
 * ```
 *
 * @param {React.HTMLAttributes<HTMLHeadingElement>} props - Standard HTML heading attributes.
 * @returns {JSX.Element} A styled `<h2>` element.
 */
AuthenticationHeading.title = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>): JSX.Element => {
  return (
    <h2
      className={cn(
        'text-zinc-800 dark:text-zinc-50 font-semibold text-h-4',
        className
      )}
      {...props}
    />
  );
};

/**
 * AuthenticationHeading.description
 *
 * Sub component used for rendering a short descriptive text below the heading.
 *
 * @example
 * ```tsx
 * <AuthenticationHeading.description>
 *   Please enter your credentials to continue
 * </AuthenticationHeading.description>
 * ```
 *
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props - Standard HTML paragraph attributes.
 * @returns {JSX.Element} A styled `<p>` element.
 */

AuthenticationHeading.description = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>): JSX.Element => {
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
