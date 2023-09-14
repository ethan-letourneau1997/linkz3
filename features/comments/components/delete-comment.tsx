"use server";

import { Comment, PostRouterParams } from "@/types";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";

export async function deleteComment(
  comment: Comment,
  params: PostRouterParams
) {
  const supabase = createServerActionClient({ cookies });

  // delete comment from database
  await supabase.from("comment").delete().eq("id", comment.id);

  revalidatePath(
    `/spaces/${params.spaceId}/${params.spaceName}/post/${params.postId}`
  );
}
