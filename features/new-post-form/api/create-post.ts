"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { fetchLinkPreview } from "@/lib/post/fetch-link-preview";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

type createPostParams = {
  title: string;
  communityName: string;
  communityId: string;
  type: string;
  content?: string;
};

export async function createPost(params: createPostParams) {
  const { title, communityName, communityId, content, type } = params;

  const supabase = createServerActionClient({ cookies });

  const { data } = await supabase
    .from("post")
    .insert({
      title: title,
      content: content,
      posted_in: communityId,
      type,
    })
    .select()
    .single();

  if (data) {
    revalidatePath(`/spaces/${communityName}/${communityId}`);

    if (type === "link") {
      const linkPreview = await fetchLinkPreview(content!);
      const siteName = linkPreview && linkPreview.siteName ? linkPreview.siteName : null
      const imagePreviewUrl = linkPreview && linkPreview.images && linkPreview.images[0] ? linkPreview.images[0] : null
      
      await supabase
        .from("link_preview")
        .insert({
          id: data.id,
          url: imagePreviewUrl,
          website:siteName
        })
        .select()
        .single();
      redirect(`/spaces/${communityId}/${communityName}/post/${data.id}`);
    }

    if (type !== "image") {
      redirect(`/spaces/${communityId}/${communityName}/post/${data.id}`);
    }

    return data.id;
  }
}
