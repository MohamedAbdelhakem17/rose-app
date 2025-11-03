import { cn } from '@/lib/utils/utils';

export default function SectionTitle({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        'relative w-fit text-h-3 md:text-h-3 text-maroon-700 dark:text-soft-pink-200 font-semibold font-poppins',
        "before:absolute before:content-[''] before:w-[75%] before:h-5 before:rounded-full",
        'before:bg-soft-pink-100 before:bottom-0 before:start-0 before:-z-10 dark:before:bg-zinc-700',
        "after:absolute after:content-[''] after:w-[30%] after:h-[3px] after:bg-soft-pink-600 dark:after:bg-soft-pink-500",
        'after:bottom-0 after:start-0 after:rounded-full',
        className
      )}
    >
      {title}
    </h2>
  );
}
