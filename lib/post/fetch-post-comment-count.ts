import { Post } from "@/types";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function fetchPostCommentCount(postId: Post["id"]) {
  "use server";

  const supabase = createServerActionClient({ cookies });

  const { count } = await supabase
    .from("comment")
    .select("*", { count: "exact", head: true })
    .eq("root_post", postId);

  return count;
}
