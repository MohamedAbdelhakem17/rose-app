import { Skeleton } from '@/components/ui/skeleton';

export default function CommentSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className='space-y-3 py-3 border-b border-zinc-200 dark:border-zinc-700'
        >
          {/* Header */}
          <div className='flex items-center gap-3'>
            {/* Image */}
            <Skeleton className='w-12 h-12 rounded-full' />
            <div className='flex flex-col gap-2'>
              {/* Username */}
              <Skeleton className='h-4 w-24' />
              {/* Date */}
              <Skeleton className='h-3 w-16' />
            </div>
          </div>

          {/* Star rating */}
          <div className='flex items-center gap-2'>
            {Array.from({ length: 5 }).map((_, j) => (
              <Skeleton key={j} className='w-5 h-5' />
            ))}
          </div>

          {/* Title */}
          <Skeleton className='h-4 w-40' />

          {/* Comment */}
          <div className='space-y-2'>
            {Array.from({ length: 3 }).map((_, k) => (
              <Skeleton key={k} className='h-3 w-3/4' />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
