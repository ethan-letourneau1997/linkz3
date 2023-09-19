"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { HandleSubscription } from "./handle-subscription";
import { SidebarSubscriberCount } from "./sidebar-subscriber-count";

export function SpaceSidebar() {
  const params = useParams();

  const spaceId = params.spaceId as string;
  const spaceName = params.spaceName as string;

  const supabase = createClientComponentClient();

  const subscriptionButtonFallback = (
    <Button size="sm" className="w-full " variant="outline">
      Subscribe
    </Button>
  );
  const { data: space } = useSWR("space", async () => {
    const { data: community } = await supabase
      .from("community")
      .select("*")
      .eq("name", spaceName)
      .single();

    return community;
  });

  return (
    <div className="px-4 pb-3 space-y-3 w-72">
      <h2 className="text-lg font-semibold text-center">{spaceName}</h2>
      <p className="text-sm ">{space?.description}</p>
      <Suspense fallback={subscriptionButtonFallback}></Suspense>
      <Separator />

      <div className="flex gap-5">
        <SidebarSubscriberCount spaceId={spaceId} />
        <HandleSubscription spaceName={spaceName} spaceId={spaceId} />
      </div>
    </div>
  );
}
