'use client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import * as React from 'react';
import { Input } from './index';
import { Button } from '../ui/button';
import {
  NewsletterResponse,
  subscribeToNewsletter,
} from '@/lib/actions/newsletter-action';
import { toast } from 'sonner';
import { cn } from '@/lib/utils/utils';
import { useLocale, useTranslations } from 'next-intl';

export function NewsletterForm() {
  // States
  const [email, setEmail] = React.useState('');

  // Locale
  const locale = useLocale();

  // Translate
  const t = useTranslations();

  // variables
  const isRTL: boolean = locale === 'ar';

  // Functions
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Handle newsletter subscription
    const payload: NewsletterResponse = await subscribeToNewsletter(email);
    if ('message' in payload) {
      toast.success(payload.message);
    } else {
      toast.error(payload.error);
    }
    setEmail('');
  }

  return (
    <div className='flex  items-center justify-center flex-col gap-6'>
      <div>
        <h3 className='text-lg font-semibold text-soft-pink-300'>
          {t.rich('footer-title', {
            span: chunks => <span className='text-zinc-100'>{chunks} </span>,
          })}
        </h3>
        <p className='text-sm text-zinc-400'>{t('footer-subtitle')}</p>
      </div>
      <form onSubmit={handleSubmit} className='flex gap-2 relative'>
        <Input
          type='text'
          placeholder='Enter Your Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          className='bg-zinc-600 border-zinc-700 text-zinc-100 placeholder:text-zinc-400 focus:border-pink-500 focus:ring-pink-500 rounded-full w-96 '
          required
        />
        <Button
          type='submit'
          variant='primary'
          size='default'
          className={cn(
            'px-6 bg-maroon-50 text-maroon-700 absolute rounded-full',
            isRTL ? 'left-0' : 'right-0'
          )}
        >
          {t('footer-subscribe-button')}
          {isRTL ? (
            <ArrowLeft className='ml-2 h-4 w-4' />
          ) : (
            <ArrowRight className='ml-2 h-4 w-4' />
          )}
        </Button>
      </form>
    </div>
  );
}
