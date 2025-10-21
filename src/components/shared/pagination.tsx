'use client';

import useSearchFilter from '@/hooks/use-search-filter';
import { cn } from '@/lib/utils/utils';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { useFormatter, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { createContext, useContext } from 'react';

type PaginationContextType = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (_page: number) => void;
  isRtl?: boolean;
};

const PaginationContext = createContext<PaginationContextType | null>(null);

const usePagination = () => {
  const context = useContext(PaginationContext);
  if (!context)
    throw new Error('usePagination must be used inside <Pagination.Root>');
  return context;
};

const Root = ({
  totalPages,
  pathname,
  children,
}: React.PropsWithChildren<{
  totalPages: number;
  pathname: string;
}>) => {
  // Localization
  const locale = useLocale();
  const isRtl = locale === 'ar';

  // Navigation
  const searchParams = useSearchParams();

  // Hooks
  const handleFilterChange = useSearchFilter();

  // Get current page from url
  const currentPage = Number(searchParams.get('page')) || 1;

  // Functions
  const setCurrentPage = (page: number) => {
    handleFilterChange(pathname, 'page', String(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PaginationContext.Provider
      value={{ currentPage, totalPages, setCurrentPage, isRtl }}
    >
      <div className='flex items-center justify-center gap-4 mt-6 border-t py-6 px-2 w-full col-span-3'>
        {children}
      </div>
    </PaginationContext.Provider>
  );
};

/* ----------------- Navigation Buttons ----------------- */
const PaginationButton = ({
  onClick,
  disabled,
  active,
  children,
}: {
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      'px-2 py-4 border rounded-lg size-8 flex items-center justify-center text-sm font-semibold',
      active && 'bg-maroon-600 text-zinc-100',
      disabled && 'opacity-50 cursor-not-allowed'
    )}
  >
    {children}
  </button>
);

const First = () => {
  const { setCurrentPage, isRtl } = usePagination();
  return (
    <PaginationButton onClick={() => setCurrentPage(1)}>
      <ChevronsLeft className={cn(isRtl && '-scale-x-100')} />
    </PaginationButton>
  );
};

const Previous = () => {
  const { currentPage, setCurrentPage, isRtl } = usePagination();
  return (
    <PaginationButton
      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
      disabled={currentPage === 1}
    >
      <ChevronLeft className={cn(isRtl && '-scale-x-100')} />
    </PaginationButton>
  );
};

const Next = () => {
  const { currentPage, totalPages, setCurrentPage, isRtl } = usePagination();
  return (
    <PaginationButton
      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
      disabled={currentPage === totalPages}
    >
      <ChevronRight className={cn(isRtl && '-scale-x-100')} />
    </PaginationButton>
  );
};

const Last = () => {
  const { totalPages, setCurrentPage, isRtl } = usePagination();
  return (
    <PaginationButton onClick={() => setCurrentPage(totalPages)}>
      <ChevronsRight className={cn(isRtl && '-scale-x-100')} />
    </PaginationButton>
  );
};

/* ----------------- Pages ----------------- */
const Pages = () => {
  // Localization
  const format = useFormatter();

  // Hooks
  const { currentPage, totalPages, setCurrentPage, isRtl } = usePagination();

  // Function
  const getPageNumbers = (): (number | string)[] => {
    if (currentPage < 3) return [1, 2, 3, '...', totalPages];
    if (currentPage >= totalPages - 2)
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ];
  };

  return (
    <>
      {getPageNumbers().map((page, i) =>
        page === '...' ? (
          <span key={i}>...</span>
        ) : (
          <PaginationButton
            key={i}
            onClick={() => setCurrentPage(page as number)}
            active={currentPage === page}
          >
            {format.number(page as number, {
              numberingSystem: `${isRtl ? 'arab' : 'latn'}`,
            })}
          </PaginationButton>
        )
      )}
    </>
  );
};

/* ----------------- Export Compound ----------------- */
const Pagination = Object.assign(
  (props: { totalPages: number; pathname: string }) => (
    <Root {...props}>
      <First />
      <Previous />
      <Pages />
      <Next />
      <Last />
    </Root>
  ),
  { Root, First, Previous, Pages, Next, Last }
);

export default Pagination;
