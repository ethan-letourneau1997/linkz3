"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export function Pagination({ totalPages, currentPage }: PaginationProps) {
  if (currentPage)
    return (
      <div className="flex gap-5 mt-5 dark:text-neutral-300">
        {currentPage > 1 ? (
          <Link
            className="flex items-center justify-center w-10 h-10 text-xl font-bold dark:hover:text-indigo-500"
            href={`${currentPage - 1}`}
          >
            <FaChevronLeft />
          </Link>
        ) : (
          <div className="flex items-center justify-center w-10 h-10 text-xl font-bold dark:text-neutral-500">
            <FaChevronLeft />
          </div>
        )}
        {currentPage - 2 > 0 && (
          <Link
            className="flex items-center justify-center w-10 h-10 text-xl font-bold dark:hover:text-indigo-500"
            href={`${currentPage - 2}`}
          >
            {currentPage - 2}
          </Link>
        )}
        {currentPage - 1 > 0 && (
          <Link
            className="flex items-center justify-center w-10 h-10 text-xl font-bold dark:hover:text-indigo-500"
            href={`${currentPage - 1}`}
          >
            {currentPage - 1}
          </Link>
        )}
        <div className="flex items-center justify-center w-10 h-10 text-xl font-bold rounded dark:bg-indigo-600">
          {currentPage}
        </div>
        {currentPage + 1 <= totalPages && (
          <Link
            className="flex items-center justify-center w-10 h-10 text-xl font-bold dark:hover:text-indigo-500"
            href={`${currentPage + 1}`}
          >
            {currentPage + 1}
          </Link>
        )}
        {currentPage + 2 <= totalPages && (
          <Link
            className="flex items-center justify-center w-10 h-10 text-xl font-bold dark:hover:text-indigo-500"
            href={`${currentPage + 2}`}
          >
            {currentPage + 2}
          </Link>
        )}
        {currentPage < totalPages ? (
          <Link
            className="flex items-center justify-center w-10 h-10 text-xl font-bold dark:hover:text-indigo-500"
            href={`${currentPage + 1}`}
          >
            <FaChevronRight />
          </Link>
        ) : (
          <div className="flex items-center justify-center w-10 h-10 text-xl font-bold dark:hover:text-indigo-500 dark:text-neutral-500">
            <FaChevronRight />
          </div>
        )}
      </div>
    );
}
