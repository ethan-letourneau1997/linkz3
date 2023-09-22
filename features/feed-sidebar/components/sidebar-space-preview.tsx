import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SidebarSubscriberCount } from "./sidebar-subscriber-count";
import { Space } from "@/types";

type SidebarSpacePreviewProps = {
  space: Space;
};

export async function SidebarSpacePreview({ space }: SidebarSpacePreviewProps) {
  return (
    <div className="pt-2">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 pb-2">
          <Avatar className="w-6 h-6 rounded-sm">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Link
            className="hover:underline"
            href={`/spaces/${space.id}/${space.name}/post/new/1`}
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
