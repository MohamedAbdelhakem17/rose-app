'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body className='flex flex-col items-center justify-center min-h-screen bg-zinc-800 text-white text-center p-6'>
        <h2 className='text-4xl font-bold mb-2 text-red-400'>
          Something went wrong!
        </h2>

        <p className='text-zinc-400 mb-6 max-w-md'>
          We’re sorry — an unexpected error occurred. Please try again.
        </p>

        <div className='flex gap-4'>
          <button
            onClick={() => reset()}
            className='px-6 py-3 bg-soft-pink-400 text-white rounded-full hover:bg-soft-pink-600 transition-colors'
          >
            Try again
          </button>

          <Link
            href='/'
            className='px-6 py-3 bg-zinc-700 text-white rounded-full hover:bg-zinc-600 transition-colors'
          >
            Go Home
          </Link>
        </div>
      </body>
    </html>
  );
}
