"use client";

import { Pagination } from "@/features/pagination";
import { getFeedPageCount } from "../api/get-feed-page-count";
import { useParams } from "next/navigation";
import useSWR from "swr";

export function HandleFeedPagination() {
  const params = useParams();

  const page = params.page as string;
  const activePage = page ? parseInt(page, 10) : 1;

  const { data: pageCount } = useSWR("user_community", async () => {
    const pageCount = await getFeedPageCount();
    return pageCount;
  });

  if (page && pageCount)
    return (
      <div className="flex justify-center mt-3">
        <Pagination currentPage={activePage} totalPages={pageCount} />
      </div>
    );
}
