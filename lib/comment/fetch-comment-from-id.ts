"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function fetchCommentFromId(commentId: number) {
  const supabase = createServerActionClient({ cookies });

  const { data: comment } = await supabase
    .from("comment")
    .select()
    .eq("id", commentId)
    .single();


  return comment;
}
