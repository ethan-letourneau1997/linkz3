"use server";

import { redirect } from "next/navigation";

type createPostParams = {
  communityName: string;
  communityId: string;
  postId: string;
};

export async function postCreatedRedirect(params: createPostParams) {
  const { communityName, communityId, postId } = params;

  redirect(`/spaces/${communityName}/${communityId}/post/${postId}`);
}
