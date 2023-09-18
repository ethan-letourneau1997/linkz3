"use client";

import { PiSignpostFill } from "react-icons/pi";
import { PublicProfile } from "@/types";
import { fetchUserPostCount } from "../api/fetch-user-post-count";
import { postCountFallback } from "./fallbacks";
import useSWR from "swr";

type UserPostCountProps = {
  user: PublicProfile;
};

export function UserPostCount({ user }: UserPostCountProps) {
  const { data: postCount } = useSWR("postCount", async () => {
    const data = await fetchUserPostCount(user.id);
    return data;
  });

  if (postCount)
    return (
      <div className="flex flex-col items-center justify-center ">
        <div className="flex items-center gap-2 text-neutral-300">
          <PiSignpostFill />
          <span>{postCount || 0}</span>
        </div>
        <div className="text-sm text-neutral-500">
          post{postCount === 1 ? "" : "s"}
        </div>
      </div>
    );

  return postCountFallback;
}
