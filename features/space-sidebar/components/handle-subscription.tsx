import { Button } from "@/components/ui/button";
import { SidebarSubscriptionButton } from "./sidebar-subscribe-button";

type HandleSubscriptionProps = {
  spaceName: string;
  spaceId: string;
  subscribed: boolean;
};

export function HandleSubscription({
  spaceId,
  spaceName,
  subscribed,
}: HandleSubscriptionProps) {
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
