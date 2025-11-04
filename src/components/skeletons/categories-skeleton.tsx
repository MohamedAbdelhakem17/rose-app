import { Skeleton } from '@/components/ui/skeleton';

export default function CategoriesListSkeleton() {
  return (
    <section className='space-y-3 custom-scrollbar'>
      {/* Header */}
      <div className='flex items-center justify-between '>
        <Skeleton className='h-6 w-24' /> {/* title */}
        <Skeleton className='h-4 w-12' /> {/* reset link */}
      </div>

      {/* Categories skeleton list */}
      <div className='space-y-1 max-h-64 overflow-y-auto custom-scrollbar'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className='flex items-center gap-2 rounded bg-zinc-200 dark:bg-zinc-500  p-2'
          >
            <Skeleton className='w-8 h-8 rounded bg-zinc-400' /> {/* icon */}
            <Skeleton className='h-4 w-24' /> {/* text */}
          </div>
        ))}
      </div>
    </section>
  );
}
