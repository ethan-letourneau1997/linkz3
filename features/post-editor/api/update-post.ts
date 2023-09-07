"use server";

import { Post } from "@/types";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function updatePost(
  post: Post,
  communityName: string,
  newContent: string
) {
  const supabase = createServerActionClient({ cookies });

  await supabase
    .from("post")
    .update({ content: newContent })
    .eq("id", post.id)
    .select();

  revalidatePath(`/spaces/${post.posted_in}/${communityName}/post/${post.id}`);
  redirect(`/spaces/${post.posted_in}/${communityName}/post/${post.id}`);
}
