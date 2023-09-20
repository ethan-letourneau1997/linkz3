"use client";

import { useParams, useSearchParams } from "next/navigation";

import { Pagination } from "@/features/pagination";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useSWR from "swr";

export function HandleSpacePagination() {
  const params = useParams();
  const searchParams = useSearchParams();

  const page = searchParams.get("page");
  const activePage = page ? parseInt(page, 10) : 1;

  const supabase = createClientComponentClient();

  const { data: pageCount } = useSWR("post", async () => {
    if (page) {
      const { count } = await supabase
        .from("post")
        .select("*", { count: "exact", head: true })
        .eq("posted_in", params.spaceId);
      if (count) {
        const pages = Math.ceil(count / 10);
        return pages;
      }
    }
  });

  if (page && pageCount && pageCount > 1)
    return (
      <div className="flex justify-center mt-3">
        <Pagination currentPage={activePage} totalPages={pageCount} />
      </div>
    );
}
