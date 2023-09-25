import { LinkPreview, Post } from "@/types";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { getLinkPreview } from "link-preview-js";

export async function getPreviewThumbnail(post: Post) {
  "use server";
  if (post.type === "text") {
    return null;
  }


  if (post.type === "link") {
    if (post.content) {
      try {
        const link: LinkPreview = await getLinkPreview(post.content);
        if (link.images && link.images[0]) {
          return link.images[0];
        }
      }catch(e){
        return null;
      }
 

  
    }
  }

  const supabase = createServerActionClient({ cookies });

  if (post.type === "image") {
    const { data: post_image } = await supabase
      .from("post_image")
      .select()
      .eq("post_id", post.id)
      .limit(1)
      .single();

    if (post_image) {
      return post_image.url;
    }
  }

  return null;
}
