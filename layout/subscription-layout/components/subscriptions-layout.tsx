import { HandleDisplaySubscriptions } from "./handle-display-subscriptions";

export async function SubscriptionsLayout() {
  return (
    <div className="w-full max-w-3xl mt-5 space-y-5">
      <h1 className="text-2xl font-bold tracking-tight">My Subscriptions</h1>
      <HandleDisplaySubscriptions />
    </div>
  );
}
