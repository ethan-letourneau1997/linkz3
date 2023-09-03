"use server";

import { Post } from "@/types";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";

export async function upsertPostVote(post: Post, vote: number) {
  const supabase = createServerActionClient({ cookies });
  const { data } = await supabase.auth.getSession();

  const { data: community } = await supabase
    .from("community")
    .select()
    .eq("id", post.posted_in)
    .single();

  if (data.session) {
    await supabase
      .from("post_vote")
      .upsert({ user_id: data.session.user.id, post_id: post.id, vote });

    revalidatePath(`/community/${community.id}/${community.name}`);
    // revalidatePath(`/subscriptions/`);
  }
}
