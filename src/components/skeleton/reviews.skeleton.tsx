import { Section } from '../layout';

export default function ReviewSkeleton() {
  return (
    <Section>
      <div className='border-b border-b-zinc-200 dark:border-b-zinc-700 animate-pulse'>
        <div className='h-6 w-40 bg-zinc-200 dark:bg-zinc-700 rounded mb-4' />
        <div className='flex flex-col justify-start items-start gap-2'>
          <div className='h-4 w-32 bg-zinc-200 dark:bg-zinc-700 rounded' />
          <div className='h-6 w-20 bg-zinc-200 dark:bg-zinc-700 rounded' />
        </div>
      </div>

      <div className='flex flex-col gap-4 mt-6'>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className='p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg animate-pulse'
          >
            <div className='flex items-center gap-3 mb-3'>
              <div className='w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700' />
              <div className='h-4 w-24 bg-zinc-200 dark:bg-zinc-700 rounded' />
            </div>
            <div className='h-3 w-20 bg-zinc-200 dark:bg-zinc-700 rounded mb-2' />
            <div className='h-3 w-full bg-zinc-200 dark:bg-zinc-700 rounded' />
          </div>
        ))}
      </div>
    </Section>
  );
}
