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

  return (
    <Avatar className="w-14 h-14">
      <AvatarImage src={spaceAvater ? spaceAvater.path : "#"} alt="@shadcn" />
      <AvatarFallback>{<IoPlanetOutline className="w-9 h-9" />}</AvatarFallback>
    </Avatar>
  );
}
