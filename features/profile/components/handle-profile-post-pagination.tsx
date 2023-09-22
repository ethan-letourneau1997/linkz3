"use client";

import { Pagination } from "@/features/pagination";
import { getProfilePostPageCount } from "../api/get-profile-post-page-count";
import { useParams } from "next/navigation";
import useSWR from "swr";

export function HandleProfilePostPagination() {
  const params = useParams();

  const page = params.page as string;
  const activePage = page ? parseInt(page, 10) : 1;

  const { data: pageCount } = useSWR("public_profile", async () => {
    const pageCount = await getProfilePostPageCount(params.username as string);
    return pageCount;
  });

  if (page && pageCount)
    return (
      <div className="flex justify-center mt-3">
        <Pagination currentPage={activePage} totalPages={pageCount} />
      </div>
    );
}
