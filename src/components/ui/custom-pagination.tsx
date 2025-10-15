'use client';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationLast,
  PaginationFirst,
} from '@/components/ui/pagination';
type paginationParams = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  direction?: 'rtl' | 'ltr';
};

export function CustomPagination({
  currentPage,
  totalPages,
  setCurrentPage,
  direction,
}: paginationParams) {
  const handleFirstPage = () => {
    setCurrentPage(1);
  };
  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const pagesToShow = [];
  //pages
  if (currentPage <= 3) {
    pagesToShow.push(1, 2, 3);
  } else if (currentPage >= totalPages - 2) {
    pagesToShow.push(totalPages - 2, totalPages - 1, totalPages);
  } else {
    pagesToShow.push(currentPage - 1, currentPage, currentPage + 1);
  }

  return (
    <Pagination>
      <PaginationContent
        className={direction === 'ltr' ? 'flex-row' : 'flex-row-reverse'}
      >
        {/* first page */}
        <PaginationItem>
          <PaginationFirst
            href='#'
            onClick={e => {
              e.preventDefault();
              handleFirstPage();
            }}
            className={
              currentPage === 1 ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>
        {/* previous */}
        <PaginationItem>
          <PaginationPrevious
            href='#'
            onClick={e => {
              e.preventDefault();
              handlePreviousPage();
            }}
            className={
              currentPage === 1 ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>

        {/* first pages */}
        {currentPage > 3 && (
          <>
            <PaginationItem>
              <PaginationLink href='#'>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}
        {/* num of paages */}
        {pagesToShow.map(page => (
          <PaginationItem key={page}>
            <PaginationLink
              href='#'
              isActive={page === currentPage}
              onClick={e => {
                e.preventDefault();
                setCurrentPage(page);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {/* last pages */}
        {currentPage < totalPages - 2 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href='#'
                onClick={e => {
                  e.preventDefault();
                  handleLastPage();
                }}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        {/* Next */}
        <PaginationItem>
          <PaginationNext
            href='#'
            onClick={e => {
              e.preventDefault();
              handleNextPage();
            }}
            className={
              currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>
        {/* Last */}
        <PaginationItem>
          <PaginationLast
            href='#'
            onClick={e => {
              e.preventDefault();
              handleLastPage();
            }}
            className={
              currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
