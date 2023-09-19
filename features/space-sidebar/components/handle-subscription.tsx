import { SidebarSubscriptionButton } from "./sidebar-subscribe-button";
import { checkUserSubscription } from "../api/check-user-subscription";
import useSWR from "swr";
import { Button } from "@/components/ui/button";

type HandleSubscriptionProps = {
  spaceName: string;
  spaceId: string;
};

export function HandleSubscription({
  spaceId,
  spaceName,
}: HandleSubscriptionProps) {
  // const [isSubscribed, setIsSubscribed] = useState(false);

  const { data: subscribed } = useSWR("subscribed", async () => {
    const data = await checkUserSubscription(spaceId);
    return data;
  });

  console.log(subscribed);

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
