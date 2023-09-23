"use client";

import { Pagination } from "@/features/pagination";
import { fetchSpacePageCount } from "../api/fetch-space-page-count";
import { useParams } from "next/navigation";
import useSWR from "swr";

export function HandleSpacePagination() {
  const params = useParams();
  // const searchParams = useSearchParams();

  const page = params.page as string;
  const activePage = page ? parseInt(page, 10) : 1;

  const { data: pageCount } = useSWR("post", async () => {
    const pageCount = await fetchSpacePageCount(params.spaceId as string);
    return pageCount;
  });

  if (page && pageCount && activePage && pageCount > 1)
    return (
      <div className="flex justify-center mt-3">
        <Pagination currentPage={activePage} totalPages={pageCount} />
      </div>
    );
}
