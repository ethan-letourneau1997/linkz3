"use client";

import { useParams, useRouter } from "next/navigation";

import { Pagination } from "flowbite-react";

export function PageNavigation() {
  const params = useParams();
  const router = useRouter();

  const activePage = parseInt(params.page as string, 10);
  return (
    <Pagination
      currentPage={activePage}
      onPageChange={(page) => {
        router.push(`${page}`);
      }}
      totalPages={100}
    />
  );
}
