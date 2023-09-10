"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function getPostPreviewImageUrl(postId: number) {
  const supabase = createServerActionClient({ cookies });

  try {
    const { data: post_image } = await supabase
      .from("post_image")
      .select()
      .eq("post_id", postId)
      .limit(1)
      .single();

    return post_image.url;
  } catch (error) {
    return null;
  }
}
