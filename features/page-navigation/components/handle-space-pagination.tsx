"use client";

import { useParams, useSearchParams } from "next/navigation";

import { PageNavigation } from "./page-navigation";
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

  if (page && pageCount)
    return (
      <div className="flex justify-center mt-3">
        <PageNavigation activePage={activePage} pageCount={pageCount} />
      </div>
    );
}
