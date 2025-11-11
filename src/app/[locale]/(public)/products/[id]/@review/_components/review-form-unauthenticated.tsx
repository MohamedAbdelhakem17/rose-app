import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { UserX2 } from 'lucide-react';
import React from 'react';
import ReviewForm from './review-form';

export default function ReviewFormUnauthenticated() {
  return (
    <ReviewForm className='relative '>
      <div className='absolute top-0 flex flex-col justify-center items-center text-zinc-600 dark:text-zinc-300 gap-2 backdrop-blur-sm w-full h-full bg-zinc-300/25 dark:bg-zinc-600/25 '>
        <UserX2 size={70} />
        <p className='capitalize text-xl'>you must login to rating</p>
        <Link href={'/login'}>
          <Button variant={'primary'}>Login</Button>
        </Link>
      </div>
    </ReviewForm>
  );
}
