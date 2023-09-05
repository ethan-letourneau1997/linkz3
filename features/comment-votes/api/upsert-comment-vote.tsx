"use server";

import { Comment } from "@/types";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";

export async function upsertCommentVote(comment: Comment, vote: number) {
  const supabase = createServerActionClient({ cookies });
  const { data } = await supabase.auth.getSession();

  const { data: post } = await supabase
    .from("post")
    .select()
    .eq("id", comment.root_post)
    .single();

  const { data: community } = await supabase
    .from("community")
    .select()
    .eq("id", post.posted_in)
    .single();

  if (data.session) {
    await supabase
      .from("comment_vote")
      .upsert({ user_id: data.session.user.id, comment_id: comment.id, vote });

    revalidatePath(`/community/${community.id}/${community.name}`);
    // revalidatePath(`/subscriptions/`);
  }
}
