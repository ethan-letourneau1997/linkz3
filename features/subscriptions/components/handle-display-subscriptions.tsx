import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { SubscriptionCard } from "./subscription-card";

export async function HandleDisplaySubscriptions() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  async function getSpaces() {
    if (user) {
      try {
        const { data: spaces } = await supabase
          .from("user_subscription")
          .select()
          .eq("user_id", user.id);

        return spaces;
      } catch (e) {
        console.log(e);
      }
    }
  }

  const spaces = await getSpaces();

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
