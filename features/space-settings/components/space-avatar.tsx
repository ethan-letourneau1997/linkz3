import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { IoPlanetOutline } from "react-icons/io5";
import { SpaceAvatarUModal } from "./space-avatar-modal";
import { fetchSpaceAvatar } from "@/lib/space/fetch-space-avatar";

type SpaceAvatarProps = {
  spaceId: number;
};

export async function SpaceAvatar({ spaceId }: SpaceAvatarProps) {
  const spaceAvater = await fetchSpaceAvatar(spaceId);

  return (
    <div className="mt-3">
      <Avatar className="w-20 h-20 border dark:border-neutral-800">
        <AvatarImage src={spaceAvater ? spaceAvater.path : "#"} alt="@shadcn" />
        <AvatarFallback>
          {<IoPlanetOutline className="w-9 h-9" />}
        </AvatarFallback>
      </Avatar>

      <SpaceAvatarUModal spaceId={spaceId} spaceAvatar={spaceAvater} />
    </div>
  );
}
