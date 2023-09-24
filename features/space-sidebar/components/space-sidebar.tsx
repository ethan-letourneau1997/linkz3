"use client";

import { HandleSubscription } from "./handle-subscription";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SidebarSubscriberCount } from "./sidebar-subscriber-count";
import { SpaceSidebarDetails } from "./space-sidebar-details";
import { SpaceSidebarFallback } from "./space-sidebar-fallback";
import { SpaceSiderbarAvatar } from "./space-sidebar-avatar";
import { checkUserSubscription } from "@/lib/space/check-user-subscription";
import { fetchSpaceById } from "@/lib/space/fetch-space-by-id";
import { fetchSpaceSubscriberCount } from "@/lib/space/fetch-space-subscriber-count";
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

  const { data: count } = useSWR("user_community", async () => {
    try {
      const count = await fetchSpaceSubscriberCount(spaceId);

      return count;
    } catch (e) {
      console.log(e);
    }
  });

  const { data: subscribed } = useSWR("subscribed", async () => {
    const data = await checkUserSubscription(spaceId);
    return data;
  });

  if (space)
    return (
      <div className="px-4 pt-2 pb-3 space-y-3 w-72">
        <div className="flex items-center gap-3">
          <SpaceSiderbarAvatar spaceId={space.id} />
          <Link
            href={`/spaces/${spaceId}/${spaceName}`}
            className="text-lg font-semibold text-center hover:underline"
          >
            {spaceName}
          </Link>
        </div>

        <SpaceSidebarDetails space={space} />
        <Separator />
        <div className="flex gap-5">
          <SidebarSubscriberCount count={count || 0} />
          <HandleSubscription
            subscribed={subscribed || false}
            spaceName={spaceName}
            spaceId={spaceId}
          />
        </div>
      </div>
    );

  return (
    <div className="px-4 pt-2 pb-3 space-y-3 w-72">
      <SpaceSidebarFallback />
    </div>
  );
}
