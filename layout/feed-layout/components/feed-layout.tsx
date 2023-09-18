import { PostPreviews } from "@/features/post-preview";
import { getSortedSubscriptionPosts } from "../api/get-sorted-subscription-posts";

type FeedLayoutProps = {
  searchParams: {
    page: string;
    sort: "top" | "new" | "old";
  };
};

export async function FeedLayout({ searchParams }: FeedLayoutProps) {
  const posts = await getSortedSubscriptionPosts(
    searchParams.page,
    searchParams.sort
  );

  if (posts) return <PostPreviews posts={posts} />;

  if (!posts) return <div>No posts</div>;
}
