"use server";

import { redirect } from "next/navigation";

type createPostParams = {
  communityName: string;
  communityId: string;
  postId: string;
};

export async function redirectToCaptions(params: createPostParams) {
  const { communityName, communityId, postId } = params;

  redirect(
    `/spaces/${communityId}/${communityName}/post/new/${postId}/captions`
  );
}
