"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function fetchTopPosts(page: number) {
  "use server";

  const perPage = 10;

  const lowerLimit = (page - 1) * perPage;
  const upperLimit = lowerLimit + perPage - 1;

  const supabase = createServerActionClient({ cookies });

  try {
    const { data: posts } = await supabase
      .from("post_preview_with_votes")
      .select()
      .range(lowerLimit, upperLimit)
      .order("total_votes", { ascending: false });
    return posts;
  } catch (error) {
    return null;
  }
}
