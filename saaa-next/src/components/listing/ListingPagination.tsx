"use client";

type ListingPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function ListingPagination({ page, totalPages, onPageChange }: ListingPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="listing-pagination" role="navigation" aria-label="Pagination">
      <button
        type="button"
        className="listing-pagination-arrow"
        disabled={page === 1}
        aria-label="Previous page"
        onClick={() => onPageChange(page - 1)}
      >
        ←
      </button>
      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            type="button"
            className={pageNumber === page ? "active" : ""}
            aria-label={`Page ${pageNumber}`}
            aria-current={pageNumber === page ? "page" : undefined}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        type="button"
        className="listing-pagination-arrow"
        disabled={page === totalPages}
        aria-label="Next page"
        onClick={() => onPageChange(page + 1)}
      >
        →
      </button>
    </div>
  );
}
