import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { IoPlanetOutline } from "react-icons/io5";
import { fetchSpaceAvatar } from "@/lib/space/fetch-space-avatar";
import useSWR from "swr";

type SpaceSiderbarAvatarProps = {
  spaceId: string | number;
};

export function SpaceSiderbarAvatar({ spaceId }: SpaceSiderbarAvatarProps) {
  const { data: spaceAvater } = useSWR("spaceAvater", async () => {
    const spaceAvater = await fetchSpaceAvatar(spaceId);
    console.log(spaceAvater);
    return spaceAvater;
  });

  if (spaceAvater)
    return (
      <Avatar className="w-14 h-14">
        <AvatarImage src={spaceAvater.path} alt="@shadcn" />
        <AvatarFallback>{spaceId}</AvatarFallback>
      </Avatar>
    );

  return (
    <Avatar className="flex items-center justify-center w-14 h-14 text-neutral-300">
      <IoPlanetOutline className="w-9 h-9" />
    </Avatar>
  );

  return;
}
