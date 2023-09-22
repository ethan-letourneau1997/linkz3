import { Button } from "@/components/ui/button";
import { SidebarSubscriptionButton } from "./sidebar-subscribe-button";
import { checkUserSubscription } from "@/lib/space/check-user-subscription";
import useSWR from "swr";

type HandleSubscriptionProps = {
  spaceName: string;
  spaceId: string;
};

export function HandleSubscription({
  spaceId,
  spaceName,
}: HandleSubscriptionProps) {
  const { data: subscribed } = useSWR("subscribed", async () => {
    const data = await checkUserSubscription(spaceId);
    return data;
  });

  if (subscribed === false || subscribed === true)
    return (
      <SidebarSubscriptionButton
        isSubscribed={subscribed}
        spaceName={spaceName}
        spaceId={spaceId}
      />
    );

  return (
    <Button
      size="sm"
      className="w-full border dark:bg-transparent dark:border-neutral-800"
      variant="outline"
    >
      Subscribe
    </Button>
  );
}
