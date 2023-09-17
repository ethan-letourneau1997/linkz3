import { SidebarSubscriptionButton } from "./sidebar-subscribe-button";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

type HandleSubscriptionProps = {
  spaceName: string;
  spaceId: string;
};

export async function HandleSubscription({
  spaceId,
  spaceName,
}: HandleSubscriptionProps) {
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
            community_id: spaceId,
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
    <SidebarSubscriptionButton
      isSubscribed={isSubscribed || false}
      spaceName={spaceName}
      spaceId={spaceId}
    />
  );
}
