"use client";

import { useParams, useSearchParams } from "next/navigation";

import { Pagination } from "@/features/pagination";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useSWR from "swr";

export function HandleProfileCommentPagination() {
  const searchParams = useSearchParams();
  const params = useParams();

  const page = searchParams.get("page");
  const activePage = page ? parseInt(page, 10) : 1;

  const supabase = createClientComponentClient();

  const { data: pageCount } = useSWR("public_profile", async () => {
    const { data: user } = await supabase
      .from("public_profile")
      .select()
      .eq("username", params.username)
      .single();

    const { count } = await supabase
      .from("comment")
      .select("*", { count: "exact", head: true })
      .eq("posted_by", user.id);
    if (count) {
      const pages = Math.ceil(count / 10);
      return pages;
    }
  });

  if (page && pageCount)
    return (
      <div className="flex justify-center mt-3">
        <Pagination currentPage={activePage} totalPages={pageCount} />
      </div>
    );
}
