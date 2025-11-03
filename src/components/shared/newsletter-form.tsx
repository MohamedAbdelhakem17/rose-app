'use client';

import { useNewsletter } from '@/hooks/use-newsletter';
import { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export function NewsletterForm() {
  const { subscribe, loading } = useNewsletter();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await subscribe(email);
      toast.success('Subscribed successfully!');
      console.log('Subscribed successfully');
      setEmail('');
    } catch (err: any) {
      toast.error(err.message || 'Failed to subscribe');
    }
  };

  return (
    <div className='flex items-center justify-center flex-col gap-6'>
      <div>
        <h3 className='text-lg font-semibold text-soft-pink-300'>
          Get <span className='text-zinc-100'>20% </span>Off Discount Coupon
        </h3>
        <p className='text-sm text-zinc-400'>
          By subscribing to our newsletter
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className='flex gap-2 relative items-center'
      >
        <Input
          type='email'
          placeholder='Enter Your Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          className='bg-zinc-600 border-zinc-700 text-zinc-100 placeholder:text-zinc-400 focus:border-pink-500 focus:ring-pink-500 rounded-full w-96'
          required
        />

        <Button
          type='submit'
          variant='primary'
          size='default'
          className='px-6 bg-maroon-50 text-maroon-700 absolute right-0 rounded-full hover:text-soft-pink-50'
          disabled={loading}
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
          <ArrowRight className='ml-2 h-4 w-4' />
        </Button>
      </form>
    </div>
  );
}
