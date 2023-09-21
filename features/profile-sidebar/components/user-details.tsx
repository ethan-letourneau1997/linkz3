"use client";

import { Separator } from "@/components/ui/separator";
import { UserCommentCount } from "./user-comment-count";
import { UserPostCount } from "./user-post-count";
import { fetchPublicProfile } from "../api/fetch-public-profile";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { userDetailsFallback } from "./fallbacks";

export function UserDetails() {
  const params = useParams();

  const username = params.username as string;

  const { data: user } = useSWR("user", async () => {
    const data = await fetchPublicProfile(username);
    return data;
  });

  if (user)
    return (
      <>
        {user.biography && (
          <p className="mt-1 text-sm text-center">{user.biography}</p>
        )}

        <Separator className="mt-3 " />

        <div className="grid grid-cols-2 mt-3">
          <UserPostCount user={user} />
          <UserCommentCount user={user} />
        </div>
      </>
    );

  return userDetailsFallback;
}
