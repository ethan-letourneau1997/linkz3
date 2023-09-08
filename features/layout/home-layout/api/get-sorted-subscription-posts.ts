import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getSortedSubscriptionPosts(
  sortBy: "top" | "new" | "old"
) {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getSession();

  async function getSortedPosts() {
    const { data: user_subscriptions } = await supabase
      .from("user_community")
      .select("*, community_id(*)")
      .eq("user_id", data.session?.user.id);

    const communityIds = user_subscriptions?.map((sub) => sub.community_id.id);

    if (sortBy === "new" && communityIds) {
      const { data: posts } = await supabase
        .from("post")
        .select()
        .in("posted_in", communityIds)
        .order("created_at", { ascending: false })
        .limit(20);
      return posts;
    }

    if (sortBy === "old" && communityIds) {
      const { data: posts } = await supabase
        .from("post")
        .select()
        .in("posted_in", communityIds)
        .order("created_at", { ascending: true })
        .limit(20);
      return posts;
    }

    if (sortBy === "top" && communityIds) {
      const { data: posts } = await supabase
        .from("post_with_votes")
        .select()
        .in("posted_in", communityIds)
        .order("total_votes", { ascending: false })
        .limit(20);

      return posts;
    }
  }
  const posts = await getSortedPosts();

  return posts || [];
}
