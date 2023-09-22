import { SubscriptionButtons } from "./subscription-buttons";
import { UserSubscription } from "@/types";
import { checkUserSubscription } from "@/lib/space/check-user-subscription";

type UserSubscriptionProps = {
  space: UserSubscription;
};

export async function HandleSubscriptionButtons({
  space,
}: UserSubscriptionProps) {
  const isSubscribed = space.community_id
    ? await checkUserSubscription(space.community_id)
    : null;

  return (
    <SubscriptionButtons space={space} isSubscribed={isSubscribed || false} />
  );
}
