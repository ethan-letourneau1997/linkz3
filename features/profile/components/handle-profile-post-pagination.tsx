"use client";

import { Pagination } from "@/features/pagination";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import useSWR from "swr";

export function HandleProfilePostPagination() {
  const params = useParams();

  const page = params.page as string;
  const activePage = page ? parseInt(page, 10) : 1;

  const supabase = createClientComponentClient();

  const { data: pageCount } = useSWR("public_profile", async () => {
    const { data: user } = await supabase
      .from("public_profile")
      .select()
      .eq("username", params.username)
      .single();

    const { count } = await supabase
      .from("post")
      .select("*", { count: "exact", head: true })
      .eq("created_by", user.id);
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
