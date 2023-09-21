"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { fetchPublicProfile } from "../api/fetch-public-profile";
import { useParams } from "next/navigation";
import useSWR from "swr";

export function SidebarAvatar() {
  const params = useParams();

  const username = params.username as string;

  const { data: user } = useSWR("user", async () => {
    const data = await fetchPublicProfile(username);
    return data;
  });

  if (user && user.avatar)
    return (
      <div className="pt-2 mx-auto w-fit">
        <Avatar className="rounded w-14 h-14">
          <AvatarImage src={user.avatar} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    );
}
