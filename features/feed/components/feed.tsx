import { PostPreviews } from "@/features/post-preview";
import { getSortedSubscriptionPosts } from "../api/get-sorted-subscription-posts";

type FeedProps = {
  params: {
    page: string;
    sort: "top" | "new" | "old";
  };
};

export async function Feed({ params }: FeedProps) {
  const posts = await getSortedSubscriptionPosts(params.page, params.sort);

  if (posts) return <PostPreviews posts={posts} />;

  if (!posts) return <div>No posts</div>;
}
