import { Skeleton } from '@/components/ui/skeleton';

export default function OccasionsListSkeleton() {
  return (
    <section className='space-y-3'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <Skeleton className='h-6 w-24' /> {/* title */}
        <Skeleton className='h-4 w-12' /> {/* reset link */}
      </div>

      {/* Occasions grid skeleton */}
      <div className='grid grid-cols-2 gap-2 max-h-64 overflow-y-auto custom-scrollbar'>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className='h-24 rounded-xl bg-zinc-300' />
        ))}
      </div>
    </section>
  );
}
