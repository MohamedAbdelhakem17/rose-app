export default function CategorySkeleton() {
  return (
    <section className='bg-gray-50 min-h-screen px-10 py-8'>
      <div className='bg-white rounded-2xl shadow-sm border border-zinc-100'>
        {/* Header skeleton */}
        <div className='px-6 py-6 flex items-center justify-between border-b border-zinc-100'>
          <div className='h-8 w-48 bg-gray-200 rounded animate-pulse' />
          <div className='h-10 w-32 bg-gray-200 rounded-full animate-pulse' />
        </div>

        {/* Search skeleton */}
        <div className='px-6 py-4 border-b border-zinc-100'>
          <div className='h-10 w-full bg-gray-200 rounded-lg animate-pulse' />
        </div>

        {/* Table skeleton */}
        <div className='px-6 pb-6'>
          <div className='overflow-hidden rounded-xl border border-zinc-100'>
            {/* Table header */}
            <div className='bg-gray-50 px-6 py-4 border-b border-zinc-100 flex gap-4'>
              <div className='h-6 w-6 bg-gray-200 rounded animate-pulse' />
              <div className='h-6 flex-1 bg-gray-200 rounded animate-pulse' />
              <div className='h-6 w-24 bg-gray-200 rounded animate-pulse' />
            </div>

            {/* Table rows */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className='px-6 py-4 border-b border-zinc-100 flex gap-4 last:border-b-0'
              >
                <div className='h-6 w-6 bg-gray-200 rounded animate-pulse' />
                <div className='h-6 flex-1 bg-gray-200 rounded animate-pulse' />
                <div className='h-6 w-24 bg-gray-200 rounded animate-pulse' />
              </div>
            ))}
          </div>

          {/* Pagination skeleton */}
          <div className='flex items-center justify-center gap-4 mt-6'>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className='h-8 w-8 bg-gray-200 rounded animate-pulse'
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
