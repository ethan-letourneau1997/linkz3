"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function fetchPostImages(postId: string | null) {
  if (!postId) return;

  const supabase = createServerActionClient({ cookies });

  const { data: post_images } = await supabase
    .from("post_image")
    .select()
    .eq("post_id", postId)
    .order("priority", { ascending: true });

  return post_images;
}
