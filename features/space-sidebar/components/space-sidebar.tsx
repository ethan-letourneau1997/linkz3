import { Button } from "@/components/ui/button";
import { FaUserAstronaut } from "react-icons/fa";
import { HandleSubscription } from "./handle-subscription";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

type SpaceSidebarProps = {
  spaceName: string;
  spaceId: string;
};

export async function SpaceSidebar({ spaceName, spaceId }: SpaceSidebarProps) {
  const supabase = createServerComponentClient({ cookies });

  const subscriptionButtonFallback = (
    <Button size="sm" className="w-full " variant="outline">
      Subscribe
    </Button>
  );

  const { data: space } = await supabase
    .from("community")
    .select()
    .eq("name", spaceName)
    .single();

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

export async function SidebarSubscriberCount({
  spaceId,
}: SidebarSubscriberCountProps) {
  const supabase = createServerComponentClient({ cookies });
  const { count } = await supabase
    .from("user_community")
    .select("*", { count: "exact", head: true })
    .eq("community_id", spaceId);
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
