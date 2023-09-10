"use client";

import { useEffect, useState } from "react";

import { PageNavigation } from "./page-navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";

export function HandleSubscriptionPagination() {
  const params = useParams();

  const activePage = parseInt(params.page as string, 10);
  const supabase = createClientComponentClient();
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    async function getPostCount() {
      const { data } = await supabase.auth.getSession();

      const { data: user_subscriptions } = await supabase
        .from("user_community")
        .select("*, community_id(*)")
        .eq("user_id", data.session?.user.id);

      const communityIds = user_subscriptions?.map(
        (sub) => sub.community_id.id
      );

      if (communityIds) {
        const { count } = await supabase
          .from("post")
          .select("*", { count: "exact", head: true })
          .in("posted_in", communityIds);

        if (count) {
          const pages = Math.ceil(count / 10);
          setPageCount(pages);
        }
      }
    }
    getPostCount();
  }, [params]);

  return (
    <div className="flex justify-center mt-3">
      <PageNavigation activePage={activePage} pageCount={pageCount} />
    </div>
  );
}
