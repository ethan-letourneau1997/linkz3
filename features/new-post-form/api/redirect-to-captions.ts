"use server";

import { redirect } from "next/navigation";

type redirectToCaptionsParams = {
  communityName: string;
  communityId: string;
  postId: string;
};

export async function redirectToCaptions(params: redirectToCaptionsParams) {
  const { communityName, communityId, postId } = params;

  redirect(
    `/spaces/${communityId}/${communityName}/post/new/${postId}/captions`
  );
}
