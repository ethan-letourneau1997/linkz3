"use client";

import { Pagination } from "flowbite-react";
import { useRouter } from "next/navigation";

type PageNavigationProps = {
  activePage: number;
  pageCount: number;
};

export function PageNavigation({ activePage, pageCount }: PageNavigationProps) {
  const router = useRouter();

  return (
    <div className="flex justify-center mt-3">
      <Pagination
        currentPage={activePage}
        onPageChange={(page) => {
          router.push(`${page}`);
        }}
        totalPages={pageCount}
      />
    </div>
  );
}
