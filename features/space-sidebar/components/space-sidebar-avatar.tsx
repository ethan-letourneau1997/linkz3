"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

import { IoPlanetOutline } from "react-icons/io5";
import { fetchSpaceAvatar } from "@/lib/space/fetch-space-avatar";

type SpaceSiderbarAvatarProps = {
  spaceId: string | number;
};

export function SpaceSiderbarAvatar({ spaceId }: SpaceSiderbarAvatarProps) {
  const [avatarPath, setAvatarPath] = useState<string | null>(null);

  useEffect(() => {
    async function getSpaceAvatar() {
      const spaceAvater = await fetchSpaceAvatar(spaceId);
      if (spaceAvater) {
        setAvatarPath(spaceAvater.path);
      }
    }
    if (spaceId) {
      getSpaceAvatar();
    }
  }, [spaceId]);

  return (
    <Avatar className="w-14 h-14">
      <AvatarImage src={avatarPath ? avatarPath : "#"} alt="@shadcn" />
      <AvatarFallback>{<IoPlanetOutline className="w-9 h-9" />}</AvatarFallback>
    </Avatar>
  );
}
