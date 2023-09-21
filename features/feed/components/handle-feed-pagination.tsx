"use client";

import { Pagination } from "@/features/pagination";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";

export function HandleFeedPagination() {
  const searchParams = useSearchParams();

  const page = searchParams.get("page");
  const activePage = page ? parseInt(page, 10) : 1;

  const supabase = createClientComponentClient();

  const { data: pageCount } = useSWR("user_community", async () => {
    const { data } = await supabase.auth.getSession();

    const { data: user_subscriptions } = await supabase
      .from("user_community")
      .select("*, community_id(*)")
      .eq("user_id", data.session?.user.id);

    const communityIds = user_subscriptions?.map((sub) => sub.community_id.id);

    if (communityIds) {
      const { count } = await supabase
        .from("post")
        .select("*", { count: "exact", head: true })
        .in("posted_in", communityIds);

      if (count) {
        const pages = Math.ceil(count / 10);
        return pages;
      }
    }
  });

  if (page && pageCount)
    return (
      <div className="flex justify-center mt-3">
        <Pagination currentPage={activePage} totalPages={pageCount} />
      </div>
    );
}
