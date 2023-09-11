import { SubscriptionCard } from "./subscription-card";
import { UserSubscription } from "@/types";

type SubscriptionsProps = {
  spaces: UserSubscription[];
};

export async function Subscriptions({ spaces }: SubscriptionsProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {spaces?.map((space) => (
        <SubscriptionCard key={space.community_id} space={space} />
      ))}
    </div>
  );
}
