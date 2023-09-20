"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useCallback } from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export function Pagination({ totalPages, currentPage }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function goToPrevious() {
    router.push(
      pathname + "?" + createQueryString("page", `${currentPage - 1}`)
    );
  }
  function goToNext() {
    router.push(
      pathname + "?" + createQueryString("page", `${currentPage + 1}`)
    );
  }

  function goToNumber(number: number) {
    router.push(pathname + "?" + createQueryString("page", `${number}`));
  }

  if (currentPage)
    return (
      <div className="flex gap-5 mt-5 dark:text-neutral-300">
        {currentPage > 1 ? (
          <button
            onClick={goToPrevious}
            className="flex items-center justify-center w-10 h-10 text-xl font-bold dark:hover:text-indigo-500"
          >
            <FaChevronLeft />
          </button>
        ) : (
          <button
            disabled
            className="flex items-center justify-center w-10 h-10 text-xl font-bold dark:text-neutral-500"
          >
            <FaChevronLeft />
          </button>
        )}
        {currentPage - 2 > 0 && (
          <button
            onClick={() => goToNumber(currentPage - 2)}
            className="flex items-center justify-center w-10 h-10 text-xl font-bold dark:hover:text-indigo-500"
          >
            {currentPage - 2}
          </button>
        )}
        {currentPage - 1 > 0 && (
          <button
            onClick={() => goToNumber(currentPage - 1)}
            className="flex items-center justify-center w-10 h-10 text-xl font-bold dark:hover:text-indigo-500"
          >
            {currentPage - 1}
          </button>
        )}
        <div className="flex items-center justify-center w-10 h-10 text-xl font-bold rounded dark:bg-indigo-600">
          {currentPage}
        </div>
        {currentPage + 1 <= totalPages && (
          <button
            onClick={() => goToNumber(currentPage + 1)}
            className="flex items-center justify-center w-10 h-10 text-xl font-bold dark:hover:text-indigo-500"
          >
            {currentPage + 1}
          </button>
        )}
        {currentPage + 2 <= totalPages && (
          <button
            onClick={() => goToNumber(currentPage + 2)}
            className="flex items-center justify-center w-10 h-10 text-xl font-bold dark:hover:text-indigo-500"
          >
            {currentPage + 2}
          </button>
        )}
        {currentPage < totalPages ? (
          <button
            onClick={goToNext}
            className="flex items-center justify-center w-10 h-10 text-xl font-bold dark:hover:text-indigo-500"
          >
            <FaChevronRight />
          </button>
        ) : (
          <button
            disabled
            className="flex items-center justify-center w-10 h-10 text-xl font-bold dark:hover:text-indigo-500 dark:text-neutral-500"
          >
            <FaChevronRight />
          </button>
        )}
      </div>
    );
}
