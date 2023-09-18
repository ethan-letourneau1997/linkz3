"use client";

import { Button } from "@/components/ui/button";
import { FaUserAstronaut } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { SidebarSubscriptionButton } from "./sidebar-subscribe-button";
import { Suspense } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import useSWR from "swr";

export function ClientSpaceSidebar() {
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

type SidebarSubscriberCountProps = {
  spaceId: string;
};

export function SidebarSubscriberCount({
  spaceId,
}: SidebarSubscriberCountProps) {
  const supabase = createClientComponentClient();

  const { data: count } = useSWR("user_community", async () => {
    try {
      const { count } = await supabase
        .from("user_community")
        .select("*", { count: "exact", head: true })
        .eq("community_id", spaceId);

      return count;
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex items-center gap-2">
        <FaUserAstronaut className="text-sm" />
        <span className="text-sm">{count || 0}</span>
      </div>
      <div className="text-xs text-neutral-500">
        subscriber{count === 1 ? "" : "s"}
      </div>
    </div>
  );
}

type HandleSubscriptionProps = {
  spaceName: string;
  spaceId: string;
};

export function HandleSubscription({
  spaceId,
  spaceName,
}: HandleSubscriptionProps) {
  const supabase = createClientComponentClient();

  const { data: isSubscribed } = useSWR("user_community", async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      const { data: user_community } = await supabase
        .from("user_community")
        .select()
        .match({
          user_id: data.session.user.id,
          community_id: spaceId,
        });
      if (user_community && user_community.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  });

  return (
    <SidebarSubscriptionButton
      isSubscribed={isSubscribed || false}
      spaceName={spaceName}
      spaceId={spaceId}
    />
  );
}
