import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getSortedPosts(
  communityId: string,
  page: string,
  sortBy: "top" | "new" | "old"
) {
  const supabase = createServerComponentClient({ cookies });

  const currentPage = parseInt(page, 10);
  const postsPerPage = 10;
  const lowerLimit = (currentPage - 1) * postsPerPage;
  const upperLimit = lowerLimit + postsPerPage - 1;

  async function fetchPosts() {
    try {
      if (sortBy === "new") {
        const { data: posts } = await supabase
          .from("post")
          .select()
          .eq("posted_in", communityId)
          .order("created_at", { ascending: false })
          .range(lowerLimit, upperLimit);

        return posts;
      }

      if (sortBy === "old") {
        const { data: posts } = await supabase
          .from("post")
          .select()
          .eq("posted_in", communityId)
          .order("created_at", { ascending: true })
          .range(lowerLimit, upperLimit);

        return posts;
      }

      if (sortBy === "top") {
        const { data: posts } = await supabase
          .from("post_with_votes")
          .select()
          .eq("posted_in", communityId)
          .order("total_votes", { ascending: false })
          .range(lowerLimit, upperLimit);

        return posts;
      }
    } catch (error) {
      // Handle errors here (e.g., log or return a default value)
      console.error("Error fetching posts:", error);
      throw error; // Rethrow the error if needed
    }
  }

  const posts = await fetchPosts();

  return posts || [];
}
