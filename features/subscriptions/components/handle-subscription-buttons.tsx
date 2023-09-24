import { Space } from "@/types";
import { SubscriptionButtons } from "./subscription-buttons";
import { checkUserSubscription } from "@/lib/space/check-user-subscription";

type UserSubscriptionProps = {
  space: Space;
};

export async function HandleSubscriptionButtons({
  space,
}: UserSubscriptionProps) {
  const isSubscribed = space.id ? await checkUserSubscription(space.id) : null;

  return (
    <SubscriptionButtons space={space} isSubscribed={isSubscribed || false} />
  );
}
