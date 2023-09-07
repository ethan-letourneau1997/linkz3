"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
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

    if (type !== "image") {
      redirect(`/spaces/${communityName}/${communityId}/post/${data.id}`);
    }

    return data.id;
  }
}
