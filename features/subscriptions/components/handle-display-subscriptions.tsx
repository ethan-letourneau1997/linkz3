import { SubscriptionCard } from "./subscription-card";
import { fetchUserSpaces } from "@/lib/user/fetch-user-spaces";

export async function HandleDisplaySubscriptions() {
  const spaces = await fetchUserSpaces();

  return (
    <div className="mt-7">
      {spaces && spaces.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {spaces?.map((space) => (
            <SubscriptionCard key={space.community_id} space={space} />
          ))}
        </div>
      ) : (
        <div>No subscriptions!</div>
      )}
    </div>
  );
}
