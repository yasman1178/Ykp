import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
  onPageChange?: (page: number) => void;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
}

export default function BlogPagination({
  currentPage,
  totalPages,
  baseUrl = '/blog',
  onPageChange,
  showFirstLast = true,
  maxVisiblePages = 7
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate range around current page
      const leftOffset = Math.floor((maxVisiblePages - 3) / 2);
      const rightOffset = Math.ceil((maxVisiblePages - 3) / 2);
      
      let start = Math.max(2, currentPage - leftOffset);
      let end = Math.min(totalPages - 1, currentPage + rightOffset);

      // Adjust if we're near the start
      if (currentPage <= leftOffset + 2) {
        end = Math.min(totalPages - 1, maxVisiblePages - 2);
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - rightOffset - 1) {
        start = Math.max(2, totalPages - maxVisiblePages + 3);
      }

      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push('...');
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageClick = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav 
      className="flex justify-center items-center gap-2 py-8 px-4"
      aria-label="Blog pagination"
      role="navigation"
    >
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {/* First Page Button */}
        {showFirstLast && currentPage > 1 && (
          <PaginationButton
            page={1}
            label="First page"
            icon={<FiChevronsLeft className="w-5 h-5" />}
            onClick={handlePageClick}
            baseUrl={baseUrl}
          />
        )}

        {/* Previous Page Button */}
        {currentPage > 1 && (
          <PaginationButton
            page={currentPage - 1}
            label="Previous page"
            icon={<FiChevronLeft className="w-5 h-5" />}
            onClick={handlePageClick}
            baseUrl={baseUrl}
          />
        )}

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-4 py-2 text-gray-400 font-bold"
                aria-hidden="true"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <PaginationButton
              key={pageNum}
              page={pageNum}
              label={`Page ${pageNum}`}
              isActive={isActive}
              onClick={handlePageClick}
              baseUrl={baseUrl}
            />
          );
        })}

        {/* Next Page Button */}
        {currentPage < totalPages && (
          <PaginationButton
            page={currentPage + 1}
            label="Next page"
            icon={<FiChevronRight className="w-5 h-5" />}
            onClick={handlePageClick}
            baseUrl={baseUrl}
          />
        )}

        {/* Last Page Button */}
        {showFirstLast && currentPage < totalPages && (
          <PaginationButton
            page={totalPages}
            label="Last page"
            icon={<FiChevronsRight className="w-5 h-5" />}
            onClick={handlePageClick}
            baseUrl={baseUrl}
          />
        )}
      </div>

      {/* Page Info */}
      <div className="w-full text-center mt-4 text-sm text-gray-600">
        <span className="font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <span className="mx-2 text-gray-400">|</span>
        <span className="text-gray-500">
          صفحة {currentPage} من {totalPages}
        </span>
      </div>
    </nav>
  );
}

interface PaginationButtonProps {
  page: number;
  label: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick: (page: number) => void;
  baseUrl: string;
}

function PaginationButton({
  page,
  label,
  icon,
  isActive = false,
  onClick,
  baseUrl
}: PaginationButtonProps) {
  const buttonClasses = isActive
    ? 'bg-black text-white border-black'
    : 'bg-white text-black border-gray-300 hover:bg-gray-100 hover:border-gray-400';

  const content = (
    <motion.button
      whileHover={{ scale: isActive ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(page)}
      className={`
        min-w-[44px] h-[44px] px-4 py-2 
        border-2 font-bold
        transition-all duration-200
        flex items-center justify-center
        ${buttonClasses}
        ${isActive ? 'cursor-default' : 'cursor-pointer'}
      `}
      aria-label={label}
      aria-current={isActive ? 'page' : undefined}
      disabled={isActive}
    >
      {icon || page}
    </motion.button>
  );

  return content;
}

// Utility function to calculate pagination
export function calculatePagination(
  totalItems: number,
  itemsPerPage: number,
  currentPage: number = 1
) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages));
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return {
    totalPages,
    currentPage: validCurrentPage,
    startIndex,
    endIndex,
    hasNextPage: validCurrentPage < totalPages,
    hasPreviousPage: validCurrentPage > 1,
    itemsOnCurrentPage: endIndex - startIndex
  };
}
