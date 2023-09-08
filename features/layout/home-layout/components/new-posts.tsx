import { PostPreview, SpaceSkeleton } from "@/features/post-preview";

import { Suspense } from "react";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function NewPosts() {
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
        .from("post")
        .select()
        .in("posted_in", communityIds)
        .order("created_at", { ascending: false })
        .limit(20);
      return posts;
    }

    return null;
  }

  const subscriptionPosts = await getSubscriptionPosts();

  return (
    <div className="divide-y divide-neutral-600">
      <Suspense fallback={<SpaceSkeleton count={10} />}>
        {subscriptionPosts?.map((post) => (
          <PostPreview key={post.id} post={post} />
        ))}
      </Suspense>
    </div>
  );
}
