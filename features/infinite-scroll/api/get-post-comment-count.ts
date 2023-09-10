"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function getPostCommentCount(postId: number) {
  const supabase = createServerActionClient({ cookies });

  try {
    const { count } = await supabase
      .from("comment")
      .select("*", { count: "exact", head: true })
      .eq("root_post", postId);

    return count;
  } catch (error) {
    return 0;
  }
}
