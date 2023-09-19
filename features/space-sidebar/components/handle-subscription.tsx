import { SidebarSubscriptionButton } from "./sidebar-subscribe-button";
import { checkUserSubscription } from "../api/check-user-subscription";
import useSWR from "swr";

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
}
