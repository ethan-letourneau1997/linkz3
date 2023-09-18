"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Pagination } from "flowbite-react";
import { paginationTheme } from "./pagination-theme";

type PageNavigationProps = {
  activePage: number;
  pageCount: number;
};

export function PageNavigation({ activePage, pageCount }: PageNavigationProps) {
  if (pageCount <= 1) return null;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sortBy = searchParams.get("sort");

  return (
    <div className="flex justify-center mt-3">
      <Pagination
        theme={paginationTheme}
        currentPage={activePage}
        onPageChange={(page) => {
          router.push(`${pathname}?page=${page}&sort=${sortBy}`);
        }}
        totalPages={pageCount}
      />
    </div>
  );
}
