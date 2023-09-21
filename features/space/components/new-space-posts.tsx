import { PostPreviews } from "@/features/post-preview";
import { getSortedPosts } from "../api/get-sorted-posts";

type SpacePostsProps = {
  params: {
    spaceName: string;
    spaceId: string;
    page: string;
    sort: "top" | "new" | "old";
  };
};

export async function SpacePosts({ params }: SpacePostsProps) {
  const posts = await getSortedPosts(params.spaceId, params.page, params.sort);

  if (posts) return <PostPreviews posts={posts} />;

  if (!posts) return <div>No posts</div>;
}
