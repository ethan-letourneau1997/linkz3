"use client";

import { Pagination } from "@/features/pagination";
import { getProfileCommentPageCount } from "../api/get-profile-comment-page-count";
import { useParams } from "next/navigation";
import useSWR from "swr";

export function HandleProfileCommentPagination() {
  const params = useParams();

  const page = params.page as string;
  const activePage = page ? parseInt(page, 10) : 1;

  const { data: pageCount } = useSWR("public_profile", async () => {
    const pageCount = await getProfileCommentPageCount(
      params.username as string
    );
    return pageCount;
  });

  if (page && pageCount)
    return (
      <div className="flex justify-center mt-3">
        <Pagination currentPage={activePage} totalPages={pageCount} />
      </div>
    );
}
