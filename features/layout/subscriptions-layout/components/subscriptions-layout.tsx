import { PostPreviews } from "@/features/post-preview/components/post-previews";
import { getSortedSubscriptionPosts } from "../api/get-sorted-subscription-posts";

type SpacePagePostsProps = {
  params: {
    page: string;
    sortBy: "top" | "new" | "old";
  };
};

export async function SubscriptionsLayout({ params }: SpacePagePostsProps) {
  const posts = await getSortedSubscriptionPosts(params.page, params.sortBy);

  if (posts)
    return (
      <>
        <PostPreviews posts={posts} />
      </>
    );

  if (!posts) return <div>No posts</div>;
}
