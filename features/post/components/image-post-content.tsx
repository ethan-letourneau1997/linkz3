import "keen-slider/keen-slider.min.css";

import { ImageCarousel } from "@/features/image-carousel";
import { Post } from "@/types";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

type ImagePostContentProps = {
  post: Post;
};

export async function ImagePostContent({ post }: ImagePostContentProps) {
  const supabase = createServerComponentClient({ cookies });
  const { data: post_images } = await supabase
    .from("post_image")
    .select()
    .eq("post_id", post.id);

  return <ImageCarousel postImages={post_images || []} />;
}
