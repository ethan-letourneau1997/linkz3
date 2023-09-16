import { PostPreviews } from "@/features/post-preview";
import { getSortedPosts } from "../api/get-sorted-posts";

type SpacePagePostsProps = {
  params: {
    spaceName: string;
    spaceId: string;
    page: string;
    sortBy: "top" | "new" | "old";
  };
};

export async function SpacePagePosts({ params }: SpacePagePostsProps) {
  const posts = await getSortedPosts(
    params.spaceId,
    params.page,
    params.sortBy
  );

  if (posts)
    return (
      <>
        <PostPreviews posts={posts} />
      </>
    );

  if (!posts) return <div>No posts</div>;
}
