"use client";

import { HandleSubscription } from "./handle-subscription";
import { MdOutlineEvent } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import { SidebarSubscriberCount } from "./sidebar-subscriber-count";
import { Skeleton } from "@/components/ui/skeleton";
import { Space } from "@/types";
import { SpaceSiderbarAvatar } from "./space-sidebar-avatar";
import { fetchSpaceById } from "@/lib/space/fetch-space-by-id";
import { formatCreatedAt } from "@/lib/utils/format-created-at";
import { useParams } from "next/navigation";
import useSWR from "swr";

export function SpaceSidebar() {
  const params = useParams();

  const spaceId = params.spaceId as string;
  const spaceName = params.spaceName as string;

  const { data: space } = useSWR("space", async () => {
    const space = await fetchSpaceById(spaceId);

    return space;
  });

  return (
    <div className="px-4 pt-2 pb-3 space-y-3 w-72">
      {space && (
        <div className="flex items-center gap-3">
          <SpaceSiderbarAvatar spaceId={space.id} />
          <h2 className="text-lg font-semibold text-center">{spaceName}</h2>
        </div>
      )}

      <SpaceDescription space={space} />
      <Separator />
      <div className="flex gap-5">
        <SidebarSubscriberCount spaceId={spaceId} />
        <HandleSubscription spaceName={spaceName} spaceId={spaceId} />
      </div>
    </div>
  );
}

type SpaceDescriptionProps = {
  space: Space;
};

export function SpaceDescription({ space }: SpaceDescriptionProps) {
  if (space)
    return (
      <div className="pt-2">
        <p className="text-sm ">{space.description}</p>
        <p className="flex items-center gap-1 mt-2 text-sm dark:text-neutral-500">
          <MdOutlineEvent />
          Created {space.created_at && formatCreatedAt(space.created_at)}
        </p>
      </div>
    );

  return (
    <div className="space-y-2">
      <Skeleton className="h-4" />
      <Skeleton className="h-4" />
    </div>
  );
}
