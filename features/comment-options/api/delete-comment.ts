"use server";

import { Comment } from "@/types";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";

export async function deleteComment(
  comment: Comment,
  spaceId:string,
  spaceName:string,
  postId:string
) {
  const supabase = createServerActionClient({ cookies });

  // delete comment from database
  await supabase.from("comment").delete().eq("id", comment.id);

  revalidatePath(
    `/spaces/${spaceId}/${spaceName}/post/${postId}`
  );
}
