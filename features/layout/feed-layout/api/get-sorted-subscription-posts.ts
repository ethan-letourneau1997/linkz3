import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getSortedSubscriptionPosts(
  page: string,
  sortBy: "top" | "new" | "old"
) {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getSession();

  const currentPage = parseInt(page, 10);
  const postsPerPage = 10;
  const lowerLimit = (currentPage - 1) * postsPerPage;
  const upperLimit = lowerLimit + postsPerPage - 1;

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
        .range(lowerLimit, upperLimit);
      return posts;
    }

    if (sortBy === "old" && communityIds) {
      const { data: posts } = await supabase
        .from("post")
        .select()
        .in("posted_in", communityIds)
        .order("created_at", { ascending: true })
        .range(lowerLimit, upperLimit);
      return posts;
    }

    if (sortBy === "top" && communityIds) {
      const { data: posts } = await supabase
        .from("post_with_votes")
        .select()
        .in("posted_in", communityIds)
        .order("total_votes", { ascending: false })
        .range(lowerLimit, upperLimit);

      return posts;
    }
  }
  const posts = await getSortedPosts();

  return posts || [];
}
