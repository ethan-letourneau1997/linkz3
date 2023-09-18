"use client";

import { FaCommentAlt } from "react-icons/fa";
import { PublicProfile } from "@/types";
import { commentCountFallback } from "./fallbacks";
import { fetchUserCommentCount } from "../api/fetch-user-comment-count";
import useSWR from "swr";

type UserCommentCountProps = {
  user: PublicProfile;
};

export function UserCommentCount({ user }: UserCommentCountProps) {
  const { data: commentCount } = useSWR("commentCount", async () => {
    const data = await fetchUserCommentCount(user.id);
    return data;
  });

  if (commentCount)
    return (
      <div className="flex flex-col items-center justify-center ">
        <div className="flex items-center gap-2 text-neutral-300">
          <FaCommentAlt />
          <span>{commentCount || 0}</span>
        </div>
        <div className="text-sm text-neutral-500">
          comment{commentCount === 1 ? "" : "s"}
        </div>
      </div>
    );

  return commentCountFallback;
}
