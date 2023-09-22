import { Space } from "@/types";
import { SubscribeButton } from "./subscribe-button";
import { checkUserSubscription } from "@/lib/space/check-user-subscription";

type UserSubscriptionProps = {
  space: Space;
};

export async function HandleUserSubscription({ space }: UserSubscriptionProps) {
  const isSubscribed = await checkUserSubscription(space.id);

  return <SubscribeButton space={space} isSubscribed={isSubscribed || false} />;
}
