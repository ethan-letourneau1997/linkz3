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
        <p className="text-sm text-center">{user?.biography}</p>
        <Separator />

        <div className="grid grid-cols-2">
          <UserPostCount user={user} />
          <UserCommentCount user={user} />
        </div>
      </>
    );

  return userDetailsFallback;
}
