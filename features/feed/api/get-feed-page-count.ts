"use server";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getFeedPageCount() {
  const supabase = createServerComponentClient({ cookies });

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
}
