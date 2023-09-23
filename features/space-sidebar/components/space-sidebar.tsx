"use client";

import { HandleSubscription } from "./handle-subscription";
import { Separator } from "@/components/ui/separator";
import { SidebarSubscriberCount } from "./sidebar-subscriber-count";
import { Skeleton } from "@/components/ui/skeleton";
import { Space } from "@/types";
import { fetchSpaceById } from "@/lib/space/fetch-space-by-id";
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
    <div className="px-4 pb-3 space-y-3 w-72">
      <h2 className="text-lg font-semibold text-center">{spaceName}</h2>
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
  if (space) return <p className="text-sm ">{space.description}</p>;

  return (
    <div className="space-y-2">
      <Skeleton className="h-4" />
      <Skeleton className="h-4" />
    </div>
  );
}
