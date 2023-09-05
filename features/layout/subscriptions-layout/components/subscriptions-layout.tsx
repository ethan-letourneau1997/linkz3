import { SpacePreview } from "@/features/space-preview";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function SubscriptionsLayout() {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getSession();

  const { data: user_subscriptions } = await supabase
    .from("user_community")
    .select("*, community_id(*)")
    .eq("user_id", data.session?.user.id);

  return (
    <div className="w-full max-w-3xl">
      <h1 className="mt-5 text-3xl font-medium text-center">
        My Subscriptions
      </h1>
      {user_subscriptions?.map((space) => (
        <SpacePreview key={space.community_id.id} space={space.community_id} />
      ))}
    </div>
  );
}
