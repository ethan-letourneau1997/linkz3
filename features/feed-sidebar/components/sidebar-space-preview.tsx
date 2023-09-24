import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { IoPlanetOutline } from "react-icons/io5";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SidebarSubscriberCount } from "./sidebar-subscriber-count";
import { Space } from "@/types";
import { fetchSpaceAvatar } from "@/lib/space/fetch-space-avatar";

type SidebarSpacePreviewProps = {
  space: Space;
};

export async function SidebarSpacePreview({ space }: SidebarSpacePreviewProps) {
  const spaceAvatar = await fetchSpaceAvatar(space.id);
  return (
    <div className="pt-2">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 pb-2">
          <Avatar className="w-6 h-6">
            <AvatarImage
              src={spaceAvatar ? spaceAvatar.path : "#"}
              alt="@shadcn"
            />
            <AvatarFallback className="w-6 h-6">
              <IoPlanetOutline />
            </AvatarFallback>
          </Avatar>
          <Link
            className="hover:underline"
            href={`/spaces/${space.id}/${space.name}/new/1`}
          >
            {space.name}
          </Link>
        </div>
        <SidebarSubscriberCount spaceId={space.id} />
      </div>
      <Separator />
    </div>
  );
}
