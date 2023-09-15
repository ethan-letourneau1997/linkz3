"use client";

import { PageNavigation } from "./page-navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import useSWR from "swr";

export function HandleSpacePagination() {
  const params = useParams();

  const activePage = parseInt(params.page as string, 10);

  const supabase = createClientComponentClient();

  const { data: pageCount } = useSWR("post", async () => {
    const { count } = await supabase
      .from("post")
      .select("*", { count: "exact", head: true })
      .eq("posted_in", params.spaceId);
    if (count) {
      const pages = Math.ceil(count / 10);
      return pages;
    }
  });

  console.log(pageCount);

  if (pageCount)
    return (
      <div className="flex justify-center mt-3">
        <PageNavigation activePage={activePage} pageCount={pageCount} />
      </div>
    );
}
