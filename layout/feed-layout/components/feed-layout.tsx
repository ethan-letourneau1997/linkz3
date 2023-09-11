import { PostPreviews } from "@/features/post-preview/components/post-previews";
import { getSortedSubscriptionPosts } from "../api/get-sorted-subscription-posts";

type FeedLayoutProps = {
  params: {
    page: string;
    sortBy: "top" | "new" | "old";
  };
};

export async function FeedLayout({ params }: FeedLayoutProps) {
  const posts = await getSortedSubscriptionPosts(params.page, params.sortBy);

  if (posts) return <PostPreviews posts={posts} />;

  if (!posts) return <div>No posts</div>;
}
