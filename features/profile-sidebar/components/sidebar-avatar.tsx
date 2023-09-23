"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { fetchProfileAvatar } from "@/lib/user/fetch-profile-avatar";
import { fetchPublicProfile } from "../api/fetch-public-profile";
import { useParams } from "next/navigation";
import useSWR from "swr";

export function SidebarAvatar() {
  const params = useParams();

  const username = params.username as string;

  const { data: profileAvatar } = useSWR("profileAvatar", async () => {
    const data = await fetchPublicProfile(username);

    const profileAvatar = await fetchProfileAvatar(data.id);
    return profileAvatar;
  });

  if (profileAvatar)
    return (
      <div className="pt-2 mx-auto w-fit">
        <Avatar className="rounded w-14 h-14">
          <AvatarImage src={profileAvatar.path} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    );
}
