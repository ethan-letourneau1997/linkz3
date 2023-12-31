"use server";

import { Post, PostPreview } from "@/types";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";

export async function deletePost(post: Post|PostPreview, refresh: string) {
  const supabase = createServerActionClient({ cookies });

  // if image post, delete images from storage
  if (post.type === "image") {
    const { data: post_images } = await supabase
      .from("post_image")
      .select()
      .eq("post_id", post.id);

    if (post_images) {
      for (const file of post_images) {
        await supabase.storage
          .from("images")
          .remove([`public/${file.filename}`]);
      }
    }
  }

  // delete post from database
  await supabase.from("post").delete().eq("id", post.id);

  revalidatePath(refresh);
}
