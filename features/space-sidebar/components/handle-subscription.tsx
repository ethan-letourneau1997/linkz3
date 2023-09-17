import { PostRouterParams } from "@/types";
import { SidebarSubscriptionButton } from "./sidebar-subscribe-button";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

type HandleSubscriptionProps = {
  params: PostRouterParams;
};

export async function HandleSubscription({ params }: HandleSubscriptionProps) {
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
            community_id: params.spaceId,
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
      spaceName={params.spaceName}
      spaceId={params.spaceId}
    />
  );
}
