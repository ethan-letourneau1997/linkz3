import { SubscriptionButtons } from "./subscription-buttons";
import { UserSubscription } from "@/types";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

type UserSubscriptionProps = {
  space: UserSubscription;
};

export async function HandleUserSubscription({ space }: UserSubscriptionProps) {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getSession();

  async function checkUserSubscription() {
    if (data.session) {
      try {
        const { data: user_community } = await supabase
          .from("user_community")
          .select()
          .match({
            user_id: data.session.user.id,
            community_id: space.community_id,
          });

        if (user_community && user_community.length > 0) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const isSubscribed = await checkUserSubscription();

  return (
    <SubscriptionButtons space={space} isSubscribed={isSubscribed || false} />
  );
}
