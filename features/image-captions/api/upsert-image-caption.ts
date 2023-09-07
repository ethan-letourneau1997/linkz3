"use server";

import { PostImage, PostRouterParams } from "@/types";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";

type upsertImageCaptionrops = {
  params: PostRouterParams;
  image: PostImage;
  newCaption: string;
};

export async function upsertImageCaption(props: upsertImageCaptionrops) {
  const { params, image, newCaption } = props;

  const supabase = createServerActionClient({ cookies });

  await supabase
    .from("post_image")
    .update({ caption: newCaption })
    .eq("id", image.id)
    .select();

  revalidatePath(
    `/spaces/${params.spaceId}/${params.spaceName}/post/new/${params.postId}/captions`
  );
  //   redirect(`/community/${post.posted_in_name}/post/${params.postId}/${params.postName}`);
}
