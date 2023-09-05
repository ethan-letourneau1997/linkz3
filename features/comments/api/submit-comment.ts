"use server";

import { PostRouterParams } from "@/types";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";

type submitCommentParams = {
  routerParams: PostRouterParams;
  root_post: string;
  content: string;
  parent_comment?: number | null;
};

export async function submitComment(params: submitCommentParams) {
  const { content, parent_comment, routerParams } = params;

  const root_post = routerParams.postId;

  const supabase = createServerActionClient({ cookies });

  async function createComment() {
    if (parent_comment) {
      await supabase
        .from("comment")
        .insert({ content, parent_comment, root_post });
    } else {
      await supabase.from("comment").insert({ content, root_post });
    }
  }

  await createComment();

  revalidatePath(
    `/spaces/${routerParams.spaceId}/${routerParams.spaceName}/post/${root_post}`
  );
}
