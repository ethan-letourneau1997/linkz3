import { PostPreview, SpaceSkeleton } from "@/features/post-preview";

import { Suspense } from "react";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function TopPosts() {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getSession();

  const { data: user_subscriptions } = await supabase
    .from("user_community")
    .select("*, community_id(*)")
    .eq("user_id", data.session?.user.id);

  async function getSubscriptionPosts() {
    const communityIds = user_subscriptions?.map((sub) => sub.community_id.id);
    if (communityIds) {
      const { data: posts } = await supabase
        .from("post_with_votes")
        .select()
        .in("posted_in", communityIds)
        .order("total_votes", { ascending: false })
        .limit(20);

      return posts;
    }

    return null;
  }

  const subscriptionPosts = await getSubscriptionPosts();

  console.log(subscriptionPosts);

  return (
    <Suspense fallback={<SpaceSkeleton count={10} />}>
      {subscriptionPosts?.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </Suspense>
  );
}
