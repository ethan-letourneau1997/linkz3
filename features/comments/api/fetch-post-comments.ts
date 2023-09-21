"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function fetchPostComments(postId: string) {
  const supabase = createServerActionClient({ cookies });

  const { data: comments } = await supabase
    .from("comment_details")
    .select()
    .eq("root_post", postId)
    .order("created_at", { ascending: false });

  return comments;
}
